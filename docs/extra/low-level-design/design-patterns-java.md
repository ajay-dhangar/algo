---
id: design-patterns-java
title: "Low-Level Design (LLD) Patterns with Java Examples"
sidebar_label: LLD Design Patterns
sidebar_position: 2
description: "Learn core Low-Level Design (LLD) patterns including Singleton, Factory, Strategy, and Observer with production-ready Java code examples."
tags: [lld, design-patterns, java, singleton, factory, strategy, observer]
---

# **Low-Level Design (LLD) Design Patterns (Java)**

Design patterns are time-tested, reusable solutions to common software design problems in object-oriented development. In **Low-Level Design (LLD)** and backend engineering, design patterns speed up development, ensure code maintainability, and improve system scalability.

---

## **Design Pattern Classification**

1. **Creational Patterns**: Focus on mechanism of object creation (e.g., Singleton, Factory Method, Builder).
2. **Structural Patterns**: Focus on composition of classes and objects (e.g., Adapter, Decorator, Facade).
3. **Behavioral Patterns**: Focus on communication and responsibility assignment between objects (e.g., Strategy, Observer, Command).

---

## **1. Singleton Pattern (Creational)**

The **Singleton Pattern** ensures that a class has only one instance in the JVM runtime and provides a global access point to it (e.g., database connection pools, logger instances, configuration managers).

### **Production-Ready Thread-Safe Bill Pugh Singleton**

```java
package com.algo.lld.patterns.singleton;

/**
 * Thread-safe Singleton implementation using the Bill Pugh Holder idiom.
 * Loaded lazily by the JVM without requiring explicit synchronization overhead.
 */
public class DatabaseConnectionPool {

    // Private constructor prevents direct instantiation
    private DatabaseConnectionPool() {
        System.out.println("Initializing Database Connection Pool...");
    }

    // Static inner class loads instance only when getInstance() is invoked
    private static class InstanceHolder {
        private static final DatabaseConnectionPool INSTANCE = new DatabaseConnectionPool();
    }

    public static DatabaseConnectionPool getInstance() {
        return InstanceHolder.INSTANCE;
    }

    public void executeQuery(String sql) {
        System.out.println("Executing SQL Query: " + sql);
    }
}
```

---

## **2. Factory Method Pattern (Creational)**

The **Factory Method Pattern** provides an interface for creating objects in a superclass, but lets subclasses alter the type of objects that will be created.

### **Clean Java Implementation**

```java
package com.algo.lld.patterns.factory;

// Product Interface
public interface Notification {
    void notifyUser(String message);
}

// Concrete Product 1
class EmailNotification implements Notification {
    @Override
    public void notifyUser(String message) {
        System.out.println("Dispatching Email: " + message);
    }
}

// Concrete Product 2
class SmsNotification implements Notification {
    @Override
    public void notifyUser(String message) {
        System.out.println("Dispatching SMS: " + message);
    }
}

// Factory Class
public class NotificationFactory {
    public static Notification createNotification(String channel) {
        if (channel == null || channel.isBlank()) {
            throw new IllegalArgumentException("Channel type cannot be empty.");
        }
        return switch (channel.toUpperCase()) {
            case "EMAIL" -> new EmailNotification();
            case "SMS" -> new SmsNotification();
            default -> throw new IllegalArgumentException("Unknown notification channel: " + channel);
        };
    }
}
```

---

## **3. Strategy Pattern (Behavioral)**

The **Strategy Pattern** defines a family of algorithms, encapsulates each one, and makes them interchangeable. Strategy lets the algorithm vary independently from clients that use it.

### **Clean Java Implementation**

```java
package com.algo.lld.patterns.strategy;

// Strategy Interface
public interface DiscountStrategy {
    double applyDiscount(double originalAmount);
}

// Concrete Strategy 1
class RegularDiscount implements DiscountStrategy {
    @Override
    public double applyDiscount(double originalAmount) {
        return originalAmount * 0.95; // 5% discount
    }
}

// Concrete Strategy 2
class VipDiscount implements DiscountStrategy {
    @Override
    public double applyDiscount(double originalAmount) {
        return originalAmount * 0.80; // 20% discount
    }
}

// Context Class
public class ShoppingCart {
    private DiscountStrategy discountStrategy;

    public ShoppingCart(DiscountStrategy discountStrategy) {
        this.discountStrategy = discountStrategy;
    }

    public void setDiscountStrategy(DiscountStrategy discountStrategy) {
        this.discountStrategy = discountStrategy;
    }

    public double calculateTotal(double subtotal) {
        return discountStrategy.applyDiscount(subtotal);
    }
}
```

---

## **4. Observer Pattern (Behavioral)**

The **Observer Pattern** defines a one-to-many dependency between objects so that when one object changes state, all its dependents are notified and updated automatically.

### **Clean Java Implementation**

```java
package com.algo.lld.patterns.observer;

import java.util.ArrayList;
import java.util.List;

// Observer Interface
public interface ChannelObserver {
    void update(String videoTitle);
}

// Concrete Observer
class Subscriber implements ChannelObserver {
    private final String subscriberName;

    public Subscriber(String subscriberName) {
        this.subscriberName = subscriberName;
    }

    @Override
    public void update(String videoTitle) {
        System.out.printf("Notification for %s: New video uploaded - '%s'%n", subscriberName, videoTitle);
    }
}

// Subject / Publisher Class
public class YoutubeChannel {
    private final String channelName;
    private final List<ChannelObserver> subscribers = new ArrayList<>();

    public YoutubeChannel(String channelName) {
        this.channelName = channelName;
    }

    public void subscribe(ChannelObserver observer) {
        subscribers.add(observer);
    }

    public void unsubscribe(ChannelObserver observer) {
        subscribers.remove(observer);
    }

    public void uploadVideo(String videoTitle) {
        System.out.printf("[%s] Uploaded video: %s%n", channelName, videoTitle);
        notifySubscribers(videoTitle);
    }

    private void notifySubscribers(String videoTitle) {
        for (ChannelObserver observer : subscribers) {
            observer.update(videoTitle);
        }
    }
}
```

---

## **Summary & Best Practices**

- **Singleton**: Use static inner helper holder (Bill Pugh) or Enum for thread safety and lazy initialization.
- **Factory**: Decouples instantiation logic from application code.
- **Strategy**: Prefers composition over inheritance for flexible runtime algorithm switching.
- **Observer**: Powers event-driven architectures, notification engines, and reactive streams.
