---
id: strings-in-java
sidebar_position: 5
title: "Strings In Java"
sidebar_label: "Strings In Java"
---

Hello! In this guide, we'll explore how to work with strings in Java. Strings are a crucial part of Java programming as they allow you to manipulate and process text easily. Let's dive in!

## 1. Java Strings

In Java, strings are objects of the `String` class, which is part of the Java standard library. Unlike C-style strings, Java strings are immutable, meaning once a string object is created, it cannot be changed.

#### Example:

```java
public class Main {
    public static void main(String[] args) {
        String greeting = "Hello, World!";
        System.out.println(greeting);
    }
}
```

#### Output:

```
Hello, World!
```

---

## 2. Common String Operations

### 2.1 String Length

To get the length of a string, you can use the `.length()` method.

#### Example:

```java
public class Main {
    public static void main(String[] args) {
        String greeting = "Hello, World!";
        System.out.println("Length: " + greeting.length());
    }
}
```

#### Output:

```
Length: 13
```

---

### 2.2 String Concatenation

You can concatenate two strings using the `+` operator or the `.concat()` method.

#### Example:

```java
public class Main {
    public static void main(String[] args) {
        String firstName = "John";
        String lastName = "Doe";
        String fullName = firstName + " " + lastName;
        System.out.println(fullName);
    }
}
```

#### Output:

```
John Doe
```

---

### 2.3 Accessing Characters in a String

You can access individual characters in a string using the `.charAt()` method.

#### Example:

```java
public class Main {
    public static void main(String[] args) {
        String greeting = "Hello";
        System.out.println(greeting.charAt(0)); // Output: H
    }
}
```

#### Output:

```
H
```

---

## 3. Modifying Strings

### 3.1 Changing Characters

Since strings in Java are immutable, you can't modify the string directly, but you can create a new string with the desired changes.

#### Example:

```java
public class Main {
    public static void main(String[] args) {
        String greeting = "Hello";
        String modifiedGreeting = "J" + greeting.substring(1);
        System.out.println(modifiedGreeting); // Output: Jello
    }
}
```

#### Output:

```
Jello
```

---

### 3.2 Substrings

You can extract a substring from a string using the `.substring()` method.

#### Example:

```java
public class Main {
    public static void main(String[] args) {
        String greeting = "Hello, World!";
        String sub = greeting.substring(0, 5); // Extracts "Hello"
        System.out.println(sub);
    }
}
```

#### Output:

```
Hello
```

---

### 3.3 String Comparison

You can compare two strings using the `.equals()` method or comparison operators.

#### Example:

```java
public class Main {
    public static void main(String[] args) {
        String str1 = "Hello";
        String str2 = "World";

        if (str1.equals(str2)) {
            System.out.println("Strings are equal");
        } else {
            System.out.println("Strings are not equal");
        }
    }
}
```

#### Output:

```
Strings are not equal
```

---

## 4. String Input

You can input strings from the user using `Scanner`.

#### Example:

```java
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter your name: ");
        String name = sc.nextLine();
        System.out.println("Hello, " + name);
    }
}
```

#### Output:

```
Enter your name: John Doe
Hello, John Doe
```

---

## 5. String Functions

Java provides several methods to manipulate strings. Some common ones include:

### 5.1 `indexOf()`

Finds the first occurrence of a substring.

#### Example:

```java
public class Main {
    public static void main(String[] args) {
        String str = "Hello, World!";
        int pos = str.indexOf("World");

        if (pos != -1) {
            System.out.println("Found at position: " + pos);
        } else {
            System.out.println("Not found!");
        }
    }
}
```

#### Output:

```
Found at position: 7
```

---

### 5.2 `replace()`

Replaces part of the string with another string.

#### Example:

```java
public class Main {
    public static void main(String[] args) {
        String str = "Hello, World!";
        String newStr = str.replace("World", "Universe");
        System.out.println(newStr);
    }
}
```

#### Output:

```
Hello, Universe!
```

---

### 5.3 `toUpperCase()` and `toLowerCase()`

Converts a string to uppercase or lowercase.

#### Example:

```java
public class Main {
    public static void main(String[] args) {
        String str = "Hello";
        System.out.println(str.toUpperCase()); // Output: HELLO
        System.out.println(str.toLowerCase()); // Output: hello
    }
}
```

#### Output:

```
HELLO
hello
```

---

### 5.4 `trim()`

Removes leading and trailing whitespaces.

#### Example:

```java
public class Main {
    public static void main(String[] args) {
        String str = "   Hello, World!   ";
        System.out.println("Before trim: '" + str + "'");
        System.out.println("After trim: '" + str.trim() + "'");
    }
}
```

#### Output:

```
Before trim: '   Hello, World!   '
After trim: 'Hello, World!'
```

---

Strings are a fundamental part of Java programming, and mastering them will significantly enhance your ability to handle text-based data. Happy coding!
