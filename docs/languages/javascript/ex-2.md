---
id: datatype-in-javascript
sidebar_position: 2
title: Data Type in JavaScript
sidebar_label: Data Type in JS
---

Data types are an essential concept in programming languages like JavaScript. They define the type of data that can be stored and manipulated in a program. Understanding data types is crucial for writing efficient and bug-free code. Let's explore the different data types in JavaScript:

<AdsComponent />

## 1. **Primitive Data Types:**
   These are the basic building blocks of data.

   ### String:
   - A sequence of characters.
   - Defined with single (' ') or double (" ") quotes.
   ```javascript
   let greeting = "Hello, World!";
   ```

   ### Number:
   - Represents both integers and floating-point numbers.
   - No distinction between integers and floats.
   ```javascript
   let age = 25;
   let price = 19.99;
   ```

   ### Boolean:
   - Represents either `true` or `false`.
   ```javascript
   let isStudent = true;
   ```

   ### Undefined:
   - Variable declared but not assigned.
   ```javascript
   let undefinedVar;
   ```

   ### Null:
   - Represents the intentional absence of any object value.
   ```javascript
   let nullVar = null;
   ```

   ### Symbol (ES6 and later):
   - Provides a unique value, often used as identifiers.
   ```javascript
   let id = Symbol('id');
   ```

## 2. **Composite Data Types:**
   These are used to store collections of data.

   ### Array:
   - Ordered list of values, accessed by index.
   ```javascript
   let colors = ['red', 'green', 'blue'];
   ```

   ### Object:
   - Unordered collection of key-value pairs.
   ```javascript
   let person = {
       name: 'John',
       age: 30,
       isStudent: false
   };
   ```

<Ads />

## 3. **Special Data Types:**
   ### Function:
   - A reusable block of code.
   ```javascript
   function addNumbers(a, b) {
       return a + b;
   }
   ```

## 4. **Type Coercion:**
   - JavaScript automatically converts one data type to another when needed.
   ```javascript
   let numString = "10";
   let num = 5;

   console.log(numString + num); // "105" (string concatenation)
   ```

## 5. **Checking Data Types:**
  - Use `typeof` operator to check the data type of a variable.
   ```javascript
   let name = "John";
   console.log(typeof name); // "string"
   ```

Understanding these data types is crucial for effective programming in JavaScript. They help you organize and manipulate data in your applications.