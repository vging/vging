var idPagina = 7;
nuevoEvento( window, "load", function(){ init(); } );

function init(){
try{
	//$(function(){
	  //$( '#switch-view' ).click( function(){
		//$( this ).find( 'button' ).toggleClass( 'active' );
		//$( '.article-wrapper' ).toggleClass( 'bloc col-xs-12 col-xs-4' );
	  //});
	//});
}catch( ex ){ alert( 'Error interno(jsNosotros)[init()]: ' + ex.message ); }
}

function eliminarEquipo( ancla, idEquipo, borrado ) {	
try{
	var text = '', confirm_text = '', text_ajax_pre = '', text_ajax = '', dangerMode = false;
	
	if( 1 == borrado ) {
		text			= '\xBFDesea eliminar al integrante del equipo?';
		confirm_text	= 'Sí, deseo eliminarlo!';
		text_ajax		= 'Eliminado';
		text_ajax_pre	= 'Eliminando';
		dangerMode		= true;
	} else if( 0 == borrado ) {
		text			= '\xBFDesea recuperar al integrante del equipo?';
		confirm_text	= 'Sí, deseo recuperarlo!';
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
		var parametros 	= 'comn=eli-eqp&idEquipo=' + idEquipo + '&borrado=' + borrado + '&nocache=' + Math.random();
		
		cargaContenido$( objAjax, '../../php/guardar/psGuardarCambios.php', 'POST',
						 function(){ _Ajax( objAjax, function(){ $eliminarEquipo( objAjax, ancla, borrado, text_ajax ) }, 'lblAjaxOculto' ) }, parametros );
	});
}catch( ex ){ alert( 'Error interno(jsNosotros)[eliminarEquipo(parms)]: ' + ex.message ); }
}

function $eliminarEquipo( objAjax, obj, borrado, text_ajax ){
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
				
				if( 1 == borrado ) {
					opa = '0.3';
					className = 'icon-back-in-time';
					text = 'Recuperar';
					
					obj.onclick = function( event )
					{ 
						var eve = event || window.event;
            			var ele = eve.target || eve.srcElement;
						eliminarEquipo(ele.parentNode, ele.parentNode.getAttribute( 'data-id-equipo' ), 0);
					};
					
				} else {
					opa = '1.0';
					className = 'icon-trash';
					text = 'Eliminar';
					
					obj.onclick = function( event )
					{
						var eve = event || window.event;
            			var ele = eve.target || eve.srcElement;
						eliminarEquipo(ele.parentNode, ele.parentNode.getAttribute( 'data-id-equipo' ), 1);
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
			console.log( ':(' );
			setText( 'lblAjax', ':( ' + objAjax.responseText + getStrCerrar( 'lblAjax' ) );
		}
	}catch( ex1 ){ /*alert( 'responseText: ' + objAjax.responseText );*/ console.log( 'responseText: ' + /*objAjax.responseText*/ ex1.message ); }
}catch( ex ){ alert( 'Error interno(jsNosotros)[$eliminarEquipo(parms)]: ' + ex.message ); }
}

function actualizarEquipoListener( objJS ) {
	var objJQ = $(objJS);
	actualizarEquipo( objJS, objJQ );
	//swal( 'Enhorabuena!', 'Nuevo contenido(editable): ' + obj.innerHTML, 'success' );
}

function actualizarEquipo( objJS, objJQ ){
try{
	mostrarDiv( true, 'lblAjax' );
	setText( 'lblAjax', 'Guardando' );
	
	var objAjax		= inicializa_xhr();
	var parametros 	= 'comn=eqp&idEquipo='+ objJQ.attr( 'data-id' ) + '&campo=' + objJQ.attr( 'data-campo' ) 
						+ '&valor=' + encodeURIComponent( objJS.innerHTML )
						+ '&nocache=' + Math.random();
	
	cargaContenido$( objAjax, '../../php/guardar/psGuardarCambios.php', 'POST',
					 function(){ _Ajax( objAjax, function(){ $actualizarEquipo( objAjax ) }, 'lblAjaxOculto' ) }, parametros );
}catch( ex ){ alert( 'Error interno(jsNosotros)[actualizarEquipo(parms)]: ' + ex.message ); }
}

