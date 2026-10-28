// Commercial Release Configuration for Mochi Run: Bakery Escape
// 7 Original Characters, 7 Pets, 8 Stages, 5 Collectible Treasures, 12 Item Types, Missions & Achievements

export const CHARACTERS = [
  {
    id: 'mochi',
    name: '딸기찹쌀 모찌',
    title: '말랑말랑 베이커리의 영웅',
    badge: 'STARTER',
    baseHp: 135,
    skillCooldown: 13,
    skillDuration: 3.8,
    skillName: '딸기시럽 무적 대시',
    skillDesc: '13초마다 달콤한 딸기시럽 오라를 두르고 고속 질주하며 주변 장애물을 황금 딸기젤리로 변환합니다!',
    unlockCost: 0,
    themeColor: '#ff5d8f',
    accentColor: '#ffe5ec',
    sprites: {
      run1: 'assets/characters/mochi_run1.svg',
      run2: 'assets/characters/mochi_run2.svg',
      jump: 'assets/characters/mochi_jump.svg',
      slide: 'assets/characters/mochi_slide.svg'
    }
  },
  {
    id: 'pudding',
    name: '커스터드 푸딩킹',
    title: '출렁이는 카라멜 왕국의 군주',
    badge: 'TANK & HEAL',
    baseHp: 170,
    skillCooldown: 14.5,
    skillDuration: 3.2,
    skillName: '로열 카라멜 바운스',
    skillDesc: '14.5초마다 왕실 카라멜 파동을 터뜨려 체력을 +16 회복하고 화면의 슈가방울을 모두 흡수합니다!',
    unlockCost: 300,
    themeColor: '#ffb703',
    accentColor: '#fff3b0',
    sprites: {
      run1: 'assets/characters/pudding_run1.svg',
      run2: 'assets/characters/pudding_run2.svg',
      jump: 'assets/characters/pudding_jump.svg',
      slide: 'assets/characters/pudding_slide.svg'
    }
  },
  {
    id: 'taiyaki',
    name: '단팥 붕어빵 기사',
    title: '바삭한 버터방패의 수호자',
    badge: 'BREAKER',
    baseHp: 150,
    skillCooldown: 11.5,
    skillDuration: 4.0,
    skillName: '바삭 크러스트 참격',
    skillDesc: '11.5초마다 웨하스 검기를 발동해 부딪히는 모든 장애물을 산산조각내고 파괴 보너스 +2,800점을 획득합니다!',
    unlockCost: 550,
    themeColor: '#fb8500',
    accentColor: '#ffedd8',
    sprites: {
      run1: 'assets/characters/taiyaki_run1.svg',
      run2: 'assets/characters/taiyaki_run2.svg',
      jump: 'assets/characters/taiyaki_jump.svg',
      slide: 'assets/characters/taiyaki_slide.svg'
    }
  },
  {
    id: 'macaron',
    name: '민트초코 마카롱 위치',
    title: '상쾌한 가나슈 마법학교의 마녀',
    badge: 'ALCHEMIST',
    baseHp: 145,
    skillCooldown: 12.0,
    skillDuration: 4.0,
    skillName: '민트초코 연금술 비행',
    skillDesc: '12초마다 캔디 지팡이 마법진을 펼쳐 전방 장애물을 황금 코인과 무지개 별사탕 젤리로 연성합니다!',
    unlockCost: 800,
    themeColor: '#00f5d4',
    accentColor: '#d8f3dc',
    sprites: {
      run1: 'assets/characters/macaron_run1.svg',
      run2: 'assets/characters/macaron_run2.svg',
      jump: 'assets/characters/macaron_jump.svg',
      slide: 'assets/characters/macaron_slide.svg'
    }
  },
  {
    id: 'konpeito',
    name: '별사탕 요정 슈가',
    title: '은하수 설탕공방의 마법사',
    badge: 'SCORE MASTER',
    baseHp: 145,
    skillCooldown: 10.5,
    skillDuration: 4.4,
    skillName: '스타더스트 슈가샤워',
    skillDesc: '10.5초마다 하늘에서 무지개 별사탕 유성우를 소환하고 모든 젤리 획득 점수를 2.3배로 증폭시킵니다!',
    unlockCost: 1100,
    themeColor: '#9b5de5',
    accentColor: '#f1e4ff',
    sprites: {
      run1: 'assets/characters/konpeito_run1.svg',
      run2: 'assets/characters/konpeito_run2.svg',
      jump: 'assets/characters/konpeito_jump.svg',
      slide: 'assets/characters/konpeito_slide.svg'
    }
  },
  {
    id: 'tanghulu',
    name: '크리스탈 탕후루 닌자',
    title: '반짝이는 설탕유리 그림자 자객',
    badge: 'SPEED & SHIELD',
    baseHp: 155,
    skillCooldown: 10.0,
    skillDuration: 3.6,
    skillName: '샤인머스캣 섬광 일섬',
    skillDesc: '10초마다 초고속 그림자 분신 질주를 발동하고, 1회 충돌을 막아주는 설탕유리 코팅 보호막을 두릅니다!',
    unlockCost: 1450,
    themeColor: '#38b000',
    accentColor: '#e9f5db',
    sprites: {
      run1: 'assets/characters/tanghulu_run1.svg',
      run2: 'assets/characters/tanghulu_run2.svg',
      jump: 'assets/characters/tanghulu_jump.svg',
      slide: 'assets/characters/tanghulu_slide.svg'
    }
  },
  {
    id: 'waffle',
    name: '허니버터 와플 골렘',
    title: '황금빛 메이플 성채의 수호 거신',
    badge: 'LEGEND TITAN',
    baseHp: 195,
    skillCooldown: 14.0,
    skillDuration: 4.8,
    skillName: '메이플 버터 대지진',
    skillDesc: '14초마다 초거대 황금 와플 타이탄으로 각성해 화면의 모든 장애물을 분쇄하고 체력 +12 회복 및 무지개 젤리를 분출합니다!',
    unlockCost: 1900,
    themeColor: '#f77f00',
    accentColor: '#fcbf49',
    sprites: {
      run1: 'assets/characters/waffle_run1.svg',
      run2: 'assets/characters/waffle_run2.svg',
      jump: 'assets/characters/waffle_jump.svg',
      slide: 'assets/characters/waffle_slide.svg'
    }
  }
];

