---
id: real-world-examples
title: Real-World Examples of OOP
sidebar_label: Real World Examples
sidebar_position: 6
description: "OOP concepts are widely used in real-world applications. This section showcases practical examples of OOP concepts are applied in various industries."
tags: [oops, real-world, examples]
---

# **Real-World Examples of Object-Oriented Programming**

Object-Oriented Programming (OOP) concepts are widely used in software development, allowing for more modular, maintainable, and reusable code. Below are some real-world examples of how OOP principles are applied.

## **1. E-commerce Application**

In an e-commerce application, we can represent various entities such as **Product**, **Customer**, and **Order** using classes.

### **Classes Definition**
- **Product**: Represents an item available for sale.
- **Customer**: Represents a user who can purchase products.
- **Order**: Represents a transaction made by a customer.

### **Example Classes**

<details>
<summary><strong>C++ Code</strong></summary>

```cpp
class Product {
private:
    string name;
    double price;

public:
    Product(string n, double p) : name(n), price(p) {}
    void display() {
        cout << "Product: " << name << ", Price: " << price << endl;
    }
};

class Customer {
private:
    string name;
    string email;

public:
    Customer(string n, string e) : name(n), email(e) {}
    void display() {
        cout << "Customer: " << name << ", Email: " << email << endl;
    }
};

class Order {
private:
    Product product;
    Customer customer;

public:
    Order(Product p, Customer c) : product(p), customer(c) {}
    void display() {
        cout << "Order Details:\n";
        product.display();
        customer.display();
    }
};
```
</details>

<details>
<summary><strong>Java Code</strong></summary>

```java
class Product {
    private String name;
    private double price;

    Product(String n, double p) {
        name = n;
        price = p;
    }

    void display() {
        System.out.println("Product: " + name + ", Price: " + price);
    }
}

class Customer {
    private String name;
    private String email;

    Customer(String n, String e) {
        name = n;
        email = e;
    }

    void display() {
        System.out.println("Customer: " + name + ", Email: " + email);
    }
}

class Order {
    private Product product;
    private Customer customer;

    Order(Product p, Customer c) {
        product = p;
        customer = c;
    }

    void display() {
        System.out.println("Order Details:");
        product.display();
        customer.display();
    }
}
```
</details>

### **Creating Instances**

<details>
<summary><strong>C++ Code</strong></summary>

```cpp
int main() {
    Product myProduct("Laptop", 999.99);
    Customer myCustomer("John Doe", "john@example.com");
    Order myOrder(myProduct, myCustomer);
    myOrder.display();
    return 0;
}
```
</details>

<details>
<summary><strong>Java Code</strong></summary>

```java
public class Main {
    public static void main(String[] args) {
        Product myProduct = new Product("Laptop", 999.99);
        Customer myCustomer = new Customer("John Doe", "john@example.com");
        Order myOrder = new Order(myProduct, myCustomer);
        myOrder.display();
    }
}
```
</details>

---

## **2. Banking System**

In a banking system, classes can be created to represent **Account**, **Customer**, and **Transaction**.

### **Classes Definition**
- **Account**: Represents a bank account with methods for depositing and withdrawing money.
- **Customer**: Represents a customer who owns the account.
- **Transaction**: Represents a transaction made on the account.

### **Example Classes**

<details>
<summary><strong>C++ Code</strong></summary>

```cpp
class Account {
private:
    double balance;

public:
    Account(double initialBalance) : balance(initialBalance) {}

    void deposit(double amount) {
        balance += amount;
        cout << "Deposited: " << amount << ", New Balance: " << balance << endl;
    }

    void withdraw(double amount) {
        if (amount <= balance) {
            balance -= amount;
            cout << "Withdrawn: " << amount << ", Remaining Balance: " << balance << endl;
        } else {
            cout << "Insufficient funds!" << endl;
        }
    }
};

class Customer {
private:
    string name;

public:
    Customer(string n) : name(n) {}
    void display() {
        cout << "Customer: " << name << endl;
    }
};

class Transaction {
private:
    Account account;
    double amount;

public:
    Transaction(Account a, double amt) : account(a), amount(amt) {}
    void execute() {
        // Transaction logic can be implemented here
    }
};
```
</details>

<details>
<summary><strong>Java Code</strong></summary>

```java
class Account {
    private double balance;

    Account(double initialBalance) {
        balance = initialBalance;
    }

    void deposit(double amount) {
        balance += amount;
        System.out.println("Deposited: " + amount + ", New Balance: " + balance);
    }

    void withdraw(double amount) {
        if (amount <= balance) {
            balance -= amount;
            System.out.println("Withdrawn: " + amount + ", Remaining Balance: " + balance);
        } else {
            System.out.println("Insufficient funds!");
        }
    }
}

class Customer {
    private String name;

    Customer(String n) {
        name = n;
    }

    void display() {
        System.out.println("Customer: " + name);
    }
}

class Transaction {
    private Account account;
    private double amount;

    Transaction(Account a, double amt) {
        account = a;
        amount = amt;
    }

    void execute() {
        // Transaction logic can be implemented here
    }
}
```
</details>

### **Creating Instances**

<details>
<summary><strong>C++ Code</strong></summary>

```cpp
int main() {
    Account myAccount(1000.00);
    myAccount.deposit(500);
    myAccount.withdraw(200);
    myAccount.withdraw(1500); // Insufficient funds
    return 0;
}
```
</details>

<details>
<summary><strong>Java Code</strong></summary>

```java
public class Main {
    public static void main(String[] args) {
        Account myAccount = new Account(1000.00);
        myAccount.deposit(500);
        myAccount.withdraw(200);
        myAccount.withdraw(1500); // Insufficient funds
    }
}
```
</details>

---