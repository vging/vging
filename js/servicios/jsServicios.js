var idPagina			= 3;
var header14sep18_17_38 = null;
var sticky14sep18_17_38 = null;

nuevoEvento( window, 'load', function(){ init(); } );

function init(){
try{
	header14sep18_17_38 = document.getElementById( 'miBarraSticky' );
	sticky14sep18_17_38	= screen.height; //header14sep18_17_38.offsetTop;
	//alert( sticky14sep18_17_38 );
	
	slctL.init( 'uiSlctAgregarComponente', '70px', true, true );
	nuevoEvento( _$( 'uiSlctAgregarComponente' ), 'change',	function(){  } );
	
	nuevoEvento( _$( 'uiAncAgregarComponente' ), 'click',	function(){ agregarComponente(); } );
	
	$(document).ready(function(){
		$( 'a[href*=#]' ).click(function(){
			if( location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'')
			&& location.hostname == this.hostname )
			{
				var $target = $( this.hash );
				$target = $target.length && $target || $('[name=' + this.hash.slice(1) +']');
				if( $target.length ) {
					
					var x = readCookie( 'u' ); var y = readCookie( 'p' ); var t = readCookie( 'tok' );
					var topMin = ( null == x || null == y || null == t ) ? 0 : 40;
					
					var targetOffset = $target.offset().top - topMin;
					$( 'html,body' ).stop().animate( { scrollTop: targetOffset }, 1000, 'jswing' );
					return false;
				}
			}
		});
	});
	
	$( '.dynamo' ).dynamo( { speed: 800, delay: 2000 } );
	
	$( document ).ready( function() {
		
		$( 'div div div div a' ).click( function() {
			var seccion = $( this ).attr( 'href' );
			if( seccion )
				createCookie( 'uiHdSecc', seccion, 2 );
			else
				alert( 'Imposible crear cookie "uiHdSecc"' );
		} );
		
		//href=#s0 cada ancla de la seccion guarda el valor de inicio
		$( 'section a' ).click( function() {
			var seccion = $( this ).attr( 'href' );
			if( seccion )
				createCookie( 'uiHdSecc', seccion, 2 );
			else
				alert( 'No se pudo crear cookie "uiHdSecc"' );
		}) ;
	});
	
	window.onscroll = function() { myFunction(); };
	nuevoEvento( _$( 'contenedor' ), 'mouseover',	function(){ createCookie( 'uiHdSecc', '', 2 ); $( header14sep18_17_38 ).removeClass( 'sticky' ); } );
	nuevoEvento( _$( 's0' ), 'mouseover',	function(){ createCookie( 'uiHdSecc', '#s0', 2 ); } );	
	nuevoEvento( _$( 's1' ), 'mouseover',	function(){ createCookie( 'uiHdSecc', '#s1', 2 ); } );	
	nuevoEvento( _$( 's2' ), 'mouseover',	function(){ createCookie( 'uiHdSecc', '#s2', 2 ); } );	
	nuevoEvento( _$( 's3' ), 'mouseover',	function(){ createCookie( 'uiHdSecc', '#s3', 2 ); } );	
	nuevoEvento( _$( 's4' ), 'mouseover',	function(){ createCookie( 'uiHdSecc', '#s4', 2 ); } );	
	nuevoEvento( _$( 's5' ), 'mouseover',	function(){ createCookie( 'uiHdSecc', '#s5', 2 ); } );	
	nuevoEvento( _$( 's6' ), 'mouseover',	function(){ createCookie( 'uiHdSecc', '#s6', 2 ); } );
	
	nuevoEvento( _$( 'contenedor' ), 'touchmove',	function(){ createCookie( 'uiHdSecc', '', 2 ); $( header14sep18_17_38 ).removeClass( 'sticky' ); } );
	nuevoEvento( _$( 's0' ), 'touchmove',	function(){ createCookie( 'uiHdSecc', '#s0', 2 ); } );	
	nuevoEvento( _$( 's1' ), 'touchmove',	function(){ createCookie( 'uiHdSecc', '#s1', 2 ); } );	
	nuevoEvento( _$( 's2' ), 'touchmove',	function(){ createCookie( 'uiHdSecc', '#s2', 2 ); } );	
	nuevoEvento( _$( 's3' ), 'touchmove',	function(){ createCookie( 'uiHdSecc', '#s3', 2 ); } );	
	nuevoEvento( _$( 's4' ), 'touchmove',	function(){ createCookie( 'uiHdSecc', '#s4', 2 ); } );	
	nuevoEvento( _$( 's5' ), 'touchmove',	function(){ createCookie( 'uiHdSecc', '#s5', 2 ); } );	
	nuevoEvento( _$( 's6' ), 'touchmove',	function(){ createCookie( 'uiHdSecc', '#s6', 2 ); } );
	
	$(document).ready(function () {
		$( '#submitButton' ).click(function () {
			
			var coo = readCookie( 'uiHdSecc' ); if( null == coo || coo.isEmpty() || coo == '#s0' ){ seccionIncorrecta( '0' ); return false; }
			var sec = parseInt( coo.replace( '#s', '' ) , 10 );
			var strIdioma = optionSel( 'slctIdioma' );
			var preFijoLlave = null;
			
			if( sec >= 1 && sec <= 6 ) {
				var objSec = _$( coo.replace( '#', '' ) );
				if( !objSec ){ alert( 'Oops! Secci\xf3n incorrecta' ); }
				
				try{
					preFijoLlave = objSec.childNodes[ 7 ].getAttribute( 'pre-fijo-llave' );
				} catch( ex1 ){ preFijoLlave = '-vacio-'; alert( ex1.message ); }
				
			} else { seccionIncorrecta( '1' ); }
			
			var parametros = {
				"comn"		: "img-serv",
				"idPagina"	: idPagina,
				"llave"		: preFijoLlave,
				"idioma"	: strIdioma
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
								/*if( percentText == "100" ) {
									   $("#lblAjax").show();
								}*/
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
								setText( 'lblAjax' , 'Imagen guardada' + getStrCerrar( 'lblAjax' ) );
								setTimeout( "mostrarDiv( false, 'lblAjax' );", 5000 );
								
								cambiarSrcATodasLasImgs( objRes.resultado.llave, objRes.resultado.path );
							} else {
								$( '#lblAjax' ).show();
								$( '#lblAjax' ).html("<div class='error'>Problema al cargar el archivo. Estado: " + objRes.estado + "</div>");
								$( '#progressBar' ).stop();	
							}
						} else {
							$( '#progressBar' ).stop();
							$( '#progressDivId' ).css( 'display', 'none' );
							$( '#lblAjax' ).show();
							$( '#lblAjax' ).html( "<div class='error'>Errno: " + objRes.error.errno + "; descripción: " + objRes.error.descripcion + "</div>" );
							$( '#progressBar' ).stop();	
						}
					}catch( ex1 ){ console.log( 'ex: ' + ex1.message + ' responseText: ' + xhr.responseText ); }
				}
			});
		});
	});
	//easeOutBounce
}catch( ex ){ alert( 'Error interno(jsServicios)[init()]: ' + ex.message ); }
}

