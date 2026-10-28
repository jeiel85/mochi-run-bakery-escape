// Original Characters, Companion Pets, Upgrades, and Stage Biomes for Mochi Run: Bakery Escape

export const CHARACTERS = [
  {
    id: 'mochi',
    name: '딸기찹쌀 모찌',
    title: '말랑말랑 베이커리의 영웅',
    badge: 'STARTER',
    baseHp: 130,
    skillCooldown: 13,
    skillDuration: 3.6,
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
    baseHp: 165,
    skillCooldown: 15,
    skillDuration: 3.0,
    skillName: '로열 카라멜 바운스',
    skillDesc: '15초마다 왕실 카라멜 파동을 터뜨려 체력을 +14 회복하고 화면의 슈가방울을 모두 흡수합니다!',
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
    baseHp: 145,
    skillCooldown: 11.5,
    skillDuration: 4.0,
    skillName: '바삭 크러스트 참격',
    skillDesc: '11.5초마다 웨하스 검기를 발동해 부딪히는 모든 장애물을 산산조각내고 파괴 보너스 +2,500점을 획득합니다!',
    unlockCost: 600,
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
    id: 'konpeito',
    name: '별사탕 요정 슈가',
    title: '은하수 설탕공방의 마법사',
    badge: 'SCORE MASTER',
    baseHp: 140,
    skillCooldown: 10.5,
    skillDuration: 4.2,
    skillName: '스타더스트 슈가샤워',
    skillDesc: '10.5초마다 하늘에서 별사탕 유성우를 소환하고 모든 젤리 획득 점수를 2.2배로 증폭시킵니다!',
    unlockCost: 1000,
    themeColor: '#9b5de5',
    accentColor: '#f1e4ff',
    sprites: {
      run1: 'assets/characters/konpeito_run1.svg',
      run2: 'assets/characters/konpeito_run2.svg',
      jump: 'assets/characters/konpeito_jump.svg',
      slide: 'assets/characters/konpeito_slide.svg'
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
    magnetRadiusBonus: 50,
    jellyScoreMult: 1.1,
    hpDrainReduction: 0.18,
    coinBonusMult: 1.0
  },
  {
    id: 'pet_teapot',
    name: '녹차 티포트',
    desc: '코인 획득량 +50% 증가 & 12초마다 미니 체력 회복 방울 생성',
    unlockCost: 500,
    sprite: 'assets/pets/pet_teapot.svg',
    magnetRadiusBonus: 65,
    jellyScoreMult: 1.15,
    hpDrainReduction: 0.08,
    coinBonusMult: 1.5
  },
  {
    id: 'pet_star',
    name: '코메트 별사탕',
    desc: '모든 젤리 점수 +45% 증가 & 피버 타임 지속시간 +2초 연장',
    unlockCost: 850,
    sprite: 'assets/pets/pet_star.svg',
    magnetRadiusBonus: 120,
    jellyScoreMult: 1.45,
    hpDrainReduction: 0.12,
    coinBonusMult: 1.25
  }
];

export const STAGES = [
  {
    name: 'STAGE 1 : 새벽녘 화덕 탈출',
    sub: '뜨끈뜨끈한 오븐에서 갓 구워진 모찌들의 대탈출!',
    skyTop: '#2b132c',
    skyBottom: '#6e2549',
    hillBack: '#4a1936',
    hillFront: '#89315b',
    floorTop: '#ff9ebb',
    floorMain: '#5e2a27',
    floorAccent: '#ffd6e0'
  },
  {
    name: 'STAGE 2 : 생크림 딸기 정원',
    sub: '구름처럼 폭신한 핑크빛 생크림 언덕을 달려요!',
    skyTop: '#ff758f',
    skyBottom: '#ffccd5',
    hillBack: '#ff8fa3',
    hillFront: '#ffb3c1',
    floorTop: '#fff0f3',
    floorMain: '#c9184a',
    floorAccent: '#ffccd5'
  },
  {
    name: 'STAGE 3 : 말차 슈가 포레스트',
    sub: '향긋한 녹차 파우더와 시럽 강이 흐르는 신비의 숲!',
    skyTop: '#1b4332',
    skyBottom: '#52b788',
    hillBack: '#2d6a4f',
    hillFront: '#40916c',
    floorTop: '#d8f3dc',
    floorMain: '#3a2618',
    floorAccent: '#95d5b2'
  },
  {
    name: 'STAGE 4 : 스타라이트 파르페 궁전',
    sub: '반짝이는 별사탕 은하수를 가로지르는 환상의 질주!',
    skyTop: '#10002b',
    skyBottom: '#5a189a',
    hillBack: '#240046',
    hillFront: '#3c096c',
    floorTop: '#e0aaff',
    floorMain: '#240046',
    floorAccent: '#c77dff'
  }
];

export const FEVER_LETTERS = ['M', 'O', 'C', 'H', 'I'];
