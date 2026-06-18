---
id: "file-handling-in-php"
sidebar_position: 17
title: "File Handling in php"
sidebar_label: "File Handling"
description: "Learn how to create, read, write, append, and delete files in php using built-in file functions."
tags: [php, file-handling, fopen, fread, fwrite]
---

php provides built-in functions to create, read, write, and delete files on the server.

## Opening a File

`fopen()` opens a file and returns a file handle:

```php
<?php
$file = fopen("data.txt", "r"); // open for reading
?>
```

### File Modes

| Mode | Description |
|------|-------------|
| `r` | Read only (file must exist) |
| `w` | Write only (creates or truncates file) |
| `a` | Append (creates if not exists) |
| `r+` | Read and write |
| `w+` | Read and write (truncates) |
| `a+` | Read and append |
| `x` | Write only (fails if file exists) |

* * *

## Reading a File

### Read Entire File
```php
<?php
// Read all contents at once
$content = file_get_contents("data.txt");
echo $content;
?>
```

### Read Line by Line
```php
<?php
$file = fopen("data.txt", "r");

while (!feof($file)) {
    $line = fgets($file);
    echo $line . "<br>";
}

fclose($file);
?>
```

### Read Into Array
```php
<?php
$lines = file("data.txt", FILE_IGNORE_NEW_LINES);
foreach ($lines as $line) {
    echo $line . "<br>";
}
?>
```

* * *

## Writing to a File

### Overwrite (Write Mode)
```php
<?php
file_put_contents("output.txt", "Hello, php!\n");
// Creates or overwrites the file
?>
```

### Append to a File
```php
<?php
file_put_contents("log.txt", "New entry\n", FILE_APPEND);
?>
```

### Using `fwrite()`
```php
<?php
$file = fopen("notes.txt", "w");
fwrite($file, "First line\n");
fwrite($file, "Second line\n");
fclose($file);
?>
```

* * *

## Checking File Existence

```php
<?php
if (file_exists("data.txt")) {
    echo "File exists!";
} else {
    echo "File not found.";
}
?>
```

* * *

## File Information

```php
<?php
echo filesize("data.txt");         // size in bytes
echo filemtime("data.txt");        // last modified timestamp
echo filetype("data.txt");         // file, dir, link, etc.
echo pathinfo("data.txt", PATHINFO_EXTENSION); // txt
echo basename("/path/to/data.txt"); // data.txt
echo dirname("/path/to/data.txt");  // /path/to
?>
```

* * *

## Deleting a File

```php
<?php
if (file_exists("temp.txt")) {
    unlink("temp.txt");
    echo "File deleted.";
}
?>
```

* * *

## Copying and Renaming

```php
<?php
copy("source.txt", "backup.txt");       // copy
rename("old_name.txt", "new_name.txt"); // rename/move
?>
```

* * *

## Working with Directories

```php
<?php
// Create directory
mkdir("uploads", 0755, true); // recursive

// List directory contents
$files = scandir("uploads");
foreach ($files as $file) {
    if ($file !== "." && $file !== "..") {
        echo $file . "<br>";
    }
}

// Remove directory (must be empty)
rmdir("empty_folder");
?>
```

* * *

## Reading CSV Files

```php
<?php
$file = fopen("data.csv", "r");

while (($row = fgetcsv($file)) !== false) {
    print_r($row); // array of values per row
}

fclose($file);
?>
```

* * *

## Writing CSV Files

```php
<?php
$file = fopen("output.csv", "w");

fputcsv($file, ["Name", "Age", "City"]);
fputcsv($file, ["Alice", 30, "Delhi"]);
fputcsv($file, ["Bob",   25, "Mumbai"]);

fclose($file);
?>
```

**Security Note:** Always validate file paths and extensions when handling user-submitted file names to prevent directory traversal attacks.