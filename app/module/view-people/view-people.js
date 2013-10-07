(
    function(){
        var moduleName      = 'view-people';

        function render(){

        }

        function buildPeopleList(data){

            var peopleList = '';

            app.trigger(
                'clear-dialog'
            );

            for(var key in data){
               peopleList += renderPerson(data[key]);
            }

            app.trigger(
               'show-dialog',
               {
                   msg:  peopleList,
                   type: 'html-fullscreen'
               }
            );

        }
        
        function buildSelfContainedList(data){
            var xhr = new XMLHttpRequest();
            var peopleList = '';
            
            xhr.open('GET', 'app/portable/templates/people-list.html', true);
            xhr.onload = function(e) {
                var template=this.response;
                template=template.replace(
                    '${people-list}',
                    peopleList
                );
                app.trigger('portable-people-list-ready',template);
            }
            
            for(var key in data){
               peopleList += renderPerson(data[key]);
            }
            
            console.log(peopleList);
            
            xhr.send();
        }

        function renderPerson(data, template){
            console.log(data);

            if(!template){

                template = document.getElementById('template-person-list').innerHTML;
            }

            var   vars     = {};

            for(var key in data){
                if(typeof data[key] == 'object'){
                    template = renderPerson(data[key], template);
                    continue;
                }
                if(!vars[key]){
                    vars[key] = new RegExp('\\$\\{'+key+'\\}','g');
                }
                template=template.replace(
                    vars[key],
                    data[key]
               );

            }

            return template;

        }

        function getPeopleList(){

            chrome.storage.local.get(
                null,
                buildPeopleList
            );

        }
    
        app.on('get-portable-people-list',buildSelfContainedList);
        app.on('get-people-list', getPeopleList);
        exports(moduleName,render);
    }
)();