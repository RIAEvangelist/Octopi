(
    function(){
        var moduleName      = 'save';
        
        
        function storeData(data){
            chrome.storage.local.set(
                data
            );
            console.log(data);
        }
        
        function render(el){
        	
        }
        
        exports(moduleName,render);
        
        app.on('save',storeData);
    }
)();