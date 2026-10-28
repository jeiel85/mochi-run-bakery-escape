// Expanded Rhythmic Level Chunks for Commercial Release of Mochi Run: Bakery Escape
// Supports 5 obstacle types (fork, candle, roller, piping, teapot_lava), rainbow jellies, and multi-tier platforms.

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
      for (let i = 0; i < 9; i++) {
        const t = (i - 4) / 4;
        const arcH = Math.max(0, (1 - t * t) * 125);
        items.push({
          type: i === 4 ? 'bean_rainbow' : i % 2 === 0 ? 'bean_gold' : 'bean_normal',
          x: startX + 90 + i * 42,
          y: groundY - 42 - arcH
        });
      }
      return { items, obstacles, platforms };
    }
  },
  // 1: Sliding bakery rolling-pin & piping-bag tunnel with low coins & jellies
  {
    name: 'slide_tunnel',
    length: 740,
    build(startX, groundY) {
      const items = [];
      const obstacles = [];
      const platforms = [];
      obstacles.push({ type: 'roller', x: startX + 200, y: groundY - 210, w: 92, h: 142 });
      obstacles.push({ type: 'piping', x: startX + 360, y: groundY - 210, w: 92, h: 142 });
      for (let i = 0; i < 12; i++) {
        items.push({
          type: i === 6 ? 'bean_rainbow' : i % 3 === 0 ? 'coin' : 'bean_normal',
          x: startX + 105 + i * 38,
          y: groundY - 30
        });
      }
      return { items, obstacles, platforms };
    }
  },
  // 2: Double jump over tall birthday candle flame or boiling syrup kettle
  {
    name: 'double_jump_candle',
    length: 700,
    build(startX, groundY) {
      const items = [];
      const obstacles = [];
      const platforms = [];
      const obsType = Math.random() < 0.5 ? 'candle' : 'teapot_lava';
      obstacles.push({
        type: obsType,
        x: startX + 310,
        y: groundY - (obsType === 'candle' ? 134 : 112),
        w: obsType === 'candle' ? 56 : 68,
        h: obsType === 'candle' ? 134 : 112
      });
      for (let i = 0; i < 11; i++) {
        const t = (i - 5) / 5;
        const arcH = Math.max(0, (1 - t * t) * 208);
        items.push({
          type: i === 5 ? 'bean_rainbow' : Math.abs(i - 5) <= 2 ? 'bean_gold' : 'bean_normal',
          x: startX + 100 + i * 42,
          y: groundY - 44 - arcH
        });
      }
      return { items, obstacles, platforms };
    }
  },
  // 3: Wafer platform choice (Upper rainbow trail vs lower risky coin trail)
  {
    name: 'wafer_bridge',
    length: 860,
    build(startX, groundY) {
      const items = [];
      const obstacles = [];
      const platforms = [
        { x: startX + 140, y: groundY - 125, w: 230, h: 24 },
        { x: startX + 430, y: groundY - 190, w: 260, h: 24 }
      ];
      for (let i = 0; i < 5; i++) {
        items.push({
          type: i === 2 ? 'bean_rainbow' : 'bean_gold',
          x: startX + 165 + i * 44,
          y: groundY - 165
        });
      }
      for (let i = 0; i < 5; i++) {
        items.push({
          type: i === 2 ? 'fever_letter' : 'bean_rainbow',
          x: startX + 460 + i * 44,
          y: groundY - 232
        });
      }
      obstacles.push({ type: 'fork', x: startX + 260, y: groundY - 82, w: 54, h: 82 });
      obstacles.push({ type: 'teapot_lava', x: startX + 540, y: groundY - 112, w: 68, h: 112 });
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
    length: 840,
    build(startX, groundY) {
      const items = [];
      const obstacles = [];
      const platforms = [];
      obstacles.push({ type: 'fork', x: startX + 210, y: groundY - 82, w: 54, h: 82 });
      obstacles.push({ type: 'piping', x: startX + 490, y: groundY - 210, w: 96, h: 142 });

      for (let i = 0; i < 7; i++) {
        const t = (i - 3) / 3;
        const arcH = Math.max(0, (1 - t * t) * 120);
        items.push({
          type: i === 3 ? 'bean_rainbow' : 'bean_normal',
          x: startX + 90 + i * 40,
          y: groundY - 42 - arcH
        });
      }
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
  // 5: Powerup Shrine (Spawns diverse boosters, shield, coin blast, wing jelly, mystery box, mega parfait)
  {
    name: 'powerup_shrine',
    length: 680,
    build(startX, groundY, powerupType = 'item_magnet') {
      const items = [];
      const obstacles = [];
      const platforms = [{ x: startX + 180, y: groundY - 115, w: 260, h: 24 }];
      for (let i = 0; i < 6; i++) {
        items.push({
          type: i % 2 === 0 ? 'coin' : 'bean_gold',
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
  },
  // 6: Triple Staircase Paradise (High-skill multi-platform climb with Mystery Box or Mega Parfait reward)
  {
    name: 'triple_staircase',
    length: 960,
    build(startX, groundY) {
      const items = [];
      const obstacles = [];
      const platforms = [
        { x: startX + 120, y: groundY - 105, w: 180, h: 22 },
        { x: startX + 350, y: groundY - 185, w: 190, h: 22 },
        { x: startX + 590, y: groundY - 255, w: 210, h: 22 }
      ];
      platforms.forEach((pl, idx) => {
        for (let i = 0; i < 4; i++) {
          items.push({
            type: idx === 2 ? 'bean_rainbow' : 'bean_gold',
            x: pl.x + 28 + i * 40,
            y: pl.y - 38
          });
        }
      });
      items.push({
        type: Math.random() < 0.5 ? 'mystery_box' : 'item_wing_jelly',
        x: startX + 695,
        y: groundY - 315
      });
      obstacles.push({ type: 'teapot_lava', x: startX + 410, y: groundY - 112, w: 68, h: 112 });
      obstacles.push({ type: 'candle', x: startX + 660, y: groundY - 134, w: 56, h: 134 });
      return { items, obstacles, platforms };
    }
  }
];
