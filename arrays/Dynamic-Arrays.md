---
id: dynamic-arrays
title: Dynamic Arrays
sidebar_label: Dynamic Arrays
sidebar_position: 1
description: Dynamic arrays provide a way to handle variable-sized data collections that can grow or shrink during program execution.
tags: [basic-dsa, data-structures, dynamic-arrays]
---

### Definition:

Dynamic arrays are a type of data structure that can resize itself automatically when elements are added or removed. They allow for efficient storage and access of elements, making them a fundamental component of modern programming.

### Characteristics:

- **Resizable**:
  - Unlike static arrays, dynamic arrays can grow and shrink in size, allowing for flexible memory usage.

- **Amortized Time Complexity**:
  - Adding elements typically takes O(1) time on average, due to occasional resizing.

### Time Complexity:

- **Access: O(1)**  
  - Direct access to elements is constant time.

- **Insertion: O(1) (amortized)**  
  - Generally, inserting an element is efficient, but can take longer during resizing.

- **Deletion: O(N)**  
  - Removing an element may require shifting elements.

### C++ Implementation:

```cpp
#include <iostream>
#include <vector>
using namespace std;

int main() {
    vector<int> dynamicArray;

    dynamicArray.push_back(1);
    dynamicArray.push_back(2);
    dynamicArray.push_back(3);

    cout << "Dynamic Array Elements: ";
    for (int num : dynamicArray) {
        cout << num << " ";
    }
    cout << endl;

    return 0;
}
```
### Java Implementation:
```java
import java.util.ArrayList;

public class DynamicArray {

    public static void main(String[] args) {
        ArrayList<Integer> dynamicArray = new ArrayList<>();

        dynamicArray.add(1);
        dynamicArray.add(2);
        dynamicArray.add(3);

        System.out.print("Dynamic Array Elements: ");
        for (int num : dynamicArray) {
            System.out.print(num + " ");
        }
        System.out.println();
    }
}
```

### Python implementation:
```python
dynamic_array = []

dynamic_array.append(1)
dynamic_array.append(2)
dynamic_array.append(3)

print("Dynamic Array Elements:", dynamic_array)
```

## Summary:
Dynamic arrays are essential for managing collections of data that need to change size during execution. Their ability to resize and provide efficient access makes them a crucial structure in programming.