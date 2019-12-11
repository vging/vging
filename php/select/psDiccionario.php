<?php
require_once $_SERVER["DOCUMENT_ROOT"]."/config/vging/config.php";
require( DIR_PRI."/php/complementos/funcionesGenericas/psFuncionesGenericas.php" );
include( DIR_PRI."/php/bd/psConexionMySql.php" );

function obtenerImg( $llave ) {
	$query	  = sprintf( "SELECT path FROM polaroid WHERE llave = '%s'", $llave );
	
	$strRes	  = '{ "estado" : "%s", "error" : { "errno" : "%s", "descripcion" : "%s", "q" : "%s" } %s }';
	$res	  = '';

	$objMySql = new conexionMySQL();
	$objMySql -> crearConexion();
	$result   = $objMySql -> ejecutarQuery( $query );

	if($result)
	{
		$numFil = @mysqli_num_rows( $result );

		if( $numFil == 0 )
			//$res = sprintf( $strRes, "error", -1001, "0 filas encontradas", $query, '' );
			$res = "";
		else if( $numFil == 1 )
		{
			$row = $objMySql -> getUltimaFila( $result );
			$res = sprintf( $strRes, 'ok', 0, '', $query, '' );
			
			return $row[ 0 ];
		}
		else
			//$res = sprintf( $strRes, 'error', -1002, 'multiples filas encontradas', $query, '' );
			$res = "";

		$objMySql -> liberarResultado($result);
		$objMySql -> cerrarConexion();
		return $res;
	}
	else
		return $res = "../../imagenes/sinFoto.jpg";//sprintf( $strRes, "error", -1000, "result=null", $query, '' );
}

function obtenerValor( $idioma, $idPagina, $llave ) {	
	$query	  = sprintf( "SELECT visible, valor, fecha FROM diccionario WHERE idPagina = %d AND idioma = '%s' AND llave = '%s' AND estado = 1 AND borrado = 0 ORDER BY correlativo DESC, fecha DESC LIMIT 1", $idPagina, $idioma, $llave );
	
	$strRes	  = '{ "estado" : "%s", "error" : { "errno" : "%s", "descripcion" : "%s", "q" : "%s" } %s }';
	$res	  = '';

	$objMySql = new conexionMySQL();
	$objMySql -> crearConexion();
	$result   = $objMySql -> ejecutarQuery( $query );

	if($result)
	{
		$numFil = @mysqli_num_rows( $result );

		if( $numFil == 0 )
			$res = sprintf( $strRes, "error", -1001, "0 filas encontradas", $query, '' );
		else if( $numFil == 1 )
		{
			$row = $objMySql -> getUltimaFila( $result );
			$res = sprintf( $strRes, 'ok', 0, '', $query, '' );
			if( '1' == $row[ 0 ] )
				return $row[ 1 ];
				//return $query;
			
			return "false";
		}
		else
			$res = sprintf( $strRes, 'error', -1002, 'multiples filas encontradas', $query, '' );

		$objMySql -> liberarResultado($result);
		$objMySql -> cerrarConexion();
		return $res;
	}
	else
		return sprintf( $strRes, "error", -1000, "result=null", $query, '' );
}

