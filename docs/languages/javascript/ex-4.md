
Loops in JavaScript
===================

# JavaScript Loops


JavaScript provides several types of loops that allow you to execute a block of code repeatedly. These loops can be categorized as `for` loops, `while` loops, and `do...while` loops.
## 1. For Loops

### a. Basic For Loop


Used to iterate over a sequence (like an array).  
```javascript  
let fruits = ['apple', 'banana', 'cherry'];  
for (let i = 0; i < fruits.length; i++) {  
    console.log(fruits[i]);  
}  
```
### b. For...in Loop


Used to iterate over the properties of an object.  
```javascript  
let person = {name: 'John', age: 30, city: 'New York'};  
for (let key in person) {  
    console.log(key + ': ' + person[key]);  
}  
```
### c. For...of Loop


Used to iterate over the values of an iterable object (like an array).  
```javascript  
let colors = ['red', 'green', 'blue'];  
for (let color of colors) {  
    console.log(color);  
}  
```
## 2. While Loops

### a. Basic While Loop


Repeats a block of code as long as a condition is true.  
```javascript  
let count = 0;  
while (count < 5) {  
    console.log(count);  
    count++;  
}  
```
### b. Do...While Loop


Executes a block of code once, and then repeats the loop as long as a condition is true.  
```javascript  
let count = 0;  
do {  
    console.log(count);  
    count++;  
} while (count < 5);  
```
## 3. Loop Control Statements

### a. Break Statement


Terminates the loop prematurely.  
```javascript  
for (let i = 0; i < 10; i++) {  
    if (i === 5) {  
        break;  
    }  
    console.log(i);  
}  
```
### b. Continue Statement


Skips the current iteration and continues with the next iteration.  
```javascript  
for (let i = 0; i < 10; i++) {  
    if (i % 2 === 0) {  
        continue;  
    }  
    console.log(i);  
}  
```