export const PETS = [
  {
    id: 'pet_berry',
    name: '설탕토끼 베리',
    desc: '자석 범위 +95px 증가 & 젤리 기본 점수 +25% 보너스',
    unlockCost: 0,
    sprite: 'assets/pets/pet_berry.svg',
    magnetRadiusBonus: 95,
    jellyScoreMult: 1.25,
    hpDrainReduction: 0,
    coinBonusMult: 1.0
  },
  {
    id: 'pet_butter',
    name: '버터방울 천사',
    desc: '체력 감소 속도 18% 완화 & 충돌 피해량 25% 감소',
    unlockCost: 250,
    sprite: 'assets/pets/pet_butter.svg',
    magnetRadiusBonus: 55,
    jellyScoreMult: 1.12,
    hpDrainReduction: 0.18,
    coinBonusMult: 1.0
  },
  {
    id: 'pet_teapot',
    name: '녹차 티포트',
    desc: '코인 획득량 +50% 증가 & 11초마다 미니 체력 회복(+9 HP) 생성',
    unlockCost: 500,
    sprite: 'assets/pets/pet_teapot.svg',
    magnetRadiusBonus: 70,
    jellyScoreMult: 1.18,
    hpDrainReduction: 0.08,
    coinBonusMult: 1.5
  },
  {
    id: 'pet_choco',
    name: '민트초코 박쥐',
    desc: '10초마다 황금 코인 방울 3개 생성 & 코인 획득량 +65% 증가',
    unlockCost: 700,
    sprite: 'assets/pets/pet_choco.svg',
    magnetRadiusBonus: 85,
    jellyScoreMult: 1.22,
    hpDrainReduction: 0.1,
    coinBonusMult: 1.65
  },
  {
    id: 'pet_star',
    name: '코메트 별사탕',
    desc: '모든 젤리 점수 +45% 증가 & 피버 타임 지속시간 +2.5초 연장',
    unlockCost: 900,
    sprite: 'assets/pets/pet_star.svg',
    magnetRadiusBonus: 120,
    jellyScoreMult: 1.45,
    hpDrainReduction: 0.12,
    coinBonusMult: 1.25
  },
  {
    id: 'pet_skewer',
    name: '설탕유리 여우',
    desc: '게임 시작 시 설탕유리 보호막 1회 부여 & 장애물 파괴 점수 +1,200점 추가',
    unlockCost: 1200,
    sprite: 'assets/pets/pet_skewer.svg',
    magnetRadiusBonus: 110,
    jellyScoreMult: 1.35,
    hpDrainReduction: 0.15,
    coinBonusMult: 1.3
  },
  {
    id: 'pet_bee',
    name: '로열 메이플 꿀벌',
    desc: '최종 진화 펫! 젤리 점수 +60%, 체력 감소 22% 완화, 13초마다 로열제리(+12 HP) 공급',
    unlockCost: 1600,
    sprite: 'assets/pets/pet_bee.svg',
    magnetRadiusBonus: 145,
    jellyScoreMult: 1.6,
    hpDrainReduction: 0.22,
    coinBonusMult: 1.5
  }
];

