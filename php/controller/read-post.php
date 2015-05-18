<?php

require_once(__DIR__ . "/../model/config.php");

$query = "SELECT * FROM posts";
$result = $_SESSION["connection"]->query($query);

if($result){
    while($row = mysqli_fetch_array($result)) {
        echo "<div class='post'>";
        echo "<h2>" . $row['title'] . "</h2>";
        //shows title
        echo "<br />";
        echo "<p>" . $row['post'] . "</p>";
        //shows post text
        echo "<br/>";
        echo "</div>";
    }
}