const tabButtons = document.querySelectorAll(".tab-btn");
const tabContents = document.querySelectorAll(".tab-content");
const tabSelect = document.querySelector(".tab-select");


export function initTabs() {
  // клики мышкой по кнопкам табов
  tabButtons.forEach(button => {
    button.addEventListener("click", () => {
      activateTab(button.dataset.tab); // tab1...tab5 из атриб. data-tab
    });
  });

  // выбор из select
  tabSelect.addEventListener("change", () => {
    activateTab(tabSelect.value); // tab1...tab5 из атриб. value
  });
}


// Убираем или добавляем класс active для tabId
export function activateTab(tabId) {
  tabButtons.forEach(btn => {
    btn.classList.toggle("active", btn.dataset.tab === tabId);
  });

  tabContents.forEach(content => {
    content.classList.toggle("active", content.id === tabId);
  });

  tabSelect.value = tabId;
}
