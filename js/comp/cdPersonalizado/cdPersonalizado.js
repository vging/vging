// global variables //
var TIMER = (document.all)?2:5;
var SPEED = (document.all)?50:10;
var WRAPPER = 'body';
var RESPUESTA_CONFIRM = -1;

// calculate the current window width //
function pageWidth() {
  return window.innerWidth != null ? window.innerWidth : document.documentElement && document.documentElement.clientWidth ? document.documentElement.clientWidth : document.body != null ? document.body.clientWidth : null;
}

// calculate the current window height //
function pageHeight() {
  return window.innerHeight != null? window.innerHeight : document.documentElement && document.documentElement.clientHeight ? document.documentElement.clientHeight : document.body != null? document.body.clientHeight : null;
}

// calculate the current window vertical offset //
function topPosition() {
  return typeof window.pageYOffset != 'undefined' ? window.pageYOffset : document.documentElement && document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop ? document.body.scrollTop : 0;
}

// calculate the position starting at the left of the window //
function leftPosition() {
  return typeof window.pageXOffset != 'undefined' ? window.pageXOffset : document.documentElement && document.documentElement.scrollLeft ? document.documentElement.scrollLeft : document.body.scrollLeft ? document.body.scrollLeft : 0;
}

// build/show the dialog box, populate the data and call the fadeDialog function //
function showDialog(title,message,type,autohide) {
  if(!type) {
    type = 'error';
  }
  var f__ = false;
  if( type.indexOf( '_' ) >= 0 ){
	//type = type.replace( '_', '' );
	f__ = true;
  }
  var dialog;
  var dialogheader;
  var dialogclose;
  var dialogtitle;
  var dialogcontent;
  var dialogmask;
  var botonCerrar;
  if(!document.getElementById('dialog')) {
    dialog = document.createElement('div');
    dialog.id = 'dialog';
    dialogheader = document.createElement('div');
    dialogheader.id = 'dialog-header';
    dialogtitle = document.createElement('div');
    dialogtitle.id = 'dialog-title';
    dialogclose = document.createElement('div');
    dialogclose.id = 'dialog-close'
	if( type == 'prompt_' )
		dialogclose.className = 'prompt_dialog-close';
    dialogcontent = document.createElement('div');
    dialogcontent.id = 'dialog-content';
    dialogmask = document.createElement('div');
    dialogmask.id = 'dialog-mask';
    document.body.appendChild(dialogmask);
    document.body.appendChild(dialog);
	
	if( type != 'prompt_' ){
		dialog.appendChild(dialogheader);
		dialog.appendChild(dialogcontent);
	}
    else{
		dialogaux = document.createElement('div');
		dialogaux.className = type + 'total';
		dialogaux.appendChild(dialogheader);
		dialogaux.appendChild(dialogcontent);
		dialog.appendChild(dialogaux);
	}
	dialogheader.appendChild(dialogtitle);
    dialogheader.appendChild(dialogclose);
    
	dialogclose.setAttribute('onclick','hideDialog()');
    dialogclose.onclick = hideDialog;
	
	botonCerrar = document.createElement( 'input' );
	botonCerrar.setAttribute( 'type', 'button' );
	botonCerrar.setAttribute( 'id', 'botonCdPersonalizadoCerrar' );
	botonCerrar.setAttribute( 'value', 'Aceptar' );
	botonCerrar.style.cursor = 'pointer';
	botonCerrar.style.position = 'relative';
	botonCerrar.style.top = '-40px';
	botonCerrar.style.left = '10px';
	//botonCerrar.style.right = '25px';
	botonCerrar.className = 'divBotonLCDPersonalizado normalGris negrilla';
	botonCerrar.onclick = hideDialog;
	  
	if( ie && document.documentMode <= 7 ){
		botonCerrar.onfocus = function(){ botonCerrar.style.border = 'solid 1px #0077FF'; botonCerrar.style.outline = 'none'; }
		botonCerrar.onblur  = function(){ botonCerrar.style.border = 'solid 1px #D9D9D9'; }
		botonCerrar.onmouseover  = function(){ botonCerrar.style.border = 'solid 1px #939393'; }
		botonCerrar.onmouseout  = function(){ botonCerrar.style.border = 'solid 1px #D9D9D9'; }
	}
	dialog.appendChild( botonCerrar );
	
  } else {
    dialog = document.getElementById('dialog');
    dialogheader = document.getElementById('dialog-header');
    dialogtitle = document.getElementById('dialog-title');
    dialogclose = document.getElementById('dialog-close');
	botonCerrar = document.getElementById('botonCdPersonalizadoCerrar');
	if( botonCerrar )
		botonCerrar.style.display = 'inline';
	
    dialogcontent = document.getElementById('dialog-content');
    dialogmask = document.getElementById('dialog-mask');
    dialogmask.style.visibility = "visible";
    dialog.style.visibility = "visible";
  }
  dialog.style.opacity = .00;
  dialog.style.filter = 'alpha(opacity=0)';
  dialog.alpha = 0;
  var width = pageWidth();
  var height = pageHeight();
  var left = leftPosition();
  var top = topPosition();
  var dialogwidth = dialog.offsetWidth;
  var dialogheight = dialog.offsetHeight;
  var topposition = top + (height / 3) - (dialogheight / 2);
  var leftposition = left + (width / 2) - (dialogwidth / 2);
  dialog.style.top = topposition + "px";
  dialog.style.left = leftposition + "px";
  
  
  dialogheader.className = type + "header";
  dialogcontent.className = type;

  dialogtitle.innerHTML = title;
  
  dialogcontent.innerHTML = message;
  var content = document.getElementById(WRAPPER);
  //dialogmask.style.height = content.offsetHeight + 'px';
  
  var xy = getScrollXY();
  dialogmask.style.height = getDocHeight() + 'px'; //fixed
  dialogmask.style.width  = getDocWidth() + 'px'; //fixed
  
  dialog.timer = setInterval("fadeDialog(1)", TIMER);
  if(autohide) {
    dialogclose.style.visibility = "hidden";
    window.setTimeout("hideDialog()", (autohide * 1000));
  } else {
    dialogclose.style.visibility = "visible";
  }
  try{
	botonCerrar.focus();
  }catch( excepcion ){}
  
  if( type == 'prompt' && false == f__ ){
	/*botonCerrar.onclick = hideDialog;
	var btnCancelar = document.getElementById( 'botonCdPersonalizadoCancelar__' );
	if( btnCancelar ){
		dialog.removeChild( btnCancelar );
	}*/
	if( botonCerrar )
		botonCerrar.style.display = 'none';
	if( !document.getElementById( 'botonSiPrompt' ) ){
		var botonSiPrompt = document.createElement( 'input' );
		var botonNoCancelarPrompt = document.createElement( 'input' );
		botonSiPrompt.setAttribute( 'type', 'button' );
		botonSiPrompt.setAttribute( 'id', 'botonSiPrompt' );
		botonSiPrompt.setAttribute( 'value', 'Aceptar' );
		botonSiPrompt.setAttribute( 'onclick', 'botonSiPromptJs()' );
		botonSiPrompt.className = 'divBotonLCDPersonalizado divBotonLCDPersonalizadoSi normalGrisClaro negrilla md20 divDerecha';
		botonSiPrompt.onclick = botonSiPromptJs;
		dialogcontent.innerHTML += '<br/><br/><br/><br/><br/><br/><br/><br/>';
		
		botonNoCancelarPrompt.setAttribute( 'type', 'button' );
		botonNoCancelarPrompt.setAttribute( 'id', 'botonNoCancelarPrompt' );
		botonNoCancelarPrompt.setAttribute( 'value', 'Cancelar' );
		botonNoCancelarPrompt.setAttribute( 'onclick', 'botonNoCancelarPromptJs()' );
		botonNoCancelarPrompt.style.margin = '0px 30px 0px 0px';
		botonNoCancelarPrompt.className = 'divBotonLCDPersonalizado normalGris normalGrisClaro divDerecha';
		botonNoCancelarPrompt.onclick = botonNoCancelarPromptJs;
		dialogcontent.appendChild( botonNoCancelarPrompt );
		dialogcontent.appendChild( botonSiPrompt );
		
		try{
			botonSiPrompt.focus();
		}catch( excepcion1 ){}
	}
  }
}

