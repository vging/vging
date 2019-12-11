var READY_STATE_UNINITIALIZED=0;
var READY_STATE_LOADING=1;
var READY_STATE_LOADED=2;
var READY_STATE_INTERACTIVE=3;
var READY_STATE_COMPLETE=4;

var peticion_http;
var FF = navigator.userAgent.toLowerCase().indexOf('firefox/') > -1;  
//var FF=/a/[-1]=='a', FF3=(function x(){})[-5]=='x', FF2=(function x(){})[-6]=='x';

function cargaContenido$( objAjax, url, metodo, funcion, query_string, estado ) {
	
	if( objAjax === null || objAjax === undefined )
		objAjax = inicializa_xhr();
	
	if( objAjax ){
		objAjax.onreadystatechange = funcion;
		
		if( estado == null ){
			objAjax.open( metodo.toUpperCase(), url, true );
		}
		else if( typeof( estado ) == 'boolean' ){
			objAjax.open( metodo.toUpperCase(), url, false );
		}
		if( metodo.toLowerCase() == 'post' ){
			objAjax.setRequestHeader( 'Content-Type', 'application/x-www-form-urlencoded' );
			//objAjax.setRequestHeader( 'Content-length', query_string.length );
			//objAjax.setRequestHeader( 'Connection', 'close' );
		}
		else if( metodo.toLowerCase() == 'get' ){
			//objAjax.overrideMimeType( 'text/xml' );
			query_string = null;
		}
		else{
			alert( 'Error interno(jsAjax): Metodo: \'' + metodo + '\' no definido' );
			return false;
		}
		objAjax.send( query_string );
		
		//if( ( FF || FF2 || FF3 ) && ( estado != null && false == estado ) ){
		if( FF && ( estado != null && false == estado ) ){
			//alert( 'ajax sincrono ff' );
			while( 1 ){
				if( objAjax.readyState == READY_STATE_COMPLETE && objAjax.status == 200 ){
					funcion();
					return true;
				}

				if( objAjax.readyState == READY_STATE_COMPLETE && objAjax.status != 200 )
					return false;

			}
		}
	}
}

function cargaContenido( url, metodo, funcion, query_string, estado ) {
	peticion_http = inicializa_xhr();
	
	if( peticion_http ){
		peticion_http.onreadystatechange = funcion;
		
		if( estado == null ){
			peticion_http.open( metodo.toUpperCase(), url, true );
		}
		else if( typeof( estado ) == 'boolean' ){
			peticion_http.open( metodo.toUpperCase(), url, false );
		}
		if( metodo.toLowerCase() == 'post' ){
			peticion_http.setRequestHeader( 'Content-Type', 'application/x-www-form-urlencoded' );
			//peticion_http.setRequestHeader( 'Content-length', query_string.length );
			//peticion_http.setRequestHeader( 'Connection', 'close' );
		}
		else if( metodo.toLowerCase() == 'get' ){
			//peticion_http.overrideMimeType( 'text/xml' );
			query_string = null;
		}
		else{
			alert( 'Error interno(jsAjax): Metodo: \'' + metodo + '\' no definido' );
			return false;
		}
		peticion_http.send( query_string );
		
		//if( ( FF || FF2 || FF3 ) && ( estado != null && false == estado ) ){
		if( FF && ( estado != null && false == estado ) ){
			//alert( 'ajax sincrono ff' );
			while( 1 ){
				if( peticion_http.readyState == READY_STATE_COMPLETE && peticion_http.status == 200 ){
					funcion();
					return true;
				}

				if( peticion_http.readyState == READY_STATE_COMPLETE && peticion_http.status != 200 )
					return false;

			}
		}
	}
}

function _Ajax( objAjax, funcion, contenedorProcesando, nombreCompMostrar, nombreCompFoco ){
try{
	if( objAjax.readyState == READY_STATE_LOADING ){
		mostrarDiv( false, nombreCompMostrar );
		if( contenedorProcesando == null || contenedorProcesando == undefined ){
			if( document.getElementById( 'divProcesando' ) ){
				mostrarMensajeI__( true, 'divProcesando', strProcesando );
			}
			else; //showDialog( 'Petici&oacute;n','Procesando...', 'success' );
		}
		else
			mostrarMensajeI__( true, contenedorProcesando, strProcesando );
	}
	else if( objAjax.readyState == READY_STATE_COMPLETE ){
		if( objAjax.status == 200 ){
			if( contenedorProcesando == null || contenedorProcesando == undefined ){
				if( document.getElementById( 'divProcesando' ) ){
					mostrarMensajeI__( true, 'divProcesando', '' );
				}
				else; //alert( 'Fin procesando. Ref: divProcesando no definido' );
			}
			else
				mostrarMensajeI__( true, contenedorProcesando, '' );
			funcion();
			mostrarDiv( true, nombreCompMostrar, nombreCompFoco );
			//nuevoCodigo
			if( objAjax.responseText.indexOf( 'El tiempo para efectuar las operaciones ha expirado' ) >= 0 ){
				opacar( true, 'main' );
				alert( 'El tiempo para efectuar las operaciones ha expirado.\nHaga clic en aceptar para continuar' );
				location.href = '../../inicio.php';
			}
			//fin nuevoCodigo
		}
		else{
			try{
				var m = '<label class=\"etiquetaErrorInternoAjax\">Fallo en comunicaci&oacute;n: <label class="etiquetaNormal" style="color: #666;"><label class="negrilla">' + objAjax.statusText+ '</label> (' + objAjax.status + ')</label></label>';
				if( contenedorProcesando == null || contenedorProcesando == undefined ){
					if( document.getElementById( 'divProcesando' ) )
						mostrarMensajeI__( true, 'divProcesando', m );
					else{
						//objAjax.getAllResponseHeaders()
						//showDialog( 'Error','<label class=\"etiquetaErrorInternoAjax\">Fallo en comunicaci&oacute;n: <label class="etiquetaNormal" style="color: #666;"><label class="negrilla">' + objAjax.statusText+ '</label> (' + objAjax.status + ')</label></label>', 'error' );
						//alert( 'Fallo en comunicaci\xf3n: ' + objAjax.status + ' ' + objAjax.statusText );
					}
				}
				else
					mostrarMensajeI__( true, contenedorProcesando, m );
			}catch( ex1 ){ }
		}
	}
}catch( ex ){ alert( 'Error interno(jsAjax)[_Ajax(parms)]: ' + ex.message ); }
}

function inicializa_xhr(){
	var xmlhttp;
 	try{
		xmlhttp = new ActiveXObject( 'Msxml2.XMLHTTP' );
 	}
	catch( e ){	
		try{//codigo para IE6, IE5
			xmlhttp = new ActiveXObject( 'Microsoft.XMLHTTP' );
 		}
		catch( E ){
 			xmlhttp = false;
 		}
  	}
	if( !xmlhttp && typeof XMLHttpRequest != 'undefined' ){
		//codigo para IE7+, Firefox, Chrome, Opera, Safari
 		xmlhttp = new XMLHttpRequest();
	}
	return xmlhttp;
}

function mostrarMensajeI__( flag, strObj, strMsj ){
try{
	var display = 'none', obj = document.getElementById( strObj );
	if( flag )
		display = 'inline';
	if( obj )
		obj.style.display = display;
	if( strMsj != undefined ){
		if( obj )
			obj.innerHTML = strMsj;
	}
}catch( ex ){ alert( 'Error interno(jsAjax)[mostrarMensajeI__(parms)]: ' + ex.message ); }
}