function obtenerValores( $idioma, $idPagina, $preFijoLLave ) {
	
	$subQuery	= "SELECT llave, max(correlativo) as correlativo FROM diccionario WHERE idPagina = ".$idPagina." AND idioma = '".$idioma."' AND llave LIKE '".$preFijoLLave."%' AND estado = 1 AND borrado = 0 GROUP BY llave ORDER BY llave ASC";
	$query		= "SELECT visible, llave, valor, fecha, correlativo FROM diccionario WHERE idPagina = ".$idPagina." AND idioma = '".$idioma."' AND estado = 1 AND borrado = 0 AND ( llave, correlativo ) IN ( ".$subQuery." ) ORDER BY llave";
		
	$strRes	  	= '{ "estado" : "%s", "error" : { "errno" : "%s", "descripcion" : "%s", "q" : "%s" } %s }';
	$res	  	= '';

	$objMySql = new conexionMySQL();
	$objMySql -> crearConexion();
	$result   = $objMySql -> ejecutarQuery( $query );

	if( $result ) {
		$numFil = @mysqli_num_rows( $result );
		$elem = preg_replace( '/[a-z]{3}-[a-z]{3}-/i' , '', $preFijoLLave );

		if( $numFil == 0 )
			$res = '';//sprintf( $strRes, "error", -1001, "0 filas encontradas", $query, '' );
		else {
			//href="javascript:eliminarComponente( _$( \'uiAnc-%s\' ), \'%s\', %d, \'%s\' );"
			//A0A0A0
			$strAnc_ = '<a id="uiAnc-%s" tipEleCon="checkbox" href="javascript:eliminarComponente( _$( \'uiAnc-%s\' ), %d );" 
							class="js-contenido-editable tooltipX showHideIcon mano AncEfcSomIco" style="display: none;">
								<span class="icon-trash efcSomIco"></span>
								<span class="tooltipX es-GT" style="width: 55px; top: 37px; left: 63px;">Eliminar</span>
								<span class="tooltipX en-EU" style="width: 55px; top: 37px; left: 63px;">Delete</span></a>';
			
			while( $row = $objMySql -> getUltimaFila( $result ) ) {
				$strAnc = sprintf( $strAnc_, $row[ 1 ], $row[ 1 ], $row[ 4 ] );
				
				if( $elem == 'p' ) {
					$strTmp = '<div><p class="normalBlanco textoSeccion js-contenido-editable" idPagina="'.$idPagina.'" llave="'.$row[ 1 ].'">'.$row[ 2 ].'</p>'.$strAnc.'</div>';
				}
				else if( $elem == 'i' ) {
					$strTmp = '<span><li class="js-contenido-editable" idPagina="'.$idPagina.'" llave="'.$row[ 1 ].'">'.$row[ 2 ].'</li>'.$strAnc.'</span>';
				}
				
				$res .= $strTmp;
			}
		}

		$objMySql -> liberarResultado($result);
		$objMySql -> cerrarConexion();
		return $res;
	} else
		return sprintf( $strRes, "error", -1000, "result=null", $query, '' );
}

function obtenerPolaroids( $idioma ) {
	$query		= sprintf( "SELECT idioma, llave, pais, nombre, descripcion, path, idPolaroid FROM polaroid WHERE pais IS NOT NULL AND nombre IS NOT NULL AND descripcion IS NOT NULL AND idioma = '%s' AND estado = '1' AND borrado = '0' ORDER BY pais", $idioma );
	$strRes	  	= '{ "estado" : "%s", "error" : { "errno" : "%s", "descripcion" : "%s", "q" : "%s" } %s }';
	$res	  	= '';

	$objMySql	= new conexionMySQL();
	$objMySql	-> crearConexion();
	$result		= $objMySql -> ejecutarQuery( $query );

	if( $result ) {
		$numFil = @mysqli_num_rows( $result );
		$strFigures = '';

		if( $numFil == 0 )
			$res = '';//sprintf( $strRes, "error", -1001, "0 filas encontradas", $query, '' );
		else {			
			while( $row = $objMySql -> getUltimaFila( $result ) ) {
				$strFigure = figure( $row[ 3 ], strGetPaisByCod( $row[ 2 ] ), $row[ 4 ], $row[ 5 ], $row[ 6 ] );
				$strFigures .= $strFigure;
			}
		}
		
		$strFigureAdd = ( 'es-GT' == $idioma ) ? figureAdd() : '';
		$strFiguresDataDummy = ( 0 == strlen( $strFigures ) ) ? '' : figuresDataDummy( $idioma );
		
		// photostack-start
		$res = '<section id="photostack-'.$idioma.'" class="photostack photostack-start">'
			.'<div>'.$strFigures.$strFigureAdd.$strFiguresDataDummy.'</div>'
		.'</section>';
		
		$objMySql -> liberarResultado($result);
		$objMySql -> cerrarConexion();
		
		return $res;
	} else
		return sprintf( $strRes, "error", -1000, "result=null", $query, '' );
}

