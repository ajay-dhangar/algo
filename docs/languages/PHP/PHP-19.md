---
id: "sessions-and-cookies"
sidebar_position: 19
title: "Sessions and Cookies in PHP"
sidebar_label: "Sessions & Cookies"
description: "Sessions and cookies allow PHP to persist data across multiple pages. Learn how to create, read, update, and delete sessions and cookies."
tags: [php, sessions, cookies, authentication]
---

Sessions and cookies help maintain state across multiple HTTP requests since HTTP is stateless by default.

## Cookies

A cookie is a small text file stored on the client's browser.

### Setting a Cookie

```php
<?php
// setcookie(name, value, expiry, path, domain, secure, httponly)
setcookie("username", "Alice", time() + 86400, "/"); // expires in 1 day
setcookie("theme", "dark", time() + (30 * 86400));   // expires in 30 days
?>
```

**Note:** `setcookie()` must be called **before** any HTML output.

* * *

### Reading a Cookie

```php
<?php
if (isset($_COOKIE['username'])) {
    echo "Welcome, " . htmlspecialchars($_COOKIE['username']);
} else {
    echo "Cookie not set.";
}
?>
```

* * *

### Deleting a Cookie

Set the expiry to a time in the past:

```php
<?php
setcookie("username", "", time() - 3600, "/"); // expire 1 hour ago
?>
```

* * *

### Cookie Options (PHP 7.3+)

```php
<?php
setcookie("token", "abc123", [
    "expires"  => time() + 86400,
    "path"     => "/",
    "secure"   => true,    // HTTPS only
    "httponly" => true,    // not accessible via JavaScript
    "samesite" => "Strict" // CSRF protection
]);
?>
```

* * *

## Sessions

A session stores data **on the server** and uses a cookie to link the browser to the session data.

### Starting a Session

```php
<?php
session_start(); // must be called before any output
?>
```

* * *

### Storing Session Data

```php
<?php
session_start();

$_SESSION['user_id']  = 101;
$_SESSION['username'] = "Alice";
$_SESSION['role']     = "admin";

echo "Session started for " . $_SESSION['username'];
?>
```

* * *

### Reading Session Data

```php
<?php
session_start();

if (isset($_SESSION['username'])) {
    echo "Logged in as: " . $_SESSION['username'];
} else {
    echo "Not logged in.";
    header("Location: login.php");
    exit;
}
?>
```

* * *

### Modifying Session Data

```php
<?php
session_start();
$_SESSION['visits'] = ($_SESSION['visits'] ?? 0) + 1;
echo "Visit count: " . $_SESSION['visits'];
?>
```

* * *

### Removing Session Variables

```php
<?php
session_start();

// Remove a single variable
unset($_SESSION['username']);

// Remove all session variables
session_unset();

// Destroy the session completely
session_destroy();
?>
```

* * *

## A Login/Logout Example

**login.php:**
```php
<?php
session_start();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = $_POST['username'];
    $password = $_POST['password'];

    // Normally you'd check against a database
    if ($username === "admin" && $password === "secret") {
        $_SESSION['logged_in'] = true;
        $_SESSION['username']  = $username;
        header("Location: dashboard.php");
        exit;
    } else {
        $error = "Invalid credentials.";
    }
}
?>
```

**dashboard.php:**
```php
<?php
session_start();

if (!isset($_SESSION['logged_in']) || !$_SESSION['logged_in']) {
    header("Location: login.php");
    exit;
}

echo "Welcome, " . $_SESSION['username'];
?>
```

**logout.php:**
```php
<?php
session_start();
session_unset();
session_destroy();
header("Location: login.php");
exit;
?>
```

* * *

## Sessions vs Cookies

| Feature | Session | Cookie |
|---------|---------|--------|
| Storage | Server-side | Client-side (browser) |
| Security | More secure | Less secure |
| Expiry | Ends when browser closes (default) | Can be set to a future date |
| Size | No practical limit | ~4KB per cookie |
| Access | `$_SESSION` | `$_COOKIE` |

**Security Tips:**
* Use `session_regenerate_id(true)` after login to prevent session fixation
* Set `httponly` and `secure` flags on session cookies
* Never store sensitive data (like passwords) in cookies