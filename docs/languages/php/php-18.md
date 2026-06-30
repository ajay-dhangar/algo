---
id: "exception-handling-in-php"
sidebar_position: 18
title: "Exception Handling in php"
sidebar_label: "Exception Handling"
description: "Learn how to handle errors and exceptions in php using try, catch, finally, throw, and custom exception classes."
tags: [php, exceptions, error-handling, try-catch]
---

Exception handling lets you deal with runtime errors gracefully without crashing your application.

## Video Explanation

<LiteYouTubeEmbed
  id="RRVYpIET_RU"
  params="autoplay=1&autohide=1&showinfo=0&rel=0"
  title="Complete C++ STL in 1 Video | Time Complexity and Notes"
  lazyLoad={true}
  webp
/>

## Basic Try-Catch

```php
<?php
try {
    $result = 10 / 0; // This won't throw in php, but the concept applies
    throw new Exception("Something went wrong!");
} catch (Exception $e) {
    echo "Caught: " . $e->getMessage();
}
// Caught: Something went wrong!
?>
```

* * *

## Exception Methods

The `Exception` class provides useful methods:

```php
<?php
try {
    throw new Exception("File not found", 404);
} catch (Exception $e) {
    echo $e->getMessage();  // File not found
    echo $e->getCode();     // 404
    echo $e->getFile();     // path to this php file
    echo $e->getLine();     // line number of throw
    echo $e->getTraceAsString(); // stack trace
}
?>
```

* * *

## Multiple Catch Blocks

Handle different exception types differently:

```php
<?php
function divide($a, $b) {
    if (!is_numeric($a) || !is_numeric($b)) {
        throw new InvalidArgumentException("Arguments must be numbers.");
    }
    if ($b == 0) {
        throw new DivisionByZeroError("Cannot divide by zero.");
    }
    return $a / $b;
}

try {
    echo divide(10, 0);
} catch (InvalidArgumentException $e) {
    echo "Invalid input: " . $e->getMessage();
} catch (DivisionByZeroError $e) {
    echo "Math error: " . $e->getMessage();
} catch (Exception $e) {
    echo "General error: " . $e->getMessage();
}
?>
```

* * *

## The `finally` Block

Code in `finally` always runs, whether an exception occurred or not:

```php
<?php
function readCustomFile($path) {
    $file = fopen($path, "r");

    try {
        if (!$file) throw new Exception("Cannot open file.");
        // process file...
    } catch (Exception $e) {
        echo "Error: " . $e->getMessage();
    } finally {
        if ($file) fclose($file); // always close the file
        echo "File operation complete.";
    }
}
?>
```

* * *

## Custom Exception Classes

Create meaningful exception types for your application:

```php
<?php
class ValidationException extends Exception {
    private array $errors;

    public function __construct(array $errors, $message = "Validation failed") {
        parent::__construct($message);
        $this->errors = $errors;
    }

    public function getErrors(): array {
        return $this->errors;
    }
}

class NotFoundException extends Exception {
    public function __construct(string $resource, $id) {
        parent::__construct("$resource with ID $id not found.", 404);
    }
}
?>
```

Using custom exceptions:

```php
<?php
try {
    throw new ValidationException(["name" => "Name is required"]);
} catch (ValidationException $e) {
    foreach ($e->getErrors() as $field => $msg) {
        echo "$field: $msg<br>";
    }
}

try {
    throw new NotFoundException("User", 99);
} catch (NotFoundException $e) {
    echo $e->getMessage();  // User with ID 99 not found.
    echo $e->getCode();     // 404
}
?>
```

* * *

## Catching Multiple Exception Types (php 8)

```php
<?php
try {
    // code that might throw
} catch (InvalidArgumentException | NotFoundException $e) {
    echo "Caught: " . $e->getMessage();
}
?>
```

* * *

## Re-throwing Exceptions

```php
<?php
function process() {
    try {
        throw new Exception("Low-level error");
    } catch (Exception $e) {
        // log it, then re-throw with more context
        throw new RuntimeException("Processing failed: " . $e->getMessage(), 0, $e);
    }
}

try {
    process();
} catch (RuntimeException $e) {
    echo $e->getMessage();
    echo "Caused by: " . $e->getPrevious()->getMessage();
}
?>
```

* * *

## Built-in php Exception Classes

| Class | Use Case |
|-------|----------|
| `Exception` | General exceptions |
| `RuntimeException` | Runtime errors |
| `InvalidArgumentException` | Wrong argument type |
| `LogicException` | Programming logic errors |
| `OutOfRangeException` | Invalid index or range |
| `DivisionByZeroError` | Division by zero |
| `TypeError` | Wrong type passed |

**Best Practice:** Always catch the most specific exception types first, then more general ones. Never leave an empty `catch` block — always log or handle the error meaningfully.