---
id: callback-functions
title: "Callback Functions"
sidebar_label: "Callback Functions"
sidebar_position: 5
description: "Learn about Callback Functions, the difference between synchronous and asynchronous callbacks, and how to handle asynchronous operations."
tags: [functions, callbacks, asynchronous, javascript, fundamentals]
---

## 1. Introduction

A **callback function** is a function passed into another function as an argument, which is then invoked inside the outer function to complete some kind of routine or action.

Callbacks are a foundational building block for:
- **Synchronous execution**: The callback runs immediately alongside the outer function (e.g., array iteration, sorting custom keys).
- **Asynchronous execution**: The callback runs after an asynchronous task completes (e.g., loading files, fetching network data, timers, event listeners).

---

## 2. Syntax, Examples, and Explanations

### 2.1 In JavaScript

JavaScript uses callbacks extensively for handling asynchronous workflows.

#### A. Synchronous Callback
The callback runs immediately inside the execution flow of the host function.

```javascript
function greetUser(name, callback) {
  const message = `Hello, ${name}!`;
  callback(message);
}

// Inline callback
greetUser("Alice", (msg) => {
  console.log(msg); // Output: Hello, Alice!
});
```

#### B. Asynchronous Callback
The callback is scheduled to run at a later time (e.g., when a timer fires or a request finishes).

```javascript
console.log("Start");

// Asynchronous callback using setTimeout
setTimeout(() => {
  console.log("Inside Timeout Callback");
}, 1000);

console.log("End");

// Output:
// Start
// End
// (after 1 second) Inside Timeout Callback
```

---

### 2.2 In Python

In Python, callbacks are commonly used for event-driven programming, graphical user interfaces (GUIs), or customizing sorting.

#### A. Synchronous Callback
```python
def process_data(data, callback):
    processed = [d.upper() for d in data]
    callback(processed)

def print_result(result):
    print(f"Result: {result}")

process_data(["apple", "banana"], print_result)
# Output: Result: ['APPLE', 'BANANA']
```

#### B. Asynchronous Callback (using `asyncio`)
```python
import asyncio

async def fetch_data(callback):
    await asyncio.sleep(1) # Simulate network request
    callback("Fetched data from server")

def handle_response(response):
    print(response)

async def main():
    await fetch_data(handle_response)

asyncio.run(main()) # Output: Fetched data from server
```

---

### 2.3 In C++

In C++, callbacks can be implemented using **Function Pointers**, standard functional wrappers (`std::function`), or **Lambdas**.

```cpp
#include <iostream>
#include <functional>
#include <string>

// Accepts std::function as a callback
void processText(const std::string &text, std::function<void(const std::string&)> callback) {
    std::string modified = text + " (processed)";
    callback(modified);
}

void printCallback(const std::string &message) {
    std::cout << message << std::endl;
}

int main() {
    // 1. Using a function pointer as a callback
    processText("Hello C++", printCallback);

    // 2. Using a lambda as a callback
    processText("Inline callback", [](const std::string &msg) {
        std::cout << "Lambda: " << msg << std::endl;
    });

    return 0;
}
```

---

## 3. The Problem of Callback Hell

When managing nested asynchronous operations with callbacks, code can quickly become deeply indented and hard to read. This is known as **Callback Hell** or the **Pyramid of Doom**.

### Example of Callback Hell (JavaScript):
```javascript
getData(function(a) {
  getMoreData(a, function(b) {
    getEvenMoreData(b, function(c) {
      getYetMoreData(c, function(d) {
        console.log("Finally: " + d);
      });
    });
  });
});
```

### Solutions:
Modern languages provide structural solutions to bypass callback hell:
1. **Promises (JavaScript)**: Replaces nesting with chainable `.then()` calls.
2. **Async/Await (JavaScript, Python, C#)**: Allows writing asynchronous code that looks and behaves like synchronous code.
3. **Observables / Reactive Extensions**: For managing complex streams of events.

---

## 4. Video Explanation

<LiteYouTubeEmbed
  id="xHneyv3y21Y"
  params="autoplay=1&autohide=1&showinfo=0&rel=0"
  title="Callback Functions in JavaScript | Asynchronous JS & Callbacks"
  poster="maxresdefault"
  lazyLoad={true}
  webp
/>
