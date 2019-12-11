//---Globales
var strProcesando = '<label style="color: #FFF; background-color: #CC4444; font-family: Arial; font-size: 11px; padding: 1px 5px; margin: 5px;">Cargando</label>';
var ie = document.all?1:0;
var ieVersion=/*@cc_on function(){ switch(@_jscript_version){ case 1.0:return 3; case 3.0:return 4; case 5.0:return 5; case 5.1:return 5; case 5.5:return 5.5; case 5.6:return 6; case 5.7:return 7; case 5.8:return 8; }}()||@*/0;
if( /MSIE 6.0/i.test( navigator.userAgent ) ){ ieVersion = 6; }

var varGbl = {
    uiLbPuesto:         {
                            strId:          'ctl00_Principal_uiLbPuesto', 
                            strIdPuesto:    'ctl00_Principal_uiDivPuesto',
                            strIdUsr:       'ctl00_Principal_uiDivUsr',
                            strCssMasc:     'btnCircularSinSombra2 btnCircular40x40 floatRight tooltipX sinOutLine btnGris'
                        },
                        
    uiHiddenFuncion:    { strId: 'ctl00_Principal_uiHiddenFunJs', strIdParms: 'ctl00_Principal_uiHiddenParms' },
    
    uiDivPrePostBack:   {   strId: 'ctl00_Principal_uiDivPrePostBack', strIdTextoPlanoV0: 'ctl00_Principal_uiDivTextoPlanoV0', 
                            strIdBuscandoCub: 'ctl00_Principal_uiDivBuscandoCub', 
                            strIdBook: 'ctl00_Principal_uiDivBook',
                            strIdSimpleLoader: 'ctl00_Principal_uiDivSimpleLoader'
                             },
    
    uiMensajeGlobal:    {
                            strId:          'ctl00_Principal_uiMensajeGlobal',
                            strMsjErrnoMismoTramiteYetapa:
                                            'Debe seleccionar expedientes con el mismo <b class="normalAzul">Tipo de Tramite</b> y <b class="normalAzul">Etapa Actual</b>'
                        },
                        
    riesgo:	            [
				            INVALIDEZ =		{ item: 'INVALIDEZ',    value: 'I' },
                            VEJEZ =			{ item: 'VEJEZ',        value: 'V' },
                            SOBREVIVENCIA = { item: 'SOBREVIVENCIA',value: 'S' },
                            CONTRIBUCION =	{ item: 'CONTRIBUCION', value: 'CV' }
			            ],
    progrm:             [
                            REGIMEN =		{ item: 'REGIMEN',      value: '1' },
                            PLAN =			{ item: 'PLAN',         value: '2' }  
			            ],
    tipoTramite:
                        [
                            NUEVO =		    { item: 'Nuevo',        value: '1', inicial: 'N', nombreCortoPriMay: 'Nue' },
                            SOLICITUD =	    { item: 'Solicitud',    value: '2', inicial: 'S', nombreCortoPriMay: 'Sol' },
                            DESPACHO =	    { item: 'Devolución',   value: '3', inicial: 'D', nombreCortoPriMay: 'Dev' },
			            ]
    /*, strIdHiddenFunJs:   'ctl00_Principal_uiHiddenFunJs',
    strIdHiddenParms:   'ctl00_Principal_uiHiddenParms',
    progrms:            [ "REGIMEN", "PLAN" ],
	car = {type:"Fiat", model:"500", color:"white"}*/
};

var deviceAgent = navigator.userAgent.toLowerCase();

var isTouchDevice = ('ontouchstart' in document.documentElement) || 
(deviceAgent.match(/(iphone|ipod|ipad)/) ||
deviceAgent.match(/(android)/)  || 
deviceAgent.match(/(iemobile)/) || 
deviceAgent.match(/iphone/i) || 
deviceAgent.match(/ipad/i) || 
deviceAgent.match(/ipod/i) || 
deviceAgent.match(/blackberry/i) || 
deviceAgent.match(/bada/i));

//--- Elementales

function _$(strNombre)
{
    return document.getElementById(strNombre);
}

function noExisto(str$obj)
{
    //var obj = (typeof str$obj === 'string' || str$obj instanceof String) ? _$( str$obj ) : str$obj;
    alert( "Componente no existe: '" + str$obj + "'" );
}

