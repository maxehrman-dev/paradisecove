"""Turn the Next.js static export into a self-contained artifact site (relative paths, no React runtime)."""
import json, os, re, shutil, sys, html
from PIL import Image

SRC = sys.argv[1]          # next export dir (out/)
PUB = sys.argv[2]          # the repo's public/ (for scroll frames)
DST = sys.argv[3]          # artifact folder
HERE = os.path.dirname(os.path.abspath(__file__))
shutil.rmtree(DST, ignore_errors=True); os.makedirs(DST)

PAGES = {"index": "home", "paradise-cove": "paradise-cove", "club-paradise": "club-paradise", "story": "story", "find-us": "find-us"}
LINKS = {"/": "home.html", "/paradise-cove": "paradise-cove.html", "/club-paradise": "club-paradise.html", "/story": "story.html", "/find-us": "find-us.html"}

MAP_PANEL = ('<div class="relative grid min-h-[360px] content-center justify-items-start gap-5 bg-cream edge-r py-16 md:min-h-[78svh]">'
             '<span class="eyebrow">Map</span><p class="pc-head text-[clamp(28px,3.4vw,44px)]">ATLAS · Westfield UTC</p>'
             '<p class="text-[15px] text-navy/75">La Jolla, California. Maps can&apos;t load inside this preview.</p>'
             '<a class="link-line" href="https://www.google.com/maps/search/?api=1&amp;query=ATLAS%20Westfield%20UTC%20La%20Jolla" target="_blank" rel="noopener noreferrer">Open in Google Maps <span aria-hidden="true">→</span></a></div>')

used = set()

def fix(body):
    body = re.sub(r"<script\b[^>]*>.*?</script>", "", body, flags=re.S)
    body = re.sub(r'<div hidden="">.*?</div>', "", body, count=1, flags=re.S)
    body = body.replace("<!--$-->", "").replace("<!--/$-->", "")
    # Page links -> sibling files.
    def link(m):
        href = m.group(1)
        return 'href="%s"' % LINKS.get(href, href)
    body = re.sub(r'href="(/[a-z-]*)"', link, body)
    # Absolute asset paths -> relative (attributes, inline styles, and JSON inside data-seq).
    body = body.replace('"/assets/', '"assets/').replace("&quot;/assets/", "&quot;assets/").replace("(/assets/", "(assets/")
    body = body.replace('"/_next/', '"site/')
    # Maps can't be embedded in an artifact: link out instead.
    body = re.sub(r'<div class="relative min-h-\[360px\] bg-cream md:min-h-\[78svh\]"><iframe[^>]*></iframe></div>', MAP_PANEL, body)
    for a in re.findall(r'(?:src|href)="(assets/[^"]+)"', body): used.add(a)
    return body

css_href = None
for src_name, out_name in PAGES.items():
    s = open(os.path.join(SRC, src_name + ".html"), encoding="utf-8").read()
    head = s[: s.index("</head>")]
    html_cls = re.search(r'<html lang="en" class="([^"]+)"', s).group(1)
    title = re.search(r"<title>(.*?)</title>", head).group(1)
    desc = re.search(r'<meta name="description" content="([^"]*)"', head)
    css_href = re.search(r'<link rel="stylesheet" href="/_next/(static/css/[^"]+)"', head).group(1)
    body = s[s.index("<body>") + 6 : s.rindex("</body>")]
    body = fix(body)
    extra_css = ('<style>header.sticky{top:env(safe-area-inset-top,0px);padding-top:0}'
                 'body::before{content:"";position:fixed;inset:0 0 auto;height:env(safe-area-inset-top,0px);z-index:60;background:#FBFAF6}</style>')
    shared_head = ('<title>%s</title>%s<link rel="stylesheet" href="site/%s">%s<script>document.documentElement.className+=" %s";document.documentElement.lang="en";</script>'
                   % (title, ('<meta name="description" content="%s">' % desc.group(1)) if desc else "", css_href, extra_css, html_cls))
    page_body = body + '<script src="app.js"></script>'
    full = ('<!doctype html><html lang="en" class="%s"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">%s</head><body>%s</body></html>'
            % (html_cls, shared_head.replace('<script>document.documentElement.className+=" %s";document.documentElement.lang="en";</script>' % html_cls, ""), page_body))
    open(os.path.join(DST, out_name + ".html"), "w", encoding="utf-8").write(full)
    if src_name == "index":
        # The artifact's own page: content only (the host wraps it in a document).
        open(os.path.join(DST, "index.html"), "w", encoding="utf-8").write(shared_head + page_body)

# CSS + fonts.
os.makedirs(os.path.join(DST, "site/static/css")); os.makedirs(os.path.join(DST, "site/static/media"))
css = open(os.path.join(SRC, "_next", css_href), encoding="utf-8").read().replace("url(/_next/static/media/", "url(../media/")
open(os.path.join(DST, "site", css_href), "w", encoding="utf-8").write(css)
for f in re.findall(r"url\(\.\./media/([^)]+)\)", css):
    shutil.copy(os.path.join(SRC, "_next/static/media", f), os.path.join(DST, "site/static/media", f))

# Assets the pages actually use.
for a in sorted(used):
    os.makedirs(os.path.dirname(os.path.join(DST, a)), exist_ok=True)
    shutil.copy(os.path.join(SRC, a), os.path.join(DST, a))

# Scroll frames packed ten to a strip.
PER = 10
for name in sorted(os.listdir(os.path.join(PUB, "assets/scroll"))):
    d = os.path.join(PUB, "assets/scroll", name)
    frames = sorted(f for f in os.listdir(d) if f.endswith(".webp"))
    out = os.path.join(DST, "assets/scroll", name); os.makedirs(out)
    for k in range(0, len(frames), PER):
        ims = [Image.open(os.path.join(d, f)).convert("RGB") for f in frames[k:k + PER]]
        w, h = ims[0].size
        strip = Image.new("RGB", (w, h * PER), (28, 43, 74))
        for i, im in enumerate(ims): strip.paste(im, (0, i * h))
        strip.save(os.path.join(out, "s%02d.webp" % (k // PER)), "WEBP", quality=52, method=6)

shutil.copy(os.path.join(HERE, "app.js"), os.path.join(DST, "app.js"))
n = sum(len(fs) for _, _, fs in os.walk(DST)); size = sum(os.path.getsize(os.path.join(r, f)) for r, _, fs in os.walk(DST) for f in fs)
print("files", n, "MB", round(size / 1e6, 1))
