---
id: Polymorphism
title: "Polymorphism in Object-Oriented Programming"
sidebar_label: "Generate Details about Polymorphism"
description: "
Polymorphism is a core concept in object-oriented programming that allows objects of different classes to be treated as instances of the same class through a shared interface"
tags: [Polymorphism, OOPS, Java]
---

## Polymorphism


Polymorphism is a core concept in object-oriented programming that allows objects of different classes to be treated as instances of the same class through a shared interface. Derived from the Greek words "poly" (meaning "many") and "morph" (meaning "forms"), polymorphism enables a single function, method, or operator to behave differently based on the input object type. There are two primary types of polymorphism: compile-time polymorphism (or method overloading) and runtime polymorphism (or method overriding). Compile-time polymorphism is determined during program compilation, whereas runtime polymorphism is resolved during execution, making it adaptable to various object behaviors.

Refers to the ability of OOPs programming languages to differentiate between entities with the same name efficiently. This is done by Java with the help of the signature and declaration of these entities.

Polymorphism in Java are mainly of 2 types:

### Overloading (Compile time Polymorphism)

Overloading allows different methods to have the same name, but different signatures where the signature can differ by the number of input parameters or type of input parameters or both. Overloading is related to compile-time (or static) polymorphism.

It is also known as static polymorphism. This type of polymorphism is achieved by function overloading or operator overloading.

Method Overloading: When there are multiple functions with same name but different parameters then these functions are said to be overloaded. Functions can be overloaded by change in number of arguments or/and change in type of arguments.

Operator Overloading: Java also provide option to overload operators. For example, we can make the operator (‘+’) for string class to concatenate two strings. We know that this is the addition operator whose task is to add two operands. So a single operator ‘+’ when placed between integer operands, adds them and when placed between string operands, concatenates them.
In java, Only “+” operator can be overloaded:

- To add integers
- To concatenate strings


There are two ways to overload the method in java

- By changing number of arguments
- By changing the data type


 **Method Overloading: changing no. of arguments**


### Overriding (Runtime Polymorphism)
It is also known as Dynamic Method Dispatch. It is a process in which a function call to the overridden method is resolved at Runtime. This type of polymorphism is achieved by Method Overriding.

Method overriding, on the other hand, occurs when a derived class has a definition for one of the member functions of the base class. That base function is said to be overridden.
  
In any object-oriented programming language, Overriding is a feature that allows a subclass or child class to provide a specific implementation of a method that is already provided by one of its super-classes or parent classes. When a method in a subclass has the same name, same parameters or signature and same return type(or sub-type) as a method in its super-class, then the method in the subclass is said to override the method in the super-class.

In other words, If a subclass provides the specific implementation of the method that has been declared by one of its parent class, it is known as method overriding.

Usage
- Method overriding is used to provide the specific implementation of a method which is already provided by its superclass.
- Method overriding is used for runtime polymorphism

Rules 
- The method must have the same name as in the parent class
- The method must have the same parameter as in the parent class.
- There must be an IS-A relationship (inheritance).

Example
```java
class Vehicle{  
  //defining a method  
  void run(){
    System.out.println("Vehicle is running");
  }  
}  

class Bike2 extends Vehicle{  
  void run(){
    System.out.println("Bike is running");
  }  
  
  public static void main(String args[]){  
    Bike2 obj = new Bike2(); 
    obj.run();
  }  
}  

```

```
Output:

Bike is running
```

Can we override static method?
No, a static method cannot be overridden. It can be proved by runtime polymorphism, so we will learn it later, It is because the static method is bound with class whereas instance method is bound with an object. Static belongs to the class area, and an instance belongs to the heap area.

| Parameter	| Method Overloading | Method Overriding |
|---|---|---|
| Polymorphism |	Method Overloading is used to implement Compile time or static polymorphism.	| Method Overriding is used to implement Runtime or dynamic polymorphism.|
| Purpose|	It is used to expand the readability of the program.	| It is used to give the specific implementation of the method which is already provided by its base class|
| Parameter List	| Parameters of the overloaded function must be different in either number or type in case of method overloading	| The number of parameters and type of each parameter must be the same in case of method overriding.|
| Number of Classes	| It occurs within the same class	| It is performed within two classes with an inheritance relationship.| 
| Inheritance |	It may or may not be required for Method Overloading	| It is must for Method Overriding |
| Return Type	| The return type may or may not be the same, but we have to change the parameter.	| Here, the return type must be either the same or of the covariant type.|
|static, final and private methods	| We can overload a static, final or private method in Method Overloading	| We can not override a static, final or private method in Method Overriding|
| Bond	| Static Binding	Dynamic Binding |
| Speed	| It is fast |	It is slower |
| Signature |	The signature must be different	| The signature must be the same |
| Association	| It is usually associated with static programs.	| It is usually associated with object-oriented programs.|
| Performance	Overloading gives better performance than overriding | Lesser  Performance than Overloading because the binding of the overridden method is done at the runtime.|
| Access Modifier	Any access modifier can be used while overloading the methods |	The level of access should be either the same or with a wider scope. |
| Exceptions	| May throw different exceptions. |	May reduce or eliminate exceptions. But, must not throw new or broader checked exceptions but can throw narrower checked exceptions.|

