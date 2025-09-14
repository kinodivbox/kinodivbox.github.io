(() => {
    const plugin = {
        name: 'kinodivbox_card',
        init: function() {

            // Сохраняем оригинальный метод render карточки
            const originalCardRender = Lampa.Component.Card.prototype.render;

            // Переписываем render
            Lampa.Component.Card.prototype.render = function() {
                const cardElement = originalCardRender.call(this);

                const kpid = this.data.kpid || this.data.id || null;

                if(kpid) {
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
                        e.stopPropagation(); // чтобы не открывался плеер
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
