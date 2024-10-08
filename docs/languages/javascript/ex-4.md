---  
id: decision-making-in-javascript  
sidebar_position: 4
title: Decision Making in JavaScript  
sidebar_label: Decision Making  in JavaScript
---

Hey everyone! Today, we're going to explore how decision-making works in JavaScript. Whether you're just starting or need a refresher, this guide will help you understand the key decision-making structures in JavaScript. Let's dive right in!
# JavaScript Decision Making


* JavaScript provides several decision-making structures that allow you to execute code based on certain conditions.

* The most common decision-making statements are `if`, `if-else`, `else if`, and `switch` statements.
## 1. If Statements


The simplest structure for decision-making is an `if` statement, which executes a block of code if the specified condition is true.  
```javascript  
let num = 10;                            // Define a variable 'num' with a value of 10  
if (num > 0) {                           // Check if 'num' is greater than 0  
    console.log('The number is positive.'); // Print a message if the condition is true  
}  
```
## 2. If-Else Statements


The `if-else` statement allows you to execute an alternate block of code if the `if` condition evaluates to false.  
```javascript  
let num = 7;                             // Define a variable 'num' with a value of 7  
if (num % 2 === 0) {                     // Check if 'num' is even  
    console.log('The number is even.');   // Print a message if the number is even  
} else {                                 // If the condition is false, execute the 'else' block  
    console.log('The number is odd.');    // Print a message if the number is odd  
}  
```
## 3. Else If Statements


The `else if` statement allows you to check multiple conditions and execute different blocks of code based on the first condition that is true.  
```javascript  
let num = 15;                            // Define a variable 'num' with a value of 15  
if (num > 20) {                          // Check if 'num' is greater than 20  
    console.log('The number is greater than 20.'); // Print this message if the condition is true  
} else if (num === 15) {                 // Check if 'num' is equal to 15  
    console.log('The number is 15.');    // Print this message if 'num' is 15  
} else {                                 // If none of the above conditions are true, execute the 'else' block  
    console.log('The number is less than 20.'); // Print this message if 'num' is less than 20  
}  
```
## 4. Switch Statements


The `switch` statement allows you to perform different actions based on different conditions. It's an alternative to using multiple `else if` statements.  
```javascript  
let day = 3;                             // Define a variable 'day' with a value of 3  
switch (day) {                           // Switch based on the value of 'day'  
    case 1:                              // Check if 'day' is equal to 1  
        console.log('Monday');           // Print 'Monday' if 'day' is 1  
        break;                           // Break out of the switch after this case  
    case 2:                              // Check if 'day' is equal to 2  
        console.log('Tuesday');          // Print 'Tuesday' if 'day' is 2  
        break;                           // Break out of the switch after this case  
    case 3:                              // Check if 'day' is equal to 3  
        console.log('Wednesday');        // Print 'Wednesday' if 'day' is 3  
        break;                           // Break out of the switch after this case  
    default:                             // If none of the cases match, execute the default block  
        console.log('Invalid day');      // Print 'Invalid day' if 'day' doesn't match any case  
}  
```
## 5. Ternary Operator


The ternary operator is a shorthand for the `if-else` statement and is commonly used for simple conditional expressions.  
```javascript  
let age = 18;                            // Define a variable 'age' with a value of 18  
let canVote = (age >= 18) ? 'Yes' : 'No'; // Use the ternary operator to check if 'age' is 18 or more  
console.log(canVote);                    // Print 'Yes' if 'age' is 18 or more, otherwise print 'No'  
```