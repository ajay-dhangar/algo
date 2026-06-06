---
id: loops-in-cpp
sidebar_position: 5
title: "Loops in C++"
sidebar_label: "Loops"
tags: ["cpp", "loops", "iteration", "control flow"]
description: "Master iteration statements in C++, including for, while, do-while loops, range-based iterations, and jump control statements like break and continue."
keywords: ["C++ loops", "for loop syntax", "while loop vs do while", "range-based for", "break and continue C++"]
---

In programming, **iteration statements** (commonly known as loops) are used to execute a block of code repeatedly until a specific condition is met. 

Using loops eliminates the need to write redundant code, reduces system memory footprint, and allows applications to process dynamic sequences or collections of data effectively.

## 1. The `for` Loop

The `for` loop is an **entry-controlled** loop structure. It is ideal when you know the exact number of times you need to iterate before entering the loop block.

### Syntax

```cpp title="ForLoopSyntax.cpp"
for (initialization; condition; update) {
    // Code block to be executed repeatedly
}

```

### Example

```cpp title="ForLoopExample.cpp"
#include <iostream>

int main() {
    for (int i = 0; i < 5; ++i) {
        std::cout << "Iteration: " << i << "\n";
    }
    return 0;
}

```

### Execution Mechanics:

1. **Initialization:** Executes exactly once when entering the loop. Usually sets a counter variable (e.g., `int i = 0`).
2. **Condition:** Evaluated before every iteration. If `true`, the loop body runs. If `false`, execution exits the loop.
3. **Update:** Executes at the absolute end of each iteration cycle (e.g., `++i`), adjusting the counter variable before testing the condition again.

## 2. The Modern Range-Based `for` Loop

Introduced in modern C++ (C++11 and later), this syntax provides a cleaner, safer way to iterate through entire arrays or standard collections without tracking index counters manually.

### Syntax

```cpp title="RangeBasedForLoopSyntax.cpp"
for (element_type variable : collection) {
    // Code block to execute for each element
}

```

### Example

```cpp title="RangeBasedForLoopExample.cpp"
#include <iostream>

int main() {
    int binarySequence[] = {1, 2, 4, 8, 16};

    for (int value : binarySequence) {
        std::cout << "Value: " << value << "\n";
    }
    return 0;
}

```

## 3. The `while` Loop

The `while` loop is also an **entry-controlled** loop. It evaluates its expression *before* executing the inner code block. This is the optimal structure when the total number of iterations depends on runtime events rather than a fixed counter.

### Syntax

```cpp title="WhileLoopSyntax.cpp"
while (condition) {
    // Code block to execute while condition remains true
}

```

### Example

```cpp title="WhileLoopExample.cpp"
#include <iostream>

int main() {
    int counter = 0;

    while (counter < 5) {
        std::cout << "Count: " << counter << "\n";
        ++counter; // Essential statement to eventually invalidate the condition
    }
    return 0;
}

```

:::warning Risk of Infinite Loops
If the condition never evaluates to `false` (e.g., forgetting to increment `counter`), the loop will execute infinitely, freezing your application or draining CPU resources.
:::

## 4. The `do-while` Loop

The `do-while` loop is an **exit-controlled** loop structure. Unlike the preceding loops, it checks its condition at the *end* of an iteration cycle. Consequently, **the loop body is guaranteed to execute at least once**, regardless of whether the condition starts as true or false.

### Syntax

```cpp title="DoWhileLoopSyntax.cpp"
do {
    // Code block executes at least once
} while (condition); // Note the required trailing semicolon

```

### Example

```cpp title="DoWhileLoopExample.cpp"
#include <iostream>

int main() {
    int trackingId = 10;

    do {
        std::cout << "Processing ID: " << trackingId << "\n";
        ++trackingId;
    } while (trackingId < 5); // Condition starts as false

    return 0;
}

```

*Output:* `Processing ID: 10` (The code inside ran once, even though $10 < 5$ is immediately false).

## 5. Nested Loops

A nested loop structure is simply a loop inside another loop. For every single complete execution of the outer loop, the inner loop cycles through its entire execution run from scratch.

### Example

```cpp title="NestedLoopsExample.cpp"
#include <iostream>

int main() {
    for (int row = 1; row <= 3; ++row) {
        for (int col = 1; col <= 2; ++col) {
            std::cout << "R:" << row << " C:" << col << " | ";
        }
        std::cout << "\n"; // Newline after completing inner row pass
    }
    return 0;
}

```

## 6. Jump Statements: `break` and `continue`

C++ provides control statements to instantly alter execution behavior inside loop bodies mid-cycle.

### A. The `break` Statement

Instantly terminates the loop structure entirely and shifts program execution down to the statement immediately following the loop.

```cpp title="BreakStatementExample.cpp"
#include <iostream>

int main() {
    for (int i = 0; i < 10; ++i) {
        if (i == 4) {
            break; // Terminate loop entirely when i reaches 4
        }
        std::cout << "Value: " << i << "\n";
    }
    // Execution jumps here after break
    return 0;
}

```

### B. The `continue` Statement

Instantly skips the remainder of the statements in the *current* iteration cycle and shifts execution straight to the loop's next update step/evaluation phase.

```cpp title="ContinueStatementExample.cpp"
#include <iostream>

int main() {
    for (int i = 0; i < 5; ++i) {
        if (i == 2) {
            continue; // Skip the rest of this iteration pass when i is 2
        }
        std::cout << "Processing index: " << i << "\n";
    }
    return 0;
}

```

## 7. Architectural Decisions: Loop Architecture Selection

| Loop Architecture | Evaluation Point | Execution Constraint | Primary Target Match |
| --- | --- | --- | --- |
| **Standard `for**` | Entry-Controlled | $0$ or more times | Iterations mapped directly to predictable boundaries or mathematical numeric sequences. |
| **Range-based `for**` | Entry-Controlled | $0$ or more times | Iterating sequentially through containers, arrays, or collections from start to end cleanly. |
| **`while`** | Entry-Controlled | $0$ or more times | Loops bound to dynamic runtime changes, file inputs, or structural state conditions. |
| **`do-while`** | Exit-Controlled | $1$ or more times | User-interactive menus, text inputs validation, or connection handshakes. |