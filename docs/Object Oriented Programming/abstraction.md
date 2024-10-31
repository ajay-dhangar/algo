---
id: abstraction
title: "Abstraction in Object-Oriented Programming"
sidebar_label: "Generate Details about Abstraction"
description: "Abstraction in Java is the process of hiding unnecessary implementation details from the user, focusing on exposing only the essential functionalities"
tags: [Abstraaction, OOPS, Java]
---

<Ads />

- In simple terms, abstraction “displays” only the relevant attributes of objects and “hides” the unnecessary details.

- It is the process of hiding internal implementation details from the user and providing only necessary functionality. It removes all non-essential items and shows only important ones to users.

For example, when we are driving a car, we are only concerned about the basics, such as starting/stopping the car, accelerating/breaking, etc. We are not concerned about how the actual start/stop mechanism or acceleration/brake process works internally. We are just not interested in those details.

In other words, Abstraction in Java is a technique by which we can hide the data that is not required to a user

Abstraction forces to use Inheritance

Example

In our daily lives, we all use an ATM for cash withdrawals, money transfers, retrieving min-statements, etc. But we don't know internally what things are happening inside ATM when you insert an ATM card for performing any kind of operations.

## Abstraction in Java

There are two ways to achieve abstraction in Java. They are as follows:
* 1. Abstract class (0 to 100%)
* 2. Interface (100%)

### Advantages

  **1**. It reduces the complexity of viewing things.
  **2**. Avoids code duplication and increases reusability.
  **3**. Helps to increase the security of an application or program as only important details are provided to the user.
  **4**. Programmers can implement abstract methods to perform different tasks depending on the need. 

<Ads />

### Abstract Class in Java

An abstract class is a class, that is declared with the `abstract` keyword. It is just like a normal class but has two differences.

* 1. We cannot create an object of this class. Only objects of its non-abstract (or concrete) sub-classes can be created.
 
 * 2. It can have zero or more abstract methods which are not allowed in a non-abstract class (concrete class).

Key points:
* 1. The abstract is a non-access modifier in java which is applicable for classes, interfaces, methods, and inner classes. It represents an incomplete class which depends on subclasses for its implementation. Creating a subclass is compulsory for abstract classes.
- 2. A non-abstract class is sometimes called a concrete class.
- 3. An abstract concept does not apply to variables.

:::tip
An abstract class can have a data member, abstract method, method body (non-abstract method), constructor, and even main() method.
:::

### Abstract Method in Java
A method which is declared with abstract modifier and has no implementation (means no body) is called an abstract method in java. It does not contain any body. It has simply a signature declaration followed by a semicolon. It has the following general form as given below.

Syntax:
```java
    abstract type MethodName(arguments); // No body <br>
```
For example:
```java
    abstract void msg(); // No body. <br>
```
Since the abstract method does not contain any body. Therefore, it is also known as an incomplete method in java.
A non-abstract class cannot have an abstract method whether it is inherited or declared. In Java.

Key points:
- 1. The abstract method cannot be static.
- 2. It cannot be private because the abstract method must be implemented in the subclass. If we declare it as private, we cannot implement it from outside the class.
- 3. A concrete method is a method which has always the body. It is also called a complete method in java.


- Declares the existence of methods but not the implementation of those.
- An abstract class defines behaviours that can vary due to polymorphism and that each explicit class that inherits from it must implement depending on its specific need.
- You cannot have an instance of an abstract class
- For a class to be abstract at least one of its methods must be abstract (this is the difference between a conventional class and an abstract class)
- An abstract class cannot be instantiated but it can be inherited (Objects cannot be created directly with new)
- Its use depends on the application of the concept of Inheritance
- The first concrete subclass that inherits from an abstract class must implement all the superclass's methods
- An abstract method does not define how it will behave since this logic is put in the classes that will implement the method

An abstract class forces you to use inheritance

<Ads />

Example Abstract class

```java
abstract class Car{  
  abstract void run();  
}  

class Honda extends Car{  
  void run(){
    System.out.println("running safely");
  }  

  public static void main(String args[]){  
    Bike obj = new Honda4();  
    obj.run();  
  }  
} 
```

Another example

