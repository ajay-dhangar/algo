---
id: while-loop
sidebar_position: 2
title: "While Loop"
sidebar_label: "While Loop"
description: "A guide to the while loop - repeating code based on a condition."
tags: [programming-fundamentals, control-structures, loops]
---

# While Loop

## Introduction

The `while` loop is a control structure that repeatedly executes a block of code as long as a specified condition evaluates to `true`. It is ideal when the number of iterations is not known in advance.

## Syntax

```javascript
while (condition) {
  // code to execute
}
```

```python
while condition:
    # code to execute
```

## Basic Example

```javascript
let count = 0;
while (count < 5) {
  console.log(count); // prints 0, 1, 2, 3, 4
  count++;
}
```

```python
count = 0
while count < 5:
    print(count)  # prints 0, 1, 2, 3, 4
    count += 1
```

## Infinite Loops

Careless `while` loops can run forever:

```javascript
// BAD: infinite loop
while (true) {
  console.log("This never stops");
}

// Always ensure a terminating condition
let x = 10;
while (x > 0) {
  console.log(x);
  x--;
}
```

## Use Cases

1. **Input processing**: Read until sentinel value is reached.
2. **Game loops**: Continue until a win/loss condition.
3. **Retry logic**: Keep trying until success or max attempts.
4. **Menu-driven programs**: Loop until user chooses to exit.

## Do-While vs While

| Aspect | `while` | `do-while` |
|--------|---------|------------|
| Check timing | Before body | After body |
| Minimum runs | 0 | 1 |
| Use when | Condition may be false initially | Body must run at least once |

## Nested While Loops

```javascript
let i = 1;
while (i <= 3) {
  let j = 1;
  while (j <= 3) {
    console.log(i + "," + j);
    j++;
  }
  i++;
}
```

## Best Practices

- Always ensure the condition will eventually become false.
- Prefer `for` loops when iteration count is known.
- Initialize loop variables before the loop.
- Avoid modifying loop variables inside the body in ways that confuse the logic.
