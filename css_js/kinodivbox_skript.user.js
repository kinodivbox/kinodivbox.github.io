// ==UserScript==
// @name         KinoDivBox (улучшенная версия)
// @version      4.0
// @author       KinoDivBox
// @grant        none
// @run-at       document-idle
// @description  Кнопка "Смотреть на KinoDivBox" прямо на странице фильма или сериала Кинопоиска
// @match        https://www.kinopoisk.ru/*
// @icon         https://raw.githubusercontent.com/kinodivbox/kinodivbox.github.io/main/favicon-32x32.png
// ==/UserScript==

(function () {
  'use strict';

  const KINODIVBOX_DOMAIN = 'https://kinodivbox.github.io/ID.html?id=';

  function extractId(url) {
    const match = url.match(/\/(film|series)\/(\d+)/);
    return match ? match[2] : null;
  }

  function createButton(id) {
    const btn = document.createElement('button');
    btn.textContent = '🎬 Смотреть на KinoDivBox';
    btn.className = 'kinoDivBox';
    btn.style.cssText = `
      margin-top: 12px;
      padding: 10px 16px;
      background-color: #ff6c00;
      color: white;
      border: none;
      border-radius: 8px;
      font-size: 15px;
      font-weight: 600;
      cursor: pointer;
      transition: background-color 0.3s ease;
      z-index: 10000;
    `;
    btn.onmouseenter = () => btn.style.backgroundColor = '#e65c00';
    btn.onmouseleave = () => btn.style.backgroundColor = '#ff6c00';
    btn.onclick = () => window.open(`${KINODIVBOX_DOMAIN}${id}`, '_blank');
    return btn;
  }

  function insertButton() {
    const id = extractId(location.href);
    if (!id || document.querySelector('.kinoDivBox')) return;

    const selectors = [
      '[data-tid="bbf5d5a"]',
      '[class*="styles_buttons"]',
      '[class*="buttonContainer"]',
      '[class*="styles_actions"]',
      '[class*="film-actions"]',
      '[class*="styles_root"]',
    ];

    for (const sel of selectors) {
      const container = document.querySelector(sel);
      if (container && !container.querySelector('.kinoDivBox')) {
        const btn = createButton(id);
        container.appendChild(btn);
        break;
      }
    }
  }

  // MutationObserver — следим за динамической подгрузкой
  const observer = new MutationObserver(insertButton);
  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });

  // SPA-навигация
  let lastUrl = location.href;
  setInterval(() => {
    if (location.href !== lastUrl) {
      lastUrl = location.href;
      setTimeout(insertButton, 1000);
    }
  }, 500);

  // Первая вставка
  setTimeout(insertButton, 1500);
})();
