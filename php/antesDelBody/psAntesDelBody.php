<?php
$ldfrm = null; 
$strScriptCon = 'contactenos();'; $strScriptSes = '';

if( isset( $_GET[ 'ld-frm' ] ) )
	$ldfrm = $_GET[ 'ld-frm' ];
else if( isset( $_POST[ 'ld-frm' ] ) )
	$ldfrm = $_POST[ 'ld-frm' ];

if( isset( $_COOKIE[ 'u' ], $_COOKIE[ 'p' ] ) ) {
	if( isset( $_COOKIE[ 'tok' ] ) )
		$strScriptSes = 'login( true );';
} else {
	$strScriptSes = "salir( false );";
}

if( $ldfrm == 'on' )
	echo '<script type="text/javascript">'.$strScriptCon.' '.$strScriptSes.'</script>';
else
	echo '<script type="text/javascript">'.$strScriptSes.'</script>';
?>