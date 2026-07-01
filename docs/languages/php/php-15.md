---
id: "interfaces-and-traits"
sidebar_position: 15
title: "Interfaces and Traits in php"
sidebar_label: "Interfaces & Traits"
description: "Learn how to use interfaces and traits in php to implement contracts, share reusable methods, and work around single inheritance limitations."
tags: [php, interfaces, traits, oop]
---

Interfaces define a contract that implementing classes must follow. Traits allow you to reuse methods across multiple classes without inheritance.

## Interfaces

An interface declares method signatures without implementing them. Any class that `implements` the interface must define all its methods.

## Video Explanation

<LiteYouTubeEmbed
  id="qOzQbnDaMng"
  params="autoplay=1&autohide=1&showinfo=0&rel=0"
  title="PHP OOP Interfaces Tutorial in Hindi / Urdu"
  lazyLoad={true}
  webp
/>

```php
<?php
interface Printable {
    public function print(): void;
}

interface Saveable {
    public function save(): void;
}
?>
```

### Implementing an Interface

```php
<?php
interface Shape {
    public function area(): float;
    public function perimeter(): float;
}

class Circle implements Shape {
    public function __construct(private float $radius) {}

    public function area(): float {
        return M_PI * $this->radius ** 2;
    }

    public function perimeter(): float {
        return 2 * M_PI * $this->radius;
    }
}

$c = new Circle(5);
echo $c->area();      // 78.539...
echo $c->perimeter(); // 31.415...
?>
```

* * *

## Implementing Multiple Interfaces

A class can implement more than one interface:

```php
<?php
interface Greetable {
    public function greet(): string;
}

interface Farewell {
    public function bye(): string;
}

class EnglishSpeaker implements Greetable, Farewell {
    public function greet(): string {
        return "Hello!";
    }

    public function bye(): string {
        return "Goodbye!";
    }
}

$s = new EnglishSpeaker();
echo $s->greet(); // Hello!
echo $s->bye();   // Goodbye!
?>
```

* * *

## Interface Constants

Interfaces can define constants:

```php
<?php
interface Status {
    const ACTIVE   = 1;
    const INACTIVE = 0;
}

class User implements Status {
    public function getStatus() {
        return self::ACTIVE;
    }
}

echo User::ACTIVE; // 1
?>
```

* * *

## Interface Extending Interfaces

```php
<?php
interface Readable {
    public function read(): string;
}

interface Writable extends Readable {
    public function write(string $data): void;
}
?>
```

* * *

## Traits

Traits are a mechanism for code reuse. A trait is like a class but cannot be instantiated. It is inserted into a class using the `use` keyword.

## Video Explanation

<LiteYouTubeEmbed
  id="OJ5fmrMMcDU"
  params="autoplay=1&autohide=1&showinfo=0&rel=0"
  title="PHP OOP Traits Tutorial in Hindi / Urdu"
  lazyLoad={true}
  webp
/>

```php
<?php
trait Logger {
    public function log(string $message): void {
        echo "[LOG] $message\n";
    }
}

class UserService {
    use Logger;

    public function createUser(string $name): void {
        $this->log("Creating user: $name");
    }
}

$service = new UserService();
$service->createUser("Alice");
// [LOG] Creating user: Alice
?>
```

* * *

## Using Multiple Traits

```php
<?php
trait Timestampable {
    public function getTimestamp(): string {
        return date("Y-m-d H:i:s");
    }
}

trait Auditable {
    abstract public function getTimestamp(): string;

    public function audit(string $action): void {
        echo "Action: $action at " . $this->getTimestamp();
    }
}

class Order {
    use Timestampable, Auditable;
}

$order = new Order();
$order->audit("Created");
?>
```

* * *

## Trait vs Interface vs Abstract Class

| Feature | Interface | Trait | Abstract Class |
|---------|-----------|-------|----------------|
| Can have method body | No (php 8+ default methods: No) | Yes | Yes |
| Can be instantiated | No | No | No |
| Multiple use | Yes (implements many) | Yes (use many) | No (extends one) |
| Properties | Constants only | Yes | Yes |
| Purpose | Contract / Type | Code reuse | Shared base |

* * *

## Conflict Resolution in Traits

If two traits define the same method, you must resolve the conflict:

```php
<?php
trait A {
    public function hello() { echo "Hello from A"; }
}

trait B {
    public function hello() { echo "Hello from B"; }
}

class C {
    use A, B {
        A::hello insteadof B;   // use A's version
        B::hello as helloFromB; // alias B's version
    }
}

$c = new C();
$c->hello();        // Hello from A
$c->helloFromB();   // Hello from B
?>
```

**Tip:** Use interfaces to define contracts (what a class must do) and traits to share concrete behavior (how it does it).