// hide the dialog box //
function hideDialog() {
  var dialog = document.getElementById('dialog');
  clearInterval(dialog.timer);
  dialog.timer = setInterval("fadeDialog(0)", TIMER);
  var dialogmask = document.getElementById('dialog-mask');
  dialogmask.style.height = '0px';
  dialogmask.style.width  = '0px';
}

// fade-in the dialog box //
function fadeDialog(flag) {
  if(flag == null) {
    flag = 1;
  }
  var dialog = document.getElementById('dialog');
  var value;
  if(flag == 1) {
    value = dialog.alpha + SPEED;
  } else {
    value = dialog.alpha - SPEED;
  }
  dialog.alpha = value;
  dialog.style.opacity = (value / 100);
  dialog.style.filter = 'alpha(opacity=' + value + ')';
  if(value >= 99) {
    clearInterval(dialog.timer);
    dialog.timer = null;
  } else if(value <= 1) {
    dialog.style.visibility = "hidden";
    document.getElementById('dialog-mask').style.visibility = "hidden";
    clearInterval(dialog.timer);
  }
}

function botonSiPromptJs(){
	RESPUESTA_CONFIRM = 1;
	hideDialog();
}

function botonNoCancelarPromptJs(){
	RESPUESTA_CONFIRM = 0;
	hideDialog();
}

