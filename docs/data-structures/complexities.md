---

id: time-space-complexity

title: Time and Space Complexity

sidebar_label: Time & Space Complexity

sidebar_position: 2

description: Learn the fundamentals of Time Complexity, Space Complexity, and Big O Notation in DSA.

tags: [dsa, complexity-analysis, big-o, beginners]

---



# Time and Space Complexity



Understanding **Time Complexity** and **Space Complexity** is essential for analyzing and comparing algorithms in Data Structures and Algorithms (DSA). These concepts help determine how efficient an algorithm is as the input size grows.



## Why Algorithm Efficiency Matters



- Real-world applications deal with large datasets (millions or billions of elements).

- Efficient algorithms save computational resources (CPU time, memory, energy).

- In technical interviews, you are often asked to analyze and optimize complexity.

- Good complexity understanding leads to better problem-solving and scalable code.



## 1. Time Complexity



**Time Complexity** measures the amount of time an algorithm takes to run as a function of the input size (*n*).



It focuses on the **growth rate** rather than exact runtime (which depends on hardware).



### Big O Notation

Big O Notation (`O(...)`) describes the **worst-case** upper bound of an algorithm's running time.



- Ignores constants and lower-order terms.

- Focuses on behavior as *n* becomes very large.



**Common Time Complexities** (from best to worst):



| Complexity       | Name              | Description                              | Example                          |
|------------------|-------------------|------------------------------------------|----------------------------------|
| **O(1)**        | Constant         | Runtime does not depend on input size   | Array access by index, HashMap lookup (average) |
| **O(log n)**    | Logarithmic      | Doubles input → adds constant time      | Binary Search, operations on balanced BST |
| **O(n)**        | Linear           | Time grows proportionally to input      | Linear Search, single array traversal |
| **O(n log n)**  | Linearithmic     | Efficient for sorting/comparison        | Merge Sort, Quick Sort (average) |
| **O(n²)**       | Quadratic        | Nested loops                            | Bubble Sort, Selection Sort      |
| **O(n³)**       | Cubic            | Triple nested loops                     | Naive matrix multiplication      |
| **O(2ⁿ)**      | Exponential      | Very slow, doubles with each addition   | Recursive Fibonacci (naive), Subset problems |
| **O(n!)**       | Factorial        | Extremely slow                          | Brute-force Traveling Salesman   |



### Practical Time Complexity Examples



```python

# O(1) - Constant

def get_first(arr):

&#x20;   return arr[0]                    # Always fast



# O(log n) - Binary Search

def binary_search(arr, target):

&#x20;   low, high = 0, len(arr) - 1

&#x20;   while low <= high:

&#x20;       mid = (low + high) // 2

&#x20;       if arr[mid] == target:

&#x20;           return mid

&#x20;       elif arr[mid] < target:

&#x20;           low = mid + 1

&#x20;       else:

&#x20;           high = mid - 1

&#x20;   return -1



# O(n) - Linear

def find_max(arr):

&#x20;   max_val = arr[0]

&#x20;   for num in arr:                  # Visits every element

&#x20;       if num > max_val:

&#x20;           max_val = num

&#x20;   return max_val



# O(n²) - Quadratic

def bubble_sort(arr):

&#x20;   n = len(arr)

&#x20;   for i in range(n):

&#x20;       for j in range(0, n - i - 1):  # Nested loops

&#x20;           if arr[j] > arr[j + 1]:

&#x20;               arr[j], arr[j + 1] = arr[j + 1], arr[j]

```



## 2. Space Complexity



**Space Complexity** measures the total memory space required by an algorithm as a function of input size.



**Components**:

- **Input Space**: Memory for input data.

- **Auxiliary Space**: Extra/temporary space used by the algorithm (variables, recursion stack, etc.).



**Common Space Complexities**: Same notations as time (O(1), O(n), O(n²), etc.).



### Examples



- **O(1) Auxiliary Space** (In-place): Most sorting algorithms like Heap Sort, Selection Sort.

- **O(n) Space**: Merging in Merge Sort, recursion stack in tree traversal, extra array for results.

- **O(n²) Space**: 2D matrix operations or adjacency matrix for dense graphs.



**Trade-off**: Sometimes you can reduce time complexity by using more space (e.g., HashMaps for faster lookups).



## Best Practices



1. Always analyze **both time and space**.

2. Prefer O(n log n) sorting over O(n²) when possible.

3. Use in-place algorithms when memory is constrained.

4. Be aware of recursion depth (can lead to O(n) space).



## Further Reading

- [DSA Terminology Cheat Sheet](../terminology.md)

- Arrays and Searching Algorithms

- Sorting Algorithms

- Dynamic Programming (space optimization techniques)



**Next Steps**: Practice analyzing complexities on platforms like LeetCode. Start with easy problems and gradually move to medium/hard while noting their complexities.