function eliminarFig( $idPolaroid ) {
	//style=" color: #000; font-size: 19px;"
	return '<a href="javascript:void(0);" onclick="eliminarComponente(this, '.$idPolaroid.', 1);"'
				.' data-id-polaroid="'.$idPolaroid.'"'
				.'class="btnLT tooltipX js-contenido-editable AncEfcSomIco dn" style="position: absolute; right: 5%; top: 5px !important;" tipEleCon="checkbox">'
			.'<span class="icon-trash efcSomIco" style="position: relative; top: 15%; left: 0;"></span>'
			.'<span class="tooltipX negrilla" style="width: 75px; top: 35px; left: 47px;">Eliminar</span>'
			.'</a>';
}

function figure( $nombre, $pais, $descripcion, $path, $idPolaroid ) {
	//js-contenido-editable
	return '<figure>'.eliminarFig( $idPolaroid )
				.'<a href="javascript:;" class="photostack-img"><img src="'.$path.'" class="imgRed1" alt="imgf"/></a>'
				.'<figcaption>'
					.'<h2 class="photostack-title js-contenido-editable" data-id="'.$idPolaroid.'" data-campo="nombre">'.$nombre.'</h2>'
					.'<div class="photostack-back">'
						.'<h2 class="photostack-title js-contenido-editable" data-id="'.$idPolaroid.'" data-campo="pais">'.$pais.'</h2>'
						.'<div class="description description2">'
							.'<p class="js-contenido-editable" data-id="'.$idPolaroid.'" data-campo="descripcion">'.$descripcion.'</p>'
						.'</div>'
					.'</div>'
				.'</figcaption>'
			.'</figure>';
}

function figureAdd() {
	return '<figure data-shuffle-iteration="2" tipEleCon="checkbox" class="esqRed5px" style="width: 240px; height: 320px; padding: 15px 40px 50px 40px">'
				.'<figcation class="js-contenido-editable dn" tipEleCon="checkbox">'
					.'<h2 class="photostack-title texto-vertical-2">Nuevo proyecto</h2>'
					.'<div class="float-label" style="text-align: left;">'
						.'<div style="margin-top: 5px;">'
							.'<form action="../../php/imagen/psCargarImagen.php" id="uploadForm" name="frmupload" method="POST" enctype="multipart/form-data" style="position: relative; top: -10px;">'
								.'<input type="file" id="uploadImage" name="uploadImage" class="inputfile inputfile-1" data-multiple-caption="{count} files selected" />'
								.'<label for="uploadImage" class="labelUploadImage esqRed3px" style="max-width: 57%;">'
									.'<span>Seleccione una fotografía</span>'
								.'</label>'
								.'<button id="submitButton" type="submit" name="btnSubmit" class="btnL btnAzul buttonBtnSubmit btnAzulSinOutLine esqRed3px mano">'
									.'<span class="icon-save"></span>'
								.'</button>'
							.'</form>'
							.'<div id="progressDivId" class="progress" style="top: -42px;">'
								.'<div id="progressBar" class="progress-bar"></div>'
								.'<div id="percent" class="percent"></div>'
							.'</div>'
						.'</div>'
						.'<div id="uiDivBoxPais" style="width: 100%">'
							.'<a href="javascript:;" class="tooltipX negrilla">'
								.'<div id="divBoxPais" class="selectBox esqRed3px" style="width: 100%;">'
									.'<div class="box"><img src="../../slctL/imagenes/cargando.gif" alt="..."/></div>'
									.'<select id="uiSlctPais">'
										.'<option value="">Seleccione un país</option>'
										.'<option value="gt">Guatemala</option>'
										.'<option value="sv">El Salvador</option>'
										.'<option value="hn">Honduras</option>'
										.'<option value="ni">Nicaragua</option>'
										.'<option value="cr">Costa Rica</option>'
										.'<option value="pa">Panamá</option>'
									.'</select>'
								.'</div>'
								.'<span class="tooltipX" style="width: 75px; top: 20px; left: 65%;">País</span>'
							.'</a>'
						.'</div>'
						.'<div id="uiDivBoxIdiomaA" style="width: 100%">'
							.'<a href="javascript:;" class="tooltipX negrilla">'
								.'<div id="divBoxIdiomaA" class="selectBox esqRed3px" style="width: 100%;">'
									.'<div class="box"><img src="../../slctL/imagenes/cargando.gif" alt="..."/></div>'
									.'<select id="uiSlctIdiomaA">'
										.'<option value="">Seleccione un idioma</option>'
										.'<option value="es-GT">Español (Guatemala)</option>'
										.'<option value="en-EU">english (US)</option>'
									.'</select>'
								.'</div>'
								.'<span class="tooltipX" style="width: 75px; top: 20px; left: 65%;">Idioma</span>'
							.'</a>'
						.'</div>'
						.'<div class="control">'
							.'<input type="text" id="uiTxtNom" title="Nombre" placeholder="Nombre" required/>'
							.'<label for="uiTxtNom">Nombre</label>'
						.'</div>'
						.'<div class="control">'
							.'<textarea id="uiTxtDes" name="uiTxtDes" placeholder="Descripción" required cols="25" rows="8"></textarea>'
							.'<label for="uiTxtDes">Descripción</label>'
						.'</div>'
					.'</div>'
				.'</figcation>'
			.'</figure>';
}

