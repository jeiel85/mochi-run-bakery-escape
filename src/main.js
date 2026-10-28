// Commercial Release UI, Shop, Stage Selector, Save Manager & Achievement Controller
import { CHARACTERS, PETS, TREASURES, STAGES, FEVER_LETTERS, ACHIEVEMENTS, ITEM_GUIDE } from './config.js';
import { SoundEngine } from './audio.js';
import { MochiGame } from './game.js';

const audio = new SoundEngine();

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
const shieldBadge = document.getElementById('hud-shields');
const stageToast = document.getElementById('stage-toast');
const feverSlots = document.getElementById('fever-slots');

// Lobby elements
const lobbyCoins = document.getElementById('lobby-coins');
const lobbyHighscore = document.getElementById('lobby-highscore');
const charGrid = document.getElementById('char-grid');
const petGrid = document.getElementById('pet-grid');
const treasureGrid = document.getElementById('treasure-grid');
const upgradeGrid = document.getElementById('upgrade-grid');
const stageGrid = document.getElementById('stage-grid');
const achievementList = document.getElementById('achievement-list');
const itemGuideGrid = document.getElementById('item-guide-grid');
const saveStatusPill = document.getElementById('save-status-pill');

const previewImg = document.getElementById('lobby-preview-char');
const previewPetImg = document.getElementById('lobby-preview-pet');
const previewName = document.getElementById('lobby-char-name');
const previewTitle = document.getElementById('lobby-char-title');
const previewSkill = document.getElementById('lobby-char-skill');
const equippedTreasuresBar = document.getElementById('equipped-treasures-bar');

let stageToastTimeout = null;

