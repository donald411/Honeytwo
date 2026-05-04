# Honeytwo Homepage — 프로젝트 가이드

주식회사 허니투(Honeytwo Corp)의 K-Beauty 유통사 사이트. 해외 바이어/리테일러 대상 다중 페이지 사이트.

- **사이트 식별자**: `H` (Contact 폼 데이터에서 사이트 구분용. Beauty in House는 `B`)
- **GitHub**: https://github.com/donald411/Honeytwo
- **커스텀 도메인**: honeytwo.co.kr (`CNAME` 파일로 설정)
- **배포**: GitHub Pages (main 브랜치 push → `.github/workflows/deploy.yml`)
- **헤더 슬로건**: "Seoul, Korea · K-Beauty Distributor Since 2016"

## 자매 프로젝트와의 관계 (Beauty in House)

`D:\Claude Code\Beauty in House` 와 **자매 프로젝트**. 같은 사람이 같은 시기(2026-02 ~ 03)에 같은 도메인(K-Beauty 유통)으로 만들었기 때문에 자산/백엔드는 거의 공유하지만, **HTML 페이지 구조는 의도적으로 다름**:

| | 이 프로젝트 (Honeytwo) | Beauty in House |
|---|---|---|
| 페이지 구조 | **멀티 페이지** — `index`/`about`/`brands`/`contact` 4개 .html | 단일 페이지 (SPA 스타일, `index.html` 하나에 모든 섹션) |
| `index.html` 크기 | 23 KB | 45 KB (모든 콘텐츠 포함) |
| Site 식별자 | **H** | B |
| 커스텀 도메인 | honeytwo.co.kr (CNAME) | GitHub Pages 기본 도메인 |
| 첫 커밋 | 2026-02-23, 25 files / 4,218 lines | 2026-02-20, 17 files / 2,340 lines |

**공유하는 것** (양쪽 동일 — 한쪽만 바꾸면 분기됨):
- Google Apps Script 웹앱 URL (같은 시트, `site` 컬럼으로만 구분)
- `Cosmetic Brand logo/` 폴더의 브랜드 로고 자산 대부분
- 폴더 구조 (`css/`, `js/`, `images/`, `Cosmetic Brand logo/`, `.github/workflows/deploy.yml`)
- GitHub Pages 배포 방식

**다른 것** (한쪽 작업이 다른 쪽에 자동 반영되지 않음):
- HTML 페이지 수와 라우팅 방식 (멀티 vs 단일)
- 디자인 시스템 (이쪽은 골드+H1·H2 듀얼 로고 / Beauty는 `#E8758A` 핑크)
- 커스텀 도메인 (이쪽만 honeytwo.co.kr)
- Hero 디자인 (이쪽은 Deep Ink 단색 배경 + 중앙 카피, Beauty는 Makeup1.gif 이미지 배경)

**작업 시 원칙**:
- "두 사이트 다 적용해 줘" 라는 요청이 오면 양쪽 폴더 모두 편집 필요 (한쪽 자동 반영 없음)
- 이 사이트는 **멀티 페이지라 헤더/푸터/네비 변경 시 4개 파일 모두 수정** 필요 (Beauty는 1개만 수정)
- 브랜드 로고를 추가하면 두 사이트의 `Cosmetic Brand logo/` 양쪽에 복사하는 게 일반적이지만, 등록은 각 사이트 HTML에서 별도로 해야 함
- Apps Script URL이나 Google Sheet 헤더를 변경하면 **두 사이트 모두** 깨지므로 반드시 양쪽 동기 수정
- CNAME 파일은 이 사이트에만 있음 — Beauty in House에 실수로 복사 금지

## 폴더 구조

```
D:\Claude Code\Honeytwo Homepage\
├── index.html                       # 메인 (Hero, Brand Carousel, About, How We Work 등)
├── about.html                       # 회사 소개
├── brands.html                      # Brand Portfolio (skincare/makeup/haircare 필터)
├── contact.html                     # 파트너 문의 폼 (Google Sheet 연동)
├── CNAME                            # honeytwo.co.kr 커스텀 도메인
├── google-apps-script.txt           # Apps Script 서버 코드 (doPost) — 참고용
├── css\style.css                    # 메인 스타일 (~50KB)
├── js\main.js                       # 메인 스크립트 (~12KB)
├── images\                          # H1.png, H2.png(로고), H2-Logo.png, K Girl 1.png, H2_Office2.png 등
├── Cosmetic Brand logo\             # 브랜드 로고 (20개)
└── .github\workflows\deploy.yml     # Pages 배포 워크플로우
```

## 페이지 구성

