/* ==========================================================================
   main.js — 춤 DNA 갤러리(렌더 · 드래그 · 화살표) · 문의 폼
   (키네틱/스크롤 모션은 motion.js, 언어는 i18n.js)
   ========================================================================== */

(function () {
  "use strict";

  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- 춤 DNA 8유형 ---------- */
  const DNA = [
    { n: 1, c: "--type-1", icon: "powerful", name: { ko: "파워풀", en: "Powerful" }, nick: { ko: "무대 장악형", en: "Stage Commander" }, core: { ko: "강한 힘으로 표현한다", en: "Expresses through raw power" } },
    { n: 2, c: "--type-2", icon: "precise", name: { ko: "정밀", en: "Precise" }, nick: { ko: "디테일 집착형", en: "Detail Obsessive" }, core: { ko: "손끝까지 감성을 담는다", en: "Emotion to the fingertips" } },
    { n: 3, c: "--type-3", icon: "minimal", name: { ko: "미니멀", en: "Minimal" }, nick: { ko: "프레임 장인", en: "Frame Artisan" }, core: { ko: "동작을 쪼개어 분절한다", en: "Breaks motion into frames" } },
    { n: 4, c: "--type-4", icon: "expresser", name: { ko: "표현자", en: "Expresser" }, nick: { ko: "감정 과몰입형", en: "Emotion Immersed" }, core: { ko: "감정을 연기한다", en: "Performs the feeling" } },
    { n: 5, c: "--type-5", icon: "technician", name: { ko: "테크니션", en: "Technician" }, nick: { ko: "스킬 덕후", en: "Skill Geek" }, core: { ko: "기술로 보여준다", en: "Shows it through skill" } },
    { n: 6, c: "--type-6", icon: "classical", name: { ko: "클래시컬", en: "Classical" }, nick: { ko: "정적인 카리스마", en: "Still Charisma" }, core: { ko: "한국무용의 본질을 품는다", en: "Holds the essence" } },
    { n: 7, c: "--type-7", icon: "groover", name: { ko: "그루버", en: "Groover" }, nick: { ko: "리듬이 체질", en: "Born for Rhythm" }, core: { ko: "몸을 리듬에 맡긴다", en: "Surrenders to rhythm" } },
    { n: 8, c: "--type-8", icon: "silhouette", name: { ko: "실루엣", en: "Silhouette" }, nick: { ko: "라인의 정석", en: "Line Purist" }, core: { ko: "선과 모양을 만든다", en: "Crafts line and shape" } },
  ];

  const lang = () =>
    window.MUON && window.MUON.getLang ? window.MUON.getLang() : "ko";

  function cardHTML(t, l) {
    return `
      <li class="dna-card" style="--type-color:var(${t.c})">
        <div class="dna-card__head">
          <span class="dna-card__num">${String(t.n).padStart(2, "0")}</span>
          <span class="dna-card__bar"></span>
        </div>
        <div class="dna-card__icon" style="--icon:url('assets/dna/${t.icon}.svg')" role="img" aria-label="${t.name[l]} 유형 아이콘"></div>
        <div class="dna-card__name">${t.name[l]}</div>
        <div class="dna-card__nick">${t.nick[l]}</div>
        <p class="dna-card__core">${t.core[l]}</p>
      </li>`;
  }

  function renderDNA(l) {
    const track = document.getElementById("dna-track");
    if (!track) return;
    track.innerHTML = DNA.map((t) => cardHTML(t, l === "en" ? "en" : "ko")).join("");
  }

  function initDNA() {
    renderDNA(lang());
    document.addEventListener("muon:lang", (e) => renderDNA(e.detail.lang));

    const track = document.getElementById("dna-track");
    if (!track) return;

    const step = () => {
      const card = track.querySelector(".dna-card");
      return card ? card.getBoundingClientRect().width + 20 : 320;
    };
    document.querySelectorAll("[data-dna]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const dir = btn.dataset.dna === "next" ? 1 : -1;
        track.scrollBy({
          left: dir * step(),
          behavior: reduce ? "auto" : "smooth",
        });
      });
    });

    // 드래그 스크롤
    let down = false, startX = 0, startScroll = 0, moved = false;
    track.addEventListener("pointerdown", (e) => {
      down = true;
      moved = false;
      startX = e.clientX;
      startScroll = track.scrollLeft;
      track.classList.add("is-dragging");
    });
    track.addEventListener("pointermove", (e) => {
      if (!down) return;
      const dx = e.clientX - startX;
      if (Math.abs(dx) > 4) moved = true;
      track.scrollLeft = startScroll - dx;
    });
    const end = () => {
      down = false;
      track.classList.remove("is-dragging");
    };
    track.addEventListener("pointerup", end);
    track.addEventListener("pointerleave", end);
    // 드래그 후 클릭(링크 이동 등) 방지
    track.addEventListener("click", (e) => {
      if (moved) {
        e.preventDefault();
        e.stopPropagation();
      }
    }, true);
  }

  /* ---------- 문의 폼 ---------- */
  function initForm() {
    const form = document.getElementById("contact-form");
    const status = document.getElementById("form-status");
    if (!form || !status) return;

    const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const setError = (field, on) =>
      field.closest(".field").classList.toggle("field--error", on);

    const msg = (key) => {
      const en = lang() === "en";
      return {
        success: en ? "Thanks. We'll be in touch soon." : "감사합니다. 곧 연락드리겠습니다.",
        fail: en ? "Please check the highlighted fields." : "표시된 항목을 확인해 주세요.",
      }[key];
    };

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      status.className = "form__status";
      status.textContent = "";

      // 허니팟
      if (form.elements.website && form.elements.website.value.trim() !== "")
        return;

      const f = form.elements;
      const checks = [
        [f.name, f.name.value.trim() !== ""],
        [f.type, f.type.value !== ""],
        [f.email, EMAIL_RE.test(f.email.value.trim())],
        [f.message, f.message.value.trim() !== ""],
      ];
      let ok = true;
      checks.forEach(([field, valid]) => {
        setError(field, !valid);
        if (!valid) ok = false;
      });

      if (!ok) {
        status.classList.add("is-error");
        status.textContent = msg("fail");
        const bad = form.querySelector(".field--error input, .field--error select, .field--error textarea");
        if (bad) bad.focus();
        return;
      }

      // 백엔드 연동 지점:
      // fetch('/api/contact', { method:'POST', body:new FormData(form) })
      status.classList.add("is-success");
      status.textContent = msg("success");
      form.reset();
    });

    form.querySelectorAll("input, select, textarea").forEach((el) => {
      el.addEventListener("input", () => setError(el, false));
    });
  }

  function boot() {
    initDNA();
    initForm();
  }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