function disabled( uiHtml, flag )
{
    var obj = (typeof uiHtml === 'string' || uiHtml instanceof String) ? _$( uiHtml ) : uiHtml;
    var strId = '';
    if( !obj ) return strId;
    
    var campos = obj.getElementsByTagName( '*' );
	
    for(var i = 0; i < campos.length; i++)
    {
        if( campos[ i ].tagName.toLowerCase() == 'a' )
        {
            if( flag )
            {
                campos[ i ].setAttribute( 'onclickTmp', campos[ i ].getAttribute( 'onclick' ) );
                campos[ i ].setAttribute( 'hrefTmp', campos[ i ].getAttribute( 'href' ) );
                campos[ i ].setAttribute( 'onclick', 'return false;' );
                campos[ i ].setAttribute( 'href', 'javascript: void(0);' );
            }
            else
            {
                campos[ i ].setAttribute( 'onclick', campos[ i ].getAttribute( 'onclickTmp' ) );
                campos[ i ].setAttribute( 'href', campos[ i ].getAttribute( 'hrefTmp' ) );
                campos[ i ].setAttribute( 'onclickTmp', '' );
                campos[ i ].setAttribute( 'hrefTmp', '' );
            }
        }

        if( campos[ i ].hasAttribute( 'disabled' ) )
            campos[ i ].disabled = flag;
        else
            campos[ i ].setAttribute( 'disabled', flag );
        
        if( campos[ i ].hasAttribute( 'readOnly' ) )
            campos[ i ].readOnly = flag;
        else
            campos[ i ].setAttribute( 'readOnly', flag );
  
        strId += ';' + ( null == campos[ i ] || undefined == campos[ i ].id ) ? '{empty}' : campos[ i ].id ; 
    }
    return strId;
}

function setFocus( strObj, flagCursorAlFinal )
{
    var obj = (typeof strObj === 'string' || strObj instanceof String) ? _$(strObj) : strObj;
    if(!obj) return;
    try
    {
       	obj.focus();
		
		if(flagCursorAlFinal)
		{
			var strVal = obj.value; //store the value of the element
			obj.value = ''; //clear the value of the element
			obj.value = strVal;
		}
    }catch( ex0 ){ alert( "Error interno(jsBase)[setFocus( " + strObj + " )]: " + ex0.message ); }
}

function colocarTitle( strObj, strTexto ){
try{
	var obj = _$( strObj );
	if( obj )
		obj.title = strTexto;
	else
		alert( 'Error interno(jsBase)[colocarTitle(parms)]: No existe el objeto "' + strObj + '"' );
}catch( ex ){ alert( 'Error interno(jsBase)[colocarTitle(parms)]: ' + ex.message ); }
}

function colocarClass( strObj, clase ){
try{
	var obj = _$( strObj );
	if( obj )
		obj.className = clase;
	else
		alert( 'Error interno(jsBase)[colocarClass(parms)]: No existe el objeto "' + strObj + '"' );
}catch( ex ){ alert( 'Error interno(jsBase)[colocarClass(parms)]: ' + ex.message ); }
}

function colocarAtributo( strObj, atributo, valor ){
try{
	var obj = _$( strObj );
	if( obj )
		obj.setAttribute( atributo, valor );
	else
		alert( 'Error interno(jsBase)[colocarAtributo(parms)]: No existe el objeto "' + strObj + '"' );
}catch( ex ){ alert( 'Error interno(jsBase)[colocarAtributo(parms)]: ' + ex.message ); }
}

//--- Prototipos
Element.prototype.remove = function() {
    this.parentElement.removeChild(this);
}

NodeList.prototype.remove = HTMLCollection.prototype.remove = function() {
    for(var i = this.length - 1; i >= 0; i--) {
        if(this[i] && this[i].parentElement) {
            this[i].parentElement.removeChild(this[i]);
        }
    }
}

String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};

String.prototype.setCharAt = function(index, chr) {
    var str = this;
    
    if (index > str.length - 1) return str;
    return str.substr(0, index) + chr + str.substr(index + 1);
};

