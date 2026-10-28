<div align="center">

<img src="assets/ui/logo.svg" alt="Mochi Run: Bakery Escape Logo" width="520" />

# 🍓 모찌런: 베이커리 대탈출 (Mochi Run: Bakery Escape) — Commercial Release Edition

**창작 디저트 영웅 7종 · 슈가 펫 7종 · 전설 보물 5종 · 8대 베이커리 월드 스테이지 · 13종 다채로운 아이템 · 세이브/백업 시스템을 갖춘 60FPS 아케이드 러닝 액션 웹게임**  
*A feature-complete endless runner web game featuring 59 custom SVG graphic assets generated with OpenAI Codex CLI, procedural Web Audio BGM/SFX, treasure relics, achievements, and dual LocalStorage + Cloud Backup Code save system.*

[![Live Demo](https://img.shields.io/badge/🎮_LIVE_DEMO-바로_플레이하기-ff5d8f?style=for-the-badge)](https://jeiel85.github.io/mochi-run-bakery-escape/)
[![HTML5 Canvas](https://img.shields.io/badge/HTML5_Canvas-60FPS-ffbe0b?style=for-the-badge&logo=html5&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API)
[![JavaScript ES6+](https://img.shields.io/badge/Vanilla_JS-ES_Modules-00f5d4?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Assets by Codex](https://img.shields.io/badge/59_SVG_Assets-Generated_with_Codex-9b5de5?style=for-the-badge)](./assets)

</div>

---

## ✨ 게임 특징 (Release Highlights)

- **🍡 7종의 창작 디저트 영웅 & 전용 액티브 스킬**: 딸기찹쌀 모찌, 커스터드 푸딩킹, 단팥 붕어빵 기사, 민트초코 마카롱 위치, 별사탕 요정 슈가, 크리스탈 탕후루 닌자, 허니버터 와플 골렘까지 개성 넘치는 캐릭터와 고유 스킬!
- **🐾 7종의 동행 슈가 펫**: 자석 반경 확대, 체력 감소 완화, 녹차 아로마 회복, 민트초코 코인 드롭, 시작 보호막 부여, 로열제리 회복 등 강력한 패시브/주기적 서포트!
- **👑 5종의 전설 보물 장착 시스템 (최대 2슬롯)**: 점수 증폭, 스킬 쿨타임 감소, 체력 고갈 시 **1회 자동 부활(오븐 수호자의 성배)** 등 전략적인 빌드 구성 가능!
- **🗺️ 8대 테마 스테이지 & 월드맵 선택**: 새벽녘 화덕부터 민트초코 빙하 협곡, 에스프레소 로스터리 공방, 크리스탈 캔디 동굴, 로열 골든 와플 생츄어리까지 8개의 다채로운 스테이지와 전용 날씨 파티클!
- **🍬 13종의 다채로운 아이템 & M-O-C-H-I 무지개 피버**: 무지개 별사탕 젤리, 로열 생크림 파르페, 설탕유리 보호막, 황금 코인 마법폭죽, 천사 날개 젤리 각성, 무지개 미스터리 선물상자 등!
- **💾 완벽한 저장(Save) & 백업 시스템**: 브라우저 `localStorage` 실시간 자동 저장은 물론, **수동 즉시 저장**, **세이브 파일(`.json`) 다운로드/불러오기**, **기기 간 이동용 백업 코드 복사/복원** 완벽 지원!

👉 **[🎮 라이브 데모 바로 플레이하기 (GitHub Pages)](https://jeiel85.github.io/mochi-run-bakery-escape/)**

---

## 🍡 창작 디저트 영웅 도감 (7 Original Dessert Heroes)

| 아이콘 | 캐릭터 이름 | 칭호 & 포지션 | 기본 체력 / 쿨타임 | 고유 액티브 스킬 |
| :---: | :--- | :--- | :---: | :--- |
| <img src="assets/characters/mochi_run1.svg" width="68" /> | **딸기찹쌀 모찌**<br>*(Ichigo Mochi)* | 말랑말랑 베이커리의 영웅<br>`STARTER` | HP 135 / 13.0초 | **🍓 딸기시럽 무적 대시**<br>달콤한 딸기시럽 오라를 두르고 고속 질주하며 주변 장애물을 황금 딸기젤리로 변환합니다. |
| <img src="assets/characters/pudding_run1.svg" width="68" /> | **커스터드 푸딩킹**<br>*(Custard Pudding King)* | 출렁이는 카라멜 왕국의 군주<br>`TANK & HEAL` | HP 170 / 14.5초 | **🍮 로열 카라멜 바운스**<br>왕실 카라멜 파동을 터뜨려 **체력을 +16 즉시 회복**하고 화면의 슈가방울을 모두 흡수합니다. |
| <img src="assets/characters/taiyaki_run1.svg" width="68" /> | **단팥 붕어빵 기사**<br>*(Taiyaki Knight)* | 바삭한 버터방패의 수호자<br>`BREAKER` | HP 150 / 11.5초 | **⚔️ 바삭 크러스트 참격**<br>웨하스 검기를 발동해 부딪히는 모든 장애물을 산산조각내고 **파괴 보너스 +2,800점**을 획득합니다. |
| <img src="assets/characters/macaron_run1.svg" width="68" /> | **민트초코 마카롱 위치**<br>*(Macaron Witch)* | 상쾌한 가나슈 마법학교의 마녀<br>`ALCHEMIST` | HP 145 / 12.0초 | **🧪 민트초코 연금술 비행**<br>캔디 지팡이 마법진을 펼쳐 전방 장애물을 **무지개 별사탕 젤리**로 연성하며 고속 비행합니다. |
| <img src="assets/characters/konpeito_run1.svg" width="68" /> | **별사탕 요정 슈가**<br>*(Star Candy Fairy)* | 은하수 설탕공방의 마법사<br>`SCORE MASTER` | HP 145 / 10.5초 | **🌟 스타더스트 슈가샤워**<br>하늘에서 무지개 별사탕 유성우를 소환하고 스킬 지속 중 **모든 젤리 점수를 2.3배**로 증폭시킵니다. |
| <img src="assets/characters/tanghulu_run1.svg" width="68" /> | **크리스탈 탕후루 닌자**<br>*(Tanghulu Ninja)* | 반짝이는 설탕유리 그림자 자객<br>`SPEED & SHIELD` | HP 155 / 10.0초 | **🗡️ 샤인머스캣 섬광 일섬**<br>초고속 그림자 분신 질주를 발동하고, **충돌을 방어하는 설탕유리 코팅 보호막(+1)** 을 두릅니다. |
| <img src="assets/characters/waffle_run1.svg" width="68" /> | **허니버터 와플 골렘**<br>*(Waffle Mech)* | 황금빛 메이플 성채의 수호 거신<br>`LEGEND TITAN` | HP 195 / 14.0초 | **🍯 메이플 버터 대지진**<br>초거대 황금 와플 타이탄으로 각성해 모든 장애물을 분쇄하고 **체력 +12 회복 및 무지개 젤리**를 분출합니다. |

---

## 🐾 동행 슈가 펫 도감 (7 Companion Pets)

| 펫 모습 | 펫 이름 | 패시브 & 주기적 서포트 능력 |
| :---: | :--- | :--- |
| <img src="assets/pets/pet_berry.svg" width="52" /> | **설탕토끼 베리** | 자석 범위 **+95px** 증가 & 젤리 기본 점수 **+25%** 보너스 |
| <img src="assets/pets/pet_butter.svg" width="52" /> | **버터방울 천사** | 체력 자연 감소 속도 **18% 완화** & 장애물 충돌 피해량 **25% 감소** |
| <img src="assets/pets/pet_teapot.svg" width="52" /> | **녹차 티포트** | 코인 획득량 **+50%** 증가 & **11초마다 미니 체력 회복(+9 HP)** 생성 |
| <img src="assets/pets/pet_choco.svg" width="52" /> | **민트초코 박쥐** | **10초마다 황금 코인 방울 3개** 생성 & 코인 획득량 **+65%** 증가 |
| <img src="assets/pets/pet_star.svg" width="52" /> | **코메트 별사탕** | 모든 젤리 점수 **+45%** 증가 & **피버 타임 지속시간 +2.5초** 연장 |
| <img src="assets/pets/pet_skewer.svg" width="52" /> | **설탕유리 여우** | 게임 시작 시 **설탕유리 보호막 1회 부여** & 장애물 파괴 점수 **+1,200점** 추가 |
| <img src="assets/pets/pet_bee.svg" width="52" /> | **로열 메이플 꿀벌** | 최종 진화 펫! 젤리 점수 **+60%**, 체력 감소 **22% 완화**, **13초마다 로열제리(+12 HP)** 공급 |

---

## 👑 전설의 베이커리 보물 (5 Collectible Treasures)

최대 **2개의 보물**을 동시에 장착해 나만의 러닝 빌드를 완성할 수 있습니다.

| 아이콘 | 보물 이름 | 장착 효과 |
| :---: | :--- | :--- |
| <img src="assets/treasures/tr_whisk.svg" width="48" /> | **전설의 황금 거품기** | 장착 시 모든 젤리 획득 점수 **+30% 추가 증폭** |
| <img src="assets/treasures/tr_crown.svg" width="48" /> | **영원한 딸기 왕관** | 장착 시 최대 체력 **+30 증가** & 모든 회복 물약 효율 **+25% 상승** |
| <img src="assets/treasures/tr_hourglass.svg" width="48" /> | **마법 시럽 모래시계** | 장착 시 캐릭터 고유 액티브 스킬 쿨타임 **18% 단축** |
| <img src="assets/treasures/tr_compass.svg" width="48" /> | **달콤 자석 나침반** | 장착 시 기본 자석 반경 **+110px 증가** & 코인 획득량 **+40% 상승** |
| <img src="assets/treasures/tr_grail.svg" width="48" /> | **오븐 수호자의 성배** | 장착 시 체력 고갈 순간 **1회 자동 부활 (HP 45 회복 + 3초 무적)** 발동! |

---

## 🍬 아이템 & 장애물 가이드 (13 Items & 5 Obstacles)

| 아이콘 | 이름 | 효과 및 설명 |
| :---: | :--- | :--- |
| <img src="assets/items/bean_normal.svg" width="38" /> <img src="assets/items/bean_gold.svg" width="38" /> <img src="assets/items/bean_rainbow.svg" width="42" /> | **달콤 슈가방울 / 황금 딸기젤리 / 무지개 별사탕 젤리** | 연속 획득 시 콤보 보너스 누적! **무지개 별사탕 젤리**는 초고득점(1,800점)과 함께 **캐릭터 스킬 쿨타임을 0.8초 단축**합니다. |
| <img src="assets/items/potion_hp.svg" width="44" /> <img src="assets/items/potion_mega.svg" width="44" /> | **딸기우유 회복약 / 로열 생크림 파르페** | 즉시 체력을 **+28 HP** / **+65 HP** 대량 회복합니다. |
| <img src="assets/items/item_boost.svg" width="44" /> <img src="assets/items/item_giant.svg" width="44" /> | **슈가러시 로켓사탕 / 왕방울 찹쌀떡** | 무적 광속 질주 및 거대화 변신으로 모든 장애물을 튕겨내며 파괴 보너스를 획득합니다. |
| <img src="assets/items/item_magnet.svg" width="44" /> <img src="assets/items/item_wing_jelly.svg" width="44" /> | **츄러스 자석 / 천사 날개 젤리 각성** | 화면 전체의 아이템과 젤리들이 날개를 달고 캐릭터에게 날아옵니다. |
| <img src="assets/items/item_shield.svg" width="44" /> <img src="assets/items/item_coin_blast.svg" width="44" /> <img src="assets/items/mystery_box.svg" width="44" /> | **설탕유리 보호막 / 황금 코인 마법폭죽 / 무지개 선물상자** | 충돌 1회 방어 실드(최대 3중첩), 장애물 전체 코인 변환 폭죽, 잭팟 랜덤 효과를 터뜨리는 선물상자! |
| <img src="assets/obstacles/obs_fork.svg" width="36" /> <img src="assets/obstacles/obs_candle.svg" width="36" /> <img src="assets/obstacles/obs_teapot_lava.svg" width="38" /> <img src="assets/obstacles/obs_roller.svg" width="42" /> <img src="assets/obstacles/obs_piping.svg" width="42" /> | **포크 / 생일초 화염 / 끓는 시럽 주전자 / 밀대 롤러 / 생크림 짤주머니** | 1단 점프, 2단 점프, 슬라이드로 회피하거나 무적/거대화/참격 스킬로 통쾌하게 분쇄하세요! |

---

## 🗺️ 8대 베이커리 월드 스테이지 (8 World Biomes)

1. **STAGE 1 : 새벽녘 화덕 탈출** — 뜨끈뜨끈한 오븐에서 갓 구워진 모찌들의 대탈출
2. **STAGE 2 : 생크림 딸기 정원** — 구름처럼 폭신한 핑크빛 생크림 언덕
3. **STAGE 3 : 말차 슈가 포레스트** — 향긋한 녹차 파우더와 시럽 강이 흐르는 숲
4. **STAGE 4 : 민트초코 빙하 협곡** — 시원한 민트 아이스크림 빙하와 초코 시럽 폭포
5. **STAGE 5 : 에스프레소 로스터리 공방** — 진한 커피 향기와 황금빛 카라멜 증기 시계탑
6. **STAGE 6 : 크리스탈 캔디 동굴** — 투명한 설탕유리 보석과 과일 탕후루가 빛나는 수정 동굴
7. **STAGE 7 : 스타라이트 파르페 궁전** — 반짝이는 별사탕 은하수를 가로지르는 환상의 질주
8. **STAGE 8 : 로열 골든 와플 생츄어리** — 선택받은 디저트 영웅만 도달하는 전설의 황금 성소

---

## 💾 세이브 & 백업 시스템 (Save System)

로비의 **`💾 저장관리`** 탭에서 다음 기능을 모두 지원합니다:
- **실시간 자동 저장 (Auto-Save)**: 매 런 종료, 캐릭터/펫/보물 해금, 능력치 강화, 업적 보상 수령 시 브라우저 `localStorage`에 즉시 저장됩니다.
- **세이브 파일(`.json`) 내보내기 & 불러오기**: 진행 데이터를 파일로 PC/모바일에 백업하거나 불러올 수 있습니다.
- **클라우드 백업 코드 (Base64 Save String)**: 코드 한 줄을 복사해 다른 기기나 브라우저에 붙여넣으면 모든 캐릭터·코인·최고점수가 그대로 복원됩니다.
