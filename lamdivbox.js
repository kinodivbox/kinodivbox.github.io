(() => {
    const plugin = {
        name: 'kinodivbox_details',
        init() {
            // Слушаем экран "подробности"
            Lampa.Listener.follow('full', (event) => {
                if (event.type === 'complite') {
                    const info = event.data;
                    const body = event.body;

                    const buttonsBlock = body.querySelector('.full-actions');
                    if (!buttonsBlock) return;

                    if (buttonsBlock.querySelector('.kinodivbox-btn')) return;

                    // создаём кнопку
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
                        let kpid = null;

                        // пробуем взять ID из данных Lampa
                        if (info && (info.kp_id || info.kinopoisk_id)) {
                            kpid = info.kp_id || info.kinopoisk_id;
                        }

                        if (!kpid) {
                            // если ID нет → спрашиваем у пользователя
                            let input = prompt('Введите ID или ссылку КиноПоиска:');
                            if (input) {
                                let match = input.match(/kinopoisk\.ru\/(?:film|series)\/(\d+)/);
                                if (match) kpid = match[1];
                                if (!kpid && /^\d+$/.test(input.trim())) kpid = input.trim();
                            }
                        }

                        if (kpid) {
                            const url = `https://kinodivbox.github.io/iframe?id=${kpid}`;
                            try {
                                Lampa.Activity.push({ url, title: 'KinoDivBox' });
                            } catch {
                                window.open(url, '_blank');
                            }
                        } else {
                            Lampa.Noty.show('KP ID не найден, введите вручную');
                        }
                    });

                    buttonsBlock.appendChild(btn);
                }
            });
        }
    };

    (function register() {
        if (window.Lampa && Lampa.Plugin && typeof Lampa.Plugin.register === 'function') {
            Lampa.Plugin.register(plugin.name, plugin);
        } else {
            setTimeout(register, 500);
        }
    })();
})();
