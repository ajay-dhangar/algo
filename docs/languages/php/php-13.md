---
id: "classes-and-objects"
sidebar_position: 13
title: "Classes and Objects in php"
sidebar_label: "Classes & Objects"
description: "Object-Oriented Programming in php. Learn how to define classes, create objects, use constructors, properties, and methods."
tags: [php, oop, classes, objects, constructor]
---

php supports Object-Oriented Programming (OOP). A class is a blueprint for objects. An object is an instance of a class.

## Defining a Class

```php
<?php
class Car {
    public $brand;
    public $color;
    public $speed = 0;

    public function accelerate($amount) {
        $this->speed += $amount;
    }

    public function getSpeed() {
        return $this->speed;
    }
}
?>
```

* * *

## Creating Objects

```php
<?php
$car1 = new Car();
$car1->brand = "Toyota";
$car1->color = "Red";
$car1->accelerate(60);

echo $car1->brand;       // Toyota
echo $car1->getSpeed();  // 60
?>
```

* * *

## The Constructor

The `__construct()` method is automatically called when an object is created:

```php
<?php
class Person {
    public $name;
    public $age;

    public function __construct($name, $age) {
        $this->name = $name;
        $this->age  = $age;
    }

    public function introduce() {
        echo "Hi, I'm {$this->name} and I'm {$this->age} years old.";
    }
}

$person = new Person("Alice", 30);
$person->introduce();
// Hi, I'm Alice and I'm 30 years old.
?>
```

* * *

## The Destructor

Called automatically when an object is destroyed or the script ends:

```php
<?php
class Logger {
    public function __construct() {
        echo "Logger started.<br>";
    }

    public function __destruct() {
        echo "Logger destroyed.<br>";
    }
}

$log = new Logger(); // Logger started.
// Logger destroyed. (at end of script)
?>
```

* * *

## Access Modifiers

| Modifier | Accessible From |
|----------|-----------------|
| `public` | Anywhere |
| `protected` | Class and subclasses |
| `private` | Only within the class |

```php
<?php
class BankAccount {
    public $owner;
    protected $balance;
    private $pin;

    public function __construct($owner, $balance, $pin) {
        $this->owner   = $owner;
        $this->balance = $balance;
        $this->pin     = $pin;
    }

    public function getBalance() {
        return $this->balance;
    }
}

$acc = new BankAccount("Alice", 10000, 1234);
echo $acc->owner;        // Alice
echo $acc->getBalance(); // 10000
// echo $acc->pin;       // Error: private
?>
```

* * *

## Getters and Setters

Used to control access to private/protected properties:

```php
<?php
class Product {
    private $price;

    public function getPrice() {
        return $this->price;
    }

    public function setPrice($price) {
        if ($price > 0) {
            $this->price = $price;
        }
    }
}

$p = new Product();
$p->setPrice(299);
echo $p->getPrice(); // 299
?>
```

* * *

## Static Properties and Methods

Static members belong to the class, not individual instances:

```php
<?php
class Counter {
    public static $count = 0;

    public static function increment() {
        self::$count++;
    }
}

Counter::increment();
Counter::increment();
echo Counter::$count; // 2
?>
```

* * *

## Constants in a Class

```php
<?php
class MathConstants {
    const PI = 3.14159;
    const E  = 2.71828;
}

echo MathConstants::PI; // 3.14159
?>
```

* * *

## `$this` Keyword

`$this` refers to the current object inside a class method:

```php
<?php
class Greeting {
    private $message;

    public function __construct($msg) {
        $this->message = $msg;
    }

    public function show() {
        echo $this->message;
    }
}

$g = new Greeting("Hello from OOP!");
$g->show();
?>
```

**Note:** php OOP concepts such as inheritance, interfaces, traits, and abstract classes build on top of this foundation.