function $actualizarEquipo( objAjax ){
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
} catch( ex ){ alert( 'Error interno(jsNosotros)[$actualizarEquipo(parms)]: ' + ex.message ); }
}

function guardarEquipo( objJS, idEquipo ){
try{
	mostrarDiv( true, 'lblAjax' );
	setText( 'lblAjax', 'Guardando' );
	
	var objs = document.querySelectorAll( "[data-id='" + idEquipo + "']" );
	var nodesArray = [].slice.call( objs );
	
	/*Array.prototype.forEach.call( objs, function( obj )
	{
		//obj.innerHTML;
	});*/
	
	var objAjax		= inicializa_xhr();
	var parametros 	= 'comn=ins-eqp&='
						+ '&puesto='	+ nodesArray[ 0 ].innerHTML
						+ '&profesion='	+ nodesArray[ 1 ].innerHTML
						+ '&nombre='	+ nodesArray[ 2 ].innerHTML
						+ '&perfil='	+ nodesArray[ 3 ].innerHTML
						+ '&nocache='	+ Math.random();
	
	swal( 'Enhorabuena!', 'parametros: ' + parametros, 'success' );
	cargaContenido$( objAjax, '../../php/guardar/psGuardarCambios.php', 'POST',
					 function(){ _Ajax( objAjax, function(){ $guardarEquipo( objAjax ) }, 'lblAjaxOculto' ) }, parametros );
}catch( ex ){ alert( 'Error interno(jsNosotros)[guardarEquipo(parms)]: ' + ex.message ); }
}

function $guardarEquipo( objAjax ){
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
} catch( ex ){ alert( 'Error interno(jsNosotros)[$guardarEquipo(parms)]: ' + ex.message ); }
}

function agregarComponente( strDivPadre ) {
	var rand = getRandomInt( 100, 10000 );
	var strC = '';

	var objPr	= _$( strDivPadre );
	
	strC = consStrItemEquipo( rand );

	$( objPr ).append( strC ).ready( function () { addEvtUpLdFrm( rand, 'add' ); ldInputsFile( document, window, 0 ); });
	
	//var objUltHij = objPr.lastChild;

	//setChangeListener( objUltHij, function(){ actualizarEquipoListener( objUltHij ); } );
}

function iconCerrarEliminarEquipo( idEquipo ) {
	return '<a href="javascript:void(0);" onclick="eliminarEquipo( this, ' +  idEquipo + ', 1 );" data-id-equipo="' + idEquipo + '"'
				+ 'class="btnLT tooltipX js-contenido-editable AncEfcSomIco"'
				+ 'style="position: absolute; right: 2%; font-size: 18px; top: 3% !important;" tipelecon="checkbox">'
				+ '<span class="icon-trash efcSomIco" style="position: relative; top: 20%; left: 22%;">'
				+ '</span>'
				+ '<span class="tooltipX negrilla" style="width: 75px; top: 40px; left: 52px;">Eliminar</span>'
		+ '</a>';
}

function iconGuardarEquipo( idEquipo ) {
	return '<a href="javascript:void(0);" onclick="guardarEquipo( this, ' +  idEquipo + ', 1 );" data-id-equipo="' + idEquipo + '"'
				+ 'class="btnLT tooltipX js-contenido-editable AncEfcSomIco"'
				+ 'style="position: absolute; right: 8%; font-size: 18px; top: 3% !important;" tipelecon="checkbox">'
				+ '<span class="icon-save efcSomIco" style="position: relative; top: 20%; left: 22%; color: #3498db;">'
				+ '</span>'
				+ '<span class="tooltipX negrilla" style="width: 75px; top: 40px; left: 52px;">Guardar</span>'
		+ '</a>';
}

function puesto( idEquipo ) {
	return '<div><p data-id="' + idEquipo + '" data-campo="puesto" class="js-contenido-editable" style="font-weight: bold;" contenteditable="true" data-ph="Puesto"></p></div>';
}

