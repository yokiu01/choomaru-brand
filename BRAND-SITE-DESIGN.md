# MU:ON 브랜드 사이트 설계 문서

> 메인 도메인(apex)에 띄울 **브랜드 허브 사이트** 설계서
> 모든 서브도메인(앱 · 춤 DNA 테스트 · AI · 라벨링 도구)을 하나의 브랜드로 묶는 관문(gateway)
>
> 디자인 시스템: **묵향(墨香)** — 한국 전통 미학 + 현대적 미니멀리즘
> 버전: v1.0 (2026-06-18)

---

## 1. 배경과 목적

### 현재 상황

춤마루/MU:ON 생태계는 각 기능이 **서브도메인 단위 독립 사이트**로 존재하지만, 이를 묶는 **메인(apex) 브랜드 사이트가 없다.**

| 서브 프로젝트 | 성격 | 예상 서브도메인 |
|--------------|------|----------------|
| `MUON_APP` | Flutter 모바일 앱 (AI 동작 분석 · 게이미피케이션) | `app.muon.kr` |
| `dance-dna-types` | 8가지 춤 DNA 유형 테스트 웹 | `dna.muon.kr` |
| `choomaru_mvp` | Streamlit 인터랙티브 MVP (DNA·동작따라하기·밈) | `mvp.muon.kr` |
| `choomaru-ai` | BI-LSTM 감정 분류 AI / FastAPI | `api.muon.kr` |
| `labeling-tool` | MediaPipe 3D 스켈레톤 라벨링 도구 | `label.muon.kr` |

### 메인 브랜드 사이트가 해야 할 일

1. **브랜드 정체성 전달** — "MU:ON이 무엇이고 왜 존재하는가"를 30초 안에 각인
2. **생태계 관문** — 방문자를 올바른 서브 서비스로 분기 (앱 다운로드 / DNA 테스트 / 데모)
3. **신뢰 구축** — 기술력(AI·특허), 전통의 깊이, 팀/비전 전달
4. **전환** — 앱 다운로드 · DNA 테스트 시작 · 문의(B2B/투자/제휴)

### 측정 목표 (KPI)

- 1차 전환: **춤 DNA 테스트 시작** 클릭률 (가장 가벼운 진입점)
- 2차 전환: **앱 다운로드** 클릭률
- 3차 전환: **B2B/제휴 문의** 폼 제출

---

## 2. 브랜드 포지셔닝

### 한 줄 정의

> **MU:ON** — AI로 한국의 몸짓을 배우고, 나만의 춤 DNA를 발견하는 디지털 무용 플랫폼

### 브랜드 네임의 의미

- **MU:ON** = 無(무) · 默(묵) · Move + On — "멈춤과 흐름", 정중동(靜中動)의 미학
- 콜론(`:`)은 전통(좌)과 현대(우)를 잇는 시각적 장치 — 로고·타이포에서 액센트로 활용

### 톤 앤 보이스

| 축 | 지향 | 지양 |
|----|------|------|
| 무드 | 차분 · 깊이 · 절제된 자신감 | 시끄러움 · 과장 |
| 언어 | MZ 친화 + 전통의 격조 | 유치한 밈 남발 / 딱딱한 학술체 |
| 시각 | 여백 · 먹의 농담 · 금색 포인트 | 무지개 그라데이션 · 형광색 |

### 핵심 메시지 3종

1. **"몸으로 잇는 전통"** — 전통무용을 박물관에서 꺼내 내 몸으로 경험
2. **"AI가 보는 나의 춤"** — MediaPipe 33관절 + 18감정 분류로 동작을 읽어냄
3. **"당신의 춤 DNA"** — 8가지 유형으로 자기 표현 스타일 발견

---

## 3. 디자인 시스템 (묵향 계승)

> 기존 `dance-dna-types/디자인/묵향 DESIGN-GUIDE.md`를 단일 출처(SSOT)로 계승.
> 메인 사이트는 이 토큰을 그대로 쓰되 **더 큰 여백·더 강한 hero 임팩트**를 적용한다.

