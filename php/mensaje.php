<?php
require_once $_SERVER["DOCUMENT_ROOT"]."/config/vging/config.php";
include( DIR_PRI.'/php/complementos/correo/psCorreo.php' );
include( DIR_PRI.'/php/complementos/funcionesGenericas/psFuncionesGenericas.php' );

$flag = strtolower( obtenerVariable( "flag" ) );

if( $flag == "env" ){
	$nom = strtolower( obtenerVariable( "nom" ) );
	$rem = strtolower( obtenerVariable( "rem" ) );
	$tel = strtolower( obtenerVariable( "tel" ) );
	$msj = strtolower( obtenerVariable( "men" ) );

	$asu = 'Solicitud de: '.$nom;

	if( $tel != '' )
		$tel = '<br/>Tel&eacute;fono de contacto: <b>'.$tel.'</b>';

	$frontera = generarStrFrontera();
	$REPLY_TO = utf8_decode( $nom ).'<'.$rem.'>';
	$cabecera = generarStrCabecera( CON_COPIA, CON_COPIA_OCULTA, 'mixed', $frontera, $REPLY_TO );
	$cuerpo   = generarStrMensaje( $msj.$tel, 'html', $frontera );
	$strMsj   = 'error';

	if( @mail( DESTINATARIO, $asu, $cuerpo, $cabecera ) )
		$strMsj = 'exito'.$cuerpo;

	echo $strMsj;
}
?>