function figuresDataDummy( $idioma ) {
	$str = '';
	
	$figuresEnEU = array
	  (
		array( "Surveying and Geodesy",				"../../imagenes/proyectos/polaroid/dummies/3.jpg" ),
		array( "Structural Engineering",			"../../imagenes/proyectos/polaroid/dummies/1.jpg" ),
		array( "Planning and Design",				"../../imagenes/proyectos/polaroid/dummies/5.jpg" ),
		array( "Geotechnical Engineering",			"../../imagenes/proyectos/polaroid/dummies/16.jpg" ),
		array( "Geology Engineering", 				"../../imagenes/proyectos/polaroid/dummies/2.jpg" ),
		array( "Contracts and Licitations", 		"../../imagenes/proyectos/polaroid/dummies/7.jpg" ),
		array( "Legally Constituted", 				"../../imagenes/proyectos/polaroid/dummies/8.jpg" )
	  );
	
	$figuresEsGT = array
	  (
		array( "Topografía y Geodesia",				"../../imagenes/proyectos/polaroid/dummies/14.jpg" ),
		array( "Ingeniería Estructural",			"../../imagenes/proyectos/polaroid/dummies/15.jpg" ),
		array( "Planeación de Vías",				"../../imagenes/proyectos/polaroid/dummies/10.jpg" ),
		array( "Diseño de Vías",					"../../imagenes/proyectos/polaroid/dummies/11.jpg" ),
		array( "Geología y Geotécnica", 			"../../imagenes/proyectos/polaroid/dummies/12.jpg" ),
		array( "Contratos y Docs. de Licitación",	"../../imagenes/proyectos/polaroid/dummies/7.jpg" ),
		array( "Inscripción ante Ent. Oficiales",	"../../imagenes/proyectos/polaroid/dummies/4.jpg" )
	  );
	
	for( $row = 0; $row < 7; $row++) {
		if( $idioma == 'es-GT' )
			$str .= figureDataDummy( $figuresEsGT[ $row ][ 0 ], $figuresEsGT[ $row ][ 1 ] );
		else if( $idioma == 'en-EU' )
			$str .= figureDataDummy( $figuresEnEU[ $row ][ 0 ], $figuresEnEU[ $row ][ 1 ] );
			
	}
	
	return $str;
}

