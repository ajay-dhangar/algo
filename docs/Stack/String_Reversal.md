---
id: string-reversal 
title: String Reversal
sidebar_label: String Reversal
description: "This program reverses a given string by pushing its characters onto a stack and then popping them back into the string."  
tags: [dsa, algorithms, stack]
---

## Problem Statement:
Write a program to reverse a string using stack data structure.

## Defination
The program reverses a given string using the stack data structure. The program reads a string input from the user, pushes each character onto a stack, and then pops the characters from the stack to display the string in reverse order.


## Algorithm Steps:

This C++ program uses a stack data structure to reverse a string, demonstrating fundamental stack operations like push and pop. The stack is implemented using a structure that holds an array for the items (characters of the string) and an integer top that tracks the position of the top element. Several helper functions manage the stack, including initialize to set up an empty stack,     

```isFull``` to check if the stack has reached its capacity,   

```isEmpty``` to check if the stack is empty, 

```push``` to add characters to the stack, and       

```pop``` to remove characters from it.                

The main logic of the program lies in the ```reverseString``` function.

The function first pushes each character of the input string onto the stack. Since a stack operates on a Last-In-First-Out (LIFO) principle, when the characters are popped back off the stack and placed into the string, they are inserted in reverse order. Thus, the string is reversed by the end of the process. The program reads the string from the user, uses the stack to reverse it, and then prints the reversed string.

## Time Complexity
The time complexity of the `reverseString` function is `O(n)`, where n is the length of the input string. This is because the function first iterates through each character in the string to push it onto the stack, taking O(n) time. Then, in a second loop, it pops each character from the stack and places it back into the string, also taking `O(n)` time. Since both loops run sequentially, the overall time complexity is `O(n) + O(n)` = `O(n)`.

## Space Complexity
The space complexity of the `reverseString` function is `O(n)` due to the use of a stack to store each character of the input string. The stack requires `O(n)` additional space since it stores all characters temporarily until they are popped back into the string. While the input string itself takes `O(n)` space, it is not considered extra memory allocation by the function, as it is passed by reference. Thus, the dominant additional space usage is from the stack, resulting in an overall space complexity of `O(n)`.


## Sample Input:
Enter a string (max 100 characters): My Contribution          

## Sample Output:
Reversed string: noitubirtnoC yM

## C++ Implementation:

```cpp
#include <iostream>
#include <string>
#include <stack>

void reverseString(std::string &str) {
    std::stack<char> stack;
    for (char ch : str) {
        stack.push(ch);
    }
    for (size_t i = 0; i < str.length(); i++) {
        str[i] = stack.top();
        stack.pop();
    }
}

int main() {
    std::string str;
    std::cout << "Enter a string (max 100 characters): ";
    std::getline(std::cin, str);
    reverseString(str);
    std::cout << "Reversed string: " << str << std::endl;
    return 0;
}
```
