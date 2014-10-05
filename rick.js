(function () {

    // https://stackoverflow.com/questions/326069/how-to-identify-if-a-webpage-is-being-loaded-inside-an-iframe-or-directly-into-t
    function inIframe() {
        try {
            return window.self !== window.top;
        } catch (e) {
            return true;
        }
    }

    if(!inIframe()){
        var audioTag = document.createElement("audio");
        audioTag.src = "//google.com/rick_mp3";
        audioTag.loop = false;
        audioTag.play();
    }
})();