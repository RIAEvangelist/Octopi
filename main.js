var screenWidth = screen.availWidth,
    screenHeight = screen.availHeight,
    minWidth=450,
    minHeight=90;
    
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
                    width   : minWidth,
                    height  : minHeight,
                    left    : Math.round(screenWidth-minWidth),
                    top     : Math.round(screenHeight-minHeight)
                },
                resizable:false,
                frame:'none'
            }
        );
    }
);