---
id: encapsulation-in-java
sidebar_position: 14
title: "Encapsulation in Java"
sidebar_label: "Encapsulation"
---

# Encapsulation in Java

Encapsulation is one of the most important concepts of Object-Oriented Programming (OOP).

Encapsulation means wrapping data (variables) and methods together into a single unit called a class.

It is mainly used to protect data from direct access and improve security.

In Java, encapsulation is achieved by:
- Declaring variables as `private`
- Accessing them using `getter` and `setter` methods

This helps control how data is used or modified.

For example:
- A student’s marks should not be changed directly from outside the class
- Instead, getter and setter methods are used to safely access or update the data

---

## Video Explanation

<LiteYouTubeEmbed
  id="bSrm9RXwBaI"
  params="autoplay=1&autohide=1&showinfo=0&rel=0"
  title="Java OOPs in One Shot | Object Oriented Programming | Java Language | Placement Course"
  lazyLoad={true}
  webp
/>

## Why Use Encapsulation?

- Improves data security
- Prevents unauthorized access
- Makes code more organized
- Provides better control over data
- Helps achieve data hiding

---

# Example

```java
class Student {

    // Private variable
    private String name;

    // Setter method
    public void setName(String name) {
        this.name = name;
    }

    // Getter method
    public String getName() {
        return name;
    }
}

public class Main {
    public static void main(String[] args) {

        Student obj = new Student();

        obj.setName("Rahul");

        System.out.println(obj.getName());
    }
}
```

## Output

```text
Rahul
```

---

# Explanation

In this example:

- `name` variable is declared as `private`
- It cannot be accessed directly outside the class
- `setName()` method is used to set the value
- `getName()` method is used to get the value

This process is called Encapsulation because the data is protected and accessed in a controlled way.

---

# Conclusion

Encapsulation helps make Java programs more secure, organized, and maintainable. It protects data from direct access and allows controlled interaction using getter and setter methods.