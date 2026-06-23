---

id: encapsulation

title: Encapsulation

sidebar_label: Encapsulation

sidebar_position: 7

description: Learn about Encapsulation in Object-Oriented Programming, one of the four core OOP principles - bundling data and methods while restricting direct access.

tags: [oop, encapsulation, data-hiding, java, python, csharp, oop-principles]

---



# Encapsulation



**Encapsulation** is one of the four fundamental principles of Object-Oriented Programming (OOP). It is the practice of bundling data (attributes) and methods (functions) that operate on that data into a single unit (class), while restricting direct access to some of the object's components.



This is often described as **data hiding** or **information hiding**.



## Key Concepts



### 1. What is Encapsulation?

- Combines data and the methods that manipulate it into one unit.

- Protects the internal state of an object from unauthorized access.

- Exposes only a controlled public interface.

- Achieved primarily through **access modifiers** (`private`, `protected`, `public`).



### 2. Benefits of Encapsulation

- **Data Protection**: Prevents accidental or malicious modification of internal data.

- **Code Maintainability**: Changes to internal implementation don't affect external code.

- **Flexibility**: Internal logic can be modified without breaking client code.

- **Improved Readability**: Clear separation between interface and implementation.



### 3. Encapsulation vs Abstraction

| Aspect              | Encapsulation                          | Abstraction                            |

|---------------------|----------------------------------------|----------------------------------------|

| Focus               | Data hiding and bundling               | Hiding complexity                      |

| Purpose             | Protect internal state                 | Simplify interface                     |

| Implementation      | Access modifiers (`private`)           | Abstract classes & Interfaces          |

| Level               | Implementation level                   | Design level                           |



## Encapsulation in Java



```java

public class BankAccount {

&#x20;   // Private fields - data hiding

&#x20;   private String accountNumber;

&#x20;   private double balance;



&#x20;   // Constructor

&#x20;   public BankAccount(String accountNumber, double initialBalance) {

&#x20;       this.accountNumber = accountNumber;

&#x20;       this.balance = Math.max(0, initialBalance);

&#x20;   }



&#x20;   // Public getter methods

&#x20;   public double getBalance() {

&#x20;       return balance;

&#x20;   }



&#x20;   public String getAccountNumber() {

&#x20;       return accountNumber;

&#x20;   }



&#x20;   // Public methods to control access (controlled modification)

&#x20;   public void deposit(double amount) {

&#x20;       if (amount > 0) {

&#x20;           balance += amount;

&#x20;           System.out.println("Deposited: " + amount);

&#x20;       }

&#x20;   }



&#x20;   public boolean withdraw(double amount) {

&#x20;       if (amount > 0 && balance >= amount) {

&#x20;           balance -= amount;

&#x20;           System.out.println("Withdrawn: " + amount);

&#x20;           return true;

&#x20;       }

&#x20;       System.out.println("Insufficient funds or invalid amount");

&#x20;       return false;

&#x20;   }

}

```



### Usage Example

```java

public class Main {

&#x20;   public static void main(String[] args) {

&#x20;       BankAccount account = new BankAccount("ACC123", 1000.0);

&#x20;       account.deposit(500);

&#x20;       account.withdraw(200);

&#x20;       System.out.println("Current balance: " + account.getBalance());

&#x20;   }

}

```



## Encapsulation in Python



Python uses naming conventions for encapsulation (`_protected`, `__private`).



```python

class BankAccount:

&#x20;   def __init__(self, account_number, initial_balance=0):

&#x20;       self.__account_number = account_number  # Private

&#x20;       self.__balance = max(0, initial_balance)  # Private



&#x20;   # Public getter

&#x20;   def get_balance(self):

&#x20;       return self.__balance



&#x20;   def get_account_number(self):

&#x20;       return self.__account_number



&#x20;   # Controlled methods

&#x20;   def deposit(self, amount):

&#x20;       if amount > 0:

&#x20;           self.__balance += amount

&#x20;           print(f"Deposited: {amount}")

&#x20;   

&#x20;   def withdraw(self, amount):

&#x20;       if amount > 0 and self.__balance >= amount:

&#x20;           self.__balance -= amount

&#x20;           print(f"Withdrawn: {amount}")

&#x20;           return True

&#x20;       print("Insufficient funds or invalid amount")

&#x20;       return False

```



## Encapsulation in C#



```csharp

public class BankAccount

{

&#x20;   private string accountNumber;

&#x20;   private double balance;



&#x20;   public BankAccount(string accountNumber, double initialBalance)

&#x20;   {

&#x20;       this.accountNumber = accountNumber;

&#x20;       this.balance = Math.Max(0, initialBalance);

&#x20;   }



&#x20;   // Properties (getters/setters)

&#x20;   public double Balance 

&#x20;   { 

&#x20;       get { return balance; } 

&#x20;   }



&#x20;   public string AccountNumber 

&#x20;   { 

&#x20;       get { return accountNumber; } 

&#x20;   }



&#x20;   public void Deposit(double amount)

&#x20;   {

&#x20;       if (amount > 0)

&#x20;       {

&#x20;           balance += amount;

&#x20;           Console.WriteLine($"Deposited: {amount}");

&#x20;       }

&#x20;   }



&#x20;   public bool Withdraw(double amount)

&#x20;   {

&#x20;       if (amount > 0 && balance >= amount)

&#x20;       {

&#x20;           balance -= amount;

&#x20;           Console.WriteLine($"Withdrawn: {amount}");

&#x20;           return true;

&#x20;       }

&#x20;       Console.WriteLine("Insufficient funds or invalid amount");

&#x20;       return false;

&#x20;   }

}

```



## Best Practices



- Always make fields `private` unless there's a strong reason not to.

- Provide getters and setters (or properties) only when necessary.

- Validate input in setter methods or controlled methods.

- Keep the public interface minimal and meaningful.

- Use immutable objects when possible for better thread safety.



## When to Use Encapsulation



- Almost always in OOP design.

- When you need to protect the integrity of an object's state.

- When internal representation might change over time.



## Mermaid Diagram



```mermaid

classDiagram

&#x20;   class BankAccount {

&#x20;       -String accountNumber

&#x20;       -double balance

&#x20;       +getBalance() double

&#x20;       +deposit(amount)

&#x20;       +withdraw(amount) bool

&#x20;   }

&#x20;   note for BankAccount "Data is hidden behind public interface"

```



## Related Concepts



- [Abstraction](../abstraction)

- [Classes](../classes)

- [Composition](../composition)

- [Inheritance](../inheritance)



