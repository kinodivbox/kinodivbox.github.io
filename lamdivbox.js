(() => {
    const plugin = {
        name: 'kinodivbox_manual',
        init() {
            const originalCardRender = Lampa.Component.Card.prototype.render;

            Lampa.Component.Card.prototype.render = function() {
                const cardEl = originalCardRender.call(this);

                if (cardEl && !cardEl.querySelector('.card-btn-kinodivbox')) {
                    const btn = document.createElement('button');
                    btn.className = 'card-btn-kinodivbox';
                    btn.textContent = 'KinoDivBox';
                    btn.style.cssText = `
                        position: absolute;
                        bottom: 6px;
                        right: 6px;
                        padding: 4px 8px;
                        font-size: 12px;
                        background: #ff3b3b;
                        color: #fff;
                        border: none;
                        border-radius: 4px;
                        cursor: pointer;
                        z-index: 10;
                        opacity: 0;
                        transform: translateY(6px);
                        transition: opacity .18s, transform .18s;
                    `;

                    // Показывать при наведении
                    cardEl.classList.add('kinodivbox-card');
                    const css = `
                        .kinodivbox-card:hover .card-btn-kinodivbox {
                            opacity: 1;
                            transform: none;
                        }
                    `;
                    if (!document.getElementById('kinodivbox-style')) {
                        const style = document.createElement('style');
                        style.id = 'kinodivbox-style';
                        style.textContent = css;
                        document.head.appendChild(style);
                    }

                    btn.addEventListener('click', (e) => {
                        e.stopPropagation();
                        let input = prompt('Введите ID или ссылку КиноПоиска:');
                        if (input) {
                            let kpid = null;

                            // Если ссылка
                            let match = input.match(/kinopoisk\.ru\/(?:film|series)\/(\d+)/);
                            if (match) {
                                kpid = match[1];
                            }

                            // Если просто число
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
                        } else {
                            Lampa.Noty.show('ID не введён');
                        }
                    });

                    if (window.getComputedStyle(cardEl).position === 'static') {
                        cardEl.style.position = 'relative';
                    }
                    cardEl.appendChild(btn);
                }

                return cardEl;
            };
        }
    };

    (function register() {
        if (window.Lampa && Lampa.Plugin && typeof Lampa.Plugin.register === 'function') {
            Lampa.Plugin.register(plugin.name, plugin);
        } else {
            setTimeout(register, 300);
        }
    })();
})();
