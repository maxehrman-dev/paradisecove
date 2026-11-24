/* Paradise Cove Surf Club: the site's motion and controls, without React.
   Scroll videos, parallax, reveals, the clubhouse rack, Size by Swell, card flips and signup. */
(function () {
  "use strict";
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var vh = function () { return window.innerHeight || document.documentElement.clientHeight; };
  var clamp = function (v, a, b) { return Math.min(b, Math.max(a, v)); };
  var ticking = false, onScroll = [];
  function frame() { ticking = false; for (var i = 0; i < onScroll.length; i++) onScroll[i](); }
  function request() { if (!ticking) { ticking = true; requestAnimationFrame(frame); } }
  window.addEventListener("scroll", request, { passive: true });
  window.addEventListener("resize", request);

  /* Reveals: fade up once, from the server's starting pose. */
  var reveals = document.querySelectorAll("[data-reveal]");
  if (reduce || !("IntersectionObserver" in window)) {
    reveals.forEach(function (el) { el.style.opacity = "1"; el.style.transform = "none"; });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        var el = e.target; io.unobserve(el);
        el.style.transition = "opacity 1s cubic-bezier(.22,1,.36,1), transform 1s cubic-bezier(.22,1,.36,1)";
        el.style.opacity = "1"; el.style.transform = "none";
      });
    }, { rootMargin: "0px 0px -10% 0px" });
    reveals.forEach(function (el) { io.observe(el); });
  }

  /* Parallax: the photo drifts inside its frame. */
  document.querySelectorAll("[data-parallax]").forEach(function (el) {
    var s = parseFloat(el.getAttribute("data-parallax")) || 8, box = el.parentElement;
    if (reduce) { el.style.top = "0"; el.style.bottom = "0"; el.style.transform = "none"; return; }
    onScroll.push(function () {
      var r = box.getBoundingClientRect();
      if (r.bottom < -200 || r.top > vh() + 200) return;
      var p = clamp((vh() - r.top) / (vh() + r.height), 0, 1);
      el.style.transform = "translateY(" + ((p * 2 - 1) * s).toFixed(3) + "%)";
    });
  });

  /* The clubhouse rack slides sideways with scroll. */
  var rackSec = document.querySelector("[data-rack-section]"), rack = document.querySelector("[data-rack]");
  if (rackSec && rack) {
    if (reduce) { rack.style.transform = "none"; rack.style.overflowX = "auto"; }
    else onScroll.push(function () {
      var r = rackSec.getBoundingClientRect(), p = clamp((vh() - r.top) / (vh() + r.height), 0, 1);
      var t = clamp((p - 0.1) / 0.8, 0, 1);
      rack.style.transform = "translateX(" + (22 + t * (-58 - 22)).toFixed(2) + "%)";
    });
  }

  /* Scroll videos: frames packed ten to a strip, drawn to a canvas and blended between neighbours. */
  var PER = 10;
  document.querySelectorAll("[data-seq]").forEach(function (sec) {
    var cfg; try { cfg = JSON.parse(sec.getAttribute("data-seq")); } catch (e) { return; }
    var canvas = sec.querySelector("canvas"), ctx = canvas && canvas.getContext("2d");
    if (!ctx) return;
    var mobile = window.matchMedia("(max-width: 767px)").matches;
    var set = mobile && cfg.m ? cfg.m : cfg.d, mode = mobile ? (cfg.mfit || "cover") : (cfg.fit || "cover");
    var strips = Math.ceil(set.count / PER), imgs = new Array(strips), progress = 0;
    var beats = Array.prototype.slice.call(sec.querySelectorAll("[data-beat-from]"));

    function loaded(k) { var im = imgs[k]; return im && im.complete && im.naturalWidth; }
    function draw() {
      var dpr = Math.min(window.devicePixelRatio || 1, 2), w = canvas.clientWidth, h = canvas.clientHeight;
      if (canvas.width !== Math.round(w * dpr) || canvas.height !== Math.round(h * dpr)) { canvas.width = Math.round(w * dpr); canvas.height = Math.round(h * dpr); }
      var f = progress * (set.count - 1), i = Math.floor(f), t = f - i;
      var k = Math.floor(i / PER), j = i;
      // Nearest loaded strip at or before this frame, then forward, so it never goes blank.
      var kk = k; while (kk >= 0 && !loaded(kk)) kk--;
      if (kk < 0) { kk = k; while (kk < strips && !loaded(kk)) kk++; if (kk >= strips) return; j = kk * PER; }
      else if (kk !== k) j = kk * PER + PER - 1;
      ctx.globalAlpha = 1; ctx.fillStyle = cfg.bg || "#1C2B4A"; ctx.fillRect(0, 0, canvas.width, canvas.height);
      paint(j, 1);
      var n = i + 1;
      if (kk === k && t > 0.01 && n < set.count && loaded(Math.floor(n / PER))) paint(n, t);
      ctx.globalAlpha = 1;
    }
    function paint(idx, alpha) {
      var im = imgs[Math.floor(idx / PER)], fw = im.naturalWidth, fh = im.naturalHeight / PER, row = idx % PER;
      var s = mode === "cover" ? Math.max(canvas.width / fw, canvas.height / fh) : Math.min(canvas.width / fw, canvas.height / fh);
      var dw = fw * s, dh = fh * s;
      ctx.globalAlpha = alpha;
      ctx.drawImage(im, 0, row * fh, fw, fh, (canvas.width - dw) / 2, (canvas.height - dh) / 2, dw, dh);
    }
    function load(k) {
      return new Promise(function (res) {
        if (imgs[k]) return res();
        var im = new Image(); im.decoding = "async";
        im.onload = im.onerror = function () { res(); requestAnimationFrame(draw); };
        im.src = set.dir + "/s" + (k < 10 ? "0" : "") + k + ".webp"; imgs[k] = im;
      });
    }
    function setBeats() {
      beats.forEach(function (b) {
        var from = parseFloat(b.getAttribute("data-beat-from")), to = parseFloat(b.getAttribute("data-beat-to")), first = b.hasAttribute("data-beat-first"), f = 0.06, v = progress;
        var fin = first ? 1 : clamp((v - (from - f)) / f, 0, 1), fout = to >= 1 ? 1 : clamp(((to + f) - v) / f, 0, 1), o = Math.min(fin, fout);
        b.style.opacity = o.toFixed(3);
        b.style.transform = "translateY(" + ((1 - o) * (v < from ? 24 : -24)).toFixed(1) + "px)";
        b.style.pointerEvents = o > 0.05 ? "auto" : "none";
        b.setAttribute("aria-hidden", o > 0.05 ? "false" : "true");
      });
    }

    if (reduce) {
      sec.style.height = "auto"; var sticky = sec.firstElementChild; if (sticky) { sticky.style.position = "relative"; }
      progress = (cfg.poster || 0) / Math.max(1, set.count - 1);
      beats.forEach(function (b, i) { b.style.opacity = i === 0 ? "1" : "0"; b.style.transform = "none"; });
      load(Math.floor((cfg.poster || 0) / PER));
      window.addEventListener("resize", function () { requestAnimationFrame(draw); });
      return;
    }
    function update() {
      var r = sec.getBoundingClientRect(), len = sec.offsetHeight - vh();
      progress = len > 0 ? clamp(-r.top / len, 0, 1) : 0;
      if (r.bottom < -50 || r.top > vh() + 50) return;
      setBeats(); draw();
    }
    onScroll.push(update);
    load(0).then(update);
    var started = false;
    var near = new IntersectionObserver(function (es) {
      if (started || !es[0].isIntersecting) return; started = true; near.disconnect();
      // Spread the first pass across the clip so scrubbing works right away, then fill the gaps.
      var order = [], step = Math.max(1, Math.floor(strips / 3));
      for (var a = 0; a < strips; a += step) order.push(a);
      for (var b = 0; b < strips; b++) if (order.indexOf(b) < 0) order.push(b);
      var n = 0;
      function worker() { if (n >= order.length) return Promise.resolve(); return load(order[n++]).then(worker); }
      worker(); worker(); worker();
    }, { rootMargin: "100% 0px" });
    near.observe(sec);
    setBeats();
  });

  /* Size by Swell. */
  document.querySelectorAll("[data-swell]").forEach(function (sec) {
    var photo = sec.querySelector("[data-swell-photo]"), live = sec.querySelector("[data-swell-live]"), frameEl = sec.querySelector("[data-swell-frame]");
    var btns = sec.querySelectorAll("button[data-y]");
    var on = ["bg-navy", "text-cream"], off = ["bg-transparent", "text-navy", "hover:bg-paper"];
    if (photo && !reduce) photo.style.transition = "transform .9s cubic-bezier(.22,1.2,.36,1)";
    btns.forEach(function (btn) {
      btn.addEventListener("click", function () {
        var y = parseFloat(btn.getAttribute("data-y")), label = btn.getAttribute("data-label") || "", size = label.split(" · ")[0];
        btns.forEach(function (b) {
          var sel = b === btn; b.setAttribute("aria-checked", sel ? "true" : "false");
          on.forEach(function (c) { b.classList.toggle(c, sel); }); off.forEach(function (c) { b.classList.toggle(c, !sel); });
        });
        if (photo) photo.style.transform = "translateY(" + ((0.5185 * y - 0.5) * 100).toFixed(3) + "%)";
        if (live) live.textContent = label;
        if (frameEl) frameEl.setAttribute("aria-label", "Wave at " + (label.split(" · ")[1] || "") + " height");
        sec.querySelectorAll("[data-mark-line]").forEach(function (m) { var s = m.getAttribute("data-mark-line") === size; m.classList.toggle("bg-paper", s); m.classList.toggle("bg-paper/40", !s); });
        sec.querySelectorAll("[data-mark-label]").forEach(function (m) { var s = m.getAttribute("data-mark-label") === size; m.classList.toggle("text-paper", s); m.classList.toggle("text-paper/60", !s); });
      });
    });
  });

  /* Membership cards: tap to flip (hover flips on desktop through CSS). */
  document.querySelectorAll("button.flip").forEach(function (btn) {
    var inner = btn.querySelector(".flip-inner");
    btn.addEventListener("click", function () {
      var f = btn.getAttribute("aria-pressed") !== "true";
      btn.setAttribute("aria-pressed", f ? "true" : "false");
      if (inner) inner.classList.toggle("[transform:rotateY(180deg)]", f);
    });
  });

  /* Signup: no server in this preview, so say what happens at launch. */
  document.querySelectorAll("form[data-signup]").forEach(function (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var input = form.querySelector("input[type=email]"), status = form.querySelector("[role=status]");
      var v = (input && input.value || "").trim();
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) { if (status) status.textContent = "That email looks off. Check it and try again."; return; }
      if (status) status.textContent = "Signups open at launch. Follow @paradisecovesurf for the drop.";
    });
  });

  request();
})();
