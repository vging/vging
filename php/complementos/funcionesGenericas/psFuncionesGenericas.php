<?php
function strGetPaisByCod( $strCod ) {
	$strPais = '';
	switch( $strCod ) {
		case 'gt': $strPais = 'Guatemala'; break;
		case 'sv': $strPais = 'El Salvador'; break;
		case 'hn': $strPais = 'Honduras'; break;
		case 'ni': $strPais = 'Nicaragua'; break;
		case 'cr': $strPais = 'Costa Rica'; break;
		case 'pa': $strPais = 'Panamá'; break;
		default: 
			$strPais = $strCod;
			break;
	}
	return $strPais;
}

function strGetCodByPais( $strPais ) {
	$strCod = '';
	$strPais = strtolower( $strPais );
	switch( $strPais ) {
		case 'guatemala':	$strCod = 'gt'; break;
		case 'el salvador':	
		case 'elsalvador':
		case 'salvador':
							$strCod = 'sv'; break;
		case 'honduras':	$strCod = 'hn'; break;
		case 'nicaragua':	$strCod = 'ni'; break;
		case 'costa rica':	
		case 'costarica':	$strCod = 'cr'; break;
		case 'panamá':		
		case 'panama':		$strCod = 'pa'; break;
		default:  
			$strCod = $strPais; 
			break;
	}
	return $strCod;
}

function obtenerVariable( $strVar ){
	if( isset( $_GET[ $strVar ] ) )
		//$var = mysql_real_escape_string( $_GET[ $strVar ] );
		$var = utf8_urldecode( $_GET[ $strVar ] );
	else if( isset( $_POST[ $strVar ] ) )
		$var = utf8_urldecode( $_POST[ $strVar ] );
	else $var = null;
	return $var;
}

function procesarConsulta( $query, $tipo = 1, $imgCerrar = "" ){
	$result = mysql_query( $query, $GLOBALS[ "conexion" ] ) or die ( "<label class=\"etiquetaErrorInterno\">".$imgCerrar."SQL: <label class=\"normalAzul\">".mysql_error()."</label></label>" );
	if( $tipo == 1 ){
		if( @mysql_num_rows( $result ) == 0 )
			return null;
		else return $result;
	}
	else if( $tipo == 2 ){
		if( @mysql_affected_rows() == 0 )
			return null;
		else return $result;
	}
}

function mensaje( $msj, $tipo, $imgCerrar = "", $estilo = "" ){
	$str = "{vacio}";
	if( $tipo == "errorInterno" )
		$str = "<label id=\"mei\" class=\"etiquetaErrorInterno\" $estilo>".$imgCerrar."SQL: <label class=\"normalAzul\">$msj</label></label>";
	else if( $tipo == "error" )
		$str = "<label id=\"mer\" class=\"etiquetaError\" $estilo>".$imgCerrar."$msj</label>";
	else if( $tipo == "aviso" )
		$str = "<label id=\"ma\" class=\"etiquetaAviso\" $estilo>".$imgCerrar."$msj</label>";
	else if( $tipo == "info" )
		$str = "<label id=\"mi\" class=\"etiquetaInfo\" $estilo>".$imgCerrar."$msj</label>";
	else if( $tipo == "noti" )
		$str = "<label id=\"mn\" class=\"etiquetaNoti\" $estilo>".$imgCerrar."$msj</label>";
	else if( $tipo == "exito" )
		$str = "<label id=\"me\" class=\"etiquetaExito\" $estilo>".$imgCerrar."$msj</label>";
	else
		$str = "<label class=\"etiquetaErrorInterno\" $estilo>".$imgCerrar."Sistema: <label class=\"normalAzul\">Error interno desconocido. Imposible recuperar!</label></label>";
	return $str;
}

function imgCerrarDiv( $div ){
	$img = "<img src=\"/Imagenes/cerrarMe.gif\" class=\"imgCerrarMe\" onclick=\"mostrarMensaje( false, '$div' );\" alt=\"Cerrar\" title=\"cerrar\"/>"; 
	return $img;
}

function rangoRol( $inferior, $jerarquia, $superior ){
	if( $inferior <= $jerarquia && $jerarquia <= $superior )
		return true;
	return false;
}

function utf8_urldecode($str) {
    $str = preg_replace("/%u([0-9a-f]{3,4})/i","&#x\\1;",urldecode($str));
    return html_entity_decode($str,null,'UTF-8');;
}
?>