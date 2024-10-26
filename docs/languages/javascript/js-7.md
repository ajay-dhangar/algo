---  
id: arrays-in-javascript  
sidebar_position: 7
title: Arrays in JavaScript  
sidebar_label: Arrays in JavaScript
---

Hey everyone! Today, we're diving into Arrays in JavaScript, one of the most fundamental and powerful data structures. Let's jump in and explore the different ways arrays can be used to store, manipulate, and access data!

<AdsComponent />

## What is an Array?

- An `array` in JavaScript is a special type of `object` used to store multiple values in a single variable. 
- Arrays can hold a collection of items, such as *numbers*, *strings*, *objects*, or even *other arrays*. 
- Each element in an array is stored at a specific `index`, starting from `0`, which allows for easy access and manipulation of the data.

## Key Features of Arrays:

- Arrays can hold values of different data types.
- They have a *dynamic size*, meaning elements can be added or removed.
- Elements are accessed via their `index`, starting from `0`.

## Example of an Array:

```javascript
let fruits = ['apple', 'banana', 'cherry']; // array of fruits
console.log(fruits[0]);  // Output: 'apple'
console.log(fruits[2]);  // Output: 'cherry'
```
In this example, the array `fruits` contains three string elements, and we access the first and third items using their indices.

<Ads />

## Visual representation:

![image](https://github.com/user-attachments/assets/01a5cd05-4975-4ee4-af4b-2e16741d5a54)


## Array methods:

1. `Push()`: add item to end
2. `Pop()`: delete item from start and return
3. `toString()`: converts array to `String`
4. `Concat()` : joins multiple arrays & returns result
5. `Unshift()` : add item to start
6. `shift()` : delete item from start & return
7. `Slice()` : returns a piece of the array slice( startldx, endldx )
8. `Splice()` : change original array (add, remove, replace) splice( startldx, delCount, newE11... )

## Array Iteration Methods:

### 1. `forEach()`:
- The `forEach()` method calls a function (a callback function) once for each array element.
- Example:
```javascript
const numbers = [45, 4, 9, 16, 25];
numbers.forEach((element)=>{
  console.log(element);
});
```
- Note: the function takes 3 arguments:
  - The item value
  - The item index
  - The array itself

### 2. `map()`:

- The `map()` method creates a new array by performing a function on each array element.
- The `map()` method does not execute the function for array elements without values.
- The `map()` method does not change the original array.

- **Example:**
```javascript
const numbers = [45, 4, 9, 16, 25];
numbers.map((element)=>{
  console.log(element);
});
```

### 3. `filter()`:

- The `filter()` method creates a new array with array elements that pass a test.
- Example:
```javascript
const numbers = [45, 4, 9, 16, 25];
const over18 = numbers.filter(myFunction);

function myFunction(value, index, array) {
  return value > 18;
}
```

### 4. `reduce()`:

- The `reduce()` method reduces the array to a single value.
- The `reduce()` method executes a provided function for each value of the array (from left-to-right).

- **Example:**
```javascript
const numbers = [45, 4, 9, 16, 25];
const sum = numbers.reduce(myFunction);

function myFunction(total, value, index, array) {
  return total + value;
}
```

### 5. `find()`:

- The `find()` method returns the value of the first array element that passes a test function.
- The `find()` method returns `undefined` if no elements pass the test.
- Example:
```javascript
const numbers = [45, 4, 9, 16, 25];
const first = numbers.find(myFunction);

function myFunction(value, index, array) {
  return value > 18;
}
```

<AdsComponent />

### 6. `findIndex()`:

- The `findIndex()` method returns the index of the first array element that passes a test function.
- The `findIndex()` method returns `-1` if no elements pass the test.
- Example:
```javascript
const numbers = [45, 4, 9, 16, 25];
const first = numbers.findIndex(myFunction);

function myFunction(value, index, array) {
  return value > 18;
}
```

## Conclusion:

Arrays are a versatile and powerful data structure in JavaScript, allowing you to store, manipulate, and access multiple values efficiently. By understanding the key features and methods of arrays, you can leverage them to build complex applications and solve a wide range of problems.