### 3.1 원칙 (불변)

```
1. linear-gradient 금지 — solid 컬러 + radial 미광 + 한지 노이즈만 허용
2. 한국 전통 미학 + 현대 미니멀리즘
3. 먹(ink) · 한지(paper) · 금(gold)의 3색 위계
```

### 3.2 컬러 토큰

```css
:root {
  /* 먹 / 다크 */
  --ink-800: #1A1A2E;   /* Hero · 버튼 · Footer */
  --ink-700: #2D2D44;   /* hover */

  /* 한지 / 라이트 */
  --paper:   #FAF8F5;   /* 메인 배경 (따뜻한 한지색) */
  --white:   #FFFFFF;   /* 카드 */

  /* 금 / 액센트 */
  --gold:      #B8860B; /* 진행바 · 밑줄 · 테두리 hover */
  --gold-dark: #8B6914; /* 텍스트용 */

  /* 8 DNA 유형 컬러 (DNA 섹션 좌측 컬러바) */
  --type-1: #B83232; /* 파워풀 - 크림슨 */
  --type-2: #2E5A8B; /* 정밀 - 로열블루 */
  --type-3: #3D4F4F; /* 미니멀 - 슬레이트 */
  --type-4: #7A3B7A; /* 표현자 - 플럼 */
  --type-5: #C65D2A; /* 테크니션 - 번트오렌지 */
  --type-6: #6B4423; /* 클래시컬 - 세피아 */
  --type-7: #B8860B; /* 그루버 - 골드 */
  --type-8: #2D7A7A; /* 실루엣 - 틸 */

  /* Gray Scale */
  --gray-100:#F5F5F5; --gray-200:#EEEEEE; --gray-300:#E0E0E0;
  --gray-500:#9E9E9E; --gray-600:#757575; --gray-700:#616161;
}
```

> 글로벌 룰(web/coding-style)은 oklch를 권장하나, **기존 생태계와의 시각적 일관성**을 위해 묵향 HEX 토큰을 우선한다. 신규 보조 색 추가 시에만 oklch 사용.

### 3.3 타이포그래피

```html
<link href="https://fonts.googleapis.com/css2?family=Gowun+Batang:wght@400;700&display=swap" rel="stylesheet">
<link href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css" rel="stylesheet">
```

| 용도 | 크기 | 폰트 |
|------|------|------|
| Hero Display | `clamp(44px, 9vw, 96px)` | Gowun Batang 700 |
| Section Title | `clamp(28px, 5vw, 44px)` | Gowun Batang 700 |
| Lead / 부제 | `clamp(16px, 2.2vw, 20px)` | Pretendard 400 |
| Body | `15-16px` | Pretendard 400 |
| Caption | `12-13px` | Pretendard 400 |

- 제목은 한국적 세리프(Gowun Batang), 본문은 현대 산세리프(Pretendard) — 명확한 페어링 전략
- `font-display: swap`, **critical weight(Gowun 700 / Pretendard 400)만 preload**

### 3.4 간격 · 라운드 · 그림자

```css
:root {
  --space-section: clamp(80px, 10vw, 160px);  /* 섹션 간 수직 리듬 */
  --radius-card: 18px;
  --radius-pill: 9999px;
  --shadow-card: 0 8px 32px rgba(13,13,18,0.10);
  --shadow-btn:  0 4px 16px rgba(13,13,18,0.08);
  --duration-fast: 150ms;
  --duration-normal: 300ms;
  --ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);
}
```

### 3.5 시그니처 디테일

- **한지 노이즈 오버레이**: 전역 `body::before` SVG fractalNoise, opacity 0.025
- **금색 밑줄**: 섹션 타이틀 하단 `40px × 2px` gold bar
- **다크 섹션 미광**: radial-gradient(gold 8% / blue 6%)만 허용
- **좌측 컬러바**: DNA 유형 카드 좌측 4px 유형색 인디케이터

---

## 4. 사이트맵 & 페이지 구조

