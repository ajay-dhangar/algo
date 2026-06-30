---
id: "strings-in-php"
sidebar_position: 8
title: "Strings in php"
sidebar_label: "Strings"
description: "Learn how to work with strings in php including string functions, formatting, searching, replacing, and manipulation techniques."
tags: [php, strings, string-functions]
---

A string is a sequence of characters. In php, strings can be written inside single quotes, double quotes, heredoc, or nowdoc syntax.

## Video Explanation

<LiteYouTubeEmbed
  id="RRVYpIET_RU"
  params="autoplay=1&autohide=1&showinfo=0&rel=0"
  title="Complete C++ STL in 1 Video | Time Complexity and Notes"
  lazyLoad={true}
  webp
/>

## Creating Strings

```php
<?php
$single = 'Hello World';           // Single quotes
$double = "Hello World";           // Double quotes
$name = "Alice";
$msg = "Hello, $name!";           // Variable interpolation (double only)

echo $msg; // Hello, Alice!
?>
```

* * *

## String Length

```php
<?php
echo strlen("Hello World"); // 11
?>
```

* * *

## Heredoc Syntax

Useful for multi-line strings with variable interpolation:

```php
<?php
$name = "Alice";
$text = <<<EOT
Hello, $name!
Welcome to php.
EOT;

echo $text;
?>
```

## Nowdoc Syntax

Like heredoc but no variable interpolation (like single quotes):

```php
<?php
$name = "Alice";
$text = <<<'EOT'
Hello, $name!
This will NOT be interpolated.
EOT;

echo $text; // Hello, $name!
?>
```

* * *

## String Functions

### Case Manipulation

```php
<?php
echo strtolower("HELLO");   // hello
echo strtoupper("hello");   // HELLO
echo ucfirst("hello world"); // Hello world
echo ucwords("hello world"); // Hello World
?>
```

### Trimming

```php
<?php
echo trim("  Hello  ");    // "Hello"
echo ltrim("  Hello  ");   // "Hello  "
echo rtrim("  Hello  ");   // "  Hello"
?>
```

### Searching

```php
<?php
$str = "Hello World";

echo strpos($str, "World");   // 6 (position)
echo strrpos($str, "l");      // 9 (last occurrence)
echo str_contains($str, "World"); // true (php 8+)
echo str_starts_with($str, "Hello"); // true (php 8+)
echo str_ends_with($str, "World");   // true (php 8+)
?>
```

### Replacing

```php
<?php
echo str_replace("World", "php", "Hello World"); // Hello php

// Case-insensitive replace
echo str_ireplace("WORLD", "php", "Hello World"); // Hello php
?>
```

### Substring

```php
<?php
$str = "Hello World";

echo substr($str, 6);      // World
echo substr($str, 0, 5);   // Hello
echo substr($str, -5);     // World
?>
```

### Splitting and Joining

```php
<?php
// Split string into array
$parts = explode(",", "Apple,Banana,Cherry");
print_r($parts); // ["Apple", "Banana", "Cherry"]

// Join array into string
$joined = implode(" - ", $parts);
echo $joined; // Apple - Banana - Cherry
?>
```

* * *

## String Formatting

```php
<?php
$name = "Alice";
$age = 30;

// sprintf
$msg = sprintf("Name: %s, Age: %d", $name, $age);
echo $msg; // Name: Alice, Age: 30

// number_format
echo number_format(1234567.891, 2); // 1,234,567.89
?>
```

* * *

## Repeating Strings

```php
<?php
echo str_repeat("Ha", 3); // HaHaHa
?>
```

* * *

## Reversing Strings

```php
<?php
echo strrev("Hello"); // olleH
?>
```

* * *

## Padding Strings

```php
<?php
echo str_pad("5", 3, "0", STR_PAD_LEFT);  // 005
echo str_pad("Hi", 10, "-", STR_PAD_BOTH); // ----Hi----
?>
```

* * *

## Word Count

```php
<?php
echo str_word_count("Hello World php"); // 3
?>
```

**Note:** In php, string indexes start at **0**. Use `$str[0]` to access the first character of a string.