function getScrollXY(){
	var scrOfX = 0, scrOfY = 0;
	if( typeof( window.pageYOffset ) == 'number' ){
		//Netscape compliant
		scrOfY = window.pageYOffset;
		scrOfX = window.pageXOffset;
	}
	else if( document.body && ( document.body.scrollLeft || document.body.scrollTop ) ){
		//DOM compliant
		scrOfY = document.body.scrollTop;
		scrOfX = document.body.scrollLeft;
	}
	else if( document.documentElement && ( document.documentElement.scrollLeft || document.documentElement.scrollTop ) ){
		//IE6 standards compliant mode
		scrOfY = document.documentElement.scrollTop;
		scrOfX = document.documentElement.scrollLeft;
	}
	return [ scrOfX, scrOfY ];
}

function getDocHeight(){
    var D = document;
    return Math.max(
        Math.max(D.body.scrollHeight, D.documentElement.scrollHeight),
        Math.max(D.body.offsetHeight, D.documentElement.offsetHeight),
        Math.max(D.body.clientHeight, D.documentElement.clientHeight)
    );
}

function getDocWidth(){
    var D = document;
    return Math.max(
        Math.max(D.body.scrollWidth, D.documentElement.scrollWidth),
        Math.max(D.body.offsetWidth, D.documentElement.offsetWidth),
        Math.max(D.body.clientWidth, D.documentElement.clientWidth)
    );
}

// ToDo List
// ---------
// ToDo 1: Get auto shrink-wrapping of contents working for IE, (current work-around is to force to default size)
// ToDo 2: Fix the explicit adding of the 6px content padding and 1px bar border when calculating "dialog.style.height"
// ToDo 3: Try and optimise the code further for size 
// ToDo 4: Make the title bar "draggable"
// ToDo 5: Add support for any number of user-defined buttons"


// Change Log
// ----------
// Version 1.6 - Changes (minified size =  5446 bytes)
// ---------------------
// 1. Fix: ALLOWHIDE test in hideDialog() function should have been "if (ALLOWHIDE || buttonId >= 1)" (as per Maramor's suggestion)
// 2. Added MASKCOLOR, (default value set to #D0D0D0). This is a global variable to set the Dialog mask color (as per Maramor's suggestion)

