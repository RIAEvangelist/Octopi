(
    function(){
        var moduleName      = 'register-photo';
        
        function errBack(error) {
			console.log("Video capture error: ", error.code); 
		};
        
        function render(el){
        	var canvas  = document.getElementById("register-photo-mugshot"),
        		context = canvas.getContext("2d"),
        		video   = document.getElementById("register-photo-mugshot-video"),
        		videoObj= { "video": true },
        		width   = 400,
        		height  = 266;
            
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
        
        exports(moduleName,render);    
    }
)();