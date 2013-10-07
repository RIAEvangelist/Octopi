(
    function(){
        var moduleName = 'save',
            exportData = false,
            exportHTML = false;
        
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
            
            app.trigger('get-portable-people-list',data);
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
            );
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
        
        function exportHTMLToFile(file){
            file.createWriter(
                function(writer) {
                    writer.onerror = errorWritingFile;
                    writer.onwriteend = htmlTruncated;
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
        
        function htmlTruncated(e){
            var writer=e.target;
            writer.onwriteend = htmlSaved;
            writer.write(
                new Blob(
                    [
                        exportHTML
                    ], 
                    {
                        type: 'text/html'
                    }
                )
            );
            exportHTML=false;
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
        
        function exportHTML(html){
            chrome.fileSystem.chooseEntry(
                {
                    type:'saveFile',
                    suggestedName:'Octopi-List.html',
                    accepts:[
                        {
                            description : 'Octopi People List',
                            extensions  : ['.html']
                        }
                    ]
                },
                exportHTMLToFile
            );
        }
        
        function render(el){
        	
        }
        
        app.on('portable-people-list-ready',exportHTML);
        app.on('export-data',getPeople);
        app.on('save',storeData);
        exports(moduleName,render);
    }
)();