---
id: introduction-to-pseudo-code
sidebar_position: 1
title: "Introduction to Pseudo-code"
sidebar_label: "Introduction"
description: "A guide to writing pseudo-code - the bridge between problem statements and actual code."
tags: [programming-fundamentals, pseudo-code, algorithms]
---

# Introduction to Pseudo-code

## What is Pseudo-code?

Pseudo-code is a plain language description of the steps in an algorithm or program. It bridges the gap between a problem statement and actual code implementation. It is not bound to any specific programming language syntax.

## Why Use Pseudo-code?

1. **Focus on logic**: Separates algorithmic thinking from syntax.
2. **Communication**: Easily share ideas with non-programmers.
3. **Planning**: Outline a solution before writing code.
4. **Debugging**: Identify logical errors before implementation.

## Basic Conventions

```
START
  READ n
  SET result = 1
  FOR i = 1 TO n
    result = result * i
  END FOR
  PRINT result
END
```

### Common Keywords

| Keyword | Purpose |
|---------|---------|
| START / END | Begin and end of algorithm |
| READ / PRINT | Input and output |
| SET / ASSIGN | Variable assignment |
| IF / THEN / ELSE | Conditional branching |
| FOR / WHILE | Loops |
| RETURN | Output a value |

## Example: Binary Search

```
FUNCTION binary_search(arr, target)
  SET left = 0
  SET right = length(arr) - 1

  WHILE left <= right
    SET mid = (left + right) / 2

    IF arr[mid] == target
      RETURN mid
    ELSE IF arr[mid] < target
      SET left = mid + 1
    ELSE
      SET right = mid - 1
    END IF
  END WHILE

  RETURN -1
END FUNCTION
```

## Best Practices

- Use consistent indentation
- Keep statements simple and unambiguous
- Write at a level of detail appropriate for the audience
- Include comments for complex steps
- Avoid implementation-specific details
