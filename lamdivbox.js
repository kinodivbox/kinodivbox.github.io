(() => {
    const plugin = {
        name: 'kinodivbox_details',
        init() {
            // Отслеживаем открытие карточки фильма/сериала
            Lampa.Listener.follow('full', (event) => {
                if (!event.body || event.type !== 'complite') return;

                const body = event.body;
                const actionsBlock = body.querySelector('.full-actions');
                if (!actionsBlock) return;

                // Если кнопки ещё нет — создаём
                if (!actionsBlock.querySelector('.kinodivbox-btn')) {
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
                        transition: background 0.2s;
                    `;

                    btn.addEventListener('mouseenter', () => btn.style.background = '#ff1a1a');
                    btn.addEventListener('mouseleave', () => btn.style.background = '#ff3b3b');

                    btn.addEventListener('click', () => {
                        let input = prompt('Введите ID или ссылку КиноПоиска:');
                        if (!input) return;

                        let kpid = null;
                        const match = input.match(/kinopoisk\.ru\/(?:film|series)\/(\d+)/);
                        if (match) kpid = match[1];
                        if (!kpid && /^\d+$/.test(input.trim())) kpid = input.trim();

                        if (kpid) {
                            const url = `https://kinodivbox.github.io/iframe?id=${kpid}`;
                            try {
                                // Открываем через Lampa Activity
                                Lampa.Activity.push({ url, title: 'KinoDivBox' });
                            } catch {
                                window.open(url, '_blank');
                            }
                        } else {
                            Lampa.Noty.show('Некорректный ID или ссылка');
                        }
                    });

                    actionsBlock.appendChild(btn);
                }
            });
        }
    };

    // Регистрируем плагин в Lampa
    (function register() {
        if (window.Lampa && Lampa.Plugin && typeof Lampa.Plugin.register === 'function') {
            Lampa.Plugin.register(plugin.name, plugin);
        } else {
            setTimeout(register, 500);
        }
    })();
})();
