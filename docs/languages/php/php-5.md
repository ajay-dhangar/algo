---
id: "php-control-statements"
sidebar_position: 5
title: "Control Statements in php"
sidebar_label: "Control Statements"
description: "Control statements in php allow you to control the flow of execution using if, else, elseif, switch, and match expressions."
tags: [php, control-flow, if-else, switch, match]
---

Control statements allow you to make decisions in your code. php supports `if`, `else`, `elseif`, `switch`, and the modern `match` expression.

## Video Explanation

<LiteYouTubeEmbed
  id="EBrUfyRO3Y0"
  params="autoplay=1&autohide=1&showinfo=0&rel=0"
  title="If Else Conditionals in Php | PHP Tutorial #10"
  lazyLoad={true}
  webp
/>

## The `if` Statement

Executes code if a condition is true:

```php
<?php
$age = 20;

if ($age >= 18) {
    echo "You are an adult.";
}
?>
```

* * *

## The `if...else` Statement

Executes one block if true, another if false:

```php
<?php
$score = 55;

if ($score >= 60) {
    echo "Pass";
} else {
    echo "Fail";
}
?>
```

* * *

## The `if...elseif...else` Statement

Tests multiple conditions in sequence:

```php
<?php
$marks = 75;

if ($marks >= 90) {
    echo "Grade: A";
} elseif ($marks >= 75) {
    echo "Grade: B";
} elseif ($marks >= 60) {
    echo "Grade: C";
} else {
    echo "Grade: F";
}
// Output: Grade: B
?>
```

* * *

## Shorthand `if` (Ternary)

```php
<?php
$isLoggedIn = true;
echo $isLoggedIn ? "Welcome back!" : "Please log in.";
?>
```

* * *

## The `switch` Statement

Tests a variable against multiple values:

```php
<?php
$day = "Monday";

switch ($day) {
    case "Monday":
        echo "Start of the work week.";
        break;
    case "Friday":
        echo "End of the work week!";
        break;
    case "Saturday":
    case "Sunday":
        echo "It's the weekend!";
        break;
    default:
        echo "Midweek day.";
}
?>
```

**Note:** Always use `break` to prevent fall-through to the next case.

* * *

## The `match` Expression (php 8+)

A cleaner alternative to `switch` with strict comparison:

```php
<?php
$status = 2;

$message = match($status) {
    1 => "Active",
    2 => "Inactive",
    3 => "Banned",
    default => "Unknown"
};

echo $message; // Inactive
?>
```

### Differences: `switch` vs `match`

| Feature | `switch` | `match` |
|---------|----------|---------|
| Comparison | Loose (`==`) | Strict (`===`) |
| Fall-through | Yes (needs `break`) | No |
| Returns value | No | Yes |
| Multiple conditions | Yes (stacked cases) | Yes (comma-separated) |

* * *

## Nested `if` Statements

```php
<?php
$age = 25;
$hasLicense = true;

if ($age >= 18) {
    if ($hasLicense) {
        echo "You can drive.";
    } else {
        echo "You need a license.";
    }
} else {
    echo "You are too young to drive.";
}
?>
```

* * *

## Alternative Syntax

php allows an alternative syntax for control structures, useful in HTML templates:

```php
<?php $loggedIn = true; ?>

<?php if ($loggedIn): ?>
    <p>Welcome, user!</p>
<?php else: ?>
    <p>Please log in.</p>
<?php endif; ?>
```

**Note:** This alternative syntax using `:` and `endif;` / `endswitch;` is especially useful when mixing php with HTML markup.