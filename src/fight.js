import { activateTab } from "./tabs.js";

export function initFight() {
  const fightButton = document.getElementById("fightBtn");
  
  fightButton.addEventListener("click", (e) => {
    e.preventDefault();
    activateTab('tab5');
  });
}
