(() => {
    const plugin = {
        name: 'kinodivbox_card',
        init: function() {
            const originalCardRender = Lampa.Component.Card.prototype.render;

            Lampa.Component.Card.prototype.render = function() {
                const cardElement = originalCardRender.call(this);

                // пробуем достать ссылку КиноПоиска
                const kpLink = this.data.url || this.data.source || '';

                // ищем ID в ссылке
                const match = kpLink.match(/kinopoisk\.ru\/(?:film|series)\/(\d+)/);

                if(match) {
                    const kpid = match[1];

                    const btn = document.createElement('button');
                    btn.innerHTML = 'KinoDivBox';
                    btn.className = 'card-btn-kinodivbox';
                    btn.style.cssText = `
                        position: absolute;
                        bottom: 5px;
                        right: 5px;
                        padding: 2px 6px;
                        font-size: 12px;
                        background: #ff3b3b;
                        color: white;
                        border: none;
                        border-radius: 3px;
                        cursor: pointer;
                        z-index: 10;
                    `;

                    btn.addEventListener('click', (e) => {
                        e.stopPropagation(); // не открываем стандартный просмотр
                        const url = `https://kinodivbox.github.io/iframe?id=${kpid}`;
                        Lampa.Activity.push({
                            url: url,
                            title: 'KinoDivBox'
                        });
                    });

                    cardElement.appendChild(btn);
                }

                return cardElement;
            };
        }
    };

    Lampa.Plugin.register(plugin.name, plugin);
})();
