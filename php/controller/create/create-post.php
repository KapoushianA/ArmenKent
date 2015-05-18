<?php
    require_once (__DIR__ . "/../model/config.php");
        //links to config file
    $title = filter_input(INPUT_POST, "title", FILTER_SANITIZE_STRING);
    $post = filter_input(INPUT_POST, "post", FILTER_SANITIZE_STRING);
    
    $query = $_SESSION["connection"]->query("INSERT INTO posts SET title = '$title', post = '$post'");
    
    if($query) {
        echo "<p>Successfully inserted post: $title</p>";
        ?><a href="<?php echo $path . "index.php"?>">To Final Destination</a><?php 
        //link to main page
    } 
    else {
        echo "<p>" . $_SESSION["connection"]->error . "</p>";
        //tells about an error
    }