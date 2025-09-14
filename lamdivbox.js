(() => {
    const plugin = {
        name: 'kinodivbox_details',
        init() {
            // Отслеживаем открытие страницы фильма/сериала
            Lampa.Listener.follow('full', (event) => {
                if (event.type !== 'complite') return;
                const body = event.body;
                if (!body) return;

                // Функция для добавления кнопки
                const addButton = () => {
                    const buttonsBlock = body.querySelector('.full-actions');
                    if (!buttonsBlock) return false; // ещё нет блока

                    if (!buttonsBlock.querySelector('.kinodivbox-btn')) {
                        const btn = document.createElement('div');
                        btn.className = 'kinodivbox-btn selector';
                        btn.textContent = 'KinoDivBox';
                        btn.style.cssText = `
                            display: inline-block;
                            margin-left: 10px;
                            padding: 8px 12px;
                            background: #ff3b3b;
                            border-radius: 6px;
                            font-size: 14px;
                            color: #fff;
                            cursor: pointer;
                        `;

                        btn.addEventListener('click', () => {
                            let input = prompt('Введите ID или ссылку КиноПоиска:');
                            if (input) {
                                let kpid = null;

                                // если ссылка
                                const match = input.match(/kinopoisk\.ru\/(?:film|series)\/(\d+)/);
                                if (match) kpid = match[1];

                                // если число
                                if (!kpid && /^\d+$/.test(input.trim())) kpid = input.trim();

                                if (kpid) {
                                    const url = `https://kinodivbox.github.io/iframe?id=${kpid}`;
                                    try {
                                        Lampa.Activity.push({ url, title: 'KinoDivBox' });
                                    } catch {
                                        window.open(url, '_blank');
                                    }
                                } else {
                                    Lampa.Noty.show('Некорректный ID или ссылка');
                                }
                            }
                        });

                        buttonsBlock.appendChild(btn);
                    }

                    return true; // кнопка добавлена
                };

                // Сразу пробуем добавить кнопку
                if (!addButton()) {
                    // Если блока ещё нет — используем MutationObserver
                    const observer = new MutationObserver(() => {
                        if (addButton()) {
                            observer.disconnect(); // кнопка добавлена, отключаем наблюдение
                        }
                    });
                    observer.observe(body, { childList: true, subtree: true });
                }
            });
        }
    };

    // регистрация плагина
    (function register() {
        if (window.Lampa && Lampa.Plugin && typeof Lampa.Plugin.register === 'function') {
            Lampa.Plugin.register(plugin.name, plugin);
        } else {
            setTimeout(register, 500);
        }
    })();
})();
