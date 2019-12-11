var flagChat = true;

function cargarChat(){
	$( '#uiAWasap' ).attr( 'href', "https://api.whatsapp.com/send?phone=50253874947" );
	$( '#uiAFbMessenger' ).attr( 'href', "https://m.me/dvasquezgutierrez" );
	
	if (isTouchDevice)
	{
		$( '#uiAChat' ).click( function(){ cambiarAparienciaMouseEnter( false ); abrirCerrarChat(); } );
    } else {
		$( '#uiAChat' ).mouseenter( _mouseenter );
		$( '#uiAChat' ).click( abrirCerrarChat );
    }
}

function abrirCerrarChat()
{	
	if(flagChat){
		flagChat = false;
		cambiarCssAChat( 'hidden' );
		$( '#uiSpanChat' ).removeClass( 'icon-bubbles4' );
		$( '#uiSpanChat' ).addClass( 'icon-cross' );
	}
	else{
		flagChat = true;
		$( '#uiAChat' ).addClass( 'rotar' );
		
		$( '#uiSpanChat' ).removeClass( 'icon-cross' );
		$( '#uiSpanChat' ).addClass( 'icon-bubbles4' );
		
		setTimeout( function(){ if(flagChat){ cambiarCssAChat( 'visible' ); $( '#uiAChat' ).removeClass( 'rotar' ); } }, 2000 );
	}
	
	$( '#uiDivChats' ).animate({
		width: "toggle",
		opacity: "toggle"
	});
}

/*function _mouseenter()
{
	//function(){ if( flagChat ){ abrirCerrarChat(); }else{ } }
	
	if( flagChat ){
		cambiarCssAChat( 'hidden' );
		//abrirCerrarChat(); 
	}
}*/

function _mouseenter()
{	
	if( flagChat ){
		flagChat = false;
		cambiarAparienciaMouseEnter( true );
	}
}

function cambiarAparienciaMouseEnter( flagAnimate )
{
	cambiarCssAChat( 'hidden' );
	$( '#uiAChat' ).addClass( 'rotar' );

	$( '#uiSpanChat' ).removeClass( 'icon-bubbles4' );
	$( '#uiSpanChat' ).addClass( 'icon-cross' );

	if( flagAnimate )
		$( '#uiDivChats' ).animate({
			width: "toggle",
			opacity: "toggle"
		});

	setTimeout( function(){ $( '#uiAChat' ).removeClass( 'rotar' ); }, 900 );
}

function cambiarCssAChat( strVis )
{
	$('#uiAChat span').each(
		function(){
			$( this ).css( 'visibility', strVis );
		}
	);
}