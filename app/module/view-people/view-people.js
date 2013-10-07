(
    function(){
        var moduleName      = 'view-people';

        function render(){

        }

        function buildPeopleList(data){

            for(var key in data){
               renderPerson(data[key]);
           };

        }

        function renderPerson(){

        }

        function getPeopleList(){

            chrome.storage.local.get(
                null,
                buildPeopleList
            );

        }

        app.on('get-people-list', getPeopleList);

        exports(moduleName,render);
    }
)();