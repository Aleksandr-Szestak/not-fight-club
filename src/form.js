export function initForm() {

  const form = document.getElementById('nameForm');
  const input = document.getElementById('username');
  const button = document.getElementById('saveBtn');
  const greeting = document.getElementById('greeting');
  const tabButtons = document.querySelectorAll(".tab-btn");

  
  // Проверка localStorage при загрузке страницы
  const savedName = localStorage.getItem('username');
  if (savedName) {
    greeting.textContent = `Hello, ${savedName}!`;
    input.value = savedName;
    button.disabled = true; // деактивация кнопки
    tabButtons.forEach(button => button.disabled = false);
    form.style.display = 'none';
  }

  
  // Сохр. имени по нажатию кнопки
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = input.value.trim();
    if (name) {
      localStorage.setItem('username', name);
      greeting.textContent = `Hello, ${name}!`;
      button.disabled = true;
      tabButtons.forEach(button => button.disabled = false);
      form.style.display = 'none';
    } else {
      alert('Input Character Name');
    }
  });
}