## super

The super keyword in Java is a reference variable which is used to refer immediate parent class object.

Whenever you create the instance of subclass, an instance of parent class is created implicitly which is referred by super reference variable.

Usage 
- **super** can be used to refer immediate parent class instance variable.
- **super** can be used to invoke immediate parent class method.
- **super()** can be used to invoke immediate parent class constructor.

**(super) used to refer immediate parent class instance variable.**

We can use super keyword to access the data member or field of parent class. It is used if parent class and child class have same fields.

```java
class Animal{  
  String color="white";  
  }  
  
  class Dog extends Animal{  
    String color="black";  
    void printColor(){  
      System.out.println(color);//prints color of Dog class  
      System.out.println(super.color);//prints color of Animal class  
    }  
  }

  class TestSuper1 {  
  public static void main(String args[]){  
    Dog d=new Dog();  
    d.printColor();  
  }
}
```

```
Output: 

black
white
```

In the above example, Animal and Dog both classes have a common property color. If we print color property, it will print the color of current class by default. To access the parent property, we need to use super keyword.

**(super) can be used to invoke parent class method**

The super keyword can also be used to invoke parent class method. It should be used if subclass contains the same method as parent class. In other words, it is used if method is overridden.

```java
class Animal{  
  void eat(){System.out.println("eating...");}  
}  

class Dog extends Animal{  
  void eat(){System.out.println("eating bread...");}  
  void bark(){System.out.println("barking...");}  
  void work(){  
  super.eat();  
    bark();  
  } 

} 

class TestSuper2{  
  public static void main(String args[]){  
    Dog d=new Dog();  
    d.work();  
  }
} 
```

```
Output: 

eating...
barking...
```

In the above example Animal and Dog both classes have eat() method if we call eat() method from Dog class, it will call the eat() method of Dog class by default because priority is given to local.

To call the parent class method, we need to use super keyword.

**(super) is used to invoke parent class constructor.**

```java
class Animal{  
  Animal(){System.out.println("animal is created");}  
}  

class Dog extends Animal{  
  Dog(){  
    super();  
    System.out.println("dog is created");  
  }  
} 

class TestSuper3{  
  public static void main(String args[]){  
    Dog d = new Dog();  
  }
}

```

```
Output:

animal is created
dog is created
```

```IMPORTANT``` => super() is added in each class constructor automatically by compiler if there is no super() or this().

Real example
```java
class Person{  
  int id;  
  String name;  
  
  Person(int id,String name){  
    this.id=id;  
    this.name=name;  
  }  
}  
class Emp extends Person{  
  float salary;  
  Emp(int id,String name,float salary){  
    super(id,name);//reusing parent constructor  
    this.salary = salary;  
  }  
  void display(){
    System.out.println(id + " " + name + " " + salary);
  }  
}  

class TestSuper5{  
  public static void main(String[] args){  
    Emp e1 = new Emp(1,"alejo",45000f);  
    e1.display();  
  }
}

```

```
Output:

1 alejo 45000
```

## Instance initializer block

Instance Initializer block is used to initialize the instance data member. It run each time when object of the class is created.
The initialization of the instance variable can be done directly but there can be performed extra operations while initializing the instance variable in the instance initializer block.

Example
```java
class Bike{  
    int speed;  
      
    Bike(){
      System.out.println("speed is " + speed);
    }  
   
    {
      speed=100;
    }  
       
    public static void main(String args[]){  
      Bike7 bike1=new Bike();  
      Bike7 bike2=new Bike();  
    }      
} 

```

```
Output:

speed is 100
speed is 100
```


There are three places in java where you can perform operations:
- method
- constructor
- block

What is invoked first, instance initializer block or constructor?

```java
class Bike{  
    int speed;  
      
    Bike(){
      System.out.println("constructor is invoked");
    }  
   
    {
      System.out.println("instance initializer block invoked");
    }  
       
    public static void main(String args[]){  
      Bike bike1=new Bike();  
      Bike bike2=new Bike();  
    }      
} 

``` 

```
Output: 

instance initializer block invoked
constructor is invoked
instance initializer block invoked
constructor is invoked
```

In the above example, it seems that instance initializer block is firstly invoked but NO. Instance initializer block is invoked at the time of object creation. The java compiler copies the instance initializer block in the constructor after the first statement super(). So firstly, constructor is invoked

```Important``` => The java compiler copies the code of instance initializer block in every constructor.

