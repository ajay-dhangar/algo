---
id: "php-oop-best-practices"
sidebar_position: 21
title: "php OOP Best Practices"
sidebar_label: "OOP Best Practices"
description: "Learn best practices for writing clean, maintainable, and scalable object-oriented php code including SOLID principles, design patterns, and more."
tags: [php, oop, best-practices, solid, design-patterns]
---

Writing clean, object-oriented php code requires following established principles and patterns. This guide covers the most important best practices for professional php development.

## Video Explanation

<LiteYouTubeEmbed
  id="RRVYpIET_RU"
  params="autoplay=1&autohide=1&showinfo=0&rel=0"
  title="Complete C++ STL in 1 Video | Time Complexity and Notes"
  lazyLoad={true}
  webp
/>

## 1. Follow the SOLID Principles

### Single Responsibility Principle (SRP)
Each class should have only one reason to change:

```php
// Bad — doing too much
class User {
    public function save() { /* DB logic */ }
    public function sendEmail() { /* Email logic */ }
    public function generatePDF() { /* PDF logic */ }
}

// Good — separated responsibilities
class User { /* properties and domain logic */ }
class UserRepository { public function save(User $user) { } }
class UserMailer { public function sendWelcome(User $user) { } }
```

### Open/Closed Principle (OCP)
Open for extension, closed for modification:

```php
interface Discount {
    public function apply(float $price): float;
}

class PercentDiscount implements Discount {
    public function __construct(private float $percent) {}
    public function apply(float $price): float {
        return $price * (1 - $this->percent / 100);
    }
}

class FlatDiscount implements Discount {
    public function __construct(private float $amount) {}
    public function apply(float $price): float {
        return $price - $this->amount;
    }
}
```

* * *

## 2. Use Constructor Promotion (php 8+)

```php
// Verbose (old style)
class Product {
    private string $name;
    private float $price;
    public function __construct(string $name, float $price) {
        $this->name  = $name;
        $this->price = $price;
    }
}

// Clean (constructor promotion)
class Product {
    public function __construct(
        private string $name,
        private float $price
    ) {}
}
```

* * *

## 3. Type Declare Everything

Use strict types and type hints for all methods:

```php
<?php
declare(strict_types=1);

class OrderService {
    public function calculateTotal(array $items, float $taxRate): float {
        $subtotal = array_sum(array_column($items, 'price'));
        return $subtotal * (1 + $taxRate);
    }
}
?>
```

* * *

## 4. Prefer Composition Over Inheritance

Instead of deep inheritance chains, compose objects from smaller pieces:

```php
// Bad: deep inheritance
class Animal {}
class Pet extends Animal {}
class Dog extends Pet {}
class GuideDog extends Dog {}

// Better: use composition + interfaces
class Dog {
    public function __construct(
        private Trainer $trainer,
        private MedicalRecord $medicalRecord
    ) {}
}
```

* * *

## 5. Use Interfaces for Dependencies (Dependency Inversion)

Depend on abstractions, not concrete implementations:

```php
interface Logger {
    public function log(string $message): void;
}

class FileLogger implements Logger {
    public function log(string $message): void {
        file_put_contents("app.log", $message . PHP_EOL, FILE_APPEND);
    }
}

class UserService {
    public function __construct(private Logger $logger) {}

    public function createUser(string $name): void {
        // ...
        $this->logger->log("User created: $name");
    }
}

// Easy to swap Logger implementations
$service = new UserService(new FileLogger());
```

* * *

## 6. Use Named Constructors (Static Factory Methods)

```php
class Temperature {
    private function __construct(private float $celsius) {}

    public static function fromCelsius(float $c): self {
        return new self($c);
    }

    public static function fromFahrenheit(float $f): self {
        return new self(($f - 32) * 5 / 9);
    }

    public function toCelsius(): float {
        return $this->celsius;
    }
}

$t1 = Temperature::fromCelsius(100);
$t2 = Temperature::fromFahrenheit(212);
```

* * *

## 7. Use Value Objects for Domain Concepts

```php
class Email {
    public function __construct(private string $value) {
        if (!filter_var($value, FILTER_VALIDATE_EMAIL)) {
            throw new InvalidArgumentException("Invalid email: $value");
        }
    }

    public function value(): string {
        return $this->value;
    }

    public function equals(Email $other): bool {
        return $this->value === $other->value;
    }
}

$email = new Email("alice@example.com");
echo $email->value();
```

* * *

## 8. Keep Methods Small and Focused

Each method should do one thing well:

```php
// Bad: monolithic method
public function processOrder($data) {
    // validate, save, send email, generate invoice — all in one
}

// Good: small, named methods
public function processOrder(OrderData $data): Order {
    $this->validateOrder($data);
    $order = $this->saveOrder($data);
    $this->notifyCustomer($order);
    $this->generateInvoice($order);
    return $order;
}
```

* * *

## 9. Use Enums (php 8.1+)

```php
enum OrderStatus {
    case Pending;
    case Processing;
    case Shipped;
    case Delivered;
    case Cancelled;
}

class Order {
    public OrderStatus $status = OrderStatus::Pending;
}

$order = new Order();
$order->status = OrderStatus::Shipped;
```

* * *

## 10. Autoload with Composer + PSR-4

Use Composer for autoloading instead of manual `require` statements:

```json
{
    "autoload": {
        "psr-4": {
            "App\\": "src/"
        }
    }
}
```

```php
<?php
require 'vendor/autoload.php';

use App\Services\UserService;
use App\Repositories\UserRepository;

$service = new UserService(new UserRepository());
?>
```

* * *

## Quick Reference Checklist

* Use `declare(strict_types=1)` in every file
* Type-hint all parameters and return types
* Keep classes small with a single responsibility
* Write interfaces before implementations
* Avoid `static` methods and singletons where possible
* Validate all inputs in constructors or setters
* Use Composer and follow PSR-4 for autoloading
* Write unit tests for every class