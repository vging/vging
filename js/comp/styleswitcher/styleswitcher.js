function setActiveStyleSheet(title) {
  var i, a, main;
  for(i=0; (a = document.getElementsByTagName("link")[i]); i++) {
    if(a.getAttribute("rel").indexOf("style") != -1 && a.getAttribute("title")) {
      a.disabled = true;
      if(a.getAttribute("title") == title) a.disabled = false;
    }
  }
}

function getActiveStyleSheet() {
  var i, a;
  for(i=0; (a = document.getElementsByTagName("link")[i]); i++) {
    if(a.getAttribute("rel").indexOf("style") != -1 && a.getAttribute("title") && !a.disabled) return a.getAttribute("title");
  }
  return null;
}

function getPreferredStyleSheet() {
  var i, a;
  console.log( 'getPreferredStyleSheet' );
  for(i=0; (a = document.getElementsByTagName("link")[i]); i++) {
	  console.log('rel: '+a.getAttribute("rel"));
    if(a.getAttribute("rel").indexOf("style") != -1
       && a.getAttribute("rel").indexOf("alt") == -1
       && a.getAttribute("title")
       ) return a.getAttribute("title");
  }
  console.log('a: '+ a);
  return null;
}

function createCookie(name,value,days) {
	var expires;
  if (days) {
    var date = new Date();
    date.setTime(date.getTime()+(days*24*60*60*1000));
    expires = "; expires="+date.toGMTString();
  }
  else expires = "";
  document.cookie = name+"="+value+expires+"; path=/";
}

function readCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(';');
  for(var i=0;i < ca.length;i++) {
    var c = ca[i];
    while (c.charAt(0)==' ') c = c.substring(1,c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length,c.length);
  }
  return null;
}

window.onload = function(e) {
  var idioma = optionSel( 'slctIdioma' );
  var cookie = readCookie( 'style' );
  console.log('cookie: ' + cookie);
  
  //var title = (cookie) ? cookie : getPreferredStyleSheet();
  var title = (null===cookie || undefined==cookie || 'null'==cookie) ? getPreferredStyleSheet() : cookie;
  title = (title)?title:idioma;
  createCookie( 'style', title, 365 );
  console.log('title: ' + title);
  setActiveStyleSheet(title);
}

window.onunload = function(e) {
  var title = getActiveStyleSheet();
  createCookie( 'style', title, 365 );
}
//var cookie = readCookie("style");
//var title = cookie ? cookie : getPreferredStyleSheet();
//setActiveStyleSheet(title);
