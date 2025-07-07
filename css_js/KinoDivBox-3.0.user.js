// ==UserScript==
// @name         KinoDivBox (устойчивая версия)
// @version      3.1
// @author       KinoDivBox
// @grant        none
// @run-at       document-idle
// @description  Открывай фильм на KinoDivBox прямо со страницы Кинопоиска!
// @match        https://www.kinopoisk.ru/*
// @icon         https://raw.githubusercontent.com/kinodivbox/kinodivbox.github.io/main/favicon-32x32.png
// ==/UserScript==

(function () {
  'use strict';

  // Получить ID фильма/сериала из URL
  function extractId(url) {
    const match = url.match(/\/(film|series)\/(\d+)/);
    return match ? match[2] : null;
  }

  // Создать кнопку
  function createButton(id) {
    const existing = document.querySelector('.kinoDivBox');
    if (existing) return;

    const url = `https://kinodivbox.github.io/ID.html?id=${id}`;

    const btn = document.createElement('button');
    btn.textContent = 'Смотреть на KinoDivBox';
    btn.className = 'kinoDivBox';
    btn.style.cssText = `
      margin-top: 8px;
      padding: 10px 15px;
      background-color: #ff6c00;
      color: white;
      border: none;
      border-radius: 6px;
      font-size: 14px;
      cursor: pointer;
    `;

    btn.addEventListener('click', () => {
      window.open(url, '_blank');
    });

    return btn;
  }

  // Попытка найти место вставки
  function insertButton() {
    const id = extractId(location.href);
    if (!id) return;

    // Попробовать найти блок с кнопками (например, "Буду смотреть")
    const container = document.querySelector('[data-tid="bbf5d5a"]') ||
                      document.querySelector('[class*="buttonContainer"]') ||
                      document.querySelector('[class*="styles_buttons"]');

    if (container && !document.querySelector('.kinoDivBox')) {
      const btn = createButton(id);
      if (btn) container.appendChild(btn);
    }
  }

  // Следим за изменением URL (SPA-переходы)
  let lastUrl = '';
  setInterval(() => {
    if (location.href !== lastUrl) {
      lastUrl = location.href;
      setTimeout(insertButton, 1000); // Подождать чуть дольше — для стабильности
    }
  }, 500);

  // Первая попытка вставить кнопку
  setTimeout(insertButton, 1500);
})();
