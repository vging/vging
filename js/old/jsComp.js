function __$( c ){
	return document.getElementById( c );
}

function esVisible( strObj ){
try{
	var obj = __$( strObj );
	if( !obj ) return null;
	if( obj.style.display == 'block' || obj.style.display == 'inline' )
		return true;
	else if( obj.style.display == 'none' || obj.style.display == '' )
		return false;
	else return false;
}catch( ex ){ alert( 'Error interno(jsCodigoComp)[esVisible(parms)]: ' + ex.message ); }
}

function colocarTexto( strObj, strTexto, display, foco ){
try{
	var obj;
	if( ( obj = __$( strObj ) ) ){
		if( obj.type == 'text' || obj.type == 'hidden' || obj.type == 'password' || obj.tagName == 'textarea' )
			obj.value = strTexto;
		else
			obj.innerHTML = strTexto;
		if( display )
			obj.style.display = display;
		if( foco )
			obj.focus();
	}
	else
		alert( 'Error interno(jsCodigoComp)[colocarTexto(parms)]: No existe el objeto "' + strObj + '"' );
}catch( ex ){ alert( 'Error interno(jsCodigoComp)[colocarTexto(parms)]: ' + ex.message ); }
}

function colocarTitle( strObj, strTexto ){
try{
	var obj = __$( strObj );
	if( obj )
		obj.title = strTexto;
	else
		alert( 'Error interno(jsCodigoComp)[colocarTitle(parms)]: No existe el objeto "' + strObj + '"' );
}catch( ex ){ alert( 'Error interno(jsCodigoComp)[colocarTitle(parms)]: ' + ex.message ); }
}

function colocarClass( strObj, clase ){
try{
	var obj = __$( strObj );
	if( obj )
		obj.className = clase;
	else
		alert( 'Error interno(jsCodigoComp)[colocarClass(parms)]: No existe el objeto "' + strObj + '"' );
}catch( ex ){ alert( 'Error interno(jsCodigoComp)[colocarClass(parms)]: ' + ex.message ); }
}

function colocarAtributo( strObj, atributo, valor ){
try{
	var obj = __$( strObj );
	if( obj )
		obj.setAttribute( atributo, valor );
	else
		alert( 'Error interno(jsCodigoComp)[colocarAtributo(parms)]: No existe el objeto "' + strObj + '"' );
}catch( ex ){ alert( 'Error interno(jsCodigoComp)[colocarAtributo(parms)]: ' + ex.message ); }
}

function obtenerTexto( strObj ){
try{
	var obj;
	if( ( obj = __$( strObj ) ) ){
		if( obj.type == 'text' || obj.type == 'hidden' || obj.type == 'password' || obj.type == 'textarea' )
			return obj.value;
		else if( obj.type == 'select-one' )
			return obj.options[ obj.options.selectedIndex  ].value;
		else
			return obj.innerHTML;
	}
	else
		return '';
}catch( ex ){ alert( 'Error interno(jsCodigoComp)[obtenerTexto(parms)]: ' + ex.message ); }
}

function optionSel( strSelect ){
try{
	var objSelect = __$( strSelect );
	if( objSelect )
		return objSelect.options[ objSelect.options.selectedIndex ].value;
	else return null;
}catch( ex ){ alert( 'Error interno(jsCodigoComp)[optionSel(parms)]: ' + ex.message ); }
}

function selOption( strSelect, indice, disabled ){
try{
	var objSelect = __$( strSelect );
	if( objSelect ){
		try{
			objSelect.options[ indice ].selected = true;
			if( disabled != undefined )
				objSelect.disabled = disabled;
			return true;
		}catch( ex1 ){ return false; }
	}
	return false;
}catch( ex ){ alert( 'Error interno(jsCodigoComp)[selOption(parms)]: ' + ex.message ); }
}

function selOptionPorValue( strSelect, value, disabled ){
try{
	var objSelect = __$( strSelect ), flag = false;
	if( objSelect ){
		try{
			var tam = objSelect.length;
			for( var i = 0; i < tam; i++ ){
				if( objSelect.options[ i ].value == value ){
					objSelect.options[ i ].selected = flag = true;
					break;
				}
			}
			
			if( disabled != undefined )
				objSelect.disabled = disabled;
			return flag;
		}catch( ex1 ){ return false; }
	}
	return false;
}catch( ex ){ alert( 'Error interno(jsCodigoComp)[selOptionPorValue(parms)]: ' + ex.message ); }
}

function selOption_( strDiv, indice, disabled ){
try{
	var d = __$( strDiv );
	if( d.firstChild ){
		if( d.firstChild.tagName.toLowerCase().indexOf( 'select' ) >= 0 ){
			d.firstChild.options[ indice ].selected = true;
			if( disabled != undefined )
				d.firstChild.disabled = disabled;
			return true;
		}
		return false;
	}
	return false;
}catch( ex ){ alert( 'Error interno(jsCodigoComp)[selOption_(parms)]: ' + ex.message ); }
}