| 파일 | 역할 |
|---|---|
| `index.html` | 메인 — 헤어로(Deep Ink 단색 배경 + 중앙 카피), 브랜드 캐러셀(16 브랜드), Trust Stats, About 미리보기, How We Work 프로세스, 푸터 |
| `about.html` | 회사 소개 |
| `brands.html` | Brand Portfolio (카테고리 필터: All / Skincare / Makeup / Haircare) |
| `contact.html` | 파트너십 문의 폼 |

모든 페이지 공통 헤더: H1 로고 + "Honeytwo" 텍스트 + H2 로고 / 네비(Home, About, Brands, Contact) + "Become a Partner" CTA / 모바일 햄버거.

## 디자인 시스템

- **로고**: H1.png (앞 마크) + 텍스트 "Honey**two**" + H2.png (뒤 마크)
- **푸터**: 딥 골드 배경 / Honey 텍스트 흰색
- **Hero 배경**: Deep Ink 단색 (#1A1A2E) — 모델 이미지 없이 중앙 정렬된 카피만 표시. 이전엔 `K Girl 1.png` / `H2_Office.png` 사용했으나 2026-05-04에 단색으로 단순화
- **모바일 캐러셀 속도**: 3배속 (이전 변경 이력 있음)

## 브랜드 추가 절차

1. **로고 파일 추가**: `Cosmetic Brand logo/<브랜드명>.png` (또는 .svg/.webp/.jpg)
2. **`brands.html`** 의 portfolio 섹션에 카드 추가 + `data-category="skincare|makeup|haircare"` 지정 (필터 동작 위해 필수)
3. **`index.html`** 의 brand carousel에도 추가 (메인 노출용)
4. 커밋 & push → GitHub Pages 자동 배포

현재 등록 브랜드: Abib, BEAUTY OF JOSEON, COSRX, Dr.G, Elizavecca, Etude, Haruharu Wonder, Innisfree, K-Secret, Laneige, Manyo, MISSHA, Mixsoon, Numbuzin, The Face Shop, TIAM, VT Cosmetics 등 (15+ 유통권 보유 표기)

## Contact 폼 → Google Sheet

**Apps Script 웹앱 URL** (Beauty in House와 **공유** — 같은 시트에 site 컬럼으로 구분):
```
https://script.google.com/macros/s/AKfycbzdR5O2WpQ0VVyvqreBsuJCjqEjtoR0DacwuH2FryifvN9WGVZzvbPNFjFG71be3FuG/exec
```

**Google Sheet 헤더 (A~I)**:
```
site | timestamp | company | country | name | email | business-type | brands-interest | message
```

**서버 코드** — `google-apps-script.txt` 에 보관된 doPost 함수:
```javascript
function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var data = e.parameter;
  sheet.appendRow([
    data.site, new Date(), data.company, data.country,
    data.name, data.email, data["business-type"],
    data["brands-interest"], data.message
  ]);
  return ContentService.createTextOutput(JSON.stringify({result: "success"}))
    .setMimeType(ContentService.MimeType.JSON);
}
```

**전송 방식**: hidden iframe + form submit (CORS 우회). `site: 'H'` 고정. country 옵션에 South Korea 포함.

## 회사 정보 (푸터/Contact용)

- 회사명: Honey two Co., Ltd
- 주소: Geumcheon-gu (구체 주소는 `index.html` 푸터 참조)
- 이메일: honey-two@honeytwo.co.kr
- 전화: 070-7604-1077

## 작업 이력 (커밋 기반)

- **2026-02-23** — 초기 디자인(YESBEE 영감) + GitHub Actions 워크플로우 (3 커밋)
- **2026-02-24** — **집중 작업일 (40 커밋)**: 16개 브랜드 캐러셀 / H1·H2 로고 시스템 / hero 이미지(K Girl, H2_Office) / 푸터·연락처 정비 / 모바일 최적화 / brand cards circular / How We Work 프로세스
- **2026-03-09** — Contact 폼 ↔ Apps Script 연동 (CORS 우회 hidden iframe), CNAME으로 honeytwo.co.kr 연결, country에 한국 추가, site identifier 'H' 적용

## 작업 시 주의

- **다중 페이지 동기화** — 헤더/푸터/로고 변경 시 4개 페이지(index/about/brands/contact) 모두 수정 필요. 과거 "Update all pages with..." 류 커밋이 그 케이스
- **브랜드 카테고리 데이터** — `brands.html` 카드의 `data-category` 속성이 필터 버튼과 1:1 대응. 새 브랜드 추가 시 누락하면 "All" 외에 안 보임
- **Apps Script URL은 Beauty in House와 공유** — 절대 `site` 값 바꾸지 말 것 (`H` 고정)
- **CNAME 파일 보존** — 푸시할 때 실수로 삭제하면 커스텀 도메인 끊김
