---
id: "operators-in-php"
sidebar_position: 4
title: "Operators in php"
sidebar_label: "Operators"
description: "php operators are used to perform operations on variables and values. Learn arithmetic, assignment, comparison, logical, string, and more operators."
tags: [php, operators, arithmetic, comparison]
---

Operators are used to perform operations on variables and values. php divides operators into several groups.

## Arithmetic Operators

Used to perform common mathematical operations:

| Operator | Name | Example | Result |
|----------|------|---------|--------|
| `+` | Addition | `$x + $y` | Sum |
| `-` | Subtraction | `$x - $y` | Difference |
| `*` | Multiplication | `$x * $y` | Product |
| `/` | Division | `$x / $y` | Quotient |
| `%` | Modulus | `$x % $y` | Remainder |
| `**` | Exponentiation | `$x ** $y` | Power |

```php
<?php
$x = 10;
$y = 3;

echo $x + $y;   // 13
echo $x - $y;   // 7
echo $x * $y;   // 30
echo $x / $y;   // 3.333...
echo $x % $y;   // 1
echo $x ** $y;  // 1000
?>
```

* * *

## Assignment Operators

Used to write values to variables:

```php
<?php
$x = 10;
$x += 5;   // $x = $x + 5  → 15
$x -= 3;   // $x = $x - 3  → 12
$x *= 2;   // $x = $x * 2  → 24
$x /= 4;   // $x = $x / 4  → 6
$x %= 4;   // $x = $x % 4  → 2
?>
```

* * *

## Comparison Operators

Used to compare two values:

| Operator | Name | Example |
|----------|------|---------|
| `==` | Equal | `$x == $y` |
| `===` | Identical | `$x === $y` |
| `!=` | Not equal | `$x != $y` |
| `!==` | Not identical | `$x !== $y` |
| `>` | Greater than | `$x > $y` |
| `<` | Less than | `$x < $y` |
| `>=` | Greater than or equal | `$x >= $y` |
| `<=` | Less than or equal | `$x <= $y` |
| `<=>` | Spaceship | `$x <=> $y` |

```php
<?php
$x = 10;
$y = "10";

var_dump($x == $y);   // bool(true)  - same value
var_dump($x === $y);  // bool(false) - different types
var_dump($x <=> 15);  // int(-1) — less than
?>
```

* * *

## Increment / Decrement Operators

```php
<?php
$x = 5;
echo ++$x; // Pre-increment: 6
echo $x++; // Post-increment: 6 (then $x becomes 7)
echo --$x; // Pre-decrement: 6
echo $x--; // Post-decrement: 6 (then $x becomes 5)
?>
```

* * *

## Logical Operators

| Operator | Name | Example |
|----------|------|---------|
| `&&` | And | `$x && $y` |
| `\|\|` | Or | `$x \|\| $y` |
| `!` | Not | `!$x` |
| `and` | And (low precedence) | `$x and $y` |
| `or` | Or (low precedence) | `$x or $y` |

```php
<?php
$age = 20;
$hasID = true;

if ($age >= 18 && $hasID) {
    echo "Access granted";
}
?>
```

* * *

## String Operators

```php
<?php
$first = "Hello";
$last = "World";

echo $first . " " . $last;  // Concatenation: Hello World

$str = "Hello";
$str .= " World";            // Concatenation assignment
echo $str;                   // Hello World
?>
```

* * *

## Array Operators

| Operator | Name | Description |
|----------|------|-------------|
| `+` | Union | Combines arrays |
| `==` | Equality | Same key/value pairs |
| `===` | Identity | Same key/value pairs, order, and types |
| `!=` | Inequality | Not equal |

```php
<?php
$a = ["a" => 1, "b" => 2];
$b = ["b" => 3, "c" => 4];

$c = $a + $b;
print_r($c); // ["a" => 1, "b" => 2, "c" => 4]
?>
```

* * *

## Ternary Operator

A shorthand for `if...else`:

```php
<?php
$age = 20;
$status = ($age >= 18) ? "Adult" : "Minor";
echo $status; // Adult
?>
```

## Null Coalescing Operator (`??`)

Returns the first operand if it exists and is not `null`, otherwise returns the second operand:

```php
<?php
$username = $_GET['user'] ?? "Guest";
echo $username; // Guest if 'user' is not set
?>
```