```
/                  메인 랜딩 (브랜드 허브) ← 본 문서의 핵심
/about             브랜드 스토리 · 비전 · 전통의 깊이
/ecosystem         서비스 생태계 전체 안내 (서브도메인 분기)
/technology        AI 기술 · 특허 · 데이터 (신뢰)
/business          B2B · 제휴 · 투자 문의 (폼)
/news              소식 · 보도 (선택)
```

> MVP는 **단일 페이지 랜딩(`/`) + 문의 폼**으로 시작하고, about/technology는 랜딩 내 섹션으로 흡수했다가 트래픽 증가 시 분리.

---

## 5. 메인 랜딩(`/`) 섹션 설계

각 섹션은 **에디토리얼 리듬**(여백 비대칭 · 스케일 대비)을 따르며, 균일한 카드 그리드를 피한다.

### S0 · 네비게이션 (sticky)

- 좌: `MU:ON` 워드마크 (콜론은 gold)
- 중: 생태계 / 기술 / 브랜드 / 문의
- 우: **[춤 DNA 테스트]** (pill, ink-800) · 언어 토글(KR/EN)
- 스크롤 시 paper 반투명 + blur backdrop, 하단 hairline

### S1 · Hero (다크, 풀스크린)

```
배경: --ink-800 + radial 미광 + 한지 노이즈
좌측(텍스트):
  eyebrow: "AI 한국무용 플랫폼"
  H1: "멈춤과 흐름,
       당신의 몸이 잇는 전통"
  lead: "MediaPipe와 AI가 읽어내는 나의 춤.
         8가지 춤 DNA로 표현 스타일을 발견하세요."
  CTA: [춤 DNA 테스트 시작 →] (gold accent) · [앱 다운로드]
우측(비주얼):
  전통 무용 실루엣 위로 33개 관절 포인트 라인 오버레이 (먹 라인 드로잉)
  → 정중동을 표현하는 느린 라인 reveal 모션
```

- 모션: H1 단어 단위 stagger reveal, 관절 라인 `clip-path`/`stroke-dashoffset` 드로잉 (compositor-friendly only)
- `prefers-reduced-motion` 시 모든 reveal 즉시 표시

### S2 · 브랜드 한 문장 (라이트, 큰 여백)

- 한지 배경 위 중앙 정렬 대형 세리프 카피 1문장
- "전통무용을 박물관에서 꺼내, 당신의 몸으로." — scale 대비로 임팩트

### S3 · 생태계 (서비스 분기) — **핵심 전환 섹션**

> 균일 그리드 금지. **bento 비대칭 레이아웃**으로 위계 부여.

```
┌─────────────────────────┬──────────────┐
│  [大] 춤 DNA 테스트       │ [中] MU:ON 앱 │
│  "1분 만에 발견하는       │  AI 동작분석   │
│   나의 춤 유형"           │  게이미피케이션 │
│  → dna.muon.kr           │  → 앱스토어    │
├──────────────┬──────────┴──────────────┤
│ [小] 인터랙티브 데모        │ [小] 개발자/연구 │
│  동작 따라하기 · 밈         │  AI API · 라벨링 │
│  → mvp.muon.kr           │  → api/label    │
└──────────────────────────┴──────────────┘
```

- 각 카드: hover 시 border→gold, 그림자 상승, 아이콘 미세 모션
- 카드별 좌측 유형색 컬러바로 시각 구분

### S4 · 춤 DNA 8유형 (라이트)

- 8개 유형을 **가로 스크롤 캐러셀** 또는 비대칭 갤러리로 제시
- 각 카드: 유형색 컬러바 + 별명 + 한 줄 + 붓터치 SVG 아이콘

| # | 유형 | 별명 | 핵심 |
|---|------|------|------|
| 1 | 파워풀 | 무대 장악형 | 강한 힘으로 표현 |
| 2 | 정밀 | 디테일 집착형 | 손끝까지 감성 |
| 3 | 미니멀 | 프레임 장인 | 동작을 분절 |
| 4 | 표현자 | 감정 과몰입형 | 감정을 연기 |
| 5 | 테크니션 | 스킬 덕후 | 기술로 보여줌 |
| 6 | 클래시컬 | 정적 카리스마 | 본질을 품음 |
| 7 | 그루버 | 리듬이 체질 | 리듬에 맡김 |
| 8 | 실루엣 | 라인의 정석 | 선과 모양 |

