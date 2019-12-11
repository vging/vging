var esPagIni = false;
var zGbl_DOM_ChangeTimer = null;

function getStrCerrar( strDiv ) {
	return '<a href="javascript:mostrarDiv( false, \'' + strDiv + '\' );" class="btnLT tooltipX" style="display: inline-block;">'
			+ '<span class="icon-cross" style=" color: #000; font-size: 13px;"></span>'
			+ '<span class="tooltipX negrilla es-GT" style="width: 75px; top: 25px; left: 50px;">Cerrar</span>'
			+ '<span class="tooltipX negrilla en-EU" style="width: 75px; top: 25px; left: 40px;">Close</span></a>';
}

/* login */
function mainCerrarDivLogIn(){
	nuevoEvento( _$( 'uiTxtUsr' ), 		'keyup', function(event){ onkeyupLogin( event, true ); } );
	nuevoEvento( _$( 'uiTxtPss' ), 		'keyup', function(event){ onkeyupLogin( event ); } );
	nuevoEvento( _$( 'uiAncLogIn' ),	'click', function(){ login(); } );
	nuevoEvento( _$( 'uiAncSalir' ),	'click', function(){ salir( true ); $( '#uiDivLogin' ).hide(); } );
	nuevoEvento( _$( 'uiAncInfoUsuario' ),	'click', function(){ salir( true ); } );
	
	$( '#uiAncMenuLogin' ).click( function(){ cerrarDivLogIn(); } );
	$( '#uiCbVerPss' ).click( function(){ ergInpTypPss( 'uiTxtPss' ); } );
	
	$(document).keyup( function(event){
        if(event.which == 27)
            $( '#uiDivLogin' ).hide();
    });
	
	setText( 'uiTxtUsr', 'mvelasquez' );
	setText( 'uiTxtPss', 'admin4321' );
}

function cerrarDivLogIn()
{
	$( '#uiDivLogin' ).slideToggle();//slideUp();
	
	if($( '#uiDivLogin:visible' ).length > 0)
		setFocus( 'uiTxtUsr', true );
}

function ergInpTypPss(strId) {
	var idioma = optionSel( 'slctIdioma' );
	var strShow = '', strHide = '';
	
	switch( idioma ){
		case 'es-GT': strShow = 'Mostrar'; strHide = 'Ocultar'; break;
		case 'en-EU': strShow = 'Show'; strHide = 'Hide';  break;
	}
	
    var x = document.getElementById(strId);
    if( x.type === 'password' ) {
        x.type = "text";
		$( '#uiLblVerPss' ).text( strHide );
    } else {
        x.type = 'password';
		$( '#uiLblVerPss' ).text( strShow );
    }
}

function getUiTxt( strTxt, strCookie, flag )
{
	var strU = readCookie( strCookie );
	
	if( true == flag ) return strU;
	
	if( null == strU || strU.isEmpty() )
		strU = encodeURIComponent( getText( strTxt ) )
	return strU;
}

function login( flag ){
try{
	mostrarDiv( true, 'loader' );
	var usr = '', pss = '';
	
	usr = getUiTxt( 'uiTxtUsr', 'u', flag );
	pss = getUiTxt( 'uiTxtPss', 'p', flag );
	
	if( usr.isEmpty() || pss.isEmpty() )
	{
		mostrarDiv( true, 'lblAjax' );
		mostrarDiv( false, 'loader' );
		
		setText( 'lblAjax', 'Ingrese sus credenciales' );		
		setTimeout( "mostrarDiv( false, 'lblAjax' );", 5000 );
		setFocus( 'uiTxtUsr' );
		
		return;
	}

	var objAjax		= inicializa_xhr(), objCb = _$( 'uiCbCs' );
	var checked		= ( null == objCb ) ? true : objCb.checked;
	var parametros 	= 'u=' + usr + '&p=' + pss + '&rec=' + checked + '&nocache=' + Math.random();
	//alert( parametros );
	cargaContenido$( objAjax, '../../php/login/psValidarUsuario.php', 'POST',
					 function(){ _Ajax( objAjax, function(){ $login( objAjax, flag ) }, 'lblAjaxOculto' ) }, parametros );
	
}catch( ex ){ alert( 'Error interno(jsGen)[login(parms)]: ' + ex.message ); }
}

