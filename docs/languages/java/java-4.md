---
id: loops-in-java
sidebar_position: 4
title: "Loops In Java"
sidebar_label: "Loops In Java"
---

Hey there! In this guide, we'll explore loops in Java. Loops are used to execute a block of code repeatedly based on specific conditions. Let's dive in!

* Java provides several types of loops that allow you to execute a block of code multiple times based on specific conditions.
* The main types of loops in Java are `for`, `while`, and `do-while`.

## 1. For Loop
The for loop is used when you know how many times you want to execute a statement or a block of statements.
#### Syntax:
```java
for (initialization; condition; increment/decrement) {
    // code to be executed
}

```
#### Example: 
```java
public class Main {
    public static void main(String[] args) {
        for (int i = 0; i < 5; i++) {
            System.out.println("Iteration " + i);
        }
    }
}

```

#### Output:
```
Iteration 0
Iteration 1
Iteration 2
Iteration 3
Iteration 4

```

## 2. While Loop
The `while` loop is used when you want to execute a block of code as long as a specified condition is true.
#### Syntax:
```java
while(condition) {
    // code to be executed
}

```
#### Example: 
```java
public class Main {
    public static void main(String[] args) {
        int i = 0;
        while (i < 5) {
            System.out.println("Iteration " + i);
            i++;
        }
    }
}

}
```

#### Output:
```
Iteration 0
Iteration 1
Iteration 2
Iteration 3
Iteration 4

```

## 3. Do-While Loop
The `do-while` loop is similar to the `while` loop, except that it guarantees that the code block will be executed at least once before the condition is tested.

#### Syntax:
```java
do {
    // code to be executed
} while(condition);
```
#### Example: 
```java
public class Main {
    public static void main(String[] args) {
        int i = 0;
        do {
            System.out.println("Iteration " + i);
            i++;
        } while (i < 5);
    }
}

```

#### Output:
```
Iteration 0
Iteration 1
Iteration 2
Iteration 3
Iteration 4

```


## 4. Nested Loops
You can also use loops inside other loops, which are called nested loops.

#### Example: 
```java
public class Main {
    public static void main(String[] args) {
        for (int i = 1; i <= 3; i++) {
            for (int j = 1; j <= 2; j++) {
                System.out.println("Outer Loop: " + i + ", Inner Loop: " + j);
            }
        }
    }
}

```

```
Outer Loop: 1, Inner Loop: 1
Outer Loop: 1, Inner Loop: 2
Outer Loop: 2, Inner Loop: 1
Outer Loop: 2, Inner Loop: 2
Outer Loop: 3, Inner Loop: 1
Outer Loop: 3, Inner Loop: 2

```

## 5. Break and Continue Statements

### a. Break Statement
The `break` statement is used to exit a loop prematurely.

#### Example: 
```java
public class Main {
    public static void main(String[] args) {
        for (int i = 0; i < 10; i++) {
            if (i == 5) {
                break; // Exit the loop when i equals 5
            }
            System.out.println("Iteration " + i);
        }
    }
}

```

#### Output:
```
Iteration 0
Iteration 1
Iteration 2
Iteration 3
Iteration 4

```

### b. Continue Statement
The `continue` statement skips the current iteration and proceeds to the next one.

#### Example:
```java
public class Main {
    public static void main(String[] args) {
        for (int i = 0; i < 5; i++) {
            if (i == 2) {
                continue; // Skip the iteration when i equals 2
            }
            System.out.println("Iteration " + i);
        }
    }
}

```

#### Output:
```
Iteration 0
Iteration 1
Iteration 2
Iteration 3
Iteration 4

```

---

Loops are essential for controlling the flow of execution in your Java programs, enabling you to perform repetitive tasks efficiently. Understanding how to use them effectively will greatly enhance your programming skills!