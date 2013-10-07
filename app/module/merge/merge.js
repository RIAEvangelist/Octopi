(
    function(){
        var moduleName = 'merge',
            localData = false;
        
        function hideNotice(){
            app.trigger('hide-dialog');
        }
        
        function getPeople(){
            chrome.storage.local.get(
                null,
                importData
            );
        }
        
        function importData(data){
            localData=data;
            
            chrome.fileSystem.chooseEntry(
                {
                    type:'openFile',
                    suggestedName:'people.octopi',
                    accepts:[
                        {
                            description : 'Octopi data',
                            mimeTypes   : ['octopi'],
                            extensions  : ['octopi']
                        }
                    ]
                },
                readData
            );
        }
        
        function readData(file){
            file.file(
                function(file) {
                    var reader = new FileReader();
                    
                    reader.onerror = errorImportingFile;
                    reader.onloadend = merge;
                
                    reader.readAsText(file);
                }
            );
        }
        
        function merge(e) {
            data=JSON.parse(e.target.result);
            var index = new Date().getTime()-1;
            
            for(var key in data){
                localData[index++]=data[key];
            }
            
            chrome.storage.local.set(
                localData,
                dataMerged
            );
        };
        
        function errorImportingFile(e){
            app.trigger(
                'show-dialog',
                {
                    type: 'warning',
                    msg : 'Error Importing Octopi Data'
                }
            )
        }
        
        function dataMerged(e){
            app.trigger(
                'show-dialog',
                {
                    type: 'notification',
                    msg : 'Data Imported<hr><strong>You should now EXPORT to the portable device</strong>'
                }
            )
        }
        
        function render(el){
        	
        }
        
        app.on('import-data',getPeople);
        exports(moduleName,render);
    }
)();