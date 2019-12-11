<?php
$CONFIGURACION_BASICA = false;
//error_reporting( E_ALL );
//include( $_SERVER[ "DOCUMENT_ROOT" ]."/php/complementos/phpMailer_v5.1/class.smtp.php" ); // opcional
//include( $_SERVER[ "DOCUMENT_ROOT" ]."/config/config.php" );
//date_default_timezone_set( "America/Guatemala" );
//set_time_limit(0); 
	
$query  = "SELECT * FROM config_correo WHERE status = '1';";
$result = mysql_query( $query, $conexion ) or die( "<label class=\"etiquetaErrorInterno\">SQL: <label class=\"normalAzul\">".mysql_error()."</label></label>" );

if( @mysql_num_rows( $result ) != 1 )
	$CONFIGURACION_BASICA = true;
else{
	error_reporting( E_STRICT );
	include( $_SERVER[ "DOCUMENT_ROOT" ]."/php/complementos/phpMailer_v5.1/class.phpmailer.php" );
	
	$array = mysql_fetch_array( $result );
	$eMail = new PHPMailer();
	$eMail->Mailer="smtp";
	$eMail->Helo = "www.dideducescuintla.com";
	$eMail->Timeout       = $array[ "timeout" ];
	$eMail->IsSMTP(); 		// usar smtp
	$eMail->IsHTML(true);   // enviar HTML
	$eMail->SMTPAuth      = true;                  	// habilita SMTP con autenticacion
	//$eMail->SetLanguage( "en", 'includes/phpMailer/language/' );
	
	if( strrpos( $array[ 'host' ], 'tls' ) !== false || strrpos( $array[ 'host' ], 'ssl' ) !== false );
	else{
		if( strrpos( $array[ 'host' ], 'izymail' ) !== false );
		else
			$eMail->SMTPSecure = "tls";
	}
	$eMail->Host          = $array[ "host" ];		// servidor SMTP
	$eMail->Port          = $array[ "port" ];       // Puerto SMTP del servidor. Nota: el puerto 25 es utilizado por gmail
	$eMail->Username      = $array[ "username" ]; 	// nombre de la cuenta SMTP
	$eMail->Password      = $array[ "password" ];        	// contrasena de la cuenta SMTP
	$eMail->SMTPKeepAlive = ( $array[ "keepAlive" ] == '1' ) ? true : false;	// La conexion SMTP no se cierra despues de ser enviado el email
	//$eMail->SetFrom( $array[ "from_" ], $array[ "fromName" ] );
	//$eMail->AddReplyTo( $array[ "replyTo" ], $array[ "replyToName" ] );
	$eMail->AltBody    = "Para ver este mensaje, utilice una version del navegador compatible con eMailer"; // optional, comment out and test
	$eMail->CharSet="utf-8";
}
?>