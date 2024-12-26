---
id: arrays-in-dsa
title: Arrays in Data Structures and Algorithms
sidebar_label: Arrays
description: "An array is a collection of items stored at contiguous memory locations. It is a data structure that stores a fixed-size sequential collection of elements of the same type. An array is used to store a collection of data, but it is often more useful to think of an array as a collection of variables of the same type."
tags: [dsa, data-structures, arrays, array, array-data-structure, array-in-dsa, array-in-data-structure, array-in-algorithm, array-in-dsa-example, array-in-dsa-explanation, array-in-dsa-conclusion, array-in-dsa-importance, array-in-dsa-syntax, array-in-dsa-declaration, array-in-dsa-access, array-in-dsa-update, array-in-dsa-length, array-in-dsa-iterate, array-in-dsa-max-min, array-in-dsa-program, array-in-dsa-code, array-in-dsa-js, array-in-dsa-java, array-in-dsa-python, array-in-dsa-c, array-in-dsa-cpp, array-in-dsa-ts]
---

An array is a collection of items stored at contiguous memory locations. It is a data structure that stores a fixed-size sequential collection of elements of the same type. An array is used to store a collection of data, but it is often more useful to think of an array as a collection of variables of the same type.

## Visualizations of Arrays in Data Structures and Algorithms (DSA)

<ArrayVisualizations />

## Why are Arrays important?

Arrays are important because they allow us to store multiple items of the same type in a single variable. They are used to store data in a structured way, and they are used in many algorithms and data structures.

## How to declare an Array?

An array can be declared in various programming languages using the following syntax:

<Tabs>
    <TabItem value="js" label="JavaScipt" default>
      
      ```js
      // Declare an array in JavaScript
      let arr = [1, 2, 3, 4, 5];
      ```
    </TabItem>
    <TabItem value="java" label="Java">
      
      ```java
      // Declare an array in Java
      int[] arr = {1, 2, 3, 4, 5};
      ```
    </TabItem>
    <TabItem value="python" label="Python">
      
      ```python
      # Declare an array in Python
      arr = [1, 2, 3, 4, 5]
      ```
    </TabItem>
    <TabItem value="c" label="C">
      
      ```c
      // Declare an array in C
      int arr[] = {1, 2, 3, 4, 5};
      ```
    </TabItem>
    <TabItem value="cpp" label="C++">
      
      ```cpp
      // Declare an array in C++
      int arr[] = {1, 2, 3, 4, 5};
      ```
    </TabItem>
    <TabItem value="ts" label="TypeScript">
      
      ```ts
      // Declare an array in TypeScript
      let arr: number[] = [1, 2, 3, 4, 5];
      ```
    </TabItem>
</Tabs>

## How to access an Array?

An array can be accessed using the index of the element. The index of the first element is 0, the index of the second element is 1, and so on.

