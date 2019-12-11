<?php
function obtenerVariable( $strVar ){
	if( isset( $_GET[ $strVar ] ) )
		//$var = mysql_real_escape_string( $_GET[ $strVar ] );
		$var = utf8_urldecode( $_GET[ $strVar ] );
	else if( isset( $_POST[ $strVar ] ) )
		$var = utf8_urldecode( $_POST[ $strVar ] );
	else $var = null;
	return $var;
}

function obtenerNomTbl( $idioma ) {
	$tbl = '';
	switch ($idioma) {
    case 'es-GT':
        $tbl = 'espanol';
        break;
    case 'en-EU':
        $tbl = 'ingles';
        break;
	}
	return $tbl;
}

function mySelect( $query ){
	
	$result = mysqli_query( $query, $GLOBALS[ "conexion" ] );
	return $result;
	/*
	if( $tipo == 1 ){
		if( @mysqli_num_rows( $result ) == 0 )
			return null;
		else return $result;
	}
	else if( $tipo == 2 ){
		if( @mysqli_affected_rows() == 0 )
			return null;
		else return $result;
	}
	return null;*/
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