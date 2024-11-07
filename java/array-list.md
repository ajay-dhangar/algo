---
id: array-list
sidebar_position: 2
title: Array List 
sidebar_label: array list
description: ArrayList is a dynamic array implementation in Java that allows you to store and manipulate a collection of objects. It's part of the java.util package and provides efficient operations for adding, removing, and accessing elements.
tags: [java, array-list, collection-framework]
---

# What is an ArrayList?

An ArrayList is a dynamic array implementation in Java that allows you to store and manipulate a collection of objects. It's part of the `java.util` package and provides efficient operations for adding, removing, and accessing elements.

**Key Characteristics:**

* **Dynamic Size:** ArrayLists can grow or shrink as needed, unlike traditional arrays.
* **Random Access:** Elements can be accessed directly using their index.
* **Insertion and Deletion:** Elements can be inserted or removed at any index.
* **Object-Oriented:** Can store objects of any type.

**Basic Operations:**

1. **Creating an ArrayList:**
   ```java
   ArrayList<String> fruits = new ArrayList<>();
   ```

2. **Adding Elements:**
   ```java
   fruits.add("Apple");
   fruits.add("Banana");
   fruits.add("Orange");
   ```

3. **Accessing Elements:**
   ```java
   String firstFruit = fruits.get(0);
   ```

4. **Removing Elements:**
   ```java
   fruits.remove(1); // Removes the element at index 1
   ```

5. **Iterating Over Elements:**
   ```java
   for (String fruit : fruits) {
       System.out.println(fruit);
   }
   ```

**Common Methods:**

* **`add(E element)`:** Adds an element to the end of the list.
* **`add(int index, E element)`:** Inserts an element at a specific index.
* **`remove(int index)`:** Removes the element at a specific index.
* **`remove(Object o)`:** Removes the first occurrence of the specified object.
* **`get(int index)`:** Returns the element at a specific index.
* **`size()`:** Returns the number of elements in the list.
* **`isEmpty()`:** Returns `true` if the list is empty.
* **`clear()`:** Removes all elements from the list.

**Example:**

```java
import java.util.ArrayList;

public class ArrayListExample {
    public static void main(String[] args) {
        ArrayList<Integer> numbers = new ArrayList<>();
        numbers.add(10);
        numbers.add(20);
        numbers.add(30);

        System.out.println("Size of the list: " + numbers.size());
        System.out.println("First element: " + numbers.get(0));

        numbers.remove(1); // Remove the element at index 1

        for (int number : numbers) {
            System.out.println(number);
        }
    }
}
```

**Key Points to Remember:**

* ArrayLists are dynamic and can grow or shrink as needed.
* They are zero-indexed, meaning the first element is at index 0.
* Consider using `ArrayList` when you need a dynamic list of objects and frequent insertion and deletion operations.
* For sequential access and faster iteration, consider using `LinkedList`.

By understanding these concepts and methods, you can effectively utilize ArrayLists in your Java programs to manage collections of objects efficiently.
