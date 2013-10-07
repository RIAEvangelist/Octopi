(
    function(){
        var moduleName      = 'view-people';

        function render(){

        }

        function buildPeopleList(data){

            console.log(data);

        }

        function getPeopleList(){

            chrome.storage.local.get(
                null,
                buildPeopleList
            );
        }

        app.on('', getPeopleList);

        exports(moduleName,render);
    }
)();