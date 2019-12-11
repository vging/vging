function jsDecimals(e, flag) {
    var evt = (e) ? e : window.event;
    var key = (evt.keyCode) ? evt.keyCode : evt.which;
    
    if (key != null) {
        key = parseInt(key, 10);
        
        if(flag)
            if( key == 8 || key == 46 ) return false;
        
        var ctrlDown = evt.ctrlKey||evt.metaKey // Mac support

        // Check for Alt+Gr (http://en.wikipedia.org/wiki/AltGr_key)
        if (ctrlDown && evt.altKey) return true;

        // Check for ctrl+c, v and x
        else if (ctrlDown && key == 67) return true; // c
        else if (ctrlDown && key == 86) return true; // v
        else if (ctrlDown && key == 88) return true; // x
        
        
        if( false == flag && ( key == 109 || key == 188 ) ) 
            return true;
        
        //109 (-), 188 (,)
        
        if ((key < 48 || key > 57) && (key < 96 || key > 105)) {
            //Aca tenemos que reemplazar "Decimals" por "NoDecimals" si queremos que no se permitan decimales
            if (!jsIsUserFriendlyChar(key, "Decimals")) {
                return false;
            }
        }
        else {
            if (evt.shiftKey) {
                return false;
            }
        }
    }
    return true;
}

// Función para las teclas especiales
//------------------------------------------
function jsIsUserFriendlyChar(val, step) {
    // Backspace, Tab, Enter, Insert, y Delete
    if (val == 8 || val == 9 || val == 13 || val == 45 || val == 46) {
        return true;
    }
    // Ctrl, Alt, CapsLock, Home, End, y flechas
    if ((val > 16 && val < 21) || (val > 34 && val < 41)) {
        return true;
    }
    if (step == "Decimals") {
        if (val == 190 || val == 110) {  //Check dot key code should be allowed
            return true;
        }
    }
    // The rest
    return false;
}