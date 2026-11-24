"""Grade and follow-crop the surf ride into scroll frames (desktop 16:9, phone 9:16)."""
import sys, os
from PIL import Image, ImageEnhance
SRC, OUT, MODE = sys.argv[1], sys.argv[2], sys.argv[3]   # MODE: test | build
# Surfer position (fraction of frame) at sampled frames, read off a gridded contact sheet.
KEYS = [(1,.30,.47),(11,.31,.55),(21,.40,.53),(31,.54,.52),(41,.62,.52),(51,.65,.53),(61,.65,.55),(71,.62,.57),(81,.62,.55),(91,.57,.58),(101,.60,.62),(111,.52,.50),(120,.50,.50)]
N = 120
def at(k):
    for (a,xa,ya),(b,xb,yb) in zip(KEYS,KEYS[1:]):
        if a <= k <= b:
            t=(k-a)/(b-a); return xa+(xb-xa)*t, ya+(yb-ya)*t
    return KEYS[-1][1:]
raw=[at(k) for k in range(1,N+1)]
# Smooth like a steady camera operator.
pos=[]
for i in range(N):
    w=[raw[j] for j in range(max(0,i-6),min(N,i+7))]
    pos.append((sum(p[0] for p in w)/len(w), sum(p[1] for p in w)/len(w)))
def grade(im):
    r,g,b = im.split()
    r = r.point(lambda v: min(255, int(v*1.05+4))); b = b.point(lambda v: int(v*0.95))
    im = Image.merge("RGB",(r,g,b))
    im = ImageEnhance.Contrast(im).enhance(1.14)
    im = ImageEnhance.Color(im).enhance(1.22)
    return ImageEnhance.Brightness(im).enhance(1.02)
def crop(im, i, cw, ch, lead, ylev):
    W,H=im.size; sx,sy=pos[i][0]*W, pos[i][1]*H
    cx=min(max(sx+lead*cw, cw/2), W-cw/2); cy=min(max(sy-(ylev-.5)*ch, ch/2), H-ch/2)
    return im.crop((int(cx-cw/2),int(cy-ch/2),int(cx-cw/2)+cw,int(cy-ch/2)+ch))
idx = [0,40,80,110] if MODE=="test" else range(N)
os.makedirs(OUT+"/d",exist_ok=True); os.makedirs(OUT+"/m",exist_ok=True)
for i in idx:
    im=grade(Image.open(f"{SRC}/{i+1:03d}.jpg").convert("RGB"))
    d=crop(im,i,1344,756,-.16,.5).resize((1280,720),Image.LANCZOS)
    m=crop(im,i,470,836,.0,.36).resize((540,960),Image.LANCZOS)
    if MODE=="test": d.save(f"{OUT}/d/{i+1:03d}.jpg",quality=85); m.save(f"{OUT}/m/{i+1:03d}.jpg",quality=85)
    else: d.save(f"{OUT}/d/{i+1:03d}.webp","WEBP",quality=50,method=6); m.save(f"{OUT}/m/{i+1:03d}.webp","WEBP",quality=50,method=6)
