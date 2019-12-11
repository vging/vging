var flagMenu = true;

function main(){
	$( '.menu_bar' ).click( function(){ cerrarMenu(); } );
	
	$( '.cerrar' ).click( function(){ cerrarMenu(); } );
	
	// Mostramos y ocultamos submenus
	$( '.submenu' ).click( function(){ $(this).children( '.children' ).slideToggle(); } );
};

function cerrarMenu()
{
	if(flagMenu){
		flagMenu = false;
		var ventana_ancho = $(window).width();
		if( ventana_ancho <= 400 )
			$('nav').animate({
				left: '0'
			});
		else if( ventana_ancho <= 800 )
			$('nav').animate({
				left: '10%'
			});
	}
	else{
		flagMenu = true;
		$('nav').animate({
			left: '-100%'
		});
	}
}

//$(window).on('resize', function(){
//});