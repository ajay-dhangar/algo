---
id: function-scope
title: Function Scope
sidebar_label: Function Scope
sidebar_position: 5
description: Learn about variable scope within functions and how it affects accessibility.
tags: [functions, fundamental, programming fundamentals, scope, variables]
---

## Overview
**Function scope** refers to the accessibility or visibility of variables within a function. Variables declared inside a function are **local** to that function, meaning they cannot be accessed outside of it. Similarly, variables outside the function are generally **global** and can be accessed by the function depending on the language's scope rules.

## Syntax
### C++
```c++
// Local scope example
void function_name() {
    int local_variable = 10;  // This variable is only accessible inside the function
}

```

## Example
### C++ Example
```c++
// Global and local scope
int global_var = 20;

void display() {
    int local_var = 10;
    std::cout << "Local Variable: " << local_var << std::endl;  // Accessible
    std::cout << "Global Variable: " << global_var << std::endl;  // Accessible
}

std::cout << local_var;  // Error: local_var is not accessible here
```



## Syntax
### Python
```py
# Local scope example
def function_name():
    local_variable = 10  # This variable is only accessible inside the function


```

## Example
### Python Example
```py
# Global and local scope
global_var = 20

def display():
    local_var = 10
    print(f"Local Variable: {local_var}")  # Accessible
    print(f"Global Variable: {global_var}")  # Accessible

print(local_var)  # Error: local_var is not accessible here

```




## Key Points:
1. Local scope: Variables declared inside a function are only accessible within that function.
2. Global scope: Variables declared outside of all functions are accessible by all functions unless shadowed by a local variable of the same name.
3. Lifetime: Local variables are created when the function is called and destroyed when it exits, whereas global variables exist throughout the program's execution.
4. Nested scopes: Some languages (like Python) support nested function scopes, where inner functions can access variables from outer functions.
5. Scope resolution: In C++, the :: operator allows access to global variables when a local variable shadows a global one.

