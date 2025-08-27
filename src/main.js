import { initTabs } from "./tabs.js";
import { initForm } from "./form.js";
import { initFight } from "./fight.js";
import { initStats } from "./playerstats.js";
import { initAvatarChoose } from "./avatarchoose.js";
import { initSettings } from "./settings.js";

document.addEventListener('DOMContentLoaded', () => {
  initTabs();
  initForm();
  initFight();
  initStats();
  initAvatarChoose();
  initSettings();
});