function subirImg( idEquipo ) {
	var str = '<div>'
				+ '<input type="file" id="uploadImage' + idEquipo + '" name="uploadImage' + idEquipo +'" class="inputfile inputfile-1" />'
				+ '<label for="uploadImage' + idEquipo + '" style="border: solid 1px #FFF; border-radius: 3px; position: relative; top: -150px; left: 8px;">'
					+ '<span>Seleccione una foto</span>'
				+ '</label>'
				+ '<button id="submitButton' + idEquipo + '" type="submit" name="btnSubmit' + idEquipo + '" class="btnLT tooltipX js-contenido-editable AncEfcSomIco AncEfcSomIco2 mano"'
						+ 'style="width: 35px; height: 37px; position: relative; display: inline-block !important;'
								+ 'border: solid 1px transparent; border-radius: 100%; font-size: 18px;'
							   	+ 'position: absolute !important; top: 2px !important; right: 10%; background-color: #202124;">'
					+ '<span class="icon-save efcSomIco" style="top: 22%; left: 23%;"></span>'
				+ '</button>'
	
			+ '<div id="progressDivId' + idEquipo + '" class="progress" style="top: -42px;">'
				+ '<div id="progressBar' + idEquipo + '" class="progress-bar"></div>'
				+ '<div id="percent' + idEquipo + '" class="percent"></div>'
			+ '</div>'
	
		+ '</div>';
	return str;
}

function fotoPer( idEquipo ) {
	return '<div class="divIzq" style="width: 170px;"><img src="../../imagenes/sinFoto.jpg" style="width: 95%;"/>'+ subirImg( idEquipo ) +'</div>';
}

function datPer( idEquipo ) {
	return '<div><p class="normalAzul" style="margin: 0;">'
				+ '<label data-id="' + idEquipo + '" data-campo="profesion"	class="js-contenido-editable" contenteditable="true" data-ph="Profesión"></label>&nbsp;'
				+ '<label data-id="' + idEquipo + '" data-campo="nombre"	class="js-contenido-editable" contenteditable="true" data-ph="Nombre"></label>'
				+'</p>'
				+'<p data-id="' + idEquipo + '" data-campo="perfil" class="js-contenido-editable" style="margin: 0;" contenteditable="true" data-ph="Descripción"></p>'
			+ '</div>';
}

function consStrItemEquipo( idEquipo ) {
	var str = '<div style="position: relative; margin-top: 15px; margin-bottom: 5px;" class="clear">'
				+ '<form action="../../php/imagen/psCargarImagen.php" id="uploadForm' + idEquipo + '" name="frmupload' + idEquipo + '" method="POST" enctype="multipart/form-data" style="position: relative; top: -10px;">'
					+ iconCerrarEliminarEquipo( idEquipo )
					//+ iconGuardarEquipo( idEquipo )
					+ puesto( idEquipo )
					+ fotoPer( idEquipo )
					+ datPer( idEquipo )
				+ '</form>'
			+ '</div>';
	return str;
}

