<?php
require_once $_SERVER["DOCUMENT_ROOT"]."/config/vging/config.php";
require( DIR_PRI."/php/complementos/funcionesGenericas/psFuncionesGenericas.php" );
include( DIR_PRI."/php/bd/psConexionMySql.php" );

$usuario	= '';
$contrasena = '';

if( isset( $_COOKIE[ 'u' ], $_COOKIE[ 'p' ] ) ) {
	$usuario	= $_COOKIE[ 'u' ];
	$contrasena = sha1( md5( $_COOKIE[ 'p' ] ) );
} else {
	$usuario	= obtenerVariable( 'u' );
	$contrasena = sha1( md5( obtenerVariable( 'p' ) ) );
}
$rec	  = ( obtenerVariable( 'rec' ) == 'true' ) ? true : false;
$expira	  = time() - 3600;	

$query	  = sprintf( "SELECT idUsuario, contrasena FROM usuario WHERE idUsuario = '%s' AND contrasena = '%s' AND estado = 1 AND borrado = 0;", $usuario, $contrasena );
$strRes	  = '{ "estado" : "%s", "error" : { "errno" : "%s", "descripcion" : "%s", "q" : "%s" } %s }';
$strResultado   
		  = ', "resultado" : { "u" : "%s", "p": "%s", "tok" : "%s", "rec" : "%s" }';
$res	  = '';
$strErrnoTok = 'errno.-1003';

$objMySql = new conexionMySQL();
$objMySql -> crearConexion();
$result   = $objMySql -> ejecutarQuery( $query );

if($result)
{
    //while( $row = $objMySql -> getUltimaFila( $result ) ) {
    //    echo "El usuario es:".$row[1]." ".$row[2]." ".$row[3];
    //}
	$numFil = @mysqli_num_rows( $result );
	
	if( $numFil == 0 )
		$res = sprintf( $strRes, "error", -1001, "credenciales incorrectas", $query, '' );
	else if( $numFil == 1 )
	{
		$row = $objMySql -> getUltimaFila( $result );
		
		session_start();
		$_SESSION[ 's_u' ] = $row[ 0 ];
		$_SESSION[ 's_p' ] = $row[ 1 ];
		
		$codTok = sha1( md5( $row[ 1 ].strval( rand ( 1, 10000 ) ) ) );
		$strCodTok = strval($codTok);
		$strQIns= "INSERT INTO token(idUsuario, codigo, fecha) VALUES ( '%s', '%s', NOW() )";
		$qIns	= sprintf( $strQIns, $row[ 0 ], $strCodTok );

		$resultIns	= $objMySql-> ejecutarQuery( $qIns );
		if( $resultIns ){
			$RowCount =  $objMySql -> getCountAffectedRows();
			if($RowCount > 0)
				$_SESSION[ "s_tok" ] = $strCodTok;
		}else
			$_SESSION[ "s_tok" ] = $strErrnoTok;
		
		//if( true == $rec ){
		//	$expira = time() + 1728000; // Expira en 20 dias
		//	setcookie( 'u', $usuario, $expira, '/' );
		//	setcookie( 'p', $contrasena, $expira, '/' );
		//	setcookie( 'tok', $_SESSION[ "tok" ], $expira, '/' );
		//} else {
		//	$expira = time() - 3600;
		//	setcookie( 'u', $usuario, $expira, '/' );
		//	setcookie( 'p', $contrasena, $expira, '/' );
		//}
		$res = sprintf( $strRes, 'ok', '0', '', $query, sprintf( $strResultado, $row[ 0 ], obtenerVariable( 'p' ), $_SESSION[ 's_tok' ], $rec ) );
	}
	else
		$res = sprintf( $strRes, 'error', '-1002', 'multiples filas encontradas', $query, '' );
	
	$objMySql -> liberarResultado($result);
	echo $res;
}
else
	echo sprintf( $strRes, "error", '-1000', "result=null", $query, '' );

?>