```java
//Example of an abstract class that has abstract and non-abstract methods  
abstract class Car{  
  Bike(){System.out.println("car is created");}  
  abstract void run();  
  void changeGear(){
    System.out.println("gear changed");
  }  
}  
//Creating a Child class which inherits Abstract class  
class Honda extends Car{  
  void run(){
    System.out.println("running safely");
}  
}  
//Creating a Test class which calls abstract and non-abstract methods  
class TestAbstraction2{  
  public static void main(String args[]){  
    Bike obj = new Honda();  
    obj.run();  
    obj.changeGear();  
  }  
} 

//RESULT
bike is created
running safely
gear changed
```

## Interface

Another way to achieve abstraction in Java is with interfaces.

The interface in Java is a mechanism to achieve abstraction. There can be only abstract methods in the Java interface, not a method body. It is used to achieve abstraction and multiple inheritance in Java.

- It is an abstract class, that is, it cannot be instantiated
- Since Java 8, we can have default and static methods in an interface.
- Since Java 9, we can have private methods in an interface.
- It has a list of methods that have no definition. So the methods are abstract (they have no functionality)
- Java interface is a collection of abstract methods

An ```interface``` is a completely "abstract class" that is used to group related methods with empty bodies:

Example:

```java
// Interface
interface Animal {
  public void sound(); // interface method (does not have a body)
  public void sleep(); // interface method (does not have a body)
}

// Cat "implements" the Animal interface
class Cat implements Animal {
  public void sound() {
    // The body of sound() is provided here
    System.out.println("The cat says: Miau");
  }
  public void sleep() {
    // The body of sleep() is provided here
    System.out.println("Zzz");
  }
}

class Main {
  public static void main(String[] args) {
    Cat myCat = new Cat();  // Create a Cat object
    myCat.animalSound();
    myCat.sleep();
  }
}
```

<Ads />

### Multiple Interfaces 

Example:

```java
interface FirstInterface {
  public void myMethod(); // interface method
}

interface SecondInterface {
  public void myOtherMethod(); // interface method
}

class DemoClass implements FirstInterface, SecondInterface {
  public void myMethod() {
    System.out.println("Some text..");
  }
  public void myOtherMethod() {
    System.out.println("Some other text...");
  }
}

class Main {
  public static void main(String[] args) {
    DemoClass myObj = new DemoClass();
    myObj.myMethod();
    myObj.myOtherMethod();
  }
}
```

**About Information:**
- Like abstract classes, interfaces cannot be used to create objects (in the example above, it is not possible to create an "Animal" object in the MyMainClass)
- Interface methods do not have a body - the body is provided by the "implement" class
- On implementation of an interface, you must override all of its methods
- Interface methods are by default ```abstract``` and ```public```
- Interface attributes are by default ```public```, ```static``` and ```final```
- An interface cannot contain a constructor (as it cannot be used to create objects)

**Why And When To Use Interfaces?**

  - To achieve security - hide certain details and only show the important details of an object (interface).
  - Java does not support "multiple inheritance" (a class can only inherit from one superclass). However, it can be achieved with interfaces, because the class can implement multiple interfaces. Note: To implement multiple interfaces, separate them with a comma (see example below).
  - It can be used to achieve loose coupling.

<Ads />


## The relationship between classes and interfaces

As shown in the figure given below, a class extends another class, an interface extends another interface, but a class implements an interface.


<p align="center">
<img height="350" src="https://user-images.githubusercontent.com/13514156/120521854-a4ab4600-c39a-11eb-93e1-1bdf9fee8769.jpeg" />
</p>

Example

```java
interface Bank{  
float rateOfInterest();  
}  
class SBI implements Bank{  
public float rateOfInterest(){return 9.15f;}  
}  
class PNB implements Bank{  
public float rateOfInterest(){return 9.7f;}  
}  
class TestInterface2{  
public static void main(String[] args){  
Bank b=new SBI();  
System.out.println("ROI: "+b.rateOfInterest());  
}}  
```

<Ads />

## Multiple inheritance in Java by interface

If a class implements multiple interfaces, or an interface extends multiple interfaces, it is known as multiple inheritance.

<p align="center">
<img height="350" src="https://user-images.githubusercontent.com/13514156/120522069-b4c32580-c39a-11eb-9c48-6331fe379440.png" />
</p>

