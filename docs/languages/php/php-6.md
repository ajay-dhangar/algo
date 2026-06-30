---
id: "loops-in-php"
sidebar_position: 6
title: "Loops in php"
sidebar_label: "Loops"
description: "php loops execute a block of code repeatedly. Learn while, do-while, for, and foreach loops with examples."
tags: [php, loops, while, for, foreach]
---

Loops are used to execute the same block of code repeatedly as long as a condition is true. php supports `while`, `do...while`, `for`, and `foreach` loops.

## Video Explanation

<LiteYouTubeEmbed
  id="RRVYpIET_RU"
  params="autoplay=1&autohide=1&showinfo=0&rel=0"
  title="Complete C++ STL in 1 Video | Time Complexity and Notes"
  lazyLoad={true}
  webp
/>

## The `while` Loop

Executes code as long as the condition is true:

```php
<?php
$i = 1;

while ($i <= 5) {
    echo "Count: $i <br>";
    $i++;
}
// Output: Count: 1, Count: 2 ... Count: 5
?>
```

* * *

## The `do...while` Loop

Executes the code block **once** before checking the condition, then repeats while true:

```php
<?php
$i = 1;

do {
    echo "Number: $i <br>";
    $i++;
} while ($i <= 5);
?>
```

**Key difference:** The `do...while` loop always runs at least once, even if the condition is false from the start.

* * *

## The `for` Loop

Used when you know in advance how many times to loop:

```php
<?php
for ($i = 0; $i < 5; $i++) {
    echo "Item $i <br>";
}
?>
```

**Syntax:**
```
for (initialization; condition; increment) {
    // code
}
```

* * *

## The `foreach` Loop

Used to loop through arrays:

```php
<?php
$fruits = ["Apple", "Banana", "Cherry"];

foreach ($fruits as $fruit) {
    echo $fruit . "<br>";
}
// Apple, Banana, Cherry
?>
```

### `foreach` with key => value

```php
<?php
$person = ["name" => "Alice", "age" => 30, "city" => "Delhi"];

foreach ($person as $key => $value) {
    echo "$key: $value <br>";
}
// name: Alice
// age: 30
// city: Delhi
?>
```

* * *

## Loop Control Statements

### `break`
Exits the loop immediately:

```php
<?php
for ($i = 0; $i < 10; $i++) {
    if ($i == 5) {
        break; // stop at 5
    }
    echo $i . " ";
}
// 0 1 2 3 4
?>
```

### `continue`
Skips the current iteration and moves to the next:

```php
<?php
for ($i = 0; $i < 10; $i++) {
    if ($i % 2 == 0) {
        continue; // skip even numbers
    }
    echo $i . " ";
}
// 1 3 5 7 9
?>
```

* * *

## Nested Loops

```php
<?php
for ($i = 1; $i <= 3; $i++) {
    for ($j = 1; $j <= 3; $j++) {
        echo "$i x $j = " . ($i * $j) . "<br>";
    }
}
?>
```

* * *

## Loop Comparison

| Loop | Best Used When |
|------|----------------|
| `while` | Condition checked before each iteration |
| `do...while` | Must run at least once |
| `for` | Number of iterations is known |
| `foreach` | Iterating over arrays or objects |

* * *

## Alternative Syntax

Like control structures, loops support alternative syntax for use with HTML:

```php
<?php $items = ["Home", "About", "Contact"]; ?>
<ul>
<?php foreach ($items as $item): ?>
    <li><?= $item ?></li>
<?php endforeach; ?>
</ul>
```