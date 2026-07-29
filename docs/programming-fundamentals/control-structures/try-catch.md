---
id: try-catch
sidebar_position: 5
title: "Try-Catch Exception Handling"
sidebar_label: "Try-Catch"
description: "A guide to try-catch exception handling - managing errors gracefully in code."
tags: [programming-fundamentals, control-structures, error-handling]
---

# Try-Catch Exception Handling

## Introduction

Exception handling is a mechanism that allows a program to respond to runtime errors gracefully, rather than crashing. The `try-catch` block is the primary construct for catching and handling exceptions.

## Basic Syntax

```javascript
try {
  // Code that might throw an error
  const data = JSON.parse(userInput);
  processData(data);
} catch (error) {
  // Handle the error
  console.error("Failed to process:", error.message);
}
```

```python
try:
    result = divide(a, b)
except ZeroDivisionError:
    result = 0
    print("Division by zero prevented")
```

## The Try-Catch-Finally Structure

```javascript
try {
  const file = openFile("data.txt");
  try {
    const content = readFile(file);
    process(content);
  } finally {
    closeFile(file); // Always executes
  }
} catch (error) {
  console.error("File operation failed:", error.message);
}
```

## Throwing Errors

```javascript
function divide(a, b) {
  if (b === 0) {
    throw new Error("Division by zero is not allowed");
  }
  return a / b;
}

try {
  const result = divide(10, 0);
} catch (error) {
  console.error(error.message); // "Division by zero is not allowed"
}
```

## Error Types

```javascript
// Built-in error types
throw new TypeError("Expected a number");
throw new RangeError("Value out of acceptable range");
throw new ReferenceError("Variable not defined");
throw new SyntaxError("Invalid syntax");
throw new CustomError("My specific error");
```

## Catching Specific Errors

```python
try:
    value = int(user_input)
    result = 10 / value
except ValueError:
    print("Please enter a valid integer")
except ZeroDivisionError:
    print("Cannot divide by zero")
except Exception as e:
    print(f"Unexpected error: {e}")
```

## Async Exception Handling

```javascript
// With async/await
async function fetchUserData(userId) {
  try {
    const response = await fetch(`/api/users/${userId}`);
    if (!response.ok) throw new Error("User not found");
    const data = await response.json();
    return data;
  } catch (error) {
    if (error instanceof TypeError) {
      console.error("Network error:", error.message);
    } else {
      console.error("Application error:", error.message);
    }
    return null;
  }
}
```

## Best Practices

1. Catch specific errors rather than generic `catch (e)`.
2. Do not suppress errors silently without logging.
3. Use `finally` for cleanup (closing files, releasing resources).
4. Re-throw errors when you cannot handle them.
5. Do not use exception handling for normal control flow.
