---
id: "forms-and-user-input"
sidebar_position: 12
title: "Forms and User Input in php"
sidebar_label: "Forms & User Input"
description: "Learn how to handle HTML forms in php using GET and POST methods, validate input, and prevent common security vulnerabilities."
tags: [php, forms, user-input, validation, security]
---

Forms are the primary way users submit data to php scripts. php handles form data through the `$_GET` and `$_POST` superglobals.

## Video Explanation

<LiteYouTubeEmbed
  id="RRVYpIET_RU"
  params="autoplay=1&autohide=1&showinfo=0&rel=0"
  title="Complete C++ STL in 1 Video | Time Complexity and Notes"
  lazyLoad={true}
  webp
/>

## A Simple HTML Form

```html
<!DOCTYPE html>
<html>
<body>

<form method="post" action="welcome.php">
    Name: <input type="text" name="name"><br>
    Email: <input type="text" name="email"><br>
    <input type="submit" value="Submit">
</form>

</body>
</html>
```

* * *

## Processing Form Data

**welcome.php:**
```php
<?php
$name  = htmlspecialchars($_POST['name'] ?? '');
$email = htmlspecialchars($_POST['email'] ?? '');

echo "Welcome, $name!";
echo "Your email is: $email";
?>
```

* * *

## GET vs POST

| Feature | GET | POST |
|---------|-----|------|
| Data in URL | Yes | No |
| Max data size | ~2000 chars | No limit |
| Bookmarkable | Yes | No |
| Suitable for | Search, filters | Sensitive data |
| Cached | Yes | No |

```php
<?php
// GET example (from URL: page.php?search=php)
$search = $_GET['search'];

// POST example (from form submission)
$password = $_POST['password'];
?>
```

* * *

## Self-Processing Form (Same File)

```php
<?php
$message = "";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = htmlspecialchars($_POST['name']);
    $message = "Hello, $name!";
}
?>
<!DOCTYPE html>
<html>
<body>
<form method="post" action="<?= htmlspecialchars($_SERVER['PHP_SELF']); ?>">
    Name: <input type="text" name="name">
    <input type="submit" value="Submit">
</form>
<p><?= $message ?></p>
</body>
</html>
```

* * *

## Input Validation

Always validate user input before processing:

```php
<?php
$errors = [];
$name   = $email = "";

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    // Validate name
    if (empty($_POST["name"])) {
        $errors[] = "Name is required.";
    } else {
        $name = trim($_POST["name"]);
    }

    // Validate email
    if (empty($_POST["email"])) {
        $errors[] = "Email is required.";
    } elseif (!filter_var($_POST["email"], FILTER_VALIDATE_EMAIL)) {
        $errors[] = "Invalid email format.";
    } else {
        $email = trim($_POST["email"]);
    }

    if (empty($errors)) {
        echo "Form submitted: $name, $email";
    } else {
        foreach ($errors as $error) {
            echo "<p style='color:red'>$error</p>";
        }
    }
}
?>
```

* * *

## Sanitizing Input

```php
<?php
// Remove HTML tags and extra whitespace
$name = strip_tags(trim($_POST['name']));

// Sanitize an email
$email = filter_var($_POST['email'], FILTER_SANITIZE_EMAIL);

// Sanitize a URL
$url = filter_var($_POST['url'], FILTER_SANITIZE_URL);

// Prevent XSS
$safe = htmlspecialchars($_POST['comment']);
?>
```

* * *

## Handling Checkboxes and Radio Buttons

```html
<form method="post">
    <input type="checkbox" name="subscribe" value="yes"> Subscribe
    <input type="radio" name="gender" value="male"> Male
    <input type="radio" name="gender" value="female"> Female
    <input type="submit">
</form>
```

```php
<?php
$subscribe = isset($_POST['subscribe']) ? "Yes" : "No";
$gender    = $_POST['gender'] ?? "Not specified";

echo "Subscribe: $subscribe";
echo "Gender: $gender";
?>
```

* * *

## Handling Select Dropdowns

```html
<form method="post">
    <select name="country">
        <option value="IN">India</option>
        <option value="US">USA</option>
        <option value="UK">UK</option>
    </select>
    <input type="submit">
</form>
```

```php
<?php
$country = $_POST['country'] ?? '';
echo "Selected: $country";
?>
```

* * *

## File Upload Form

```html
<form method="post" enctype="multipart/form-data">
    Upload: <input type="file" name="file">
    <input type="submit" value="Upload">
</form>
```

```php
<?php
if (isset($_FILES['file']) && $_FILES['file']['error'] === UPLOAD_ERR_OK) {
    $name = $_FILES['file']['name'];
    $tmp  = $_FILES['file']['tmp_name'];
    
    // Validate file extension to prevent PHP shell uploads
    $allowedExtensions = ['jpg', 'jpeg', 'png', 'pdf'];
    $ext = strtolower(pathinfo($name, PATHINFO_EXTENSION));
    
    if (in_array($ext, $allowedExtensions)) {
        $dest = "uploads/" . basename($name);
        if (move_uploaded_file($tmp, $dest)) {
            echo "File uploaded: " . htmlspecialchars($name);
        } else {
            echo "Upload failed.";
        }
    } else {
        echo "Invalid file type.";
    }
}
```

**Security Note:** Never trust user-submitted data. Always validate, sanitize, and escape before displaying or storing.