String.prototype.isEmpty = function() {
    return (this.length === 0 || !this.trim());
};

//--- Funciones is
function isBlank(str) {
    return (!str || /^\s*$/.test(str));
}

function isEmpty(str) {
    return (!str || 0 === str.length);
}

//--- Validaciones
function validaSoloNumeros(cadena){
    var patron = /^\d*$/;
    if(!cadena.search(patron))
      return true;
    else
      return false;
}

function validaSoloTexto(cadena){
  var patron = /^[a-zA-Z]*$/;
  // En caso de querer validar cadenas con espacios usar: /^[a-zA-Z\s]*$/
  if(!cadena.search(patron))
    return true;
  else
    return false;
}

//--- Texto
function setText(strObj, strMsj)
{
    var flag = false;
    var obj = (typeof strObj === 'string' || strObj instanceof String) ? _$(strObj) : strObj;
	if( !obj ){ alert( 'No puedo hacer setText sobre "' + strObj + '"' ); return; }
    var tagName = obj.tagName.toLowerCase();
    
    if( !obj ) return false;
    
    if( tagName === 'div' || tagName === 'span' || tagName === 'label' )
    {
        obj.innerHTML = strMsj; flag = true;
    }
    else if( tagName === 'input' || tagName === 'textarea' )
    {
        obj.value = strMsj; flag = true;
    }
    else
    {
        flag = false;
        alert( 'Aviso interno(jsBase)[setText(parms: { strObj: "' + strObj + '", strMsj: "' + strMsj + '" } ) ]: tagName "' + obj.tagName + '" no reconocido.' );
    }
    return flag;
}

function getText(strObj)
{
    var strMsj = '';
    var obj = (typeof strObj === 'string' || strObj instanceof String) ? _$(strObj) : strObj;
    var tagName = obj.tagName.toLowerCase();
    
    if( tagName === 'div' || tagName === 'span' || tagName === 'label' )
        strMsj = obj.innerHTML;
    else if( tagName === 'input' )
        strMsj = obj.value;
	else
        strMsj = obj.value;
        
    return strMsj;
}

//--- Mostrar/Ocultar
function moPanel( strNombre, strDisplay )
{
    var obj = _$( strNombre );
    if( !obj ) return;
    
    obj.style.display = ( obj.style.display.indexOf( 'none' ) >= 0 ) ? strDisplay : 'none';
}

function cambiarDisplay(strObj, strDisplay)
{
    var obj = (typeof strObj === 'string' || strObj instanceof String) ? _$(strObj) : strObj;
    if(!obj) return;
    
    obj.style.display = strDisplay;
}

function cambiarVisibility(strObj, strVisibility)
{
    var obj = (typeof strObj === 'string' || strObj instanceof String) ? _$(strObj) : strObj;
    if(!obj) return;
    
    obj.style.visibility = strVisibility;
}

function mostrarDiv(flag, strDiv, strCss )
{
    var obj = _$( strDiv );
    
    if( typeof addCss === 'function' && strCss !== undefined )
    {
        if( obj )
        {
            if( flag )
                addCss( obj, strCss );
            else
                remCss( obj, strCss );
                //addCss( obj, strCss );
        }
    }
    else
    {
        if( obj )
            obj.style.display = ( flag ) ? 'block' : 'none';
    }
}

//--- Eventos
function nuevoEvento( elemento, evento, funcion )
{
try{
	if ( elemento.addEventListener )
		elemento.addEventListener( evento, funcion, false );
	else
		elemento.attachEvent( 'on' + evento, funcion );
}catch( ex ){ alert( 'Error interno(jsBase)[nuevoEvento(parms)]: ' + ex.message ); }
}

function agregarEvento( elemento, evento, funcion ){
    try{
        if ( elemento.addEventListener )
            elemento.addEventListener( evento, funcion, false );
        else
            elemento.attachEvent( 'on' + evento, funcion );
    }catch( ex ){ alert( 'Error interno(js)[agregarEvento(parms)]: ' + ex.message ); }
}

