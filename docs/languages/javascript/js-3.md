---
id: operator-in-javascript
sidebar_position: 3
title: Operator in JavaScript
sidebar_label: Operator in JS
---

Operators are symbols that perform operations on operands. JavaScript supports various types of operators, including arithmetic, assignment, comparison, logical, and more. Let's explore some common operators used in JavaScript:

<AdsComponent />

## 1. **Arithmetic Operators:**

Arithmetic operators are used to perform mathematical calculations.

### Addition (`+`):

The addition operator is used to add two operands.

```javascript
let sum = 10 + 5; // sum = 15
```

### Subtraction (`-`):

The subtraction operator is used to subtract the second operand from the first.

```javascript
let difference = 20 - 8; // difference = 12
```

### Multiplication (`*`):

The multiplication operator is used to multiply two operands.

```javascript
let product = 5 * 4; // product = 20
```

### Division (`/`):

The division operator is used to divide the first operand by the second.

```javascript
let quotient = 50 / 10; // quotient = 5
```

### Modulus (`%`):

The modulus operator returns the remainder of the division operation.

```javascript
let remainder = 15 % 4; // remainder = 3
```

<Ads />

## 2. **Assignment Operators:**

Assignment operators are used to assign values to variables.

### Assignment (`=`):

The assignment operator assigns the value on the right to the variable on the left.

```javascript
let x = 10; // x = 10
```

### Addition Assignment (`+=`):

The addition assignment operator adds the value on the right to the variable's current value.

```javascript
let y = 5;
y += 3; // y = 8
```

### Subtraction Assignment (`-=`):

The subtraction assignment operator subtracts the value on the right from the variable's current value.

```javascript
let z = 10;
z -= 2; // z = 8
```

<AdsComponent />

## 3. **Comparison Operators:**

Comparison operators are used to compare two values.

### Equal (`==`):

The equal operator checks if two values are equal. But it does not consider the data type.

```javascript
let isEqual = 5 == '5'; // isEqual = true
```

### Strict Equal (`===`):

The strict equal operator checks if two values are equal and of the same data type.

```javascript
let isStrictEqual = 5 === '5'; // isStrictEqual = false
```

### Not Equal (`!=`):

The not equal operator checks if two values are not equal.

```javascript
let isNotEqual = 10 != 5; // isNotEqual = true
```

### Greater Than (`>`):

The greater than operator checks if the left operand is greater than the right operand.

```javascript
let isGreaterThan = 15 > 10; // isGreaterThan = true
```

### Less Than (`<`):

The less than operator checks if the left operand is less than the right operand.

```javascript
let isLessThan = 5 < 10; // isLessThan = true
```

<Ads />

## 4. **Logical Operators:**

Logical operators are used to combine multiple conditions.

### Logical AND (`&&`):

The logical AND operator returns `true` if both conditions are `true`.

```javascript
let condition1 = true;
let condition2 = false;

let result = condition1 && condition2; // result = false
```

### Logical OR (`||`):

The logical OR operator returns `true` if at least one condition is `true`.

```javascript
let condition1 = true;
let condition2 = false;

let result = condition1 || condition2; // result = true
```

### Logical NOT (`!`):

The logical NOT operator returns the opposite of the condition.

```javascript
let condition = true;

let result = !condition; // result = false
```

<AdsComponent />

## 5. **Ternary Operator:**

The ternary operator is a shorthand for an `if...else` statement.

```javascript
let age = 20;

let message = age >= 18 ? 'You can vote' : 'You are too young to vote';
```

## 6. **Typeof Operator:**  

The `typeof` operator is used to determine the data type of a variable.

```javascript
let num = 10;
let str = 'Hello, World!';

console.log(typeof num); // number
console.log(typeof str); // string
```

## 7. **Increment and Decrement Operators:**

Increment (`++`) and decrement (`--`) operators are used to increase or decrease the value of a variable by `1`.

```javascript
let count = 5;

count++; // count = 6
count--; // count = 5
```

<Ads />

## 8. **Bitwise Operators:**

Bitwise operators perform operations on binary representations of numbers.

### Bitwise AND (`&`):

Performs a bitwise AND operation on two numbers.

```javascript
let result = 5 & 3; // result = 1
```

### Bitwise OR (`|`):

Performs a bitwise OR operation on two numbers.

```javascript
let result = 5 | 3; // result = 7
```

### Bitwise XOR (`^`):

Performs a bitwise XOR operation on two numbers.

```javascript
let result = 5 ^ 3; // result = 6
```

### Bitwise NOT (`~`):

Performs a bitwise NOT operation on a number.

```javascript
let result = ~5; // result = -6
```

### Left Shift (`<<`):

Shifts the bits of a number to the left.

```javascript
let result = 5 << 1; // result = 10
```

### Right Shift (`>>`):

Shifts the bits of a number to the right.

```javascript
let result = 5 >> 1; // result = 2
```

### Zero-fill Right Shift (`>>>`):

Shifts the bits of a number to the right, filling the leftmost bits with zeros.

```javascript
let result = 5 >>> 1; // result = 2
```

<AdsComponent />

## 9. **Conditional Operator:**

The conditional operator (`?:`) is a ternary operator that evaluates a condition and returns one of two values based on the result.

```javascript
let age = 20;

let message = age >= 18 ? 'You can vote' : 'You are too young to vote';
```

<AdsComponent />

## 10. **Comma Operator:**

The comma operator allows multiple expressions to be evaluated in a single statement.

```javascript
let x = 1, y = 2, z = 3;
```

## 11. **Void Operator:**

The void operator evaluates an expression and returns `undefined`.

```javascript
let result = void 0; // result = undefined
```

## 12. **Delete Operator:**

The delete operator is used to delete an object's property.

```javascript
let person = {
    name: 'John',
    age: 30
};

delete person.age; // Removes the 'age' property
```

## 13. **In Operator:**

The `in` operator checks if a property exists in an object.

```javascript
let person = {
    name: 'John',
    age: 30
};

let hasAge = 'age' in person; // hasAge = true
```

## 14. **Instanceof Operator:**

The `instanceof` operator checks if an object is an instance of a specific class.

```javascript
let date = new Date();

let isDate = date instanceof Date; // isDate = true
```

<AdsComponent adSlot="5461416177" />

## More Resources:

- [MDN Web Docs: Expressions and Operators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Expressions_and_Operators)
- [JavaScript Operator Precedence Table](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Operator_Precedence)
- [W3Schools: JavaScript Operators](https://www.w3schools.com/js/js_operators.asp)
- [JavaScript.info: Operators](https://javascript.info/operators)

Operators are an essential part of JavaScript programming. Understanding how to use them effectively will help you write more efficient and concise code. Experiment with different operators to see how they work and how you can use them in your projects.