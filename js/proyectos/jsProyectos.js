var idPagina = 4;
nuevoEvento( window, "load", function(){ init(); } );

function init(){
try{
}catch( ex ){ alert( 'Error interno(jsProyectos)[init()]: ' + ex.message ); }
}

function initFigureAdd() {
	
	if( _$( 'uiSlctPais' ) ) {
		slctL.init( 'uiSlctPais', '100%', true );
		nuevoEvento( _$( 'uiSlctPais' ), 'change',	function(){ } );
	}
	
	if( _$( 'uiSlctIdiomaA' ) ) {
		slctL.init( 'uiSlctIdiomaA', '100%', true );
		nuevoEvento( _$( 'uiSlctIdiomaA' ), 'change',	function(){ } );
	}
	
	if( $( '#submitButton' ) )
	$(document).ready(function () {
		$( '#submitButton' ).click(function () {
			//setText( 'uiTxtNom', 'Proyecto 3' );
			//setText( 'uiTxtDes', 'América Central o Centroamérica es una gran región geográfica que se extiende desde la frontera Sur de México, en Norteamérica, hasta la frontera Norte de Colombia, en Sudamérica. Fisiográficamente la región se extiende desde el istmo de Tehuantepec, México, hasta el golfo de Urabá, Colombia.' );
			//selOption( 'uiSlctPais', 1 ); slctL.onChangeSlct( 'uiSlctPais' );
			
			var rand = getRandomInt( 100, 10000 );
			var strPre = 'pro';
			var strPais = optionSel( 'uiSlctPais' );		if( null == strPais || strPais.isEmpty() ) { alert( 'Debe seleccionar un pa\xEDs' ); return false; }
			var strLlave = strPre + '-' + strPais + '-' + rand;
			var strIdioma = optionSel( 'uiSlctIdiomaA' );	if( null == strIdioma || strIdioma.isEmpty() ) { alert( 'Debe seleccionar un idioma' ); return false; }
			var strNombre = getText( 'uiTxtNom' );			if( null == strNombre || strNombre.isEmpty() ) { alert( 'Debe colocarle un nombre al proyecto' ); return false; }
			var strDescripcion = getText( 'uiTxtDes' );
			
			var parametros = {
				"comn"			: "img-proy",
				"idPagina"		: idPagina,
				"idioma"		: strIdioma,
				"llave"			: strLlave,
				"pais"			: strPais,
				"nombre"		: strNombre,
				"descripcion"	: strDescripcion
			};
			
			$( '#uploadForm' ).ajaxForm( {
				target: 		'#lblAjax',
				data:  			parametros,
				url: 			'../../php/imagen/psCargarImagen.php',
				beforeSubmit:	function () 
				{	
					$( '#lblAjax' ).hide();
					if( $( '#uploadImage' ).val() == '' ) {

						$( '#lblAjax' ).html( "<div class='error'>Elija un archivo para subir</div>" );
						$( '#lblAjax' ).show();
						setTimeout( "mostrarDiv( false, 'lblAjax' );", 3000 );
						//alert( parametros.llave );
						return false; 
					}
					$( '#progressDivId' ).css( 'display', 'block' );
					var percentValue = '0%';

					$( '#progressBar' ).width( percentValue );
					//$('#percent').html(percentValue);
				},
				uploadProgress: function( event, position, total, percentComplete ) 
				{
					var percentValue = percentComplete + '%';
					$( '#progressBar' ).animate(	
						{ width: '' + percentValue + '' }, 
						{
							duration: 2400,
							easing: 'linear',
							step: function (x) {
								//percentText = Math.round( x * 100 / percentComplete );
								percentText = Math.round( x * 100 / percentComplete );
								//$("#percent").text(percentText + "%");
								//if( percentText == "100" ) {
									   //$("#lblAjax").show();
								//}
							}
						}
					);
				},
				error: function( response, status, e ) 
				{
					alert('Oops something went');
				},

				complete: function( xhr ) 
				{
					$( '#progressBar' ).width( 100 );
					try
					{
						var objRes = JSON.parse( xhr.responseText );
						
						if( objRes.error.errno == 0 ) {
							if( objRes.estado == 'ok' ) {
								$( '#progressBar' ).stop();
								$( '#progressDivId' ).css( 'display', 'none' );

								mostrarDiv( true, 'lblAjax' ); 
								setText( 'lblAjax' , 'Proyecto guardado' + getStrCerrar( 'lblAjax' ) );
								setTimeout( "mostrarDiv( false, 'lblAjax' );", 5000 );
								
								//cambiarSrcATodasLasImgs( objRes.resultado.llave, objRes.resultado.path );
							} else {
								$( '#lblAjax' ).show();
								$( '#lblAjax' ).html("<div class='error'>Problema al cargar el archivo. Estado: " + objRes.estado + "</div>");
								$( '#progressBar' ).stop();	
							}
						} else {
							$( '#progressBar' ).stop();
							$( '#progressDivId' ).css( 'display', 'none' );
							$( '#lblAjax' ).show();
							$( '#lblAjax' ).html( "<div class='error'>Errno: " + objRes.error.errno + "; descripción: " + objRes.error.descripcion + "; q: " + objRes.error.q +"</div>" );
							$( '#progressBar' ).stop();	
						}
					}catch( ex1 ){ console.log( 'ex: ' + ex1.message + ' responseText: ' + xhr.responseText ); }
				}
			});
		});
	});
	
	setContenidoEditable( false, undefined );
}