//--- Select
/*function optionSel( strSelect, flagText ){
try{
	var objSelect = document.getElementById( strSelect );
	if( objSelect )
	{
	    if( undefined == flagText || false == flagText )
		    return objSelect.options[ objSelect.options.selectedIndex ].value;
		else
		    return objSelect.options[ objSelect.options.selectedIndex ].text;
    }
	else return null;
}catch( ex ){ alert( 'Error interno(jsBase)[optionSel(parms)]: ' + ex.message ); }
}*/

function optionSel( strSelect, flagText, atributo ){
try{
	var objSelect = document.getElementById( strSelect );
	if( objSelect ) {
	    if( undefined == atributo ) {
	        if( undefined == flagText || false == flagText )
		        return objSelect.options[ objSelect.options.selectedIndex ].value;
		    else
		        return objSelect.options[ objSelect.options.selectedIndex ].text;
		} else {
		    return objSelect.options[ objSelect.options.selectedIndex ].getAttribute( atributo );
		}
    }
	else return null;
}catch( ex ){ alert( 'Error interno(jsBase)[optionSel(parms)]: ' + ex.message ); }
}

function selOption( strSelect, indice, disabled ){
try{
	var objSelect = document.getElementById( strSelect );
	if( objSelect ){
		try{
			objSelect.options[ indice ].selected = true;
			if( disabled != undefined )
				objSelect.disabled = disabled;
			return true;
		}catch( ex1 ){ return false; }
	}
	return false;
}catch( ex ){ alert( 'Error interno(jsBase)[selOption(parms)]: ' + ex.message ); }
}

function selOptionPorValue( strSelect, value, disabled ){
try{
	var objSelect = document.getElementById( strSelect ), flag = false;
	if( objSelect ){
		try{
			var tam = objSelect.length;
			for( var i = 0; i < tam; i++ ){
				if( objSelect.options[ i ].value == value ){
					objSelect.options[ i ].selected = flag = true;
					break;
				}
			}
			
			if( disabled != undefined )
				objSelect.disabled = disabled;
			return flag;
		}catch( ex1 ){ return false; }
	}
	return false;
}catch( ex ){ alert( 'Error interno(jsBase)[selOptionPorValue(parms)]: ' + ex.message ); }
}

function addItem( strSlct, Text, Value, flag )
{
    var opt = document.createElement( 'option' );
    document.getElementById( strSlct ).options.add(opt);
    opt.text = Text;
    opt.value = Value;
    if( flag ) opt.selected = true;
}

//--- Cookies        
function createCookie( name, value, days )
{
	var expires = null;
	
    if( days ) {
        var date = new Date();
        date.setTime( date.getTime() + ( days * 24 * 60 * 60 * 1000 ) );
        expires = "; expires=" + date.toGMTString();
    } else 
		expires = "";
	
    document.cookie = name + "=" + value + expires + "; path=/";
}