function $login( objAjax, flag ){
try{
	var objRes = null;
	mostrarDiv( false, 'loader' );
	setText( 'lblAjax', '' );
	
	try {
		objRes = JSON.parse( objAjax.responseText );
		if( objRes.error.errno == 0 ) {
			if( objRes.estado == 'ok' ){
				$( '#uiDivLogin' ).hide();
				mostrarDiv( true, 'lblAjax' );
				
				setText( 'uiTxtUsr', '' ); setText( 'uiTxtPss', '' ); 
				var strBn = 'Bienvenido';
				
				if( !objRes.resultado.rec ){	
					eraseCookie( 'u' );
					eraseCookie( 'p' );
				} else {
					if( undefined == flag )
						strBn += '. Credenciales guardadas';
					else if ( true == flag )
						strBn += '. Sesi\xf3n recuperada';
					//strBn += ( false == flag ) ? '. Credenciales guardadas' : '. Sesi\xf3n recuperada';
					
					mostrarDiv( true, 'uiDivInfoUsuario' );
					setText( 'uiSpanInfoUsuario', objRes.resultado.u );
					
					createCookie( 'u', objRes.resultado.u, 20 );
					createCookie( 'p', objRes.resultado.p, 20 );
				}
				createCookie( 'tok', objRes.resultado.tok, 20 );
				
				setText( 'lblAjax', strBn );
				setTimeout( "mostrarDiv( false, 'lblAjax' );", 3500 );
				
				var ind = getRandomInt( 0, 4 );
				var colPer = [ 'btnAzulNavy', 'btnGrisTierra', 'btnRosado', 'btnLila', 'btnGrisClaro' ];
				addCss( _$( 'uiAncInfoUsuario' ), colPer[ ind ] );
				
				/*if( idPagina == 4 )
					setContenidoEditable( true, actualizarPolaroidListener );
				else 
					setContenidoEditable( true, actualizarParListener );*/
				
				switch( idPagina ) {
					case 4:
						setContenidoEditable( true, actualizarPolaroidListener );
						break;
						
					case 7:
						setContenidoEditable( true, actualizarEquipoListener );
						break;
						
					default:
						setContenidoEditable( true, actualizarParListener );
						break;
				};
			}
		} else {
			var strRes = 'errno[' + objRes.error.errno + ']: ' + objRes.error.descripcion + '<br/>q: ' + objRes.error.q;
			strRes = 'Credenciales incorrectas';
			
			eraseCookie( 'u' );
			eraseCookie( 'p' );
			eraseCookie( 'tok' );
			
			//showDialog( 'Aviso', strRes, 'warning' );
			
			swal( {
				title: "Credenciales incorrectas",
				text: strRes,
				icon: "error",
				buttons: true,
				buttons: {
					ok: { 
						visible: true,
						text:	"Aceptar"
					}
				}
			} );
			
			mostrarDiv( false, 'uiDivInfoUsuario' );
		}
	}catch( ex1 ){ console.log( 'responseText: ' + objAjax.responseText + '; message:' + ex1.message ); }
}catch( ex ){ alert( 'Error interno(jsGen)[$login(parms)]: ' + ex.message ); }
}

function salir( flag )
{
	if( true == flag ) {
	   	mostrarDiv( true, 'lblAjax' );
		setText( 'lblAjax', 'Saliendo' );
	}
	
	eraseCookie( 'u' ); eraseCookie( 'p' ); eraseCookie( 'tok' );
	mostrarDiv( false, 'uiDivInfoUsuario' );
	
	if( true == flag ) {
		setTimeout( "mostrarDiv( false, 'lblAjax' );", 850 );
		setContenidoEditable( false, actualizarParListener );
	}
}