function addEvtUpLdFrm( idEquipo, strPar ) {
	
	$( '#' + 'submitButton' + idEquipo ).click(
		{ btnSubmit 	 :	'submitButton' + idEquipo, 
		 	upLdFrm 	 : 	'uploadForm' + idEquipo,
		 	upLdImg 	 : 	'uploadImage' + idEquipo,
		 	progressDivId:	'progressDivId' + idEquipo,
		 	progressBar	 : 	'progressBar' + idEquipo
		},
		
		function (event) {

		var objs			= document.querySelectorAll( "[data-id='" + idEquipo + "']" );
		var nodesArray		= [].slice.call( objs );
		
		var parametros;
		
		if( strPar == 'add' ) {
			parametros = {
				"comn"		: "img-nos",
				"upLdImg"	: "uploadImage" + idEquipo,
				"idPagina"	: idPagina,
				"idioma"	: optionSel( 'slctIdioma' ),
				"puesto"	: nodesArray[ 0 ].innerHTML,
				"profesion"	: nodesArray[ 1 ].innerHTML,
				"nombre"	: nodesArray[ 2 ].innerHTML,
				"perfil"	: nodesArray[ 3 ].innerHTML
			};
		} else if( strPar == 'ovr' ) {
			parametros = {
				"comn"		: "img-nos-updt",
				"upLdImg"	: "uploadImage" + idEquipo,
				"idPagina"	: idPagina,
				"idioma"	: optionSel( 'slctIdioma' ),
				"idEquipo"	: idEquipo
			};
		}

		$( '#' + event.data.upLdFrm ).ajaxForm( {
			target: 		'#lblAjax',
			data:  			parametros,
			url: 			'../../php/imagen/psCargarImagen.php',
			beforeSubmit:	function () 
			{
				$( '#lblAjax' ).hide();
				if( $( '#' + event.data.upLdImg ).val() == '' ) {

					$( '#lblAjax' ).html( "<div class='error'>Elija un archivo para subir</div>" );
					$( '#lblAjax' ).show();
					setTimeout( "mostrarDiv( false, 'lblAjax' );", 3000 );
					return false; 
				}
				$( '#' + event.data.progressDivId ).css( 'display', 'block' );
				var percentValue = '0%';

				$( '#' + event.data.progressBar ).width( percentValue );
				//$('#percent').html(percentValue);
			},
			uploadProgress: function( evt, position, total, percentComplete ) 
			{
				var percentValue = percentComplete + '%';
				
				$( '#' + event.data.progressBar ).animate(	
					{ width: '' + percentValue + '' }, 
					{
						duration: 2400,
						easing: 'linear',
						step: function (x) {
							percentText = Math.round( x * 100 / percentComplete );
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
				$( '#' + event.data.progressBar ).width( 100 );
				try
				{
					var objRes = JSON.parse( xhr.responseText );

					if( objRes.error.errno == 0 ) {
						if( objRes.estado == 'ok' ) {
							$( '#' + event.data.progressBar ).stop();
							$( '#' + event.data.progressDivId ).css( 'display', 'none' );
							
							var objImg = _$( objRes.resultado.llave );
							if( objImg ) objImg.src = objRes.resultado.path;

							mostrarDiv( true, 'lblAjax' ); 
							setText( 'lblAjax' , 'Perfil guardado' + getStrCerrar( 'lblAjax' ) );
							setTimeout( "mostrarDiv( false, 'lblAjax' );", 5000 );
						} else {
							$( '#lblAjax' ).show();
							$( '#lblAjax' ).html("<div class='error'>Problema al cargar el archivo. Estado: " + objRes.estado + getStrCerrar( 'lblAjax' ) + "</div>");
							$( '#' + event.data.progressBar ).stop();
						}
					} else {
						$( '#' + event.data.progressBar ).stop();
						$( '#' + event.data.progressDivId ).css( 'display', 'none' );
						$( '#lblAjax' ).show();
						$( '#lblAjax' ).html( "<div class='error'>Errno: " + objRes.error.errno + "; descripción: " + objRes.error.descripcion + getStrCerrar( 'lblAjax' ) +"</div>" );
						$( '#' + event.data.progressBar ).stop();	
					}
				}catch( ex1 ){ 
					var strRes = 'ex: ' + ex1.message + ' responseText: ' + xhr.responseText; 
					console.log( strRes ); alert( strRes );
				}
			}
		});
			
		//return false;
	});
}

function ldInputsFile( document, window, index ) {
	var inputs = document.querySelectorAll( '.inputfile' );
	
	Array.prototype.forEach.call( inputs, function( input )
	{
		var label	 = input.nextElementSibling,
			labelVal = label.innerHTML;

		input.addEventListener( 'change', function( e )
		{
			var fileName = '';
			if( this.files && this.files.length > 1 )
				fileName = ( this.getAttribute( 'data-multiple-caption' ) || '' ).replace( '{count}', this.files.length );
			else
				fileName = e.target.value.split( '\\' ).pop();

			if( fileName )
				label.querySelector( 'span' ).innerHTML = fileName;
			else
				label.innerHTML = labelVal;
		});

		// Firefox bug fix
		input.addEventListener( 'focus', function(){ input.classList.add( 'has-focus' ); });
		input.addEventListener( 'blur', function(){ input.classList.remove( 'has-focus' ); });
	});
}

function ldFrmImg( strIds ) {
	strIds.split( ',' ).forEach( function ( strId ) {
    	addEvtUpLdFrm( strId, 'ovr' );	
	});
	
	ldInputsFile( document, window, 0 );
}