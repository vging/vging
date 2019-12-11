<?php
require_once $_SERVER["DOCUMENT_ROOT"]."/config/vging/config.php";
require( DIR_PRI."/php/complementos/funcionesGenericas/psFuncionesGenericas.php" );
include( DIR_PRI."/php/bd/psConexionMySql.php" );

$comando	= strtolower( obtenerVariable( 'comn' ) );
$strRes	  	= '{ "estado" : "%s", "error" : { "errno" : "%s", "descripcion" : "%s", "q" : "%s" } %s }';
$res	  	= '';

switch( $comando )
{
	case "dic":
		
		$idPagina	= obtenerVariable( 'idPagina' );
		$idioma		= obtenerVariable( 'idioma' );
		$llave		= obtenerVariable( 'llave' );
		$valor		= obtenerVariable( 'valor' );

		$strQIns	= "INSERT INTO diccionario( idPagina, idioma, llave, valor, fecha ) VALUES ( '%s', '%s', '%s', '%s', NOW() )";
		$qIns	  	= sprintf( $strQIns, $idPagina, $idioma, $llave, $valor );
		
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
		
		break;
		
	case "map":
		
		$idPagina	= obtenerVariable( 'idPagina' );
		$idioma		= obtenerVariable( 'idioma' );
		$llave		= obtenerVariable( 'llave' );
		$flag		= ( strtolower( obtenerVariable( 'flag' ) ) == 'true' ? '1' : '0' );
		
		$strQUpd  	= "UPDATE diccionario SET visible = %d WHERE idPagina = %d AND idioma = '%s' AND llave = '%s'";
		$qUpd	  	= sprintf( $strQUpd, $flag, $idPagina, $idioma, $llave );
		
		$objMySql 	= new conexionMySQL();
		$objMySql  -> crearConexion();
		$resultUpd	= $objMySql -> ejecutarQuery( $qUpd );

		if( $resultUpd ){
			$strResultado
					  = ', "resultado" : { "mapa" : "%s", "estado" : "%s" }';
			$RowCount =  $objMySql -> getCountAffectedRows();
			
			if( $RowCount > 0 ) {
				$query	  = sprintf( "SELECT visible, valor, fecha FROM diccionario WHERE idPagina = %d AND idioma = '%s' AND llave = '%s' AND estado = 1 AND borrado = 0 ORDER BY correlativo DESC, fecha DESC LIMIT 1", $idPagina, $idioma, $llave );
				$result   = $objMySql -> ejecutarQuery( $query );
				if($result) {
					$numFil = @mysqli_num_rows( $result );
					
					if( $numFil == 1 ) {
						$row = $objMySql -> getUltimaFila( $result );
						//$res  = sprintf( $strRes, 'ok', 0, '', '', sprintf( $strResultado, $row[ 1 ], $row[ 0 ] ) );
						$res = ( '0' == $flag  ) ? 'false' : $row[ 1 ];
						//$res  = sprintf( $strRes, 'ok', 0, '', '', '' );	
					} else
						$res = sprintf( $strRes, 'error', -1002, 'multiples filas encontradas', $query, '' );
				} else
					return sprintf( $strRes, "error", -1000, "result=null", $query, '' );
			} else 
				$res = sprintf( $strRes, 'no', -3001, 'No se pudo guardar el cambio', $qUpd, '' );
			
			echo $res;
		} else
			echo sprintf( $strRes, "error", -3000, "resultUpd=null", $qUpd, '' );
		
		$objMySql -> cerrarConexion();
		
		break;
			
	case "eli":
		$correlativo	= obtenerVariable( 'correlativo' );
		//$idPagina	= obtenerVariable( 'idPagina' );
		//$idioma		= obtenerVariable( 'idioma' );
		//$llave		= obtenerVariable( 'llave' );
		
		//$strQUpd  	= "UPDATE diccionario SET borrado = 1 WHERE idPagina = %d AND idioma = '%s' AND llave = '%s'";
		$strQUpd  	= "UPDATE diccionario SET borrado = 1 WHERE correlativo = %d";
		//$qUpd	  	= sprintf( $strQUpd, $idPagina, $idioma, $llave );
		$qUpd	  	= sprintf( $strQUpd, $correlativo );
		
		$objMySql 	= new conexionMySQL();
		$objMySql  -> crearConexion();
		$resultUpd	= $objMySql -> ejecutarQuery( $qUpd );

		if( $resultUpd ){
			$strResultado
					  = ', "resultado" : { "mapa" : "%s", "estado" : "%s" }';
			$RowCount =  $objMySql -> getCountAffectedRows();
			
			if( $RowCount > 0 ) {
				$res  = sprintf( $strRes, 'ok', 0, '', '', '' );	
			} else 
				$res = sprintf( $strRes, 'no', -3001, 'No se pudo guardar el cambio', $qUpd, '' );
			
			echo $res;
		} else
			echo sprintf( $strRes, "error", -3000, "resultUpd=null", $qUpd, '' );
		
		$objMySql -> cerrarConexion();
		
		break;
		
	case "eli-pol":
		
		$idPolaroid	= obtenerVariable( 'idPolaroid' );
		$borrado	= obtenerVariable( 'borrado' );
		
		$strQUpd  	= "UPDATE polaroid SET borrado = %d WHERE idPolaroid = %d";
		$qUpd	  	= sprintf( $strQUpd, $borrado, $idPolaroid );
		
		$objMySql 	= new conexionMySQL();
		$objMySql  -> crearConexion();
		$resultUpd	= $objMySql -> ejecutarQuery( $qUpd );

		if( $resultUpd ) {
			$RowCount =  $objMySql -> getCountAffectedRows();
			
			if( $RowCount > 0 ) {
				$res  = sprintf( $strRes, 'ok', 0, '', '', '' );	
			} else 
				$res = sprintf( $strRes, 'no', -3001, 'No se pudo guardar el cambio', $qUpd, '' );
			
			echo $res;
		} else
			echo sprintf( $strRes, "error", -3000, "resultUpd=null", $qUpd, '' );
		
		$objMySql -> cerrarConexion();
		
		break;
	
	case "pol":
		
		$idPolaroid	= obtenerVariable( 'idPolaroid' );
		$campo		= obtenerVariable( 'campo' );
		$valor		= obtenerVariable( 'valor' );
		$valor		= ( $campo == 'pais' ) ? strGetCodByPais( $valor ) : $valor;
		
		$strQUpd  	= "UPDATE polaroid SET %s = '%s' WHERE idPolaroid = %d AND estado = 1 AND borrado = 0";
		$qUpd	  	= sprintf( $strQUpd, $campo, $valor, $idPolaroid );
		
		$objMySql 	= new conexionMySQL();
		$objMySql  -> crearConexion();
		$resultUpd	= $objMySql -> ejecutarQuery( $qUpd );

		if( $resultUpd ) {
			$RowCount =  $objMySql -> getCountAffectedRows();
			
			if( $RowCount > 0 ) {
				$res  = sprintf( $strRes, 'ok', 0, '', '', '' );	
			} else 
				$res = sprintf( $strRes, 'no', -3001, 'No se pudo guardar el cambio', $qUpd, '' );
			
			echo $res;
		} else
			echo sprintf( $strRes, "error", -3000, "resultUpd=null", $qUpd, '' );
		
		$objMySql -> cerrarConexion();
		
		break;
	
	case "eli-eqp":
		
		$idPolaroid	= obtenerVariable( 'idEquipo' );
		$borrado	= obtenerVariable( 'borrado' );
		
		$strQUpd  	= "UPDATE equipo SET borrado = %d WHERE idEquipo = %d";
		$qUpd	  	= sprintf( $strQUpd, $borrado, $idPolaroid );
		
		$objMySql 	= new conexionMySQL();
		$objMySql  -> crearConexion();
		$resultUpd	= $objMySql -> ejecutarQuery( $qUpd );

		if( $resultUpd ) {
			$RowCount =  $objMySql -> getCountAffectedRows();
			
			if( $RowCount > 0 ) {
				$res  = sprintf( $strRes, 'ok', 0, '', '', '' );	
			} else 
				$res = sprintf( $strRes, 'no', -3001, 'No se pudo guardar el cambio', $qUpd, '' );
			
			echo $res;
		} else
			echo sprintf( $strRes, "error", -3000, "resultUpd=null", $qUpd, '' );
		
		$objMySql -> cerrarConexion();
		
		break;
		
	case "eqp":
		
		$idEquipo	= obtenerVariable( 'idEquipo' );
		$campo		= obtenerVariable( 'campo' );
		$valor		= obtenerVariable( 'valor' );
		
		$strQUpd  	= "UPDATE equipo SET %s = '%s' WHERE idEquipo = %d";
		$qUpd	  	= sprintf( $strQUpd, $campo, $valor, $idEquipo );
		
		$objMySql 	= new conexionMySQL();
		$objMySql  -> crearConexion();
		$resultUpd	= $objMySql -> ejecutarQuery( $qUpd );

		if( $resultUpd ) {
			$RowCount =  $objMySql -> getCountAffectedRows();
			
			if( $RowCount > 0 ) {
				$res  = sprintf( $strRes, 'ok', 0, '', '', '' );	
			} else 
				$res = sprintf( $strRes, 'no', -3001, 'No se pudo guardar el cambio', $qUpd, '' );
			
			echo $res;
		} else {
			echo sprintf( $strRes, "error", -3000, "resultUpd=null", $qUpd, '' );
			
			//insertar
			//$strQIns	= "INSERT INTO equipo( idioma, llave, pais, nombre, descripcion, path ) VALUES ( '%s', '%s', NULL, NULL, NULL, '%s' )";
			//$qIns	  	= sprintf( $strQIns, $idioma, $llave, $nuevoPath );
			//$resultIns	= $objMySql -> ejecutarQuery( $qIns );

			//if( $resultIns ) {
			//	$RowCount =  $objMySql -> getCountAffectedRows();
			//	$res = ( $RowCount > 0 ) ? sprintf( $strRes, 'ok', 0, '', '', sprintf( $strResOk, $nuevoPath, $llave ) ) : sprintf( $strRes, 'no', -2001, '', $qIns, '' );
			//} else
			//	$res = sprintf( $strRes, 'error', -2000, 'resultIns=null', $qIns, '' );
			//fin insertar
		}
		
		$objMySql -> cerrarConexion();
		
		break;
		
	case "ins-eqp":
		
		$puesto		= obtenerVariable( 'puesto' );
		$profesion	= obtenerVariable( 'profesion' );
		$nombre		= obtenerVariable( 'nombre' );
		$perfil		= obtenerVariable( 'perfil' );
		
		$strQUpd  	= "UPDATE equipo SET %s = '%s' WHERE idEquipo = %d";
		$qUpd	  	= sprintf( $strQUpd, $campo, $valor, $idEquipo );
		
		$objMySql 	= new conexionMySQL();
		$objMySql  -> crearConexion();
		$resultUpd	= $objMySql -> ejecutarQuery( $qUpd );

		if( $resultUpd ) {
			$RowCount =  $objMySql -> getCountAffectedRows();
			
			if( $RowCount > 0 ) {
				$res  = sprintf( $strRes, 'ok', 0, '', '', '' );	
			} else 
				$res = sprintf( $strRes, 'no', -3001, 'No se pudo guardar el cambio', $qUpd, '' );
			
			echo $res;
		} else {
			echo sprintf( $strRes, "error", -3000, "resultUpd=null", $qUpd, '' );
		}
		
		$objMySql -> cerrarConexion();
		
		break;
}
?>