<Tabs>
    <TabItem value="js" label="JavaScipt" default>
      
      ```js
      // Access an array in JavaScript
      let arr = [1, 2, 3, 4, 5];
      console.log(arr[0]); // 1
      console.log(arr[1]); // 2
      console.log(arr[2]); // 3
      console.log(arr[3]); // 4
      console.log(arr[4]); // 5
      ```
    </TabItem>
    <TabItem value="java" label="Java">
      
      ```java
      // Access an array in Java
      int[] arr = {1, 2, 3, 4, 5};
      System.out.println(arr[0]); // 1
      System.out.println(arr[1]); // 2
      System.out.println(arr[2]); // 3
      System.out.println(arr[3]); // 4
      System.out.println(arr[4]); // 5
      ```
    </TabItem>
    <TabItem value="python" label="Python">
      
      ```python
      # Access an array in Python
      arr = [1, 2, 3, 4, 5]
      print(arr[0]) # 1
      print(arr[1]) # 2
      print(arr[2]) # 3
      print(arr[3]) # 4
      print(arr[4]) # 5
      ```
    </TabItem>
    <TabItem value="c" label="C">
      
      ```c
      // Access an array in C
      int arr[] = {1, 2, 3, 4, 5};
      printf("%d\n", arr[0]); // 1
      printf("%d\n", arr[1]); // 2
      printf("%d\n", arr[2]); // 3
      printf("%d\n", arr[3]); // 4
      printf("%d\n", arr[4]); // 5
      ```
    </TabItem>
    <TabItem value="cpp" label="C++">
        
        ```cpp
        // Access an array in C++
        int arr[] = {1, 2, 3, 4, 5};
        cout << arr[0] << endl; // 1
        cout << arr[1] << endl; // 2
        cout << arr[2] << endl; // 3
        cout << arr[3] << endl; // 4
        cout << arr[4] << endl; // 5
        ```
    </TabItem>
    <TabItem value="ts" label="TypeScript">
      
      ```ts
      // Access an array in TypeScript
      let arr: number[] = [1, 2, 3, 4, 5];
      console.log(arr[0]); // 1
      console.log(arr[1]); // 2
      console.log(arr[2]); // 3
      console.log(arr[3]); // 4
      console.log(arr[4]); // 5
      ```
    </TabItem>
</Tabs>

## How to update an Array?

An array can be updated by assigning a new value to the index of the element.

<Tabs>
    <TabItem value="js" label="JavaScipt" default>
      
      ```js
      // Update an array in JavaScript
      let arr = [1, 2, 3, 4, 5];
      arr[0] = 10;
      console.log(arr); // [10, 2, 3, 4, 5]
      ```
    </TabItem>
    <TabItem value="java" label="Java">
      
      ```java
      // Update an array in Java
      int[] arr = {1, 2, 3, 4, 5};
      arr[0] = 10;
      System.out.println(Arrays.toString(arr)); // [10, 2, 3, 4, 5]
      ```
    </TabItem>
    <TabItem value="python" label="Python">
      
      ```python
      # Update an array in Python
      arr = [1, 2, 3, 4, 5]
      arr[0] = 10
      print(arr) # [10, 2, 3, 4, 5]
      ```
    </TabItem>
    <TabItem value="c" label="C">
      
      ```c
      // Update an array in C
      int arr[] = {1, 2, 3, 4, 5};
      arr[0] = 10;
      for (int i = 0; i < 5; i++) {
          printf("%d ", arr[i]);
      }
      // 10 2 3 4 5
      ```
    </TabItem>
    <TabItem value="cpp" label="C++">
      
      ```cpp
      // Update an array in C++
      int arr[] = {1, 2, 3, 4, 5};
      arr[0] = 10;
      for (int i = 0; i < 5; i++) {
          cout << arr[i] << " ";
      }
      // 10 2 3 4 5
      ```
    </TabItem>
    <TabItem value="ts" label="TypeScript">
      
      ```ts
      // Update an array in TypeScript
      let arr: number[] = [1, 2, 3, 4, 5];
      arr[0] = 10;
      console.log(arr); // [10, 2, 3, 4, 5]
      ```
    </TabItem>
</Tabs>

## How to find the length of an Array?

The length of an array can be found using the `length` property.