function readCookie( name )
{
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

function eraseCookie( name )
{
    createCookie (name, "", -1 );
}

//--- Css
function setCss(strObj, strClass)
{
    var obj = (typeof strObj === 'string' || strObj instanceof String) ? _$(strObj) : strObj;
    obj.className = strClass;
}

function addCss(element, classToAdd) {
    var currentClassValue = element.className;
      
    if (currentClassValue.indexOf(classToAdd) == -1) {
        if ((currentClassValue == null) || (currentClassValue === "")) {
            element.className = classToAdd;
        } else {
            element.className += " " + classToAdd;
        }
    }
}
 
function remCss(element, classToRemove) {
    var currentClassValue = element.className;
 
    if (currentClassValue == classToRemove) {
        element.className = "";
        return;
    }
 
    var classValues = currentClassValue.split(" ");
    var filteredList = [];
 
    for (var i = 0 ; i < classValues.length; i++) {
        if (classToRemove != classValues[i]) {
            filteredList.push(classValues[i]);
        }
    }
 
    element.className = filteredList.join(" ");
}

//--- Animación
var TimeToSlide = 250.0;
var ContentHeight = 200;

function cortina( strBtn, strDiv, alto, strImg, srcExpandir, srcContraer, fn ){
try{
	var div		  = document.getElementById( strDiv ), btn = document.getElementById( strBtn );
	if( !div ){
		alert( 'Lo lamentamos, no es posible desplegar la animaci\xf3n' );
		return;
	}
	var idAbierto = '', idCerrado = strDiv, flag = ( div.style.display == 'block' || div.style.display == 'inline' ) ? false : true;
	if( flag ){
		idAbierto	= idCerrado;
		idCerrado	= '';
	}
	if( btn ){
		if( flag )
			btn.className += ' divBotonToogleL';
		else
			btn.className = btn.className.replace( 'divBotonToogleL', '' );
	}
	setTimeout( "animate(" + new Date().getTime() + "," + TimeToSlide + ",'" + idCerrado + "', '" + idAbierto + "', " + alto + " )", 33 );
	
	if( !btn ) return;
	
	if( srcExpandir == undefined || srcContraer == undefined );
		//return;
	var src = ( flag )?srcContraer:srcExpandir;
	
	if( !cambiarImg( strImg, src ) ){
		//var flarr = ie ? '&nbsp;<font style="font-size: 8px" face=webdings>6</font>' : '&nbsp;&#x25BE;';
		//var flabj = ie ? '&nbsp;<font style="font-size: 8px" face=webdings>5</font>' : '&nbsp;&#x25B4;';
		//var flarr	= ie ? '&nbsp;<font style="font-size: 8px" face=webdings>6</font>':'&nbsp;<font style="font-size: 8px" face="webdings">6</font>';
		//var flabj	= ie ? '&nbsp;<font style="font-size: 8px" face=webdings>5</font>':'&nbsp;<font style="font-size: 8px" face="webdings">5</font>';
		var flarr	= ie ? '&nbsp;<font style="font-size: 8px" face=webdings>6</font>':'&#x25be;';
		var flabj	= ie ? '&nbsp;<font style="font-size: 8px" face=webdings>5</font>':'&#x25b4;';
		var ii		= btn.innerHTML;
		
		if( flag ){
			if( btn.innerHTML.toLowerCase().indexOf( flarr ) >= 0 )
				btn.innerHTML = ii.charAt( 0 ) + btn.innerHTML.toLowerCase().replace( flarr, flabj ).substring( 1 );
			else{
				if( ie )
					btn.innerHTML = ii + flabj;
				else
					btn.innerHTML = ii.substring( 0, ii.length - 1 ) + flabj;
					
			}
		}
		else{
			if( btn.innerHTML.toLowerCase().indexOf( flabj ) >= 0 )
				btn.innerHTML = ii.charAt( 0 ) + btn.innerHTML.toLowerCase().replace( flabj, flarr ).substring( 1 );
			else{
				if( ie )
					btn.innerHTML = ii + flarr;
				else
					btn.innerHTML = ii.substring( 0, ii.length - 1 ) + flarr;
			}
		}
	}
	if( fn ){
		if( flag )
			fn();
	}
}catch( ex ){ alert( 'Error interno(jsBase)[cortina(parms)]: ' + ex.message ); }
}

function animate( lastTick, timeLeft, closingId, openingId, alto ){
try{
	var alto = (alto)?alto:ContentHeight;
	var curTick = new Date().getTime();
	var elapsedTicks = curTick - lastTick;
	var opening = (openingId == '') ? null : document.getElementById( openingId );
	var closing = (closingId == '') ? null : document.getElementById( closingId );
 
	if(timeLeft <= elapsedTicks){
		if(opening != null)
		{
			opening.style.height = alto + 'px';
			
			if( alto >= 1500 )
			    opening.style.height = 'auto';
	    }
    
		if(closing != null){
			closing.style.display = 'none';
			closing.style.height = '0px';
		}
		return;
	}
 
	timeLeft -= elapsedTicks;
	var newClosedHeight = Math.round((timeLeft/TimeToSlide) * alto);
	
	if( opening != null ){
		if(opening.style.display != 'block')
			opening.style.display = 'block';
		opening.style.height = (alto - newClosedHeight) + 'px';
		//cambiarColor( opening, '#CC6600' );
	}
  
	if( closing != null ){
		closing.style.height = newClosedHeight + 'px';
		//cambiarColor( closing, '#1B2C85' );
	}

	setTimeout("animate(" + curTick + "," + timeLeft + ",'" + closingId + "','" + openingId + "', " + alto + ")", 33 );
}catch( ex ){ alert( 'Error interno(jsBase)[animate(parms)]: ' + ex.message ); }
}

//--- Cambio de src (imagenes)
function cambiarImg( strImg, src ){
try{
	var obj = document.getElementById( strImg );
	if( !obj ) return false;
	obj.src = src;
	return true;
}catch( ex ){ alert( 'Error interno(jsBase)[cambiarImg(parms)]: ' + ex.message ); }
}

//--- Table
function haySelVisEnTbl(str$objTbl)
{
    var objTbl = (typeof str$objTbl === 'string' || str$objTbl instanceof String) ? _$(str$objTbl) : str$objTbl;
    if( !objTbl) return -100;
    
    var a = objTbl.getElementsByTagName( 'INPUT' );
    if( !a ) return -1;
    
    var cont = 0;
    for( var i = 0; i < a.length; i++ )
    {
        var padre = '';
        try
        {
            padre = a[ i ].parentNode.parentNode.parentNode.tagName.toLowerCase();
            //alert( 'Mensaje (jsBase): ' + padre );
        }
        catch(ex0){ alert( 'Aviso interno(jsBase)[haySelVisEnTbl(parms: { str$objTbl: "' + str$objTbl + '" } ) ]: Hijo "' + a[ i ] + '" no tiene padre reconocido en parentNode(3)' ); padre = 'unk'; }
        
        //no tomar en cuenta encabezados
        if( a[ i ].type === 'checkbox' && a[ i ].checked && padre != 'th' )
                cont++;
    }
    //alert( 'cont(haySelVisEnTbl): ' + cont );
    return cont;
}

//--- Presentación (prePostBack)
function moPrePostBack( flag, strDivActivar, strMsj )
{
    var objMainDiv = _$( varGbl.uiDivPrePostBack.strId ); objMainDiv.style.display = 'none';
    var childNodes = objMainDiv.childNodes, i = childNodes.length;
    
    while(i--) 
    {
        if( childNodes[i] )
            if( childNodes[i].tagName )
                if( childNodes[i].tagName.toLowerCase() == 'div' 
                    || childNodes[i].tagName.toLowerCase() == 'span' )
                    childNodes[i].style.display = 'none';
    }
    objMainDiv.style.display = (flag) ? 'block' : 'none';
    mostrarDiv( flag, strDivActivar );
    
    if( strMsj )
        setText( strDivActivar, strMsj );
}

//--- Miscelánea
function callFuncsJsFromCodeBehind( strIdHiddenFunJs, strIdHiddenParms )
{
try{
    var strClear = "_$( '" + strIdHiddenFunJs + "' ).value = ''; _$( '" + strIdHiddenParms + "' ).value = '';";
    var objFunJs = _$( strIdHiddenFunJs );
    var objParms = _$( strIdHiddenParms );
    var myFunc = null, clearFunc = null;
    
    if(!objFunJs) return;
    
    if(!objFunJs.value.isEmpty())
    {
        //setTimeout( function(){ alert( "Hello" ); } );
        if(objParms.value.isEmpty())
            myFunc = setTimeout( objFunJs.value + "();" );
        else
            myFunc = setTimeout( objFunJs.value + "( " + objParms.value + " );" );
        //clearTimeout(myFunc);
        clearFunc = setTimeout( strClear, 500 );
        //clearTimeout(clearFunc);
    }
}catch( ex0 ){ alert( "Error interno(jsBase)[callFuncsJsFromCodeBehind( " + strIdHiddenFunJs + ", " + strIdHiddenParms + " )]: " + ex0.message ); }
}

function copyText(text){
  function selectElementText(element) {
    if (document.selection) {
      var range = document.body.createTextRange();
      range.moveToElementText(element);
      range.select();
    } else if (window.getSelection) {
      var range = document.createRange();
      range.selectNode(element);
      window.getSelection().removeAllRanges();
      window.getSelection().addRange(range);
    }
  }
  var element = document.createElement('DIV');
  element.textContent = text;
  document.body.appendChild(element);
  selectElementText(element);
  document.execCommand('copy');
  element.remove();
}

function getRandomInt( min, max ) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function toArray( a ) {
  var result = [];
  var i = a.length;
  while (i--) {
    result[ i ] = a[ i ];
  }
  return result;
}