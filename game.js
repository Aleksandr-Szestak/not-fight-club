const tabButtons = document.querySelectorAll(".tab-btn");
const tabContents = document.querySelectorAll(".tab-content");
const tabSelect = document.querySelector(".tab-select");

function activateTab(tabId) {
  // Убираем активные классы
  tabButtons.forEach(btn => {
    btn.classList.toggle("active", btn.dataset.tab === tabId);
    btn.setAttribute("aria-selected", btn.dataset.tab === tabId);
  });
  tabContents.forEach(content => {
    content.classList.toggle("active", content.id === tabId);
  });
  tabSelect.value = tabId;
}



// Клики мышкой
tabButtons.forEach(button => {
  button.addEventListener("click", () => {
    activateTab(button.dataset.tab);
  });

  // Переключение клавиатурой
  button.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      activateTab(button.dataset.tab);
    }
  });
});

// Выбор из select на мобильных
tabSelect.addEventListener("change", () => {
  activateTab(tabSelect.value);
});
