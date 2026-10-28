// Hand-designed + procedural rhythmic level chunks for Mochi Run: Bakery Escape
// Ensures smooth arcs over obstacles, sliding tunnels, double-jump rewards, and Fever bonus carpets.

export const PATTERNS = [
  // 0: Gentle introduction arc over a single fork
  {
    name: 'fork_arc',
    length: 620,
    build(startX, groundY) {
      const items = [];
      const obstacles = [];
      const platforms = [];
      obstacles.push({ type: 'fork', x: startX + 260, y: groundY - 82, w: 54, h: 82 });
      // Parabolic arc of jellies over the fork
      for (let i = 0; i < 9; i++) {
        const t = (i - 4) / 4; // -1 to 1
        const arcH = Math.max(0, (1 - t * t) * 125);
        items.push({
          type: i === 4 ? 'bean_gold' : 'bean_normal',
          x: startX + 90 + i * 42,
          y: groundY - 42 - arcH
        });
      }
      return { items, obstacles, platforms };
    }
  },
  // 1: Sliding bakery rolling-pin tunnel with low coins & jellies
  {
    name: 'slide_tunnel',
    length: 720,
    build(startX, groundY) {
      const items = [];
      const obstacles = [];
      const platforms = [];
      obstacles.push({ type: 'roller', x: startX + 210, y: groundY - 210, w: 92, h: 142 });
      obstacles.push({ type: 'roller', x: startX + 350, y: groundY - 210, w: 92, h: 142 });
      for (let i = 0; i < 11; i++) {
        items.push({
          type: i % 3 === 0 ? 'coin' : 'bean_normal',
          x: startX + 110 + i * 38,
          y: groundY - 30
        });
      }
      return { items, obstacles, platforms };
    }
  },
  // 2: Double jump over tall birthday candle flame with high reward
  {
    name: 'double_jump_candle',
    length: 680,
    build(startX, groundY) {
      const items = [];
      const obstacles = [];
      const platforms = [];
      obstacles.push({ type: 'candle', x: startX + 310, y: groundY - 134, w: 56, h: 134 });
      for (let i = 0; i < 11; i++) {
        const t = (i - 5) / 5;
        const arcH = Math.max(0, (1 - t * t) * 205);
        items.push({
          type: Math.abs(i - 5) <= 1 ? 'bean_gold' : 'bean_normal',
          x: startX + 100 + i * 42,
          y: groundY - 44 - arcH
        });
      }
      return { items, obstacles, platforms };
    }
  },
  // 3: Wafer platform choice (Upper safe wafer trail vs lower risky coin trail)
  {
    name: 'wafer_bridge',
    length: 840,
    build(startX, groundY) {
      const items = [];
      const obstacles = [];
      const platforms = [
        { x: startX + 140, y: groundY - 125, w: 230, h: 24 },
        { x: startX + 430, y: groundY - 185, w: 250, h: 24 }
      ];
      // Upper trail
      for (let i = 0; i < 5; i++) {
        items.push({
          type: 'bean_gold',
          x: startX + 165 + i * 44,
          y: groundY - 165
        });
      }
      for (let i = 0; i < 5; i++) {
        items.push({
          type: i === 2 ? 'fever_letter' : 'bean_gold',
          x: startX + 455 + i * 44,
          y: groundY - 228
        });
      }
      // Lower trail with forks and coins
      obstacles.push({ type: 'fork', x: startX + 260, y: groundY - 82, w: 54, h: 82 });
      obstacles.push({ type: 'fork', x: startX + 540, y: groundY - 82, w: 54, h: 82 });
      for (let i = 0; i < 8; i++) {
        if (i !== 2 && i !== 6) {
          items.push({
            type: 'coin',
            x: startX + 150 + i * 65,
            y: groundY - 40
          });
        }
      }
      return { items, obstacles, platforms };
    }
  },
  // 4: Jump-then-Slide combo rhythm challenge
  {
    name: 'jump_slide_combo',
    length: 820,
    build(startX, groundY) {
      const items = [];
      const obstacles = [];
      const platforms = [];
      obstacles.push({ type: 'fork', x: startX + 210, y: groundY - 82, w: 54, h: 82 });
      obstacles.push({ type: 'roller', x: startX + 490, y: groundY - 210, w: 96, h: 142 });

      // Arc over fork
      for (let i = 0; i < 7; i++) {
        const t = (i - 3) / 3;
        const arcH = Math.max(0, (1 - t * t) * 120);
        items.push({
          type: i === 3 ? 'bean_gold' : 'bean_normal',
          x: startX + 90 + i * 40,
          y: groundY - 42 - arcH
        });
      }
      // Low line under roller
      for (let i = 0; i < 6; i++) {
        items.push({
          type: i === 3 ? 'bean_gold' : 'bean_normal',
          x: startX + 410 + i * 40,
          y: groundY - 30
        });
      }
      return { items, obstacles, platforms };
    }
  },
  // 5: Powerup Shrine (Spawns a random booster/giant/magnet/potion with celebratory arc)
  {
    name: 'powerup_shrine',
    length: 660,
    build(startX, groundY, powerupType = 'item_magnet') {
      const items = [];
      const obstacles = [];
      const platforms = [
        { x: startX + 180, y: groundY - 115, w: 260, h: 24 }
      ];
      for (let i = 0; i < 6; i++) {
        items.push({
          type: 'coin',
          x: startX + 205 + i * 42,
          y: groundY - 155
        });
      }
      items.push({
        type: powerupType,
        x: startX + 310,
        y: groundY - 215
      });
      return { items, obstacles, platforms };
    }
  }
];
