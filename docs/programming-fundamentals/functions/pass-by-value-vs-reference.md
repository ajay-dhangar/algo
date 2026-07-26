---
id: pass-by-value-vs-reference
title: "Pass by Value vs. Pass by Reference"
sidebar_label: "Pass by Value vs. Reference"
sidebar_position: 9
description: "Understand the core differences between Pass by Value and Pass by Reference, with detailed behavior in Python, JavaScript, and C++."
tags: [functions, parameters, pass-by-value, pass-by-reference, pointers, memory]
---

## 1. Introduction

When a function is called, the arguments passed to it must be mapped to the function's parameters. The method by which these arguments are shared is known as the **evaluation strategy**. The two most fundamental evaluation strategies are **Pass by Value** and **Pass by Reference**.

- **Pass by Value**: The function receives a copy of the argument's data. Modifying the parameter inside the function has no effect on the original argument.
- **Pass by Reference**: The function receives a reference (or memory address) to the original argument. Modifying the parameter inside the function directly changes the original argument.

---

## 2. Syntax, Examples, and Explanations

### 2.1 In C++
C++ offers explicit syntax for both strategies, making it the ideal language to see the difference clearly.

```cpp
#include <iostream>

// Pass by Value: A copy of the argument is passed
void passByValue(int x) {
    x = 99; // Modifies only the local copy
}

// Pass by Reference: An alias of the argument is passed using '&'
void passByReference(int &x) {
    x = 99; // Modifies the original variable
}

int main() {
    int num1 = 10;
    passByValue(num1);
    std::cout << "After passByValue: " << num1 << std::endl; // Output: 10

    int num2 = 10;
    passByReference(num2);
    std::cout << "After passByReference: " << num2 << std::endl; // Output: 99

    return 0;
}
```

---

### 2.2 In JavaScript
In JavaScript, the evaluation strategy depends on the **data type**:
1. **Primitive types** (Number, String, Boolean, Null, Undefined, Symbol, BigInt) are passed **by value**.
2. **Object types** (Objects, Arrays, Functions) are passed **by reference** (specifically, "call-by-sharing" or "pass by value of the reference").

```javascript
// Primitives are passed by value
function modifyPrimitive(val) {
  val = 100;
}
let number = 5;
modifyPrimitive(number);
console.log(number); // Output: 5 (unchanged)

// Objects/Arrays are passed by reference
function modifyObject(obj) {
  obj.name = "Alice"; // Modifying the property affects the original object
}
let user = { name: "Bob" };
modifyObject(user);
console.log(user.name); // Output: Alice (changed!)

// Reassigning the object inside the function breaks the reference
function reassignObject(obj) {
  obj = { name: "Charlie" }; // Does NOT change the original object
}
reassignObject(user);
console.log(user.name); // Output: Alice (still Alice!)
```

---

### 2.3 In Python
Python utilizes an evaluation strategy known as **Pass by Object Reference** (or "Pass by Assignment").
- If the object passed is **mutable** (e.g., lists, dictionaries, sets), changes made to the object *in-place* will reflect in the caller's scope.
- If the object is **immutable** (e.g., integers, strings, tuples), you cannot modify the object in-place; reassigning the parameter variable simply binds it to a new object, leaving the original unchanged.

```python
# Mutable object example (list)
def append_item(lst):
    lst.append(4) # Modifies the original list in-place

my_list = [1, 2, 3]
append_item(my_list)
print(my_list) # Output: [1, 2, 3, 4] (changed!)

# Immutable object example (integer)
def increment(num):
    num += 1 # Rebinds local variable 'num' to a new integer object
    return num

my_num = 10
increment(my_num)
print(my_num) # Output: 10 (unchanged!)
```

---

## 3. Side-by-Side Comparison

| Feature | Pass by Value | Pass by Reference |
|---------|---------------|-------------------|
| **Data Shared** | A copy of the actual value | The memory address/reference of the variable |
| **Memory Overhead** | Requires additional memory to store the copy (can be slow for large structures) | Requires minimal memory (just a pointer/reference) |
| **Safety** | Safer: original variable cannot be mutated accidentally | Less safe: caller's variable can be modified by side effects |
| **Language Defaults** | C, Java (primitives), Python (immutable), JavaScript (primitives) | C++ (with `&`), C (via pointers), C# (with `ref`/`out`) |

---

## 4. Visualizing in Memory

### Pass by Value
```
Caller Stack           Callee Stack
+----------+           +----------+
| num = 10 |  ----->   |  x = 10  |   (Separate copy in memory)
+----------+           +----------+
```

### Pass by Reference
```
Caller Stack           Memory Address
+----------+           +----------------------+
| num = 10 |  -----.   | Address: 0x7ffd1234  |
+----------+        \  | Value: 10            |
                     ->+----------------------+
+----------+        /
|  x (&)   |  -----'   (Both point to the same memory cell)
+----------+
```

---

## 5. Video Explanation

<LiteYouTubeEmbed
  id="L4H4OpeHwhQ"
  params="autoplay=1&autohide=1&showinfo=0&rel=0"
  title="Pass by Value vs Pass by Reference"
  poster="maxresdefault"
  lazyLoad={true}
  webp
/>
