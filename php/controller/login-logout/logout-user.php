<?php
    require_once(__DIR__ . "/../model/config.php");
    require_once(__DIR__ . "/../controller/login-verify.php");
    
    if(!authenticateUser()) {
        header("location: " . $path . "index.php");
        die();
    }
    //makes sure you properly log out
    
    unset($_SESSION["authenticated"]);
    
    session_destroy();
    header("location: " . $path . "/controller/logout-verify.php");
    //links to that page  ^