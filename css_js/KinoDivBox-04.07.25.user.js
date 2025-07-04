// ==UserScript==
// @name         KinoDivBox
// @version      2.3
// @author       KinoDivBox
// @grant        none
// @description  Открывай фильм на KinoDivBox прямо со страницы Кинопоиска!
// @match        https://www.kinopoisk.ru/*
// @icon         https://raw.githubusercontent.com/kinodivbox/kinodivbox.github.io/main/favicon-32x32.png
// ==/UserScript==

(function () {
  "use strict";

  // Функция для извлечения ID из URL
  function extractId(url) {
    // Пример URL: https://www.kinopoisk.ru/film/258687/
    // Ищем цифры после /film/ или /series/
    const match = url.match(/\/(film|series)\/(\d+)/);
    return match ? match[2] : null;
  }

  const createButton = () => {
    const target = document.querySelector("[class*=styles_buttonsContainer]");
    if (!target) return;

    if (document.querySelector(".kinoDivBox")) return;

    const id = extractId(location.href);
    if (!id) return; // если ID не нашли — не добавляем кнопку

    const url = `https://kinodivbox.github.io/ID.html?id=${id}`;

    const btn = document.createElement("div");
    btn.classList.add(
      "kinoDivBox",
      "styles_button__tQYKG",
      "style_button__PNtXT",
      "style_buttonSize52__b5OBe",
      "style_buttonAccent__vKDGa"
    );
    btn.textContent = "Смотреть на KinoDivBox";
    btn.style.cursor = "pointer";

    btn.addEventListener("click", () => {
      window.open(url, "_blank");
    });

    target.prepend(btn);
  };

  window.addEventListener("load", () => {
    createButton();

    let lastUrl = location.href;
    new MutationObserver(() => {
      if (location.href !== lastUrl) {
        lastUrl = location.href;
        createButton();
      }
    }).observe(document, { subtree: true, childList: true });
  });
})();
