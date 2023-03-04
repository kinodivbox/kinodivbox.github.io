<script>
    const form = document.querySelector('form');
    const input = document.querySelector('input[name="q"]');

    function getQuery() {
        const params = new URLSearchParams(location.search);
        if (params.has('q')) {
            const value = params.get('q').trim();
            if (value.includes('kinopoisk.ru') || value.includes('imdb.com')) {
                const match = value.match(/\/(?:film|series|title)\/(?<id>(tt)*\d+)/);
                return match.groups.id;
            }
            return decodeURI(value);
        }
        return '';
    }

    function updateView() {
        const placeholder = document.querySelector('.placeholder');
        const player = document.querySelector('.player');
        if (getQuery() === '') {
            placeholder.classList.remove('hidden');
            player.classList.add('hidden');
        } else {
            placeholder.classList.add('hidden');
            player.classList.remove('hidden');
            initPlayer();
        }
    }

    function initPlayer() {
        const query = getQuery();
        if (['4624950'].includes(query)) {
            document.querySelector('.player').innerHTML = '<h1 style="text-align: center; padding: 32px;">404. Not found</h1>';
        } else {
            new Kinobox('.kinobox_player', {
                token: '0000000000000000000000000000demo',
                search: {
                    query: getQuery()
                }
            }).init();
        }
    }

    input.value = getQuery();
    updateView();
</script>