:::tip
Multiple inheritance is not supported through class in Java, but it is possible by an interface.
:::

As we have explained in the inheritance chapter, multiple inheritance is not supported in the case of class because of ambiguity. However, it is supported in case of an interface because there is no ambiguity. It is because its implementation is provided by the implementation class. For example:

```java
interface Printable{  
void print();  
}  
interface Showable{  
void print();  
}  
  
class TestInterface3 implements Printable, Showable{  
public void print(){System.out.println("Hello");}  
public static void main(String args[]){  
TestInterface3 obj = new TestInterface3();  
obj.print();  
 }  
} 
```

<Ads />

## Interface inheritance

A class implements an interface, but one interface extends another interface.

```java
interface Printable{  
void print();  
}  
interface Showable extends Printable{  
void show();  
}  
class TestInterface4 implements Showable{  
public void print(){System.out.println("Hello");}  
public void show(){System.out.println("Welcome");}  
  
public static void main(String args[]){  
TestInterface4 obj = new TestInterface4();  
obj.print();  
obj.show();  
 }  
}  
```

<Ads />

## Default Method in Interface

```java
interface Drawable{  
void draw();  
default void msg(){System.out.println("default method");}  
}  
class Rectangle implements Drawable{  
public void draw(){System.out.println("drawing rectangle");}  
}  
class TestInterfaceDefault{  
public static void main(String args[]){  
Drawable d=new Rectangle();  
d.draw();  
d.msg();  
}} 

// RESULT 
drawing rectangle
default method
```

<Ads />

## Static Method in Interface

Since Java 8, we can have static methods in the interface

```java
interface Drawable{  
void draw();  
static int cube(int x){return x*x*x;}  
}  
class Rectangle implements Drawable{  
public void draw(){System.out.println("drawing rectangle");}  
}  
  
class TestInterfaceStatic{  
public static void main(String args[]){  
Drawable d=new Rectangle();  
d.draw();  
System.out.println(Drawable.cube(3));  
}} 
```

<Ads />

## Difference between abstract class and interface

The main difference between interface and abstract class is that an interface provides an encapsulation mechanism for method protocols without forcing the user to use inheritance.

However, there are many differences between abstract class and interface that are given below.

| Abstract class	| Interface|
|---|---|
| Abstract class can have abstract and non-abstract methods. |	Interface can have only abstract methods. Since Java 8, it can have default and static methods also.|
| Abstract class doesn't support multiple inheritance. | Interface supports multiple inheritance.|
| Abstract class can have final, non-final, static and non-static variables.	| Interface has only static and final variables.|
| Abstract class can provide the implementation of an interface.	| Interface can't provide the implementation of an abstract class.|
| The abstract keyword is used to declare an abstract class.	| The interface keyword is used to declare an interface.|
| An abstract class can extend another Java class and implement multiple Java interfaces.	| An interface can extend another Java interface only.|
| An abstract class can be extended using the keyword "extends".	| An interface can be implemented using the keyword "implements".|
| A Java abstract class can have class members like private, protected, etc.	| Members of a Java interface are public by default.|
| An abstract class can inherit from a single class (abstract or not) | Interface can extend several interfaces at the same time. |
| An abstract class can have methods that are or are not abstract | Interfaces can only and exclusively define abstract methods or a default method |
| In abstract classes the word abstract is mandatory to define an abstract method (as well as the class) | When you define an interface, this word is optional since it is inferred in the concept of interface.|
| Abstract classes, unlike interfaces, can have constructors, and default method implementations and can only be inherited once from these. | Although in java 8, default implementations are allowed, they cannot contain constructors. In the case of interfaces, if you can implement multiple of these |
| Abstract classes are more used for base-type objects. It is like the parent in the hierarchy in a set of objects that share the same parent. | The interfaces are known as a contract. This is because they force you to implement their methods, which ensures all business logic that every object that implements it will have access to the methods defined in it. |
| Abstract think more about objects | Interface think more about implementation |

| parameters | Abstract class | Interface |
|---|---|---|
| keyword used | abstract  | interface |
| Type of variable | static and non-static | static |
| Access modifiers | All access modifiers |  Only public acces modifiers |
| speed | Fast | Slow |
| When to used | To avoid independence | For future Enhancement |