function figureDataDummy( $titulo, $path ) {
	return	'<figure data-dummy>'
				.'<a href="javascript:;" class="photostack-img"><img src="'.$path.'" alt="img"/></a>'
					.'<figcaption>'
						.'<h2 class="photostack-title">'.$titulo.'</h2>'
					.'</figcaption>'
			.'</figure>';
}

function obtenerEquipo( $idioma, $idEquipo, $idDiv, $flag ) {
	$flagTodos	= is_numeric( $idEquipo );
	$strIdEqp	= ( true == $flagTodos ) ? sprintf( "AND idEquipo = ", $idEquipo ) : '';
	$query		= sprintf( "SELECT idEquipo, puesto, profesion, nombre, perfil, fotografia FROM equipo WHERE idioma = '%s' AND estado = '1' AND borrado = '0' %s ORDER BY idEquipo", $idioma, $strIdEqp );
	$strRes	  	= '{ "estado" : "%s", "error" : { "errno" : "%s", "descripcion" : "%s", "q" : "%s" } %s }';
	$res	  	= '';

	$objMySql	= new conexionMySQL();
	$objMySql	-> crearConexion();
	$result		= $objMySql -> ejecutarQuery( $query );

	if( $result ) {
		$numFil = @mysqli_num_rows( $result );
		$strEquipoTotal = '';
		$strIds = '';

		if( $numFil == 0 )
			$res = '';
		else {
			$strEquipo = ''; $flagIni = true;
			while( $row = $objMySql -> getUltimaFila( $result ) ) {
				
				if( $flagIni ) {
					$strIds  = ''.$row[ 0 ];
					$flagIni = false;
				} else {
					$strIds .= ','.$row[ 0 ];
				}

				$strEquipo = equipo( $row[ 0 ], $row[ 1 ], $row[ 2 ], $row[ 3 ], $row[ 4 ], $row[ 5 ] );
				$strEquipoTotal .= $strEquipo;
			}
		}
		$strEquipoAdd = equipoAdd( $idDiv );
		$strTmp = '<input id="uiHddIdsEquipo" type="hidden" value="'.$strIds.'"/>'.$strEquipoAdd.'<div id="'.$idDiv.'">'.$strEquipoTotal.'</div>';
		$res = ($flag) ? $strTmp.'<script type="text/javascript">ldFrmImg( \''.$strIds.'\' );</script>' : $strTmp ;
		
		$objMySql -> liberarResultado($result);
		$objMySql -> cerrarConexion();
		
		return $res;
	} else
		return sprintf( $strRes, "error", -1000, "result=null", $query, '' );
}

function equipoAdd( $idDiv ) {
	return '<div class="js-contenido-editable miBarraSticky dn clear" style="padding-top: 20px; z-index: 1;"  tipEleCon="checkbox" for="'.$idDiv.'">
		<div id="uiDivAgregar" class="dib">
			<a id="uiAncAgregarComponente" href="javascript:agregarComponente( \''.$idDiv.'\' );" class="tooltipX btnCircularSinSombra btnCircularSinOutLine btnRojo2 btnSombra2"
				style="display: inline-block; z-index: 1; font-size: 18px; margin-bottom: 10px;
				/*position: absolute; top: -2px;*/ height: 50px; width: 50px;">
				<div class="centrado-porcentual negrilla">
					+
					<span class="tooltipX es-GT" style="width: 75px; top: 44px; left: 43px;">Agregar</span>
					<span class="tooltipX en-EU" style="width: 75px; top: 44px; left: 43px;">Add</span>
				</div>
			</a>
		</div>
	</div>';
}