function showNotice(msg) {
  if (!saveStatusPill) return;
  saveStatusPill.textContent = msg;
  saveStatusPill.classList.add('highlight');
  setTimeout(() => {
    saveStatusPill.classList.remove('highlight');
  }, 1800);
}

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

  onSaveIndicator(isoTime) {
    if (!saveStatusPill) return;
    const t = new Date(isoTime);
    const timeStr = t.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    saveStatusPill.textContent = `💾 자동 저장됨 (${timeStr})`;
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

    if (shieldBadge) {
      const parts = [];
      if (data.shields > 0) parts.push(`🛡️×${data.shields}`);
      if (data.reviveAvailable) parts.push(`🏆부활대기`);
      if (parts.length > 0) {
        shieldBadge.classList.remove('hidden');
        shieldBadge.textContent = parts.join(' · ');
      } else {
        shieldBadge.classList.add('hidden');
      }
    }

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
    const stEl = document.getElementById('go-stage');
    if (stEl) stEl.textContent = result.stageReached;

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
  previewSkill.textContent = `${activeChar.skillName} (${game.getEffectiveCooldown(activeChar)}초) — ${activeChar.skillDesc}`;

  // Equipped Treasures Mini Bar on Left Pedestal
  if (equippedTreasuresBar) {
    equippedTreasuresBar.innerHTML = '';
    for (let i = 0; i < 2; i++) {
      const tId = save.equippedTreasures[i];
      const tr = TREASURES.find((t) => t.id === tId);
      const slot = document.createElement('div');
      slot.className = 'treasure-slot-pill';
      if (tr) {
        slot.innerHTML = `<img src="${tr.sprite}" alt="${tr.name}" /> <span>${tr.name}</span>`;
      } else {
        slot.innerHTML = `<span>보물 슬롯 ${i + 1} (비어있음)</span>`;
      }
      equippedTreasuresBar.appendChild(slot);
    }
  }

  // 1. Characters Grid (7 Heroes)
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
      <div class="card-meta">체력 ${c.baseHp} · 쿨타임 ${c.skillCooldown}초<br>${c.skillName}</div>
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
        showNotice(`❌ 코인이 부족합니다! (필요: ${c.unlockCost})`);
      }
    });
    charGrid.appendChild(card);
  });

  // 2. Pets Grid (7 Pets)
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
        showNotice(`❌ 코인이 부족합니다! (필요: ${p.unlockCost})`);
      }
    });
    petGrid.appendChild(card);
  });

  // 3. Treasures & Upgrades Tab
  if (treasureGrid) {
    treasureGrid.innerHTML = '';
    TREASURES.forEach((t) => {
      const unlocked = save.unlockedTreasures.includes(t.id);
      const equipped = save.equippedTreasures.includes(t.id);
      const card = document.createElement('div');
      card.className = `select-card ${equipped ? 'selected' : ''}`;
      card.innerHTML = `
        <img src="${t.sprite}" alt="${t.name}" class="card-sprite pet-sprite" />
        <div class="card-name">${t.name}</div>
        <div class="card-meta">${t.desc}</div>
        <button class="card-btn ${equipped ? 'active' : unlocked ? 'equip' : 'buy'}">
          ${equipped ? '장착 해제 ✓' : unlocked ? '보물 장착 (최대 2개)' : `🪙 ${t.unlockCost} 해금`}
        </button>
      `;
      card.querySelector('button').addEventListener('click', () => {
        audio.init();
        if (equipped) {
          save.equippedTreasures = save.equippedTreasures.filter((id) => id !== t.id);
          audio.playSlide();
          game.save();
          renderLobby();
        } else if (unlocked) {
          if (save.equippedTreasures.length >= 2) {
            save.equippedTreasures.shift();
          }
          save.equippedTreasures.push(t.id);
          audio.playJelly(6, true);
          game.save();
          renderLobby();
        } else if (save.coins >= t.unlockCost) {
          save.coins -= t.unlockCost;
          save.unlockedTreasures.push(t.id);
          if (save.equippedTreasures.length < 2) {
            save.equippedTreasures.push(t.id);
          }
          audio.playPowerup();
          game.save();
          renderLobby();
        } else {
          audio.playHit();
          showNotice(`❌ 코인이 부족합니다! (필요: ${t.unlockCost})`);
        }
      });
      treasureGrid.appendChild(card);
    });
  }

  const upgradeDefs = [
    {
      key: 'hpLevel',
      name: '❤️ 오븐 체력 강화',
      desc: '최대 체력 +15 영구 증가',
      icon: 'assets/items/potion_hp.svg',
      baseCost: 120
    },
    {
      key: 'jellyLevel',
      name: '🍓 슈가방울 당도 강화',
      desc: '모든 젤리 기본 점수 +120점 추가',
      icon: 'assets/items/bean_rainbow.svg',
      baseCost: 140
    },
    {
      key: 'magnetLevel',
      name: '🧲 시럽 자력 강화',
      desc: '기본 아이템 흡수 반경 +35px 증가',
      icon: 'assets/items/item_magnet.svg',
      baseCost: 130
    },
    {
      key: 'coinLevel',
      name: '🪙 황금 주화 주조술',
      desc: '코인 획득량 레벨당 +15% 영구 증가',
      icon: 'assets/items/coin.svg',
      baseCost: 150
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
        showNotice(`❌ 코인이 부족합니다! (필요: ${cost})`);
      }
    });
    upgradeGrid.appendChild(card);
  });

  // 4. World Map / 8 Stages Selector
  if (stageGrid) {
    stageGrid.innerHTML = '';
    // All-Stage Tour Card
    const tourSelected = (save.selectedStage || 0) === 0;
    const tourCard = document.createElement('div');
    tourCard.className = `stage-card ${tourSelected ? 'selected' : ''}`;
    tourCard.innerHTML = `
      <div class="stage-color-swatch" style="background: linear-gradient(135deg, #ff5d8f, #ffbe0b, #00f5d4);"></div>
      <div class="stage-info">
        <div class="stage-name">🌈 전 구역 이어달리기 (STAGE 1 → 8 순환)</div>
        <div class="stage-sub">260m마다 다음 스테이지 테마로 자동 전환되는 클래식 모드!</div>
      </div>
      <button class="card-btn ${tourSelected ? 'active' : 'equip'}">
        ${tourSelected ? '선택됨 ✓' : '출발 스테이지 지정'}
      </button>
    `;
    tourCard.querySelector('button').addEventListener('click', () => {
      save.selectedStage = 0;
      audio.playJelly(4, true);
      game.save();
      renderLobby();
    });
    stageGrid.appendChild(tourCard);

    STAGES.forEach((st) => {
      const isSelected = save.selectedStage === st.id;
      const card = document.createElement('div');
      card.className = `stage-card ${isSelected ? 'selected' : ''}`;
      card.innerHTML = `
        <div class="stage-color-swatch" style="background: linear-gradient(180deg, ${st.skyTop}, ${st.skyBottom}); border-bottom: 5px solid ${st.floorTop};"></div>
        <div class="stage-info">
          <div class="stage-name">${st.name} <span class="lvl-pill">속도 ×${st.speedMult}</span></div>
          <div class="stage-sub">${st.sub}</div>
        </div>
        <button class="card-btn ${isSelected ? 'active' : 'equip'}">
          ${isSelected ? '선택됨 ✓' : '여기서 출발'}
        </button>
      `;
      card.querySelector('button').addEventListener('click', () => {
        save.selectedStage = st.id;
        audio.playJelly(5, true);
        game.save();
        renderLobby();
      });
      stageGrid.appendChild(card);
    });
  }

  // 5. Achievements & Item Guide
  if (achievementList) {
    achievementList.innerHTML = '';
    ACHIEVEMENTS.forEach((ach) => {
      const progress = game.getAchievementProgress(ach);
      const claimed = save.claimedAchievements.includes(ach.id);
      const canClaim = !claimed && progress >= ach.target;
      const pct = Math.min(100, Math.round((progress / ach.target) * 100));

      const row = document.createElement('div');
      row.className = 'upgrade-card';
      row.innerHTML = `
        <div class="upgrade-info">
          <div class="upgrade-title">🏅 ${ach.title} <span class="lvl-pill">${progress.toLocaleString()} / ${ach.target.toLocaleString()} (${pct}%)</span></div>
          <div class="upgrade-desc">${ach.desc}</div>
        </div>
        <button class="card-btn ${claimed ? 'active' : canClaim ? 'buy' : 'equip'}" ${!canClaim && !claimed ? 'disabled' : ''}>
          ${claimed ? '수령 완료 ✓' : canClaim ? `🪙 +${ach.rewardCoins} 받기!` : `보상 🪙 ${ach.rewardCoins}`}
        </button>
      `;
      if (canClaim) {
        row.querySelector('button').addEventListener('click', () => {
          save.coins += ach.rewardCoins;
          save.claimedAchievements.push(ach.id);
          audio.playPowerup();
          game.save();
          showNotice(`🎉 업적 달성! +${ach.rewardCoins} 코인 획득!`);
          renderLobby();
        });
      }
      achievementList.appendChild(row);
    });
  }

  if (itemGuideGrid && itemGuideGrid.children.length === 0) {
    ITEM_GUIDE.forEach((ig) => {
      const el = document.createElement('div');
      el.className = 'guide-item';
      el.innerHTML = `
        <img src="${ig.icon}" alt="${ig.name}" />
        <div>
          <div class="guide-name">${ig.name}</div>
          <div class="guide-desc">${ig.desc}</div>
        </div>
      `;
      itemGuideGrid.appendChild(el);
    });
  }

  // Update stats summary in Save Manager tab
  const statSummary = document.getElementById('save-stats-summary');
  if (statSummary) {
    statSummary.innerHTML = `
      <div>총 플레이 횟수: <strong>${(save.stats.totalRuns || 0).toLocaleString()}회</strong></div>
      <div>누적 주행 거리: <strong>${(save.stats.totalDistance || 0).toLocaleString()}m</strong></div>
      <div>누적 획득 젤리: <strong>${(save.stats.totalJellies || 0).toLocaleString()}개</strong></div>
      <div>누적 파괴 장애물: <strong>${(save.stats.totalSmashed || 0).toLocaleString()}개</strong></div>
      <div>해금한 영웅/펫/보물: <strong>${save.unlockedChars.length}/7 · ${save.unlockedPets.length}/7 · ${save.unlockedTreasures.length}/5</strong></div>
    `;
  }
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

