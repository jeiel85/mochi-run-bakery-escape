<div align="center">

<img src="assets/ui/logo.svg" alt="Mochi Run: Bakery Escape Logo" width="520" />

# 🍓 모찌런: 베이커리 대탈출 (Mochi Run: Bakery Escape)

**창작 디저트 영웅들과 슈가 펫이 함께 달리는 60FPS 하이퍼 캐주얼 런 액션 웹게임**  
*An original sweet-themed endless runner game featuring custom kawaii dessert heroes, companion pets, automatic character skills, M-O-C-H-I Fever Mode, and procedural Web Audio soundtrack!*

[![Live Demo](https://img.shields.io/badge/🎮_LIVE_DEMO-바로_플레이하기-ff5d8f?style=for-the-badge)](https://jeiel85.github.io/mochi-run-bakery-escape/)
[![HTML5 Canvas](https://img.shields.io/badge/HTML5_Canvas-60FPS-ffbe0b?style=for-the-badge&logo=html5&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API)
[![JavaScript ES6+](https://img.shields.io/badge/Vanilla_JS-ES_Modules-00f5d4?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Assets by Codex](https://img.shields.io/badge/Graphic_Assets-Generated_with_Codex-9b5de5?style=for-the-badge)](./assets)

</div>

---

## ✨ 게임 소개 (Overview)

**모찌런: 베이커리 대탈출 (Mochi Run: Bakery Escape)** 은 새벽녘 화덕에서 갓 구워진 **창작 디저트 캐릭터**들이 달콤한 베이커리 왕국을 질주하는 횡스크롤 러닝 액션 게임입니다.  
외부 라이브러리 없이 순수 **HTML5 Canvas + ES6 모듈 + Web Audio API 신디사이저**로 구축되어, PC와 모바일 브라우저 어디서나 설치 없이 즉시 플레이할 수 있습니다. 모든 캐릭터·펫·아이템·장애물 그래픽 애셋은 **OpenAI Codex CLI**를 활용해 독창적인 고해상도 벡터(SVG) 아트워크로 제작되었습니다.

👉 **[🎮 라이브 데모 바로 플레이하기 (GitHub Pages)](https://jeiel85.github.io/mochi-run-bakery-escape/)**

---

## 🍡 오리지널 디저트 영웅 (Original Dessert Heroes)

각 캐릭터는 고유한 기본 체력과 쿨타임마다 자동으로 발동되는 **전용 액티브 스킬**을 보유하고 있습니다.

| 아이콘 | 캐릭터 이름 | 칭호 & 포지션 | 고유 액티브 스킬 |
| :---: | :--- | :--- | :--- |
| <img src="assets/characters/mochi_run1.svg" width="72" /> | **딸기찹쌀 모찌**<br>*(Ichigo Mochi)* | 말랑말랑 베이커리의 영웅<br>`STARTER` | **🍓 딸기시럽 무적 대시 (13초)**<br>달콤한 딸기시럽 오라를 두르고 고속 질주하며 주변 장애물을 황금 딸기젤리로 변환합니다. |
| <img src="assets/characters/pudding_run1.svg" width="72" /> | **커스터드 푸딩킹**<br>*(Custard Pudding King)* | 출렁이는 카라멜 왕국의 군주<br>`TANK & HEAL` | **🍮 로열 카라멜 바운스 (15초)**<br>왕실 카라멜 파동을 터뜨려 **체력을 +14 즉시 회복**하고 화면의 슈가방울을 모두 흡수합니다. |
| <img src="assets/characters/taiyaki_run1.svg" width="72" /> | **단팥 붕어빵 기사**<br>*(Taiyaki Knight)* | 바삭한 버터방패의 수호자<br>`BREAKER` | **⚔️ 바삭 크러스트 참격 (11.5초)**<br>웨하스 검기를 발동해 부딪히는 모든 장애물을 산산조각내고 **파괴 보너스 +2,500점**을 획득합니다. |
| <img src="assets/characters/konpeito_run1.svg" width="72" /> | **별사탕 요정 슈가**<br>*(Star Candy Fairy)* | 은하수 설탕공방의 마법사<br>`SCORE MASTER` | **🌟 스타더스트 슈가샤워 (10.5초)**<br>하늘에서 별사탕 유성우를 소환하고 스킬 지속 중 **모든 젤리 점수를 2.2배**로 증폭시킵니다. |

---

## 🐾 동행 슈가 펫 (Companion Pets)

캐릭터 옆을 졸졸 따라다니며 자석 효과, 점수 증폭, 체력 감소 완화 등 든든한 패시브 버프를 제공합니다.

| 펫 모습 | 펫 이름 | 패시브 능력 |
| :---: | :--- | :--- |
| <img src="assets/pets/pet_berry.svg" width="56" /> | **설탕토끼 베리** | 기본 자석 반경 **+95px** 증가 & 젤리 기본 점수 **+25%** 보너스 |
| <img src="assets/pets/pet_butter.svg" width="56" /> | **버터방울 천사** | 체력 자연 감소 속도 **18% 완화** & 장애물 충돌 피해량 **25% 감소** |
| <img src="assets/pets/pet_teapot.svg" width="56" /> | **녹차 티포트** | 코인 획득량 **+50%** 증가 & **12초마다 미니 녹차 아로마 회복(+8 HP)** 발동 |
| <img src="assets/pets/pet_star.svg" width="56" /> | **코메트 별사탕** | 모든 젤리 점수 **+45%** 증가 & **M-O-C-H-I 피버 타임 지속시간 +2초** 연장 |

---

## 🍬 아이템 & 장애물 가이드 (Items & Obstacles)

| 아이콘 | 이름 | 효과 및 설명 |
| :---: | :--- | :--- |
| <img src="assets/items/bean_normal.svg" width="44" /> <img src="assets/items/bean_gold.svg" width="44" /> | **달콤 슈가방울 / 황금 딸기젤리** | 연속 획득 시 **콤보 보너스(최대 2.5배)** 가 누적되는 핵심 득점 아이템 |
| <img src="assets/items/potion_hp.svg" width="48" /> | **딸기우유 회복약** | 마시는 즉시 **체력(HP) +28** 회복 |
| <img src="assets/items/item_boost.svg" width="48" /> | **슈가러시 로켓사탕** | 무적 광속 질주 발동! 부딪히는 모든 장애물을 날려버림 |
| <img src="assets/items/item_giant.svg" width="48" /> | **왕방울 찹쌀떡** | 캐릭터가 거대화되어 모든 장애물을 밟아 부수고 획득 반경 대폭 증가 |
| <img src="assets/items/item_magnet.svg" width="48" /> | **츄러스 자석** | 화면 전체의 슈가방울과 코인을 강력하게 끌어당김 |
| <img src="assets/obstacles/obs_fork.svg" width="40" /> <img src="assets/obstacles/obs_candle.svg" width="40" /> <img src="assets/obstacles/obs_roller.svg" width="48" /> | **디저트 포크 / 생일초 화염 / 밀대 롤러** | **1단 점프**, **2단 점프**, **슬라이드(숙이기)** 로 리듬감 있게 회피해야 하는 베이커리 함정 |

---

## 🎮 조작 방법 (Controls)

| 동작 | 키보드 조작 | 모바일 / 마우스 터치 |
| :--- | :--- | :--- |
| **점프 & 2단 점프** | `Space` / `↑` (위 방향키) / `W` | 화면 좌측 하단 **JUMP** 패달 터치 |
| **슬라이드 (숙이기)** | `↓` (아래 방향키) / `S` 유지 | 화면 우측 하단 **SLIDE** 패달 홀드 |
| **일시정지 / 재개** | `P` / `ESC` | 화면 우측 상단 `⏸️` 버튼 |
| **사운드 켜기 / 끄기** | - | 화면 우측 상단 `🔊` 버튼 |

---

## 🗂️ 프로젝트 구조 (Project Structure)

```text
mochi-run-bakery-escape/
├── index.html                  # 메인 엔트리 & 로비/인게임 HUD 마크업
├── style.css                   # 반응형 아케이드 UI 및 애니메이션 스타일
├── src/
│   ├── main.js                 # UI 컨트롤러, 상점/강화 시스템, 키보드 & 터치 입력 바인딩
│   ├── game.js                 # 60FPS 물리 엔진, 충돌 판정, 스킬/피버 시스템, 패럴랙스 렌더러
│   ├── config.js               # 창작 캐릭터 4종, 슈가 펫 4종, 4대 바이옴 스테이지 설정
│   ├── patterns.js             # 리듬감 있는 레벨 디자인 패턴 청크 생성기
│   └── audio.js                # Web Audio API 기반 프로시저럴 칩튠 BGM & 효과음 신디사이저
└── assets/                     # Codex로 생성한 커스텀 고해상도 SVG 그래픽 애셋 (총 31종)
    ├── characters/             # 캐릭터 4종 × (달리기1, 달리기2, 점프, 슬라이드) = 16종
    ├── pets/                   # 슈가 펫 4종
    ├── items/                  # 슈가방울, 황금젤리, 코인, 회복약, 부스터, 거대화, 자석 = 7종
    ├── obstacles/              # 포크, 생일초, 밀대 롤러 = 3종
    └── ui/                     # 타이틀 로고 배너 = 1종
```

---

## 🚀 로컬 실행 방법 (Quick Start)

별도의 빌드 과정이나 패키지 설치 없이 정적 웹 서버로 바로 실행할 수 있습니다.

```bash
# 저장소 클론
git clone https://github.com/jeiel85/mochi-run-bakery-escape.git
cd mochi-run-bakery-escape

# Python 내장 서버 또는 임의의 정적 서버로 실행
python -m http.server 8080
```

브라우저에서 `http://localhost:8080` 으로 접속하면 즉시 플레이할 수 있습니다!
