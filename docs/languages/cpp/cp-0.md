---
id: introduction-to-cpp
sidebar_position: 1
title: "Introduction to C++"
sidebar_label: "Introduction to C++"
tags: ["cpp", "introduction", "basics"]
description: "Learn the fundamentals of C++ programming, including its history, key features, and how to set up your development environment."
keywords: ["C++", "programming", "introduction", "basics", "setup"]
---

Welcome to the world of **C++**!

Whether you want to build high-performance software, dive into AAA game development, or master low-level system programming, C++ is the ultimate language to have in your toolkit. This guide will walk you through the core fundamentals and get your first program running in no time.

## What is C++?

## Video Explanation

<LiteYouTubeEmbed
  id="z9bZufPHFLU"
  params="autoplay=1&autohide=1&showinfo=0&rel=0"
  title="1. Introduction to C++ | Data Structures and Algorithms | College Placement Course | Lecture 1"
  lazyLoad={true}
  webp
/>

## 2. Key Features of C++
**C++** is a powerful, high-performance, compiled programming language created by **Bjarne Stroustrup** at Bell Labs in 1979. 

Think of it as an upgraded version of the classic **C language**. While it retains the speed and hardware control of C, it introduces **Object-Oriented Programming (OOP)**, allowing developers to write structured, modular, and reusable code for complex applications.

:::tip Fun Fact
C++ was originally named **"C with Classes"** before being renamed to C++ in 1983. The `++` operator in programming means "increment by 1", symbolizing that C++ is the next step up from C!
:::

## Key Features of C++

Why do top tech companies like Google, Microsoft, and Apple still rely heavily on C++? Here are its core strengths:

*   **Object-Oriented Programming (OOP):** It supports principles like *Encapsulation, Inheritance, and Polymorphism*, making it easier to manage large-scale projects.
*   **Blazing Fast Performance:** Since it compiles directly to native machine code, it executes incredibly fast with minimal overhead.
*   **Low-Level Control:** It gives you direct access to hardware resources and system memory (via pointers), which is essential for systems programming.
*   **Rich Standard Template Library (STL):** It comes packed with built-in data structures (like vectors, lists, and maps) and algorithms that save you from rewriting code from scratch.
*   **Highly Portable:** Write once and compile anywhere! C++ code can run across Windows, macOS, Linux, and embedded systems.

## Setting Up Your Development Environment

To start writing and running C++ code, you need two essential tools:
1. **A Code Editor/IDE:** Where you write your code.
2. **A Compiler:** Converts your human-readable C++ code into a program the computer understands (`.exe` or binary file).

### Recommended Setups

| Approach | Tool | Description |
| :--- | :--- | :--- |
| **The Modern Choice** | **VS Code + GCC/Clang** | Highly customizable, lightweight, and the industry standard for most modern developers. |
| **Full IDE (Windows)** | **Visual Studio** | A massive, powerful environment built by Microsoft, perfect for heavy C++ development. |
| **Lightweight IDE** | **Code::Blocks** | Open-source and very friendly for beginners just starting out in college or bootcamps. |

## Writing Your First C++ Program

Let’s look at the classic "Hello, World!" program. This is the traditional way to test if your setup is working perfectly.

```cpp title="HelloWorld.cpp"
#include <iostream> // 1. Header file library

int main() {        // 2. The entry point of the program
    // 3. Printing text to the screen
    std::cout << "Hello, World!" << std::endl; 
    
    return 0;       // 4. Exiting the program successfully
}

```

### Breaking Down the Code:

1. **`#include <iostream>`:** This is a **preprocessor directive**. It tells the compiler to include the standard input-output stream library, which gives us access to features like `std::cout` so we can print text.
2. **`int main() { ... }`:** Every single C++ program must have a `main()` function. This is the **starting point** where execution begins. The code inside the curly braces `{}` is what actually runs.
3. **`std::cout << "Hello, World!" << std::endl;`:** This line does the work of printing "Hello, World!" to the console. Let's break it down:
    * `std::cout` (pronounced *see-out*) stands for **Character Output**. It sends data to the console display.
    * `<<` is the **insertion operator**, pushing the text stream forward.
    * `std::endl` inserts a new line (like hitting the `Enter` key) and clears the output buffer.
4. **`return 0;`:** This ends the `main()` function and returns the value `0` to the operating system, signaling that everything ran smoothly without any errors.

## Basic Syntax Rules

Before you start writing complex logic, keep these three golden syntax rules in mind:

### A. Comments (Your Code Notebook)

Comments are completely ignored by the compiler. Use them to document what your code does.

```cpp title="CommentsExample.cpp"
// This is a single-line comment

/* This is a 
   multi-line comment 
   spanning multiple rows */

```

### B. The Semicolon `;`

In C++, a semicolon is like a period at the end of a sentence. Missing a semicolon is the #1 cause of compilation errors for beginners!

```cpp title="SemicolonExample.cpp"
int x = 5; // Every standalone statement must end with a semicolon

```

### C. Code Blocks `{}`

Curly braces group statements together. They define where functions, loops, and conditions start and end.

## Conclusion

C++ is a beautifully structured, highly efficient language that teaches you how computers actually process instructions under the hood. Mastering it won't just make you a C++ developer—it will make you a significantly better overall programmer.