export const TREASURES = [
  {
    id: 'tr_whisk',
    name: '전설의 황금 거품기',
    desc: '장착 시 모든 젤리 점수 +30% 추가 증폭',
    unlockCost: 400,
    sprite: 'assets/treasures/tr_whisk.svg'
  },
  {
    id: 'tr_crown',
    name: '영원한 딸기 왕관',
    desc: '장착 시 최대 체력 +30 증가 & 물약 회복량 +25% 상승',
    unlockCost: 550,
    sprite: 'assets/treasures/tr_crown.svg'
  },
  {
    id: 'tr_hourglass',
    name: '마법 시럽 모래시계',
    desc: '장착 시 캐릭터 고유 스킬 쿨타임 18% 감소',
    unlockCost: 700,
    sprite: 'assets/treasures/tr_hourglass.svg'
  },
  {
    id: 'tr_compass',
    name: '달콤 자석 나침반',
    desc: '장착 시 자석 반경 +110px 증가 & 코인 획득량 +40% 상승',
    unlockCost: 650,
    sprite: 'assets/treasures/tr_compass.svg'
  },
  {
    id: 'tr_grail',
    name: '오븐 수호자의 성배',
    desc: '장착 시 체력 고갈 순간 1회 자동 부활(HP 45 회복 + 3초 무적)!',
    unlockCost: 1200,
    sprite: 'assets/treasures/tr_grail.svg'
  }
];

export const STAGES = [
  {
    id: 1,
    name: 'STAGE 1 : 새벽녘 화덕 탈출',
    sub: '뜨끈뜨끈한 오븐에서 갓 구워진 모찌들의 대탈출!',
    skyTop: '#2b132c',
    skyBottom: '#6e2549',
    hillBack: '#4a1936',
    hillFront: '#89315b',
    floorTop: '#ff9ebb',
    floorMain: '#5e2a27',
    floorAccent: '#ffd6e0',
    weatherColor: 'rgba(255, 180, 162, 0.45)',
    speedMult: 1.0
  },
  {
    id: 2,
    name: 'STAGE 2 : 생크림 딸기 정원',
    sub: '구름처럼 폭신한 핑크빛 생크림 언덕을 달려요!',
    skyTop: '#ff758f',
    skyBottom: '#ffccd5',
    hillBack: '#ff8fa3',
    hillFront: '#ffb3c1',
    floorTop: '#fff0f3',
    floorMain: '#c9184a',
    floorAccent: '#ffccd5',
    weatherColor: 'rgba(255, 255, 255, 0.65)',
    speedMult: 1.05
  },
  {
    id: 3,
    name: 'STAGE 3 : 말차 슈가 포레스트',
    sub: '향긋한 녹차 파우더와 시럽 강이 흐르는 신비의 숲!',
    skyTop: '#1b4332',
    skyBottom: '#52b788',
    hillBack: '#2d6a4f',
    hillFront: '#40916c',
    floorTop: '#d8f3dc',
    floorMain: '#3a2618',
    floorAccent: '#95d5b2',
    weatherColor: 'rgba(183, 228, 199, 0.5)',
    speedMult: 1.1
  },
  {
    id: 4,
    name: 'STAGE 4 : 민트초코 빙하 협곡',
    sub: '시원한 민트 아이스크림 빙하와 초코 시럽 폭포!',
    skyTop: '#003049',
    skyBottom: '#48cae4',
    hillBack: '#0077b6',
    hillFront: '#00b4d8',
    floorTop: '#caf0f8',
    floorMain: '#3d251e',
    floorAccent: '#90e0ef',
    weatherColor: 'rgba(202, 240, 248, 0.65)',
    speedMult: 1.15
  },
  {
    id: 5,
    name: 'STAGE 5 : 에스프레소 로스터리 공방',
    sub: '진한 커피 향기와 황금빛 카라멜 증기가 가득한 시계탑!',
    skyTop: '#220901',
    skyBottom: '#941b0c',
    hillBack: '#621708',
    hillFront: '#bc3908',
    floorTop: '#f6aa1c',
    floorMain: '#1f1300',
    floorAccent: '#ffba08',
    weatherColor: 'rgba(246, 170, 28, 0.45)',
    speedMult: 1.2
  },
  {
    id: 6,
    name: 'STAGE 6 : 크리스탈 캔디 동굴',
    sub: '투명한 설탕유리 보석과 과일 탕후루가 빛나는 수정 동굴!',
    skyTop: '#0b525b',
    skyBottom: '#4d194d',
    hillBack: '#1b3a4b',
    hillFront: '#312244',
    floorTop: '#80ffdb',
    floorMain: '#272640',
    floorAccent: '#72efdd',
    weatherColor: 'rgba(128, 255, 219, 0.55)',
    speedMult: 1.25
  },
  {
    id: 7,
    name: 'STAGE 7 : 스타라이트 파르페 궁전',
    sub: '반짝이는 별사탕 은하수를 가로지르는 환상의 질주!',
    skyTop: '#10002b',
    skyBottom: '#5a189a',
    hillBack: '#240046',
    hillFront: '#3c096c',
    floorTop: '#e0aaff',
    floorMain: '#240046',
    floorAccent: '#c77dff',
    weatherColor: 'rgba(224, 170, 255, 0.6)',
    speedMult: 1.3
  },
  {
    id: 8,
    name: 'STAGE 8 : 로열 골든 와플 생츄어리',
    sub: '선택받은 디저트 영웅만 도달하는 전설의 황금 성소!',
    skyTop: '#370617',
    skyBottom: '#faa307',
    hillBack: '#6a040f',
    hillFront: '#dc2f02',
    floorTop: '#ffba08',
    floorMain: '#370617',
    floorAccent: '#ffd166',
    weatherColor: 'rgba(255, 209, 102, 0.7)',
    speedMult: 1.36
  }
];