function setContenidoEditable( flag, listener ){
	$( '.js-contenido-editable' ).each( 
		function(){
			var objJQ = $(this);
			
			if( objJQ.attr( 'tipEleCon' ) ) {
				if( flag ) {
					if( objJQ.attr( 'tipEleCon' ) == 'checkbox' ) {
						//objJQ.removeClass( 'dn' );
						//objJQ.addClass( 'dib' );
						objJQ.show();
					}
				} else {
					if( objJQ.attr( 'tipEleCon' ) == 'checkbox' ) {
						//objJQ.removeClass( 'dib' );
						//objJQ.addClass( 'dn' );
						objJQ.hide();
					}
				}
			} else {
				objJQ.attr( 'contenteditable', flag );  
				if( true == flag )
					//setChangeListener( this, function(){ actualizarParListener( this ); } );
					//setChangeListener( this, actualizarParListener );
					setChangeListener( this, listener );
			}
	});
}

function setChangeListener( objCont, listener ){
	
	if( listener && objCont )
		jQuery( objCont ).bind( 'DOMSubtreeModified', function() { HandleDOM_ChangeWithDelay( objCont, listener, 5000 ); } );
	
	/*if( !objCont.onpaste ) {
		if( listener && objCont )
			//jQuery( objCont ).bind( 'DOMSubtreeModified', function(){ HandleDOM_ChangeWithDelay( objCont, function(){ listener( objCont ); } ); } );
			//jQuery( objCont ).bind( 'DOMSubtreeModified', function(){ setTimeout( listener, 5000, objCont ); } );
			jQuery( objCont ).bind( 'DOMSubtreeModified', function() { HandleDOM_ChangeWithDelay( objCont, listener, 5000 ); } );
	}*/
	
	/*if( !objCont.onpaste ) {
		if( listener && objCont ) {
			objCont.onpaste = function() { HandleDOM_ChangeWithDelay( objCont, listener, 10 ); }
		}
	}
	
	if( !objCont.oncopy ) {
		if( listener && objCont )
			objCont.oncopy = function() { HandleDOM_ChangeWithDelay( objCont, listener, 10 ); }
	}
	
	if( !objCont.oncut ) {
		if( listener && objCont )
			objCont.oncut = function() { HandleDOM_ChangeWithDelay( objCont, listener, 10 ); }
	}
	
	if( !objCont.ondelete ) {
		if( listener && objCont )
			objCont.ondelete = function() { HandleDOM_ChangeWithDelay( objCont, listener, 10 ); }
	}*/
}

function HandleDOM_ChangeWithDelay( objCont, listener, tiempo ) {
    if( typeof zGbl_DOM_ChangeTimer == 'number' ) {
        clearTimeout (zGbl_DOM_ChangeTimer);
        zGbl_DOM_ChangeTimer = '';
    }
    zGbl_DOM_ChangeTimer = setTimeout ( listener, tiempo, objCont );
}

/*function setChangeListener( objCont, listener, evt ) {
	//nuevoEvento( objCont, 'blur', listener );
	//nuevoEvento( objCont, 'keyup', listener );
	nuevoEvento( objCont, 'paste', listener );
	nuevoEvento( objCont, 'copy', listener );
	nuevoEvento( objCont, 'cut', listener );
	nuevoEvento( objCont, 'delete', listener );
	
	jQuery( objCont ).bind( 'DOMSubtreeModified', listener );
}*/

function actualizarParListener( obj ){
	var objJQ = $(obj);
	actualizarPar( objJQ );
}

function actualizarPar( objJQ ){
try{
	mostrarDiv( true, 'lblAjax' );
	setText( 'lblAjax', 'Guardando' );
	
	var objAjax		= inicializa_xhr();
	var parametros 	= 'comn=dic&idioma='+ optionSel( 'slctIdioma' ) + '&idPagina=' + objJQ.attr( 'idPagina' ) + '&llave=' + objJQ.attr( 'llave' ) + '&valor=' + encodeURIComponent( objJQ.text() ) + '&nocache=' + Math.random();

	cargaContenido$( objAjax, '../../php/guardar/psGuardarCambios.php', 'POST',
					 function(){ _Ajax( objAjax, function(){ $actualizarPar( objAjax ) }, 'lblAjaxOculto' ) }, parametros );
}catch( ex ){ alert( 'Error interno(jsGen)[actualizarPar(parms)]: ' + ex.message ); }
}

