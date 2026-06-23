---

id: abstract-class

title: Abstract Class

sidebar_label: Abstract Class

sidebar_position: 7

description: Learn about abstract classes in object-oriented programming, their purpose, implementation in languages like Java, and best practices.

tags: [oop, java, python, csharp, inheritance, polymorphism]

---



# Abstract Class



An **abstract class** is a class that cannot be instantiated on its own and is designed to be inherited by other classes. It serves as a blueprint for subclasses, often containing abstract methods that must be implemented by derived classes.



## Key Concepts



### 1. Purpose of Abstract Classes

- **Code Reusability**: Provide common functionality that subclasses can inherit.

- **Enforce Contract**: Define abstract methods that subclasses **must** implement.

- **Partial Implementation**: Can have both concrete and abstract methods.

- **Polymorphism Support**: Enable runtime polymorphism through inheritance.



### 2. Characteristics

- Cannot be instantiated directly (`new AbstractClass()` is invalid).

- Can have constructors (called by subclasses).

- Can contain:

&#x20; - Abstract methods (no body).

&#x20; - Concrete methods (with implementation).

&#x20; - Fields (variables).

&#x20; - Static methods and variables.



## Abstract Class in Java



```java

// Abstract class example

public abstract class Shape {

&#x20;   // Concrete field

&#x20;   protected String color;

&#x20;   

&#x20;   // Constructor

&#x20;   public Shape(String color) {

&#x20;       this.color = color;

&#x20;   }

&#x20;   

&#x20;   // Abstract method

&#x20;   public abstract double calculateArea();

&#x20;   

&#x20;   // Concrete method

&#x20;   public void displayColor() {

&#x20;       System.out.println("Color: " + color);

&#x20;   }

}



// Subclass implementing abstract method

public class Circle extends Shape {

&#x20;   private double radius;

&#x20;   

&#x20;   public Circle(String color, double radius) {

&#x20;       super(color);

&#x20;       this.radius = radius;

&#x20;   }

&#x20;   

&#x20;   @Override

&#x20;   public double calculateArea() {

&#x20;       return Math.PI * radius * radius;

&#x20;   }

}

```



### Usage

```java

public class Main {

&#x20;   public static void main(String[] args) {

&#x20;       Shape circle = new Circle("Red", 5.0);

&#x20;       circle.displayColor();

&#x20;       System.out.println("Area: " + circle.calculateArea());

&#x20;   }

}

```



## Abstract Class in Python



Python uses the `abc` module for abstract classes.



```python

from abc import ABC, abstractmethod



class Shape(ABC):

&#x20;   def __init__(self, color):

&#x20;       self.color = color

&#x20;   

&#x20;   @abstractmethod

&#x20;   def calculate_area(self):

&#x20;       pass

&#x20;   

&#x20;   def display_color(self):

&#x20;       print(f"Color: {self.color}")



class Circle(Shape):

&#x20;   def __init__(self, color, radius):

&#x20;       super().__init__(color)

&#x20;       self.radius = radius

&#x20;   

&#x20;   def calculate_area(self):

&#x20;       return 3.14159 * self.radius ** 2

```



## Comparison with Interfaces



| Feature              | Abstract Class                  | Interface                     |

|----------------------|---------------------------------|-------------------------------|

| Methods             | Abstract + Concrete            | All abstract (default)       |

| Variables           | Can have instance variables    | Only constants               |

| Constructors        | Supported                      | Not supported                |

| Multiple Inheritance| Single (extends)               | Multiple (implements)        |

| Access Modifiers    | Public, protected, private     | Public                       |



## Best Practices

- Use abstract classes when you want to share code among closely related classes.

- Keep abstract classes focused on a single responsibility.

- Document abstract methods clearly for implementers.

- Avoid deep inheritance hierarchies.



## When to Use Abstract Classes

- When multiple classes share common behavior but have different implementations for certain methods.

- To provide a template for subclasses while enforcing specific method implementations.



## Mermaid Diagram: Inheritance



```mermaid

classDiagram

&#x20;   class Shape {

&#x20;       +String color

&#x20;       +calculateArea() double*

&#x20;       +displayColor()

&#x20;   }

&#x20;   class Circle {

&#x20;       +double radius

&#x20;       +calculateArea() double

&#x20;   }

&#x20;   class Rectangle {

&#x20;       +double width

&#x20;       +double height

&#x20;       +calculateArea() double

&#x20;   }

&#x20;   Shape <|-- Circle

&#x20;   Shape <|-- Rectangle

```



## Related Concepts

- [Inheritance](../inheritance)

- [Polymorphism](../polymorphism)

- [Interfaces](../interfaces)





