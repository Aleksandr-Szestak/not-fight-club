const tabButtons = document.querySelectorAll(".tab-btn");
const tabContents = document.querySelectorAll(".tab-content");
const tabSelect = document.querySelector(".tab-select");


// Клики мышкой по кнопкам табов
tabButtons.forEach(button => {
  button.addEventListener("click", () => {
    activateTab(button.dataset.tab); // tab1...tab5 из атриб. data-tab
  });
});


// Выбор из select
tabSelect.addEventListener("change", () => {
  activateTab(tabSelect.value);  // tab1...tab5 из атриб. value
});


// Убираем или добавляем класс active
function activateTab(tabId) {

  tabButtons.forEach(btn => {
    btn.classList.toggle("active", btn.dataset.tab === tabId);
  });

  tabContents.forEach(content => {
    content.classList.toggle("active", content.id === tabId);
  });

  tabSelect.value = tabId;
}



// ---------------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
  
  const form = document.getElementById('nameForm');
  const input = document.getElementById('username');
  const button = document.getElementById('saveBtn');
  const greeting = document.getElementById('greeting');

  // Проверка localStorage при загрузке страницы
  const savedName = localStorage.getItem('username');
  if (savedName) {
    greeting.textContent = `Hello, ${savedName}!`;
    input.value = savedName;
    button.disabled = true; // деактивация кнопки
  }

  // Сохр. имени по нажатию кнопки
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = input.value.trim();
    if (name) {
      localStorage.setItem('username', name);
      greeting.textContent = `Hello, ${name}!`;
      button.disabled = true;
    } else {
      alert('Input Character Name');
    }
  });
});