---
id: "introduction-to-php"
sidebar_position: 1
title: "Introduction to php"
sidebar_label: "Introduction to php"
description: "php is a popular general-purpose scripting language especially suited to web development. It is fast, flexible, and pragmatic."
tags: [php, web-development, server-side]
---

php is a widely-used open-source server-side scripting language designed especially for web development and can be embedded into HTML.

## What is php?

* php stands for **php: Hypertext Preprocessor** (a recursive acronym)
* php is a server-side scripting language
* php scripts are executed on the server
* php is free to download and use
* php files have the extension `.php`

* * *

## What Can php Do?

* php can generate dynamic page content
* php can create, open, read, write, delete, and close files on the server
* php can collect form data
* php can send and receive cookies
* php can add, delete, modify data in your database
* php can be used to control user-access
* php can encrypt data

* * *

## Why php?

* php runs on various platforms (Windows, Linux, Unix, macOS, etc.)
* php is compatible with almost all servers used today (Apache, Nginx, IIS, etc.)
* php supports a wide range of databases (MySQL, PostgreSQL, SQLite, etc.)
* php is free — download it from the official php resource: [php.net](https://www.php.net)
* php is easy to learn and runs efficiently on the server side

* * *

## A Basic php Script

A php script starts with `<?php` and ends with `?>`:

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

## php Syntax

php code is executed on the server and the result is returned to the browser as plain HTML. A php file normally contains HTML tags along with php scripting code.

```php
<!DOCTYPE html>
<html>
<body>

<h1>My First php Page</h1>

<?php
echo "Hello from php!";
?>

</body>
</html>
```

**Note:** php statements end with a semicolon (`;`). The closing tag `?>` automatically implies a semicolon, so it is not required on the last line.

* * *

## php Comments

Comments are used to explain code and are ignored by the php engine:

```php
<?php
// This is a single-line comment

# This is also a single-line comment

/*
This is a
multi-line comment
*/

echo "php Comments Example";
?>
```

* * *

## php Case Sensitivity

In php, keywords (e.g. `if`, `else`, `while`, `echo`, etc.) and user-defined functions are **NOT** case-sensitive. However, variable names **ARE** case-sensitive.

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

## How php Works

1. The user sends a request to the web server
2. The web server passes the `.php` file to the php interpreter
3. php executes the script and generates HTML output
4. The server sends the HTML back to the user's browser
5. The browser renders the HTML page

php is processed entirely on the **server side** — the client never sees your php code, only the resulting HTML.