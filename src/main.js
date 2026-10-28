// UI & Event Controller for Mochi Run: Bakery Escape
import { CHARACTERS, PETS, FEVER_LETTERS } from './config.js';
import { SoundEngine } from './audio.js';
import { MochiGame } from './game.js';

const audio = new SoundEngine();

// DOM references
const canvas = document.getElementById('game-canvas');
const hudLayer = document.getElementById('hud-layer');
const lobbyModal = document.getElementById('lobby-modal');
const pauseModal = document.getElementById('pause-modal');
const gameoverModal = document.getElementById('gameover-modal');

// HUD elements
const hpBarFill = document.getElementById('hp-bar-fill');
const hpText = document.getElementById('hp-text');
const skillBarFill = document.getElementById('skill-bar-fill');
const skillNameText = document.getElementById('hud-skill-name');
const scoreText = document.getElementById('hud-score');
const coinText = document.getElementById('hud-coins');
const comboBadge = document.getElementById('hud-combo');
const stageToast = document.getElementById('stage-toast');
const feverSlots = document.getElementById('fever-slots');

// Lobby elements
const lobbyCoins = document.getElementById('lobby-coins');
const lobbyHighscore = document.getElementById('lobby-highscore');
const charGrid = document.getElementById('char-grid');
const petGrid = document.getElementById('pet-grid');
const upgradeGrid = document.getElementById('upgrade-grid');
const previewImg = document.getElementById('lobby-preview-char');
const previewPetImg = document.getElementById('lobby-preview-pet');
const previewName = document.getElementById('lobby-char-name');
const previewTitle = document.getElementById('lobby-char-title');
const previewSkill = document.getElementById('lobby-char-skill');

let stageToastTimeout = null;

const uiCallbacks = {
  onGameStart(char, stage) {
    lobbyModal.classList.add('hidden');
    gameoverModal.classList.add('hidden');
    pauseModal.classList.add('hidden');
    hudLayer.classList.remove('hidden');
    skillNameText.textContent = char.skillName;
    showStageToast(stage);
  },

  onStageChange(stage) {
    showStageToast(stage);
  },

  onPauseChange(isPaused) {
    if (isPaused) {
      pauseModal.classList.remove('hidden');
    } else {
      pauseModal.classList.add('hidden');
    }
  },

  onHudUpdate(data) {
    const hpPct = Math.max(0, Math.min(100, (data.hp / data.maxHp) * 100));
    hpBarFill.style.width = `${hpPct}%`;
    hpBarFill.style.background =
      hpPct > 35
        ? 'linear-gradient(90deg, #ff4d6d, #ff8fa3, #ffbe0b)'
        : 'linear-gradient(90deg, #d90429, #ef233c)';
    hpText.textContent = `${Math.ceil(data.hp)} / ${data.maxHp}`;

    const skillPct =
      data.skillActiveTimer > 0
        ? 100
        : Math.max(0, Math.min(100, ((data.skillCooldown - data.skillTimer) / data.skillCooldown) * 100));
    skillBarFill.style.width = `${skillPct}%`;

    scoreText.textContent = data.score.toLocaleString();
    coinText.textContent = data.coins.toLocaleString();

    if (data.combo >= 5) {
      comboBadge.classList.remove('hidden');
      comboBadge.textContent = `${data.combo} COMBO!`;
    } else {
      comboBadge.classList.add('hidden');
    }

    // Update M-O-C-H-I fever badges
    const badges = feverSlots.children;
    for (let i = 0; i < 5; i++) {
      if (badges[i]) {
        if (data.feverTimer > 0) {
          badges[i].className = 'fever-badge active rainbow';
        } else if (data.feverLetters[i]) {
          badges[i].className = 'fever-badge active';
        } else {
          badges[i].className = 'fever-badge';
        }
      }
    }
  },

  onGameOver(result) {
    gameoverModal.classList.remove('hidden');
    document.getElementById('go-score').textContent = result.score.toLocaleString();
    document.getElementById('go-highscore').textContent = result.highScore.toLocaleString();
    document.getElementById('go-coins').textContent = `+${result.coinsEarned.toLocaleString()}`;
    document.getElementById('go-combo').textContent = `${result.maxCombo}회`;
    document.getElementById('go-distance').textContent = `${result.distance}m`;
    const recordBadge = document.getElementById('go-new-record');
    if (result.isNewRecord) {
      recordBadge.classList.remove('hidden');
    } else {
      recordBadge.classList.add('hidden');
    }
    renderLobby();
  }
};

