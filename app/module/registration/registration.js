(
    function(){
        var moduleName      = 'registration';

        function render(el){

            document.getElementById("register-button-register").addEventListener(
                "click",
                buildPerson
            );

            document.getElementById("register-button-export").addEventListener(
                "click",
                exportData
            );
            document.getElementById("register-button-import").addEventListener(
                "click",
                importData
            );
            document.getElementById("register-button-show-people").addEventListener(
                "click",
                getPeopleList
            );
        }

        function getPeopleList(){
            app.trigger('get-people-list');
        }

        function exportData(){
            //console.log('export-data');

            app.trigger('export-data');
        }
        
        function importData(){
            console.log('import-data');

            app.trigger('import-data');
        }

        function clearFields(){
            var inputs          = document.getElementsByTagName('input');
            var inputsLength    = inputs.length;

            //clear inputs
            for(var i=0; i< inputsLength; i++){
                inputs[i].value = '';
            }

            //clear radios
            var genderRadios = document.getElementsByName("register-gender-value");
            for(var i=0;i<genderRadios.length;i++){
                genderRadios[i].checked = false;
            }

            var statusRadios = document.getElementsByName("register-status-value");
            for(var i=0;i<statusRadios.length;i++){
                statusRadios[i].checked = false;
            }

            document.getElementById('register-photo-mugshot').width = document.getElementById('register-photo-mugshot').width
        }

        function buildPerson(){
            var mugshot = document.getElementById('register-photo-mugshot').toDataURL("image/png");
            var name    = document.getElementById('register-value-name').value;

            var gender  = document.querySelector('input[name="register-gender-value"]:checked');
            if(!gender){
                var data = {
                    msg: 'Please choose a gender',
                    type: 'warning'
                };


                showDialog(data);
                return;
            }
            else{
                gender = gender.value;
            }

            var status   = document.querySelector('input[name="register-status-value"]:checked');
            if(!status){
                var data = {
                    msg: 'Please choose a status',
                    type: 'warning'
                };


                showDialog(data);
                return;
            }
            else{
                status = status.value;
            }


            var dateValue   = document.getElementById('register-value-birthdate').value;
            var date        = (dateValue) ?
                                dateValue :
                                '';

            var ageRangeLowValue  = document.getElementById('register-value-agelow').value;
            var ageRangeHighValue = document.getElementById('register-value-agehigh').value;
            var ageRange          = (ageRangeLowValue && ageRangeHighValue) ?
                                    { low: ageRangeLowValue, high: ageRangeHighValue } :
                                    { low: '', high: '' };

            var address1 = document.getElementById('register-value-address1').value;
            var address2 = document.getElementById('register-value-address2').value;
            var city     = document.getElementById('register-value-city').value;
            var state    = document.getElementById('register-value-state').value;
            var postcode = document.getElementById('register-value-postcode').value;

            var person = {

                mugshot     : mugshot,
                name        : name,
                gender      : gender,
                "birth-date": date,
                "age-range" : ageRange,
                status      : status,
                address1    : address1,
                address2    : address2,
                city        : city,
                state       : state,
                postcode    : postcode

            };

            app.trigger('save', person);
            clearFields();

        }


        function showDialog(data){
            app.trigger('show-dialog', data);
        }

        exports(moduleName,render);
    }
)();