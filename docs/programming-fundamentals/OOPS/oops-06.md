---
id: encapsulation
title: "Encapsulation in Object-Oriented Programming (OOP)"
sidebar_label: Encapsulation
sidebar_position: 2
description: "Encapsulation is the process of bundling data and methods that operate on that data into a single unit, and restricting access to internal details."
tags: [oops, encapsulation, object-oriented programming]
---

# **Encapsulation in OOP**

Encapsulation is a core concept in Object-Oriented Programming (OOP) that involves bundling the data (attributes) and methods (functions) that operate on the data into a single unit, typically a class. It restricts direct access to some of the object's components, thereby protecting the object's internal state.

---

## **Key Features of Encapsulation**
- **Data hiding**: Prevents direct access to internal data members.
- Promotes **modularity** by ensuring that the internal workings of an object are hidden from the outside world.
- Achieved using **access modifiers** like `private`, `protected`, and `public`.

---

### **Example of Encapsulation**


<details>
<summary><strong>C++ Code</strong></summary>

```cpp
#include <iostream>
using namespace std;

class Employee {
private:
    int salary;  // Private data member

public:
    void setSalary(int s) {
        salary = s;
    }

    int getSalary() {
        return salary;
    }
};

int main() {
    Employee emp;
    emp.setSalary(5000);
    cout << "Employee Salary: " << emp.getSalary() << endl;
    return 0;
}
```

</details>

<details>
<summary><strong>JavaScript Code</strong></summary>

```js
class Employee {
    #salary;  // Private field

    // Setter method for salary
    setSalary(salary) {
        this.#salary = salary;
    }

    // Getter method for salary
    getSalary() {
        return this.#salary;
    }
}

// Main code to demonstrate encapsulation
const emp = new Employee();
emp.setSalary(5000);
console.log(`Employee Salary: ${emp.getSalary()}`); // Output: Employee Salary: 5000

```

</details>

## Advantages of Encapsulation
Increased security by restricting access to sensitive data.
Modular design allows changes to internal implementation without affecting the external interface.
Improved maintainability as the code is organized and modular.