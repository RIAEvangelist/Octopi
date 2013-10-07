(
    function(){
        var moduleName      = 'dialog';
        var dialog          = false;

        function render(el){
            dialog = el;
            document.getElementById('dialog-button').addEventListener(
                "click",
                hide
            )
        }

        function show(data){
            switch(data.type){
                case 'html-fullscreen' :
                    dialog.classList.add('html-fullscreen');
                break;

            }
            dialog.querySelector('.dialog-msg').innerHTML = data.msg;
            dialog.classList.remove('hide');
        }

        function hide(){
            dialog.classList.add('hide');
            dialog.classList.remove('html-fullscreen');
        }

        function clearDialog(){
            dialog.querySelector('.dialog-msg').innerHTML = '';
        }

        app.on('clear-dialog', clearDialog);
        app.on('show-dialog', show);
        app.on('hide-dialog', hide);

        exports(moduleName,render);
    }
)();