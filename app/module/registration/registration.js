(
    function(){
        var moduleName      = 'registration';
        
        function getCanvasData(canvas) {
        	return canvas.toDataURL("image/png");
        }
        
        function render(el){
            
        }
        
        exports(moduleName,render);    
    }
)();