---
id: "superglobals-in-php"
sidebar_position: 11
title: "Superglobals in php"
sidebar_label: "Superglobals"
description: "php superglobals are built-in variables available in all scopes. Learn about $_GET, $_POST, $_SERVER, $_SESSION, $_COOKIE, and more."
tags: [php, superglobals, $_GET, $_POST, $_SERVER]
---

Superglobals are built-in variables in php that are always accessible, regardless of scope. They are available from any function, class, or file without needing to use the `global` keyword.

## List of php Superglobals

* `$GLOBALS`
* `$_SERVER`
* `$_GET`
* `$_POST`
* `$_FILES`
* `$_COOKIE`
* `$_SESSION`
* `$_REQUEST`
* `$_ENV`

## Video Explanation

<LiteYouTubeEmbed
  id="MujfofukfwQ"
  params="autoplay=1&autohide=1&showinfo=0&rel=0"
  title="5 | Built-In Superglobal Variables in PHP | 2023 | Learn PHP Full Course for Beginners"
  lazyLoad={true}
  webp
/>

* * *

## `$GLOBALS`

Provides access to all global variables from anywhere in the script:

```php
<?php
$x = 10;
$y = 20;

function addGlobals() {
    return $GLOBALS['x'] + $GLOBALS['y'];
}

echo addGlobals(); // 30
?>
```

* * *

## `$_SERVER`

Contains information about the server environment and current request:

```php
<?php
echo $_SERVER['PHP_SELF'];      // current script path
echo $_SERVER['SERVER_NAME'];   // e.g., localhost
echo $_SERVER['HTTP_HOST'];     // e.g., www.example.com
echo $_SERVER['REQUEST_METHOD'];// GET or POST
echo $_SERVER['REMOTE_ADDR'];   // visitor's IP address
echo $_SERVER['HTTP_USER_AGENT']; // browser info
?>
```

* * *

## `$_GET`

Collects data sent via URL query parameters (HTTP GET method):

```
URL: https://example.com/page.php?name=Alice&age=30
```

```php
<?php
echo $_GET['name']; // Alice
echo $_GET['age'];  // 30
?>
```

* * *

## `$_POST`

Collects data submitted via an HTML form with `method="post"`:

```html
<form method="post" action="process.php">
    <input type="text" name="username">
    <input type="submit" value="Submit">
</form>
```

```php
<?php
// process.php
$username = htmlspecialchars($_POST['username'] ?? '');
echo "Hello, $username!";
?>
```

* * *

## `$_REQUEST`

Contains data from `$_GET`, `$_POST`, and `$_COOKIE`:

```php
<?php
$name = $_REQUEST['name']; // works for both GET and POST
echo "Received: $name";
?>
```

**Note:** It is safer and clearer to use `$_GET` or `$_POST` specifically rather than `$_REQUEST`.

* * *

## `$_FILES`

Used to handle file uploads:

```html
<form method="post" enctype="multipart/form-data">
    <input type="file" name="photo">
    <input type="submit">
</form>
```

```php
<?php
$file = $_FILES['photo'];
echo $file['name'];      // original filename
echo $file['size'];      // file size in bytes
echo $file['tmp_name'];  // temp path on server
echo $file['type'];      // MIME type
echo $file['error'];     // error code
?>
```

* * *

## `$_COOKIE`

Reads cookie values sent by the browser:

```php
<?php
// Set a cookie
setcookie("user", "Alice", time() + 86400); // 1 day

// Read a cookie
if (isset($_COOKIE['user'])) {
    echo "Welcome, " . $_COOKIE['user'];
}
?>
```

* * *

## `$_SESSION`

Stores user session data across multiple pages:

```php
<?php
session_start();

$_SESSION['username'] = "Alice";
$_SESSION['role'] = "admin";

echo $_SESSION['username']; // Alice
?>
```

* * *

## `$_ENV`

Access environment variables set on the server:

```php
<?php
echo $_ENV['PATH'];         // system PATH variable
echo getenv('APP_ENV');     // alternative method
?>
```

* * *

## Security Best Practices

* Always **validate and sanitize** input from `$_GET`, `$_POST`, and `$_REQUEST`
* Use `htmlspecialchars()` to prevent XSS attacks
* Use prepared statements for database queries to prevent SQL injection

```php
<?php
$name = htmlspecialchars($_POST['name'] ?? '');
echo "Hello, $name";
?>
```