<?php
    require_once(__DIR__ . "/../model/config.php");
    require_once(__DIR__ . "/../controller/login-verify.php");
    
    if(!authenticateUser()) {
        header("location: " . $path . "index.php");
        die();
        //checks if you are logged in.
    }
?>
<nav>
    <ul>
        <li>
            <a href="<?php echo $path . "post.php"?>">Post your MLG moment</a> <br />
            <a href="<?php echo $path . "/controller/logout-user.php"?>">Leave Room</a> 
        </li>
    </ul>
</nav>