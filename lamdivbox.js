(() => {
    const plugin = {
        name: 'kinodivbox_details',
        init() {
            Lampa.Listener.follow('full', (event) => {
                if (event.type !== 'complite') return;

                const body = event.body;
                if (!body) return;

                // следим за изменениями внутри страницы
                const observer = new MutationObserver(() => {
                    const buttonsBlock = body.querySelector('.full-actions');
                    if (!buttonsBlock) return;

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
                                let match = input.match(/kinopoisk\.ru\/(?:film|series)\/(\d+)/);
                                if (match) kpid = match[1];

                                // если число
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

                        buttonsBlock.appendChild(btn);
                    }
                });

                observer.observe(body, { childList: true, subtree: true });
            });
        }
    };

    // регистрация
    (function register() {
        if (window.Lampa && Lampa.Plugin && typeof Lampa.Plugin.register === 'function') {
            Lampa.Plugin.register(plugin.name, plugin);
        } else {
            setTimeout(register, 500);
        }
    })();
})();
