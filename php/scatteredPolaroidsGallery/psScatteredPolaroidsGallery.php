<?php
	echo '<script type="text/javascript" src="../../scatteredPolaroidsGallery/js/classie.js"></script>';
	echo '<script type="text/javascript" src="../../scatteredPolaroidsGallery/js/photostack.js"></script>';
	echo '<script type="text/javascript">
		var objPhotoStackEsGT = document.getElementById( "photostack-es-GT" );
		if( objPhotoStackEsGT ) {
			new Photostack( objPhotoStackEsGT, {
				callback : function( item ) {
					//console.log(item)
				}
			} );
			$( "#photostack-es-GT" ).addClass( "es-GT" );
		}
		var objPhotoStackEnEU = document.getElementById( "photostack-en-EU" );
		if( objPhotoStackEnEU ) {
			new Photostack( objPhotoStackEnEU, {
				callback : function( item ) {
					//console.log(item)
				}
			} );
			$( "#photostack-en-EU" ).addClass( "en-EU" );
		}
	</script>';
	echo '<script type="text/javascript">initFigureAdd();</script>';
?>