function showStageToast(stage) {
  if (!stageToast) return;
  stageToast.innerHTML = `<div class="toast-title">${stage.name}</div><div class="toast-sub">${stage.sub}</div>`;
  stageToast.classList.remove('hidden');
  if (stageToastTimeout) clearTimeout(stageToastTimeout);
  stageToastTimeout = setTimeout(() => {
    stageToast.classList.add('hidden');
  }, 3200);
}

const game = new MochiGame(canvas, audio, uiCallbacks);

function renderLobby() {
  const save = game.saveData;
  lobbyCoins.textContent = save.coins.toLocaleString();
  lobbyHighscore.textContent = save.highScore.toLocaleString();

  const activeChar = game.getActiveChar();
  const activePet = game.getActivePet();

  previewImg.src = activeChar.sprites.run1;
  previewPetImg.src = activePet.sprite;
  previewName.textContent = activeChar.name;
  previewTitle.textContent = activeChar.title;
  previewSkill.textContent = `${activeChar.skillName} — ${activeChar.skillDesc}`;

  // Characters cards
  charGrid.innerHTML = '';
  CHARACTERS.forEach((c) => {
    const unlocked = save.unlockedChars.includes(c.id);
    const selected = save.selectedChar === c.id;
    const card = document.createElement('div');
    card.className = `select-card ${selected ? 'selected' : ''}`;
    card.innerHTML = `
      <span class="card-badge" style="background:${c.themeColor}">${c.badge}</span>
      <img src="${c.sprites.run1}" alt="${c.name}" class="card-sprite" />
      <div class="card-name">${c.name}</div>
      <div class="card-meta">기본 체력 ${c.baseHp} · 쿨타임 ${c.skillCooldown}초</div>
      <button class="card-btn ${selected ? 'active' : unlocked ? 'equip' : 'buy'}">
        ${selected ? '출전 중 ✓' : unlocked ? '선택하기' : `🪙 ${c.unlockCost} 해금`}
      </button>
    `;
    card.querySelector('button').addEventListener('click', () => {
      audio.init();
      if (unlocked) {
        save.selectedChar = c.id;
        audio.playJelly(5, true);
        game.save();
        renderLobby();
      } else if (save.coins >= c.unlockCost) {
        save.coins -= c.unlockCost;
        save.unlockedChars.push(c.id);
        save.selectedChar = c.id;
        audio.playPowerup();
        game.save();
        renderLobby();
      } else {
        audio.playHit();
        alert(`코인이 부족합니다! (필요 코인: ${c.unlockCost})`);
      }
    });
    charGrid.appendChild(card);
  });

  // Pets cards
  petGrid.innerHTML = '';
  PETS.forEach((p) => {
    const unlocked = save.unlockedPets.includes(p.id);
    const selected = save.selectedPet === p.id;
    const card = document.createElement('div');
    card.className = `select-card ${selected ? 'selected' : ''}`;
    card.innerHTML = `
      <img src="${p.sprite}" alt="${p.name}" class="card-sprite pet-sprite" />
      <div class="card-name">${p.name}</div>
      <div class="card-meta">${p.desc}</div>
      <button class="card-btn ${selected ? 'active' : unlocked ? 'equip' : 'buy'}">
        ${selected ? '동행 중 ✓' : unlocked ? '함께하기' : `🪙 ${p.unlockCost} 해금`}
      </button>
    `;
    card.querySelector('button').addEventListener('click', () => {
      audio.init();
      if (unlocked) {
        save.selectedPet = p.id;
        audio.playJelly(5, true);
        game.save();
        renderLobby();
      } else if (save.coins >= p.unlockCost) {
        save.coins -= p.unlockCost;
        save.unlockedPets.push(p.id);
        save.selectedPet = p.id;
        audio.playPowerup();
        game.save();
        renderLobby();
      } else {
        audio.playHit();
        alert(`코인이 부족합니다! (필요 코인: ${p.unlockCost})`);
      }
    });
    petGrid.appendChild(card);
  });

  // Upgrades
  const upgradeDefs = [
    {
      key: 'hpLevel',
      name: '❤️ 오븐 체력 강화',
      desc: '최대 체력 +15 증가',
      icon: 'assets/items/potion_hp.svg',
      baseCost: 120
    },
    {
      key: 'jellyLevel',
      name: '🍓 슈가방울 당도 강화',
      desc: '모든 젤리 기본 점수 +110점 추가',
      icon: 'assets/items/bean_gold.svg',
      baseCost: 140
    },
    {
      key: 'magnetLevel',
      name: '🧲 시럽 자력 강화',
      desc: '기본 아이템 흡수 반경 +35px 증가',
      icon: 'assets/items/item_magnet.svg',
      baseCost: 130
    }
  ];

  upgradeGrid.innerHTML = '';
  upgradeDefs.forEach((u) => {
    const lvl = save.upgrades[u.key] || 1;
    const cost = u.baseCost * lvl;
    const card = document.createElement('div');
    card.className = 'upgrade-card';
    card.innerHTML = `
      <img src="${u.icon}" alt="${u.name}" class="upgrade-icon" />
      <div class="upgrade-info">
        <div class="upgrade-title">${u.name} <span class="lvl-pill">Lv.${lvl}</span></div>
        <div class="upgrade-desc">${u.desc}</div>
      </div>
      <button class="card-btn buy">🪙 ${cost} 강화</button>
    `;
    card.querySelector('button').addEventListener('click', () => {
      audio.init();
      if (save.coins >= cost) {
        save.coins -= cost;
        save.upgrades[u.key] = lvl + 1;
        audio.playPowerup();
        game.save();
        renderLobby();
      } else {
        audio.playHit();
        alert(`코인이 부족합니다! (필요 코인: ${cost})`);
      }
    });
    upgradeGrid.appendChild(card);
  });
}

