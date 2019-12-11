<?php
function strCuerpoRU( $uX, $cX, $dX, $nX, $aX ){
$sitio 		= '<a href="http://www.dideducescuintla.com/login.php" title="DideducEscuintla">aqu&iacute;</a>';
 return $cuerpo = '
<html> 
<head> 
   <title>Confirmaci&oacute;n de cuenta</title> 
</head>
<body>
<h3 style="color: #233D74;">DideducEscuintla.com</h3> 
<p style="font-family: Tahoma; font-size: 11px;"> 
La Direcci&oacute;n Departamental de Educaci&oacute;n de Escuintla le da la mas cordial bienvenida<br/><br/>
Se le notifica que sus datos han sido registrados satisfactoriamente generando la siguiente cuenta de usuario:<br/><br/>
<div style="width: auto; font-family: Tahoma; font-size: 11px;">
	<table>
		<tr>
			<td>
				<label style="font-family: Tahoma; font-size: 11px; color: #0077ff;">Nombre de usuario:</label>
			</td>
			<td>
				<strong>'.$uX.'</strong>
			</td>
		</tr>
		<tr>
			<td>
				<label style="font-family: Tahoma; font-size: 11px; color: #0077ff;">Contrase&ntilde;a:</label>
			</td>
			<td>
				<strong>'.$cX.'</strong>
			</td>
		</tr>
		<tr>
			<td>
				<label style="font-family: Tahoma; font-size: 11px; color: #0077ff;">Correo/s electr&oacute;nico/s:</label>
			</td>
			<td>
				<strong>'.$dX.'</strong>
			</td>
		</tr>
		<tr>
			<td>
				<label style="font-family: Tahoma; font-size: 11px; color: #0077ff;">Nombre:</label>
			</td>
			<td>
				<strong>'.$nX.'</strong>
			</td>
		</tr>
		<tr>
			<td>
				<label style="font-family: Tahoma; font-size: 11px; color: #0077ff;">Apellidos:</label>
			</td>
			<td>
				<strong>'.$aX.'</strong>
			</td>
		</tr>
	</table>
</div>

<div style="clear: both; width: 100%; font-family: Tahoma; font-size: 11px;">
	<br/><br/>
	Para ingresar con sus datos de usuario acceda al sitio desde '.$sitio.'<br/>
	<br/>
	Atte.<br/>
	Administraci&oacute;n<br/>
	Direcci&oacute;n Departamental de Educaci&oacute;n de Escuintla
</div>
</p> 
</body> 
</html> 
';
}

function strCuerpoRSP( $nX, $aX, $dX ){
return $cuerpoRegistroSoloPersona = '
<html> 
<head> 
   <title>Confirmaci&oacute;n de registro</title> 
</head>
<body>
<h3 style="color: #233D74;">DideducEscuintla.com</h3> 
<p style="font-family: Tahoma; font-size: 11px;"> 
La Direcci&oacute;n Departamental de Educaci&oacute;n de Escuintla le da la mas cordial bienvenida<br/><br/>
Se le notifica que sus datos han sido registrados satisfactoriamente con la siguiente informaci&oacute;n:<br/><br/>

<div style="font-family: Tahoma; font-size: 11px;">
	<table>
		<tr>
			<td>
				<label style="font-family: Tahoma; font-size: 11px; color: #0077ff;">Nombre:</label>
			</td>
			<td>
				<strong>'.$nX.'</strong>
			</td>
		</tr>
		<tr>
			<td>
				<label style="font-family: Tahoma; font-size: 11px; color: #0077ff;">Apellidos:</label>
			</td>
			<td>
				<strong>'.$aX.'</strong>
			</td>
		</tr>
		<tr>
			<td>
				<label style="font-family: Tahoma; font-size: 11px; color: #0077ff;">Correo/s electr&oacute;nico/s:</label>
			</td>
			<td>
				<strong>'.$dX.'</strong>
			</td>
		</tr>
	</table>
</div>

<div style="clear: both; width: 100%; font-family: Tahoma; font-size: 11px;">
	<br/><br/>
	Atte.<br/>
	Administraci&oacute;n<br/>
	Direcci&oacute;n Departamental de Educaci&oacute;n de Escuintla
</div>
</p> 
</body> 
</html> 
';
}

function strCuerpoRC( $uX, $cX ){
return $cuerpoRecordarContrasena = '
<html> 
<head> 
   <title>Recordatorio de contrase&ntilde;a</title> 
</head>
<body>
<h3 style="color: #233D74;">DideducEscuintla.com</h3> 
<p style="font-family: Tahoma; font-size: 11px;"> 
La Direcci&oacute;n Departamental de Educaci&oacute;n de Escuintla le notifica:<br/><br/>
Su contrase&ntilde;a ha sido reestablecida satisfactoriamente, ingrese al sitio con la siguiente informaci&oacute;n:<br/><br/>
<div>
	<table>
		<tr>
			<td>
				<label style="font-family: Tahoma; font-size: 11px; color: #0077ff;">Nombre de usuario:</label>
			</td>
			<td>
				<strong>'.$uX.'</strong>
			</td>
		</tr>
		<tr>
			<td>
				<label style="font-family: Tahoma; font-size: 11px; color: #0077ff;">Contrase&ntilde;a:</label>
			</td>
			<td>
				<strong>'.$cX.'</strong>
			</td>
		</tr>
	</table>
</div>
<div style="clear: both; font-family: Tahoma; font-size: 11px;">
	<br/><br/>
	Atte.<br/>
	Administraci&oacute;n<br/>
	Direcci&oacute;n Departamental de Educaci&oacute;n de Escuintla
</div>
</p> 
</body> 
</html> 
';
}