function $actualizarPar( objAjax ){
try{
	var objRes = null;
	//setText( 'lblAjax', '' );
	try
	{
		objRes = JSON.parse( objAjax.responseText );
		if( objRes.error.errno == 0 ){
			if( objRes.estado == 'ok' )
			{
				setText( 'lblAjax', 'Guardado' );
				setTimeout( "mostrarDiv( false, 'lblAjax' );", 5000 );
			}
		} else {
			console.log( ':(' + objAjax.responseText );
			setText( 'lblAjax', ':( ' + objAjax.responseText + getStrCerrar( 'lblAjax' ) );
		}
	}catch( ex1 ){ /*alert( 'responseText: ' + objAjax.responseText );*/ console.log( 'responseText: ' + /*objAjax.responseText*/ ex1.message ); }
}catch( ex ){ alert( 'Error interno(jsGen)[$actualizarPar(parms)]: ' + ex.message ); }
}

//function eliminarComponente( obj, idioma, idPag, llave )
function eliminarComponente( obj, correlativo ) {
	swal( {
		text: '\xBFDesea eliminar este elemento?',
		icon: 'warning',
		dangerMode: true,
		buttons: {
			cancel: {
				visible: true,
				text: 'No, gracias'
			},
			confirm: { 
				visible: true,
				text: 'Sí, deseo eliminarlo!'
			}
		}
	} ).then( ( respuesta ) => {
		if( !respuesta ) return;
		try{
			mostrarDiv( true, 'lblAjax' );
			setText( 'lblAjax', 'Guardando' );

			var objAjax		= inicializa_xhr();
			//var parametros 	= 'comn=eli&idioma='+ idioma + '&idPagina=' + idPag + '&llave=' + llave + '&nocache=' + Math.random();
			var parametros 	= 'comn=eli&correlativo='+ correlativo + '&nocache=' + Math.random();

			cargaContenido$( objAjax, '../../php/guardar/psGuardarCambios.php', 'POST',
							 function(){ _Ajax( objAjax, function(){ $eliminarComponente( objAjax, obj ) }, 'lblAjaxOculto' ) }, parametros );
		}catch( ex ){ alert( 'Error interno(jsGen)[eliminarComponente(parms)]: ' + ex.message ); }
	});
}

function $eliminarComponente( objAjax, obj ){
try{
	var objRes = null;
	try
	{
		objRes = JSON.parse( objAjax.responseText );
		if( objRes.error.errno == 0 ){
			if( objRes.estado == 'ok' )
			{
				obj.parentNode.parentNode.removeChild( obj.parentNode );
				setText( 'lblAjax', 'Guardado' );
				setTimeout( "mostrarDiv( false, 'lblAjax' );", 5000 );
			}
		} else {
			console.log( ':( >' + objRes.error.mensaje );
		}
	}catch( ex1 ){ /*alert( 'responseText: ' + objAjax.responseText );*/ console.log( 'responseText: ' + /*objAjax.responseText*/ ex1.message ); }
}catch( ex ){ alert( 'Error interno(jsGen)[$eliminarComponente(parms)]: ' + ex.message ); }
}

/*
$(window).load(function(){
		$(document).ready(function() {
			var timeoutID;
			$( '[contenteditable]' ).bind( 'DOMCharacterDataModified', function() {
				clearTimeout(timeoutID);
				$that = $(this);
				timeoutID = setTimeout(function() {
					$that.trigger('change')
				}, 50)
			});

			$('[contentEditable]').bind( 'change', function() {
				console.log($(this).text());
				//var obj = $(this);
				//console.log(obj.text());
				//console.log( 'idPagina: ' + obj.attr( 'idPagina' ) + '; llave: ' + obj.attr( 'llave' ) + '; valor: ' + obj.text() );
			})
		})
	});
*/

