<?php
require_once $_SERVER["DOCUMENT_ROOT"]."/config/vging/config.php";
require( DIR_PRI."/php/complementos/funcionesGenericas/psFuncionesGenericas.php" );
include( DIR_PRI."/php/bd/psConexionMySql.php" );

//if (!isset($_POST['btnSubmit'])) {
//    echo 'Enviar datos correctamente';
//	exit();
//}
$upLdImg	= obtenerVariable( 'upLdImg' );

if( is_null( $upLdImg ) ) {
	$upLdImg = "uploadImage";
}

$uploadfile = $_FILES[ $upLdImg ][ "tmp_name" ];

$nuevoPath	= '';
$strRes	  	= '{ "estado" : "%s", "error" : { "errno" : "%s", "descripcion" : "%s", "q" : "%s" } %s }';
$strResOk	= ', "resultado" : { "path" : "%s", "llave": "%s" }';
$res	  	= '';
$strResTmp	= '';

$folderRutaN= '../../imagenes/equipo/';
$folderRutaS= '../../imagenes/servicios/';
$folderRutaP= '../../imagenes/proyectos/polaroid/';
$folderRutaI= '../../imagenes/';
$folderRuta = '';
//$folderRuta = $_SERVER[ "DOCUMENT_ROOT" ]."/comtop/v1.1/imagenes/proyectos/polaroid/";
$idPagina	= obtenerVariable( 'idPagina' );
$idioma		= obtenerVariable( 'idioma' );

if( $idPagina == 3 ) {			// 3 = servicios
	$folderRuta = $folderRutaS;
} else if( $idPagina == 4 ) {	// 4 = proyectos
	$folderRuta = $folderRutaP;
} else if( $idPagina == 7 ) {	// 7 = nosotros
	$folderRuta = $folderRutaN;
} else {
	$folderRuta = $folderRutaI;
}

if (! is_writable($folderRuta) || ! is_dir($folderRuta)) {
	$res = sprintf( $strRes, 'no', -4001, 'not is_write o not is_dir', '', '' );
	echo $res;
	exit();
} else {
	if( move_uploaded_file( $uploadfile, $folderRuta . $_FILES[ $upLdImg ][ "name" ] ) ) {
		
		//echo '<img src="' . $folderRuta . "" . $_FILES[ $upLdImg ][ "name" ] . '">';
	
		$nuevoPath	= ''.$folderRuta . "" . $_FILES[ $upLdImg ][ "name" ];
		$res		= sprintf( $strRes, $nuevoPath, 0, '', '', '' );
	} else {
		$res = sprintf( $strRes, 'no', -4002, 'No se pudo mover el archivo.'.$folderRuta.$_FILES[ $upLdImg ][ "name" ], '', '' );
		echo $res;
		exit();
	}
}

