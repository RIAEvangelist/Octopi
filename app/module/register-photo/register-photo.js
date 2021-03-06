(
    function(){
        var moduleName      = 'register-photo';
        
        function errBack(error) {
			console.log("Video capture error: ", error.code); 
		};
        
        function initVideo(){
            var canvas  = document.getElementById("register-photo-mugshot"),
        		context = canvas.getContext("2d"),
        		video   = document.getElementById("register-photo-mugshot-video"),
        		videoObj= { 
        		    "video": true 
        		},
        		width   = 180,
        		height  = 119;

            video.setAttribute('width', width);
            video.setAttribute('height', height);
            canvas.setAttribute('width', width);
            canvas.setAttribute('height', height);
            
        	if(navigator.getUserMedia) {
        		navigator.getUserMedia(videoObj, function(stream) {
        			video.src = stream;
        			video.play();
        		}, errBack);
        	} else if(navigator.webkitGetUserMedia) {
        		navigator.webkitGetUserMedia(videoObj, function(stream){
        			video.src = window.webkitURL.createObjectURL(stream);
        			video.play();
        		}, errBack);
        	}

        	document.getElementById("register-photo-mugshot-button").addEventListener(
        	    "click",
        	    function() {
            	    context.drawImage(video, 0, 0, width, height);
                }
            );
        }


        function render(el){
        	setTimeout(
                initVideo,
                100
            )
        }

        function reset(){
            var canvas  = document.getElementById("register-photo-mugshot"),
                context = canvas.getContext("2d");
                context.clearRect ( 0 , 0 , canvas.width , canvas.height );

        }

        app.on('save', reset);

        exports(moduleName,render);
    }
)();