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
                {
                    type : 'notify',
                    msg:[
                        '<h1>Saved</h1><p><img style="float:left" width="100" src="',
                        data.mugshot,
                        '" />',
                        data.name,
                        '</p>'
                    ].join('')
                }
            );
            
            setTimeout(
                hideSavedNotice,
                2500
            );
        }
        
        function hideSavedNotice(){
            app.trigger('hide-dialog');
        }
        
        function getPeople(){
            chrome.storage.local.get(
                null,
                exportData
            );
        }
        
        function exportData(data){
            console.log(data)
        }
        
        function render(el){
        	
        }
        
        app.on('export-data',getPeople);
        app.on('save',storeData);
        exports(moduleName,render);
    }
)();