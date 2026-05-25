---
id: delegation
title: "Delegation"
sidebar_label: "Delegation"
sidebar_position: 10
description: "Delegation pattern in Object-Oriented Programming."
tags: [Delegation, OOP, patterns, basics]
---

# Delegation

Delegation is an object-oriented technique where an object expresses certain behavior to the outside world but in reality delegates responsibility for implementing that behavior to an associated object.

---

## 1. Concept

Instead of performing a task itself, an object hands over the task to a helper object (the delegate). Delegation is often used in combination with composition to achieve code reuse without the tight coupling of inheritance.

## 2. Why Use Delegation?

- **Flexibility:** You can change the behavior of an object at runtime by swapping out its delegate.
- **Separation of Concerns:** Complex classes can be broken down into smaller, focused classes.
- **Alternative to Inheritance:** It avoids the "fragile base class" problem and allows reusing functionality across unrelated class hierarchies.

## 3. Example

```java
// Delegate Interface
interface Printer {
    void print(String message);
}

// Concrete Delegate
class ConsolePrinter implements Printer {
    public void print(String message) {
        System.out.println("Printing to console: " + message);
    }
}

// Delegator Class
class Document {
    // The delegator "has a" delegate
    private Printer printer;

    public Document(Printer printer) {
        this.printer = printer;
    }

    // Delegating the print task
    public void printDocument(String content) {
        printer.print(content);
    }
}
```
