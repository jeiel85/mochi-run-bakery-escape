// Core 60fps Game Engine for Mochi Run: Bakery Escape
import { CHARACTERS, PETS, STAGES, FEVER_LETTERS } from './config.js';
import { PATTERNS } from './patterns.js';

export class MochiGame {
  constructor(canvas, audio, uiCallbacks) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.audio = audio;
    this.ui = uiCallbacks;

    this.width = 960;
    this.height = 540;
    this.groundY = 450;

    this.images = {};
    this.assetsLoaded = false;

    // Persistent save state
    this.saveData = this.loadSaveData();

    // Runtime state
    this.state = 'MENU'; // MENU, PLAYING, PAUSED, GAMEOVER
    this.score = 0;
    this.runCoins = 0;
    this.combo = 0;
    this.maxCombo = 0;
    this.distance = 0;
    this.stageIndex = 0;

    // Speed & Physics
    this.baseSpeed = 390; // px/sec
    this.speed = 390;
    this.gravity = 2150;
    this.jumpForce = -710;
    this.doubleJumpForce = -650;

    // Player state
    this.player = {
      x: 175,
      y: this.groundY,
      vy: 0,
      w: 76,
      h: 76,
      grounded: true,
      jumpCount: 0,
      sliding: false,
      animTimer: 0,
      animFrame: 0,
      hp: 130,
      maxHp: 130,
      invincibleTimer: 0,
      skillTimer: 0,
      skillActiveTimer: 0,
      boostTimer: 0,
      giantTimer: 0,
      magnetTimer: 0,
      scaleX: 1,
      scaleY: 1
    };

    this.petPos = { x: 105, y: this.groundY - 95, bobAngle: 0, skillCooldown: 12 };

    // Fever M-O-C-H-I
    this.feverLetters = [false, false, false, false, false];
    this.feverTimer = 0;

    // World entities
    this.nextSpawnX = 600;
    this.patternCounter = 0;
    this.items = [];
    this.obstacles = [];
    this.platforms = [];
    this.particles = [];
    this.floatingTexts = [];
    this.bgClouds = [];
    this.bgHills = [];
    this.screenShake = 0;

    this.initBackgroundDecor();
    this.preloadAssets();

