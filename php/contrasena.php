<?php
include( $_SERVER["DOCUMENT_ROOT"]."/comtop/v1.1/php/config/config.php" );
include( $_SERVER[ "DOCUMENT_ROOT" ]."/comtop/v1.1/php/funcionesGenericas/psFuncionesGenericas.php" );

$contrasena = sha1( md5( obtenerVariable( 'pss' ) ) );
echo 'pass: '.$contrasena;
?>