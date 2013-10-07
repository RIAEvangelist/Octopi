(
    function(){
        var moduleName      = 'dialog';
        var dialog          = false;

        function render(el){
            dialog = el;
            document.getElementById("dialog-button").addEventListener(
                "click",
                hide
            )
        }

        function show(data){
            var msg  = data.msg,
                type = data.type;

            dialog.classList.remove('hide');




        }

        function hide(){
            dialog.classList.add('hide');
        }

        app.on('show-dialog', show);

        exports(moduleName,render);
    }
)();