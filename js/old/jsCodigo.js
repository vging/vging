/* Globales */
var strProcesando = '<label style="color: #FFF; background-color: #CC4444; font-family: Arial; font-size: 11px; padding: 1px 5px; margin: 5px;">Cargando</label>';
var ie = document.all?1:0;
var ieVersion=/*@cc_on function(){ switch(@_jscript_version){ case 1.0:return 3; case 3.0:return 4; case 5.0:return 5; case 5.1:return 5; case 5.5:return 5.5; case 5.6:return 6; case 5.7:return 7; case 5.8:return 8; }}()||@*/0;
if( /MSIE 6.0/i.test( navigator.userAgent ) ){ ieVersion = 6; }
/* Fin Globales */

/* Funciones Genericas */
function efectosVisuales(){
try{
	if( ie && document.documentMode <= 7 ){
		var inputs = document.getElementsByTagName( 'input' );
		for( var i = 0; i< inputs.length; i++ ){
			if( inputs[ i ].type == 'text' || inputs[ i ].type == 'password' ){
			
				if( inputs[ i ].className == '' )
					inputs[ i ].className = 'txtNormal';
					
				nuevoEvento( inputs[ i ], 'focus', function(){
															var objInput__ = nodoEvento( inputs[ i ] );
															if( objInput__.type == 'text' || objInput__.type == 'password' )
																objInput__.style.border = 'solid 1px #4D90FE';
															/*if( nodoEvento( inputs[ i ] ).style.backgroundColor != '' )
																window.colorActualInputText = nodoEvento( inputs[ i ] ).style.backgroundColor
															else
																window.colorActualInputText = '';
															cambiarColor( nodoEvento( inputs[ i ] ), '#FAFFBD' );*/
															} );
															
				nuevoEvento( inputs[ i ], 'blur', function(){
															var objInput__ = nodoEvento( inputs[ i ] );
															if( objInput__.type == 'text' || objInput__.type == 'password' )
																objInput__.style.border = 'solid 1px #C0C0C0';
															/*if( window.colorActualInputText != '' && window.colorActualInputText.toUpperCase() != '#FAFFBD' ) 
																cambiarColor( nodoEvento( inputs[ i ] ), window.colorActualInputText );
															else
																cambiarColor( nodoEvento( inputs[ i ] ), '' );
															window.colorActualInputText = '';*/
															} );
															
				nuevoEvento( inputs[ i ], 'mouseover', function(){
															var objInput__ = nodoEvento( inputs[ i ] );
															if( objInput__.type == 'text' || objInput__.type == 'password' ){
																if( !( objInput__.style.border.toUpperCase().indexOf( '4D90FE' ) >= 0 ) )
																	nodoEvento( inputs[ i ] ).style.border = 'solid 1px #A0A0A0';
															}	
															} );
															
				nuevoEvento( inputs[ i ], 'mouseout', function(){
															var objInput__ = nodoEvento( inputs[ i ] );
															if( objInput__.type == 'text' || objInput__.type == 'password' ){
																if( !( objInput__.style.border.toUpperCase().indexOf( '4D90FE' ) >= 0 ) )
																	nodoEvento( inputs[ i ] ).style.border = 'solid 1px #C0C0C0';
															}
															} );
				//inputs[ i ].onfocus = function(){ cambiarColor( nodoEvento( inputs[ i ] ), '#FAFFBD' ); };
				//inputs[ i ].onblur = function(){ cambiarColor( nodoEvento( inputs[ i ] ), '' ); };
			}
		}
	}
}catch( ex ){ alert( 'Error interno(jsCodigo)[efectosVisuales()]: ' + ex.message ); }
}

function nodoEvento( e ){
	if( ie )
		return event.srcElement; // Internet explorer
	else
		return e.target; // Navegadores Estandard
}

function nuevoEvento( elemento, evento, funcion ){
try{
	if ( elemento.addEventListener )
		elemento.addEventListener( evento, funcion, false );
	else
		elemento.attachEvent( 'on'+evento, funcion );
}catch( ex ){ alert( 'Error interno(js)[nuevoEvento(parms)]: ' + ex.message ); }
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
			opening.style.height = alto + 'px';
    
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
}catch( ex ){ alert( 'Error interno(jsCodigo)[animate(parms)]: ' + ex.message ); }
}

function cortina( strBtn, strDiv, alto, strImg, srcExpandir, srcContraer, fn ){
try{
	var div		  = document.getElementById( strDiv ), btn = document.getElementById( strBtn );
	if( !div ){
		alert( 'Lo lamentamos, no es posible desplegar la animaci\xf3n' );
		return;
	}
	
	var idAbierto = '', idCerrado = strDiv, flag = ( div.style.display == 'block' || div.style.display == 'inline' )?false:true;
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
}catch( ex ){ alert( 'Error interno(jsCodigo)[cortina(parms)]: ' + ex.message ); }
}

function stopRKey( evt ){
	var evt = ( evt ) ? evt : ( ( event ) ? event : null );
	var node = ( evt.target ) ? evt.target : ( ( evt.srcElement ) ? evt.srcElement : null );
	if( ( evt.keyCode == 13 ) && ( node.type== 'text' ) ){ 
		return false;
	}
}

function colocarFoco( c ){
try{
	if( typeof( c ) == 'string' )
		document.getElementById( c ).focus();
	else if( typeof( c ) == 'object' )
		c.focus();
}catch( ex ){}
}

function mostrarDiv( flag, strComp, strCompFocus){
try{
	if (document.getElementById(strComp) != null) {
		if (true == flag) {
			document.getElementById(strComp).style.display = 'block';
			if (document.getElementById(strCompFocus) != null){ 
				try{
					document.getElementById(strCompFocus).focus();
				}catch( ex1 ){}
			}
		}
		else 
			document.getElementById(strComp).style.display = 'none';
	}else
		return false;
}catch( ex ){ alert( 'Error interno(generico.js)[mostrarDiv(parms)]: ' + ex.message ); }
}

function cambiarColor( c, color ){
try{
	if( typeof( c ) == 'string' ){
		document.getElementById( c ).style.backgroundColor = color;
	}
	else if( typeof( c ) == 'object' ){
		c.style.backgroundColor = color;
	}	
}catch( ex ){ alert( 'Error interno(js)[cambiarColor(parms)]: ' + ex.message ); }
//c.style["background-color"] = color;
}

//prototipos
String.prototype.trim = function(){
	return this.replace(/^\s+|\s+$/g,"");
}

nuevoEvento( window, 'load', function(){ efectosVisuales(); } );
document.onkeypress = stopRKey; 