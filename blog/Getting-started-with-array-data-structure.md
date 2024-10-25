---
slug: Getting-started-with-array-data-structure
title: Getting Started With Array Data Structure
authors: [Rishi-Verma]
tags: [Rishi-Verma, algo, dsa, algorithms, array,c++,java,python]
---

Array is a collection of items of the same variable type that are stored at contiguous memory locations. It is one of the most popular and simple data structures used in programming. In this article, we have decided to provide a complete guide for Arrays, which will help you to tackle any problem based on Arrays.

<!-- truncate -->

In this blog, we'll break down:

- **What is an Array**: Array is a Linear Data Structure that Stores collection of items.
- **Basic Terminologies of array** like $(Array Index)$, $(Array Element)$, and $O(Array Length)$.
- **Declaration and Intialization of Array** and its time and Space Complexity.
- **Operation on Array** 
- **Advantages and Disadvantages of Array**
  
---

## What is Array?

Array is a linear data structure that stores a collection of items of same data type in contiguous memory locations. Each item in an array is indexed starting with 0. We can directly access an array element by using its index value.

### Basic Terminologies of Array:

1. **$(Array Index)$ :**
   - In an array, elements are identified by their indexes. Array index starts from 0.

2. **$(Array Element)$ :**
   - Elements are items stored in an array and can be accessed by their index.

3. **$(Array Length)$ :**
   - The length of an array is determined by the number of elements it can contain. 

### Declaration and Intialization of Array:
Arrays can be declared in various ways in different languages. For better illustration, below are some language-specific array declarations:

```C++ title="main.cpp"
// This array will store integer type element
int arr[5];      
// This array will store char type element
char arr[10];   
// This array will store float type element
float arr[20];  
```

Arrays can be initialized in different ways in different languages. Below are some language-specific array initializations:

```C++ title="main.cpp"
int arr[] = { 1, 2, 3, 4, 5 };
char arr[5] = { 'a', 'b', 'c', 'd', 'e' };
float arr[10] = { 1.4, 2.0, 24, 5.0, 0.0 };
```

---

## Operation on Array

1. **Array Traversal**

Array traversal involves visiting all the elements of the array once. Below is the implementation of Array traversal in C++.

```C++ title="main.cpp"
int arr[] = { 1, 2, 3, 4, 5 };
int len = sizeof(arr) / sizeof(arr[0]);
// Traversing over arr[]
for (int i = 0; i < len; i++) {
    cout << arr[i] << " ";
```

2. **Insertion in Array**

We can insert one or multiple elements at any position in the array. Below is the implementation of Insertion in Array in C++.

```C++ title="main.cpp"
// Function to insert element
// at a specific position
void insertElement(int arr[], int n, int x, int pos)
{
    // shift elements to the right
    // which are on the right side of pos
    for (int i = n - 1; i >= pos; i--)
        arr[i + 1] = arr[i];
 
    arr[pos] = x;
}

```
2. **Deletion in Array**

We can delete an element at any index in an array. Below is the implementation of Deletion of element in an array in different C++.

```C++ title="main.cpp"
// Function to insert element
// at a specific position
// To search a key to be deleted
int findElement(int arr[], int n, int key);

// Function to delete an element
int deleteElement(int arr[], int n, int key)
{
    // Find position of element to be deleted
    int pos = findElement(arr, n, key);

    if (pos == -1) {
        cout << "Element not found";
        return n;
    }

    // Deleting element
    int i;
    for (i = pos; i < n - 1; i++)
        arr[i] = arr[i + 1];

    return n - 1;
}

// Function to implement search operation
int findElement(int arr[], int n, int key)
{
    int i;
    for (i = 0; i < n; i++)
        if (arr[i] == key)
            return i;
    // Return -1 if key is not found
    return -1;
}
```
2. **Searching in Array**

We can traverse over an array and search for an element. Below is the implementation of Deletion of element in an arrayin C++.

```C++ title="main.cpp"
// Function to implement search operation
int findElement(int arr[], int n, int key)
{
    int i;
    for (i = 0; i < n; i++)
        if (arr[i] == key)
            return i;
 
    // If the key is not found
    return -1;
}

```
### Advantages of  Array 

- Arrays allow random access to elements. This makes accessing elements by position faster.

- Arrays have better cache locality which makes a pretty big difference in performance.
- Arrays represent multiple data items of the same type using a single name.
- Arrays are used to implement the other data structures like linked lists, stacks, queues, trees, graphs, etc.

### Disadvantages of Array:

- As arrays have a fixed size, once the memory is allocated to them, it cannot be increased or decreased, making it impossible to store extra data if required. An array of fixed size is referred to as a static array. 
- Allocating less memory than required to an array leads to loss of data.
- An array is homogeneous in nature so, a single array cannot store values of different data types.

---
## Final Thoughts

We concluded that arrays are a simple method of accessing elements of the same type by grouping them and we can find the elements efficiently by their indexes and can perform different operations using them. Thus, they are more efficient when it comes to memory allocation and should be used in all modern programming languages. 
