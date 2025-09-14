(function(){
    function KinoDivBox(){
        this.movie = function(object, callback){
            let results = [];

            // Проверяем наличие КиноПоиск ID
            if(object.id && object.id.kp){
                let kp_id = object.id.kp;

                results.push({
                    title: 'KinoDivBox',
                    url: 'https://kinodivbox.github.io/iframe?id=' + kp_id,
                    quality: '1080p',
                    timeline: false,
                    info: {
                        title: 'Открыть в KinoDivBox',
                        year: object.year || '',
                        quality: 'HD'
                    }
                });
            }

            callback(results);
        };
    }

    // Регистрируем источник
    Lampa.Player.regSource('kinodivbox', KinoDivBox);

    // Добавляем плагин в список
    Lampa.Plugin.add({
        title: 'KinoDivBox',
        version: '1.0',
        description: 'Источник с плеером KinoDivBox (по КиноПоиск ID)',
        author: 'KinoDivBox'
    });
})();
