import { initTabs } from "./tabs.js";
import { initForm } from "./form.js";
import { initFight } from "./fight.js";
import { initStats } from "./playerstats.js";
import { initAvatarChoose } from "./avatarchoose.js";
import { initSettings } from "./settings.js";
import { initBattle } from "./battle.js";

import { state, enemies } from "./state.js";

document.addEventListener('DOMContentLoaded', () => {
  initTabs();
  initForm();
  initFight();
  initStats();
  initAvatarChoose();
  initSettings();
  initBattle()

  console.log(`Max health ${state.maxHealth}`);
  console.log(`Total enemies ${enemies.length}`);
});
