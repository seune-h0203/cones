# CONES

> DIFFERENT ONES, CONNECTED AS ONE.

첫 번째 프로젝트는 `PROJECT : CONNECTION : 00`이며, 데뷔 쇼케이스는 **2026.09.15**로 예정되어 있다. 공식 사이트는 [seune-h0203.github.io/cones](https://seune-h0203.github.io/cones/), 코드 저장소는 [github.com/seune-h0203/cones](https://github.com/seune-h0203/cones)다.

## 목차

- [1. 개요](#1-개요)
- [2. 멤버](#2-멤버)
  - [2.1. AI UNIT](#21-ai-unit)
  - [2.2. COMPUTER UNIT](#22-computer-unit)
  - [2.3. 시스템 순환](#23-시스템-순환)
- [3. 세계관](#3-세계관)
  - [3.1. 콘셉트와 메시지](#31-콘셉트와-메시지)
  - [3.2. 로고](#32-로고)
  - [3.3. 비주얼](#33-비주얼)
- [4. 프로젝트](#4-프로젝트)
  - [4.1. PROJECT : CONNECTION : 00](#41-project--connection--00)
  - [4.2. One Page Landing Page](#42-one-page-landing-page)
  - [4.3. 티저](#43-티저)
  - [4.4. OFFICIAL MD](#44-official-md)
- [5. 기술](#5-기술)
  - [5.1. Tech Stack](#51-tech-stack)
  - [5.2. 실행과 빌드](#52-실행과-빌드)
  - [5.3. 프로젝트 구조](#53-프로젝트-구조)
  - [5.4. 배포](#54-배포)
  - [5.5. 접근성과 성능](#55-접근성과-성능)
- [6. 협업과 기록](#6-협업과-기록)
  - [6.1. 협업 방식](#61-협업-방식)
  - [6.2. 타임라인](#62-타임라인)

---

## 1. 개요

| 항목 | 내용 |
| --- | --- |
| 그룹명 | CONES |
| 슬로건 | TWO ORIGINS, ONE SYSTEM. |
| 구성 유닛 | AI UNIT, COMPUTER UNIT |
| 멤버 수 | 4인 |
| 소속 | CONES (CEO / DIRECTOR — 김남주) |
| 첫 프로젝트 | PROJECT : CONNECTION : 00 |
| 데뷔(예정) | 2026.09.15 |
| 공식 사이트 | https://seune-h0203.github.io/cones/ |

<img src="public/images/director-portrait-sm.jpg" width="140" alt="김남주 CEO / DIRECTOR"><br>
<sub><b>김남주</b> · CEO / DIRECTOR</sub>

**CONES = CON**necT **+ ONES**(독립된 존재들)**.** 혼자서는 시스템을 완성할 수 없는 서로 다른 존재들이 연결되어 하나가 된다는 세계관을, 이름 자체에 압축해 담았다. 이 문서 전체에서 "팀명 뜻"은 이 한 문단으로 충분하며, 아래 다른 장에서는 반복 설명 없이 이 정의를 그대로 참조한다.

CONES는 AI UNIT과 COMPUTER UNIT이라는 두 개의 독립된 유닛이 하나의 시스템으로 연결되는 과정을 그린 팀 프로젝트다. 총 4명의 멤버가 **LEARN → PREDICT → DESIGN → EXECUTE**라는 하나의 순환을 이루며, 그룹명·세계관·멤버 구성·웹사이트 구조가 전부 "연결(CONNECTION)"이라는 키워드에서 파생된다. 코드 저장소는 이 세계관을 설명하는 문서인 동시에, 실제로 배포되어 동작하는 One Page Landing Page와 Supabase 기반 공식 MD 스토어의 소스이기도 하다.

## 2. 멤버

<table>
<tr>
<td align="center" width="25%"><img src="public/images/rina-portrait-sm.jpg" width="160" alt="SERINA"><br><b>SERINA</b><br><sub>AI UNIT · LEARN</sub></td>
<td align="center" width="25%"><img src="public/images/baesan-portrait-sm.jpg" width="160" alt="BAESAN"><br><b>BAESAN</b><br><sub>AI UNIT · PREDICT</sub></td>
<td align="center" width="25%"><img src="public/images/hyun-jizel-portrait-sm.jpg" width="160" alt="HYUN JIZEL"><br><b>HYUN JIZEL</b><br><sub>COMPUTER UNIT · DESIGN</sub></td>
<td align="center" width="25%"><img src="public/images/ham-bom-portrait-sm.jpg" width="160" alt="HAM BOM"><br><b>HAM BOM</b><br><sub>COMPUTER UNIT · EXECUTE</sub></td>
</tr>
</table>

| # | 이름 | 본명 | UNIT | ABILITY | 포지션 | 생일 | 팬덤 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 01 | **SERINA** (세리나) | 박세린 | AI UNIT | `LEARN` | MAIN DESIGNER | 2003.05.23 | 에아 |
| 02 | **BAESAN** (배산) | 배정호 | AI UNIT | `PREDICT` | MARKETING | 2003.12.27 | 에아 |
| 03 | **HYUN JIZEL** (현지젤) | 현세은 | COMPUTER UNIT | `DESIGN` | MAIN PLANNER | 2006.02.03 | 피터 |
| 04 | **HAM BOM** (함봄) | 함채림 | COMPUTER UNIT | `EXECUTE` | MAIN DEVELOPER | 2002.09.06 | 피터 |

> SERINA의 내부 id는 초기 기획 단계의 가명인 `rina`로 남아 있다. 라우트, 이미지 파일명, 티저 매니페스트 키가 이미 이 값을 쓰고 있어 하위 호환을 위해 유지했을 뿐, 화면에 노출되는 모든 표기는 SERINA / 세리나다.

### 2.1. AI UNIT

관측한 것을 해석하고, 아직 오지 않은 결과를 계산하는 유닛. 시스템의 "판단"을 담당한다.

- **SERINA** — 세리나 · 박세린. `LEARN` 담당, MAIN DESIGNER. 특기는 수어. 한 줄 소개: *"열심히 하겟습니다."*
- **BAESAN** — 배산 · 배정호. `PREDICT` 담당, MARKETING. 특기는 끈기. 한 줄 소개: *"꿈이 크면 깨져도 크다"*

### 2.2. COMPUTER UNIT

판단을 구조로 옮기고, 구조를 현실에서 작동시키는 유닛. 시스템의 "실행"을 담당한다.

- **HYUN JIZEL** — 현지젤 · 현세은. `DESIGN` 담당, MAIN PLANNER. 특기는 "기죽지 않는 깡다구". 한 줄 소개: *"JUST DO IT"*
- **HAM BOM** — 함봄 · 함채림. `EXECUTE` 담당, MAIN DEVELOPER. 특기는 "사람 기분 한눈에 파악하기". 한 줄 소개: *"이제 시작입니다!!"*

### 2.3. 시스템 순환

네 사람은 `SystemCycle` 안에서 하나의 순환 고리로 연결된다.

```
LEARN → PREDICT → DESIGN → EXECUTE → LEARN → … → ∞
```

SERINA가 관측한 것(`LEARN`)을 BAESAN이 예측하고(`PREDICT`), 그 예측을 HYUN JIZEL이 구조로 옮기면(`DESIGN`) HAM BOM이 현실에서 실행한다(`EXECUTE`) — 네 사람이 한 바퀴를 이루는 구조다. 이 네 단계는 시스템 순환 다이어그램뿐 아니라 사이트 각 멤버의 ABILITY 표기, 아티스트 상세 화면의 비주얼 언어(`AbilityMotif`, [3.3. 비주얼](#33-비주얼) 참고)까지 전부 동일한 이름으로 일관되게 쓰인다.

아티스트 상세 화면에는 같은 유닛의 파트너가 함께 소개되는 로직(`getUnitPartner`)이 있어, AI UNIT 안에서는 SERINA ↔ BAESAN이, COMPUTER UNIT 안에서는 HYUN JIZEL ↔ HAM BOM이 서로의 짝으로 묶인다. 그 밖의 개인적인 케미·에피소드는 추후 업데이트 예정.

## 3. 세계관

### 3.1. 콘셉트와 메시지

CONES의 세계관은 두 개의 기원 — AI UNIT과 COMPUTER UNIT — 이 하나로 수렴하는 과정이다.

```
O        O   →   O + O   →   ∞   →   CONES
AI UNIT      COMPUTER UNIT
```

두 개의 원이 서로 다가가 겹치고, 무한대 기호로 수렴한 뒤 워드마크가 드러난다. 이 장면은 미리 만든 영상이 아니라 스크롤 위치에 실시간으로 반응하는 SVG 시퀀스(`ConnectionSequence`)로 구현되어 있으며, [2.3. 시스템 순환](#23-시스템-순환)의 네 단계 루프와 같은 "연결" 논리를 공유한다.

> FOUR MINDS. TWO ORIGINS. ONE SYSTEM.
> TWO ORIGINS, ONE SYSTEM.

네 개의 마음(멤버), 두 개의 기원(유닛), 하나의 시스템(CONES)으로 요약되는 메시지. 사이트의 첫 화면과 마지막 화면에 같은 문구가 반복 등장하며, 시작과 끝을 같은 문장으로 닫는다.

### 3.2. 로고

CONES 워드마크는 정적인 이미지가 아니라 하나의 인터랙션(`LogoMark`)이다. 전원이 켜지듯 와이프로 드러나고, 워드마크 실루엣을 따라 크롬(chrome) 하이라이트가 흐르며, 숨 쉬듯 은은한 글로우가 번진다. `prefers-reduced-motion` 환경에서는 이 연출이 전부 정적인 로고로 대체된다.

### 3.3. 비주얼

멤버별 ABILITY는 각자 고유한 SVG 비주얼 언어(`AbilityMotif`)를 가진다.

| ABILITY | 비주얼 언어 |
| --- | --- |
| LEARN | 데이터 포인트, 스캐닝 라인, 관측 |
| PREDICT | 하나의 기원에서 갈라져 나가는 미래들 |
| DESIGN | 블루프린트 프레임, 가이드, 구조 |
| EXECUTE | 활성화되는 바, 움직이는 포인터 |

전체 톤은 블랙(`#050506`) & 화이트(`#f4f4f2`) 베이스에 실버(`#b9bcc3`)와 크롬 그라디언트를 포인트로 쓴다. 외부 폰트 서비스 없이 시스템 폰트만으로 디스플레이/본문/모노스페이스 타이포를 구성해, 인터넷 연결 없이도 항상 같은 화면을 보여준다. 디렉터 프로필 사진은 흑백(grayscale) 톤으로 맞춰 멤버 사진들과 분위기를 통일했다.

## 4. 프로젝트

### 4.1. PROJECT : CONNECTION : 00

`PROJECT : CONNECTION : 00`은 CONES의 첫 번째 프로젝트다. `00`은 두 개의 원이자, 동시에 "아직 아무것도 정해지지 않았다"는 뜻으로 읽힌다. 그래서 이 프로젝트는 새 이미지를 따로 만들지 않고, 세계관에서 쓰인 것과 같은 시각 문법(두 원 → 연결 → 순환)을 그대로 반복해 보여준다.

목표는 두 기원(AI UNIT, COMPUTER UNIT)이 실제로 하나의 시스템으로 연결될 수 있다는 것을 증명하는 것이다. 사이트의 카운트다운과 상태 문구(`COMING SOON` / `NOW LIVE`)는 데뷔 쇼케이스 시각을 기준으로 하나의 로직에서 동작하므로, 어느 섹션을 보든 상태가 서로 어긋나지 않는다.

### 4.2. One Page Landing Page

CONES 사이트는 `/` 한 곳에서 스크롤만으로 세계관 · 멤버 · 시스템 순환 · 프로젝트 정보를 전부 확인할 수 있는 One Page Landing Page다.

- 히어로 → ORIGINS → CONNECTION → SYSTEM CYCLE → ARTISTS → PROJECT → TEAM → DIRECTOR → OFFICIAL MD → CTA 순서로, 스크롤을 내리는 것 자체가 CONES 세계관을 처음부터 끝까지 훑는 경험이 되도록 구성했다.
- 아티스트 카드를 클릭하면 페이지 이동 없이 모달로 상세 프로필이 열려, 스크롤의 흐름이 끊기지 않는다.
- 랜딩페이지의 첫 화면(히어로 이미지·문구·CTA·레이아웃·애니메이션)은 이후 추가된 [4.4. OFFICIAL MD](#44-official-md) 커머스 기능과 완전히 분리되어 있으며, 해당 작업 과정에서 의도적으로 손대지 않았다.
- 라이브 주소: **https://seune-h0203.github.io/cones/**
- *(랜딩페이지 프리뷰 이미지 / GIF 삽입 위치 — 준비되는 대로 추가 예정)*

### 4.3. 티저

모든 멤버는 `public/videos/manifest.json`에 선언된 티저 슬롯을 가진다.

```json
{
  "teasers": {
    "baesan": {
      "desktop": "baesan-teaser.mp4"
    }
  }
}
```

- `desktop`은 필수, `mobile`(9:16 컷)은 좁은 뷰포트에서 자동 선택된다.
- manifest에 등록되지 않은 멤버는 실제 포트레이트를 포스터로 띄우고 `SIGNAL PENDING` 상태로 표시한다. 없는 영상을 지어내 채우지 않는 것이 원칙이다. 현재는 **BAESAN** 티저만 실제로 등록되어 있다.
- `IntersectionObserver`로 화면에 보일 때만 재생하고 벗어나면 즉시 정지하며, 동시에 두 개 이상 디코딩되지 않는다.

### 4.4. OFFICIAL MD

랜딩페이지의 MD 배너에서 이어지는 **실제 데이터베이스 기반 커머스 시스템**이다. MD 포스터 이미지를 하나의 상품으로 뭉뚱그리지 않고, 멤버 4명 × SKU 8종 = **실제 상품 32개**로 분해해 각각 개별 구매 가능하도록 구현했다.

| SKU | 예시 |
| --- | --- |
| LIGHT_STICK | 공식 응원봉 |
| PHOTOBOOK | 포토북 |
| PHOTO_CARD_SET | 포토카드 세트 |
| KEYRING | 키링 |
| POSTER_SET | 포스터 세트 |
| T_SHIRT | 티셔츠 |
| HOODIE | 후디 |
| LIMITED_MD_BOX | 리미티드 MD 박스 |

- **백엔드**: Supabase(Postgres + Auth + PostgREST). `products` / `carts` / `cart_items` / `orders` / `order_items` 5개 테이블에 전부 Row Level Security를 적용해, 각 사용자는 자신의 장바구니·주문만 읽고 쓸 수 있다.
- **주문 흐름**: Shop → Product Detail → Add to Cart → Cart → Checkout → **Order**. 결제 금액과 재고는 클라이언트를 신뢰하지 않고, `SECURITY DEFINER` Postgres 함수 `create_order()`가 서버 측에서 다시 계산하고 재고를 차감한다. 재고가 0이 되면 자동으로 `SOLD_OUT` 처리된다.
- **주문 상태**: `PENDING → PAID → PREPARING → SHIPPED → COMPLETED`. 실제 PG 연동 전 시연을 위해 `mock_pay_order()` RPC로 `PENDING → PAID` 전환만 목업으로 제공한다.
- **인증**: Supabase Auth 기반 실제 회원가입/로그인. 로그인하지 않으면 장바구니·주문 페이지 접근이 차단된다.
- **My Orders**: 로그인한 사용자의 주문 내역과 각 주문에 담겼던 상품 이미지를 함께 보여준다. 상품 이미지는 주문 시점에 `order_items`에 별도로 저장되므로, 이후 상품 정보가 바뀌거나 삭제돼도 과거 주문 화면은 그대로 유지된다.
- **배포 대응**: GitHub Pages는 SPA 라우트를 서버에서 리라이트하지 못하므로, `public/404.html`의 리다이렉트와 런타임 base 경로 감지(`window.__CONES_BASE__`)로 `/shop`, `/cart`, `/shop/product/:slug` 같은 하위 경로도 새로고침·직접 진입에서 정상 동작하도록 만들었다. 자세한 내용은 [5.4. 배포](#54-배포) 참고.

스키마·RLS 정책·RPC 정의는 [`supabase/schema.sql`](supabase/schema.sql)에 전부 코드로 관리된다.

## 5. 기술

나무위키식 소개와 별개로, CONES를 실제로 만들고 배포하는 데 필요한 개발 정보를 정리한 섹션이다.

### 5.1. Tech Stack

- React 19 + TypeScript(strict) + Vite
- React Router — 랜딩페이지 내부 앵커 스크롤과 [4.4. OFFICIAL MD](#44-official-md)의 `/shop`, `/cart`, `/checkout`, `/mypage/orders` 등 커머스 라우트
- Supabase(Postgres + Auth + PostgREST) — 커머스 데이터베이스와 인증
- HTML / CSS (네이티브, UI·애니메이션 라이브러리 없음)
- Git / GitHub, GitHub Actions, GitHub Pages

### 5.2. 실행과 빌드

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # tsc --noEmit + 프로덕션 빌드 → dist/
npm run preview    # 프로덕션 빌드를 로컬에서 서빙
```

커머스 기능을 로컬에서 켜려면 `.env.example`을 `.env`로 복사하고 Supabase 프로젝트의 URL / anon key를 채운 뒤, `supabase/schema.sql`을 해당 프로젝트의 SQL Editor에서 한 번 실행한다. `.env`가 없으면 Shop / Cart / Checkout / My Orders는 "스토어가 아직 연결되지 않았습니다" 상태로 비활성화되고, 랜딩페이지는 평소대로 동작한다.

네트워크 없이 배포하려면:

```bash
npm run build:offline
npm run serve:dist
```

외부 CDN이나 Google Fonts를 쓰지 않으므로, `dist/` 폴더 하나만 옮기면 USB · 사내 서버 · 정적 호스팅 어디서든 인터넷 연결 없이 랜딩페이지가 동작한다(단, 커머스 기능은 Supabase 프로젝트 접속이 필요하므로 완전 오프라인 환경에서는 비활성 상태로 표시된다). 브라우저 보안 정책상 `index.html`을 `file://`로 직접 여는 대신 작은 정적 서버를 사용해야 한다.

### 5.3. 프로젝트 구조

```
src/
├─ components/   Navbar, ArtistCard, ArtistProfileModal, LogoMark, TeaserVideo, TeaserPlayer,
│                VideoModal, Countdown, ConnectionSequence, SystemCycle,
│                AbilityMotif, LoadingScreen, PageTransition, CustomCursor,
│                EasterEgg, Footer, Reveal, SectionHeader …
├─ pages/        Home (랜딩페이지) · shop/ (Shop, ProductDetail, Cart, Checkout,
│                OrderComplete, MyOrders) · auth/ (Login, Signup) ·
│                World / Artists / ArtistDetail / Project / About / NotFound
│                (레거시 다중 페이지 구조, 더 이상 라우팅되지 않음)
├─ contexts/     AuthContext(Supabase 세션), CartContext(장바구니 상태·낙관적 업데이트)
├─ lib/          supabase.ts(클라이언트), database.types.ts(테이블 타입)
├─ data/         artists.ts (멤버 단일 소스), site.ts (브랜드, 디렉터, 데뷔 일자, 유닛 카피, 시스템 순환)
├─ hooks/        useCountdown, useInView, useScrollProgress, useTeaser,
│                useSeo, useFocusTrap / useScrollLock, useMedia
├─ utils/        asset.ts (배포 환경에 안전한 경로 해석), currency.ts, analytics.ts
└─ styles/       tokens.css (디자인 토큰), global.css (프리미티브)

public/
├─ images/       멤버 포트레이트 · 16:9 티저 포스터 · OG 카드 · 로고 · MD 상품 사진
├─ videos/       티저 파일 + manifest.json
└─ 404.html      GitHub Pages SPA 라우팅 리다이렉트 (5.4. 배포 참고)

supabase/
└─ schema.sql    커머스 테이블 · RLS 정책 · create_order / mock_pay_order RPC · 상품 시드 데이터
```

`App.tsx`는 `BrowserRouter`로 `Home`과 `/shop` 이하의 커머스 라우트를 함께 렌더링한다. 과거 다중 페이지 구조의 흔적인 `World` / `Artists` / `ArtistDetail` / `Project` / `About` / `NotFound`는 파일로는 남아 있지만 화면에는 연결되어 있지 않다.

### 5.4. 배포

- 저장소: [seune-h0203/cones](https://github.com/seune-h0203/cones)
- 라이브: https://seune-h0203.github.io/cones/
- `.github/workflows/deploy.yml`이 `main` push마다 `npm run build` 후 `actions/deploy-pages`로 GitHub Pages에 배포한다. 빌드 시 Supabase 프로젝트 URL과 anon(publishable) key를 환경 변수로 주입한다 — anon key는 클라이언트에 공개되도록 설계된 키이며(실제 데이터 보호는 RLS가 담당), 저장소에 평문으로 있어도 새로운 보안 위험을 추가하지 않는다.
- `vite.config.ts`의 `base: "./"` 덕분에 정적 에셋은 도메인 루트든 GitHub Pages 하위 경로든 수정 없이 동작한다.
- GitHub Pages는 `/shop/product/:slug` 같은 클라이언트 라우트를 서버에서 처리하지 못해 새로고침이나 직접 진입 시 404를 반환한다. `public/404.html`이 요청 경로를 쿼리스트링에 실어 `index.html`로 리다이렉트하면, `index.html`의 인라인 스크립트가 이를 복원하고 실제 배포 루트(`window.__CONES_BASE__`)를 런타임에 감지해 `BrowserRouter`의 `basename`과 이미지 경로 해석(`utils/asset.ts`)에 그대로 사용한다.

### 5.5. 접근성과 성능

- 시맨틱 랜드마크, 실제 `<button>` / `<a>` 요소, 의미 있는 이미지의 `alt` 텍스트, 본문 바로가기 링크를 갖췄다.
- 모든 애니메이션은 `prefers-reduced-motion: reduce`에서 정지 상태로 축소된다.
- 라우트 단위 코드 스플리팅(`React.lazy`), `srcset` 기반 이미지, `loading="lazy"`를 사용한다.
- 런타임 의존성은 `react`, `react-dom`, `react-router-dom`, `@supabase/supabase-js` 네 가지이고, UI/애니메이션 라이브러리는 0개다.

## 6. 협업과 기록

### 6.1. 협업 방식

- **GitHub Issues** — `[PLAN]` `[FE]` `[BE]` `[DB]` `[DESIGN]` `[QA]` `[CONTENT]` `[DOCS]` `[FIX]` `[DEPLOY]` `[DEVOPS]` `[PRESENTATION]` 카테고리 라벨과 `STATUS: BACKLOG / READY / IN PROGRESS / DONE` 상태 라벨로 작업을 관리한다.
- **GitHub Projects / Milestone** — "CONES — FINAL SUBMISSION" 마일스톤으로 전체 작업을 하나의 마감일(2026.09.15)에 맞춰 추적한다. 별도의 Projects 보드 구성은 추후 업데이트 예정.
- **팀원별 역할** — 이슈마다 표 형식으로 담당(SERINA / BAESAN / HYUN JIZEL / HAM BOM), Kanban 상태, Story Point를 기록한다.
- **Branch / PR** — 현재는 `main` 단일 브랜치로 운영 중이며, 별도 브랜치 전략과 PR 리뷰 프로세스는 추후 업데이트 예정.

### 6.2. 타임라인

| 일자 | 내용 |
| --- | --- |
| 2026.09.09 | 최초 커밋. 랜딩페이지 골격 및 GitHub Pages 배포 워크플로 구성 |
| 2026.09.10 | RINA → SERINA 표기 정리, About 페이지에 디렉터 프로필 추가, README 한글화 |
| 2026.09.12 | 여러 페이지로 나뉘어 있던 구조를 One Page Landing Page로 통합, 아티스트 프로필 모달 도입, 홈 화면에 디렉터 섹션 분리 추가 |
| 2026.09.12 | [4.4. OFFICIAL MD](#44-official-md) 커머스 MVP 추가 — 32개 실제 상품, Supabase DB/Auth, Shop → Cart → Checkout → Order → My Orders 전체 흐름, GitHub Pages SPA 서브패스 라우팅 대응 |
| 2026.09.13 | 주문 내역(My Orders, 주문 상세)에 실제 상품 이미지 표시 추가, 문서 구조 개편, 멤버 데이터(팬덤·생일) 정합성 수정, GitHub Issues/Kanban 전체 정리(신규 이슈 등록 및 완료 처리) |

CONES는 아직 데뷔 전(pre-debut) 단계다. 별도의 인기 지표, 수상 및 성과 기록은 없으며, 데뷔 쇼케이스(2026.09.15) 이후 업데이트 예정.

---

**CONES** · TWO ORIGINS, ONE SYSTEM.
`PROJECT : CONNECTION : 00` — DEBUT SHOWCASE `09.15.2026`
