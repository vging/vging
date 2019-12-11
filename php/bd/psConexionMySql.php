<?php 
class conexionMySQL{
	private $host;
	private $user;
	private $password;
	private $database;
	private $conn;
 
	public function __construct(){ 
		require_once DIR_PRI."/php/config/config_bd.php";
		$this->host 	= HOST;
		$this->user 	= USER;
		$this->password	= PASSWORD;
		$this->database	= DATABASE;
	}
  
	public function crearConexion(){
		$this->conn = new mysqli($this->host, $this->user, $this->password, $this->database);
		if($this->conn->connect_errno)
			die("Error al conectarse a MySQL: (" . $this->conn->connect_errno . ") " . $this->conn->connect_error);
	}

	public function cerrarConexion(){
		$this->conn->close();
	}

	public function ejecutarQuery( $sql ){
		/* Metodo que ejecuta un query sql
		Retorna un resultado si es un SELECT*/
		$result = $this->conn->query( $sql );
		return $result;
	}

	public function getCountAffectedRows(){
		/* Metodo que retorna la cantidad de filas
		afectadas con el ultimo query realizado.*/
		return $this->conn->affected_rows;
	}

	public function getUltimaFila($result){
		/*Metodo que retorna la ultima fila
		de un resultado en forma de arreglo.*/
		return $result->fetch_row();
	}
  
	public function liberarResultado($result){
		//Metodo que libera el resultado del query.
		$result->free_result();
	}
}
?>