- CTA: [내 유형 알아보기 →] → dna 서브도메인

### S5 · 기술 신뢰 (다크)

- 3개 지표 카드: **33** 관절 포인트 · **18** 감정 클래스 · **N** 전문가 동작 영상
- 파이프라인 다이어그램: `웹캠 → MediaPipe 33관절 → BI-LSTM(Attention) → 18감정 분류 → 피드백`
- 특허 포트폴리오 / 논문 언급 (신뢰 강화)
- 데이터 비주얼은 디자인 시스템 일부로 취급 (gold/ink 팔레트, 별도 라이브러리 기본 스타일 금지)

### S6 · 비전 / 스토리 (라이트)

- 좌: 세로 타임라인 (전통 → 디지털 전환 → AI)
- 우: 브랜드 미션 카피 + 팀/창업 배경 한 단락

### S7 · CTA 밴드 (다크, 풀폭)

- "지금, 당신의 춤 DNA를 발견하세요."
- 듀얼 CTA: [DNA 테스트] · [앱 다운로드]

### S8 · B2B/제휴 문의 (라이트)

- 간단 폼: 이름 · 소속 · 유형(교육기관/투자/제휴/기타) · 메시지
- 허니팟 + 서버사이드 검증 + rate limit (CAPTCHA 지양)

### S9 · Footer (다크)

- 워드마크 · 한 줄 소개
- 서비스 링크(앱/DNA/데모/API) · 회사(소개/기술/문의) · 정책(개인정보/이용약관)
- SNS · 사업자 정보 · `© 2026 MU:ON`

---

## 6. 반응형 전략

| 브레이크포인트 | 레이아웃 |
|---------------|---------|
| 320 / 375 | 1단 스택, Hero 텍스트 우선, 비주얼 하단 |
| 768 | 생태계 bento 2열, DNA 캐러셀 |
| 1024 | Hero 2분할, bento 풀 구성 |
| 1440 / 1920 | 최대 폭 1280px 컨테이너 + 좌우 여백 확장 |

- 모든 BP에서 가로 overflow 0, 터치 타깃 ≥ 44px
- Playwright 스크린샷 회귀: 320/768/1024/1440

---

## 7. 기술 스택 제안

| 영역 | 선택 | 이유 |
|------|------|------|
| 프레임워크 | **Astro** (또는 Next.js static) | 콘텐츠 중심 랜딩, JS 최소 출하 — 마이크로사이트 번들 예산(JS<80kb) 충족 |
| 스타일 | CSS + 묵향 토큰 (`tokens.css`) | 디자인 시스템 직접 제어, 그라데이션 금지 원칙 강제 용이 |
| 모션 | CSS transition + 소량 GSAP/ScrollTrigger **동적 import** | hero 라인 드로잉 등만 JS, 나머지 CSS |
| 폼 | 서버리스 함수 (또는 Firebase) + honeypot | 기존 생태계가 Firebase 사용 중 |
| 호스팅 | 정적 호스팅 (Vercel/Firebase Hosting) | 서브도메인과 동일 인프라 통합 |
| 분석 | 경량 analytics (전환 이벤트 추적) | KPI 측정 |

### 파일 구조 (feature 기준)

```
muon-brand-site/
├── BRAND-SITE-DESIGN.md      ← 본 문서
├── src/
│   ├── components/
│   │   ├── hero/             Hero.astro, JointOverlay, hero.css
│   │   ├── ecosystem/        EcosystemBento, ServiceCard
│   │   ├── dna/              DnaCarousel, DnaTypeCard
│   │   ├── tech/             TechMetrics, PipelineDiagram
│   │   ├── cta/              CtaBand, ContactForm
│   │   └── ui/               Button, SurfaceCard, SectionTitle
│   ├── styles/
│   │   ├── tokens.css        묵향 토큰 (SSOT)
│   │   ├── typography.css
│   │   └── global.css        한지 노이즈 · reset
│   ├── lib/                  animation.ts, analytics.ts
│   └── pages/                index.astro, business.astro
└── public/                   폰트 subset, hero 영상/이미지(AVIF/WebP)
```

