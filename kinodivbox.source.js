export default {
    name: 'KinoDivBox KP Auto',
    version: '1.1',

    search: function(query, page) {
        // Поиск по названию пока не реализован
        return Promise.resolve([]);
    },

    load: function(kp_id) {
        const url = `https://kinodivbox.github.io/iframe?id={kp_id}`;

        return fetch(url)
            .then(res => res.text())
            .then(html => {
                // Создаем временный DOM для парсинга
                const parser = new DOMParser();
                const doc = parser.parseFromString(html, 'text/html');

                // Название фильма
                const titleEl = doc.querySelector('h1');
                const title = titleEl ? titleEl.textContent.trim() : `Фильм KP ${kp_id}`;

                // Постер
                const posterEl = doc.querySelector('.poster img');
                const poster = posterEl ? posterEl.src : `https://st.kp.yandex.net/images/film_iphone/iphone360_${kp_id}.jpg`;

                // Описание
                const descEl = doc.querySelector('.description') || doc.querySelector('meta[name="description"]');
                const description = descEl ? descEl.textContent.trim() || descEl.getAttribute('content') : '';

                // Плееры (ищем все кнопки или ссылки с data-player)
                const playerEls = doc.querySelectorAll('[data-player]');
                const players = [];
                playerEls.forEach(p => {
                    const name = p.textContent.trim();
                    const player_url = `${url}&player=${p.getAttribute('data-player')}`;
                    players.push({
                        name: `KinoDivBox ${name}`,
                        type: 'iframe',
                        url: player_url
                    });
                });

                // Если плееров не найдено — добавим один по умолчанию
                if(players.length === 0) {
                    players.push({
                        name: 'KinoDivBox Default',
                        type: 'iframe',
                        url: url
                    });
                }

                return {
                    title: title,
                    kp_id: kp_id,
                    poster: poster,
                    description: description,
                    player: players
                };
            })
            .catch(err => {
                console.error('Ошибка загрузки KinoDivBox:', err);
                return {
                    title: `Фильм KP ${kp_id}`,
                    kp_id: kp_id,
                    poster: `https://st.kp.yandex.net/images/film_iphone/iphone360_${kp_id}.jpg`,
                    description: 'Не удалось загрузить описание.',
                    player: [{
                        name: 'KinoDivBox Default',
                        type: 'iframe',
                        url: url
                    }]
                };
            });
    }
};
