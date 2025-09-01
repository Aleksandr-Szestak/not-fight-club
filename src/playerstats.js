export let totalWins = 0;
export let totalLoses = 0;
export let numberAvatar = 0;

export function initStats() {
  const savedName = localStorage.getItem('username');
  const savedTotalWins = localStorage.getItem('storageTotalWins');
  const savedTotalLoses = localStorage.getItem('storageTotalLoses');
  const savedNumberAvatar = localStorage.getItem('storageNumberAvatar');

  if (savedTotalWins === null || savedTotalLoses === null || savedNumberAvatar === null) {
    localStorage.setItem('storageTotalWins', totalWins);
    localStorage.setItem('storageTotalLoses', totalLoses);
    localStorage.setItem('storageNumberAvatar', numberAvatar);
  } else {
    totalWins = parseInt(savedTotalWins, 10);
    totalLoses = parseInt(savedTotalLoses, 10);
    numberAvatar = parseInt(savedNumberAvatar, 10);
  }

  const img_avatar = document.querySelector('.character-scores img');
  img_avatar.src = numberAvatar === 0 
    ? `./assets/image/no-avatar.png`
    : `./assets/image/good${numberAvatar}.png`;

  document.getElementById('name-player').textContent = `${savedName || ""}`;
  document.getElementById('wins').textContent = `Wins: ${totalWins}`;
  document.getElementById('loses').textContent = `Loses: ${totalLoses}`;
}

// 👉 Функции для работы с победами/поражениями
export function incWins() {
  totalWins++;
  localStorage.setItem('storageTotalWins', totalWins);
  document.getElementById('wins').textContent = `Wins: ${totalWins}`;
}

export function incLoses() {
  totalLoses++;
  localStorage.setItem('storageTotalLoses', totalLoses);
  document.getElementById('loses').textContent = `Loses: ${totalLoses}`;
}