function onkeyupLogin( evt, i ){
try{
	evt = evt || window.event;
	var tecla = evt.keyCode || evt.which;
	if( tecla == 13 ){
		if( getText( 'uiTxtPss' ).length == 0 && i )
			setFocus( 'uiTxtPss' );
		else
			login();
	}
}catch( ex ){ alert( 'Error interno(jsGen)[onkeyupLogin(parms)]: ' + ex.message ); }
}
/* fin login */

function cambiarIdiomaNoticias( idioma ){
	switch( idioma ){
		case 'es-GT': mostrarDiv( false, 'divNoticiasEN' ); mostrarDiv( true, 'divNoticiasES' ); break;
		case 'en-EU': mostrarDiv( false, 'divNoticiasES' ); mostrarDiv( true, 'divNoticiasEN' ); break;
	}
	mostrarDiv( true, 'divNoticias' );
}

function cambiarIdiomaNoticias$(){
	var cookie = readCookie( 'style' );
	var idioma = cookie ? cookie : getPreferredStyleSheet();
	cambiarIdiomaNoticias( idioma );
}

function cambiarIdioma(){
	var idioma = optionSel( 'slctIdioma' );
	setActiveStyleSheet( idioma );
	cambiarIdiomaNoticias( idioma );
	placeholderFrmLogIn( idioma );
	
	if( esPagIni )
	{
		placeholderFrmEnvMsj( idioma );
	}
	
	return false;
}

function cargarIdiomas()
{
	slctL.init( 'slctIdioma', '130px', true, true );
	nuevoEvento( _$( 'slctIdioma' ),				'change',	function(){ cambiarIdioma(); } );
	
	var cookie = readCookie( 'style' );
	var idioma = cookie ? cookie : getPreferredStyleSheet();
	
	if( idioma )
	{	
		selOptionPorValue( 'slctIdioma', idioma );
		slctL.onChangeSlct( 'slctIdioma' );
	}
	placeholderFrmLogIn( idioma );
}

function contactenos()
{
	if( _$( 'uiDivMV' ) )
	{
		cerrarMenu();
		
		mostrarDiv( false, 'uiDivMV' );
		mostrarDiv( false, 'uiDivMiSlick' );
		
		mostrarDiv( true, 'uiDivContactenos' );
		setFocus( 'uiTxtNomEmp', true );
	}
	else
		location.href = '../inicio/inicio.php?ld-frm=on'; 
}

function setInfoToTxtFloatLabel( pStrId, pMsj )
{
	var strId = 'uiTxt' + pStrId;
	
	colocarAtributo( strId, 'placeholder', pMsj ); 
	colocarTitle( strId, pMsj );
	setText( strId.replace( 'Txt', 'Lbl' ), pMsj );
}

function placeholderFrmLogIn( idioma ){
	//\xf3 = ó
	var pUsr, pPass, pBtn, pBtnSal;
	var strShow = '', strHide = '';
	switch( idioma ){
		case 'es-GT': pUsr = 'Usuario'; pPass = 'Contrase\xf1a'; pBtn = 'Entrar'; strShow = 'Mostrar'; strHide = 'Ocultar'; pBtnSal = 'Salir'; break;
		case 'en-EU': pUsr = 'User'; pPass = 'Password';  pBtn = 'Go';  strShow = 'Show'; strHide = 'Hide'; pBtnSal = 'Exit'; break;
	}

	setInfoToTxtFloatLabel( 'Usr', pUsr );
	setInfoToTxtFloatLabel( 'Pss', pPass );
	$( '#uiAncLogIn' ).text( pBtn );
	$( '#uiAncSalir' ).text( pBtnSal );
	
	var x = document.getElementById( 'uiTxtPss' );
	if (x.type === "password") {
		$( '#uiLblVerPss' ).text( strShow );
    } else {
		$( '#uiLblVerPss' ).text( strHide );
    }
}