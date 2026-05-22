---
id: exception-handling-in-java
sidebar_position: 13
title: "Exception Handling in Java"
sidebar_label: "Exception Handling in Java"
---
In this guide, we'll discuss exception handling in Java. Exception handling helps manage runtime errors and prevents abnormal termination of programs.


---
## 1. What is Exception Handling?

Exception handling is a mechanism used to handle runtime errors so that normal execution of the program can continue.

Java uses the following keywords:

- `try`
- `catch`
- `throw`
- `throws`
- `finally`

## 2. The `try` Block

The `try` block contains code that may generate an exception.

**Syntax:**

```java
try {
    // risky code
}
```

**Example:**

```java
try {
    int x = 10 / 0;
}
```



## 3. The `catch` Block

The `catch` block handles exceptions generated inside the `try` block.

**Syntax:**

```java
catch(ExceptionType e) {
    // handling code
}
```

**Example:**

```java
catch(ArithmeticException e) {
    System.out.println(e);
}
```

## 4. Complete Example

```java
public class Main {
    public static void main(String[] args) {
        try {
            int result = 10 / 0;
            System.out.println(result);
        }
        catch(ArithmeticException e) {
            System.out.println("Division by zero is not allowed");
        }
    }
}
```

**Output:**

```text
Division by zero is not allowed
```



## 5. Multiple Catch Blocks

Java allows multiple `catch` blocks for different exception types.

**Example:**

```java
public class Main {
    public static void main(String[] args) {
        try {
            String str = null;
            System.out.println(str.length());
        }
        catch(ArithmeticException e) {
            System.out.println("Arithmetic Exception");
        }
        catch(NullPointerException e) {
            System.out.println("Null Pointer Exception");
        }
    }
}
```

**Output:**

```text
Null Pointer Exception
```



## 6. Multi Catch Handler

Java supports handling multiple exceptions using a single `catch` block.

**Syntax:**

```java
catch(Exception1 | Exception2 e)
```

**Example:**

```java
public class Main {
    public static void main(String[] args) {
        try {
            int arr[] = {1,2,3};
            System.out.println(arr[5]);
        }
        catch(ArrayIndexOutOfBoundsException | ArithmeticException e) {
            System.out.println("Exception Handled");
        }
    }
}
```

**Output:**

```text
Exception Handled
```

## 7. The `throw` Keyword

The `throw` keyword explicitly throws an exception.

**Example:**

```java
public class Main {
    public static void main(String[] args) {
        int age = 15;
        if(age < 18) {
            throw new ArithmeticException("Not eligible");
        }
    }
}
```



## 8. The `throws` Keyword

The `throws` keyword declares exceptions that may occur in a method.

**Example:**

```java
import java.io.*;

public class Main {
    static void readFile() throws IOException {
        FileReader file = new FileReader("abc.txt");
    }
    public static void main(String[] args) {
        System.out.println("Program Running");
    }
}
```

## 9. The `finally` Block

The `finally` block executes regardless of whether an exception occurs.

**Example:**

```java
public class Main {
    public static void main(String[] args) {
        try {
            int x = 10 / 0;
        }
        catch(Exception e) {
            System.out.println("Exception Occurred");
        }
        finally {
            System.out.println("Finally Block Executed");
        }
    }
}
```

**Output:**

```text
Exception Occurred
Finally Block Executed
```

---
## 10. User Defined Exception

Java allows programmers to create custom exceptions.

**Example:**

```java
class MyException extends Exception {
    MyException(String message) {
        super(message);
    }
}

public class Main {
    public static void main(String[] args) {
        try {
            throw new MyException("Custom Exception");
        }
        catch(MyException e) {
            System.out.println(e.getMessage());
        }
    }
}
```

**Output:**

```text
Custom Exception
```

---
## 11. Advantages of Exception Handling

- Prevents abrupt termination
- Improves readability
- Separates error handling logic
- Helps debugging
- Makes programs more reliable

## 12. Limitations of Exception Handling

- Excessive use may reduce readability
- Improper handling may hide errors
- Slight performance overhead exists

---
## Final Thoughts

Exception handling in Java uses the keywords `try`, `catch`, `throw`, `throws`, and `finally`, allowing developers to handle and use exceptions for robust coding. Happy Learning!.