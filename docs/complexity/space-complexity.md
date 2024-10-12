---
id: space-complexity
title: Space Complexity
sidebar_label: Space Complexity
sidebar_position: 2
description: "Space complexity is a measure of the amount of working storage an algorithm needs. It is a measure of the amount of memory space an algorithm needs to solve a problem as a function of the size of the input to the problem. It is the amount of memory space required by the algorithm to execute in its life cycle."
tags: [Space Complexity, Big O Notation, Memory, Algorithm, Complexity Analysis, Data Structure, DSA, JavaScript, Java, Python, C, C++, Space Complexity Example, Space Complexity Calculation, Space Complexity Analysis, Space Complexity Explanation, Space Complexity Conclusion, Space Complexity Importance, Space Complexity Formula, Space Complexity Constant Space, Space Complexity Auxiliary Space, Space Complexity Example, Space Complexity Program, Space Complexity Code]
---

Space complexity is a measure of the amount of working storage an algorithm needs. It is a measure of the amount of memory space an algorithm needs to solve a problem as a function of the size of the input to the problem. It is the amount of memory space required by the algorithm to execute in its life cycle.

<AdsComponent />

## Why is Space Complexity important?

Space complexity is important because the memory that is allocated to the program is limited. If the program uses more memory than the available memory, the program will crash. Therefore, it is important to know the space complexity of the algorithm.

## How to calculate Space Complexity?

Space complexity is calculated by counting the amount of memory space used by the algorithm. It is calculated by counting the amount of memory space used by the algorithm as a function of the size of the input to the problem.

## Example

```js title="Space Complexity"
function sumOfN(n) {
  let sum = 0;
  for (let i = 1; i <= n; i++) {
    sum += i;
  }
  return sum;
}
```

In the above example, the space complexity of the algorithm is O(1) because the algorithm uses a constant amount of memory space.

<Ads />

## Example of Space Complexity

1. Write a program to fine maximum and minimum element in an array.

<Tabs>
    <TabItem value="js" label="JavaScipt" default>
      
      ```js {6,9,12}
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

      const arr = [2, 5, 1, 20, 10];
      console.log(findMaxMin(arr)); // { max: 20, min: 1 }
      ```   
    </TabItem>

    <TabItem value="java" label="Java">
        
        ```java
        public class Main {
            public static void main(String[] args) {
               int[] arr = {2, 5, 1, 20, 10};
               System.out.println(findMaxMin(arr)); // { max: 20, min: 1 }
            }
    
            public static Map<String, Integer> findMaxMin(int[] arr) {
                int max = arr[0];
                int min = arr[0];
                for (int i = 1; i < arr.length; i++) {
                    if (arr[i] > max) {
                        max = arr[i];
                    }
                    if (arr[i] < min) {
                       min = arr[i];
                    }
                }
                Map<String, Integer> result = new HashMap<>();
                result.put("max", max);
                result.put("min", min);
                return result;
            }
        }
        ```
    </TabItem>

    <TabItem value="python" label="Python">
        
        ```python
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
        #include <stdio.h>

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

        int main() {
            int arr[] = {2, 5, 1, 20, 10};
            struct MaxMin result = findMaxMin(arr, 5);
            printf("{ max: %d, min: %d }\n", result.max, result.min); // { max: 20, min: 1 }
            return 0;
        }
        ```
    </TabItem>

    <TabItem value="cpp" label="C++">
        
        ```cpp
        #include <iostream>
        #include <map>
        #include <vector>

        std::map<std::string, int> findMaxMin(std::vector<int> arr) {
            int max = arr[0];
            int min = arr[0];
            for (int i = 1; i < arr.size(); i++) {
                if (arr[i] > max) {
                    max = arr[i];
                }
                if (arr[i] < min) {
                    min = arr[i];
                }
            }
            std::map<std::string, int> result;
            result["max"] = max;
            result["min"] = min;
            return result;
        }

        int main() {
            std::vector<int> arr = {2, 5, 1, 20, 10};
            std::map<std::string, int> result = findMaxMin(arr);
            std::cout << "{ max: " << result["max"] << ", min: " << result["min"] << " }\n"; // { max: 20, min: 1 }
            return 0;
        }
        ```
    </TabItem>

</Tabs>

In the above example, the space complexity of the algorithm is O(1) because the algorithm uses a constant amount of memory space.

**Explanation:** In the above example, we are finding the maximum and minimum element in an array. We are using two variables `max` and `min` to store the maximum and minimum element in the array. We are using a constant amount of memory space to store the maximum and minimum element in the array. Therefore, the space complexity of the algorithm is O(1).

:::info Complexity Analysis
**Farmula to calculate Space Complexity**

Space Complexity = Constant Space + Auxiliary Space

**Constant Space:** The amount of space used by the algorithm that is not dependent on the size of the input to the problem. It is a constant amount of memory space used by the algorithm.

**Auxiliary Space:** The amount of space used by the algorithm that is dependent on the size of the input to the problem. It is a variable amount of memory space used by the algorithm.

```plaintext title="Space Complexity"
Space Complexity = O(1) + O(n) = O(n)
```

**For Example:**

```js title="Space Complexity"
function sumOfN(n) {
  let sum = 0; // Constant Space (O(1))
  for (let i = 1; i <= n; i++) {
    sum += i; // Auxiliary Space (O(n))
  }
  return sum;
}
```

In the above example, the space complexity of the algorithm is `O(1) + O(n) = O(n)`.

:::

<Ads />

## Conclusion

Space complexity is a measure of the amount of working storage an algorithm needs. It is a measure of the amount of memory space an algorithm needs to solve a problem as a function of the size of the input to the problem. It is the amount of memory space required by the algorithm to execute in its life cycle.