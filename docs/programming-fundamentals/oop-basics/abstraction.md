---
id: abstraction
title: "Abstraction"
sidebar_label: "Abstraction"
sidebar_position: 6
description: "Understanding data abstraction in Object-Oriented Programming."
tags: [Abstraction, OOP, basics]
---

# Abstraction

Abstraction is one of the key concepts of object-oriented programming (OOP) languages. Its main goal is to handle complexity by hiding unnecessary details from the user. That enables the user to implement more complex logic on top of the provided abstraction without understanding or even thinking about all the hidden complexity.

---

## 1. Introduction

**Definition:**  
Abstraction means displaying only essential information and hiding the details. Data abstraction refers to providing only essential information about the data to the outside world, hiding the background details or implementation.

**Real-world example:**  
Consider a person driving a car. The person only knows that pressing the accelerator increases the car's speed and applying the brakes stops it. They don't need to know the inner mechanism of the engine, the fuel injection system, etc. This is abstraction.

## 2. Advantages of Abstraction

- **Reduces Complexity:** By hiding the low-level details.
- **Reduces Code Duplication:** Encourages code reuse.
- **Increases Security:** Only essential details are provided to the user.

## 3. How to Achieve Abstraction

In C++ and Java, abstraction can be achieved using:
1. **Classes and Access Specifiers:** Using `private` and `protected` modifiers to hide data members.
2. **Abstract Classes:** Classes containing at least one pure virtual function (in C++) or abstract method (in Java).
3. **Interfaces:** Pure abstract entities used to define a contract.
