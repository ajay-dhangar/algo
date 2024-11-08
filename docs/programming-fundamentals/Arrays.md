---
id: Arrays
title: Introduction to Arrays fundamentals
sidebar_label: Arrays
sidebar_position: 1
description: "Information About Arrays in progamming"
tags: [arrays,fundamentals]
---


# Arrays in C

## What is an Array?
An array is a collection of elements of the same type, stored in contiguous memory locations. It allows you to store multiple values in a single variable, making it easier to manage and access data efficiently.

## Characteristics of Arrays
- **Homogeneous**: All elements in an array must be of the same data type.
- **Fixed Size**: The size of an array is defined at the time of declaration and cannot be changed during runtime.
- **Contiguous Memory**: The elements of an array are stored in consecutive memory locations.

## Declaration of Arrays
To declare an array in C, you specify the data type followed by the array name and size in square brackets.

### Syntax:
```c
data_type array_name[array_size];
```
### Example:
```C
int numbers[5]; // Declaration of an integer array of size 5
```

## Initialization of Arrays
You can initialize an array at the time of declaration using curly braces.

### Syntax:
```C
data_type array_name[array_size] = {value1, value2, ..., valueN};
```

### Example:
```C
int numbers[5] = {1, 2, 3, 4, 5}; // Initialization with values
```
If the size is omitted, the compiler counts the number of initializers:

```C
int numbers[] = {1, 2, 3, 4, 5}; // Compiler determines the size (5 in this case)
```

## Accessing Array Elements
Array elements can be accessed using the index, which starts from 0.

### Syntax:
```C
array_name[index];
```

### Example:
```C
int firstElement = numbers[0]; // Accessing the first element (1)
```

## Modifying Array Elements
You can modify an element of the array using its index.

### Example:
```C
numbers[0] = 10; // Changing the first element from 1 to 10
```

## Multidimensional Arrays
C also supports multidimensional arrays, such as two-dimensional arrays (like matrices).

### Declaration:
```C
data_type array_name[row_size][column_size];
```

#### Example:
```C
int matrix[3][3]; // Declaration of a 3x3 integer matrix
```

### Initialization:
```C
int matrix[3][3] = {
    {1, 2, 3},
    {4, 5, 6},
    {7, 8, 9}
}; // Initialization of a 3x3 matrix
```

### Accessing Elements:
```C
int element = matrix[1][2]; // Accessing the element in the second row and third column (6)
```

## Common Operations on Arrays
1. Traversing an Array
You can iterate through an array using a loop to access or modify each element.

```
for (int i = 0; i < 5; i++) {
    printf("%d ", numbers[i]); // Prints each element
}
```

2. Searching an Array
You can search for an element using linear or binary search.

Linear Search Example:
```C
int search(int arr[], int size, int key) {
    for (int i = 0; i < size; i++) {
        if (arr[i] == key) {
            return i; // Return the index if found
        }
    }
    return -1; // Return -1 if not found
}
```

3. Sorting an Array
You can sort an array using various algorithms like bubble sort, selection sort, or quicksort.

Bubble Sort Example:
```C
void bubbleSort(int arr[], int size) {
    for (int i = 0; i < size - 1; i++) {
        for (int j = 0; j < size - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                // Swap arr[j] and arr[j+1]
                int temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
}
```

## Summary
- An array is a collection of elements of the same type stored in contiguous memory locations.
- Arrays can be one-dimensional or multi-dimensional.
- Elements can be accessed and modified using their index.
- Common operations on arrays include traversing, searching, and sorting.
