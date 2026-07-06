---
id: "inheritance-in-php"
sidebar_position: 14
title: "Inheritance in php"
sidebar_label: "Inheritance"
description: "Inheritance allows a class to reuse properties and methods of another class. Learn single inheritance, method overriding, and the parent keyword in php."
tags: [php, inheritance, oop, extends, parent]
---

Inheritance lets a class inherit properties and methods from another class. The child class `extends` the parent class.

## Video Explanation

<LiteYouTubeEmbed
  id="X6xY4Ouydas"
  params="autoplay=1&autohide=1&showinfo=0&rel=0"
  title="4: Visibility And Inheritance In OOP PHP | OOP Scopes | Object Oriented PHP Tutorial | PHP Tutorial"
  lazyLoad={true}
  webp
/>

## Basic Inheritance

```php
<?php
class Animal {
    public $name;

    public function __construct($name) {
        $this->name = $name;
    }

    public function speak() {
        echo "{$this->name} makes a sound.";
    }
}

class Dog extends Animal {
    public function speak() {
        echo "{$this->name} barks!";
    }
}

$dog = new Dog("Rex");
$dog->speak(); // Rex barks!
?>
```

* * *

## Inheriting Properties and Methods

The child class automatically inherits all `public` and `protected` members of the parent:

```php
<?php
class Vehicle {
    public $brand;
    public $speed;

    public function __construct($brand, $speed) {
        $this->brand = $brand;
        $this->speed = $speed;
    }

    public function describe() {
        echo "{$this->brand} runs at {$this->speed} km/h.";
    }
}

class Car extends Vehicle {
    public $doors;

    public function __construct($brand, $speed, $doors) {
        parent::__construct($brand, $speed);
        $this->doors = $doors;
    }

    public function describe() {
        parent::describe();
        echo " It has {$this->doors} doors.";
    }
}

$car = new Car("Honda", 180, 4);
$car->describe();
// Honda runs at 180 km/h. It has 4 doors.
?>
```

* * *

## The `parent::` Keyword

Used to call the parent class's constructor or methods:

```php
<?php
class Shape {
    public $color;

    public function __construct($color) {
        $this->color = $color;
    }

    public function info() {
        echo "Color: {$this->color}";
    }
}

class Circle extends Shape {
    public $radius;

    public function __construct($color, $radius) {
        parent::__construct($color); // call parent constructor
        $this->radius = $radius;
    }

    public function info() {
        parent::info();
        echo ", Radius: {$this->radius}";
    }
}

$c = new Circle("red", 5);
$c->info(); // Color: red, Radius: 5
?>
```

* * *

## Method Overriding

A child class can override a parent method with the same name:

```php
<?php
class Bird {
    public function move() {
        echo "Birds fly.";
    }
}

class Penguin extends Bird {
    public function move() {
        echo "Penguins swim instead.";
    }
}

$p = new Penguin();
$p->move(); // Penguins swim instead.
?>
```

* * *

## Abstract Classes

An abstract class cannot be instantiated and may contain abstract methods that must be implemented by child classes:

```php
<?php
abstract class Shape {
    abstract public function area(): float;

    public function describe() {
        echo "This shape has area: " . $this->area();
    }
}

class Rectangle extends Shape {
    public function __construct(
        private float $width,
        private float $height
    ) {}

    public function area(): float {
        return $this->width * $this->height;
    }
}

$rect = new Rectangle(5.0, 3.0);
$rect->describe(); // This shape has area: 15
?>
```

* * *

## The `final` Keyword

Prevents a class from being extended, or a method from being overridden:

```php
<?php
class Base {
    final public function lock() {
        echo "Cannot override this.";
    }
}

// class Child extends Base { } // Error if you try to override lock()
?>
```

```php
<?php
final class Singleton {
    // This class cannot be extended
}
?>
```

* * *

## Multilevel Inheritance

php supports multilevel inheritance (A → B → C):

```php
<?php
class A {
    public function hello() { echo "Hello from A"; }
}

class B extends A {
    public function world() { echo "Hello from B"; }
}

class C extends B {
    public function greet() {
        $this->hello(); // inherited from A
        $this->world(); // inherited from B
    }
}

$obj = new C();
$obj->greet();
?>
```

**Note:** php does **not** support multiple inheritance (a class cannot extend more than one class). Use interfaces or traits to achieve similar results.