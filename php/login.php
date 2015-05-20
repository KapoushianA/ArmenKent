<?php
require_once(__DIR__ . "/view/header.php");
require_once(__DIR__ . "/view/login-form.php");
require_once(__DIR__ . "/view/footer.php");

$array = array(
    'exp' => '',
);

$username = filter_input(INPUT_POST, "username", FILTER_SANITIZE_STRING);
$password = filter_input(INPUT_POST, "password", FILTER_SANITIZE_STRING);
$query = $_SESSION["connection"]->query("SELECT * FROM users WHERE username = '$username'");


if ($query->num_rows == 1) {
    $row = $query->fetch_array();

    //if the row equals the crypt then the session authenticated eequals true//
    if ($row["password"] === crypt($password, $row["salt"])) {
        $_SESSION["authenticated"] = true;
        $array["exp"] = $row["exp"];
        
        $_SESSION["name"] = $username;

        echo json_encode($array);
    }
    //this echo comes up when the username and password is invalid//
    else {
        echo "Invalid username and password";
    }
} else {
    //this is like the same one from up top//
    echo "Invalid username and password";
}
?>
<!--    like index, it has links to other files    -->