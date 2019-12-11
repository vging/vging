<?php
	session_start();
	if( !isset( $_SESSION[ 's_idUsuario' ] ) )	header( "location:/login.php" );

	include($_SERVER["DOCUMENT_ROOT"]."/config/config.php");
	include( $_SERVER[ "DOCUMENT_ROOT" ]."/php/funcionesGenericas/psFuncionesGenericas.php" );
	
	$idRol = 		$_SESSION[ "s_idRol" ];
	$idUsuario = 	$_SESSION[ "s_idUsuario" ];
	$jerarquia = 	$_SESSION[ "s_jerarquia" ];
	
	$codEstablecimiento = obtenerVariable('codEstablecimiento');
	$whereAux = "";

	if( $codEstablecimiento != null && $jerarquia <= 80 ){
		$whereAux = "and ep.codEstablecimiento='$codEstablecimiento'";
	}
	
	include( $_SERVER[ "DOCUMENT_ROOT" ]."/config/psVerificarCaducidad.php" );
	
	$str = "";
	
    $query = 	"SELECT ep.idUnidad, p.nombre, p.apellido, pu.nombre as puesto
					FROM status_personal sp INNER JOIN establecimiento_persona ep ON sp.idStatusP = ep.idStatusP
						INNER JOIN persona p ON ep.idPersona=p.idPersona INNER JOIN  usuario u ON p.idPersona=u.idPersona
						LEFT JOIN puesto pu ON  ep.idPuesto=pu.idPuesto and ep.idUnidad=pu.idUnidad
				WHERE u.idUsuario = $idUsuario and sp.status = '1' $whereAux";

    if( ($result = procesarConsulta( $query, 1)) != null){
		$row = mysql_fetch_array( $result );
		$str .= "<input type=\"hidden\" id=\"hdUnidadUsuario\" value=\"".$row["idUnidad"]."\"/>";
		$str .= "<input type=\"hidden\" id=\"hdNombreUsuario\" value=\"".$row["nombre"]."\"/>";
		$str .= "<input type=\"hidden\" id=\"hdApellidoUsuario\" value=\"".$row["apellido"]."\"/>";
		$str .= "<input type=\"hidden\" id=\"hdPuestoUsuario\" value=\"".$row["puesto"]."\"/>";
	}else $str .= "<input type=\"hidden\" id=\"hdUnidadUsuario\" value=\"\"/> ";
    
	$str .= "<input type=\"hidden\" id=\"hdJerarquiaUsuario\" value=\"$jerarquia\"/>";
	echo $str;
?>