// Save Data Management Buttons (Manual Save, JSON Download, JSON Upload, Code Copy/Import, Reset)
const btnManualSave = document.getElementById('btn-manual-save');
if (btnManualSave) {
  btnManualSave.addEventListener('click', () => {
    game.save();
    audio.playPowerup();
    showNotice('✅ 브라우저 로컬 저장소에 즉시 저장되었습니다!');
  });
}

const btnExportJson = document.getElementById('btn-export-json');
if (btnExportJson) {
  btnExportJson.addEventListener('click', () => {
    game.save();
    const blob = new Blob([JSON.stringify(game.saveData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `mochi-run-save-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    audio.playCoin();
    showNotice('📥 세이브 파일(.json) 다운로드 완료!');
  });
}

const inputImportJson = document.getElementById('input-import-json');
const btnImportJson = document.getElementById('btn-import-json');
if (btnImportJson && inputImportJson) {
  btnImportJson.addEventListener('click', () => inputImportJson.click());
  inputImportJson.addEventListener('change', (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(String(reader.result));
        const code = btoa(encodeURIComponent(JSON.stringify(parsed)));
        if (game.importSaveCode(code)) {
          audio.playPowerup();
          renderLobby();
          showNotice('✅ 세이브 파일 불러오기 성공!');
        } else {
          showNotice('❌ 올바르지 않은 세이브 파일입니다.');
        }
      } catch {
        showNotice('❌ 파일 읽기에 실패했습니다.');
      }
    };
    reader.readAsText(file);
  });
}

const btnCopyCode = document.getElementById('btn-copy-code');
const saveCodeInput = document.getElementById('save-code-input');
if (btnCopyCode && saveCodeInput) {
  btnCopyCode.addEventListener('click', () => {
    const code = game.exportSaveCode();
    saveCodeInput.value = code;
    navigator.clipboard?.writeText(code);
    audio.playCoin();
    showNotice('📋 클라우드 백업 코드가 복사되었습니다!');
  });
}

const btnLoadCode = document.getElementById('btn-load-code');
if (btnLoadCode && saveCodeInput) {
  btnLoadCode.addEventListener('click', () => {
    if (!saveCodeInput.value.trim()) {
      showNotice('⚠️ 복원할 백업 코드를 입력창에 붙여넣어 주세요.');
      return;
    }
    if (game.importSaveCode(saveCodeInput.value)) {
      audio.playPowerup();
      renderLobby();
      showNotice('🎉 백업 코드로 데이터를 완벽히 복원했습니다!');
    } else {
      audio.playHit();
      showNotice('❌ 유효하지 않은 백업 코드입니다.');
    }
  });
}

const btnResetSave = document.getElementById('btn-reset-save');
if (btnResetSave) {
  btnResetSave.addEventListener('click', () => {
    if (confirm('정말 모든 진행 데이터를 초기화하시겠습니까? (초기화 후 복구할 수 없습니다)')) {
      game.resetSaveData();
      audio.playHit();
      renderLobby();
      showNotice('🔄 데이터가 초기 상태로 리셋되었습니다.');
    }
  });
}

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

const muteBtn = document.getElementById('btn-mute');
muteBtn.addEventListener('click', () => {
  const muted = audio.toggleMute();
  muteBtn.textContent = muted ? '🔇' : '🔊';
});

// Keyboard Controls
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

// Touch / On-screen Action Buttons
const touchJumpBtn = document.getElementById('btn-touch-jump');
const touchSlideBtn = document.getElementById('btn-touch-slide');

touchJumpBtn.addEventListener('pointerdown', (ev) => {
  ev.preventDefault();
  game.jump();
});

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
