---
id: operations-on-arrays
sidebar_position: 2
title: Operations on arrays
sidebar_label: Operations on arrays
---

import Authors from '../../../src/components/Authors'

---
<Authors names={["@ajay-dhangar", "@oebelus"]}/>
---
Let's explore some common operations performed on arrays.

## 1. Insertion

Insertion involves adding a new element to an array. This can be done at the beginning, end, or at a specific position within the array.

### Inserting at the End

```javascript
let arr = [1, 2, 3, 4];
arr.push(5);
console.log(arr); // Output: [1, 2, 3, 4, 5]
```

### Inserting at a Specific Position

```javascript
let arr = [1, 2, 4, 5];
arr.splice(2, 0, 3); // Insert 3 at index 2
console.log(arr); // Output: [1, 2, 3, 4, 5]
```

## 2. Deletion

Deletion involves removing an element from an array.

### Deleting from the End

```javascript
let arr = [1, 2, 3, 4, 5];
arr.pop();
console.log(arr); // Output: [1, 2, 3, 4]
```

### Deleting from a Specific Position

```javascript
let arr = [1, 2, 3, 4, 5];
arr.splice(2, 1); // Remove 1 element starting at index 2
console.log(arr); // Output: [1, 2, 4, 5]
```

## 3. Searching

Searching involves finding a specific element in an array.

```javascript
let arr = [1, 2, 3, 4, 5];
let index = arr.indexOf(3);
console.log(index); // Output: 2
```

## 4. Traversal

Traversal involves visiting each element of the array.

```javascript
let arr = [1, 2, 3, 4, 5];
arr.forEach(element => console.log(element));
```

## 5. Sorting

Sorting arranges the elements of an array in a specific order.

```javascript
let arr = [3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5];
arr.sort((a, b) => a - b);
console.log(arr); // Output: [1, 1, 2, 3, 3, 4, 5, 5, 5, 6, 9]
```

## 6. Merging

Merging combines two or more arrays into a single array.

```javascript
let arr1 = [1, 2, 3];
let arr2 = [4, 5, 6];
let mergedArr = [...arr1, ...arr2];
console.log(mergedArr); // Output: [1, 2, 3, 4, 5, 6]
```

## 7. Filtering

Filtering creates a new array with all elements that pass a certain condition.

```javascript
let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
let evenNumbers = arr.filter(num => num % 2 === 0);
console.log(evenNumbers); // Output: [2, 4, 6, 8, 10]
```

## 8. Mapping

Mapping creates a new array with the results of calling a provided function on every element in the array.

```javascript
let arr = [1, 2, 3, 4, 5];
let squaredNumbers = arr.map(num => num * num);
console.log(squaredNumbers); // Output: [1, 4, 9, 16, 25]
```

## 9. Reducing

Reducing executes a reducer function on each element of the array, resulting in a single output value.

```javascript
let arr = [1, 2, 3, 4, 5];
let sum = arr.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
console.log(sum); // Output: 15
```