function actualizarPolaroidListener( objJS ) {
	var objJQ = $(objJS);
	actualizarPolaroid( objJS, objJQ );
	//swal( 'Enhorabuena!', 'Nuevo contenido(editable): ' + obj.innerHTML, 'success' );
}

function actualizarPolaroid( objJS, objJQ ){
try{
	mostrarDiv( true, 'lblAjax' );
	setText( 'lblAjax', 'Guardando' );
	
	var objAjax		= inicializa_xhr();
	var parametros 	= 'comn=pol&idPolaroid='+ objJQ.attr( 'data-id' ) + '&campo=' + objJQ.attr( 'data-campo' ) + '&valor=' + encodeURIComponent( objJS.innerHTML ) + '&nocache=' + Math.random();
	
	cargaContenido$( objAjax, '../../php/guardar/psGuardarCambios.php', 'POST',
					 function(){ _Ajax( objAjax, function(){ $actualizarPolaroid( objAjax ) }, 'lblAjaxOculto' ) }, parametros );
}catch( ex ){ alert( 'Error interno(jsProyectos)[actualizarPolaroid(parms)]: ' + ex.message ); }
}

function $actualizarPolaroid( objAjax ){
try{
	var objRes = null;
	setText( 'lblAjax', '' );
	try {
		objRes = JSON.parse( objAjax.responseText );
		if( objRes.error.errno == 0 ) {
			if( objRes.estado == 'ok' ) {
				setText( 'lblAjax', 'Guardado' );
				setTimeout( "mostrarDiv( false, 'lblAjax' );", 5000 );
			}
		} else {
			console.log( ':(' + objAjax.responseText );
			setText( 'lblAjax', ':( ' + objAjax.responseText + getStrCerrar( 'lblAjax' ) );
		}
	} catch( ex1 ) {
		console.log( 'message: ' + ex1.message + 'responseText: ' + objAjax.responseText );
		setText( 'lblAjax', 'console.log:\u007E$ ' + getStrCerrar( 'lblAjax' ) );
	}
} catch( ex ){ alert( 'Error interno(jsProyectos)[$actualizarPolaroid(parms)]: ' + ex.message ); }
}

function consStrEle( strObj, idPag, llave ) {
	var strP	= '<p class="normalBlanco textoSeccion js-contenido-editable" idPagina="' + idPag + '" llave="' + llave + '" contenteditable="true" ></p>';
	var strLi	= '<li class="js-contenido-editable" idPagina="' + idPag + '" llave="' + llave + '" contenteditable="true"></li>';
	
	if( strObj == 'p' )
		return strP;
	else if( strObj == 'li' )
		return strLi;
}

function agregarComponente() {
	var PARR = 'parr', ITEM = 'item';
	
	var secc = readCookie( 'uiHdSecc' ); 
	if( null == secc || secc.isEmpty() ) { /*alert( 'No se pudo leer cookie "uiHdSecc"' );*/ alert( 'Elija una secci\xf3n' ); window.location.href = '#s0'; return; }
	var comp = optionSel( 'uiSlctAgregarComponente' ); comp = ( comp.isEmpty() ? null : comp.toLowerCase() );
	var rand = getRandomInt( 100, 10000 );
	var strC = '';
	var idioma = optionSel( 'slctIdioma' );
	
	//secc = #s0 - #s5, ''
	if( secc.isEmpty() ) {
		alert( 'Elija una secci\xf3n' );
	} else {
		window.location.href = secc;
		
		var iSecc = parseInt( secc.replace( '#s', '' ), 10 );
		if( iSecc === 0 ) {
			alert( 'Elija una secci\xf3n' );
		} else if( iSecc >= 1 && iSecc <= 6 ) {
			var objPr	= _$( 's' + iSecc ).querySelector( 'div.' + idioma );
			var pre_fijo_llave = objPr.getAttribute( 'pre-fijo-llave' );
			var objUltHij = null;
			
			if( comp == PARR ) {
				strC = consStrEle( 'p', idPagina, pre_fijo_llave + '-p' + rand );
				
				$( objPr.childNodes[ 1 ].childNodes[ 3 ] ).append( strC );
				
				objUltHij = objPr.childNodes[ 1 ].childNodes[ 3 ].lastChild;
				
				setChangeListener( objUltHij, function(){ actualizarParListener(objUltHij); } );
			} else if( comp == ITEM ) {
				strC = consStrEle( 'li', idPagina, pre_fijo_llave + '-i' + rand );
				
				$( objPr.childNodes[ 3 ].childNodes[ 1 ] ).append( strC );
				
				objUltHij = objPr.childNodes[ 3 ].childNodes[ 1 ].lastChild;
				
				setChangeListener( objUltHij, function(){ actualizarParListener(objUltHij); } );
			}
		}
	}
}

