var screenWidth = screen.availWidth,
    screenHeight = screen.availHeight;
    
chrome.runtime.requestUpdateCheck(updateCheck);

function updateCheck(status){
    if(status=="no_update")
        return;
    chrome.runtime.reload();
}    

chrome.app.runtime.onLaunched.addListener(
    function() {
        chrome.app.window.create(
            'index.html', 
            {
                bounds: {
                    width   : screenWidth/2,
                    height  : Math.round(screenHeight),
                    left    : 0,
                    top     : 0
                },
                frame:'none'
                //state:'fullscreen'
            }
        );
    }
);