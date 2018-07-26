
<?php
$value= $_GET["value"];
$id=$_GET["id"];


echo "valor: ".$value;
echo "id: ".$id;



$mysqli=mysqli_connect('localhost','root','sql','MrDoc');

$sql ="UPDATE documento_metadata SET valor='".$value."'
      WHERE id_metadata='".$id."'";

mysqli_query($mysqli, $sql) or die("database error:". mysqli_error());

?>