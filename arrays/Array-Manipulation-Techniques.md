---
id: array-manipulation-techniques
title: Array Manipulation Techniques
sidebar_label: Array Manipulation Techniques
sidebar_position: 3
description: Various techniques for manipulating arrays, including reversing, merging, and more.
tags: [basic-dsa, data-structures, array-manipulation]
---

### Definition:

Array manipulation techniques encompass a variety of methods for modifying and managing data stored in arrays. These techniques are fundamental for performing efficient operations on collections of data.

### Techniques:

1. **Reversing an Array**:
   - Flipping the order of elements in an array.

2. **Merging Two Sorted Arrays**:
   - Combining two sorted arrays into a single sorted array.

### Time Complexity:

- **Reversing**: O(N)  
  - Every element is processed once.

- **Merging**: O(N + M)  
  - Where N and M are the lengths of the two arrays.

### C++ Implementation:

```cpp
#include <iostream>
#include <vector>
using namespace std;

void reverseArray(vector<int>& arr) {
    int start = 0, end = arr.size() - 1;
    while (start < end) {
        swap(arr[start], arr[end]);
        start++;
        end--;
    }
}

void mergeArrays(const vector<int>& arr1, const vector<int>& arr2, vector<int>& merged) {
    int i = 0, j = 0;
    while (i < arr1.size() && j < arr2.size()) {
        if (arr1[i] < arr2[j]) {
            merged.push_back(arr1[i++]);
        } else {
            merged.push_back(arr2[j++]);
        }
    }
    while (i < arr1.size()) merged.push_back(arr1[i++]);
    while (j < arr2.size()) merged.push_back(arr2[j++]);
}

int main() {
    vector<int> arr = {1, 2, 3, 4, 5};
    reverseArray(arr);
    cout << "Reversed Array: ";
    for (int num : arr) {
        cout << num << " ";
    }
    cout << endl;

    vector<int> arr1 = {1, 3, 5};
    vector<int> arr2 = {2, 4, 6};
    vector<int> merged;
    mergeArrays(arr1, arr2, merged);

    cout << "Merged Array: ";
    for (int num : merged) {
        cout << num << " ";
    }
    cout << endl;

    return 0;
}

```
### Java Implementation:
```java
import java.util.ArrayList;

public class ArrayManipulation {

    public static void reverseArray(int[] arr) {
        int start = 0, end = arr.length - 1;
        while (start < end) {
            int temp = arr[start];
            arr[start] = arr[end];
            arr[end] = temp;
            start++;
            end--;
        }
    }

    public static int[] mergeArrays(int[] arr1, int[] arr2) {
        int[] merged = new int[arr1.length + arr2.length];
        int i = 0, j = 0, k = 0;

        while (i < arr1.length && j < arr2.length) {
            if (arr1[i] < arr2[j]) {
                merged[k++] = arr1[i++];
            } else {
                merged[k++] = arr2[j++];
            }
        }
        while (i < arr1.length) merged[k++] = arr1[i++];
        while (j < arr2.length) merged[k++] = arr2[j++];

        return merged;
    }

    public static void main(String[] args) {
        int[] arr = {1, 2, 3, 4, 5};
        reverseArray(arr);
        System.out.print("Reversed Array: ");
        for (int num : arr) {
            System.out.print(num + " ");
        }
        System.out.println();

        int[] arr1 = {1, 3, 5};
        int[] arr2 = {2, 4, 6};
        int[] merged = mergeArrays(arr1, arr2);

        System.out.print("Merged Array: ");
        for (int num : merged) {
            System.out.print(num + " ");
        }
        System.out.println();
    }
}
```
### Python Implementation:
```python
def reverse_array(arr):
    return arr[::-1]

def merge_arrays(arr1, arr2):
    merged = []
    i = j = 0
    while i < len(arr1) and j < len(arr2):
        if arr1[i] < arr2[j]:
            merged.append(arr1[i])
            i += 1
        else:
            merged.append(arr2[j])
            j += 1
    merged.extend(arr1[i:])
    merged.extend(arr2[j:])
    return merged

if __name__ == "__main__":
    arr = [1, 2, 3, 4, 5]
    print("Reversed Array:", reverse_array(arr))

    arr1 = [1, 3, 5]
    arr2 = [2, 4, 6]
    print("Merged Array:", merge_arrays(arr1, arr2))
```
## Summary:
Array manipulation techniques are vital for efficiently processing and managing data. Techniques such as reversing and merging arrays are foundational skills for any programmer.
