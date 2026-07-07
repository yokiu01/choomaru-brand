/* ==========================================================================
   motion.js — 키네틱 엔진
   커서 · 마그네틱 · 패럴랙스 · 카운트업 · word-reveal · nav · progress
   ========================================================================== */

(function () {
  "use strict";

  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const isTouch = window.matchMedia("(hover: none)").matches;
  const lerp = (a, b, n) => a + (b - a) * n;

  /* ---------- 스크롤 프로그레스 ---------- */
  function initProgress() {
    const bar = document.querySelector(".scroll-progress");
    if (!bar) return;
    const onScroll = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      const p = max > 0 ? h.scrollTop / max : 0;
      bar.style.transform = `scaleX(${p})`;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ---------- nav 숨김/표시 + scrolled ---------- */
  function initNav() {
    const nav = document.getElementById("nav");
    if (!nav) return;
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      nav.classList.toggle("is-scrolled", y > 24);
      if (y > 400 && y > last + 4) nav.classList.add("is-hidden");
      else if (y < last - 4) nav.classList.remove("is-hidden");
      last = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ---------- 커스텀 커서 ---------- */
  function initCursor() {
    if (reduce || isTouch) return;
    const dot = document.querySelector(".cursor");
    const ring = document.querySelector(".cursor-ring");
    if (!dot || !ring) return;

    let mx = innerWidth / 2,
      my = innerHeight / 2,
      rx = mx,
      ry = my;

    window.addEventListener("mousemove", (e) => {
      mx = e.clientX;
      my = e.clientY;
      dot.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%)`;
      document.body.classList.add("has-cursor");
    });

    const hoverables = "a, button, input, select, textarea, [data-cursor]";
    document.addEventListener("mouseover", (e) => {
      if (e.target.closest(hoverables)) document.body.classList.add("cursor-hover");
    });
    document.addEventListener("mouseout", (e) => {
      if (e.target.closest(hoverables)) document.body.classList.remove("cursor-hover");
    });

    (function loop() {
      rx = lerp(rx, mx, 0.18);
      ry = lerp(ry, my, 0.18);
      ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;
      requestAnimationFrame(loop);
    })();
  }

  /* ---------- 마그네틱 버튼 ---------- */
  function initMagnetic() {
    if (reduce || isTouch) return;
    document.querySelectorAll(".magnetic").forEach((el) => {
      const strength = 0.32;
      el.addEventListener("mousemove", (e) => {
        const r = el.getBoundingClientRect();
        const x = e.clientX - (r.left + r.width / 2);
        const y = e.clientY - (r.top + r.height / 2);
        el.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
      });
      el.addEventListener("mouseleave", () => {
        el.style.transform = "";
      });
    });
  }

  /* ---------- 패럴랙스 ---------- */
  function initParallax() {
    if (reduce) return;
    const els = [...document.querySelectorAll("[data-parallax]")];
    if (!els.length) return;
    let ticking = false;
    const update = () => {
      const vh = innerHeight;
      els.forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.bottom < -200 || r.top > vh + 200) return;
        const f = parseFloat(el.dataset.parallax) || 0;
        const offset = r.top + r.height / 2 - vh / 2;
        el.style.transform = `translate3d(0, ${(offset * f).toFixed(1)}px, 0)`;
      });
      ticking = false;
    };
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
  }

  /* ---------- 카운트업 ---------- */
  function initCount() {
    const nums = document.querySelectorAll(".count");
    if (!nums.length) return;
    const run = (el) => {
      const to = parseInt(el.dataset.to, 10) || 0;
      const suffix = el.dataset.suffix || "";
      if (reduce) {
        el.textContent = to + suffix;
        return;
      }
      const dur = 1400;
      const start = performance.now();
      const tick = (now) => {
        const t = Math.min((now - start) / dur, 1);
        const eased = 1 - Math.pow(1 - t, 3);
        el.textContent = Math.round(to * eased) + suffix;
        if (t < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };
    const io = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            run(e.target);
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.6 }
    );
    nums.forEach((n) => io.observe(n));
  }

  /* ---------- fade reveal ---------- */
  function initReveal() {
    const els = document.querySelectorAll("[data-reveal]");
    if (!els.length) return;
    if (reduce || !("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("is-visible"));
      return;
    }
    const io = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.18, rootMargin: "0px 0px -8% 0px" }
    );
    els.forEach((el) => io.observe(el));
  }

  /* ---------- word-split reveal ---------- */
  let splitObserver = null;
  function splitOne(el) {
    const lines = el.innerHTML.split(/<br\s*\/?>/i);
    let wordIndex = 0;
    el.innerHTML = lines
      .map((line) => {
        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = line;
        const text = tempDiv.textContent.trim();
        if (!text) return "";
        const words = text.split(/\s+/);
        return words
          .map((w) => {
            const d = wordIndex * 55;
            wordIndex++;
            return `<span class="word"><span class="word__inner" style="--wd:${d}ms">${w}</span></span>`;
          })
          .join(" ");
      })
      .filter((lineHtml) => lineHtml !== "")
      .join("<br />");
  }
  function initSplit() {
    const els = document.querySelectorAll("[data-split]");
    if (!els.length) return;
    if (reduce) {
      els.forEach((el) => el.classList.add("is-revealed"));
      return;
    }
    if (splitObserver) splitObserver.disconnect();
    splitObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-revealed");
            splitObserver.unobserve(e.target);
          }
        });
      },
      { threshold: 0.25 }
    );
    els.forEach((el) => {
      el.classList.remove("is-revealed");
      splitOne(el);
      splitObserver.observe(el);
    });
  }

  /* ---------- boot ---------- */
  function boot() {
    initProgress();
    initNav();
    initCursor();
    initMagnetic();
    initParallax();
    initCount();
    initReveal();
    initSplit();
    // 언어 전환 시 split 텍스트 재구성
    document.addEventListener("muon:lang", () => {
      requestAnimationFrame(initSplit);
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
