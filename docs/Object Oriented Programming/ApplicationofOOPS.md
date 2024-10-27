---

id: applicationsofoops
title: "Applications of OOP in Real-Time Software"
sidebar_label: Applications of OOP
sidebar_position: 1
description: "This document explains how to use Object-Oriented Programming (OOP) concepts to build real-time software applications, focusing on an Online Banking System."
tags: [oops, applications, software]

---

### Applications of OOP in Real-Time Software
**I am going to tell you how to use OOP concepts to build real-time software applications, particularly an Online Banking System. OOP helps in structuring the code, making it modular, and enhancing reusability and maintainability.**

### OOP Concepts Used

**Encapsulation:** Protects data by restricting direct access to it and exposing only necessary methods.
**Inheritance:** Allows the creation of a new class based on an existing class, promoting code reusability.
**Polymorphism:** Enables methods to do different things based on the object calling them.

### Building an Online Banking System
**1. User Class**
The User class handles user registration and login functionality.

```cpp
class User {
private:
    string name;
    string userID;
    string password;

public:
    void registerUser(string userName, string userPassword) {
        name = userName;
        userID = generateUserID(); // Generate a unique user ID
        password = userPassword;
        // Logic to store user data in a database
    }

    bool login(string userPassword) {
        return password == userPassword; // Validate password
    }
};
```

**2. Account Class**
The Account class manages the bank account operations such as deposits and withdrawals.

```cpp

class Account {
private:
    string accountNumber;
    double balance;
    string accountType;

public:
    Account(string type) : accountType(type), balance(0.0) {
        accountNumber = generateAccountNumber(); // Generate a unique account number
    }

    void deposit(double amount) {
        balance += amount; // Add to balance
        // Logic to record the transaction
    }

    bool withdraw(double amount) {
        if (amount <= balance) {
            balance -= amount; // Deduct from balance
            // Logic to record the transaction
            return true; // Withdrawal successful
        }
        return false; // Insufficient funds
    }

    double checkBalance() {
        return balance; // Return current balance
    }
};
```

**3. Transaction Class**
The Transaction class records transaction details.

```cpp
class Transaction {
private:
    string transactionID;
    double amount;
    string transactionType;
    string date;

public:
    void recordTransaction(string type, double amt) {
        transactionType = type;
        amount = amt;
        date = getCurrentDate(); // Get the current date
        // Logic to store transaction details
    }
};
```

**4. Admin Class (Optional)**
The Admin class can manage user accounts and system-level operations.

```cpp
class Admin {
public:
    void viewAllUsers() {
        // Logic to retrieve and display all users
    }

    void deleteUser(string userID) {
        // Logic to delete a user by ID
    }
};
```

**Example Usage**
User Registration and Login

```cpp
User user;
user.registerUser("Alice", "strongPassword123");

if (user.login("strongPassword123")) {
    cout << "Login successful!" << endl;
} else {
    cout << "Invalid credentials." << endl;
}
```

**Account Operations**

```cpp
Account savingsAccount("Savings");
savingsAccount.deposit(1000.0);

if (savingsAccount.withdraw(300.0)) {
    cout << "Withdrawal successful!" << endl;
} else {
    cout << "Insufficient funds." << endl;
}

cout << "Current Balance: $" << savingsAccount.checkBalance() << endl;
```

**Transaction Management**
```cpp
Transaction transaction;
transaction.recordTransaction("Deposit", 1000.0);
transaction.recordTransaction("Withdrawal", 300.0);
```

### Conclusion
By applying OOP principles, the Online Banking System can be developed in a structured manner, allowing for easy maintenance and scalability. Each class encapsulates its functionality, enhancing code reusability. You can extend this system further with features like multi-currency support, enhanced security measures, or a user-friendly interface.