function seccionIncorrecta( strInfo ) {
	$( header14sep18_17_38 ).removeClass( 'sticky' );
	//$( header14sep18_17_38 ).hide();
	alert( 'Elija una secci\xf3n. ' + strInfo );
}

function cambiarSrcATodasLasImgs( preFijoLlave, path ){
	var objs = document.querySelectorAll( '[pre-fijo-llave="' + preFijoLlave + '"]' );
	
	Array.prototype.forEach.call( objs, function( objDiv )
		{
			var images = toArray( objDiv.getElementsByTagName( 'img' ) );
			for( var i = 0, iLen = images.length; i < iLen; i++ ) {
				images[ i ].src = path;
			}
		}
	);
}

function myFunction() {
	var x = readCookie( 'u' ); var y = readCookie( 'p' ); var t = readCookie( 'tok' );
	var flagC = ( null == x || null == y || null == t ) ? false : true;
	
	if( false == flagC ) return;
	//console.log( 'pageYOffset: ' + window.pageYOffset + ' > sticky: ' + sticky14sep18_17_38 );
	
	if( window.pageYOffset >= sticky14sep18_17_38 - 5 ) {
	  	$( header14sep18_17_38 ).addClass( 'sticky' );
		//$( header14sep18_17_38 ).show();
		
	} else {
		$( header14sep18_17_38 ).removeClass( 'sticky' );
		//$( header14sep18_17_38 ).hide();
	}
}

function consStrEle( strObj, idPag, llave )
{
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
	if( null == secc || secc.isEmpty() ) { seccionIncorrecta( '3' ); window.location.href = '#s0'; return; }
	var comp = optionSel( 'uiSlctAgregarComponente' ); comp = ( comp.isEmpty() ? null : comp.toLowerCase() );
	var rand = getRandomInt( 100, 10000 );
	var strC = '';
	var idioma = optionSel( 'slctIdioma' );
	
	//secc = #s0 - #s5, ''
	if( secc.isEmpty() ) {
		seccionIncorrecta( '4' );
	} else {
		window.location.href = secc;
		
		var iSecc = parseInt( secc.replace( '#s', '' ), 10 );
		if( iSecc === 0 ) {
			seccionIncorrecta( '5' );
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