(
    function(){
        var moduleName      = 'header';
        
        function controlEvent(e){
            switch(e.target.id){
                case 'refresh':
                    app.trigger('app.refresh')
                    break;
                case 'close':
                    window.close();
                    break;
                case 'min':
                    currentHeight=chrome.app.window.current().getBounds().height;
                    currentTop=chrome.app.window.current().getBounds().top;
                    animateShrink();
                    break;
                case 'restore':
                    app.window.current().restore();
                    break;
                case 'max':
                    if(window.isFullscreen()){
                        window.restore();
                        break;
                    }
                    window.fullscreen();
                    break;
            }
        }
        
        function render(el){
            el.addEventListener(
                'click',
                controlEvent
            );
        }
        
        exports(moduleName,render);    
    }
)();