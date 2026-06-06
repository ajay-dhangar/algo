---
id: classes-in-cpp
sidebar_position: 9
title: "Classes and Objects in C++"
sidebar_label: "Classes & Objects"
tags: [cpp, classes, oop]
description: "An in-depth guide to Object-Oriented Programming in C++. Master classes, objects, access modifiers, constructors, destructors, inheritance, and polymorphism."
keywords: ["C++ classes", "object-oriented programming", "constructors", "destructors", "inheritance", "polymorphism", "virtual functions"]
---

**Object-Oriented Programming (OOP)** is a programming paradigm built around the concept of "objects"—data structures that contain both data fields and modular functions. 

C++ was originally engineered as "C with Classes" to bridge low-level system speeds with high-level structural modeling. At the heart of this paradigm lies the **Class**, which serves as user-defined blueprints for objects.

## 1. Defining a Class and Instantiating Objects

A **Class** is a logical template or blueprint. An **Object** is a physical instance of that class allocated in memory. Classes encapsulate data (attributes) and behaviors (methods) into a single cohesive unit.

### Syntax

```cpp title="Class Definition Syntax"
class ClassName {
public:
    // Attributes (Data Members)
    // Methods (Member Functions)
private:
    // Encapsulated Members
}; // Note the required trailing semicolon

```

### Implementation Example

```cpp title="Class and Object Example"
#include <iostream>
#include <string>

class Vehicle {
public:
    std::string brand;
    int manufactureYear;

    void displayTelemetry() {
        std::cout << "Brand: " << brand << " | Year: " << manufactureYear << "\n";
    }
};

int main() {
    // Instantiating an object on the Stack
    Vehicle fleetCar1;
    
    // Accessing public data members using the dot (.) operator
    fleetCar1.brand = "Toyota";
    fleetCar1.manufactureYear = 2024;
    
    fleetCar1.displayTelemetry(); // Output: Brand: Toyota | Year: 2024
    return 0;
}

```

## 2. Access Modifiers & Data Encapsulation

C++ features three explicit access specification labels that enforce **Data Encapsulation**—the process of hiding raw internal state details from external manipulation.

* `public`: Accessible by any statement inside the entire application scope.
* `private`: Accessible **only** by member functions belonging internally to the class. This is the default modifier if none are specified.
* `protected`: Accessible within the class itself and any child classes derived from it.

### Enforcing Mutator and Accessor Methods (Getters/Setters)

```cpp title="Mutator and Accessor Methods"
#include <iostream>
#include <string>

class Employee {
private:
    int salary; // Restricted access

public:
    std::string name;

    // Setter (Mutator Method) with defensive data validation
    void setSalary(int baselineSalary) {
        if (baselineSalary >= 0) {
            salary = baselineSalary;
        }
    }

    // Getter (Accessor Method)
    int getSalary() {
        return salary;
    }
};

int main() {
    Employee engineer;
    engineer.name = "Alice";
    engineer.setSalary(95000);
    
    std::cout << engineer.name << " Earns: $" << engineer.getSalary() << "\n";
    return 0;
}

```

## 3. Constructors

A **Constructor** is a distinct initialization function called automatically by the compiler runtime environment the exact moment an object is instantiated.

* Constructors match the class name precisely and **do not possess a return type** (not even `void`).
* If you write a class without any constructor, the compiler silently provisions a hidden *Default Constructor* for you.

```cpp title="Constructor Example"
#include <iostream>
#include <string>

class ServerNode {
public:
    std::string nodeIp;
    int portCode;

    // Parameterized Constructor using modern Member Initializer List syntax
    ServerNode(std::string ip, int port) : nodeIp(ip), portCode(port) {
        std::cout << "Initialization complete for Node: " << nodeIp << "\n";
    }
};

int main() {
    // Passing values directly to constructor upon object creation
    ServerNode edgeGateway("192.168.1.50", 8080);
    return 0;
}

```

## 4. Destructors

A **Destructor** is invoked automatically when an object's lifetime expires (such as going out of scope or being explicitly targeted via `delete`).

* Destructors cannot accept any arguments, cannot be overloaded, and are prefixed with a tilde character (`~`).
* They serve as the backbone of **RAII (Resource Acquisition Is Initialization)** in C++, cleaning up open file streams, network sockets, or raw heap memory.

```cpp title="Destructor Example"
#include <iostream>

class MemoryBuffer {
private:
    int* dynamicArrayPointer;

public:
    MemoryBuffer() {
        dynamicArrayPointer = new int[100]; // Allocating Heap memory
        std::cout << "Heap memory buffer allocated.\n";
    }

    ~MemoryBuffer() {
        delete[] dynamicArrayPointer; // Deallocating memory to prevent memory leaks
        std::cout << "Heap memory successfully reclaimed by OS.\n";
    }
};

```

## 5. Inheritance: Hierarchical Extensions

Inheritance permits an engineer to construct a child class (**Derived Class**) that takes on data properties and processing logic from an existing parent class (**Base Class**), promoting radical code reuse.

