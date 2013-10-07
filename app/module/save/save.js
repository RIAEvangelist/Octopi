(
    function(){
        var moduleName = 'save';
        
        
        function storeData(data){
            var person  = {},
                stamp   = new Date().getTime();
            
            if(!data.timestamp)
                data.timestamp=stamp;
                
            person[stamp]=data;
            
            chrome.storage.local.set(
                person
            );
            app.trigger(
                'show-dialog',
                [
                    '<h1>Saved</h1><p>',
                    data.name,
                    '<hr><img src="',
                    data.mugshot,
                    '" /></p>'
                ].join('')
            );
            
            setTimeout(
                hideSavedNotice,
                2500
            );
        }
        
        function hideSavedNotice(){
            app.on('hide-dialog');
        }
        
        function render(el){
        	
        }
        
        exports(moduleName,render);
        
        app.on('save',storeData);
    }
)();