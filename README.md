<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>KinoDivBox — Tampermonkey Скрипт</title>
  <style>
    :root {
      --bg: #f9f9f9;
      --text: #111;
      --accent: #ff3333;
      --btn-bg: #ff3333;
      --btn-text: #fff;
    }
    @media (prefers-color-scheme: dark) {
      :root {
        --bg: #121212;
        --text: #f1f1f1;
        --btn-bg: #ff5555;
        --btn-text: #fff;
      }
    }

    body {
      margin: 0;
      font-family: "Segoe UI", Tahoma, sans-serif;
      background: var(--bg);
      color: var(--text);
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 1.5rem;
      line-height: 1.6;
    }

    img {
      max-width: 100%;
      height: auto;
      border-radius: 12px;
      box-shadow: 0 4px 10px rgba(0,0,0,0.1);
      margin-bottom: 1.5rem;
    }

    h1, h2 {
      text-align: center;
      margin-bottom: 0.5rem;
    }

    p {
      max-width: 800px;
      text-align: center;
      margin-bottom: 1rem;
    }

    .button {
      display: inline-block;
      background: var(--btn-bg);
      color: var(--btn-text);
      padding: 0.75rem 1.5rem;
      margin: 0.5rem;
      border: none;
      border-radius: 8px;
      font-size: 1rem;
      text-decoration: none;
      transition: background 0.3s ease;
    }

    .button:hover {
      background: #e02727;
    }

    .link-list {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 0.5rem;
    }

    footer {
      margin-top: 2rem;
      font-size: 0.85rem;
      opacity: 0.6;
      text-align: center;
    }
  </style>
</head>
<body>

  <a href="https://kinodivbox.github.io">
    <img src="https://kinodivbox.github.io/995424.jpg" alt="KinoDivBox">
  </a>

  <h1>KinoDivBox – Tampermonkey</h1>

  <p>С этим скриптом на странице каждого фильма или сериала на КиноПоиске появится кнопка, ведущая сразу на нужную страницу KinoDivBox.</p>

  <h2>Установка</h2>

  <p><strong>1.</strong> Установите расширение Tampermonkey для вашего браузера:</p>

  <div class="link-list">
    <a class="button" href="https://chromewebstore.google.com/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo?hl=ru" target="_blank">Chrome / Yandex</a>
    <a class="button" href="https://microsoftedge.microsoft.com/addons/detail/tampermonkey/iikmkjmpaadaobahmlepeloendndfphd" target="_blank">Edge</a>
    <a class="button" href="https://addons.mozilla.org/en-US/firefox/addon/tampermonkey/" target="_blank">Firefox</a>
    <a class="button" href="https://addons.opera.com/en/extensions/details/tampermonkey-beta/" target="_blank">Opera</a>
    <a class="button" href="https://apps.apple.com/us/app/tampermonkey/id1482490089" target="_blank">Safari</a>
  </div>

  <p><strong>2.</strong> Включите <strong>Режим разработчика</strong> в настройках расширений. <em>(Обязательно!)</em></p>

  <p><strong>3.</strong> Установите сам скрипт:</p>

  <a class="button" href="https://kinodivbox.github.io/css_js/KinoDivBox-04.07.25.user.js" target="_blank">Установить скрипт KinoDivBox</a>

  <p><strong>4.</strong> Нажмите «Установить» в открывшемся окне Tampermonkey.</p>

  <h2>Готово!</h2>

  <footer>
    © 2025 KinoDivBox. Все права защищены.
  </footer>

</body>
</html>
