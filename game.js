// ---------------------------------------------------------------------------

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


// Убираем или добавляем класс active для tabId
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

    tabButtons.forEach(button => {
      button.disabled = false;
    });

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

      tabButtons.forEach(button => {
        button.disabled = false;
      });

      form.style.display = 'none';


    } else {
      alert('Input Character Name');
    }
  });
});



// ---------------------------------------------------------------------------
const fightButton = document.getElementById("fightBtn");
// console.log(fightButton);

fightButton.addEventListener("click", (event) => {
  event.preventDefault();
  activateTab('tab5');
});


// ---------------------------------------------------------------------------
let hiScore = 0;
let totalWins = 0;
let totalLoses = 0;
let numberAvatar = 0;

// const savedAvatar = localStorage.getItem('sAvatar');

      // const savedDate = localStorage.getItem('dateupdate');
      // const savedTime = localStorage.getItem('timeupdate');

      // if (savedDate === null || savedTime === null) {
      //     localStorage.setItem('dateupdate', data.dateupdate);
      //     localStorage.setItem('timeupdate', data.timeupdate);
      // } else {
      //     // Проверяем, изменились ли данные
      //     if (savedDate !== data.dateupdate || savedTime !== data.timeupdate) {
      //         localStorage.setItem('dateupdate', data.dateupdate);
      //         localStorage.setItem('timeupdate', data.timeupdate);
      //         // Перезагрузка страницы
      //         //location.reload();
      //         renderPage();
      //     }
      // }








const img_avatar = document.querySelector('.character-scores img');
img_avatar.src = `./assets/image/good${numberAvatar}.png`







// ---------------------------------------------------------------------------
const radios = document.querySelectorAll('.image-radio-choose input');

radios.forEach(radio => {
  radio.addEventListener('change', () => {
    // убираем выделение у всех
    document.querySelectorAll('.image-radio-choose img').forEach(img => {
      img.classList.remove('selected');
    });

    // подсвечиваем выбранное
    radio.nextElementSibling.classList.add('selected');

    console.log("Выбрана картинка:", radio.value);
    numberAvatar = radio.value;
    img_avatar.src = `./assets/image/good${numberAvatar}.png`

  });
});