// Initialize M-O-C-H-I badge slots
FEVER_LETTERS.forEach((l) => {
  const span = document.createElement('span');
  span.className = 'fever-badge';
  span.textContent = l;
  feverSlots.appendChild(span);
});

renderLobby();

// Tab switching in Lobby
document.querySelectorAll('.tab-btn').forEach((btn) => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.tab-btn').forEach((b) => b.classList.remove('active'));
    document.querySelectorAll('.tab-panel').forEach((p) => p.classList.add('hidden'));
    btn.classList.add('active');
    const target = document.getElementById(btn.dataset.target);
    if (target) target.classList.remove('hidden');
  });
});

// Start / Retry / Lobby navigation buttons
document.getElementById('btn-start-game').addEventListener('click', () => {
  game.startGame();
});

document.getElementById('btn-retry').addEventListener('click', () => {
  game.startGame();
});

document.getElementById('btn-to-lobby').addEventListener('click', () => {
  gameoverModal.classList.add('hidden');
  hudLayer.classList.add('hidden');
  lobbyModal.classList.remove('hidden');
  game.state = 'MENU';
  renderLobby();
});

document.getElementById('btn-pause').addEventListener('click', () => {
  game.pauseToggle();
});

document.getElementById('btn-resume').addEventListener('click', () => {
  game.pauseToggle();
});

document.getElementById('btn-pause-lobby').addEventListener('click', () => {
  pauseModal.classList.add('hidden');
  hudLayer.classList.add('hidden');
  lobbyModal.classList.remove('hidden');
  game.state = 'MENU';
  audio.stopBGM();
  renderLobby();
});

// Sound toggle button
const muteBtn = document.getElementById('btn-mute');
muteBtn.addEventListener('click', () => {
  const muted = audio.toggleMute();
  muteBtn.textContent = muted ? '🔇' : '🔊';
});

// Keyboard Controls (Space / Up / W = Jump, Down / S = Slide, P / Escape = Pause)
window.addEventListener('keydown', (e) => {
  if (e.repeat) return;
  if (e.code === 'Space' || e.code === 'ArrowUp' || e.code === 'KeyW') {
    if (game.state === 'PLAYING') {
      e.preventDefault();
      game.jump();
    }
  } else if (e.code === 'ArrowDown' || e.code === 'KeyS') {
    if (game.state === 'PLAYING') {
      e.preventDefault();
      game.setSlide(true);
    }
  } else if (e.code === 'KeyP' || e.code === 'Escape') {
    if (game.state === 'PLAYING' || game.state === 'PAUSED') {
      game.pauseToggle();
    }
  }
});

window.addEventListener('keyup', (e) => {
  if (e.code === 'ArrowDown' || e.code === 'KeyS') {
    game.setSlide(false);
  }
});

// Touch / On-screen Action Buttons (JUMP & SLIDE)
const touchJumpBtn = document.getElementById('btn-touch-jump');
const touchSlideBtn = document.getElementById('btn-touch-slide');

const bindJump = (ev) => {
  ev.preventDefault();
  game.jump();
};
touchJumpBtn.addEventListener('pointerdown', bindJump);

touchSlideBtn.addEventListener('pointerdown', (ev) => {
  ev.preventDefault();
  game.setSlide(true);
  touchSlideBtn.classList.add('pressed');
});
const releaseSlide = (ev) => {
  ev.preventDefault();
  game.setSlide(false);
  touchSlideBtn.classList.remove('pressed');
};
touchSlideBtn.addEventListener('pointerup', releaseSlide);
touchSlideBtn.addEventListener('pointerleave', releaseSlide);
touchSlideBtn.addEventListener('pointercancel', releaseSlide);