<Tabs>
    <TabItem value="js" label="JavaScipt" default>
      
      ```js
      // Find the length of an array in JavaScript
      let arr = [1, 2, 3, 4, 5];
      console.log(arr.length); // 5
      ```
    </TabItem>
    <TabItem value="java" label="Java">
      
      ```java
      // Find the length of an array in Java
      int[] arr = {1, 2, 3, 4, 5};
      System.out.println(arr.length); // 5
      ```
    </TabItem>
    <TabItem value="python" label="Python">
      
      ```python
      # Find the length of an array in Python
      arr = [1, 2, 3, 4, 5]
      print(len(arr)) # 5
      ```
    </TabItem>
    <TabItem value="c" label="C">
      
      ```c
      // Find the length of an array in C
      int arr[] = {1, 2, 3, 4, 5};
      int length = sizeof(arr) // sizeof(arr[0]);
      printf("%d\n", length); // 5
      ```
    </TabItem>
    <TabItem value="cpp" label="C++">
      
      ```cpp
      // Find the length of an array in C++
      int arr[] = {1, 2, 3, 4, 5};
      int length = sizeof(arr) // sizeof(arr[0]);
      cout << length << endl; // 5
      ```
    </TabItem>
    <TabItem value="ts" label="TypeScript">
      
      ```ts
      // Find the length of an array in TypeScript
      let arr: number[] = [1, 2, 3, 4, 5];
      console.log(arr.length); // 5
      ```
    </TabItem>
</Tabs>

## How to iterate through an Array?

An array can be iterated using a loop such as `for` loop, `while` loop, or `for...of` loop.

<Tabs>
    <TabItem value="js" label="JavaScipt" default>
      
      ```jsx
      // Iterate through an array in JavaScript
      let arr = [1, 2, 3, 4, 5];
      for (let i = 0; i < arr.length; i++) {
          console.log(arr[i]);
      }
      // 1
      // 2
      // 3
      // 4
      // 5
      ```

    </TabItem>
    <TabItem value="java" label="Java">
      
      ```java
      // Iterate through an array in Java
      int[] arr = {1, 2, 3, 4, 5};
      for (int i = 0; i < arr.length; i++) {
          System.out.println(arr[i]);
      }
      // 1
      // 2
      // 3
      // 4
      // 5
      ```
    </TabItem>
    <TabItem value="python" label="Python">
      
      ```python
      # Iterate through an array in Python
      arr = [1, 2, 3, 4, 5]
      for i in arr:
          print(i)
      # 1
      # 2
      # 3
      # 4
      # 5
      ```
    </TabItem>
    <TabItem value="c" label="C">
      
      ```c
      // Iterate through an array in C
      int arr[] = {1, 2, 3, 4, 5};
      for (int i = 0; i < 5; i++) {
          printf("%d\n", arr[i]);
      }
      // 1
      // 2
      // 3
      // 4
      // 5
      ```
    </TabItem>
    <TabItem value="cpp" label="C++">
      
      ```cpp
      // Iterate through an array in C++
      int arr[] = {1, 2, 3, 4, 5};
        for (int i = 0; i < 5; i++) {
            cout << arr[i] << endl;
        }
        // 1
        // 2
        // 3
        // 4
        // 5
        ```
    </TabItem>
    <TabItem value="ts" label="TypeScript">
      
      ```ts
      // Iterate through an array in TypeScript
      let arr: number[] = [1, 2, 3, 4, 5];
      for (let i = 0; i < arr.length; i++) {
          console.log(arr[i]);
      }
      // 1
      // 2
      // 3
      // 4
      // 5
      ```
    </TabItem>
</Tabs>

## How to find the maximum and minimum elements in an Array?

The maximum and minimum elements in an array can be found by iterating through the array and comparing each element with the current maximum and minimum elements.

