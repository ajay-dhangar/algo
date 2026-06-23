---

id: composition

title: Composition

sidebar_label: Composition

sidebar_position: 7

description: Learn about Composition in Object-Oriented Programming, its advantages over inheritance, implementation in multiple languages, and best practices.

tags: [oop, composition, inheritance, java, python, csharp, design-patterns]

---



# Composition



**Composition** is a fundamental principle in Object-Oriented Programming (OOP) where a class contains objects of other classes as members. It represents a "has-a" relationship, allowing for greater flexibility and code reuse compared to inheritance.



## Key Concepts



### 1. What is Composition?

- A class **composes** (contains) one or more objects of other classes.

- It models the "has-a" relationship (e.g., a Car **has a** Engine).

- Promotes **loose coupling** and **encapsulation**.



### 2. Composition vs Inheritance

- **Inheritance**: "Is-a" relationship (strong coupling).

- **Composition**: "Has-a" relationship (preferred for flexibility).



| Feature              | Composition                          | Inheritance                        |

|----------------------|--------------------------------------|------------------------------------|

| Relationship         | Has-a                                | Is-a                               |

| Coupling             | Loose                                | Tight                              |

| Flexibility          | High (can change behavior at runtime)| Low (fixed at compile time)        |

| Code Reusability     | Excellent                            | Good                               |

| Maintenance          | Easier                               | Can lead to fragile base class problem |



## Composition in Java



```java

// Engine class

public class Engine {

&#x20;   private String type;

&#x20;   

&#x20;   public Engine(String type) {

&#x20;       this.type = type;

&#x20;   }

&#x20;   

&#x20;   public void start() {

&#x20;       System.out.println(type + " engine started");

&#x20;   }

}



// Car class using composition

public class Car {

&#x20;   private Engine engine;  // Composition

&#x20;   private String model;

&#x20;   

&#x20;   public Car(String model, Engine engine) {

&#x20;       this.model = model;

&#x20;       this.engine = engine;

&#x20;   }

&#x20;   

&#x20;   public void drive() {

&#x20;       engine.start();

&#x20;       System.out.println(model + " is driving");

&#x20;   }

}

```



### Usage Example

```java

public class Main {

&#x20;   public static void main(String[] args) {

&#x20;       Engine v8Engine = new Engine("V8");

&#x20;       Car myCar = new Car("Mustang", v8Engine);

&#x20;       myCar.drive();

&#x20;   }

}

```



## Composition in Python



```python

class Engine:

&#x20;   def __init__(self, type):

&#x20;       self.type = type

&#x20;   

&#x20;   def start(self):

&#x20;       print(f"{self.type} engine started")



class Car:

&#x20;   def __init__(self, model, engine):

&#x20;       self.model = model

&#x20;       self.engine = engine  # Composition

&#x20;   

&#x20;   def drive(self):

&#x20;       self.engine.start()

&#x20;       print(f"{self.model} is driving")



# Usage

if __name__ == "__main__":

&#x20;   v8 = Engine("V8")

&#x20;   my_car = Car("Mustang", v8)

&#x20;   my_car.drive()

```



## Composition in C#



```csharp

public class Engine

{

&#x20;   private string type;

&#x20;   

&#x20;   public Engine(string type)

&#x20;   {

&#x20;       this.type = type;

&#x20;   }

&#x20;   

&#x20;   public void Start()

&#x20;   {

&#x20;       Console.WriteLine($"{type} engine started");

&#x20;   }

}



public class Car

{

&#x20;   private Engine engine;  // Composition

&#x20;   private string model;

&#x20;   

&#x20;   public Car(string model, Engine engine)

&#x20;   {

&#x20;       this.model = model;

&#x20;       this.engine = engine;

&#x20;   }

&#x20;   

&#x20;   public void Drive()

&#x20;   {

&#x20;       engine.Start();

&#x20;       Console.WriteLine($"{model} is driving");

&#x20;   }

}

```



## Benefits of Composition

- **Flexibility**: Easily swap components at runtime.

- **Reusability**: Components can be reused across different classes.

- **Testability**: Easier to unit test individual components.

- **Avoids Inheritance Pitfalls**: Prevents deep, fragile class hierarchies.



## Best Practices

- Favor composition over inheritance (FCoI principle).

- Keep composed objects private or protected.

- Use dependency injection for better flexibility.

- Design small, focused classes that can be composed.



## When to Use Composition

- When classes need to use functionality from other classes without being a subtype.

- Building complex objects from simpler ones (e.g., House has Rooms, has Furniture).

- Implementing Strategy or Decorator patterns.



## Mermaid Diagram

```mermaid

classDiagram

&#x20;   class Engine {

&#x20;       +String type

&#x20;       +start()

&#x20;   }

&#x20;   class Car {

&#x20;       +String model

&#x20;       +Engine engine

&#x20;       +drive()

&#x20;   }

&#x20;   Car o-- Engine : "has a"

```



## Related Concepts

- [Inheritance](../inheritance)

- [Encapsulation](../encapsulation)

- [Aggregation](../aggregation)

- [Classes](../classes)





