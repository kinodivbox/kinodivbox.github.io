(function(){
    function KinoDivBox(){
        this.movie = function(object, callback){
            var results = [];

            try {
                var kp_id = null;

                if(object.id){
                    if(object.id.kp) kp_id = object.id.kp;
                    else if(object.id.kinopoisk) kp_id = object.id.kinopoisk;
                }

                if(kp_id){
                    results.push({
                        title: 'KinoDivBox',
                        url: 'https://kinodivbox.github.io/iframe?id=' + kp_id,
                        quality: '1080p',
                        timeline: false,
                        info: {
                            title: 'Открыть в KinoDivBox',
                            year: object.year ? object.year : '',
                            quality: 'HD'
                        }
                    });
                }
            } catch(e){
                console.log('KinoDivBox error:', e.message);
            }

            callback(results);
        };
    }

    Lampa.Player.regSource('kinodivbox', KinoDivBox);

    Lampa.Plugin.add({
        title: 'KinoDivBox',
        version: '1.0',
        description: 'Источник с плеером KinoDivBox (по КиноПоиск ID)',
        author: 'KinoDivBox'
    });
})();
