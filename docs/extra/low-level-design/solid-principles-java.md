---
id: solid-principles-java
title: "SOLID Principles in Low-Level Design (LLD) with Java"
sidebar_label: SOLID Principles
sidebar_position: 1
description: "Master the 5 SOLID principles of Object-Oriented Design in Java with real-world examples, clean code habits, and backend architecture best practices."
tags: [lld, solid-principles, oops, java, design-patterns]
---

# **SOLID Principles in Low-Level Design (Java)**

**Low-Level Design (LLD)** deals with class-level architectures, data models, method definitions, and component relationships in software engineering. The **SOLID** principles form the foundation of maintainable, extensible, and flexible object-oriented code.

---

## **Overview of SOLID Principles**

| Acronym | Principle | Core Concept |
|:---:|---|---|
| **S** | **Single Responsibility Principle (SRP)** | A class should have only one reason to change. |
| **O** | **Open-Closed Principle (OCP)** | Software entities should be open for extension, closed for modification. |
| **L** | **Liskov Substitution Principle (LSP)** | Derived classes must be substitutable for their base classes without breaking behavior. |
| **I** | **Interface Segregation Principle (ISP)** | Clients should not be forced to depend on interfaces they do not use. |
| **D** | **Dependency Inversion Principle (DIP)** | High-level modules should depend on abstractions, not concrete implementations. |

---

## **1. Single Responsibility Principle (SRP)**

> *"A class should have one, and only one, reason to change."*

### **Violation Example**

```java
// BAD: Invoice class handles calculation, database persistence, and PDF generation
public class Invoice {
    private double amount;

    public double calculateTax() { return amount * 0.18; }
    public void saveToDatabase() { /* DB logic */ }
    public void generatePdfReport() { /* PDF generation logic */ }
}
```

### **Clean Java Implementation**

```java
package com.algo.lld.solid.srp;

// 1. Domain Entity focused solely on data and calculations
public class Invoice {
    private final String invoiceId;
    private final double amount;

    public Invoice(String invoiceId, double amount) {
        this.invoiceId = invoiceId;
        this.amount = amount;
    }

    public double calculateTotalWithTax(double taxRate) {
        return amount + (amount * taxRate);
    }

    public String getInvoiceId() { return invoiceId; }
    public double getAmount() { return amount; }
}

// 2. Separate Service for Data Persistence
class InvoiceRepository {
    public void save(Invoice invoice) {
        System.out.println("Saving invoice " + invoice.getInvoiceId() + " to Database.");
    }
}

// 3. Separate Service for Document Generation
class InvoicePrinter {
    public void print(Invoice invoice) {
        System.out.println("Printing PDF report for invoice: " + invoice.getInvoiceId());
    }
}
```

---

## **2. Open-Closed Principle (OCP)**

> *"Software entities (classes, modules, functions) should be open for extension, but closed for modification."*

### **Clean Java Implementation using Strategy/Interfaces**

```java
package com.algo.lld.solid.ocp;

// Abstraction allows adding new payment methods without modifying existing code
public interface PaymentMethod {
    void processPayment(double amount);
}

class CreditCardPayment implements PaymentMethod {
    @Override
    public void processPayment(double amount) {
        System.out.printf("Processing $%.2f payment via Credit Card.%n", amount);
    }
}

class PaypalPayment implements PaymentMethod {
    @Override
    public void processPayment(double amount) {
        System.out.printf("Processing $%.2f payment via PayPal.%n", amount);
    }
}

// Open for extension (add new PaymentMethod implementation), closed for modification
public class PaymentProcessor {
    public void execute(PaymentMethod paymentMethod, double amount) {
        paymentMethod.processPayment(amount);
    }
}
```

---

## **3. Liskov Substitution Principle (LSP)**

> *"Objects of a superclass should be replaceable with objects of a subclass without affecting the correctness of the program."*

### **Clean Java Implementation**

```java
package com.algo.lld.solid.lsp;

// Separate capabilities into correct hierarchies
public interface Vehicle {
    void move();
}

public interface EnginePoweredVehicle extends Vehicle {
    void startEngine();
}

class Car implements EnginePoweredVehicle {
    @Override
    public void move() { System.out.println("Car is driving."); }
    @Override
    public void startEngine() { System.out.println("Engine started."); }
}

class Bicycle implements Vehicle {
    @Override
    public void move() { System.out.println("Bicycle is pedaling."); }
}
```

---

## **4. Interface Segregation Principle (ISP)**

> *"Clients should not be forced to depend upon interfaces that they do not use."*

### **Clean Java Implementation**

```java
package com.algo.lld.solid.isp;

// Focused, segregated interfaces instead of one monolithic interface
public interface Printer {
    void printDocument(String document);
}

public interface Scanner {
    void scanDocument(String document);
}

// Simple printer only implements Printer
class BasicPrinter implements Printer {
    @Override
    public void printDocument(String document) {
        System.out.println("Printing: " + document);
    }
}

// Multi-function machine implements both
class MultiFunctionPrinter implements Printer, Scanner {
    @Override
    public void printDocument(String document) { System.out.println("Printing: " + document); }
    @Override
    public void scanDocument(String document) { System.out.println("Scanning: " + document); }
}
```

---

## **5. Dependency Inversion Principle (DIP)**

> *"High-level modules should not depend on low-level modules. Both should depend on abstractions."*

### **Clean Java Implementation (Dependency Injection)**

```java
package com.algo.lld.solid.dip;

// Abstraction
public interface NotificationService {
    void sendNotification(String message, String recipient);
}

class EmailNotificationService implements NotificationService {
    @Override
    public void sendNotification(String message, String recipient) {
        System.out.println("Sending Email to " + recipient + ": " + message);
    }
}

class SmsNotificationService implements NotificationService {
    @Override
    public void sendNotification(String message, String recipient) {
        System.out.println("Sending SMS to " + recipient + ": " + message);
    }
}

// High-level component depends on NotificationService interface, not concrete implementation
public class NotificationManager {
    private final NotificationService notificationService;

    // Dependency Injection via constructor
    public NotificationManager(NotificationService notificationService) {
        this.notificationService = notificationService;
    }

    public void notifyUser(String userContact, String text) {
        this.notificationService.sendNotification(text, userContact);
    }
}
```

---

## **Key Takeaways for LLD**

1. **SRP**: Keeps classes compact and focused on one domain.
2. **OCP**: Enables feature addition via polymorphism without breaking legacy code.
3. **LSP**: Ensures contracts in inheritance hierarchies are respected.
4. **ISP**: Prevents bloat by designing lean, purpose-specific interfaces.
5. **DIP**: Decouples business logic from infrastructural details (databases, APIs, loggers).
