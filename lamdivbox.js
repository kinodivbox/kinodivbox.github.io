(() => {
    const plugin = {
        name: 'kinodivbox',
        init: function() {
            // Добавляем кнопку в интерфейс плеера Lampa
            Lampa.Player.addButton({
                title: 'Открыть в KinoDivBox',
                icon: 'fas fa-film', // иконка кнопки (можно изменить)
                action: function(player) {
                    // Получаем ID фильма
                    const kpid = player.data.kpid || player.data.id || null;

                    if(kpid) {
                        // Формируем ссылку на KinoDivBox
                        const url = `https://kinodivbox.github.io/iframe?id=${kpid}`;

                        // Открываем ссылку в Lampa
                        Lampa.Activity.push({
                            url: url,
                            title: 'KinoDivBox'
                        });
                    } else {
                        // Ошибка, если ID нет
                        Lampa.Noty.show('Ошибка', 'Не найден ID фильма (kpid)');
                    }
                }
            });
        }
    };

    // Регистрируем плагин в Lampa
    Lampa.Plugin.register(plugin.name, plugin);
})();
