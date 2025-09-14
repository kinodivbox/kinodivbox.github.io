(() => {
    const plugin = {
        name: 'kinodivbox_details',
        init() {
            // Следим за открытием экрана фильма/сериала
            Lampa.Listener.follow('full', (event) => {
                if (event.type !== 'complite') return;

                const body = event.body;
                if (!body) return;

                const buttonsBlock = body.querySelector('.full-actions');
                if (!buttonsBlock) return;

                // Если кнопка уже есть — не дублируем
                if (buttonsBlock.querySelector('.kinodivbox-btn')) return;

                // Создаём кнопку
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

                // Обработчик нажатия
                btn.addEventListener('click', () => {
                    let input = prompt('Введите ID или ссылку КиноПоиска:');
                    if (input) {
                        let kpid = null;

                        // если ссылка
                        let match = input.match(/kinopoisk\.ru\/(?:film|series)\/(\d+)/);
                        if (match) kpid = match[1];

                        // если просто число
                        if (!kpid && /^\d+$/.test(input.trim())) {
                            kpid = input.trim();
                        }

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

                // Вставляем кнопку
                buttonsBlock.appendChild(btn);
            });
        }
    };

    // Регистрация плагина
    (function register() {
        if (window.Lampa && Lampa.Plugin && typeof Lampa.Plugin.register === 'function') {
            Lampa.Plugin.register(plugin.name, plugin);
        } else {
            setTimeout(register, 500);
        }
    })();
})();
