<?php
require_once $_SERVER["DOCUMENT_ROOT"]."/config/vging/config.php";
require( DIR_PRI."/php/bd/psConexionMySql.php" );

function insImg( $llave, $titulo, $descripcion, $path ) {	
	$strQIns	= "INSERT INTO polaroid( llave, titulo, descripcion, path ) VALUES ( '%s', '%s', '%s', '%s' )";
	$qIns	  	= sprintf( $strQIns, $llave, $titulo, $descripcion, $path );

	$objMySql 	= new conexionMySQL();
	$objMySql  -> crearConexion();
	$resultIns	= $objMySql -> ejecutarQuery( $qIns );

	if( $resultIns ){
		$RowCount =  $objMySql -> getCountAffectedRows();
		$res = ($RowCount > 0) ? sprintf( $strRes, 'ok', 0, '', '', '' ) : $res = sprintf( $strRes, 'no', -2001, '', $qIns, '' );
		echo $res;
	} else
		echo sprintf( $strRes, "error", -2000, "resultIns=null", $qIns, '' );

	$objMySql -> cerrarConexion();
}

function actImg( $llave, $titulo, $descripcion, $path ) {
	$strQUpd  	= "UPDATE polaroid SET titulo = '%s', descripcion = '%s', path = '%s' WHERE llave = '%s'";
	$qUpd	  	= sprintf( $strQUpd, $titulo, $descripcion, $path, $llave );

	$objMySql 	= new conexionMySQL();
	$objMySql  -> crearConexion();
	$resultUpd	= $objMySql -> ejecutarQuery( $qUpd );

	if( $resultUpd ){
		$strResultado	= ', "resultado" : { "mapa" : "%s", "estado" : "%s" }';
		$RowCount 		=  $objMySql -> getCountAffectedRows();

		if( $RowCount > 0 ) {
			$res  = sprintf( $strRes, 'ok', 0, '', '', '' );	
		} else 
			$res = sprintf( $strRes, 'no', -3001, 'No se pudo guardar el cambio', $qUpd, '' );

		echo $res;
	} else
		echo sprintf( $strRes, "error", -3000, "resultUpd=null", $qUpd, '' );

	$objMySql -> cerrarConexion();
}
?>