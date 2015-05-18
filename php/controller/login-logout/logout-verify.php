<?php
    require_once(__DIR__ . "/../model/config.php");
?>
<nav>
    <ul>
        <li>
            <?php echo "You has left the game <br/>"?>
            <a href="<?php echo $path . "/../index.php"?>">to main room.</a>
            <!-- link to the main page after logging out -->
        </li>
    </ul>
</nav>