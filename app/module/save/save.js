(
    function(){
        var moduleName = 'save',
            exportData = false;
        
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
                formatExportFile
            );
        }
        
        function formatExportFile(data){
            /*
            exportData=btoa(
                JSON.stringify(data)
            );
            */
            exportData=JSON.stringify(data);
            
            chrome.fileSystem.chooseEntry(
                {
                    type:'saveFile',
                    suggestedName:'people.octopi',
                    accepts:[
                        {
                            description : 'Octopi data',
                            extensions  : ['.octopi']
                        }
                    ]
                },
                exportToFile
            )
        }
        
        function exportToFile(file){
            file.createWriter(
                function(writer) {
                    writer.onerror = errorWritingFile;
                    writer.onwriteend = fileTruncated;
                    writer.truncate(0);
                }, 
                errorWritingFile
            );
        }
        
        function errorWritingFile(e){
            app.trigger(
                'show-dialog',
                {
                    type: 'warning',
                    msg : 'Error Exporting Octopi Data'
                }
            )
        }
        
        function fileTruncated(e){
            var writer=e.target;
            writer.onwriteend = fileSaved;
            writer.write(
                new Blob(
                    [
                        exportData
                    ], 
                    {
                        type: 'octopi'
                    }
                )
            );
            exportData=false;
        }
        
        function fileSaved(e){
            console.log(e);
            app.trigger(
                'show-dialog',
                {
                    type: 'notification',
                    msg : 'Octopi Data Saved'
                }
            )
        }
        
        function render(el){
        	
        }
        
        app.on('export-data',getPeople);
        app.on('save',storeData);
        exports(moduleName,render);
    }
)();