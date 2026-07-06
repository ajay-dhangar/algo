---
id: "namespaces-in-php"
sidebar_position: 16
title: "Namespaces in php"
sidebar_label: "Namespaces"
description: "php namespaces allow you to organize code and avoid name collisions. Learn how to define, use, and alias namespaces in php."
tags: [php, namespaces, oop, autoloading]
---

Namespaces allow you to organize your code into logical groups and avoid naming conflicts between classes, functions, and constants.

## Video Explanation

<LiteYouTubeEmbed
  id="Jni9c0-NjrY"
  params="autoplay=1&autohide=1&showinfo=0&rel=0"
  title="PHP Namespace Tutorial - Full PHP 8 Tutorial"
  lazyLoad={true}
  webp
/>

## Why Use Namespaces?

Without namespaces, if two libraries both define a class named `User`, there would be a conflict. Namespaces solve this:

```php
// Library A
namespace LibraryA;
class User { ... }

// Library B
namespace LibraryB;
class User { ... }
```

* * *

## Defining a Namespace

A namespace declaration must be the first statement in a php file:

```php
<?php
namespace App\Models;

class User {
    public string $name;

    public function __construct(string $name) {
        $this->name = $name;
    }
}
?>
```

* * *

## Using a Namespaced Class

```php
<?php
require 'User.php';

$user = new App\Models\User("Alice");
echo $user->name; // Alice
?>
```

* * *

## The `use` Keyword

Import a class so you don't need the full path every time:

```php
<?php
use App\Models\User;

$user = new User("Alice");
echo $user->name;
?>
```

### Aliasing with `as`

```php
<?php
use App\Models\User as AppUser;
use Admin\Models\User as AdminUser;

$u1 = new AppUser("Alice");
$u2 = new AdminUser("Bob");
?>
```

* * *

## Nested Namespaces

You can nest namespaces using backslash as a separator:

```php
<?php
namespace App\Controllers\Auth;

class LoginController {
    public function login() {
        echo "Logging in...";
    }
}
?>
```

```php
<?php
use App\Controllers\Auth\LoginController;

$ctrl = new LoginController();
$ctrl->login();
?>
```

* * *

## Global Namespace

To access a class or function from the global namespace inside a namespaced file, prefix it with `\`:

```php
<?php
namespace App;

class Database {
    public function connect() {
        $pdo = new \PDO("sqlite::memory:"); // global PDO class
    }
}
?>
```

* * *

## Namespaces and Functions / Constants

```php
<?php
namespace MathUtils;

const PI = 3.14159;

function square($n) {
    return $n * $n;
}
?>
```

```php
<?php
use const MathUtils\PI;
use function MathUtils\square;

echo PI;          // 3.14159
echo square(4);   // 16
?>
```

* * *

## Multiple Namespaces in One File

Possible but generally not recommended:

```php
<?php
namespace First;
class MyClass {}

namespace Second;
class MyClass {}
?>
```

* * *

## Autoloading with Namespaces (PSR-4)

Modern php uses Composer and PSR-4 autoloading to automatically load classes based on their namespace:

**composer.json:**
```json
{
    "autoload": {
        "psr-4": {
            "App\\": "src/"
        }
    }
}
```

With this setup, `App\Models\User` would map to `src/Models/User.php`.

```php
<?php
require 'vendor/autoload.php';

use App\Models\User;

$user = new User("Alice");
?>
```

**Tip:** Following PSR-4 conventions and using Composer autoloading is the standard way to organize php projects with namespaces.