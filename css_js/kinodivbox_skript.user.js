// ==UserScript==
// @name         KinoDivBox (устойчивая версия)
// @version      3.2
// @author       KinoDivBox
// @grant        none
// @run-at       document-idle
// @description  Открывай фильм на KinoDivBox прямо со страницы Кинопоиска!
// @match        https://www.kinopoisk.ru/*
// @icon         https://raw.githubusercontent.com/kinodivbox/kinodivbox.github.io/main/favicon-32x32.png
// ==/UserScript==

(function () {
  'use strict';

  function extractId(url) {
    const match = url.match(/\/(film|series)\/(\d+)/);
    return match ? match[2] : null;
  }

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
      z-index: 1000;
    `;
    btn.onclick = () => window.open(url, '_blank');
    return btn;
  }

  function tryInsert() {
    const id = extractId(location.href);
    if (!id) return;

    const trySelectors = [
      '[data-tid="bbf5d5a"]',
      '[class*="buttonContainer"]',
      '[class*="styles_buttons"]',
      '[class*="styles_root"]',           // новый контейнер
      '[class*="styles_actions"]',        // ещё один вариант
      '[class*="film-actions"]'           // на всякий случай
    ];

    for (const sel of trySelectors) {
      const container = document.querySelector(sel);
      if (container && !container.querySelector('.kinoDivBox')) {
        const btn = createButton(id);
        if (btn) container.appendChild(btn);
        return;
      }
    }
  }

  // MutationObserver: следим за DOM
  const observer = new MutationObserver(() => {
    tryInsert();
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });

  // Также при URL изменениях (SPA)
  let lastUrl = location.href;
  setInterval(() => {
    if (location.href !== lastUrl) {
      lastUrl = location.href;
      setTimeout(tryInsert, 1200);
    }
  }, 500);

  // Первая попытка
  setTimeout(tryInsert, 1500);
})();
