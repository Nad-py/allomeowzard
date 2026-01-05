const PARAMS = new URLSearchParams(window.location.search);
const HELLOSOUND = document.getElementById("helloSound");
const MEOWSOUND = document.getElementById("meowSound");
const USERNAME = PARAMS.get("username");
const VOLUME = parseInt(PARAMS.get("volume"));
const MODPERMISSION = (PARAMS.get("modpermission") ?? "true") === "true";
let helloIsOn = true;
let meowIsOn = true;

ComfyJS.onChat = ( user, message, flags, self, extra ) => {
    const isAllowedToChange = flags["broadcaster"] || (MODPERMISSION == true && flags["mod"]);
    
    const lowerMsg = message.toLowerCase();
    const aloRegex = /\ba+l+o+\b/i;
    const meowRegex = /\bm+e+o+w+\b/i;
    
    if(lowerMsg == "stopsayinghello" && isAllowedToChange){
        helloIsOn = false;
    }
    if(lowerMsg == "startsayinghello" && isAllowedToChange){
        helloIsOn = true;
    }

    if(lowerMsg == "stopsayingmeow" && isAllowedToChange){
        meowIsOn = false;
    }
    if(lowerMsg == "startsayingmeow" && isAllowedToChange){
        meowIsOn = true;
    }

    if(aloRegex.test(lowerMsg) && helloIsOn){
        let normalizedVolume = !isNaN(VOLUME) ? Math.max(0.01, Math.min(1, VOLUME / 100)) : 1;
        HELLOSOUND.volume = normalizedVolume; 
        HELLOSOUND.currentTime = 0;
        HELLOSOUND.play();
    }else if(meowRegex.test(lowerMsg) && meowIsOn){
        let normalizedVolume = !isNaN(VOLUME) ? Math.max(0.01, Math.min(1, VOLUME / 100)) : 1;
        MEOWSOUND.volume = normalizedVolume; 
        MEOWSOUND.currentTime = 0;
        MEOWSOUND.play();
    }
}

ComfyJS.Init(USERNAME);