```java
class X{  
          
    X(){
      System.out.println("constructor");
    }  
   
    {
      System.out.println("instance initializer block invoked");
    }        
}
```

compiler

```java
class X{  
        
    X(){
      super();
      {
        System.out.println("instance initializer block invoked");
      }
      System.out.println("constructor");
    }  
}
```

**Rules**

- There are mainly three rules for the instance initializer block. They are as follows:
- The instance initializer block is created when instance of the class is created.
- The instance initializer block is invoked after the parent class constructor is invoked (i.e. after super() constructor call).
- The instance initializer block comes in the order in which they appear.

Example: Program of instance initializer block that is invoked after super()

```java
class A{  
  A(){  
    System.out.println("parent class constructor invoked");  
    }  
}  

class B2 extends A{  
  B2(){  
    super();  
    System.out.println("child class constructor invoked");  
  }   
  
  {
    System.out.println("instance initializer block is invoked");
  }  
  
  public static void main(String args[]){  
    B2 b=new B2();  
  }  
} 

```

```
Output:

parent class constructor invoked
instance initializer block is invoked
child class constructor invoked
```

## final

The final keyword in java is used to restrict the user. The java final keyword can be used in many context. Final can be:

- variable
- method
- class

The final keyword can be applied with the variables, a final variable that have no value it is called blank final variable or uninitialized final variable. It can be initialized in the constructor only. The blank final variable can be static also which will be initialized in the static block only. We will have detailed learning of these. Let's first learn the basics of final keyword.

**final variable**

If you make any variable as final, you cannot change the value of final variable(It will be constant).


Example

```java
class Car{  
 final int speedLimit = 90; //final variable  
 void run(){  
  speedLimit=400;  
 }  
 public static void main(String args[]){  
 Car obj=new Car();  
 obj.run();  
 }  
}

```

```
Output:

Compile Time Error
```

**final method**

If you make any method as final, you cannot override it.

```java
class Car{  
  final void run(){
    System.out.println("running");
  }  
}  
     
class Honda extends Car{  
   void run(){
     System.out.println("running safely");
    }  
     
   public static void main(String args[]){  
    Honda honda= new Honda();  
    honda.run();  
   }  
} 
```

```
Output:

Compile Time Error
```

**final class**

If you make any class as final, you cannot extend it.

```java
final class Car{}  
  
class Honda extends Car{  
  void run(){
    System.out.println("running safely");
  }  
    
  public static void main(String args[]){  
    Honda honda= new Honda();  
    honda.run();  
  }  
}

```

```
Output:

Compile Time Error
```

## Runtime Polymorphism

Runtime polymorphism or Dynamic Method Dispatch is a process in which a call to an overridden method is resolved at runtime rather than compile-time.

In this process, an overridden method is called through the reference variable of a superclass. The determination of the method to be called is based on the object being referred to by the reference variable.

Let's first understand the upcasting before Runtime Polymorphism.

Upcasting
If the reference variable of Parent class refers to the object of Child class, it is known as upcasting

```java
class A{

}

class B extends A{

} 

A a =new B(); //upcasting
```

Example runtime polymorphism

```java
class Bike{  
  void run(){
    System.out.println("running");
  }  
} 

class Splendor extends Bike{  
  void run(){
    System.out.println("running safely");
  }  
  
  public static void main(String args[]){  
    Bike b = new Splendor(); //upcasting  
    b.run();  
  }  
}

```

```
Output:

running safely
```

Example 2 runtime polymorphism

```java
class Shape{  
  void draw(){
    System.out.println("drawing");
  }  
} 

class Rectangle extends Shape{  
  void draw(){
    System.out.println("drawing rectangle");
  }  
}

class Circle extends Shape{  
  void draw(){
    System.out.println("drawing circle");
  }  
} 

class Triangle extends Shape{  
  void draw(){
    System.out.println("drawing triangle");
  }  
} 

class TestPolymorphism2{  
  public static void main(String args[]){  
    Shape s;  
    s = new Rectangle();  
    s.draw();  
    s = new Circle();  
    s.draw();  
    s = new Triangle();  
    s.draw();  
  }  
} 

```

```
Output: 

drawing rectangle
drawing circle
drawing triangle
```

Example polymorphism with multilevel inheritance

```java
class Animal{  
  void eat(){
    System.out.println("eating");
  }  
}  

class Dog extends Animal{  
  void eat(){
    System.out.println("eating fruits");
  }  
} 

class BabyDog extends Dog{  
  void eat(){
    System.out.println("drinking milk");
  }  

  public static void main(String args[]){  
    Animal a1,a2,a3;  
    a1 = new Animal();  
    a2 = new Dog();  
    a3 = new BabyDog();  
    a1.eat();  
    a2.eat();  
    a3.eat();  
  }  
}
```
