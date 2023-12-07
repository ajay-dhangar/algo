---
id: basics-of-arrays
sidebar_position: 1
title: Intro the basics of arrays
sidebar_label: Basics of arrays
---

import Authors from '../../../src/components/Authors'

<Authors names="@ajay-dhangar"/>

### Definition:

An array is a fundamental data structure that stores a collection of elements, each identified by an index or a key. The elements are stored in contiguous memory locations, making it efficient to access, insert, or delete elements based on their position.

### Characteristics:

- **Homogeneous Elements:**
  - Arrays store elements of the same data type. For example, an array can store integers, floating-point numbers, or characters, but not a mix of these.

- **Fixed Size:**
  - In many programming languages, arrays have a fixed size determined at the time of declaration. This means you need to know the size of the array in advance.

- **Indexing:**
  - Elements in an array are accessed using an index, which is an integer value representing their position. The index starts from 0 in many programming languages.

- **Contiguous Memory Allocation:**
  - Array elements are stored in adjacent memory locations, allowing for fast and direct access.

### Declaration and Initialization:

```js
let my_array = [1, 2, 3, 4, 5]
```

### Accessing Elements:

```js
// Accessing the first element
let firstElement = my_array[0];
```

### Size of the Array:

```js
// Example in JavaScript
const myArray = [1, 2, 3, 4, 5];

// Finding the length of the array
const arrayLength = myArray.length;

// Displaying the length
console.log("Length of the array:", arrayLength);

```

### Indexing:

In most programming languages, array indexing starts from 0. For example:

```js
// Example in JavaScript
let myArray = [1, 2, 3, 4, 5];

// Accessing the second element
let secondElement = myArray[1];

// Output
console.log("Second element:", secondElement);
```

### Example: Sum of Array Elements

Let's write a simple program to calculate the sum of elements in an array:

```js
// Function to calculate the sum of array elements
function sumOfArray(arr) {
    let result = 0;
    for (let element of arr) {
        result += element;
    }
    return result;
}

// Example usage
let myArray = [1, 2, 3, 4, 5];
let totalSum = sumOfArray(myArray);
console.log("Sum of array elements:", totalSum);
```

This example illustrates the basic concepts of declaring an array, accessing its elements, and performing a simple operation on the array.

Practice similar exercises to strengthen your understanding of the basics of arrays. As you become more comfortable, you can explore advanced topics like multidimensional arrays, dynamic arrays, and array manipulation algorithms.
