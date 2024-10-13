---  
id: usage-of-python-classes  
sidebar_position: 8
title: Classes in Python  
sidebar_label: Classes in Python  
---

Hey there! In this guide, we'll explore classes in Python. Classes are a fundamental part of object-oriented programming in Python. Let's dive in!

# Python Classes


* Python supports object-oriented programming, and classes are a fundamental part of this paradigm.

* A class is a blueprint for creating objects, defining their attributes and methods.
## 1. Creating a Simple Class


Here's how to define a simple class with attributes and methods.  
```python  
class Dog:                                   # Define a class named Dog  
    def __init__(self, name, age):          # Constructor method to initialize attributes  
        self.name = name                     # Assign name to the instance  
        self.age = age                       # Assign age to the instance  
    def bark(self):                         # Method to make the dog bark  
        return 'Woof!'                      # Return barking sound  
```
## 2. Creating an Object


You can create an object (instance) of the class like this:  
```python  
my_dog = Dog('Buddy', 3)                   # Create an instance of Dog class  
print(my_dog.name)                        # Access the name attribute: Buddy  
print(my_dog.age)                         # Access the age attribute: 3  
print(my_dog.bark())                     # Call the bark method: Woof!  
```
## 3. Class Inheritance


Classes can inherit attributes and methods from other classes.  
```python  
class Animal:                               # Base class  
    def __init__(self, species):            # Constructor for species  
        self.species = species              # Assign species to the instance  
class Cat(Animal):                          # Cat class inherits from Animal  
    def __init__(self, name, age):         # Constructor method for Cat  
        super().__init__('Cat')            # Call the base class constructor  
        self.name = name                     # Assign name to the instance  
        self.age = age                       # Assign age to the instance  
    def meow(self):                        # Method to make the cat meow  
        return 'Meow!'                      # Return meowing sound  
```
## 4. Creating an Inherited Object


You can create an object of the inherited class like this:  
```python  
my_cat = Cat('Whiskers', 2)                # Create an instance of Cat class  
print(my_cat.species)                     # Access inherited species attribute: Cat  
print(my_cat.name)                        # Access name attribute: Whiskers  
print(my_cat.meow())                     # Call the meow method: Meow!  
```
## 5. Class Methods and Static Methods


You can define class methods and static methods in a class.  
```python  
class MathOperations:                      # Define a class for math operations  
    @staticmethod                           # Static method decorator  
    def add(x, y):                         # Static method to add two numbers  
        return x + y                      # Return the sum  
    @classmethod                            # Class method decorator  
    def multiply(cls, x, y):               # Class method to multiply two numbers  
        return x * y                      # Return the product  
```
## 6. Using Class and Static Methods


Here's how to use the class and static methods:  
```python  
sum_result = MathOperations.add(5, 10)    # Call the static method: 15  
product_result = MathOperations.multiply(5, 10) # Call the class method: 50  
print(sum_result)                        # Output the sum result  
print(product_result)                   # Output the product result  
```