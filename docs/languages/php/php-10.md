---
id: "associative-arrays"
sidebar_position: 10
title: "Associative Arrays in php"
sidebar_label: "Associative Arrays"
description: "Associative arrays in php use named keys instead of numeric indexes. Learn how to create, access, loop, and manipulate them."
tags: [php, associative-arrays, key-value]
---

Associative arrays use named keys (strings) that you assign to them. They are like dictionaries or hashmaps in other languages.

## Video Explanation

<LiteYouTubeEmbed
  id="RRVYpIET_RU"
  params="autoplay=1&autohide=1&showinfo=0&rel=0"
  title="Complete C++ STL in 1 Video | Time Complexity and Notes"
  lazyLoad={true}
  webp
/>

## Creating an Associative Array

```php
<?php
$person = [
    "name" => "Alice",
    "age"  => 30,
    "city" => "Delhi"
];

echo $person["name"]; // Alice
echo $person["age"];  // 30
?>
```

Or using the `array()` constructor:

```php
<?php
$car = array(
    "brand" => "Toyota",
    "model" => "Camry",
    "year"  => 2022
);
?>
```

* * *

## Accessing Values

```php
<?php
$user = ["username" => "john_doe", "email" => "john@example.com"];

echo $user["username"]; // john_doe
echo $user["email"];    // john@example.com
?>
```

* * *

## Modifying Values

```php
<?php
$product = ["name" => "Laptop", "price" => 50000];

$product["price"] = 45000;        // update
$product["discount"] = 2000;      // add new key

print_r($product);
?>
```

* * *

## Removing a Key

```php
<?php
$arr = ["a" => 1, "b" => 2, "c" => 3];
unset($arr["b"]);
print_r($arr); // [a => 1, c => 3]
?>
```

* * *

## Looping Through Associative Arrays

Use `foreach` with `key => value`:

```php
<?php
$config = [
    "host"     => "localhost",
    "database" => "mydb",
    "user"     => "root",
    "password" => "secret"
];

foreach ($config as $key => $value) {
    echo "$key = $value <br>";
}
?>
```

* * *

## Checking if a Key Exists

```php
<?php
$data = ["name" => "Alice", "age" => 30];

if (array_key_exists("name", $data)) {
    echo "Key exists!";
}

// Or using isset
if (isset($data["age"])) {
    echo "Age is set.";
}
?>
```

* * *

## Getting Keys and Values

```php
<?php
$scores = ["Alice" => 95, "Bob" => 87, "Carol" => 92];

$keys   = array_keys($scores);
$values = array_values($scores);

print_r($keys);   // [Alice, Bob, Carol]
print_r($values); // [95, 87, 92]
?>
```

* * *

## Sorting Associative Arrays

```php
<?php
$ages = ["Alice" => 30, "Bob" => 25, "Carol" => 28];

// Sort by value (ascending), maintain key association
asort($ages);
print_r($ages); // Bob: 25, Carol: 28, Alice: 30

// Sort by value (descending)
arsort($ages);

// Sort by key (ascending)
ksort($ages);

// Sort by key (descending)
krsort($ages);
?>
```

* * *

## Merging Associative Arrays

```php
<?php
$defaults = ["color" => "blue", "size" => "M", "qty" => 1];
$custom   = ["color" => "red", "qty" => 5];

$merged = array_merge($defaults, $custom);
print_r($merged);
// color: red, size: M, qty: 5
?>
```

**Note:** When keys conflict in `array_merge()`, the later array's values overwrite the earlier ones.

* * *

## Flipping Keys and Values

```php
<?php
$codes = ["php" => 1, "JS" => 2, "Python" => 3];
$flipped = array_flip($codes);

print_r($flipped);
// [1 => php, 2 => JS, 3 => Python]
?>
```

* * *

## Nested Associative Arrays

```php
<?php
$employees = [
    "E001" => ["name" => "Alice", "dept" => "Engineering"],
    "E002" => ["name" => "Bob",   "dept" => "Marketing"],
    "E003" => ["name" => "Carol", "dept" => "HR"]
];

foreach ($employees as $id => $info) {
    echo "$id: {$info['name']} ({$info['dept']})<br>";
}
?>
```

**Tip:** Associative arrays are commonly used to represent configuration settings, database rows, API responses, and form data in php applications.