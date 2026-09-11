# CONES

**TWO ORIGINS, ONE SYSTEM.**

FOUR MINDS. TWO ORIGINS. ONE SYSTEM.
`PROJECT : CONNECTION : 00` — DEBUT SHOWCASE `09.15.2026`

**라이브 사이트:** https://seune-h0203.github.io/cones/

---

## 프로젝트 개요

CONES는 가상의 K-POP 엔터테인먼트 데뷔 프로젝트입니다. 스타트업 랜딩페이지나
학생 데모가 아니라, 세계관부터 컴포넌트 구조까지 실제 아티스트 프로젝트의 공식
웹사이트로 설계하고 구현했습니다.

CONES는 서로 혼자서는 시스템을 완성할 수 없는 두 개의 독립된 기원으로 이루어져
있습니다.

| Origin | Mandate | Artists |
| --- | --- | --- |
| **AI UNIT** | THINK / PREDICT | SERINA (`LEARN`), BAESAN (`PREDICT`) |
| **COMPUTER UNIT** | BUILD / EXECUTE | HYUN JIZEL (`DESIGN`), HAM BOM (`EXECUTE`) |

이름 자체가 컨셉의 압축입니다. **CON**nect + **ONES**(독립된 존재들)
→ *Connecting Ones.*

## 세계관 (World)

세계관은 `/` 안의 ORIGINS → CONNECTION → SYSTEM 섹션으로 이어집니다.
창설의 순간은 스크롤 진행도에 따라 전개되는 시퀀스로 연출합니다.

```
O        O   →   O + O   →   ∞   →   CONES
AI UNIT      COMPUTER UNIT
```

두 개의 원(두 기원)이 서로 수렴해 겹치고, 무한대 기호로 수렴한 뒤, 워드마크가
드러납니다. 미리 만들어둔 영상이 아니라 스크롤에 연동된 하나의 SVG
(`ConnectionSequence`)로 구현했습니다. 같은 페이지에서 이 세계를 계속 돌아가게
하는 시스템 순환도 함께 렌더링합니다.

```
LEARN → PREDICT → DESIGN → EXECUTE → LEARN → … → ∞
```

`SystemCycle`은 이를 네 개의 연결된 노드로 렌더링하고, 각 노드는 해당 ABILITY를
가진 아티스트로 바로 연결됩니다. 덕분에 세계관 페이지와 아티스트 로스터가 서로
끊긴 두 섹션이 아니라 하나의 이어진 이야기로 남습니다.

## 아티스트 (Artists)

모든 아티스트는 직접 만든 페이지가 아니라 하나의 데이터 레코드입니다. 아티스트를
추가·수정·제외하려면 `src/data/artists.ts` 한 곳만 고치면 되고, 로스터·필터·
라우팅·상세 템플릿·SEO/OG 태그·이전/다음 네비게이션이 모두 자동으로 따라옵니다.

| # | Stage name | 본명 | Unit | Ability | Position |
| --- | --- | --- | --- | --- | --- |
| 01 | **SERINA** (세리나) | 박세린 | AI UNIT | LEARN | MAIN DESIGNER |
| 02 | **BAESAN** (배산) | 배정호 | AI UNIT | PREDICT | MARKETING |
| 03 | **HYUN JIZEL** (현지젤) | 현세은 | COMPUTER UNIT | DESIGN | MAIN PLANNER |
| 04 | **HAM BOM** (함봄) | 함채림 | COMPUTER UNIT | EXECUTE | MAIN DEVELOPER |

> 이 아티스트의 `id`(`rina`), 이미지 파일명, 비디오 manifest 키는 기존 라우트 및
> 에셋과의 호환을 위해 `rina`로 유지합니다. 화면에 노출되는 모든 영역(로스터,
> 상세 페이지, OG 이미지, `<title>`)은 **SERINA / 세리나**로 표기됩니다.

각 아티스트 카드를 클릭하면 랜딩페이지 내부 모달에서 상세 정보가 열립니다. 서로 다른
정체성은 `ability` 필드가 결정하는 전용 비주얼 모티프(`AbilityMotif`)로
결정하기 때문입니다.