$comando	= strtolower( obtenerVariable( 'comn' ) );
switch( $comando )
{
	case "img-serv" :
		
		$llave		= obtenerVariable( 'llave' );
		$query	  	= sprintf( "SELECT idPolaroid, path FROM polaroid WHERE llave = '%s' LIMIT 1", $llave );

		$objMySql	= new conexionMySQL();
		$objMySql  -> crearConexion();
		$result		= $objMySql -> ejecutarQuery( $query );

		if( $result ) {
			$numFil = @mysqli_num_rows( $result );

			if( $numFil == 0 ) {
				//insertar
				$strQIns	= "INSERT INTO polaroid( idioma, llave, pais, nombre, descripcion, path ) VALUES ( '%s', '%s', NULL, NULL, NULL, '%s' )";
				$qIns	  	= sprintf( $strQIns, $idioma, $llave, $nuevoPath );
				$resultIns	= $objMySql -> ejecutarQuery( $qIns );

				if( $resultIns ) {
					$RowCount =  $objMySql -> getCountAffectedRows();
					$res = ( $RowCount > 0 ) ? sprintf( $strRes, 'ok', 0, '', '', sprintf( $strResOk, $nuevoPath, $llave ) ) : $res = sprintf( $strRes, 'no', -2001, '', $qIns, '' );
				} else
					$res = sprintf( $strRes, 'error', -2000, 'resultIns=null', $qIns, '' );
				//fin insertar
			}
			else if( $numFil == 1 ) {
				$row = $objMySql -> getUltimaFila( $result );

				//actualizar
				$strQUpd  	= "UPDATE polaroid SET path = '%s' WHERE idPolaroid = %d";
				$qUpd	  	= sprintf( $strQUpd, $nuevoPath, $row[ 0 ] );
				$resultUpd	= $objMySql -> ejecutarQuery( $qUpd );

				if( $resultUpd ) {
					$RowCount =  $objMySql -> getCountAffectedRows();
					$res = ( $RowCount > 0 ) ? sprintf( $strRes, 'ok', 0, '', '', sprintf( $strResOk, $nuevoPath, $llave ) ) : sprintf( $strRes, 'no', -3001, 'No se pudo guardar el cambio', $qUpd, '' );
				} else
					$res = sprintf( $strRes, "error", -3000, "resultUpd=null", $qUpd, '' );
				//fin actualizar
			}
			else
				$res = sprintf( $strRes, 'error', -1002, 'multiples filas encontradas', $query, '' );

			$objMySql -> liberarResultado($result);
			$objMySql -> cerrarConexion();
		} else
			$res = sprintf( $strRes, 'error', -1000, 'result=null', $query, '' );
		
		break;
		
	case "img-proy" :
		
		$idioma		= obtenerVariable( 'idioma' );
		$llave		= obtenerVariable( 'llave' );
		$pais		= obtenerVariable( 'pais' );
		$nombre		= obtenerVariable( 'nombre' );
		$descripcion= obtenerVariable( 'descripcion' );
		
		$objMySql	= new conexionMySQL();
		$objMySql  -> crearConexion();
		
		//insertar
		$strQIns	= "INSERT INTO polaroid( idioma, llave, pais, nombre, descripcion, path ) VALUES ( '%s', '%s', '%s', '%s', '%s', '%s' )";
		$qIns	  	= sprintf( $strQIns, $idioma, $llave, $pais, $nombre, $descripcion, $nuevoPath );
		$resultIns	= $objMySql -> ejecutarQuery( $qIns );

		if( $resultIns ) {
			$RowCount =  $objMySql -> getCountAffectedRows();
			$res = ( $RowCount > 0 ) ? sprintf( $strRes, 'ok', 0, '', '', sprintf( $strResOk, $nuevoPath, $llave ) ) : sprintf( $strRes, 'no', -2001, '', $qIns, '' );
		} else
			$res = sprintf( $strRes, 'error', -2000, 'resultIns=null', $qIns, '' );
		//fin insertar
		
		$objMySql -> cerrarConexion();
		
		break;
	
	case "img-nos" :
		
		$puesto		= obtenerVariable( 'puesto' );
		$profesion	= obtenerVariable( 'profesion' );
		$nombre		= obtenerVariable( 'nombre' );
		$perfil		= obtenerVariable( 'perfil' );
		
		$objMySql	= new conexionMySQL();
		$objMySql  -> crearConexion();
		
		$strQIns	= "INSERT INTO equipo( idioma, puesto, profesion, nombre, perfil, fotografia ) VALUES ( '%s', '%s', '%s', '%s', '%s', '%s' )";
		$qIns	  	= sprintf( $strQIns, $idioma, $puesto, $profesion, $nombre, $perfil, $nuevoPath );
		$resultIns	= $objMySql -> ejecutarQuery( $qIns );

		if( $resultIns ) {
			$RowCount =  $objMySql -> getCountAffectedRows();
			$res = ( $RowCount > 0 ) ? sprintf( $strRes, 'ok', 0, '', '', sprintf( $strResOk, $nuevoPath, "foto" ) ) : sprintf( $strRes, 'no', -2001, '', $qIns, '' );
		} else
			$res = sprintf( $strRes, 'error', -2000, 'resultIns=null', $qIns, '' );
		
		$objMySql -> cerrarConexion();
		break;
		
	case "img-nos-updt" :
		
		$idEquipo	= obtenerVariable( 'idEquipo' );
		
		$objMySql	= new conexionMySQL();
		$objMySql  -> crearConexion();
		
		//actualizar
		$strQUpd  	= "UPDATE equipo SET fotografia = '%s' WHERE idEquipo = %d";
		$qUpd	  	= sprintf( $strQUpd, $nuevoPath, $idEquipo );
		$resultUpd	= $objMySql -> ejecutarQuery( $qUpd );

		if( $resultUpd ) {
			$RowCount =  $objMySql -> getCountAffectedRows();
			$res = ( $RowCount > 0 ) ? sprintf( $strRes, 'ok', 0, '', '', sprintf( $strResOk, $nuevoPath, 'uiImgLd'.$idEquipo ) ) : sprintf( $strRes, 'no', -3001, 'No se pudo guardar el cambio', $qUpd, '' );
		} else
			$res = sprintf( $strRes, "error", -3000, "resultUpd=null", $qUpd, '' );
		//fin actualizar
		
		$objMySql -> cerrarConexion();
		break;
		
	case "" :
		$res = $strResTmp;
		break;
}

echo $res;
?>