//para el envío en formato HTML 
//$encabezado = "MIME-Version: 1.0\r\n";
//$encabezado .= "Content-type: text/html; charset=iso-8859-1\r\n"; 
//$encabezado .= "Content-Type: multipart/mixed; charset=iso-8859-1\r\n"; 


//dirección del remitente 
//$encabezado .= "From: Administracion Dideducescuintla <administracion@dideducescuintla.com>\r\n"; 

//dirección de respuesta, si queremos que sea distinta que la del remitente 
//$encabezado .= "Reply-To: dideducescuintla@gmail.com\r\n"; 

//ruta del mensaje desde origen a destino 
//$encabezado .= "Return-path: holahola@desarrolloweb.com\r\n"; 

//direcciones que recibián copia
//$encabezado .= "Cc: marin2m@gmail.com\r\n"; 

//direcciones que recibirán copia oculta 
//$encabezado .= "Bcc: pepe@pepe.com,juan@juan.com\r\n"; 

//if( mail($destinatarios,$asunto,$cuerpo,$encabezado) )

function generarStrFrontera(){
	return "_frontera".md5( uniqid( rand() ) ) ;
}

function generarStrCabecera( $cc = '', $cco = '', $tipo = 'mixed', $frontera, $DE = '' ){
	$UN_SALTO   = "\r\n";
	$DOS_SALTOS = "\r\n\r\n";
	
	if( null == $DE || $DE == '' ) $DE 		= 'Administracion <comtop.gt@gmail.com>';

	$tipo		= strtolower( $tipo );
	
	$cabecera  	= "Date: ".date("l j F Y, G:i").$UN_SALTO; 
	$cabecera  .= "MIME-Version: 1.0".$UN_SALTO;
	$cabecera  .= "From: ".$DE.$UN_SALTO;
	
	if( $cc != "" )  $cabecera .= "Cc: ".$cc.$UN_SALTO;
	if( $cco != "" ) $cabecera .= "Bcc: ".$cco.$UN_SALTO;
	$cabecera .= "X-Mailer: PHP/". phpversion().$UN_SALTO;
	
	if( $tipo == "mixed" ){
		$cabecera .= "Content-Type: multipart/mixed; charset=utf-8;".$UN_SALTO; 
		$cabecera .= " boundary=$frontera".$DOS_SALTOS;
	}
	else
		$cabecera .= "Content-type: text/html; charset=utf-8;".$UN_SALTO; 

	return $cabecera;
}

function generarStrMensaje( $msj, $tipo, $frontera ){
	$UN_SALTO   = "\r\n";
	$DOS_SALTOS = "\r\n\r\n";
	
	$tipo = strtolower( $tipo );
	
	if( $tipo == "html" )
		$mensaje  = "<html><head></head><body>".$msj."</body></html>";
	else if( $tipo == "plain" )
		$mensaje  = $msj;
		
	$cuerpo  = "--$frontera$UN_SALTO"; 
	$cuerpo .= "Content-Type: text/$tipo; charset=\"ISO-8859-1\"".$UN_SALTO;
	
	if( $tipo == "html" ) $cuerpo .= "Content-Transfer-Encoding: 7bit".$DOS_SALTOS;
	
	$cuerpo .= $mensaje;

	return $cuerpo;
}

function generarStrArchivosAdjuntos( $ARCHIVOS, $frontera ){
	$UN_SALTO   = "\r\n";
	$DOS_SALTOS = "\r\n\r\n";
	$adj = "";
	foreach( $ARCHIVOS as $archAdjunto ){
		for( $i = 0; $i < count( $archAdjunto[ "size" ] ); $i++ ){
			if( $archAdjunto[ "size" ][ $i ] > 0 ){
				$adj .= $UN_SALTO."--$frontera".$UN_SALTO;
				$adj .= "Content-Type: ".$archAdjunto[ "type" ][ $i ]."; name=\"".$archAdjunto[ "name" ][ $i ]."\"".$UN_SALTO;  
				$adj .= "Content-Disposition: inline; filename=\"".$archAdjunto[ "name" ][ $i ]."\"".$UN_SALTO;
				$adj .= "Content-Transfer-Encoding: base64".$DOS_SALTOS; 
				$fp   = fopen( $archAdjunto[ "tmp_name" ][ $i ], "r" ); 
				$buff = fread( $fp, filesize( $archAdjunto[ "tmp_name" ][ $i ] ) ); 
				fclose( $fp );
				$adj .= chunk_split( base64_encode( $buff ) ); 
				$adj .= $UN_SALTO."--$frontera".$UN_SALTO; 
			}
		}		
	}
	return $adj;
}
?>