| Ability | 비주얼 언어 |
| --- | --- |
| LEARN | 데이터 포인트, 스캐닝 라인, 관측 |
| PREDICT | 하나의 기원에서 갈라져 나가는 미래들 |
| DESIGN | 블루프린트 프레임, 가이드, 구조 |
| EXECUTE | 활성화되는 바, 움직이는 포인터 |

각 아티스트는 자신만의 티저 슬롯도 가집니다(아래 **티저 비디오 시스템** 참고).
상세 페이지는 언제나 *그 아티스트의* 티저를 재생하며, 공용 기본 영상을 쓰지
않습니다.

## Connection : 00

`CONNECTION : 00` 섹션은 CONES의 데뷔 릴리즈를 기록합니다. 두 기원이
서로 맞물려 동작한다는 것이 증명되는 순간입니다. `00`은 두 개의 원이자 "아직
아무것도 정해지지 않았다"는 뜻으로 읽히며, 그래서 이 페이지는 새로운 아이코노그래피를
꺼내지 않고 창설 시퀀스와 같은 시각 문법을 반복합니다. 페이지의
카운트다운과 상태 라인은 홈과 동일한 `useCountdown` 훅으로 구동되므로
`COMING SOON`과 `NOW LIVE`가 서로 어긋나지 않습니다.

## 정보 구조 (Information Architecture)

```
/                    ONE-PAGE   — hero → origins → connection → system → artists → project → team → CTA
```

앱 셸은 별도 route 없이 `/`에서 랜딩페이지를 렌더링합니다.
네비게이션은 `#origins`, `#system`, `#artists`, `#project`, `#team` 앵커를 사용하며
새 route 이동 없이 하나의 스크롤 경험을 제공합니다.

## 기술 구조 (Technical Architecture)

React 19 + TypeScript (strict) + Vite. UI·애니메이션 라이브러리를 쓰지 않았고,
아래의 모든 인터랙션은 네이티브 CSS/DOM/SVG로 구현했습니다.

```
src/
├─ components/   Navbar, ArtistCard, LogoMark, TeaserVideo, TeaserPlayer,
│                VideoModal, Countdown, ConnectionSequence, SystemCycle,
│                AbilityMotif, LoadingScreen, PageTransition, CustomCursor,
│                EasterEgg, Footer, Reveal, SectionHeader …
├─ pages/        Home, World, Artists, ArtistDetail, Project, About, NotFound (레거시 확장 모듈)
├─ data/         artists.ts (단일 소스), site.ts (브랜드, 데뷔 일자,
│                유닛 카피, 시스템 순환)
├─ hooks/        useCountdown, useInView, useScrollProgress, useTeaser,
│                useSeo, useFocusTrap / useScrollLock, useMedia
├─ utils/        asset.ts (배포 환경에 안전한 경로 해석), analytics.ts
└─ styles/       tokens.css (디자인 토큰), global.css (프리미티브)

public/
├─ images/       아티스트 포트레이트 · 16:9 티저 포스터 · OG 카드 · 로고
└─ videos/       티저 파일 + manifest.json (아래 참고)
```

디자인 토큰(`src/styles/tokens.css`)이 색·타이포·간격·모션을 한곳에서 관리합니다.
`--c-black`, `--c-white`, `--c-silver`, `--chrome` 그라디언트, `--f-display`
(Bebas Neue), `--f-body`(Inter / Noto Sans KR), `--f-mono`(JetBrains Mono),
그리고 `--m-*` / `--ease*` 모션 스케일이 여기에 있습니다. 컴포넌트는 값을
하드코딩하지 않고 이 토큰을 참조합니다.

### 티저 비디오 시스템

모든 아티스트는 `public/videos/manifest.json`에 선언된 티저 슬롯을 가집니다.

```json
{
  "teasers": {
    "rina": {
      "desktop": "rina-teaser.mp4",
      "mobile": "rina-teaser-mobile.mp4",
      "label": "TEASER 01"
    }
  }
}
```

