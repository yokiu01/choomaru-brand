/* ==========================================================================
   i18n — KR(기본) / EN 토글
   data-en 속성을 가진 요소의 innerHTML을 교체. 원문(KR)은 최초 1회 보존.
   언어 전환 시 'muon:lang' 커스텀 이벤트를 발행 → 동적 컴포넌트가 재렌더.
   ========================================================================== */

(function () {
  "use strict";

  const STORAGE_KEY = "muon-lang";
  const root = document.documentElement;

  /** 모든 번역 대상의 원문(KR) 보존 */
  function captureKorean() {
    document.querySelectorAll("[data-en]").forEach((el) => {
      if (el.dataset.ko === undefined) {
        el.dataset.ko = el.innerHTML.trim();
      }
    });
  }

  /** 지정 언어로 텍스트 적용 */
  function apply(lang) {
    document.querySelectorAll("[data-en]").forEach((el) => {
      const next = lang === "en" ? el.dataset.en : el.dataset.ko;
      if (typeof next === "string") el.innerHTML = next;
    });

    root.setAttribute("lang", lang === "en" ? "en" : "ko");

    document.querySelectorAll(".lang-toggle [data-lang]").forEach((btn) => {
      const active = btn.dataset.lang === lang;
      btn.classList.toggle("is-active", active);
      btn.setAttribute("aria-pressed", String(active));
    });

    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch (_) {
      /* localStorage 차단 환경 무시 */
    }

    document.dispatchEvent(
      new CustomEvent("muon:lang", { detail: { lang } })
    );
  }

  function init() {
    captureKorean();

    let initial = "ko";
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === "en" || saved === "ko") initial = saved;
    } catch (_) {
      /* noop */
    }
    apply(initial);

    document.querySelectorAll(".lang-toggle [data-lang]").forEach((btn) => {
      btn.addEventListener("click", () => apply(btn.dataset.lang));
    });
  }

  // 현재 언어를 외부에서 조회할 수 있도록 노출
  window.MUON = window.MUON || {};
  window.MUON.getLang = () => root.getAttribute("lang") || "ko";

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
