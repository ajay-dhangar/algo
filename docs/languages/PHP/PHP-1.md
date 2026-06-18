---
id: "introduction-to-php"
sidebar_position: 1
title: "Introduction to PHP"
sidebar_label: "Introduction to PHP"
description: "PHP is a popular general-purpose scripting language especially suited to web development. It is fast, flexible, and pragmatic."
tags: [php, web-development, server-side]
---

PHP is a widely-used open-source server-side scripting language designed especially for web development and can be embedded into HTML.

## What is PHP?

* PHP stands for **PHP: Hypertext Preprocessor** (a recursive acronym)
* PHP is a server-side scripting language
* PHP scripts are executed on the server
* PHP is free to download and use
* PHP files have the extension `.php`

* * *

## What Can PHP Do?

* PHP can generate dynamic page content
* PHP can create, open, read, write, delete, and close files on the server
* PHP can collect form data
* PHP can send and receive cookies
* PHP can add, delete, modify data in your database
* PHP can be used to control user-access
* PHP can encrypt data

* * *

## Why PHP?

* PHP runs on various platforms (Windows, Linux, Unix, macOS, etc.)
* PHP is compatible with almost all servers used today (Apache, Nginx, IIS, etc.)
* PHP supports a wide range of databases (MySQL, PostgreSQL, SQLite, etc.)
* PHP is free — download it from the official PHP resource: [php.net](https://www.php.net)
* PHP is easy to learn and runs efficiently on the server side

* * *

## A Basic PHP Script

A PHP script starts with `<?php` and ends with `?>`:

```php
<?php
echo "Hello, World!";
?>
```

**Output:**
```
Hello, World!
```

* * *

## PHP Syntax

PHP code is executed on the server and the result is returned to the browser as plain HTML. A PHP file normally contains HTML tags along with PHP scripting code.

```php
<!DOCTYPE html>
<html>
<body>

<h1>My First PHP Page</h1>

<?php
echo "Hello from PHP!";
?>

</body>
</html>
```

**Note:** PHP statements end with a semicolon (`;`). The closing tag `?>` automatically implies a semicolon, so it is not required on the last line.

* * *

## PHP Comments

Comments are used to explain code and are ignored by the PHP engine:

```php
<?php
// This is a single-line comment

# This is also a single-line comment

/*
This is a
multi-line comment
*/

echo "PHP Comments Example";
?>
```

* * *

## PHP Case Sensitivity

In PHP, keywords (e.g. `if`, `else`, `while`, `echo`, etc.) and user-defined functions are **NOT** case-sensitive. However, variable names **ARE** case-sensitive.

```php
<?php
ECHO "Hello World!<br>";  // valid
echo "Hello World!<br>";  // valid
Echo "Hello World!<br>";  // valid

$color = "red";
echo $color;   // outputs: red
echo $Color;   // undefined variable error
?>
```

* * *

## How PHP Works

1. The user sends a request to the web server
2. The web server passes the `.php` file to the PHP interpreter
3. PHP executes the script and generates HTML output
4. The server sends the HTML back to the user's browser
5. The browser renders the HTML page

PHP is processed entirely on the **server side** — the client never sees your PHP code, only the resulting HTML.