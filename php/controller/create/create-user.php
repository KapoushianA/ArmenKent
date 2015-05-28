<?php
    require_once(__DIR__ . "/../../model/config.php");
    
    $email = filter_input(INPUT_POST, "email", FILTER_SANITIZE_EMAIL);
    $username = filter_input(INPUT_POST, "username", FILTER_SANITIZE_STRING);
    $password = filter_input(INPUT_POST, "password", FILTER_SANITIZE_STRING);
    
    $salt = "$5$" . "rounds=500$" . uniqid(mt_rand(), true) . "$";
    
    $hashedPassword = crypt($password, $salt);
    //crypts the password so no hacking, you mad person looking at this code?
    
    $query = $_SESSION["connection"]->query("INSERT INTO users SET "
            . "email = '$email',"
            . "username = '$username',"
            . "password = '$hashedPassword',"
            . "salt = '$salt'");
    
    
    if($query) {
        echo "Created user: $username";
        ?><a href="<?php echo $path . "index.php"?>"><br/>back to the room</a><?php
        //tells your User has been created
    }
    else{
        echo "<p>" . $_SESSION["connection"]->error . "</p>";
        //shows error
    }
    