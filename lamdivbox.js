(() => {
    const plugin = {
        name: 'kinodivbox_card',
        init() {
            let retries = 0;
            const maxRetries = 60;

            // Добавляем CSS один раз
            function addStyle() {
                if (document.getElementById('kinodivbox-card-style')) return;
                const css = `
                    .card-btn-kinodivbox {
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
                    }
                    /* Показывать кнопку при наведении на карточку (универсальный селектор) */
                    .card:hover .card-btn-kinodivbox,
                    .card-item:hover .card-btn-kinodivbox,
                    .card-btn-kinodivbox.force-show {
                        opacity: 1;
                        transform: none;
                    }
                `;
                const style = document.createElement('style');
                style.id = 'kinodivbox-card-style';
                style.appendChild(document.createTextNode(css));
                document.head.appendChild(style);
            }

            // Пытаемся "запатчить" Lampa.Component.Card.prototype.render
            function tryPatch() {
                try {
                    // Ждём появления Lampa и Card
                    if (!window.Lampa || !Lampa.Component || !Lampa.Component.Card || !Lampa.Component.Card.prototype || !Lampa.Component.Card.prototype.render) {
                        if (++retries < maxRetries) {
                            return setTimeout(tryPatch, 300);
                        } else {
                            console.warn('KinoDivBox: не удалось найти Lampa.Component.Card.prototype.render');
                            return;
                        }
                    }

                    // Не патчим повторно
                    if (Lampa.__kinodivbox_patched) return;

                    addStyle();

                    const originalRender = Lampa.Component.Card.prototype.render;

                    Lampa.Component.Card.prototype.render = function () {
                        let cardEl;
                        try {
                            // Выполняем оригинальный рендер (без модификаций)
                            cardEl = originalRender.call(this);
                        } catch (origErr) {
                            console.error('KinoDivBox: ошибка в оригинальном render:', origErr);
                            // Если оригинальный render упал — возвращаем попытку вызвать его ещё раз
                            try { return originalRender.call(this); } catch(e){ return cardEl || null; }
                        }

                        try {
                            // Если кнопка уже добавлена — не дублируем
                            if (cardEl && cardEl.querySelector && cardEl.querySelector('.card-btn-kinodivbox')) {
                                return cardEl;
                            }

                            // Пробуем найти ссылку на КиноПоиск в данных карточки
                            const data = this.data || {};
                            let kpLink = data.url || data.link || data.source || data.href || '';

                            // Иногда инфа хранится в других полях
                            if (!kpLink && data.info && typeof data.info === 'string') kpLink = data.info;
                            if (!kpLink && cardEl) {
                                const a = cardEl.querySelector('a[href*="kinopoisk.ru"]');
                                if (a && a.href) kpLink = a.href;
                            }

                            // Регекс для film или series
                            const match = String(kpLink).match(/kinopoisk\.ru\/(?:film|series)\/(\d+)/i);

                            if (match && match[1]) {
                                const kpid = match[1];

                                const btn = document.createElement('button');
                                btn.className = 'card-btn-kinodivbox';
                                btn.type = 'button';
                                btn.title = 'Открыть в KinoDivBox';
                                btn.textContent = 'KinoDivBox';

                                btn.addEventListener('click', (e) => {
                                    e.stopPropagation();
                                    e.preventDefault();
                                    const url = `https://kinodivbox.github.io/iframe?id=${kpid}`;
                                    try {
                                        if (window.Lampa && Lampa.Activity && typeof Lampa.Activity.push === 'function') {
                                            Lampa.Activity.push({ url, title: 'KinoDivBox' });
                                        } else if (window.open) {
                                            window.open(url, '_blank');
                                        } else {
                                            location.href = url;
                                        }
                                    } catch (openErr) {
                                        console.error('KinoDivBox: ошибка при открытии ссылки', openErr);
                                        if (window.open) window.open(url, '_blank');
                                    }
                                });

                                // Чтобы нажатие кнопки не срабатывало как клик по карточке
                                btn.addEventListener('keydown', (ev) => ev.stopPropagation());

                                // Гарантируем, что контейнер карточки позиционируем относительно
                                try {
                                    if (cardEl && window.getComputedStyle(cardEl).position === 'static') {
                                        cardEl.style.position = 'relative';
                                    }
                                } catch (e) { /* ignore */ }

                                if (cardEl && cardEl.appendChild) cardEl.appendChild(btn);
                            }

                        } catch (innerErr) {
                            console.error('KinoDivBox: ошибка в патченном render:', innerErr);
                        }

                        return cardEl;
                    };

                    Lampa.__kinodivbox_patched = true;
                    console.info('KinoDivBox: успешно запатчен render карточек');
                } catch (err) {
                    console.error('KinoDivBox: общая ошибка патча:', err);
                }
            }

            tryPatch();
        }
    };

    // Регистрируем плагин когда доступен Lampa.Plugin.register
    (function register() {
        if (window.Lampa && Lampa.Plugin && typeof Lampa.Plugin.register === 'function') {
            Lampa.Plugin.register(plugin.name, plugin);
        } else {
            setTimeout(register, 300);
        }
    })();
})();
