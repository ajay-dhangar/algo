---
id: encapsulation-in-oops
title: "Encapsulation in Object-Oriented Programming"
sidebar_label: Encapsulation
sidebar_position: 5
description: "Learn Encapsulation in Object-Oriented Programming with clean Java code examples, access modifiers, data hiding, and real-world backend engineering use cases."
tags: [oops, encapsulation, java, clean-code, backend]
---

# **Encapsulation in Object-Oriented Programming (Java)**

**Encapsulation** is one of the foundational pillars of Object-Oriented Programming (OOP). It refers to the mechanism of wrapping data (variables) and code (methods) together as a single unit (class) while restricting direct access to internal components from the outside world.

In backend engineering, encapsulation guarantees **data integrity**, **security**, and **maintainability** by controlling how internal state is inspected and modified.

---

## **Key Principles of Encapsulation**

1. **Data Hiding**: Marking fields as `private` prevents external classes from modifying an object's internal state directly.
2. **Controlled Access**: Access is provided exclusively through getter and setter methods (`public` or `protected`), allowing validation logic before mutating values.
3. **Immutability (Optional)**: By omitting setter methods and declaring fields `final`, an object can be made completely immutable.
4. **Decoupling**: Implementation details can change without breaking client code that depends on public interfaces.

---

## **Java Access Modifiers Overview**

Java provides four levels of access control to enforce encapsulation:

| Access Modifier | Within Class | Within Package | Subclass (Outside Package) | World (Everywhere) |
|---|:---:|:---:|:---:|:---:|
| `private` | ✅ | ❌ | ❌ | ❌ |
| *(default / package-private)* | ✅ | ✅ | ❌ | ❌ |
| `protected` | ✅ | ✅ | ✅ | ❌ |
| `public` | ✅ | ✅ | ✅ | ✅ |

---

## **Real-World Example: Secure Bank Account Management**

In a banking application, balance updates must undergo strict business validation (e.g., non-negative deposits, sufficient funds for withdrawal). Directly exposing the `balance` field allows invalid mutations like setting negative account balances.

### **Clean Java Implementation**

```java
package com.algo.oops.encapsulation;

/**
 * Demonstrates clean encapsulation principles with strict state validation
 * and proper access modifiers in Java.
 */
public class BankAccount {
    // Private fields prevent direct external tampering (Data Hiding)
    private final String accountNumber;
    private final String accountHolderName;
    private double balance;

    /**
     * Parameterized constructor for BankAccount.
     *
     * @param accountNumber     Unique account identification string.
     * @param accountHolderName Primary account holder name.
     * @param initialBalance    Starting balance (must be non-negative).
     */
    public BankAccount(String accountNumber, String accountHolderName, double initialBalance) {
        if (accountNumber == null || accountNumber.isBlank()) {
            throw new IllegalArgumentException("Account number cannot be empty.");
        }
        if (initialBalance < 0) {
            throw new IllegalArgumentException("Initial balance cannot be negative.");
        }
        this.accountNumber = accountNumber;
        this.accountHolderName = accountHolderName;
        this.balance = initialBalance;
    }

    // Getter methods provide controlled read access
    public String getAccountNumber() {
        return accountNumber;
    }

    public String getAccountHolderName() {
        return accountHolderName;
    }

    public double getBalance() {
        return balance;
    }

    /**
     * Encapsulated deposit method with validation rules.
     *
     * @param amount Amount to deposit.
     */
    public void deposit(double amount) {
        if (amount <= 0) {
            throw new IllegalArgumentException("Deposit amount must be greater than zero.");
        }
        this.balance += amount;
        System.out.printf("Successfully deposited $%.2f. New Balance: $%.2f%n", amount, this.balance);
    }

    /**
     * Encapsulated withdraw method ensuring sufficient balance.
     *
     * @param amount Amount to withdraw.
     * @return true if withdrawal succeeded, false otherwise.
     */
    public boolean withdraw(double amount) {
        if (amount <= 0) {
            throw new IllegalArgumentException("Withdrawal amount must be greater than zero.");
        }
        if (amount > this.balance) {
            System.err.println("Transaction failed: Insufficient funds.");
            return false;
        }
        this.balance -= amount;
        System.out.printf("Successfully withdrew $%.2f. Remaining Balance: $%.2f%n", amount, this.balance);
        return true;
    }
}
```

### **Usage Demo**

```java
package com.algo.oops.encapsulation;

public class Main {
    public static void main(String[] args) {
        BankAccount account = new BankAccount("ACC-98765", "Alice Smith", 500.0);

        // Accessing state via getters
        System.out.println("Account Number: " + account.getAccountNumber());
        System.out.println("Initial Balance: $" + account.getBalance());

        // Performing validated operations
        account.deposit(250.0);
        account.withdraw(100.0);

        // Attempting invalid withdrawal
        account.withdraw(1000.0); // Output: Transaction failed: Insufficient funds.
    }
}
```

---

## **Clean Code Habits for Encapsulation**

- **Make fields `private` by default**: Expose getters/setters only when necessary.
- **Validate in Mutators (Setters/Methods)**: Reject invalid inputs before mutating internal state.
- **Return Defensive Copies for Collections**: If a class holds a `List` or `Map`, return `Collections.unmodifiableList(...)` or a copy from getters to prevent external modification of internal collections.
- **Prefer Immutability**: Use `final` instance fields for value objects (like DTOs or Entities) that should not change after instantiation.