function eliminarComponente( ancla, idPolaroid, borrado ) {	
try{
	var text = '', confirm_text = '', text_ajax_pre = '', text_ajax = '', dangerMode = false;
	
	if( 1 == borrado ) {
		text			= '\xBFDesea eliminar el proyecto?';
		confirm_text	= 'S\u00ED, deseo eliminarlo!';
		text_ajax		= 'Eliminado';
		text_ajax_pre	= 'Eliminando';
		dangerMode		= true;
	} else if( 0 == borrado ) {
		text			= '\xBFDesea recuperar el proyecto?';
		confirm_text	= 'S\u00ED, deseo recuperarlo!';
		text_ajax		= 'Recuperado';
		text_ajax_pre	= 'Recuperando';
		dangerMode		= false;
	}
	
	swal( {
		text: text,
		icon: "warning",
		dangerMode: dangerMode,
		buttons: {
			cancel: {
				visible: true,
				text: "No, gracias"
			},
			confirm: { 
				visible: true,
				text: confirm_text
			}
		}
	} ).then( ( respuesta ) => {
		if( !respuesta ) return;
		mostrarDiv( true, 'lblAjax' );
		setText( 'lblAjax', text_ajax_pre );

		var objAjax		= inicializa_xhr();
		var parametros 	= 'comn=eli-pol&idPolaroid=' + idPolaroid + '&borrado=' + borrado + '&nocache=' + Math.random();
		
		cargaContenido$( objAjax, '../../php/guardar/psGuardarCambios.php', 'POST',
						 function(){ _Ajax( objAjax, function(){ $eliminarComponente( objAjax, ancla, borrado, text_ajax ) }, 'lblAjaxOculto' ) }, parametros );
	});
}catch( ex ){ alert( 'Error interno(jsServicios)[eliminarComponente(parms)]: ' + ex.message ); }
}

function $eliminarComponente( objAjax, obj, borrado, text_ajax ){
try{
	var objRes = null;
	try
	{
		objRes = JSON.parse( objAjax.responseText );
		if( objRes.error.errno == 0 ){
			if( objRes.estado == 'ok' ) {
				//obj.parentNode.parentNode.removeChild( obj.parentNode );
				var opa = '', className = '', text = '';
				obj.onclick = null;
				//console.log( obj );
				if( 1 == borrado ) {
					opa = '0.3';
					className = 'icon-back-in-time';
					text = 'Recuperar';
					
					obj.onclick = function( event ) 
					{ 
						var eve = event || window.event;
            			var ele = eve.target || eve.srcElement;
						eliminarComponente( ele.parentNode, ele.parentNode.getAttribute( 'data-id-polaroid' ), 0 );
					};
					
				} else {
					opa = '1.0';
					className = 'icon-trash';
					text = 'Eliminar';
					
					obj.onclick = function( event )
					{
						var eve = event || window.event;
            			var ele = eve.target || eve.srcElement;
						eliminarComponente( ele.parentNode, ele.parentNode.getAttribute( 'data-id-polaroid' ), 1 );
					};
					
				}
				
				obj.childNodes[ 1 ].innerHTML = text;
				obj.firstChild.className = className;
				obj.parentNode.style.opacity = opa;
				//obj.parentNode.removeChild( obj );
				
				setText( 'lblAjax', text_ajax );
				setTimeout( "mostrarDiv( false, 'lblAjax' );", 3700 );
			}
		} else {
			console.log( ':( >' + objAjax.responseText );
			setText( 'lblAjax', ':( ' + objAjax.responseText + getStrCerrar( 'lblAjax' ) );
		}
	}catch( ex1 ){ /*alert( 'responseText: ' + objAjax.responseText );*/ console.log( 'responseText: ' + /*objAjax.responseText*/ ex1.message ); }
}catch( ex ){ alert( 'Error interno(jsServicios)[$eliminarComponente(parms)]: ' + ex.message ); }
}