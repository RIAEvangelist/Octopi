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
            var el   = document.getElementById("appModule-dialog");

            el.querySelector('.dialog-msg').innerHTML = data.msg;
            dialog.classList.remove('hide');



        }

        function hide(){
            dialog.classList.add('hide');
        }

        app.on('show-dialog', show);
        app.on('hide-dialog', hide);

        exports(moduleName,render);
    }
)();