// Version 1.5 - Changes (minified size =  5347 bytes)
// ---------------------
// 1. Fix: DLGRESULT is now set to the button number when button is clicked. (Close = 0, Button1 = 1, Button2 = 2)
// 2. Fix: Dialog mask style is now set to 'block' the first time the dialog is created, (if the dialog style is modal)
// 3. Fix: Dialog now positions correctly at the cursor position in Internet Explorer when (atcursor == true)
// 4. Fix: Fixed CSS padding and margins for header
// 5. Fix: Now renders correctly in both HTML and XHTML doctypes
// 6. Added ALLOWHIDE to provide support for a persistent dialog, (if ALLOWHIDE == false then Dialog will not hide on a button click. in the case of an invalid input value, the dialog can remain visible)

// Version 1.4 - Changes (minified size =  5271 bytes)
// --------------------- 
// 1. Fix: DLGRESULT is now initialised to null in showDialog().
// 2. Fix: DLGRESULT is now set to false when button2 is clicked.

// Version 1.3 - Changes (minified size = 5272 bytes)
// --------------------- 
// 1. Fix: Included scrolled page position when calculating dialog position
// 2. Fix: Dialog Mask wasn't created for non-modal display and thus was not available for modal display. It is now always created.
// 3: Fix: Fixed the 40 pixel hack to set the correct mask height
// 4: Fix: Fixed the IE6 40 pixel hack to set the correct mask width so that it covers the entire background content
// 5. WRAPPER is now initialised to an empty string which will default to the document.body

// Version 1.2 - Changes (minified size = 4581 bytes)
// --------------------- 
// 1. Show "Close Dialog" button in auto-hide mode
// 2. Added DEFAULT_WIDTH and DEFAULT_CONTENT_HEIGHT global variables
// 3. Added code to prevent dialog being clipped by WRAPPER Right and Bottom boundaries

// Version 1.1 - Changes (minified size = 4484 bytes)
// --------------------- 
// 1. Rewrote dialog sizing and positioning
// 2. Added IE detection to ignore auto sizing for IE
// 3. Removed unneccessary functions 

// Version 1.0 - Changes (minified size = 5215 bytes)
// ---------------------
// 1. Fix: Use an <iframe> for the mask to cover <select> elements in IE <8
// 2. Fix: Replaced hyphens with underscores in CSS class names
// 3. Fix: WRAPPER should contain a valid id of a div or similar element which contains the page content
// 4. Added support for standard and user-defined buttons
// 5. Added support for width and height, (user-defined, default and auto)
// 6. Added support for open-dialog-at-cursor
// 7. Added support for non-modal dialogs
// 8. Added support for click-background-mask-to-close
// 9. Added a DLGRESULT variable set to true or false depending on which button clicked
// 10. Added a "message" dialog box type
// 11. Added a "query" dialog box type


// Notes:
// ------
// Dialog Types
//  error
//  warning
//  success
//  prompt
//  message
//  query

// width/height = null : Default Size
// width/height = 0    : Auto Size to contents 

