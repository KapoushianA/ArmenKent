<?php
    require_once(__DIR__ . "/../model/config.php");
    //links to thee model file
    
    $query = $_SESSION["connection"]->query("CREATE TABLE posts ("
            . "id int(11) NOT NULL AUTO_INCREMENT,"
            . "title varchar (255) NOT NULL,"
            . "post text NOT NULL,"
            . "PRIMARY KEY (id))");
    
    if($query) {
        echo "<p></p>";
        //I erased the notification for creating the post
    }
    else {
        echo "<p>" . $_SESSION["connection"]->error . "</p>";
        //tells that the "tables have been turned" to an error
    }
    
    $query = $_SESSION["connection"]->query("CREATE TABLE users ("
            . "id int(11) NOT NULL AUTO_INCREMENT,"
            . "username varchar(30) NOT NULL,"
            . "email varchar(50) NOT NULL,"
            . "password char(128) NOT NULL, "
            . "salt char(128) NOT NULL,"
            . "PRIMARY KEY (id))");
    
    if($query) {
        echo "<p></p>";
        //tables for user has been made butI erased the message
    }
    else {
        echo "<p>" . $_SESSION["connection"]->error . "</p>";
        //tells an error occured
    }