function equipo( $idEquipo, $puesto, $profesion, $nombre, $perfil, $fotografia ) {
	$fotografia = trim( $fotografia );
	$fotografia = ( empty( $fotografia ) || is_null( $fotografia ) ) ? '../../imagenes/sinFotoPerfil.jpg' : $fotografia;
	
	return '<div class="clear" style="position: relative; margin-bottom: 5px;">'.eliminarEquipo( $idEquipo )
				.'<div style="padding-top: 20px;">'
					.'<p data-id="'.$idEquipo.'" data-campo="puesto" class="js-contenido-editable" style="font-weight: bold; margin: 0;">'
					.$puesto
					.'</p>'
				.'</div>'
				.'<div class="divIzq" style="width: 170px;">'
					.'<img id="uiImgLd'.$idEquipo.'" src="'.$fotografia.'" style="width: 95%"/>'
					.frmImg( $idEquipo, $fotografia )
				.'</div>'
				.'<div>'
					.'<p class="normalAzul" style="margin: 0;"><label data-id="'.$idEquipo.'" data-campo="profesion" class="js-contenido-editable">'.$profesion.'</label>&nbsp;<label data-id="'.$idEquipo.'" data-campo="nombre" class="js-contenido-editable">'.$nombre.'</label></p>'
					.'<p data-id="'.$idEquipo.'" data-campo="perfil" class="js-contenido-editable" style="margin: 0;">'.$perfil.'</p>'
				.'</div>'
			.'</div>';
}

function frmImg( $idEquipo, $fotografia ) {
	$flag = strpos( $fotografia, 'sinFotoPerfil' );
	$strVis = ( $flag == true ) ? '' : ' vis1';
	
	return '<div style="position: relative; top: -30px; left: 2px;" class="js-contenido-editable dn'.$strVis.'" tipEleCon="checkbox">'
				.'<form action="../../php/imagen/psCargarImagen.php" id="uploadForm'.$idEquipo.'" name="frmupload'.$idEquipo.'" method="POST" enctype="multipart/form-data" style="position: relative; top: -10px;">'
					.'<input type="file" id="uploadImage'.$idEquipo.'" name="uploadImage'.$idEquipo.'" class="inputfile inputfile-1" data-multiple-caption="{count} files selected" />'
					.'<label for="uploadImage'.$idEquipo.'" class="labelUploadImage esqRed3px" style="max-width: 50%; border-top: solid 1px #FFF;
							  border-bottom: solid 1px #FFF; border-left: solid 1px #FFF; 
							  border-top-left-radius: 3px; border-bottom-left-radius: 3px; display: inline-block !important;">'
						.'<span>Seleccione foto</span>'
					.'</label>'
					.'<button id="submitButton'.$idEquipo.'" type="submit" name="btnSubmit'.$idEquipo.'" class="btnL btnAzul buttonBtnSubmit btnAzulSinOutLine esqRed3px mano" style="width: 35px; height: 37px; position: relative; top: -12px !important;
								border-top: solid 1px #FFF; border-bottom: solid 1px #FFF; border-right: solid 1px #FFF; 
							   	border-radius: 0; border-top-right-radius: 3px; border-bottom-right-radius: 3px; font-size: 18px">'
						.'<span class="icon-save"></span>'
					.'</button>'
				.'</form>'
				.'<div id="progressDivId'.$idEquipo.'" class="progress" style="top: -60px; height: 38px !important;">'
					.'<div id="progressBar'.$idEquipo.'" class="progress-bar" style="height: 38px !important;"></div>'
					.'<div id="percent'.$idEquipo.'" class="percent"></div>'
				.'</div>'
			.'</div>';
}

function eliminarEquipo( $idEquipo ) {
	return '<a href="javascript:void(0);" onclick="eliminarEquipo(this, '.$idEquipo.', 1 );"'
				.' data-id-equipo="'.$idEquipo.'"'
				.'class="btnLT tooltipX js-contenido-editable AncEfcSomIco ancEliMov" tipEleCon="checkbox" style="display: none;">'
			.'<span class="icon-trash efcSomIco" style="position: relative; top: 20%; left: 22%;"></span>'
			.'<span class="tooltipX negrilla" style="width: 75px; top: 40px; left: 52px;">Eliminar</span>'
			.'</a>';
}
?>