---

id: delegation

title: Delegation

sidebar_label: Delegation

sidebar_position: 7

description: Learn about Delegation in Object-Oriented Programming, how it enables code reuse through object collaboration, implementation examples, and comparison with inheritance.

tags: [oop, delegation, composition, design-patterns, java, python, csharp]

---



# Delegation



**Delegation** is a design technique in Object-Oriented Programming where an object forwards (delegates) a method call or responsibility to another object. It is a form of composition that promotes loose coupling and flexible code reuse.



## Key Concepts



### What is Delegation?

- One object **delegates** work to another "helper" or "delegate" object.

- Represents a "has-a" relationship where the delegating class uses the functionality of the delegate without inheriting from it.

- Common in many design patterns (e.g., Strategy, Proxy, Decorator).



### Delegation vs Inheritance

- **Inheritance**: "Is-a" relationship with tight coupling.

- **Delegation**: "Uses" or "has-a" relationship with greater flexibility.



| Feature              | Delegation                          | Inheritance                        |

|----------------------|-------------------------------------|------------------------------------|

| Relationship         | Has-a / Uses-a                      | Is-a                               |

| Coupling             | Loose                               | Tight                              |

| Flexibility          | High (runtime changes possible)     | Low (compile-time fixed)           |

| Code Reuse           | Excellent via composition           | Good, but can lead to hierarchy issues |

| Maintenance          | Easier                              | Can cause fragile base class problem |



## Delegation in Java



```java

// Delegate class

public class Printer {

&#x20;   public void print(String message) {

&#x20;       System.out.println("Printing: " + message);

&#x20;   }

}



// Delegating class

public class Document {

&#x20;   private Printer printer;  // Delegation via composition

&#x20;   

&#x20;   public Document() {

&#x20;       this.printer = new Printer();

&#x20;   }

&#x20;   

&#x20;   public void printDocument(String content) {

&#x20;       // Delegate the printing responsibility

&#x20;       printer.print(content);

&#x20;   }

}

```



### Usage Example

```java

public class Main {

&#x20;   public static void main(String[] args) {

&#x20;       Document doc = new Document();

&#x20;       doc.printDocument("Hello, Delegation!");

&#x20;   }

}

```



## Delegation in Python



```python

class Printer:

&#x20;   def print(self, message):

&#x20;       print(f"Printing: {message}")



class Document:

&#x20;   def __init__(self):

&#x20;       self.printer = Printer()  # Delegation

&#x20;   

&#x20;   def print_document(self, content):

&#x20;       # Delegate the task

&#x20;       self.printer.print(content)



# Usage

if __name__ == "__main__":

&#x20;   doc = Document()

&#x20;   doc.print_document("Hello, Delegation!")

```



## Delegation in C#



```csharp

public class Printer

{

&#x20;   public void Print(string message)

&#x20;   {

&#x20;       Console.WriteLine($"Printing: {message}");

&#x20;   }

}



public class Document

{

&#x20;   private Printer printer;  // Delegation

&#x20;   

&#x20;   public Document()

&#x20;   {

&#x20;       this.printer = new Printer();

&#x20;   }

&#x20;   

&#x20;   public void PrintDocument(string content)

&#x20;   {

&#x20;       // Delegate responsibility

&#x20;       printer.Print(content);

&#x20;   }

}

```



## Benefits of Delegation

- **Loose Coupling**: Objects are not tightly bound by inheritance.

- **Runtime Flexibility**: Can change delegate behavior dynamically.

- **Better Reusability**: Delegate classes can be shared across multiple contexts.

- **Easier Testing**: Individual components can be mocked easily.

- **Avoids Inheritance Pitfalls**: Prevents deep or complex hierarchies.



## Best Practices

- Use delegation when you need behavior from another class without being a subtype.

- Prefer composition + delegation over inheritance ("Favor composition over inheritance").

- Keep delegation interfaces clean and focused.

- Consider dependency injection for injecting delegates.



## When to Use Delegation

- When implementing Strategy pattern or similar behavioral patterns.

- When a class needs functionality from multiple unrelated sources.

- To achieve runtime polymorphism without inheritance.

- Building flexible systems where behavior can change at runtime.



## Mermaid Diagram

```mermaid

classDiagram

&#x20;   class Printer {

&#x20;       +print(message)

&#x20;   }

&#x20;   class Document {

&#x20;       -Printer printer

&#x20;       +printDocument(content)

&#x20;   }

&#x20;   Document o-- Printer : delegates to

```



## Related Concepts

- [Composition](../composition)

- [Inheritance](../inheritance)

- [Encapsulation](../encapsulation)

- [Classes](../classes)



