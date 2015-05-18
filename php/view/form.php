<?php
    require_once (__DIR__ . "/../model/config.php");
    require_once (__DIR__ . "/../controller/login-verify.php");
    //linking the pages
    if(!authenticateUser()) {
        header("Location: " . $path . "index.php");
        die();
    }
?>

<h1>Create Blog Post</h1>

<form method="post" action="<?php echo $path . "controller/create-post.php"; ?>">
    <div>
        <label for="title">Title: </label>
        <input type="text" name="title" />
    </div>
    <!-- Title for the  posts -->
    <div>
        <label for="post">Post: </label>
        <textarea name="post"></textarea>
    </div>
    <!-- posts texts -->
    <div>
        <button type="submit">Submit</button>
        <!-- if you don't know what that is, you are dumb -->
    </div>
</form>