---  
id: loops-in-javascript  
sidebar_position: 5  
title: Loops in JavaScript  
sidebar_label: Loops in JavaScript
---

Hey everyone! Today, we will explore loops in JavaScript, a key concept for automating repetitive tasks. Whether you're just starting or need a quick refresher, this guide will help you understand how loops work in JavaScript. Let's get started!
# JavaScript Loops


* Loops allow you to execute a block of code repeatedly while a specified condition is true.

* JavaScript provides several types of loops, such as `for`, `while`, and `do-while` loops.
## 1. For Loop


The `for` loop is the most commonly used loop in JavaScript. It repeats a block of code for a set number of times.  
```javascript  
for (let i = 0; i < 5; i++) {              // Loop from 0 to 4  
    console.log(i);                       // Print the current value of 'i'  
}  
```
## 2. For-In Loop


The `for-in` loop is used to iterate over the properties of an object.  
```javascript  
let person = {name: 'John', age: 30};      // Object with 'name' and 'age' properties  
for (let key in person) {                  // Iterate over each property in the 'person' object  
    console.log(key + ': ' + person[key]); // Print the property and its value  
}  
```
## 3. For-Of Loop


The `for-of` loop is used to iterate over iterable objects like arrays or strings.  
```javascript  
let numbers = [1, 2, 3, 4, 5];            // Array of numbers  
for (let num of numbers) {                // Iterate over each number in the 'numbers' array  
    console.log(num);                     // Print the current number  
}  
```
## 4. While Loop


The `while` loop executes a block of code as long as the specified condition is true.  
```javascript  
let count = 0;                            // Initialize 'count' to 0  
while (count < 5) {                       // Continue looping while 'count' is less than 5  
    console.log(count);                   // Print the current value of 'count'  
    count++;                              // Increment 'count' by 1  
}  
```
## 5. Do-While Loop


The `do-while` loop is similar to the `while` loop but ensures the code is executed at least once before checking the condition.  
```javascript  
let count = 0;                            // Initialize 'count' to 0  
do {                                       // Execute the loop body at least once  
    console.log(count);                   // Print the current value of 'count'  
    count++;                              // Increment 'count' by 1  
} while (count < 5);                      // Continue looping while 'count' is less than 5  
```
## 6. Break Statement


The `break` statement is used to exit a loop prematurely.  
```javascript  
for (let i = 0; i < 10; i++) {            // Loop from 0 to 9  
    if (i === 5) {                        // Check if 'i' equals 5  
        break;                            // Exit the loop when 'i' is 5  
    }  
    console.log(i);                       // Print numbers from 0 to 4  
}  
```
## 7. Continue Statement


The `continue` statement skips the current iteration of the loop and moves to the next iteration.  
```javascript  
for (let i = 0; i < 5; i++) {             // Loop from 0 to 4  
    if (i === 3) {                        // Check if 'i' equals 3  
        continue;                         // Skip the iteration when 'i' is 3  
    }  
    console.log(i);                       // Print numbers except 3  
}  
```
## 8. Nested Loops


In JavaScript, you can use loops inside other loops. These are called nested loops and are useful for iterating over multi-dimensional arrays.  
```javascript  
for (let i = 1; i <= 3; i++) {            // Outer loop from 1 to 3  
    for (let j = 1; j <= 2; j++) {        // Inner loop from 1 to 2  
        console.log(`i: ${i}, j: ${j}`);  // Print the values of 'i' and 'j'  
    }  
}  
```