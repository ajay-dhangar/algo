
Decision Making in JavaScript
=============================

# JavaScript Decision Making


JavaScript provides several types of decision-making statements that allow you to execute a block of code based on certain conditions.
## 1. If Statements


The simplest structure for making decisions is an if statement, which only permits the execution of a code block if a predetermined condition is met.  
```javascript  
let num = 8;  
if (num > 0) {  
    console.log('The number is positive.');  
}  
```
## 2. If-Else Statements


If the condition in the if block evaluates to false, the if-else statement executes an alternate block of code.  
```javascript  
let num = 11;  
if (num % 2 === 0) {  
    console.log('The number is even.');  
} else {  
    console.log('The number is odd.');  
}  
```
## 3. Else If Statements


The else if keyword is used to check multiple expressions for TRUE and execute a block of code as soon as one of the conditions is true.  
```javascript  
let num = 15;  
if (num > 20) {  
    console.log('The number is greater than 20.');  
} else if (num === 15) {  
    console.log('The number is 15.');  
} else {  
    console.log('The number is less than 20.');  
}  
```
## 4. Switch Statements


The switch statement is used to perform different actions based on different conditions.  
```javascript  
let day = 2;  
switch (day) {  
    case 1:  
        console.log('Monday');  
        break;  
    case 2:  
        console.log('Tuesday');  
        break;  
    case 3:  
        console.log('Wednesday');  
        break;  
    default:  
        console.log('Invalid day');  
}  
```
## 5. Ternary Operator


The ternary operator is a shorthand for the if-else statement.  
```javascript  
let age = 18;  
let canVote = (age >= 18) ? 'Yes' : 'No';  
console.log(canVote);  
```