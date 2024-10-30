---
id: introduction-to-java
sidebar_position: 1
title: Introduction to Java
sidebar_label: Introduction to Java
---

Hey, everyone! In this guide, we'll explore the fundamentals of Java programming language.
Java is a versatile, high-level, object-oriented programming language widely used for building robust and scalable applications.

## What is Java?
Java is a general-purpose, class-based, and object-oriented programming language designed for
minimal implementation dependencies. It is known for its "Write Once, Run Anywhere" philosophy, which means that 
compiled Java code can run on all platforms that support Java without the need for recompilation.

## Why Use Java?
Java is a powerful and versatile programming language, offering several compelling reasons why developers choose to use it:

### 1. **Platform Independence**  
Java applications can run on different platforms like Windows, Mac, Linux, and even Raspberry Pi. 
 This is due to the "Write Once, Run Anywhere" capability provided by the Java Virtual Machine (JVM), making it highly portable.

### 2. **Popularity**  
Java is one of the most popular programming languages globally. With millions of developers using Java,
 its ecosystem is mature and widely adopted in industries ranging from finance to tech startups.

### 3. **High Demand in the Job Market**  
There is a large demand for Java developers, and it continues to be a required skill in various job roles
 such as software engineers, Android developers, and backend developers.

### 4. **Ease of Learning**  
Java has a simple, clean, and well-structured syntax. It is easy to learn, especially for those familiar with languages
 like C++ or C#. This helps in reducing the learning curve for beginners and transitioning developers.

### 5. **Open-Source and Free**  
Java is open-source and freely available, enabling anyone to use it for developing a wide variety of applications
 without licensing costs.

### 6. **Secure, Fast, and Powerful**  
Java provides security features like bytecode verification, and it is designed to minimize vulnerabilities like
 buffer overflows. Additionally, the JVM optimizes the performance of applications, making Java both fast and powerful.

### 7. **Community Support**  
Java has a vast developer community with tens of millions of active members. There is extensive documentation,
 forums, and community support available, ensuring that help is always available for developers.

### 8. **Object-Oriented Language**  
Java is an object-oriented language, which offers a clear structure for organizing and writing code. Object-oriented programming
 (OOP) allows for better modularity, code reuse, and reduced development costs.

### 9. **Similarity to C++ and C#**  
Since Java is syntactically similar to C++ and C#, it is easier for developers to transition between these languages,
 leveraging existing knowledge to learn Java or vice versa.


## Java Syntax
In this section, we will explore the basic structure of a Java program, using a "Hello World" example to understand key syntax rules.

### 1. "Hello World" Example
```java title="Main.java"
public class Main {
  public static void main(String[] args) {
    System.out.println("Hello World");
  }
}
```

### 2. Example Breakdown
Let's break down this code step-by-step:

**Classes in Java**
- Every line of code that runs in Java must be inside a class. Classes act as blueprints for creating objects. 
  In the example, the class is named `Main`.
- The class name should always start with an uppercase letter.
- **Java is case-sensitive**: for example, `MyClass` and `myclass` would be considered different names.

**Filename and Class Name**
- The name of the Java file must match the class name. In this case, since the class is named `Main`, 
  the file should be saved as `Main.java`.

**The `main` Method**
- The `main()` method is mandatory in every Java program, as it is the entry point where the program starts execution:
```java
public static void main(String[] args) {
    // code inside here will run
}
```
-The `main()` method is written as public static void main(String[] args):
- **public:** This means the method can be called from outside the class.
- **static:** This means the method belongs to the class itself, not instances of the class.
- **void:** This means the method does not return a value.
- **String[] args:** This is used to pass arguments to the program.

**System.out.println()**
- Inside the main() method, we can use the println() method to print a line of text to the screen:
```java
public static void main(String[] args) {
  System.out.println("Hello World");
}
```

### Note :
- The curly braces `{}` marks the beginning and the end of a block of code.
- System is a built-in Java class that contains useful members, such as out, which is short for "output".
- The `println()` method, short for "print line", is used to print a value to the screen (or a file).
- You should also note that each code statement must end with a semicolon (;).