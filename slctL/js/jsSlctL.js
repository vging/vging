var slctL = function(){

	//var MASCARA			= '<label class="normalGris" style="color: #C1C1C1;"> - Seleccione - </label>';
	var MASCARA			= '<label class="normalGris" style="color: #C1C1C1;">&nbsp;</label>';
	var MASCARA_AJAX	= '';
	var FALLO_AJAX		= 'Intentar cargar de nuevo';
	
	return{
		init:function( slct, width, flagSelOption, flagSinIndent ){
			slct = ( typeof( slct ) == 'string' )?document.getElementById( slct ):slct;
			
			nuevoEvento( slct,			'change', function(){ slctL.onChangeSlct( slct ); } );
			this.onFocusSlct( slct );
			this.onBlurSlct( slct );
			this.agregarIndent( slct, width, flagSinIndent );
			if( flagSelOption )
				this.onChangeSlct( slct );
		},
		
		onFocusSlct:function( slct ){
			slct = ( typeof( slct ) == 'string' )?document.getElementById( slct ):slct;
			
			nuevoEvento( slct,			'focus',  function(){ slct.parentNode.style.borderColor = '#0077FF'; } );
		},
		
		onBlurSlct:function( slct ){
			slct = ( typeof( slct ) == 'string' )?document.getElementById( slct ):slct;
			
			nuevoEvento( slct,			'blur',   function(){ slct.parentNode.style.borderColor = ''; } );
		},
		
		onChangeSlct:function( slct ){
			try{
				slct = ( typeof( slct ) == 'string' )?document.getElementById( slct ):slct;

				var div 		= slct.parentNode.getElementsByTagName( 'div' )[ 0 ];
				//obj.innerHTML = slct.options[ slct.selectedIndex ].innerHTML.replace( /^\s+|\s+$/g, '' );
				if( div ){
				    if( slct.options[ slct.selectedIndex ] )
					    div.innerHTML	= slct.options[ slct.selectedIndex ].innerHTML.replace( /^(&nbsp;)+/g, '' );
					else
					    alert( 'Aviso interno(jsSlctL)[onChangeSlct(parms: { slct: "' + slct + '", div: "' + div + '" } ) ]: El objeto slct.options[ slct.selectedIndex ] es "' + slct.options[ slct.selectedIndex ] + '", Esta seguro de iniciar el (parm) flagSelOption en true? (metodo: onChangeSlct llamado desde init )' );
					    
					div.style.color = '';
				}
			}catch( ex ){ alert( 'Error interno(jsSlctL)[onChangeSlct(parms: { slct: ' + slct + ', div: ' + div + ' } )]: ' + ex.message ); }
		},
		
		crearSelect:function( innerHTML, strContenedor, responseText, flag, widthSlctBox, widthBox ){
			var selectBox, box, objDivContenedor;
			
			widthSlctBox				= (widthSlctBox)?widthSlctBox:'73%';
			//fix ie7 & ie8 modo quirks
			widthSlctBox				= ( ( ie && document.documentMode <= 7 ) &&  widthSlctBox == '73%' )?'250px':widthSlctBox;
			widthBox					= (widthBox)?widthBox:'92%';
			flag						= (flag == undefined || flag == null)?true:flag;
			
			selectBox					= document.createElement( 'div' );
			selectBox.className			= 'selectBox select-box';
			selectBox.style.width		= widthSlctBox;
			
			box							= document.createElement( 'div' );
			box.className				= 'box';
			box.style.width				= widthBox;
			box.innerHTML				= innerHTML;
			
			selectBox.appendChild( box );
			selectBox.innerHTML		   += responseText;
			
			objDivContenedor			= document.getElementById( strContenedor );
			objDivContenedor.innerHTML	= '';
			objDivContenedor.appendChild( selectBox );
			
			mostrarMensaje( flag, strContenedor, objDivContenedor.innerHTML );
		},
		
		disabledSlct:function( str, flag ){
			try{
				var o, color;
				o				= document.getElementById( str );
				color			= ( flag )?'#CCC':'';
				obj				= o.parentNode.getElementsByTagName( 'div' )[ 0 ];
				obj.style.color = color;
				
				if( flag ){
					var img				= document.createElement( 'img' );
					img.src				= '../web/Imagenes/lockD.gif';
					img.style.position	= 'absolute';
					//img.style.top		= '3px';
					//img.style.right		= '0';
					img.style.top		= '4px';
					img.style.right		= '15px';
					obj.appendChild( img );
				}
				else{
					obj.innerHTML		= '';
					this.onChangeSlct( str );
				}
				o.disabled = flag;
			}catch( ex ){ alert( 'Error interno(jsSlctL)[disabledSlct(parms)]: ' + ex.message ); }
		},
		
		agregarIndent:function ( slct, width, flagSinIndent ){
			try{
			    
			    var strIndentIni = '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;';
			    var strIndentFin = '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'; //inicialmente solo había 1 &nbsp;
			    
				slct = ( typeof( slct ) == 'string' )?document.getElementById( slct ):slct;
				if( !slct )	return false;
				if( width != undefined )
					slct.style.width = width;
				var longitud = slct.length;
				
				for( var i = 0; i < longitud; i++ )
				{
					//slct.options[ i ].innerHTML = '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + slct.options[ i ].innerHTML.substring( 0, 1 ).toUpperCase() + slct.options[ i ].innerHTML.substring( 1 );
					if( true == flagSinIndent)
						slct.options[ i ].innerHTML = '&nbsp;' + slct.options[ i ].innerHTML + ( (i == 0) ? '&nbsp;&nbsp;' : '' );
					else
						slct.options[ i ].innerHTML = strIndentIni + slct.options[ i ].innerHTML + ( (i == 0) ? strIndentFin : '' );
			    }
			}catch( ex ){ alert( 'Error interno(jsSlctL)[agregarIndent(parms)]: ' + ex.message ); }
		},
		
		colocarLink:function( className, strFn, innerHTML ){
			strFn		= (strFn)?strFn:'';
			className	= (className)?className:'';
			innerHTML	= (innerHTML)?innerHTML:this.obtenerFalloAjax();
			return '<a href="javascript:;" onclick="' + strFn + '" class="' + className + '">' + innerHTML + '</a>';
		},
		
		obtenerMascara:function(){
			return MASCARA;
		},
		
		obtenerMascaraAjax:function(){
			return MASCARA_AJAX;
		},
		
		obtenerFalloAjax:function(){
			return FALLO_AJAX;
		},
		
		colocarMascara:function( str ){
			MASCARA = str;
		},
		
		colocarMascaraAjax:function( str ){
			MASCARA_AJAX = str;
		},
		
		colocarFalloAjax:function( str ){
			FALLO_AJAX = str;
		}
	};
}();