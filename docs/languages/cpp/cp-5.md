---
id: functions-in-cpp
sidebar_position: 5
title: "Functions In C++"
sidebar_label: "Functions In C++"
---

Hey there! In this guide, we'll explore functions in C++. Functions are used to perform certain actions, and they are important for reusing code: Define the code once, and use it many times. Let's dive in!

* C++ provides the `class` keyword to define a class.
* A class can have private and public members, including data (variables) and functions (methods).

## 1. Declaring a Function :

C++ provides some pre-defined functions, such as main(), which is used to execute code. But you can also create your own functions to perform certain actions.

A C++ function consist of two parts:

* `Declaration`: the return type, the name of the function, and parameters (if any)
* `Definition`: the body of the function (code to be executed)

To create (often referred to as declare) a function, specify the name of the function, 
followed by parentheses `()`:

#### Syntax:
```cpp
//declare function
void myFunction() {
  // code to be executed
};
```

* myFunction() is the name of the function.
* void means that the function does not have a return value.

#### Example:
```cpp
// C++ Program to demonstrate working of a function
#include <iostream>
using namespace std;

// Following function that takes two parameters 'x' and 'y'
// as input and returns max of two input numbers
int max(int x, int y)
{
    if (x > y)
        return x;
    else
        return y;
}

// main function that doesn't receive any parameter and
// returns integer
int main()
{
    int a = 10, b = 20;

    // Calling above function to find max of 'a' and 'b'
    int m = max(a, b);

    cout << "m is " << m;
    return 0;
}
```

#### Output:
```
m is 20
```

* A function declaration tells the compiler about the number of parameters, data types of parameters, and returns type of function.

# 2. Types of Functions


## User-Defined Functions:

* ### Customization: 
                These are tailor-made functions created by the user to solve specific problems, reducing complexity in large programs.
* ### Declaration and Definition Required: 
                User-defined functions must be declared and defined before they can be used in a program.
* ### Flexibility: 
                Users have full control over the logic, parameters, and functionality of these functions, making them versatile for unique scenarios.

## Library Functions:

* ### Pre Defined: 
                Library functions are built-in and part of the compiler package, meaning they can be used directly without defining them.
* ### Specialized Functions: 
                These functions perform common, specialized tasks like mathematical operations (e.g.,  sqrt() ) and string handling (strcat()).
* ### Ease of Use: 
                They save time and effort, as they come pre-written and require no additional code for their functionality.

## 3. Parameter Passing to Functions

 *  #### The parameters passed to the function are called `actual parameters`.
 *  #### The parameters received by the function are called `formal parameters`.


#### Example:
```cpp
#include <iostream>
using namespace std;

// Function definition with formal parameters
void add(int x, int y) {  // 'x' and 'y' are formal parameters
    int sum = x + y;
    cout << "Sum inside the function (using formal parameters): " << sum << endl;
}

int main() {
    int a = 5, b = 10;

    // Function call with actual parameters
    add(a, b);  // 'a' and 'b' are actual parameters

    cout << "Actual parameters in main function: a = " << a << ", b = " << b << endl;
    return 0;
}
```
#### There are two most popular ways to pass parameters:

### 1.Pass by Value: 
In this parameter passing method, values of actual parameters are copied to the function’s formal parameters. The actual and formal parameters are stored in different memory locations so any changes made in the functions are not reflected in the actual parameters of the caller. 

#### Example:
```cpp
#include <iostream>
using namespace std;

void increment(int num) {
    num++;  // Only affects the local copy
    cout << "Inside function: " << num << endl;
}

int main() {
    int value = 5;
    increment(value);
    cout << "After function call: " << value << endl;  // Original value remains unchanged
    return 0;
}
```

#### Output:
```
Inside function: 6
After function call: 5
```

### 2.Pass by Refrence: 
Both actual and formal parameters refer to the same locations, so any changes made inside the function are reflected in the actual parameters of the caller.

#### Example:
```cpp
#include <iostream>
using namespace std;

void increment(int &num) {
    num++;  // Affects the original variable
}

int main() {
    int value = 5;
    increment(value);
    cout << "After function call: " << value << endl;  // Original value is changed
    return 0;
}

```

#### Output:
```
After function call: 6
```

## Points to Remember About Functions in C++ :
 1. Most C++ program has a function called `main()` that is called by the operating system when a user runs the program. 

 2. Every function has a return type. If a function doesn’t return any value, then `void` is used as a return type. Moreover, if the return type of the function is void, we still can use the return statement in the body of the function definition by not specifying any constant, variable, etc. with it, by only mentioning the ` ‘return;’ ` statement which would symbolize the termination of the function. 

