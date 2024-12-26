---
id: if-else
sidebar_position: 1
title: If-Else Statement
sidebar_label: If-Else
description: "Learn how to use the if-else statement in programming to make decisions based on conditions. Understand the syntax, examples, and best practices for using if-else statements effectively."
tags: [if-else, control-structures, programming, syntax]
keywords:
  [
    if-else,
    if-else statement,
    conditional statements,
    control structures,
    programming,
    syntax,
  ]
---

The `if-else` statement is a fundamental control structure in programming that allows you to execute different blocks of code based on specified conditions. It helps you make decisions in your code by evaluating whether a condition is true or false.

<AdsComponent />

## What is an If-Else Statement?

An `if-else` statement consists of a condition followed by two blocks of code: one block that gets executed if the condition is true (`if` block), and another block that gets executed if the condition is false (`else` block). The `else` block is optional, and you can have multiple `if-else` statements nested within each other to handle more complex conditions.

Here is the general syntax of an `if-else` statement:

```plaintext title="If-Else Statement Syntax"
if (condition) {
    // Code block to execute if the condition is true
} else {
    // Code block to execute if the condition is false
}
```

The `condition` is an expression that evaluates to either `true` or `false`. If the condition is `true`, the code block inside the `if` block is executed. Otherwise, the code block inside the `else` block is executed.

<Ads />

## Using If-Else Statements

Let's look at an example to understand how `if-else` statements work in practice. Suppose we want to write a simple program that checks if a given number is positive or negative:

<Tabs>
  <TabItem value="javascript" label="JavaScript" default>

    <h3>JavaScript If-Else Example</h3>

    In JavaScript, you can use an `if-else` statement to check if a number is positive, negative, or zero:

    ```javascript title="Check if a number is positive, negative, or zero"
    let number = 10;

    if (number > 0) {
      console.log("The number is positive");
    } else if (number < 0) {
      console.log("The number is negative");
    } else {
      console.log("The number is zero");
    }
    ```

    In this example:

    - If the `number` is greater than `0`, the message "The number is positive" is printed.
    - If the `number` is less than `0`, the message "The number is negative" is printed.
    - If the `number` is `0`, the message "The number is zero" is printed.

  </TabItem>
  <TabItem value="java" label="Java">

<h3>Java If-Else Example</h3>

In Java, you can use an `if-else` statement to achieve the same functionality:

```java title="Check if a number is positive, negative, or zero"
public class Main {
    public static void main(String[] args) {
        int number = 10;

        if (number > 0) {
            System.out.println("The number is positive");
        } else if (number < 0) {
            System.out.println("The number is negative");
        } else {
            System.out.println("The number is zero");
        }
    }
}
```

The output of this program will be the same as the JavaScript example.

  </TabItem>

    <TabItem value="python" label="Python">

<h3>Python If-Else Example</h3>

In Python, you can use an `if-else` statement to check if a number is positive, negative, or zero:

```python title="Check if a number is positive, negative, or zero"
number = 10

if number > 0:
    print("The number is positive")
elif number < 0:
    print("The number is negative")
else:
    print("The number is zero")
```

The Python code snippet achieves the same functionality as the JavaScript and Java examples.

  </TabItem>

</Tabs>

<AdsComponent />

## Nested If-Else Statements

You can nest `if-else` statements within each other to handle more complex conditions. This allows you to check multiple conditions sequentially and execute different blocks of code based on the outcomes.

Here's an example of a nested `if-else` statement in JavaScript, Java, and Python that checks the grade of a student based on their score:

<Tabs>
  <TabItem value="javascript" label="JavaScript" default>

<h3>JavaScript Nested If-Else Example</h3>

```javascript title="Check the grade of a student"
let score = 85;
let grade = "";

if (score >= 90) {
    grade = "A";
} else if (score >= 80) {
    grade = "B";
} else if (score >= 70) {
    grade = "C";
} else if (score >= 60) {
    grade = "D";
} else {
    grade = "F";
}

console.log(`The student's grade is ${grade}`);
```

In this example, the student's grade is determined based on their score. The `if-else` statement checks the score against different thresholds to assign the appropriate grade.

  </TabItem>
  <TabItem value="java" label="Java">

<h3>Java Nested If-Else Example</h3>

```java title="Check the grade of a student"
public class Main {
    public static void main(String[] args) {
        int score = 85;
        String grade = "";

        if (score >= 90) {
            grade = "A";
        } else if (score >= 80) {
            grade = "B";
        } else if (score >= 70) {
            grade = "C";
        } else if (score >= 60) {
            grade = "D";
        } else {
            grade = "F";
        }

        System.out.println("The student's grade is " + grade);
    }
}
```

The Java code snippet assigns a grade to the student based on their score.

  </TabItem>
  <TabItem value="python" label="Python">

<h3>Python Nested If-Else Example</h3>

```python title="Check the grade of a student"
score = 85
grade = ""

if score >= 90:
    grade = "A"
elif score >= 80:
    grade = "B"
elif score >= 70:
    grade = "C"
elif score >= 60:
    grade = "D"
else:
    grade = "F"

print(f"The student's grade is {grade}")
```

The Python code snippet assigns a grade to the student based on their score.

  </TabItem>
</Tabs>

<Ads />

## Conclusion

The `if-else` statement is a powerful tool in programming that allows you to make decisions based on conditions. By using `if-else` statements, you can control the flow of your program and execute different blocks of code based on the evaluation of conditions. Understanding how to use `if-else` statements effectively is essential for writing robust and flexible programs.
