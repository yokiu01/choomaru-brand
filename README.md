# 춤마루(Choomaru) 브랜드 사이트

최상위 브랜드 **춤마루(Choomaru)**의 메인 브랜드 사이트. 춤마루의 서비스로
앱 **MU:ON(무온)**, 쇼핑몰 **MU:V(무브)**, **춤 DNA 테스트**, **AI 기술**을 소개합니다.

**멀티 페이지** 구성 — 상단 네비게이션은 앵커 스크롤이 아니라 **각 페이지로 이동**합니다.

| 페이지 | 파일 | 내용 |
|--------|------|------|
| 홈 | `index.html` | 브랜드 소개 · 서비스 미리보기 · 전통×전문성 |
| 소개 | `about.html` | 미션 · 전통의 깊이(기본동작·18감정) · 전문성 · 연혁 |
| 서비스 | `services.html` | MU:ON · MU:V · 춤 DNA · AI API · 데모 |
| 춤 DNA | `dna.html` | 8유형 갤러리 · 진단 방식 |
| 기술 | `technology.html` | 파이프라인 · 데이터셋/라벨링 · 특허/연구 |
| 문의 | `contact.html` | 제휴·투자·교육 문의 폼 |

> 설계 근거는 [`BRAND-SITE-DESIGN.md`](./BRAND-SITE-DESIGN.md) 참고.
> 디자인: 묵향(먹/한지/금) × 시네마틱 럭셔리 × 에디토리얼 × 키네틱. 이미지/영상은 라벨 placeholder.

## 실행

빌드 도구가 필요 없는 **정적 사이트**입니다. 정적 서버로 열기만 하면 됩니다.

```bash
# 아무 정적 서버나 사용
python3 -m http.server 8765
# → http://localhost:8765
```

`file://`로 직접 열어도 동작하지만, 폰트/CDN과 일부 동작은 HTTP에서 가장 정확합니다.

## 디자인 방향 (3중 무드)

- **정보 전달(생태계 · DNA · 기술)** → **에디토리얼/매거진**: 초대형 디스플레이 세리프, 인덱스 번호, hairline 그리드, 강한 대비
- **브랜드 감성(Hero · 문장 · 비전 · CTA · 푸터)** → **시네마틱 럭셔리**: 풀블리드 미디어, 그레인, 골드 글로우, 핀 스크롤, 초대형 워드마크
- **사용자 경험** → **키네틱**: 커스텀 커서, 마그네틱 버튼, 패럴랙스, 마퀴, 카운트업, word-by-word 리빌, 드래그 갤러리, 스크롤 프로그레스

> 이미지/영상은 **라벨이 붙은 빈 자리(placeholder)** 로 둠 — "여기에 ~넣으세요" 문구.

## 구조

```
muon-brand-site/
├── index.html              # 랜딩 (단일 페이지)
├── styles/
│   ├── tokens.css          # 토큰 v2 (시네마틱 다크 + 에디토리얼 스케일)
│   ├── typography.css      # 초대형 디스플레이 · 인덱스 번호 · ed-head
│   ├── global.css          # reset · 그레인 · 커서 · 프로그레스 · placeholder · 마퀴 · 키네틱 유틸
│   ├── sections.css        # nav · hero(cine) · marquee · ecosystem(editorial)
│   └── sections-2.css      # dna(drag) · tech · vision(pinned) · cta · form · footer
├── js/
│   ├── i18n.js             # KR(기본)/EN 토글, 'muon:lang' 이벤트
│   ├── motion.js           # 키네틱 엔진(커서·마그네틱·패럴랙스·마퀴·카운트업·split·nav·progress)
│   └── main.js             # 춤 DNA 갤러리(렌더·드래그·화살표) · 폼 검증
└── BRAND-SITE-DESIGN.md    # 설계 문서
```

## 구현된 것

- **섹션**: 네비 → Hero(풀블리드 영상 자리 + 키네틱 타이포) → 마퀴 → 브랜드 문장 → 생태계(에디토리얼 인덱스 리스트) → 춤 DNA 8유형(드래그 갤러리) → 기술(에디토리얼 + 카운트업 + 파이프라인) → 비전(핀 스크롤 타임라인) → CTA(초대형 키네틱) → 문의(에디토리얼 폼) → 푸터(초대형 워드마크)
- **KR/EN 이중언어** (localStorage, DNA·split 텍스트 동적 재구성)
- **모션**: transform/opacity만, `prefers-reduced-motion`·터치 환경 완전 대응(커서·패럴랙스·마퀴 자동 비활성)
- **접근성**: 시맨틱 HTML, skip-link, aria-label, 포커스 가시 상태
- **문의 폼**: 클라/허니팟 검증 (백엔드 연동 지점 `main.js` `initForm` 주석)
- **반응형**: 320 / 768 / 1024 / 1440

## 연결해야 할 것 (플레이스홀더)

설계서 부록의 열린 결정사항에 따라 확정 후 교체:

| 항목 | 현재 값 | 위치 |
|------|---------|------|
| 도메인/서브도메인 | `*.muon.kr` 가정 | `index.html` 링크 |
| 앱 스토어 링크 | `#contact`로 임시 | Hero · 생태계 · CTA |
| 문의 폼 백엔드 | 클라 검증까지 | `js/main.js` `initForm` |
| 이메일 | `hello@muon.kr` | 문의 섹션 |
| SRI / CSP | 프로덕션 추가 필요 | `index.html` head, 서버 헤더 |
| OG 이미지 | 미설정 | head 메타 |

## 프로덕션 체크리스트

- [ ] 보안 헤더 (CSP nonce, HSTS, X-Frame-Options 등 — `BRAND-SITE-DESIGN.md` §8)
- [ ] 폰트 self-host 또는 실제 SRI 해시
- [ ] hero 비주얼을 정적 이미지로 둘 경우 width/height + AVIF/WebP
- [ ] Lighthouse / 시각 회귀(320·768·1024·1440) / a11y 자동 점검
- [ ] 문의 폼 서버사이드 검증 + rate limit
