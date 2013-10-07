(
    function(){
        var moduleName      = 'registration';

        function render(el){



            document.getElementById("register-button-register-button").addEventListener(
                "click",
                registerPerson
            )
        }

        function registerPerson(){
            var people = [];

            people.push(
                buildPerson()
            );

            app.trigger('save', people);
            console.log(people);
        }

        function buildPerson(){
            var mugshot = document.getElementById('register-photo-mugshot').toDataURL("image/png");
            var name    = document.getElementById('register-value-name').value;
            var gender  = document.querySelector('input[name="register-gender-value"]:checked').value;

            var dateValue   = document.getElementById('register-value-birthdate').value;
            var date        = (dateValue) ?
                                dateValue :
                                false;

            var ageRangeLowValue  = document.getElementById('register-value-agelow').value;
            var ageRangeHighValue = document.getElementById('register-value-agehigh').value;
            var ageRange          = (ageRangeLowValue && ageRangeHighValue) ?
                                    { low: ageRangeLowValue, high: ageRangeHighValue } :
                                    false;

            var status   = document.querySelector('input[name="register-status-value"]:checked').value;
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

            return person;

        }

        exports(moduleName,render);
    }
)();