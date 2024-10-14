---
id: functions-in-javascript
sidebar_position: 8
title: Functions in JavaScript
sidebar_label: Functions in JS
---

A function in JavaScript is similar to a procedure—a set of statements that performs a task or calculates a value, but for a procedure to qualify as a function, it should take some input and return an output where there is some obvious relationship between the input and the output.

<AdsComponent />

## **Functions Declaration**

Function Declarations also known as function statement or function definition consists of function keyword, function name, parameters separated by commas and function body enclosed by curly braces ```{ /*function body*/ }```


```javascript
function printName(name) {
    return name;
}
```

In the example above, the function ```printName``` takes one parameter called ```name```. The function body consist of one statement that returns the name.

<Ads />

## **Function Expressions**

Function expressions are a way to define a function as part of an expression. Unlike function declarations, which define a function with a name, function expressions can be anonymous (without a name) or named. 

## 1. **Anonymous Function Expression**
An anonymous function expression is a function that doesn't have a name. It can be assigned to a variable, passed as an argument to another function, or returned from another function.

```javascript
const greet = function() {
    console.log("Hello!");
};

greet();
```

## 2. **Named Function Expression**
A named function expression includes a name. This can be useful for recursion or for better debugging.

```javascript
const greet = function sayHello() {
    console.log("Hello!");
};

greet();
```

## 3. **IIFE (Immediately Invoked Function Expression)**
An IIFE is a function that runs as soon as it is defined. It’s often used to create a local scope.

```javascript
(function() {
    console.log("This runs immediately!");
})();
```

<AdsComponent />

## **Function Call**

Calling a function means executing the code defined within it. There are various ways to call a function.

```javascript
const greet = function(name) {
    console.log("Hello ", name);
};

greet("World!"); //Output: Hello World!
```

The above example is calling a function with argument


```javascript
const obj = {
    greet: function() {
        console.log("Hello from an object!");
    }
};

obj.greet(); // Output: Hello from an object!
```

The above example is calling a method of an object

```javascript
const multiply = (x, y) => x * y;

console.log(multiply(2, 3)); // Output: 6
```

The above example is of calling an arrow function


## More Resources:

- [MDN Web Docs: Functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions)
- [W3Schools: JavaScript Functions](https://www.w3schools.com/js/js_functions.asp)