    this.lastTime = performance.now();
    requestAnimationFrame((t) => this.loop(t));
  }

  loadSaveData() {
    const defaultData = {
      highScore: 0,
      coins: 400, // Starter gift so players can immediately try upgrades or unlocks!
      selectedChar: 'mochi',
      selectedPet: 'pet_berry',
      unlockedChars: ['mochi'],
      unlockedPets: ['pet_berry'],
      upgrades: {
        hpLevel: 1,
        jellyLevel: 1,
        magnetLevel: 1
      }
    };
    try {
      const raw = localStorage.getItem('mochirun_save_v1');
      if (!raw) return defaultData;
      const parsed = JSON.parse(raw);
      return {
        ...defaultData,
        ...parsed,
        upgrades: { ...defaultData.upgrades, ...(parsed.upgrades || {}) }
      };
    } catch {
      return defaultData;
    }
  }

  save() {
    try {
      localStorage.setItem('mochirun_save_v1', JSON.stringify(this.saveData));
    } catch {
      // ignore storage quota errors
    }
  }

  preloadAssets() {
    const urls = new Set();
    CHARACTERS.forEach((c) => {
      Object.values(c.sprites).forEach((u) => urls.add(u));
    });
    PETS.forEach((p) => urls.add(p.sprite));
    [
      'assets/items/bean_normal.svg',
      'assets/items/bean_gold.svg',
      'assets/items/coin.svg',
      'assets/items/potion_hp.svg',
      'assets/items/item_boost.svg',
      'assets/items/item_giant.svg',
      'assets/items/item_magnet.svg',
      'assets/obstacles/obs_fork.svg',
      'assets/obstacles/obs_candle.svg',
      'assets/obstacles/obs_roller.svg',
      'assets/ui/logo.svg'
    ].forEach((u) => urls.add(u));

    let loaded = 0;
    const total = urls.size;
    urls.forEach((url) => {
      const img = new Image();
      img.onload = () => {
        loaded++;
        if (loaded >= total) this.assetsLoaded = true;
      };
      img.onerror = () => {
        loaded++;
        if (loaded >= total) this.assetsLoaded = true;
      };
      img.src = url;
      this.images[url] = img;
    });
  }

  initBackgroundDecor() {
    this.bgClouds = [];
    for (let i = 0; i < 7; i++) {
      this.bgClouds.push({
        x: i * 165 + Math.random() * 50,
        y: 55 + (i % 3) * 48,
        r: 28 + (i % 3) * 10,
        speedFactor: 0.14 + (i % 2) * 0.06
      });
    }
    this.bgHills = [];
    for (let i = 0; i < 6; i++) {
      this.bgHills.push({
        x: i * 240,
        w: 280,
        h: 110 + (i % 2) * 40
      });
    }
  }

  getActiveChar() {
    return CHARACTERS.find((c) => c.id === this.saveData.selectedChar) || CHARACTERS[0];
  }

  getActivePet() {
    return PETS.find((p) => p.id === this.saveData.selectedPet) || PETS[0];
  }

  startGame() {
    const char = this.getActiveChar();
    const hpBonus = (this.saveData.upgrades.hpLevel - 1) * 15;
    this.state = 'PLAYING';
    this.score = 0;
    this.runCoins = 0;
    this.combo = 0;
    this.maxCombo = 0;
    this.distance = 0;
    this.stageIndex = 0;
    this.baseSpeed = 400;
    this.speed = 400;

    this.player.y = this.groundY;
    this.player.vy = 0;
    this.player.grounded = true;
    this.player.jumpCount = 0;
    this.player.sliding = false;
    this.player.maxHp = char.baseHp + hpBonus;
    this.player.hp = this.player.maxHp;
    this.player.invincibleTimer = 0;
    this.player.skillTimer = char.skillCooldown;
    this.player.skillActiveTimer = 0;
    this.player.boostTimer = 0;
    this.player.giantTimer = 0;
    this.player.magnetTimer = 0;
    this.player.scaleX = 1;
    this.player.scaleY = 1;

    this.feverLetters = [false, false, false, false, false];
    this.feverTimer = 0;
    this.audio.setFeverMode(false);
    this.audio.startBGM();

    this.items = [];
    this.obstacles = [];
    this.platforms = [];
    this.particles = [];
    this.floatingTexts = [];
    this.nextSpawnX = 480;
    this.patternCounter = 0;

    // Initial welcome trail of jellies
    for (let i = 0; i < 7; i++) {
      this.items.push({
        type: 'bean_normal',
        x: 280 + i * 42,
        y: this.groundY - 42,
        collected: false
      });
    }

    this.spawnUntilHorizon();
    this.ui.onGameStart(char, STAGES[0]);
  }

  pauseToggle() {
    if (this.state === 'PLAYING') {
      this.state = 'PAUSED';
      this.ui.onPauseChange(true);
    } else if (this.state === 'PAUSED') {
      this.state = 'PLAYING';
      this.ui.onPauseChange(false);
    }
  }

  jump() {
    if (this.state !== 'PLAYING') return;
    if (this.player.sliding) {
      this.player.sliding = false;
    }
    if (this.player.jumpCount < 2) {
      const isDouble = this.player.jumpCount === 1;
      this.player.vy = isDouble ? this.doubleJumpForce : this.jumpForce;
      this.player.grounded = false;
      this.player.jumpCount++;
      this.player.scaleX = 0.82;
      this.player.scaleY = 1.22;
      this.audio.playJump(isDouble);
      this.spawnBurst(
        this.player.x,
        this.player.y - 10,
        isDouble ? '#ffbe0b' : '#ffffff',
        isDouble ? 12 : 7
      );
      if (isDouble) {
        this.addFloatingText('더블 점프! ✨', this.player.x, this.player.y - 75, '#ffbe0b');
      }
    }
  }

  setSlide(active) {
    if (this.state !== 'PLAYING') return;
    if (active && !this.player.sliding) {
      this.player.sliding = true;
      this.player.scaleX = 1.25;
      this.player.scaleY = 0.68;
      // Fast-drop if airborne
      if (!this.player.grounded && this.player.vy < 450) {
        this.player.vy = 580;
      }
      this.audio.playSlide();
    } else if (!active && this.player.sliding) {
      this.player.sliding = false;
      this.player.scaleX = 0.92;
      this.player.scaleY = 1.08;
    }
  }

  spawnUntilHorizon() {
    while (this.nextSpawnX < this.width + 650) {
      this.patternCounter++;

      // During Fever Mode, spawn dense golden jelly & coin carpets!
      if (this.feverTimer > 0) {
        for (let i = 0; i < 12; i++) {
          const waveY = Math.sin((this.patternCounter * 12 + i) * 0.45) * 75;
          this.items.push({
            type: i % 3 === 0 ? 'coin' : 'bean_gold',
            x: this.nextSpawnX + i * 42,
            y: this.groundY - 110 + waveY,
            collected: false
          });
        }
        this.nextSpawnX += 520;
        continue;
      }

      // Every 5th pattern, spawn a powerup or HP potion shrine
      let pattern;
      if (this.patternCounter % 5 === 0) {
        pattern = PATTERNS[5];
        const powerTypes = ['potion_hp', 'item_boost', 'item_giant', 'item_magnet', 'fever_letter'];
        const chosen = powerTypes[(this.patternCounter / 5) % powerTypes.length | 0];
        const chunk = pattern.build(this.nextSpawnX, this.groundY, chosen);
        this.appendChunk(chunk);
        this.nextSpawnX += pattern.length;
      } else {
        const idx = Math.floor(Math.random() * 5);
        pattern = PATTERNS[idx];
        const chunk = pattern.build(this.nextSpawnX, this.groundY);
        // Inject occasional Fever Letter or HP Potion
        if (Math.random() < 0.42) {
          chunk.items.push({
            type: 'fever_letter',
            x: this.nextSpawnX + pattern.length * 0.5,
            y: this.groundY - 175
          });
        } else if (this.player.hp < this.player.maxHp * 0.65 && Math.random() < 0.45) {
          chunk.items.push({
            type: 'potion_hp',
            x: this.nextSpawnX + pattern.length * 0.65,
            y: this.groundY - 125
          });
        }
        this.appendChunk(chunk);
        this.nextSpawnX += pattern.length;
      }
    }
  }

  appendChunk(chunk) {
    chunk.items.forEach((it) => {
      let letterIndex = 0;
      if (it.type === 'fever_letter') {
        const uncollected = this.feverLetters
          .map((v, i) => (v ? -1 : i))
          .filter((i) => i !== -1);
        letterIndex =
          uncollected.length > 0
            ? uncollected[Math.floor(Math.random() * uncollected.length)]
            : Math.floor(Math.random() * 5);
      }
      this.items.push({ ...it, letterIndex, collected: false });
    });
    chunk.obstacles.forEach((ob) => {
      this.obstacles.push({ ...ob, smashed: false, vx: 0, vy: 0, rot: 0 });
    });
    chunk.platforms.forEach((pl) => {
      this.platforms.push({ ...pl });
    });
  }

  triggerCharacterSkill() {
    const char = this.getActiveChar();
    this.player.skillActiveTimer = char.skillDuration;
    this.player.skillTimer = char.skillCooldown;
    this.audio.playSkill();
    this.screenShake = 8;
    this.spawnBurst(this.player.x + 20, this.player.y - 40, char.themeColor, 26);
    this.addFloatingText(`★ ${char.skillName}! ★`, this.player.x + 40, this.player.y - 115, char.themeColor, 24);

    if (char.id === 'pudding') {
      // Royal Caramel Bounce heals +14 HP immediately
      this.player.hp = Math.min(this.player.maxHp, this.player.hp + 14);
      this.addFloatingText('+14 HP 로열 카라멜!', this.player.x, this.player.y - 80, '#80ed99', 20);
    } else if (char.id === 'konpeito') {
      // Star candy shower spawns falling golden star jellies across the screen
      for (let i = 0; i < 10; i++) {
        this.items.push({
          type: 'bean_gold',
          x: this.player.x + 120 + i * 68,
          y: 90 + (i % 3) * 45,
          collected: false
        });
      }
    }
  }

  triggerFeverMode() {
    const pet = this.getActivePet();
    const extraTime = pet.id === 'pet_star' ? 2.0 : 0;
    this.feverTimer = 6.5 + extraTime;
    this.audio.setFeverMode(true);
    this.audio.playSkill();
    this.screenShake = 12;
    // Clear existing obstacles on screen and turn them into golden jellies
    this.obstacles.forEach((ob) => {
      if (!ob.smashed && ob.x > 0 && ob.x < this.width + 200) {
        this.items.push({
          type: 'bean_gold',
          x: ob.x + ob.w / 2,
          y: Math.min(this.groundY - 45, ob.y + ob.h / 2),
          collected: false
        });
        ob.smashed = true;
        ob.vx = 450;
        ob.vy = -300;
      }
    });
    this.addFloatingText('🌈 MOCHI FEVER TIME!! 🌈', this.width / 2 - 120, 145, '#ffbe0b', 28);
  }

  loop(now) {
    const dt = Math.min(0.05, (now - this.lastTime) / 1000);
    this.lastTime = now;

    if (this.state === 'PLAYING') {
      this.update(dt);
    }
    this.render();
    requestAnimationFrame((t) => this.loop(t));
  }

  update(dt) {
    const char = this.getActiveChar();
    const pet = this.getActivePet();

    // Update speed & stage progression
    this.baseSpeed = Math.min(620, 400 + this.distance * 0.015);
    const isBoosting =
      this.player.boostTimer > 0 ||
      this.feverTimer > 0 ||
      (this.player.skillActiveTimer > 0 && char.id === 'mochi');
    this.speed = isBoosting ? this.baseSpeed * 1.55 : this.baseSpeed;

    const prevStage = this.stageIndex;
    this.distance += (this.speed * dt) / 12;
    this.stageIndex = Math.floor(this.distance / 280) % STAGES.length;
    if (this.stageIndex !== prevStage) {
      this.ui.onStageChange(STAGES[this.stageIndex]);
      this.addFloatingText(`🎉 ${STAGES[this.stageIndex].name}!`, this.width / 2 - 100, 120, '#ffffff', 24);
    }

    // HP drain over time
    const drainRate = 2.65 * (1 - pet.hpDrainReduction);
    this.player.hp -= drainRate * dt;
    if (this.player.hp <= 0) {
      this.player.hp = 0;
      this.gameOver();
      return;
    }

    // Pet special periodic ability (Matcha Teapot drops mini tea heal every 12s)
    if (pet.id === 'pet_teapot') {
      this.petPos.skillCooldown -= dt;
      if (this.petPos.skillCooldown <= 0) {
        this.petPos.skillCooldown = 12;
        this.player.hp = Math.min(this.player.maxHp, this.player.hp + 8);
        this.spawnBurst(this.petPos.x, this.petPos.y, '#80ed99', 10);
        this.addFloatingText('+8 녹차 아로마 회복!', this.petPos.x, this.petPos.y - 25, '#80ed99', 16);
      }
    }

    // Character automatic skill cooldown
    if (this.player.skillActiveTimer > 0) {
      this.player.skillActiveTimer -= dt;
      // Mochi skill turns nearby obstacles into golden jellies
      if (char.id === 'mochi') {
        this.obstacles.forEach((ob) => {
          if (!ob.smashed && ob.x < this.player.x + 260 && ob.x > this.player.x - 40) {
            ob.smashed = true;
            ob.vx = 520;
            ob.vy = -340;
            this.items.push({
              type: 'bean_gold',
              x: ob.x + ob.w / 2,
              y: this.groundY - 50,
              collected: false
            });
            this.spawnBurst(ob.x, ob.y + ob.h / 2, '#ff5d8f', 10);
          }
        });
      }
    } else {
      this.player.skillTimer -= dt;
      if (this.player.skillTimer <= 0) {
        this.triggerCharacterSkill();
      }
    }

    // Timers
    if (this.player.invincibleTimer > 0) this.player.invincibleTimer -= dt;
    if (this.player.boostTimer > 0) this.player.boostTimer -= dt;
    if (this.player.giantTimer > 0) this.player.giantTimer -= dt;
    if (this.player.magnetTimer > 0) this.player.magnetTimer -= dt;
    if (this.feverTimer > 0) {
      this.feverTimer -= dt;
      if (this.feverTimer <= 0) {
        this.feverTimer = 0;
        this.feverLetters = [false, false, false, false, false];
        this.audio.setFeverMode(false);
        this.player.invincibleTimer = 1.5;
      }
    }

    // Player physics & platform collisions
    const prevY = this.player.y;
    this.player.vy += this.gravity * dt;
    this.player.y += this.player.vy * dt;

    let landedPlatform = false;
    if (this.player.vy >= 0 && !this.player.sliding) {
      for (const pl of this.platforms) {
        if (
          this.player.x + 22 > pl.x &&
          this.player.x - 22 < pl.x + pl.w &&
          prevY <= pl.y + 8 &&
          this.player.y >= pl.y
        ) {
          this.player.y = pl.y;
          this.player.vy = 0;
          this.player.grounded = true;
          this.player.jumpCount = 0;
          landedPlatform = true;
          break;
        }
      }
    }

    if (!landedPlatform) {
      if (this.player.y >= this.groundY) {
        if (!this.player.grounded) {
          this.player.scaleX = 1.18;
          this.player.scaleY = 0.84;
        }
        this.player.y = this.groundY;
        this.player.vy = 0;
        this.player.grounded = true;
        this.player.jumpCount = 0;
      } else {
        this.player.grounded = false;
      }
    }

    // Springy squash & stretch recovery
    this.player.scaleX += (1 - this.player.scaleX) * 12 * dt;
    this.player.scaleY += (1 - this.player.scaleY) * 12 * dt;

    // Running frame animation
    this.player.animTimer += dt * (this.speed / 380);
    if (this.player.animTimer >= 0.12) {
      this.player.animTimer = 0;
      this.player.animFrame = (this.player.animFrame + 1) % 2;
    }

    // Companion Pet smooth follow
    this.petPos.bobAngle += dt * 5.5;
    const targetPetX = this.player.x - 72;
    const targetPetY = this.player.y - (this.player.sliding ? 48 : 88) + Math.sin(this.petPos.bobAngle) * 10;
    this.petPos.x += (targetPetX - this.petPos.x) * 10 * dt;
    this.petPos.y += (targetPetY - this.petPos.y) * 10 * dt;

    // Scroll world
    const dx = this.speed * dt;
    this.nextSpawnX -= dx;
    this.spawnUntilHorizon();

    // Scroll background clouds & hills
    this.bgClouds.forEach((c) => {
      c.x -= dx * c.speedFactor;
      if (c.x < -120) c.x = this.width + 100;
    });
    this.bgHills.forEach((h) => {
      h.x -= dx * 0.32;
      if (h.x + h.w < -40) h.x += this.bgHills.length * 240;
    });

    // Update platforms
    for (let i = this.platforms.length - 1; i >= 0; i--) {
      this.platforms[i].x -= dx;
      if (this.platforms[i].x + this.platforms[i].w < -100) {
        this.platforms.splice(i, 1);
      }
    }

    // Magnet radius calculation
    const magnetUpgradeRadius = (this.saveData.upgrades.magnetLevel - 1) * 35;
    const activeMagnetRadius =
      (this.player.magnetTimer > 0 || (this.player.skillActiveTimer > 0 && char.id === 'pudding') ? 320 : 80) +
      pet.magnetRadiusBonus +
      magnetUpgradeRadius;

    // Update and collect items
    const isGiant = this.player.giantTimer > 0;
    const playerCenterY = this.player.y - (this.player.sliding ? 24 : isGiant ? 68 : 42);

    for (let i = this.items.length - 1; i >= 0; i--) {
      const it = this.items[i];
      it.x -= dx;

      // Magnetic pull toward pet/player
      const distToPlayer = Math.hypot(it.x - this.player.x, it.y - playerCenterY);
      if (distToPlayer < activeMagnetRadius) {
        const pullSpeed = this.player.magnetTimer > 0 ? 15 : 8.5;
        it.x += (this.player.x - it.x) * pullSpeed * dt;
        it.y += (playerCenterY - it.y) * pullSpeed * dt;
      }

      const pickupRadius = isGiant ? 78 : 48;
      if (Math.hypot(it.x - this.player.x, it.y - playerCenterY) < pickupRadius) {
        this.collectItem(it);
        this.items.splice(i, 1);
        continue;
      }

      if (it.x < -80) {
        this.items.splice(i, 1);
      }
    }

    // Update and check obstacles
    const pBox = this.getPlayerHitbox();
    for (let i = this.obstacles.length - 1; i >= 0; i--) {
      const ob = this.obstacles[i];
      if (ob.smashed) {
        ob.x += ob.vx * dt;
        ob.y += ob.vy * dt;
        ob.vy += 1200 * dt;
        ob.rot += 9 * dt;
        if (ob.y > this.height + 150 || ob.x > this.width + 200) {
          this.obstacles.splice(i, 1);
        }
        continue;
      }

      ob.x -= dx;

      // Check AABB collision with generous forgiveness margin
      const oBox = {
        x: ob.x + 10,
        y: ob.y + 8,
        w: ob.w - 20,
        h: ob.h - 16
      };

      if (
        pBox.x < oBox.x + oBox.w &&
        pBox.x + pBox.w > oBox.x &&
        pBox.y < oBox.y + oBox.h &&
        pBox.y + pBox.h > oBox.y
      ) {
        const canSmash =
          isGiant ||
          isBoosting ||
          (this.player.skillActiveTimer > 0 && (char.id === 'taiyaki' || char.id === 'mochi'));

        if (canSmash) {
          ob.smashed = true;
          ob.vx = 580;
          ob.vy = -420;
          const smashBonus = char.id === 'taiyaki' ? 2500 : 1200;
          this.score += smashBonus;
          this.screenShake = 7;
          this.audio.playSmash();
          this.spawnBurst(ob.x + ob.w / 2, ob.y + ob.h / 2, '#ffbe0b', 16);
          this.addFloatingText(`💥 파괴 보너스 +${smashBonus}!`, ob.x, ob.y, '#ffbe0b', 20);
        } else if (this.player.invincibleTimer <= 0) {
          this.handleObstacleHit(ob);
        }
      }

      if (ob.x + ob.w < -120) {
        this.obstacles.splice(i, 1);
      }
    }

    // Update particles & floating texts
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.x += p.vx * dt;
      p.y += p.vy * dt;
      p.life -= dt;
      if (p.life <= 0) this.particles.splice(i, 1);
    }

    for (let i = this.floatingTexts.length - 1; i >= 0; i--) {
      const ft = this.floatingTexts[i];
      ft.y -= 42 * dt;
      ft.life -= dt;
      if (ft.life <= 0) this.floatingTexts.splice(i, 1);
    }

    if (this.screenShake > 0) {
      this.screenShake = Math.max(0, this.screenShake - 28 * dt);
    }

    // Sync HUD
    this.ui.onHudUpdate({
      score: Math.floor(this.score),
      coins: this.runCoins,
      hp: this.player.hp,
      maxHp: this.player.maxHp,
      combo: this.combo,
      feverLetters: this.feverLetters,
      feverTimer: this.feverTimer,
      skillTimer: this.player.skillTimer,
      skillCooldown: char.skillCooldown,
      skillActiveTimer: this.player.skillActiveTimer
    });
  }

  getPlayerHitbox() {
    const isGiant = this.player.giantTimer > 0;
    const scale = isGiant ? 1.55 : 1.0;
    const w = 44 * scale;
    const h = (this.player.sliding ? 34 : 64) * scale;
    return {
      x: this.player.x - w / 2,
      y: this.player.y - h,
      w,
      h
    };
  }

  collectItem(it) {
    const char = this.getActiveChar();
    const pet = this.getActivePet();
    const jellyUpgradeBonus = (this.saveData.upgrades.jellyLevel - 1) * 110;
    const konpeitoMult = this.player.skillActiveTimer > 0 && char.id === 'konpeito' ? 2.2 : 1.0;
    const feverMult = this.feverTimer > 0 ? 2.0 : 1.0;

    if (it.type === 'bean_normal' || it.type === 'bean_gold') {
      this.combo++;
      if (this.combo > this.maxCombo) this.maxCombo = this.combo;
      const base = it.type === 'bean_gold' ? 750 : 280;
      const comboMult = 1 + Math.min(this.combo * 0.015, 1.5);
      const pts = Math.round(
        (base + jellyUpgradeBonus) * pet.jellyScoreMult * konpeitoMult * feverMult * comboMult
      );
      this.score += pts;
      this.audio.playJelly(this.combo, it.type === 'bean_gold');
      this.spawnBurst(it.x, it.y, it.type === 'bean_gold' ? '#ffd166' : '#ff758f', 6);
    } else if (it.type === 'coin') {
      const gained = Math.round(5 * pet.coinBonusMult * (this.feverTimer > 0 ? 2 : 1));
      this.runCoins += gained;
      this.score += 450;
      this.audio.playCoin();
      this.spawnBurst(it.x, it.y, '#ffd166', 8);
    } else if (it.type === 'potion_hp') {
      this.player.hp = Math.min(this.player.maxHp, this.player.hp + 28);
      this.audio.playPowerup();
      this.spawnBurst(it.x, it.y, '#ff4d6d', 15);
      this.addFloatingText('🍓 딸기우유 +28 HP!', this.player.x, this.player.y - 85, '#ff758f', 20);
    } else if (it.type === 'item_boost') {
      this.player.boostTimer = 4.2;
      this.audio.playPowerup();
      this.spawnBurst(it.x, it.y, '#00f5d4', 18);
      this.addFloatingText('🚀 슈가러시 광속 질주!', this.player.x, this.player.y - 85, '#00f5d4', 21);
    } else if (it.type === 'item_giant') {
      this.player.giantTimer = 5.0;
      this.audio.playPowerup();
      this.spawnBurst(it.x, it.y, '#ff9f1c', 18);
      this.addFloatingText('👑 왕방울 거대화 변신!', this.player.x, this.player.y - 95, '#ff9f1c', 21);
    } else if (it.type === 'item_magnet') {
      this.player.magnetTimer = 5.5;
      this.audio.playPowerup();
      this.spawnBurst(it.x, it.y, '#c77dff', 16);
      this.addFloatingText('🧲 츄러스 자석 발동!', this.player.x, this.player.y - 85, '#c77dff', 20);
    } else if (it.type === 'fever_letter') {
      const idx = it.letterIndex ?? 0;
      this.feverLetters[idx] = true;
      this.score += 1500;
      this.audio.playPowerup();
      this.spawnBurst(it.x, it.y, '#ffbe0b', 14);
      this.addFloatingText(`★ ${FEVER_LETTERS[idx]} 획득! ★`, it.x, it.y - 25, '#ffbe0b', 20);
      if (this.feverLetters.every(Boolean)) {
        this.triggerFeverMode();
      }
    }
  }

  handleObstacleHit(ob) {
    const pet = this.getActivePet();
    const dmg = pet.id === 'pet_butter' ? 16 : 22;
    this.player.hp = Math.max(0, this.player.hp - dmg);
    this.player.invincibleTimer = 1.65;
    this.combo = 0;
    this.screenShake = 11;
    this.audio.playHit();
    this.spawnBurst(this.player.x, this.player.y - 40, '#ff4d6d', 16);
    this.addFloatingText(`아야! -${dmg} HP`, this.player.x, this.player.y - 90, '#ff4d6d', 20);
    ob.smashed = true;
    ob.vx = 320;
    ob.vy = -250;
  }

  gameOver() {
    this.state = 'GAMEOVER';
    this.audio.stopBGM();
    this.audio.playGameOver();
    const finalScore = Math.floor(this.score);
    const isNewRecord = finalScore > this.saveData.highScore;
    if (isNewRecord) {
      this.saveData.highScore = finalScore;
    }
    this.saveData.coins += this.runCoins;
    this.save();
    this.ui.onGameOver({
      score: finalScore,
      highScore: this.saveData.highScore,
      isNewRecord,
      coinsEarned: this.runCoins,
      totalCoins: this.saveData.coins,
      maxCombo: this.maxCombo,
      distance: Math.floor(this.distance)
    });
  }

  spawnBurst(x, y, color, count = 10) {
    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 * i) / count + Math.random() * 0.5;
      const spd = 80 + Math.random() * 190;
      this.particles.push({
        x,
        y,
        vx: Math.cos(angle) * spd,
        vy: Math.sin(angle) * spd - 40,
        r: 4 + Math.random() * 4,
        color,
        life: 0.35 + Math.random() * 0.25
      });
    }
  }

  addFloatingText(text, x, y, color = '#ffffff', size = 18) {
    this.floatingTexts.push({
      text,
      x,
      y,
      color,
      size,
      life: 0.85
    });
  }

  render() {
    const ctx = this.ctx;
    const stage = STAGES[this.stageIndex] || STAGES[0];
    ctx.save();

    if (this.screenShake > 0) {
      const sx = (Math.random() - 0.5) * this.screenShake;
      const sy = (Math.random() - 0.5) * this.screenShake;
      ctx.translate(sx, sy);
    }

    // 1. Sky gradient (Rainbow pulse during Fever Time!)
    const skyGrad = ctx.createLinearGradient(0, 0, 0, this.groundY);
    if (this.feverTimer > 0) {
      skyGrad.addColorStop(0, '#3a0ca3');
      skyGrad.addColorStop(0.5, '#f72585');
      skyGrad.addColorStop(1, '#ffbe0b');
    } else {
      skyGrad.addColorStop(0, stage.skyTop);
      skyGrad.addColorStop(1, stage.skyBottom);
    }
    ctx.fillStyle = skyGrad;
    ctx.fillRect(0, 0, this.width, this.height);

    // 2. Fluffy cream clouds
    ctx.fillStyle = 'rgba(255, 255, 255, 0.25)';
    this.bgClouds.forEach((c) => {
      ctx.beginPath();
      ctx.arc(c.x, c.y, c.r, 0, Math.PI * 2);
      ctx.arc(c.x + c.r * 0.75, c.y + 4, c.r * 0.8, 0, Math.PI * 2);
      ctx.arc(c.x - c.r * 0.7, c.y + 6, c.r * 0.75, 0, Math.PI * 2);
      ctx.fill();
    });

    // 3. Bakery hills parallax
    this.bgHills.forEach((h, idx) => {
      ctx.fillStyle = idx % 2 === 0 ? stage.hillBack : stage.hillFront;
      ctx.beginPath();
      ctx.arc(h.x + h.w / 2, this.groundY, h.w / 2, Math.PI, 0);
      ctx.fill();
    });

    // 4. Wafer platforms
    this.platforms.forEach((pl) => {
      ctx.fillStyle = '#f4a261';
      ctx.strokeStyle = '#6c3428';
      ctx.lineWidth = 3;
      this.roundRect(ctx, pl.x, pl.y, pl.w, pl.h, 10, true, true);
      // Frosting stripe on top
      ctx.fillStyle = stage.floorTop;
      this.roundRect(ctx, pl.x + 4, pl.y + 2, pl.w - 8, 8, 4, true, false);
    });

    // 5. Bakery Biscuit Floor with Icing
    ctx.fillStyle = stage.floorMain;
    ctx.fillRect(0, this.groundY, this.width, this.height - this.groundY);
    ctx.fillStyle = stage.floorTop;
    ctx.fillRect(0, this.groundY, this.width, 18);

    // Scrolling icing drips
    const scrollOffset = (this.distance * 12) % 60;
    ctx.fillStyle = stage.floorAccent;
    for (let x = -scrollOffset; x < this.width + 60; x += 60) {
      ctx.beginPath();
      ctx.arc(x, this.groundY + 18, 12, 0, Math.PI);
      ctx.fill();
    }

    // 6. Items (Jellies, Coins, Potions, Powerups, Fever Letters)
    this.items.forEach((it) => {
      if (it.type === 'fever_letter') {
        const letter = FEVER_LETTERS[it.letterIndex ?? 0];
        ctx.save();
        ctx.translate(it.x, it.y);
        ctx.fillStyle = '#ffbe0b';
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(0, 0, 20, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        ctx.fillStyle = '#3a0ca3';
        ctx.font = '900 20px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(letter, 0, 1);
        ctx.restore();
        return;
      }

      const spriteMap = {
        bean_normal: 'assets/items/bean_normal.svg',
        bean_gold: 'assets/items/bean_gold.svg',
        coin: 'assets/items/coin.svg',
        potion_hp: 'assets/items/potion_hp.svg',
        item_boost: 'assets/items/item_boost.svg',
        item_giant: 'assets/items/item_giant.svg',
        item_magnet: 'assets/items/item_magnet.svg'
      };
      const img = this.images[spriteMap[it.type]];
      const size = it.type.startsWith('bean') || it.type === 'coin' ? 38 : 54;
      if (img && img.complete && img.naturalWidth > 0) {
        ctx.drawImage(img, it.x - size / 2, it.y - size / 2, size, size);
      } else {
        ctx.fillStyle = it.type === 'bean_gold' ? '#ffd166' : '#ff758f';
        ctx.beginPath();
        ctx.arc(it.x, it.y, size / 3, 0, Math.PI * 2);
        ctx.fill();
      }
    });

    // 7. Obstacles
    this.obstacles.forEach((ob) => {
      const obsMap = {
        fork: 'assets/obstacles/obs_fork.svg',
        candle: 'assets/obstacles/obs_candle.svg',
        roller: 'assets/obstacles/obs_roller.svg'
      };
      const img = this.images[obsMap[ob.type]];
      ctx.save();
      ctx.translate(ob.x + ob.w / 2, ob.y + ob.h / 2);
      if (ob.rot) ctx.rotate(ob.rot);
      if (img && img.complete && img.naturalWidth > 0) {
        ctx.drawImage(img, -ob.w / 2 - 8, -ob.h / 2 - 6, ob.w + 16, ob.h + 12);
      } else {
        ctx.fillStyle = '#e63946';
        ctx.fillRect(-ob.w / 2, -ob.h / 2, ob.w, ob.h);
      }
      ctx.restore();
    });

    // 8. Companion Pet
    const pet = this.getActivePet();
    const petImg = this.images[pet.sprite];
    if (petImg && petImg.complete && petImg.naturalWidth > 0) {
      ctx.drawImage(petImg, this.petPos.x - 28, this.petPos.y - 28, 56, 56);
    }

    // 9. Player Character
    const char = this.getActiveChar();
    let spriteKey = this.player.animFrame === 0 ? 'run1' : 'run2';
    if (!this.player.grounded) spriteKey = 'jump';
    if (this.player.sliding) spriteKey = 'slide';
    const charImg = this.images[char.sprites[spriteKey]];

    const isGiant = this.player.giantTimer > 0;
    const giantMult = isGiant ? 1.6 : 1.0;

    ctx.save();
    ctx.translate(this.player.x, this.player.y);

    // Aura if skill or boost or giant is active
    if (this.player.skillActiveTimer > 0 || this.player.boostTimer > 0 || this.feverTimer > 0) {
      ctx.save();
      ctx.fillStyle = char.themeColor;
      ctx.globalAlpha = 0.32;
      ctx.beginPath();
      ctx.arc(0, -45 * giantMult, 58 * giantMult, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

    if (this.player.invincibleTimer > 0 && Math.floor(this.player.invincibleTimer * 15) % 2 === 0) {
      ctx.globalAlpha = 0.5;
    }

    ctx.scale(this.player.scaleX * giantMult, this.player.scaleY * giantMult);
    if (charImg && charImg.complete && charImg.naturalWidth > 0) {
      ctx.drawImage(charImg, -48, -92, 96, 96);
    } else {
      ctx.fillStyle = char.themeColor;
      ctx.beginPath();
      ctx.arc(0, -40, 36, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();

    // 10. Particles & Floating Score/Skill Texts
    this.particles.forEach((p) => {
      ctx.fillStyle = p.color;
      ctx.globalAlpha = Math.max(0, p.life * 2);
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
    });
    ctx.globalAlpha = 1;

    this.floatingTexts.forEach((ft) => {
      ctx.save();
      ctx.font = `900 ${ft.size}px 'Pretendard', sans-serif`;
      ctx.fillStyle = ft.color;
      ctx.strokeStyle = '#2b132c';
      ctx.lineWidth = 4;
      ctx.globalAlpha = Math.min(1, ft.life * 1.6);
      ctx.strokeText(ft.text, ft.x, ft.y);
      ctx.fillText(ft.text, ft.x, ft.y);
      ctx.restore();
    });

    ctx.restore();
  }

  roundRect(ctx, x, y, w, h, r, fill, stroke) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
    if (fill) ctx.fill();
    if (stroke) ctx.stroke();
  }
}