<Tabs>
    <TabItem value="js" label="JavaScipt" default>
      
      ```js
      // Find the maximum and minimum elements in an array in JavaScript
      function findMaxMin(arr) {
          let max = arr[0];
          let min = arr[0];
          for (let i = 1; i < arr.length; i++) {
              if (arr[i] > max) {
                  max = arr[i];
              }
              if (arr[i] < min) {
                  min = arr[i];
              }
          }
          return { max, min };
      }

      let arr = [2, 5, 1, 20, 10];
      console.log(findMaxMin(arr)); // { max: 20, min: 1 }
      ```
    </TabItem>
    <TabItem value="java" label="Java">
      
      ```java
      public class Main {
      // Find the maximum and minimum elements in an array in Java
      static class MaxMin {
          int max;
          int min;
      }

      static MaxMin findMaxMin(int arr[]) {
          MaxMin result = new MaxMin();
          result.max = arr[0];
          result.min = arr[0];
          for (int i = 1; i < arr.length; i++) {
              if (arr[i] > result.max) {
                  result.max = arr[i];
              }
              if (arr[i] < result.min) {
                  result.min = arr[i];
              }
          }
          return result;
      }

        public static void main(String[] args) {
            int arr[] = {2, 5, 1, 20, 10};
            MaxMin result = findMaxMin(arr);
            System.out.println("{ max: " + result.max + ", min: " + result.min + " }"); // { max: 20, min: 1 }
        }
     }

      ```
    </TabItem>
    <TabItem value="python" label="Python">
      
      ```python
      # Find the maximum and minimum elements in an array in Python
      def find_max_min(arr):
          max = arr[0]
          min = arr[0]
          for i in range(1, len(arr)):
              if arr[i] > max:
                  max = arr[i]
              if arr[i] < min:
                  min = arr[i]
          return {"max": max, "min": min}

        arr = [2, 5, 1, 20, 10]
        print(find_max_min(arr)) # { max: 20, min: 1 }
        ```
    </TabItem>
    <TabItem value="c" label="C">
      
      ```c
      // Find the maximum and minimum elements in an array in C
      struct MaxMin {
          int max;
          int min;
      };

      struct MaxMin findMaxMin(int arr[], int n) {
          struct MaxMin result;
          result.max = arr[0];
          result.min = arr[0];
          for (int i = 1; i < n; i++) {
              if (arr[i] > result.max) {
                  result.max = arr[i];
              }
              if (arr[i] < result.min) {
                  result.min = arr[i];
              }
          }
          return result;
      }

      int arr[] = {2, 5, 1, 20, 10};
      struct MaxMin result = findMaxMin(arr, 5);
      printf("{ max: %d, min: %d }\n", result.max, result.min); // { max: 20, min: 1 }
      ```
    </TabItem>
    <TabItem value="cpp" label="C++">
      
      ```cpp
      // Find the maximum and minimum elements in an array in C++
      struct MaxMin {
          int max;
          int min;
      };

      MaxMin findMaxMin(int arr[], int n) {
          MaxMin result;
          result.max = arr[0];
          result.min = arr[0];
          for (int i = 1; i < n; i++) {
              if (arr[i] > result.max) {
                  result.max = arr[i];
              }
              if (arr[i] < result.min) {
                  result.min = arr[i];
              }
          }
          return result;
      }

      int arr[] = {2, 5, 1, 20, 10};
      MaxMin result = findMaxMin(arr, 5);
      cout << "{ max: " << result.max << ", min: " << result.min << " }" << endl; // { max: 20, min: 1 }
      ```
    </TabItem>
    <TabItem value="ts" label="TypeScript">
      
      ```ts
      // Find the maximum and minimum elements in an array in TypeScript
      interface MaxMin {
          max: number;
          min: number;
      }

      function findMaxMin(arr: number[]): MaxMin {
          let max = arr[0];
          let min = arr[0];
          for (let i = 1; i < arr.length; i++) {
              if (arr[i] > max) {
                  max = arr[i];
              }
              if (arr[i] < min) {
                  min = arr[i];
              }
          }
          return { max, min };
      }

      let arr: number[] = [2, 5, 1, 20, 10];
      console.log(findMaxMin(arr)); // { max: 20, min: 1 }
      ```
    </TabItem>
</Tabs>

:::info 📝 Info
- The time complexity of finding the maximum and minimum elements in an array is O(n).
- The space complexity of finding the maximum and minimum elements in an array is O(1).
:::


## Conclusion

In this tutorial, we learned about arrays in data structures and algorithms. We learned how to declare an array, access an array, update an array, find the length of an array, iterate through an array, and find the maximum and minimum elements in an array. Arrays are an important data structure that is used in many algorithms and data structures.