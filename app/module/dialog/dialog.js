(
    function(){
        var moduleName      = 'dialog';

        function render(el){
            console.log('here');

            // el.addEventListener(
            //     'click',
            //     controlEvent
            // );
        }

        function show(htmlStr){
            console.log(htmlStr);

        }

        app.on('show-dialog', show);

        exports(moduleName,render);
    }
)();