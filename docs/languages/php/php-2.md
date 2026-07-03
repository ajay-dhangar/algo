---
id: "variables-and-constants"
sidebar_position: 2
title: "Variables and Constants in php"
sidebar_label: "Variables & Constants"
description: "Learn how to declare and use variables and constants in php, including naming rules, scope, and the define() function."
tags: [php, variables, constants]
---

Variables are containers for storing data values. Constants are identifiers for simple values that cannot be changed during the execution of a script.

## php Variables

In php, a variable starts with the `$` sign, followed by the name of the variable:

```php
<?php
$name = "John";
$age = 25;
$height = 5.9;
echo $name;   // John
echo $age;    // 25
echo $height; // 5.9
?>
```

* * *

## php Variable Rules

* A variable starts with the `$` sign, followed by the name
* A variable name must start with a letter or the underscore character
* A variable name cannot start with a number
* A variable name can only contain alpha-numeric characters and underscores (A–z, 0–9, and `_`)
* Variable names are case-sensitive (`$age` and `$Age` are different variables)

* * *

## Assigning Variables

php is a loosely typed language — you do not need to declare a variable's data type explicitly:

```php
<?php
$txt = "Hello World";   // string
$x = 5;                 // integer
$y = 10.5;              // float
$isValid = true;        // boolean
?>
```

* * *

## Variable Scope

php has three types of variable scope:

* **Local** – declared inside a function, accessible only within it
* **Global** – declared outside a function, accessible only outside it (use `global` keyword inside functions)
* **Static** – retains its value after the function execution

```php
<?php
$globalVar = "I am global";

function testScope() {
    global $globalVar;
    echo $globalVar; // accessible now
}

function testStatic() {
    static $count = 0;
    $count++;
    echo $count;
}

testStatic(); // 1
testStatic(); // 2
testStatic(); // 3
?>
```

* * *

## php Constants

A constant is an identifier for a simple value. The value cannot be changed during the script. A valid constant name starts with a letter or underscore (no `$` sign).

### Using `define()`

```php
<?php
define("SITE_NAME", "MyWebsite");
define("MAX_SIZE", 100);

echo SITE_NAME; // MyWebsite
echo MAX_SIZE;  // 100
?>
```

### Using `const` keyword

```php
<?php
const VERSION = "1.0.0";
const PI = 3.14159;

echo VERSION; // 1.0.0
echo PI;      // 3.14159
?>
```

* * *

## Constants vs Variables

| Feature | Variable | Constant |
|--------|----------|----------|
| Prefix | `$` sign required | No `$` sign |
| Value change | Can be changed | Cannot be changed |
| Scope | Limited (local/global) | Global by default |
| Declaration | Assignment | `define()` or `const` |

* * *

## Predefined Constants

php has several built-in constants available at all times:

```php
<?php
echo PHP_VERSION;    // e.g., 8.2.0
echo PHP_INT_MAX;    // maximum integer value
echo PHP_EOL;        // end-of-line character
echo __FILE__;       // full path and filename of the file
echo __LINE__;       // current line number
?>
```

**Note:** Constants are automatically global and can be used across the entire script.