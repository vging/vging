<!doctype html>

<html lang="es">
<head>
	<meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"/>
	<meta name="format-detection" content="telephone=yes"><meta charset="encoding"/>
	<title>ComTop::Plantilla</title>
	
	<link rel="stylesheet" href="../../css/cssBaseDisAgl.css"/>
	<link rel="stylesheet" href="../../css/cssLogo.css"/>
	<link rel="stylesheet" href="../../css/cssL.css"/>
	<link rel="stylesheet" href="../../css/cssInicio.css"/>
	<link rel="stylesheet" href="../../css/fonts.css"/>
	<link rel="stylesheet" href="../../css/fontsBasicos.css"/>
	<link rel="stylesheet" href="../../css/fontsChat.css"/>
	<link rel="stylesheet" href="../../slctL/css/cssSlctL.css"/>
	<link rel="stylesheet" href="../../css/cssMenuFlotanteIdioma.css"/>
	<link rel="stylesheet" href="../../css/cssBoxShadowMenu.css"/>
	<link rel="stylesheet" href="../../css/cssBotonCircular.css"/>
	<link rel="stylesheet" href="../../css/cssToolTipX.css"/>
	<link rel="stylesheet" href="../../css/cssLoading.css"/>
	
	
	<link rel="stylesheet" href="../../css/dynamo.css"/>
	<link rel="stylesheet" href="../../css/cssExtras.css"/>
	<link rel="stylesheet" href="../../css/cssFloatLabel.css"/>
	<link rel="stylesheet" href="../../css/cssBtnSignUpAndLogin.css"/>
	<link rel="stylesheet" href="../../css/cssFlipSwitchMaterial.css"/>
	<link rel="stylesheet" href="../../css/cssProgressBarUploadImage.css"/><link rel="stylesheet" href="../../css/cssInputTypeFile.css"/>
	<!-- Hojas de Estilo para el cambio de idioma -->
	<link rel="stylesheet" type="text/css" href="../../css/es-GT.css" title="es-GT"/>
	<link rel="alternate stylesheet" type="text/css" href="../../css/en-EU.css" title="en-EU"/>
	<!--link rel="stylesheet" type="text/css" href="../../scatteredPolaroidsGallery/css/normalize.css" /-->
	
	
	<style type="text/css">		
		
		
		
		
		
		
		
		
		
		
		
		
		
	</style>
	
	<script type="text/javascript" src="../../js/jsBase.js"></script>
	<script type="text/javascript" src="../../js/jsGen.js"></script>
	<script type="text/javascript" src="../../js/jsAjax.js"></script>
	
	<script type="text/javascript" src="../../js/proyectos/js.js"></script>
	
	<script type="text/javascript" src="../../js/comp/styleswitcher/styleswitcher.js"></script>
	<script type="text/javascript" src="../../js/comp/sweetalert.min/sweetalert.min.js"></script>
	
	<script type="text/javascript" src="../../js/comp/jquery/1.6/jquery.min.js"></script><script type="text/javascript" src="../../js/comp/form.min/jquery.form.min.js"></script>
	<script type="text/javascript" src="../../js/comp/min/jquery.easing.min.js"></script>
	<script type="text/javascript" src="../../js/comp/simplyScroll/jquery.simplyscroll.js"></script>
	<script type="text/javascript" src="../../js/comp/dynamo/dynamo.js"></script>
	
	<script type="text/javascript" src="../../slctL/js/jsSlctL.js"></script>
	<script type="text/javascript" src="../../js/menu/jsMenu.js"></script>
	<script type="text/javascript" src="../../js/chat/jsChat.js"></script>
	
		
	
		
		
		
</head>
<body>
	<div id="contenedor" class="contenedor">
		
		<header id="hHeader">
			<script>	
				$( '#hHeader' ).load( '../base/header.html' );
			</script>
		</header>
		
		<section class="main" style="padding: 0; width: 100%;">
			
			<label id="lblAjaxOculto" class="msjAjaxOculto"></label>
		
			<label id="lblAjax" class="msjAjax dn" style="position: fixed;"></label>

			
		</section>
		
		<aside id="asdAside">
			<script>	
				$( '#asdAside' ).load( '../base/noticias.html', function() { $( document ).ready( function(){ 
					$('.dynamo').dynamo(); cambiarIdiomaNoticias$(); 
				} ); } );
			</script>
		</aside>
		
		<footer id="fPie">
			<script>	
				$( '#fPie' ).load( '../base/pie.html', function() { $( document ).ready( cargarChat ); } );
			</script>
		</footer>
		
	</div>
	
	
	
	<?php require( $_SERVER[ 'DOCUMENT_ROOT' ].'/comtop/v1.1/php/antesDelBody/psAntesDelBody.php' ); ?>
	
	
	
	
</body>
</html>