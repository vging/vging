var idPagina = 1;
nuevoEvento( window, 'load', function(){ init(); esPagIni = true; } );

function init(){
try{
	nuevoEvento( _$( 'btnEntrar' ),		'click',	enviarMensajeListener );
	nuevoEvento( _$( 'btnEntrarEn' ),	'click',	enviarMensajeListener );
	nuevoEvento( _$( 'uiCbVerMapa' ),	'click',	moMapaListener );
	
	( function($) {
		$( function() {
    		$( "#scroller" ).simplyScroll( { direction: 'backwards',
												frameRate: 20,
												speed: 3,
												startOnLoad: false } );
		} );
	})( jQuery );
 
	$( '.dynamo' ).dynamo( { speed: 800, delay: 2000 } );
}catch( ex ){ alert( 'Error interno(jsInicio)[init()]: ' + ex.message ); }
}

function moMapaListener(){
try{
	moMapa();
}catch( ex ){ alert( 'Error interno(jsInicio)[moMapaListener()]: ' + ex.message ); }
}

function moMapa(){
try{
	mostrarDiv( true, 'lblAjax' );
	setText( 'lblAjax', 'Guardando' );
	
	var objAjax		= inicializa_xhr();
	
	var parametros 	= 'comn=map&idioma=todos&idPagina=1&llave=mapa&flag=' + _$( 'uiCbVerMapa' ).checked + '&nocache=' + Math.random();
	
	cargaContenido$( objAjax, '../../php/guardar/psGuardarCambios.php', 'POST',
					 function(){ _Ajax( objAjax, function(){ $moMapa( objAjax ) }, 'lblAjaxOculto' ) }, parametros );
	
}catch( ex ){ alert( 'Error interno(jsInicio)[moMapa(parms)]: ' + ex.message ); }
}

function $moMapa( objAjax ){
try{
	var objRes = null;
	mostrarDiv( false, 'loader' );
	setText( 'lblAjax', '' );
	
	try
	{
		objRes = JSON.parse( objAjax.responseText );
		if( objRes.error.errno == 0 ){
			if( objRes.estado == 'ok' )
			{
				mostrarDiv( true, 'lblAjax' );
				setText( 'lblAjax', 'Guardado' );
				setTimeout( "mostrarDiv( false, 'lblAjax' );", 5000 );
			} else
				showDialog( 'Aviso', 'No ha sido posible guardar la configuracion.<br/>' + objRes.error.descripcion, 'warning' );
		} else 
			showDialog( 'Aviso', 'No ha sido posible guardar la configuracion.<br/>' + objRes.error.descripcion, 'prompt_' );
	}catch( ex1 ){
		console.log( objAjax.responseText );
		if( objAjax.responseText.indexOf( 'iframe' ) >= 0 || objAjax.responseText.indexOf( 'false' ) >= 0 ) {
			mostrarDiv( true, 'lblAjax' );
			setText( 'lblAjax', 'Guardado' );
			setTimeout( "mostrarDiv( false, 'lblAjax' );", 5000 );
			if( objAjax.responseText.indexOf( 'iframe' ) >= 0 )
				setText( 'uiDivMapa', objAjax.responseText );
			else
				setText( 'uiDivMapa', '' );
		} else {
			showDialog( 'Error', 'JSON.parser<br/>' + objAjax.responseText, 'error' );
		}
	}	
}catch( ex ){ alert( 'Error interno(jsInicio)[$moMapa(parms)]: ' + ex.message ); }
}

function placeholderFrmEnvMsj( idioma ){
	//\xf3 = ó
	var pNom, pCorE, pTel, pMsj;
	switch( idioma ){
		case 'es-GT': pNom = 'Nombre | Empresa'; pCorE = 'Correo electr\xf3nico'; pTel = 'Tel\xe9fono (opcional)'; pMsj = 'Mensaje'; break;
		case 'en-EU': pNom = 'Your Name or Company'; pCorE = 'Replay to mail (anonymous)'; pTel = 'Phone number (opt)';  pMsj = 'Description'; break;
	}
	setInfoToTxtFloatLabel( 'NomEmp', pNom );
	setInfoToTxtFloatLabel( 'CorE', pCorE );
	setInfoToTxtFloatLabel( 'Tel', pTel );
	setInfoToTxtFloatLabel( 'Men', pMsj );
}

function validarCampos(){
try{
	var nombre = getText( 'uiTxtNomEmp' ), correo = getText( 'uiTxtCorE' ), telefono = getText( 'uiTxtTel' ), mensaje = getText( 'uiTxtMen' );
	if( nombre.isEmpty() || correo.isEmpty() )
		return null;
	
	return { "nom" : nombre, "correo" : correo, "tel" : telefono, "men" : mensaje };
	
}catch( ex ){ alert( 'Error interno(jsInicio)[validarCampos()]: ' + ex.message ); }
}

function enviarMensajeListener(){
try{
	var m;
	if( ( m = validarCampos() ) ){
		enviarMensaje( m );
	}
	else
	{
		var msj = 'Error', tit = 'Error' ;
		switch( optionSel( 'slctIdioma' ) ){
			case 'es-GT': tit = '¡Base! tenemos un problema'; msj = 'Al parecer uno o m&aacute;s campos son requeridos.'; break;
			case 'en-EU': tit = 'Houston!, we have a problem'; msj = 'One or more fields are required.'; break;
		}
		
		showDialog( tit, msj, 'error' );
	}
}catch( ex ){ alert( 'Error interno(jsInicio)[enviarMensajeListener()]: ' + ex.message ); }
}

function enviarMensaje( msj ){
try{
	mostrarDiv( true, 'loader' );
	
	var objAjax		= inicializa_xhr();
	
	var parametros 	= '&flag=env&nom=' + encodeURIComponent( msj.nom ) + '&rem=' + encodeURIComponent( msj.correo ) + 
						'&tel=' + encodeURIComponent( msj.tel ) + '&men=' + encodeURIComponent( msj.men ) +'&nocache=' + Math.random();
	
	cargaContenido$( objAjax, '../../php/mensaje.php', 'POST',
					 function(){ _Ajax( objAjax, function(){ $enviarMensaje( objAjax ) }, 'lblAjaxOculto' ) }, parametros );
	
}catch( ex ){ alert( 'Error interno(jsInicio)[enviarMensaje(parms)]: ' + ex.message ); }
}

function $enviarMensaje( objAjax ){
try{
	mostrarDiv( false, 'loader' );
	setText( 'lblAjax', '' );
	
	if( objAjax.responseText.indexOf( 'exito' ) >= 0 ){
		limpiarCampos();
		mostrarDiv( true, 'lblAjax' );
		setText( 'lblAjax', 'Mensaje enviado' );
		setTimeout( "mostrarDiv( false, 'lblAjax' );", 5000 );
		setFocus( 'uiTxtNombre' );
	}
	else
		swal( 'Error', 'No ha sido posible enviar el mensaje.<br/>' + objAjax.responseText, 'error' );
		
}catch( ex ){ alert( 'Error interno(jsInicio)[$enviarMensaje(parms)]: ' + ex.message ); }
}

function limpiarCampos(){
	//_$( 'formEnviarMensaje' ).reset();
	//_$( 'frmEnvMen' ).reset();
	setText( 'uiTxtNomEmp', '' ); setText( 'uiTxtCorE', '' ); setText( 'uiTxtTel', '' ); setText( 'uiTxtMen', '' );
}