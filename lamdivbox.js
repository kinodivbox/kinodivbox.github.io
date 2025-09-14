(() => {
    const plugin = {
        name: 'kinodivbox_card',
        init: function() {
            const originalCardRender = Lampa.Component.Card.prototype.render;

            Lampa.Component.Card.prototype.render = function() {
                const cardElement = originalCardRender.call(this);

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
                    e.stopPropagation();

                    // Спрашиваем ID у пользователя
                    const kpid = prompt('Введите ID фильма (kpid):');
                    if(kpid) {
                        const url = `https://kinodivbox.github.io/iframe?id=${kpid}`;
                        Lampa.Activity.push({
                            url: url,
                            title: 'KinoDivBox'
                        });
                    } else {
                        Lampa.Noty.show('Ошибка', 'ID фильма не введён');
                    }
                });

                cardElement.appendChild(btn);

                return cardElement;
            };
        }
    };

    Lampa.Plugin.register(plugin.name, plugin);
})();