- `desktop`은 필수이며, `mobile`(9:16 컷)은 좁은 뷰포트에서 자동으로 선택됩니다.
- 홈의 `WATCH TEASER` 버튼은 `project` 키를 참조합니다.
- **없는 파일을 지어내지 않습니다.** manifest에 등록되지 않은 아티스트는 실제
  포트레이트를 포스터로 띄우고 `SIGNAL PENDING` 상태로 표시합니다. 가짜 영상이나
  플레이스홀더 영상을 쓰지 않습니다.
- 재생은 `muted`, `playsInline`, `preload="metadata"`이며 실제 포스터 프레임을
  사용합니다. 소리와 함께 자동 재생되는 것은 없습니다.
- `IntersectionObserver`가 플레이어가 화면에 들어올 때만 재생을 시작하고 벗어나는
  즉시 정지시킵니다. 동시에 두 개 이상의 티저가 디코딩되지 않으며, 필요해지기
  전까지 아무것도 내려받지 않습니다.
- 커스텀 컨트롤 바(재생/정지, 탐색, 음소거, 전체화면)는 내부적으로 네이티브
  `<video>`입니다. 따라서 키보드·스크린리더 사용자도 div로 흉내 낸 플레이어가
  아니라 실제 미디어 시맨틱을 얻습니다.

## 인터랙션 (Interaction)

- **스크롤 리빌** — `Reveal` / `useInView`를 섹션 단위로 적용.
- **창설 시퀀스** — `ConnectionSequence`: 스크롤 위치가 두 개의 SVG 원을 무한대
  기호와 워드마크로 이끕니다. 영상이 필요 없습니다.
- **시스템 순환** — `SystemCycle`: LEARN → PREDICT → DESIGN → EXECUTE 노드가
  화면에 들어오면서 하나의 루프로 연결됩니다.
- **Ability 모티프** — 아티스트별 SVG 언어(**아티스트** 항목 참고).
- **로고 마크** — `LogoMark`: 전원이 켜지는 듯한 와이프 리빌, 워드마크 자체의
  알파 실루엣을 따라 흐르는 크롬 하이라이트, 그리고 숨 쉬듯 번지는 글로우.
  `prefers-reduced-motion`에서는 모두 비활성화됩니다.
- **커서 추종 마이크로 인터랙션** — `CustomCursor`. 데스크톱(`hover: hover` +
  `pointer: fine`)에서만 동작하며, 터치 디바이스에는 나타나지 않습니다.
- **페이지 전환** — 라우트 사이를 지나가는 크롬 라인 와이프.
- **비디오 모달** — 포커스 트랩이 걸리고, `Escape`로 닫으면 포커스가 트리거로
  돌아오며, 열려 있는 동안 배경 스크롤이 잠깁니다.
- **이스터에그** — 문서화하지 않은 은근한 인터랙션이 하나 있습니다. 존재하지만
  여기에 적어두지는 않습니다.

위의 어떤 것도 장식을 위한 장식이 아닙니다. 모든 애니메이션은 상태 변화(섹션이
화면에 들어옴, 라우트가 바뀜, ABILITY가 설명됨)를 나타내며,
`prefers-reduced-motion`이 확인되는 모든 지점에서 모션은 즉각적인 상태 변화로
축소됩니다.

## 성능 (Performance)

- 라우트 단위 코드 스플리팅(페이지별 `React.lazy`). 최초 번들은 전체 페이지가
  아니라 셸입니다.
- 이미지는 `srcset`(포트레이트 + 축소 변형)으로 제공되며, 크리티컬 패스 밖에서는
  `loading="lazy"`가 적용됩니다.
- 영상은 `metadata` 이상으로 미리 불러오지 않고, 실제 포스터 프레임을 사용하며,
  한 번에 하나만 재생됩니다(**티저 비디오 시스템** 참고).
- UI·애니메이션 의존성이 0입니다. 런타임 의존성은 `react`, `react-dom`,
  `react-router-dom`이 전부입니다.
