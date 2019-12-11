<?php
	include( $_SERVER["DOCUMENT_ROOT"]."/config/config.php" );
	include( $_SERVER[ "DOCUMENT_ROOT" ]."/php/funcionesGenericas/psFuncionesGenericas.php" );
	@session_start();
	if( !isset( $_SESSION[ 's_idUsuario' ] ) )
		header( "location:/login.php" );

	$idUsuario =    	$_SESSION[ 's_idUsuario' ]*1;
    $idRol =        	$_SESSION[ 's_idRol' ]*1;
	$tabla = 			obtenerVariable( "tabla" );
	$IDparametro = 		obtenerVariable( "IDparametro" );
	$IDvalor = 			obtenerVariable( "IDvalor" );
	$IDtipo = 			obtenerVariable( "IDtipo" );
	$razon = 			obtenerVariable( "razon" );
	$contParametros = 	obtenerVariable( "contParametros" );
	$contG	= 0;

	if( $IDtipo = null ) $IDtipo = "I";
	if( $contParametros == null) $contParametros = 1;
	if( $razon == null ) $razon = "actualizacion de datos";
	
	date_default_timezone_set( 'America/Guatemala' );
	$fechaActual = date( "Y-m-d H:i:s" );
	
	if( $tabla == null || $IDparametro == null || $IDvalor == null )
		die( mensaje( "[SISTEMA] parametros de modificacion no fueron recibidos, intentelo de nuevo", "error" ) );
	
	guardarCambios("S");
	guardarCambios("I");
	guardarCambios("N");
	
	if( $contG > 0 ){
		if( $contG == $contParametros )
			die( mensaje( "cambios realizados con exito", "exito" ) );
		else
			die( mensaje( "se modificaron algunos de los datos, verifique la informaci&oacute;n", "exito" ) );
	}else
		die( mensaje( "No se realizaron cambios", "aviso" ) );
	
	function guardarCambios( $prefijo ){
		$contador=1;
		$parametro = $prefijo."parametro".$contador;
		$valor = $prefijo."valor".$contador;
		while( isset( $_POST[ $parametro ] )){
			if( $prefijo =="N" )
				$valor = "null";
			else
				$valor = $_POST[ $valor ];
			$parametro = $_POST[ $parametro ];
			modificarDatos( $prefijo, $parametro, $valor );
			$contador++;
			$parametro=$prefijo."parametro".$contador;
			$valor = $prefijo."valor".$contador;
		}
	}

	function modificarDatos( $tipo, $parametro, $valor ){
		global $IDtipo, $tabla, $IDparametro, $IDvalor, $conexion, $idUsuario, $idRol, $fechaActual, $modificacion, $contG, $razon;
		if($tipo == "I" )
			$tipo = "%d";
		else if( $tipo == "N" )
			$tipo = "%s";
		else
			$tipo = "'%s'";
		if( $IDtipo == "I" )
			$IDtipo = "%d";
		else
			$IDtipo = "'%s'";
		$query = sprintf( "UPDATE $tabla SET $parametro = $tipo WHERE $IDparametro = $IDtipo", $valor, $IDvalor );
		
		if( procesarConsulta( $query, 2) != null ){
			$queryH = 	sprintf ( "INSERT INTO historial (idHistorial, idUsuario, idRol, fechaHora, accion, tabla, idTabla, campo, valor, razon)
									values(default, $idUsuario, $idRol, '$fechaActual', 'update', '$tabla',$IDvalor,'$parametro','$valor', '$razon')"
								);
			mysql_query( $queryH, $conexion) or die( "<label class=\"etiquetaError\">Peticion SQL no fue procesada: ".$queryH."<br/> error: <label class=\"normalAzul\">".mysql_error()."</label></label>" );
		}
		$contG ++;
	}
?>