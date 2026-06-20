---
id: "data-types-in-php"
sidebar_position: 3
title: "Data Types in php"
sidebar_label: "Data Types"
description: "php supports several data types including strings, integers, floats, booleans, arrays, objects, NULL, and resources."
tags: [php, data-types, types]
---

php supports the following data types: String, Integer, Float, Boolean, Array, Object, NULL, and Resource.

## String

A string is a sequence of characters. It can be written inside single or double quotes:

```php
<?php
$name = "Hello World";
$greeting = 'Welcome to php';

echo $name;     // Hello World
echo $greeting; // Welcome to php
?>
```

* * *

## Integer

An integer is a whole number (no decimal point). Rules:
* Must have at least one digit
* Must not have a decimal point
* Can be positive or negative
* Can be decimal, hexadecimal, or octal

```php
<?php
$x = 42;       // decimal
$y = -100;     // negative
$z = 0x1A;     // hexadecimal
$w = 0755;     // octal

var_dump($x);  // int(42)
?>
```

* * *

## Float

A float (floating-point number) is a number with a decimal point or in exponential form:

```php
<?php
$price = 19.99;
$scientific = 1.5e3;   // 1500
$small = 2.5E-4;       // 0.00025

var_dump($price); // float(19.99)
?>
```

* * *

## Boolean

A boolean represents two possible states: `true` or `false`:

```php
<?php
$isLoggedIn = true;
$hasError = false;

var_dump($isLoggedIn); // bool(true)
var_dump($hasError);   // bool(false)
?>
```

* * *

## Array

An array stores multiple values in a single variable:

```php
<?php
$fruits = array("Apple", "Banana", "Cherry");
// or shorthand:
$colors = ["red", "green", "blue"];

echo $fruits[0]; // Apple
echo $colors[1]; // green
?>
```

* * *

## Object

Objects are instances of classes. They store data and information on how to process that data:

```php
<?php
class Car {
    public $brand;
    public $color;

    public function __construct($brand, $color) {
        $this->brand = $brand;
        $this->color = $color;
    }
}

$myCar = new Car("Toyota", "Red");
echo $myCar->brand; // Toyota
?>
```

* * *

## NULL

NULL is a special data type that represents a variable with no value assigned:

```php
<?php
$x = null;
var_dump($x); // NULL

$y = "Hello";
$y = null;    // variable is now empty
?>
```

* * *

## Resource

A resource is a special variable holding a reference to an external resource (like a database connection or file handle):

```php
<?php
$file = fopen("test.txt", "r"); // resource
var_dump($file);                 // resource(3) of type (stream)
fclose($file);
?>
```

* * *

## Type Checking Functions

php provides several functions to check the type of a variable:

```php
<?php
$value = 42;

var_dump($value);         // int(42)
echo gettype($value);     // integer
echo is_int($value);      // 1 (true)
echo is_string($value);   // (empty = false)
echo is_numeric("3.14");  // 1 (true)
?>
```

* * *

## Type Casting

You can cast a variable to a different type:

```php
<?php
$x = "10";
$y = (int) $x;     // cast to integer
$z = (float) $x;   // cast to float
$b = (bool) $x;    // cast to boolean

var_dump($y); // int(10)
var_dump($z); // float(10)
var_dump($b); // bool(true)
?>
```

**Note:** php is a loosely typed language — it automatically converts data types based on the context, which is called **type juggling**.