- `vite.config.ts`가 `base: "./"`로 빌드하므로 모든 에셋이 상대 URL로 해석됩니다.
  같은 빌드 결과물이 도메인 루트에서도, GitHub Pages 프로젝트 하위 경로에서도
  수정 없이 동작합니다.

## 접근성 (Accessibility)

- 시맨틱 랜드마크(`header`, `nav`, `main`, `footer`), 라우트당 하나의 `<h1>`,
  실제 `<button>` / `<a>` 요소를 사용합니다. 인터랙티브 컨트롤을 대신하는 클릭
  가능한 `<div>`는 없습니다.
- 의미 있는 모든 이미지에 `alt` 텍스트가 있고, 장식 요소는 `aria-hidden`입니다.
- 포커스는 어디서나 보이며(`:focus-visible`), 비디오 모달은 열려 있는 동안 포커스를
  가두고 닫을 때 트리거로 되돌립니다.
- `Escape`로 비디오 모달과 모바일 메뉴를 닫습니다.
- 본문 바로가기(skip-to-content) 링크가 모든 페이지의 첫 번째 포커스 대상입니다.
- `prefers-reduced-motion: reduce`는 스크롤 기반 창설 시퀀스를 포함한 모든
  애니메이션을 정지 상태로 축소합니다.

## 배포 (Deployment)

저장소: **[seune-h0203/cones](https://github.com/seune-h0203/cones)**
라이브 URL: **https://seune-h0203.github.io/cones/**

빌드 결과물은 완전한 정적 파일(Vite → `dist/`)이며,
`.github/workflows/deploy.yml`이 함께 포함되어 있습니다. 이 워크플로가 `main`에
푸시될 때마다 빌드 후 `actions/deploy-pages`를 통해 **GitHub Pages**로 배포합니다.

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # tsc --noEmit + 프로덕션 빌드 → dist/
npm run preview    # 프로덕션 빌드를 로컬에서 서빙
```

저장소 설정은 **Settings → Pages → Source → GitHub Actions**에서 한 번만 하면
됩니다. 그 외의 서버 설정은 필요하지 않습니다.

### 네트워크 비의존 배포

외부 CDN이나 Google Fonts를 사용하지 않으므로, 한 번 의존성을 설치한 뒤 생성한 `dist/` 폴더만
USB, 사내 서버, 정적 호스팅, 로컬 웹 서버로 옮겨 배포할 수 있습니다. 이미지와 티저 영상도
`public/`에서 함께 복사되어 빌드에 포함됩니다.

```bash
npm run build:offline
npm run serve:dist
```

빌드가 끝나면 `dist/`가 독립적인 정적 배포본입니다. `dist/`를 정적 파일 서버의 공개 폴더로
지정하면 인터넷 연결 없이도 CONES가 동작합니다. 브라우저 보안 정책상 `index.html`을
`file://`로 직접 여는 대신 작은 정적 서버를 사용해야 합니다.

- `vite.config.ts`의 `base: "./"`가 모든 에셋 경로를 상대 경로로 유지하므로,
  도메인 루트에서 서빙하든 프로젝트 하위 경로에서 서빙하든 빌드가 그대로
  올바르게 동작합니다. 저장소마다 손으로 고칠 것이 없습니다.
- `HashRouter` 덕분에 GitHub Pages의 정적 파일 서버가 별도의 404/rewrite 트릭
  없이도 모든 딥링크와 새로고침을 처리할 수 있습니다.

## TEAM 02

CONES는 **TEAM 02**가 제작합니다. 아티스트 로스터의 그 네 사람과 같은 팀이며,
각 멤버의 제작 역할과 사이트 상의 `ABILITY`는 그대로 대응됩니다.

- **HYUN JIZEL** — MAIN PLANNER → `DESIGN`
- **HAM BOM** — MAIN DEVELOPER → `EXECUTE`
- **SERINA** — MAIN DESIGNER → `LEARN`
- **BAESAN** — MARKETING → `PREDICT`

CEO / DIRECTOR — 김남주
