---
id: "arrays-in-php"
sidebar_position: 9
title: "Arrays in PHP"
sidebar_label: "Arrays"
description: "Arrays in PHP store multiple values in a single variable. Learn indexed arrays, multidimensional arrays, and common array functions."
tags: [php, arrays, indexed-array, multidimensional]
---

An array stores multiple values in a single variable. PHP supports indexed arrays, associative arrays, and multidimensional arrays.

## Creating an Array

```php
<?php
// Using array()
$fruits = array("Apple", "Banana", "Cherry");

// Using short syntax
$colors = ["red", "green", "blue"];

echo $fruits[0]; // Apple
echo $colors[2]; // blue
?>
```

* * *

## Accessing Array Elements

Array indexes start at `0` by default:

```php
<?php
$cars = ["Toyota", "Honda", "BMW"];

echo $cars[0]; // Toyota
echo $cars[1]; // Honda
echo $cars[2]; // BMW
?>
```

* * *

## Modifying Array Elements

```php
<?php
$fruits = ["Apple", "Banana", "Cherry"];
$fruits[1] = "Mango";   // replace Banana
$fruits[] = "Grapes";   // append new element

print_r($fruits);
// [Apple, Mango, Cherry, Grapes]
?>
```

* * *

## Multidimensional Arrays

An array containing one or more arrays:

```php
<?php
$matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
];

echo $matrix[1][2]; // 6
?>
```

### Nested Associative Arrays

```php
<?php
$students = [
    ["name" => "Alice", "grade" => "A"],
    ["name" => "Bob",   "grade" => "B"],
    ["name" => "Carol", "grade" => "A+"]
];

foreach ($students as $student) {
    echo $student["name"] . ": " . $student["grade"] . "<br>";
}
?>
```

* * *

## Useful Array Functions

### Count
```php
<?php
$arr = [1, 2, 3, 4, 5];
echo count($arr); // 5
?>
```

### Sorting
```php
<?php
$nums = [3, 1, 4, 1, 5, 9];
sort($nums);       // ascending
rsort($nums);      // descending
print_r($nums);
?>
```

### Searching
```php
<?php
$fruits = ["Apple", "Banana", "Cherry"];
echo in_array("Banana", $fruits);           // 1 (true)
echo array_search("Cherry", $fruits);       // 2 (index)
?>
```

### Adding & Removing
```php
<?php
$arr = [1, 2, 3];

array_push($arr, 4, 5);    // add to end → [1,2,3,4,5]
array_pop($arr);            // remove last → [1,2,3,4]
array_unshift($arr, 0);     // add to start → [0,1,2,3,4]
array_shift($arr);          // remove first → [1,2,3,4]

print_r($arr);
?>
```

### Slicing
```php
<?php
$arr = [10, 20, 30, 40, 50];
$slice = array_slice($arr, 1, 3); // start at index 1, take 3
print_r($slice); // [20, 30, 40]
?>
```

### Merging
```php
<?php
$a = [1, 2, 3];
$b = [4, 5, 6];
$merged = array_merge($a, $b);
print_r($merged); // [1, 2, 3, 4, 5, 6]
?>
```

### Unique Values
```php
<?php
$arr = [1, 2, 2, 3, 3, 3];
$unique = array_unique($arr);
print_r($unique); // [1, 2, 3]
?>
```

### Mapping and Filtering
```php
<?php
$nums = [1, 2, 3, 4, 5];

// map: double each value
$doubled = array_map(fn($n) => $n * 2, $nums);
print_r($doubled); // [2, 4, 6, 8, 10]

// filter: keep only even numbers
$evens = array_filter($nums, fn($n) => $n % 2 === 0);
print_r($evens); // [2, 4]
?>
```

### Reduce
```php
<?php
$nums = [1, 2, 3, 4, 5];
$sum = array_reduce($nums, fn($carry, $n) => $carry + $n, 0);
echo $sum; // 15
?>
```

* * *

## Checking if Variable is an Array

```php
<?php
$data = [1, 2, 3];
if (is_array($data)) {
    echo "It's an array!";
}
?>
```

* * *

## Converting Between Arrays and Strings

```php
<?php
// Array to string
$fruits = ["Apple", "Banana", "Cherry"];
echo implode(", ", $fruits); // Apple, Banana, Cherry

// String to array
$str = "one,two,three";
$arr = explode(",", $str);
print_r($arr); // [one, two, three]
?>
```