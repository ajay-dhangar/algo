---

id: interfaces

title: Interfaces

sidebar_label: Interfaces

sidebar_position: 7

description: Learn about Interfaces in object-oriented programming, their purpose, implementation in multiple languages, and comparison with abstract classes.

tags: [oop, java, python, csharp, abstraction, polymorphism, multiple-inheritance]

---



# Interfaces



An **Interface** is a completely abstract contract that defines a set of methods (and sometimes properties/constants) that a class must implement. It specifies *what* a class should do, without providing *how* it should be done.



Interfaces enable **multiple inheritance** of type (in languages like Java), promote loose coupling, and support polymorphism.



## Key Concepts



### Purpose of Interfaces

- Define a contract for classes to follow.

- Support **polymorphism** — different classes can implement the same interface in different ways.

- Enable **multiple inheritance** of behavior (in Java/C#).

- Promote **loose coupling** between components.

- Facilitate testing (mocking) and dependency injection.



### Characteristics

- Cannot be instantiated directly.

- All methods are implicitly `public` and `abstract` (in Java before default methods).

- Can contain constants (`static final` fields).

- Support **default methods** (Java 8+) and **static methods**.

- No constructors.

- A class can implement **multiple interfaces**.



## Interfaces in Java



```java

// Interface definition

public interface Drawable {

&#x20;   // Abstract method (implicitly public abstract)

&#x20;   void draw();

&#x20;   

&#x20;   // Constant

&#x20;   int MAX_SIZE = 100;

&#x20;   

&#x20;   // Default method (Java 8+)

&#x20;   default void resize(int percent) {

&#x20;       System.out.println("Resizing by " + percent + "%");

&#x20;   }

&#x20;   

&#x20;   // Static method (Java 8+)

&#x20;   static void printInfo() {

&#x20;       System.out.println("Drawable interface");

&#x20;   }

}



// Implementing the interface

public class Circle implements Drawable {

&#x20;   private double radius;

&#x20;   

&#x20;   public Circle(double radius) {

&#x20;       this.radius = radius;

&#x20;   }

&#x20;   

&#x20;   @Override

&#x20;   public void draw() {

&#x20;       System.out.println("Drawing a Circle with radius: " + radius);

&#x20;   }

}



public class Rectangle implements Drawable {

&#x20;   private double width, height;

&#x20;   

&#x20;   public Rectangle(double width, double height) {

&#x20;       this.width = width;

&#x20;       this.height = height;

&#x20;   }

&#x20;   

&#x20;   @Override

&#x20;   public void draw() {

&#x20;       System.out.println("Drawing a Rectangle: " + width + "x" + height);

&#x20;   }

}

```



### Usage Example



```java

public class Main {

&#x20;   public static void main(String[] args) {

&#x20;       Drawable circle = new Circle(5.0);

&#x20;       Drawable rect = new Rectangle(4, 6);

&#x20;       

&#x20;       circle.draw();

&#x20;       rect.draw();

&#x20;       circle.resize(50);

&#x20;       Drawable.printInfo();

&#x20;   }

}

```



## Interfaces in Python



Python uses **Abstract Base Classes (ABC)** with `@abstractmethod` to simulate interfaces.



```python

from abc import ABC, abstractmethod



class Drawable(ABC):

&#x20;   @abstractmethod

&#x20;   def draw(self):

&#x20;       pass

&#x20;   

&#x20;   def resize(self, percent):

&#x20;       """Default implementation"""

&#x20;       print(f"Resizing by {percent}%")

&#x20;   

&#x20;   @staticmethod

&#x20;   def print_info():

&#x20;       print("Drawable interface")



class Circle(Drawable):

&#x20;   def __init__(self, radius):

&#x20;       self.radius = radius

&#x20;   

&#x20;   def draw(self):

&#x20;       print(f"Drawing a Circle with radius: {self.radius}")



class Rectangle(Drawable):

&#x20;   def __init__(self, width, height):

&#x20;       self.width = width

&#x20;       self.height = height

&#x20;   

&#x20;   def draw(self):

&#x20;       print(f"Drawing a Rectangle: {self.width}x{self.height}")

```



## Interfaces in C#



```csharp

public interface IDrawable

{

&#x20;   void Draw();

    int MaxSize => 100;  // Default property (C# 8+)

&#x20;   

&#x20;   // Default implementation (C# 8+)

&#x20;   void Resize(int percent)

&#x20;   {

&#x20;       Console.WriteLine($"Resizing by {percent}%");

&#x20;   }

&#x20;   

&#x20;   static void PrintInfo()

&#x20;   {

&#x20;       Console.WriteLine("Drawable interface");

&#x20;   }

}



public class Circle : IDrawable

{

&#x20;   private double radius;

&#x20;   

&#x20;   public Circle(double radius) => this.radius = radius;

&#x20;   

&#x20;   public void Draw()

&#x20;   {

&#x20;       Console.WriteLine($"Drawing a Circle with radius: {radius}");

&#x20;   }

}

```



## Comparison with Abstract Classes



| Feature              | Interface                          | Abstract Class                     |

|----------------------|------------------------------------|------------------------------------|

| Purpose              | Contract / "What"                  | Partial implementation / "What + How" |

| Methods              | Abstract + Default                 | Abstract + Concrete                |

| Variables            | Constants only                     | Instance variables allowed         |

| Constructors         | Not supported                      | Supported                          |

| Inheritance          | Multiple (implements)              | Single (extends)                   |

| Access Modifiers     | Public (implicit)                  | Public, protected, private         |

| Use Case             | Define capabilities                | Share common code                  |



## Best Practices

- Keep interfaces focused (Single Responsibility).

- Use meaningful, adjective-based names (e.g., `Drawable`, `Serializable`).

- Prefer interfaces over abstract classes for defining contracts.

- Use default methods sparingly.

- Document the contract clearly for implementers.



## When to Use Interfaces

- When multiple unrelated classes need to share common behavior.

- To achieve multiple inheritance of type.

- For dependency inversion and loose coupling.

- When building APIs or plugins.



## Mermaid Diagram



```mermaid

classDiagram

&#x20;   class IDrawable {

&#x20;       <<interface>>

&#x20;       +draw()

&#x20;       +resize(percent)

&#x20;   }

&#x20;   class Circle {

&#x20;       +draw()

&#x20;   }

&#x20;   class Rectangle {

&#x20;       +draw()

&#x20;   }

&#x20;   IDrawable <|.. Circle

&#x20;   IDrawable <|.. Rectangle

```



## Related Concepts

- [Abstraction](../abstraction)

- [Abstract Class](../abstract-class)

- [Polymorphism](../polymorphism)

- [Composition](../composition)