// buttons == 0 : No Buttons
// buttons == 1 : "Ok"
// buttons == 2 : "Yes"/"No"
// buttons == 3 : "Accept"/"Cancel"
// buttons == 4 : "User defined 1"/"User defined 2" (button 2 is optional)

                 
// global variables //
/*var TIMER = 5;
var SPEED = 1000;
var WRAPPER = '';  // defaults to document.body
var DLGRESULT = null;
var ALLOWHIDE = true;  // Support for a persistent dialog
var DEFAULT_WIDTH = 425;
var DEFAULT_CONTENT_HEIGHT = 160;
var MASKCOLOR = '#DDD';

// sniff browser, (content shrink-wrapping doesn't work for IE)
var isIE = (navigator.appName == 'Microsoft Internet Explorer');

// Add an onMouseMove event to track mouse position
if (window.attachEvent) document.attachEvent("onmousemove",MouseMv);
else document.addEventListener("mousemove",MouseMv,false);

function MouseMv(e) 
{
 if (!e) e = window.event;
 if (typeof e.pageX == "number") MouseMv.X = e.pageX;
 else MouseMv.X = e.clientX;

 if (typeof e.pageY == "number") MouseMv.Y = e.pageY;
 else MouseMv.Y = e.clientY;
}
MouseMv.X = 0;
MouseMv.Y = 0;

// check if argument is null, not defined, or of the specified type
function isDef(arg, argtype)
{
 try
 {
  if (argtype === null || typeof(argtype) == 'undefined') return (arg !== null && typeof(arg) != 'undefined');
  return (arg !== null && typeof(arg) == argtype);
 }
 catch (e) {}
 return false;
}

// wrapper for getElementById
function el(id)
{
 try
 {
  if (!isDef(id, 'string') || id == '') return null;
  return document.getElementById(id);
 }
 catch(e) {}
 return null;
}

// get an element's rendered visible content's width
function getWidth(elem)
{
 try
 {
  if (!isDef(elem)) return 0;
  if (elem.style.display == 'none') return 0;
  return elem.innerWidth ? elem.innerWidth :elem.clientWidth ? elem.clientWidth : elem.offsetWidth;
 }
 catch(e) {}

 return 0;
}

// get an element's rendered visible content's height
function getHeight(elem)
{
 try
 {
  if (!isDef(elem)) return 0;
  if (elem.style.display == 'none') return 0;
  return elem.innerHeight ? elem.innerHeight :elem.clientHeight ? elem.clientHeight : elem.offsetHeight;
 }
 catch(e) {}

 return 0;
}

// get scrolled page size
function getScrollSize()
{
 try
 {
  var db = document.body;
  var dde = document.documentElement;
 
  var scrollHeight = Math.max(db.scrollHeight, dde.scrollHeight, db.offsetHeight, dde.offsetHeight, db.clientHeight, dde.clientHeight)
  var scrollWidth = Math.max(db.scrollWidth, dde.scrollWidth, db.offsetWidth, dde.offsetWidth, db.clientWidth, dde.clientWidth)
  
  return {x: scrollWidth, y: scrollHeight};
 }
 catch(e) {}

 return {x: 0, y: 0};
}

// get scrolled page position
function getScrollPos()
{
 try
 {
  if (typeof(pageXOffset) != 'undefined') {return {x: pageXOffset, y: pageYOffset};}  // IE throws an exception if I use "!isDef(pageXOffset)"
  else 
  {
   var db = document.body;
   var dde = document.documentElement;
   return ((dde.clientHeight) ? {x: dde.scrollLeft, y: dde.scrollTop} : {x: db.scrollLeft, y: db.scrollTop});
  }
 }
 catch(e) {}

 return {x: 0, y: 0};
}

// build/show the dialog box, populate the data and call the fadeDialog function //
function showDialog(title, message, type, width, height, autohide, atcursor, modal, buttons, button1, button2) 
{
 var dialog;
 var dialogheader;
 var dialogclose;
 var dialogtitle;
 var dialogbody;
 var dialogcontent;
 var dialogbar;
 var dialogmask;
 DLGRESULT = null;  // Set this as soon as possible to avoid a background polling function reading a previously set value

 if(!isDef(type)) {type = 'error';}
// if(!isDef(width)) {width = 0;}
// if(!isDef(height)) {height = 0;}
 if(!isDef(autohide)) {autohide = false;}
 if(!isDef(atcursor)) {atcursor = false;}
 if(!isDef(buttons)) {buttons = 0;}
 if(!isDef(modal)) {modal = true;}

 switch (buttons)
 {
  case 1: button1 = 'Ok'; break;
  case 2: button1 = 'Yes'; button2 = 'No'; break;
  case 3: button1 = 'Accept'; button2 = 'Cancel'; break;
  case 4: if (!isDef(button1)) {button1 = 'Ok'; buttons = 1;} if (!isDef(button2)) {buttons = 1;} break;  // Accepts a single user-defined button, (defaults to "Ok")
  default: button1 = 'Yes'; button2 = 'No'; break;
 }
 
 
 if (!el('dialog')) 
 {
  dialog = document.createElement('div');
  dialog.id = 'dialog';
  dialogheader = document.createElement('div');
  dialogheader.id = 'dialog_header';
  dialogtitle = document.createElement('div');
  dialogtitle.id = 'dialog_title';
  dialogclose = document.createElement('div');
  dialogclose.id = 'dialog_close'
  dialogbody = document.createElement('div');
  dialogbody.id = 'dialog_body';
  dialogcontent = document.createElement('div');
  dialogcontent.id = 'dialog_content';
  dialogbar = document.createElement('div');
  dialogbar.id = 'dialog_bar';
  dialogmask = document.createElement('iframe');  // Fix for IE bug not overlaying <select> tags
  dialogmask.id = 'dialog_mask';
  dialogmask.style.display = 'none';  // Hide the mask before appending it to prevent flicker
  document.body.appendChild(dialogmask);
  document.body.appendChild(dialog);
  dialog.appendChild(dialogheader);
  dialogheader.appendChild(dialogtitle);
  dialogheader.appendChild(dialogclose);
  dialog.appendChild(dialogbody);
  dialogbody.appendChild(dialogcontent);
  dialogbody.appendChild(dialogbar);

  dialogclose.setAttribute('onclick','hideDialog()');
  dialogclose.onclick = hideDialog;

  dialogmask.setAttribute('frameborder', 0);
  var doc = dialogmask.contentDocument || dialogmask.contentWindow.document;
  doc.open();
  doc.writeln('<html><head></head><body style="margin: 0px"></body></html>');  // Create some mask content so that it can support an onclick event handler
  doc.close();
  doc.body.onclick = hideDialog;
  
  if (MASKCOLOR == '') MASKCOLOR = '#FFFFFF';  // Set default Dialog Mask background color to #FFFFFF
 }
 else 
 {
  dialog = el('dialog');
  dialogheader = el('dialog_header');
  dialogtitle = el('dialog_title');
  dialogclose = el('dialog_close');
  dialogbody = el('dialog_body');
  dialogcontent = el('dialog_content');
  dialogbar = el('dialog_bar');
  dialogmask = el('dialog_mask');
  dialog.style.visibility = "visible";
 }

 if (modal) dialogmask.style.display = 'block';

 dialogbar.style.display = ((buttons>0)?'block':'none');
 
 dialog.style.opacity = .00;
 dialog.style.filter = 'alpha(opacity=0)';
 dialog.alpha = 0;

 var content = el(WRAPPER);
 if (!isDef(content)) // WRAPPER should contain a valid id of a div or similar element which contains the page content
 {
  var docElem = document.documentElement;
  var docBody = document.body;
  content = ((docElem.clientHeight) ? docElem : docBody);
 }  
  
 dialog.className = type + "border";

 dialogheader.className = type + "header";
 dialogtitle.innerHTML = title;

 dialogbody.className = type + 'body';

 dialogbar.className = type + "border";
 
 dialogcontent.innerHTML = message;
 if (type == 'message') dialogcontent.style.overflow = 'auto';

 if (buttons > 0)
 {
  if (buttons == 1) {dialogbar.style.textAlign = 'center';}
  else {dialogbar.style.textAlign = 'right';}
  dialogbar.innerHTML = '<button type="button" onclick="hideDialog(1);">'+button1+'</button>';
  if (buttons > 1) dialogbar.innerHTML += '&nbsp;&nbsp;<button type="button" onclick="hideDialog(2);">'+button2+'</button>';
 }

 if (!isDef(width) || (isIE && width == 0)) dialog.style.width = DEFAULT_WIDTH + 'px';  // default setting (IE auto doesn't work so set to default)
 else
 {
  if (width == 0) dialog.style.width = 'auto';  // auto setting
  else dialog.style.width = width + 'px';
 } 

 if (!isDef(height) || (isIE && height == 0))  // default setting (IE auto doesn't work so set to default)
 {
  dialogcontent.style.height = DEFAULT_CONTENT_HEIGHT + 'px';
  dialog.style.height = (getHeight(dialogheader) + DEFAULT_CONTENT_HEIGHT + (isIE?0:13) + getHeight(dialogbar)) + 'px';  // + 2 * 6px content padding + 2 * 1px bar border
 } 
 else
 {
  if (height == 0)  // auto setting
  {
   dialogcontent.style.height = 'auto';
   dialog.style.height = 'auto';
  } 
  else
  {
   dialogcontent.style.height = (height - getHeight(dialogheader) - getHeight(dialogbar)) + 'px';
   dialog.style.height = (height + (isIE?0:13)) + 'px';  // + 2 * 6px content padding + 1px bar border
  } 
 } 

 var dialogtop, dialogleft;
 var contentwidth = getWidth(content), contentheight = getHeight(content);
 var dialogwidth = getWidth(dialog), dialogheight = getHeight(dialog);
 var scrollPos = getScrollPos();

 if (atcursor)
 {
  dialogtop = MouseMv.Y;   // Absolute to scrolled page
  dialogleft = MouseMv.X;  // Absolute to scrolled page

  if (!isIE)
  {
   dialogtop -= scrollPos.y;   // Relative to scrolled page
   dialogleft -= scrollPos.x;  // Relative to scrolled page
  }
 }
 else
 {
  dialogtop = ((contentheight - dialogheight) / 2);  // Position in center of WRAPPER
  dialogleft = ((contentwidth - dialogwidth) / 2);
 }
 
 if ((dialogtop + dialogheight) > contentheight - 2) dialogtop = contentheight - dialogheight - 2;  // Prevent dialog from being clipped by content bottom border
 if ((dialogleft + dialogwidth) > contentwidth - 2) dialogleft = contentwidth - dialogwidth - 2;    // Prevent dialog from being clipped by content right border
 dialogtop += scrollPos.y;
 dialogleft += scrollPos.x;

 dialog.style.top =  dialogtop + 'px';
 dialog.style.left = dialogleft + 'px';

 if (modal)
 {
  var scrollSize = getScrollSize();

  dialogmask.style.height = scrollSize.y + 'px';  
  dialogmask.style.width = scrollSize.x + 'px';   
  var doc = dialogmask.contentDocument || dialogmask.contentWindow.document;
  doc.body.style.height = dialogmask.style.height;  // Resize dialog mask body to full height of window so that it will capture an onclick event
  doc.body.style.backgroundColor = MASKCOLOR;
 }
 
 dialog.timer = setInterval("fadeDialog(1)", TIMER);

 if(autohide) 
 {
//  dialogclose.style.visibility = "hidden";
  window.setTimeout("hideDialog()", (autohide * 1000));
 }
// else {dialogclose.style.visibility = "visible";}
}

// hide the dialog box //
function hideDialog(buttonId)
{
 var dialog = el('dialog');
 if (!isDef(buttonId)) buttonId = 0;
 DLGRESULT = buttonId;
 if (ALLOWHIDE || buttonId >= 1)  // In some browsers buttonId is passed to the "hideDialog()" function with the onclick event value, otherwise it will default to 0
 {
 clearInterval(dialog.timer);
 dialog.timer = setInterval("fadeDialog(0)", TIMER);
 }
}

// fade-in the dialog box //
function fadeDialog(flag) 
{
 var dialog = el('dialog');
 var value;

 if (!isDef(flag)) {flag = 1;}
 
 if(flag == 1) {value = dialog.alpha + SPEED;} 
 else {value = dialog.alpha - SPEED;}
 
 dialog.alpha = value;
 dialog.style.opacity = (value / 100);
 dialog.style.filter = 'alpha(opacity=' + value + ')';

 if(value >= 99) 
 {
  clearInterval(dialog.timer);
  dialog.timer = null;
 } 
 else if(value <= 1) 
 {
  dialog.style.visibility = "hidden";
  if (el('dialog_mask')) el('dialog_mask').style.display = 'none';
  clearInterval(dialog.timer);
 }
}*/