---

## 8. 성능 · 접근성 · 보안 체크리스트

### 성능 (마이크로사이트 예산)

- [ ] JS < 80kb gzip · CSS < 15kb
- [ ] LCP < 2.5s / CLS < 0.1 / INP < 200ms
- [ ] hero 이미지/영상만 `fetchpriority=high`, 그 외 `loading=lazy`
- [ ] 모든 이미지 width/height 명시, AVIF/WebP
- [ ] 폰트 critical weight만 preload, 나머지 swap
- [ ] GSAP 등 무거운 라이브러리 동적 import
- [ ] 모션은 transform/opacity/clip-path만 — 레이아웃 속성 애니메이션 금지

### 접근성

- [ ] 시맨틱 HTML (header/nav/main/section/footer + aria-label)
- [ ] 키보드 내비게이션 · 포커스 가시 상태
- [ ] `prefers-reduced-motion` 완전 대응
- [ ] 색 대비 WCAG AA (ink/paper/gold 조합 검증)

### 보안 (web/security)

- [ ] nonce 기반 CSP (unsafe-inline script 금지)
- [ ] HSTS · X-Content-Type-Options · X-Frame-Options: DENY · Referrer-Policy
- [ ] 문의 폼: 허니팟 + rate limit + 클라/서버 양측 검증
- [ ] 외부 폰트 CDN은 SRI 또는 self-host 검토

---

## 9. 안티-템플릿 점검 (web/design-quality)

본 설계가 충족하는 필수 품질 (4개 이상 요구 → 충족):

1. ✅ **스케일 대비** — Hero 96px 세리프 vs 본문 16px
2. ✅ **비균일 리듬** — 섹션별 비대칭 여백, bento 레이아웃
3. ✅ **깊이/레이어** — 다크/라이트 교차, 한지 노이즈, radial 미광, 관절 라인 오버레이
4. ✅ **타이포 페어링** — Gowun Batang × Pretendard 의도적 조합
5. ✅ **시맨틱 컬러** — 8 DNA 유형색이 장식이 아닌 분류 기능
6. ✅ **설계된 상태** — 카드/버튼 hover·focus·active 정의
7. ✅ **에디토리얼 구성** — bento·캐러셀로 그리드 탈피
8. ✅ **데이터 비주얼** — 파이프라인 다이어그램을 디자인 시스템에 통합

피해야 할 것: 중앙정렬 헤드라인 + 그라데이션 블롭 + 균일 카드 3열 = **금지**.

---

## 10. 구현 단계 제안

| 단계 | 범위 | 산출물 |
|------|------|--------|
| P1 | 토큰 + 글로벌 스타일 + 네비/Footer | 디자인 시스템 가동 |
| P2 | Hero + 생태계 bento (핵심 전환) | 단일 페이지 MVP 배포 |
| P3 | DNA 유형 + 기술 신뢰 섹션 | 콘텐츠 완성 |
| P4 | 문의 폼 + 비전 + 분석 연동 | 전환 측정 시작 |
| P5 | 시각 회귀 · a11y · Lighthouse · 보안 헤더 | 품질 게이트 통과 |

---

## 부록 · 열린 결정사항

확정 필요 (담당자 확인):

1. **공식 도메인** — `muon.kr` / `muon.app` / 기타? (서브도메인 명명에 영향)
2. **브랜드명 표기** — `MU:ON` 고정 vs `춤마루` 병기 정책
3. **로고/워드마크** 최종 에셋 보유 여부
4. **다국어** — KR 단독 출시 vs KR/EN 동시
5. **앱 출시 상태** — 스토어 링크 활성화 시점 (S3/S7 CTA 분기)
