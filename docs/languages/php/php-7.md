---
id: "functions-in-php"
sidebar_position: 7
title: "Functions in php"
sidebar_label: "Functions"
description: "Functions in php are blocks of reusable code. Learn how to create, call, and use parameters, return values, and built-in functions."
tags: [php, functions, return, parameters]
---

A function is a block of statements that can be reused repeatedly. php has over 1,000 built-in functions, and you can also create your own.

## Creating a Function

A user-defined function starts with the `function` keyword:

```php
<?php
function greet() {
    echo "Hello, World!";
}

greet(); // Call the function
// Output: Hello, World!
?>
```

* * *

## Functions with Parameters

Parameters are specified after the function name, inside parentheses:

```php
<?php
function greetUser($name) {
    echo "Hello, $name!";
}

greetUser("Alice"); // Hello, Alice!
greetUser("Bob");   // Hello, Bob!
?>
```

### Multiple Parameters

```php
<?php
function add($a, $b) {
    echo $a + $b;
}

add(3, 7); // 10
?>
```

* * *

## Default Parameter Values

You can set a default value for a parameter:

```php
<?php
function setColor($color = "blue") {
    echo "Color is: $color";
}

setColor("red");  // Color is: red
setColor();       // Color is: blue
?>
```

* * *

## Return Values

Use `return` to send a value back from a function:

```php
<?php
function multiply($x, $y) {
    return $x * $y;
}

$result = multiply(4, 5);
echo $result; // 20
?>
```

* * *

## Type Declarations (php 7+)

You can specify the type of arguments and return values:

```php
<?php
function addNumbers(int $a, int $b): int {
    return $a + $b;
}

echo addNumbers(3, 4); // 7
?>
```

Using `strict_types` to enforce strict type checking:

```php
<?php
declare(strict_types=1);

function divide(float $a, float $b): float {
    return $a / $b;
}

echo divide(10.0, 3.0); // 3.333...
?>
```

* * *

## Variable-Length Arguments

Use `...` (splat operator) to accept any number of arguments:

```php
<?php
function sumAll(...$numbers) {
    return array_sum($numbers);
}

echo sumAll(1, 2, 3, 4, 5); // 15
?>
```

* * *

## Passing Arguments by Reference

Use `&` to pass an argument by reference so the original variable is modified:

```php
<?php
function addFive(&$num) {
    $num += 5;
}

$value = 10;
addFive($value);
echo $value; // 15
?>
```

* * *

## Anonymous Functions (Closures)

Functions without a name, often used as callbacks:

```php
<?php
$greet = function($name) {
    return "Hello, $name!";
};

echo $greet("Alice"); // Hello, Alice!
?>
```

* * *

## Arrow Functions (php 7.4+)

A shorter syntax for simple closures:

```php
<?php
$double = fn($x) => $x * 2;

echo $double(5);  // 10
?>
```

* * *

## Recursive Functions

A function that calls itself:

```php
<?php
function factorial($n) {
    if ($n <= 1) return 1;
    return $n * factorial($n - 1);
}

echo factorial(5); // 120
?>
```

* * *

## Commonly Used Built-in Functions

```php
<?php
echo strlen("Hello");         // 5
echo strtoupper("hello");     // HELLO
echo round(4.6);              // 5
echo max(1, 5, 3);            // 5
echo count([1, 2, 3]);        // 3
echo date("Y-m-d");           // current date
?>
```