export const ACHIEVEMENTS = [
  {
    id: 'ach_first_run',
    title: '첫 오븐 탈출의 발걸음',
    desc: '누적 달린 거리 500m 달성',
    target: 500,
    statKey: 'totalDistance',
    rewardCoins: 250
  },
  {
    id: 'ach_jelly_lover',
    title: '달콤한 슈가 콜렉터',
    desc: '누적 젤리 500개 획득',
    target: 500,
    statKey: 'totalJellies',
    rewardCoins: 350
  },
  {
    id: 'ach_combo_master',
    title: '리듬 타는 파티시에',
    desc: '한 판에서 최대 100 콤보 달성',
    target: 100,
    statKey: 'bestCombo',
    rewardCoins: 450
  },
  {
    id: 'ach_breaker',
    title: '장애물 분쇄기',
    desc: '누적 장애물 30개 파괴',
    target: 30,
    statKey: 'totalSmashed',
    rewardCoins: 400
  },
  {
    id: 'ach_high_scorer',
    title: '전설의 베이커리 챔피언',
    desc: '최고 점수 150,000점 돌파',
    target: 150000,
    statKey: 'highScore',
    rewardCoins: 800
  },
  {
    id: 'ach_collector',
    title: '디저트 왕국 영웅단',
    desc: '창작 캐릭터 4종 이상 해금',
    target: 4,
    statKey: 'unlockedCharsCount',
    rewardCoins: 600
  }
];

export const FEVER_LETTERS = ['M', 'O', 'C', 'H', 'I'];

export const ITEM_GUIDE = [
  { icon: 'assets/items/bean_normal.svg', name: '달콤 슈가방울', desc: '기본 득점 젤리 (연속 획득 시 콤보 보너스)' },
  { icon: 'assets/items/bean_gold.svg', name: '황금 딸기젤리', desc: '고득점 프리미엄 딸기 젤리' },
  { icon: 'assets/items/bean_rainbow.svg', name: '무지개 별사탕 젤리', desc: '초고득점(1,800점) + 스킬 쿨타임 0.8초 단축!' },
  { icon: 'assets/items/coin.svg', name: '베이커리 왕관 코인', desc: '캐릭터·펫·보물 해금 및 강화 화폐' },
  { icon: 'assets/items/potion_hp.svg', name: '딸기우유 회복약', desc: '마시는 즉시 체력(HP) +28 회복' },
  { icon: 'assets/items/potion_mega.svg', name: '로열 생크림 파르페', desc: '초대형 회복 아이템! 체력(HP) +65 즉시 회복' },
  { icon: 'assets/items/item_boost.svg', name: '슈가러시 로켓사탕', desc: '4.5초간 무적 광속 질주 및 장애물 파괴' },
  { icon: 'assets/items/item_giant.svg', name: '왕방울 찹쌀떡', desc: '5.2초간 거대화 변신 & 모든 장애물 분쇄' },
  { icon: 'assets/items/item_magnet.svg', name: '츄러스 자석', desc: '6초간 화면 전체의 모든 아이템을 강력 흡수' },
  { icon: 'assets/items/item_shield.svg', name: '설탕유리 보호막', desc: '장애물 충돌을 1회 완벽 방어하는 크리스탈 실드' },
  { icon: 'assets/items/item_coin_blast.svg', name: '황금 코인 마법폭죽', desc: '화면의 모든 장애물을 황금 코인 더미로 변환!' },
  { icon: 'assets/items/item_wing_jelly.svg', name: '천사 날개 젤리 각성', desc: '6.5초간 모든 젤리에 날개가 돋아 캐릭터에게 날아옴!' },
  { icon: 'assets/items/mystery_box.svg', name: '무지개 선물상자', desc: '랜덤 대박 효과(대량 코인, 피버, 회복, 부스터 등) 발동!' }
];
