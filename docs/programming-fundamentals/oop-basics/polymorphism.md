---

id: polymorphism

title: Polymorphism

sidebar_label: Polymorphism

sidebar_position: 7

description: Learn about Polymorphism in Object-Oriented Programming, its types (compile-time and runtime), implementation in different languages, and best practices.

tags: [oop, polymorphism, inheritance, java, python, csharp, overloading, overriding]

---



# Polymorphism



**Polymorphism** is a core principle of Object-Oriented Programming (OOP) that allows objects of different classes to be treated as objects of a common superclass. The term comes from Greek, meaning "many forms." It enables a single interface to represent different underlying forms (data types).



## Key Concepts



### Types of Polymorphism



1. **Compile-time Polymorphism (Static)**  

&#x20;  - Also known as **Method Overloading**.  

&#x20;  - Resolved at compile time.  

&#x20;  - Multiple methods with the same name but different parameters.



2. **Runtime Polymorphism (Dynamic)**  

&#x20;  - Also known as **Method Overriding**.  

&#x20;  - Resolved at runtime using dynamic method dispatch.  

&#x20;  - Achieved through inheritance and virtual methods.



### Benefits

- Increases code flexibility and reusability.

- Supports the "Open-Closed Principle".

- Enables easier maintenance and extensibility.

- Allows writing generic code that works with multiple object types.



## Polymorphism in Java



```java

// Base class

class Animal {

&#x20;   public void sound() {

&#x20;       System.out.println("Animal makes a sound");

&#x20;   }

}



// Subclasses with method overriding

class Dog extends Animal {

&#x20;   @Override

&#x20;   public void sound() {

&#x20;       System.out.println("Dog barks");

&#x20;   }

}



class Cat extends Animal {

&#x20;   @Override

&#x20;   public void sound() {

&#x20;       System.out.println("Cat meows");

&#x20;   }

}



// Method overloading example (compile-time)

class Calculator {

&#x20;   public int add(int a, int b) {

&#x20;       return a + b;

&#x20;   }

&#x20;   

&#x20;   public double add(double a, double b) {

&#x20;       return a + b;

&#x20;   }

}

```



### Usage Example

```java

public class Main {

&#x20;   public static void main(String[] args) {

&#x20;       Animal myDog = new Dog();

&#x20;       Animal myCat = new Cat();

&#x20;       

&#x20;       myDog.sound();  // Runtime polymorphism

&#x20;       myCat.sound();  // Runtime polymorphism

&#x20;       

&#x20;       Calculator calc = new Calculator();

&#x20;       System.out.println(calc.add(5, 3));      // Compile-time

&#x20;       System.out.println(calc.add(5.5, 3.2));  // Compile-time

&#x20;   }

}

```



## Polymorphism in Python



Python supports both dynamic polymorphism (overriding) and operator overloading naturally.



```python

class Animal:

&#x20;   def sound(self):

&#x20;       print("Animal makes a sound")



class Dog(Animal):

&#x20;   def sound(self):

&#x20;       print("Dog barks")



class Cat(Animal):

&#x20;   def sound(self):

&#x20;       print("Cat meows")



# Usage with runtime polymorphism

def make_sound(animal):

&#x20;   animal.sound()  # Works with any Animal subclass

```



## Polymorphism in C#



```csharp

using System;



public class Animal {

&#x20;   public virtual void Sound() {

&#x20;       Console.WriteLine("Animal makes a sound");

&#x20;   }

}



public class Dog : Animal {

&#x20;   public override void Sound() {

&#x20;       Console.WriteLine("Dog barks");

&#x20;   }

}



public class Cat : Animal {

&#x20;   public override void Sound() {

&#x20;       Console.WriteLine("Cat meows");

&#x20;   }

}

```



## Comparison: Overloading vs Overriding



| Feature              | Method Overloading (Compile-time) | Method Overriding (Runtime) |

|----------------------|-----------------------------------|-----------------------------|

| Definition           | Same name, different parameters   | Same signature in subclass  |

| Resolution           | At compile time                   | At runtime                  |

| Inheritance          | Not required                      | Requires inheritance        |

| Keyword (Java/C#)    | None                              | @Override / override        |

| Purpose              | Provide multiple behaviors        | Change behavior in subclass |



## Best Practices

- Use polymorphism to write flexible and extensible code.

- Prefer composition over deep inheritance hierarchies.

- Keep overridden methods consistent with base class contracts.

- Document polymorphic behavior clearly.

- Use interfaces/abstract classes for better abstraction.



## When to Use Polymorphism

- When you need to process different objects through a common interface.

- Implementing design patterns (Strategy, Factory, etc.).

- Creating extensible libraries and frameworks.



## Mermaid Diagram: Runtime Polymorphism

```mermaid

classDiagram

&#x20;   class Animal {

&#x20;       +sound()

&#x20;   }

&#x20;   class Dog {

&#x20;       +sound()

&#x20;   }

&#x20;   class Cat {

&#x20;       +sound()

&#x20;   }

&#x20;   Animal <|-- Dog

&#x20;   Animal <|-- Cat

&#x20;   Animal : sound()*

&#x20;   note for Animal "Base class"

```



## Related Concepts

- [Inheritance](../inheritance)

- [Abstraction](../abstraction)

- [Interfaces](../interfaces)

- [Abstract Class](../abstract-class)