```cpp title="Inheritance Example"
#include <iostream>

// Base Class
class HardwareComponent {
public:
    void supplyPower() {
        std::cout << "Power routing steady.\n";
    }
};

// Derived Class inheriting publicly
class ComputeCore : public HardwareComponent {
public:
    void executeInstruction() {
        std::cout << "Cycle instruction pipeline processed.\n";
    }
};

int main() {
    ComputeCore primaryProcessor;
    primaryProcessor.supplyPower();        // Inherited method capability
    primaryProcessor.executeInstruction(); // Custom specialized capability
    return 0;
}

```

## 6. Polymorphism: Multiform Adaptations

Polymorphism translates to "many forms". It allows interfaces to adapt dynamically depending on data context inputs or class layout variants.

### A. Compile-Time Polymorphism (Function Overloading)

Different signatures under an identical method name. The compiler resolves which function block to trigger during compilation based on parameter traits.

```cpp title="Function Overloading Example"
#include <iostream>

void logEvent(int errorCode) {
    std::cout << "System Error Code: " << errorCode << "\n";
}

void logEvent(std::string statusMsg) {
    std::cout << "System Event Message: " << statusMsg << "\n";
}
int main() {
    logEvent(404); // Output: System Error Code: 404
    logEvent("Connection established."); // Output: System Event Message: Connection established.

    return 0;
}
```

### B. Run-Time Polymorphism (Function Overriding)

Allows a derived class to replace or specialize an operation inherited from a base class. To enable runtime resolution via pointers or references, the base class signature **must** be marked with the `virtual` keyword.

```cpp title="Function Overriding Example"
#include <iostream>

class BaseFirmware {
public:
    // Virtual function enables Dynamic Binding runtime checks
    virtual void bootSequence() {
        std::cout << "Executing generic legacy boot steps...\n";
    }
    
    // Virtual destructor is critical for safe polymorphic deallocations
    virtual ~BaseFirmware() = default; 
};

class CustomOS : public BaseFirmware {
public:
    // Explicit override declaration
    void bootSequence() override {
        std::cout << "Executing optimized kernel subsystem loading...\n";
    }
};

int main() {
    // Polymorphic pointer mapping base types to derived instances
    BaseFirmware* systemKernel = new CustomOS();
    
    systemKernel->bootSequence(); // Output: Executing optimized kernel subsystem loading...
    
    delete systemKernel;
    return 0;
}

```

## 7. Deep Dive: Functions Architecture in C++

While classes handle data structure compilation encapsulation, pure **functions** manage isolated compute pathways.

### A. The Separation of Prototype Declarations vs Definitions

In production professional application templates, declarations generally exist within localized header files (`.h`), whereas execution code layouts live within companion implementation compilation files (`.cpp`).

```cpp title="Function Prototype vs Definition"
#include <iostream>

// 1. Function Prototype Declaration (Contract signature given to the compiler)
int computeFactorial(int baselineInteger);

// 2. Main Entry Orchestration Block
int main() {
    int executionResult = computeFactorial(5);
    return 0;
}

// 3. Complete Function Definition
int computeFactorial(int baselineInteger) {
    if (baselineInteger <= 1) return 1; // Base case termination
    return baselineInteger * computeFactorial(baselineInteger - 1); // Recursive loop path
}

```

### B. Specialized Structural Modifiers

#### 1. Inline Performance Optimization (`inline`)

Prepending a function declaration with the `inline` compiler flag suggests copying the function's internal statements straight into the execution call site rather than spawning a structural context stack frame swap. This minimizes execution overhead for minor, frequently called methods.

```cpp title="Inline Function Example"
inline int deriveSquare(int value) {
    return value * value;
}

```

#### 2. Default Input Method Arguments

You can assign default fallback parameter values. If an argument is omitted during execution calls, the pre-assigned fallback steps in automatically.

```cpp title="Default Arguments Example"
#include <iostream>

// Default arguments must always be stacked toward the rightmost tail of the parameters
void configureNetworkNode(std::string nodeName, int portAssignment = 80) {
    std::cout << "Node: " << nodeName << " bound to Port: " << portAssignment << "\n";
}

int main() {
    configureNetworkNode("ProxyAlpha", 443); // Overrides default mapping
    configureNetworkNode("ProxyBeta");       // Uses default fallback port 80
    return 0;
}

```

## 8. Functional Paradigms Summary Matrix

| Strategy Selection | Execution Timing Resolution | Performance Overhead Vectors | Best Applied Use Case Environments |
| --- | --- | --- | --- |
| **Inline Functions** | Compile-Time Substitution | $0$ stack frame context latency. Expanded binary size footprint. | Short, localized, high-frequency utility steps. |
| **Function Overloading** | Compile-Time Resolution | Identical to traditional function calls. No runtime cost. | Processing varying numerical data input layouts under single concepts. |
| **Virtual Overriding** | Run-Time Dynamic Binding | Small indirection penalty via virtual method lookup pointer tables (Vtables). | Constructing flexible, open plugin architectures and modular object abstractions. |

## Conclusion

C++'s rich tapestry of class and function features empowers developers to architect complex, high-performance applications with precision control over memory management, execution flow, and code organization. Mastery of these concepts is essential for leveraging the full potential of C++ in modern software development.