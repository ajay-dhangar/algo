---
id: dutch-national-flag
title: Dutch National Flag Algorithm (3-Way Partitioning)
sidebar_label: Dutch National Flag
sidebar_position: 1
description: "Learn the Dutch National Flag Algorithm (3-Way Partition Sort) invented by Edsger Dijkstra to sort an array of 0s, 1s, and 2s in O(n) time and O(1) space."
tags: [dsa, algorithms, sorting, dutch-national-flag, two-pointers, arrays]
---

# Dutch National Flag Algorithm (3-Way Partitioning)

The **Dutch National Flag Algorithm** is a classic computer science algorithm designed by **Edsger W. Dijkstra**. The problem is named after the flag of the Netherlands, which consists of three horizontal bands of red, white, and blue. 

The algorithm sorts an array containing three distinct keys (typically represented as `0`, `1`, and `2`) in a single pass with $O(n)$ time complexity and $O(1)$ auxiliary space.

---

## Problem Statement

Given an array `nums` with $n$ objects colored red, white, or blue (represented by `0`, `1`, and `2` respectively), sort them **in-place** so that objects of the same color are adjacent, with the colors in the order red (`0`), white (`1`), and blue (`2`).

### Constraints & Goals
- Must be solved **in-place** without using built-in sort functions.
- Must run in $O(n)$ time complexity (single pass).
- Must use $O(1)$ extra space complexity.

---

## How the Algorithm Works

The algorithm uses **three pointers** to partition the array into four regions:
1. `low`: Tracks the boundary for `0`s (Red).
2. `mid`: Tracks the current unexamined element.
3. `high`: Tracks the boundary for `2`s (Blue).

### Invariants Maintained During Execution
- Elements from index `0` to `low - 1` are all **`0`s**.
- Elements from index `low` to `mid - 1` are all **`1`s**.
- Elements from index `mid` to `high` are **unexamined**.
- Elements from index `high + 1` to `n - 1` are all **`2`s**.

```
[ 0 0 ... 0 | 1 1 ... 1 | Unexamined ... | 2 2 ... 2 ]
0       low-1 low   mid-1 mid        high high+1   n-1
```

### Algorithm Steps
1. Initialize `low = 0`, `mid = 0`, and `high = n - 1`.
2. While `mid <= high`:
   - **Case 1 (`nums[mid] == 0`)**: Swap `nums[low]` and `nums[mid]`. Increment both `low` and `mid`.
   - **Case 2 (`nums[mid] == 1`)**: The element is already in the correct middle region. Simply increment `mid`.
   - **Case 3 (`nums[mid] == 2`)**: Swap `nums[mid]` and `nums[high]`. Decrement `high`. *(Note: Do NOT increment `mid` here, as the newly swapped element at `mid` from `high` has not been evaluated yet).*

---

## Step-by-Step Example Walkthrough

Consider the input array: `[2, 0, 1, 2, 1, 0]`

| Step | `low` | `mid` | `high` | `nums[mid]` | Action | Array State |
| :--- | :---: | :---: | :---: | :---: | :--- | :--- |
| **Start** | `0` | `0` | `5` | `2` | Swap `nums[mid]` & `nums[high]`, `high--` | `[0, 0, 1, 2, 1, 2]` |
| **1** | `0` | `0` | `4` | `0` | Swap `nums[low]` & `nums[mid]`, `low++`, `mid++` | `[0, 0, 1, 2, 1, 2]` |
| **2** | `1` | `1` | `4` | `0` | Swap `nums[low]` & `nums[mid]`, `low++`, `mid++` | `[0, 0, 1, 2, 1, 2]` |
| **3** | `2` | `2` | `4` | `1` | Increment `mid++` | `[0, 0, 1, 2, 1, 2]` |
| **4** | `2` | `3` | `4` | `2` | Swap `nums[mid]` & `nums[high]`, `high--` | `[0, 0, 1, 1, 2, 2]` |
| **5** | `2` | `3` | `3` | `1` | Increment `mid++` | `[0, 0, 1, 1, 2, 2]` |
| **End** | `2` | `4` | `3` | - | Loop terminates (`mid > high`) | **`[0, 0, 1, 1, 2, 2]`** |

---

## Code Implementations

### C++ Implementation

```cpp
#include <iostream>
#include <vector>
#include <utility>

class DutchNationalFlag {
public:
    static void sortColors(std::vector<int>& nums) {
        int low = 0;
        int mid = 0;
        int high = static_cast<int>(nums.size()) - 1;

        while (mid <= high) {
            if (nums[mid] == 0) {
                std::swap(nums[low], nums[mid]);
                low++;
                mid++;
            } else if (nums[mid] == 1) {
                mid++;
            } else { // nums[mid] == 2
                std::swap(nums[mid], nums[high]);
                high--;
            }
        }
    }
};

int main() {
    std::vector<int> nums = {2, 0, 1, 2, 1, 0};
    
    DutchNationalFlag::sortColors(nums);

    std::cout << "Sorted Array: ";
    for (int num : nums) {
        std::cout << num << " ";
    }
    std::cout << std::endl;

    return 0;
}
```

### Java Implementation

```java
import java.util.Arrays;

public class DutchNationalFlag {

    public static void sortColors(int[] nums) {
        int low = 0;
        int mid = 0;
        int high = nums.length - 1;

        while (mid <= high) {
            if (nums[mid] == 0) {
                swap(nums, low, mid);
                low++;
                mid++;
            } else if (nums[mid] == 1) {
                mid++;
            } else { // nums[mid] == 2
                swap(nums, mid, high);
                high--;
            }
        }
    }

    private static void swap(int[] nums, int i, int j) {
        int temp = nums[i];
        nums[i] = nums[j];
        nums[j] = temp;
    }

    public static void main(String[] args) {
        int[] nums = {2, 0, 1, 2, 1, 0};
        sortColors(nums);
        System.out.println("Sorted Array: " + Arrays.toString(nums));
    }
}
```

### Python Implementation

```python
from typing import List

def sort_colors(nums: List[int]) -> None:
    """
    Do not return anything, modify nums in-place instead.
    """
    low = 0
    mid = 0
    high = len(nums) - 1

    while mid <= high:
        if nums[mid] == 0:
            nums[low], nums[mid] = nums[mid], nums[low]
            low += 1
            mid += 1
        elif nums[mid] == 1:
            mid += 1
        else:  # nums[mid] == 2
            nums[mid], nums[high] = nums[high], nums[mid]
            high -= 1

# Example usage:
if __name__ == "__main__":
    data = [2, 0, 1, 2, 1, 0]
    sort_colors(data)
    print("Sorted Array:", data)  # Output: [0, 0, 1, 1, 2, 2]
```

### JavaScript Implementation

```javascript
/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
function sortColors(nums) {
    let low = 0;
    let mid = 0;
    let high = nums.length - 1;

    while (mid <= high) {
        if (nums[mid] === 0) {
            [nums[low], nums[mid]] = [nums[mid], nums[low]];
            low++;
            mid++;
        } else if (nums[mid] === 1) {
            mid++;
        } else { // nums[mid] === 2
            [nums[mid], nums[high]] = [nums[high], nums[mid]];
            high--;
        }
    }
}

// Example usage:
const nums = [2, 0, 1, 2, 1, 0];
sortColors(nums);
console.log("Sorted Array:", nums); // Output: [0, 0, 1, 1, 2, 2]
```

---

## Complexity Analysis

| Metric | Complexity | Explanation |
| :--- | :--- | :--- |
| **Best Case Time** | $O(n)$ | Processed in a single pass of $n$ steps. |
| **Average Case Time** | $O(n)$ | Each element is visited and swapped at most once. |
| **Worst Case Time** | $O(n)$ | Single pass over array bounds regardless of initial array ordering. |
| **Space Complexity** | $O(1)$ | Performed in-place with three index pointers. |

---

## Real-World Applications

1. **3-Way QuickSort Partitioning**:
   - Standard QuickSort suffers when an array contains many duplicate elements. Using Dijkstra's 3-way partitioning technique splits elements into `< pivot`, `= pivot`, and `> pivot`, reducing time complexity from $O(n^2)$ down to $O(n)$ on arrays with heavy duplicates.
2. **Data Classification & Priority Queues**:
   - Categorizing datasets into three distinct groups (e.g., Low, Medium, High priority tasks) in linear time without creating new objects.
3. **Image & Signal Processing**:
   - Segregating pixel intensity channels (Red, Green, Blue) or tri-state digital values (Negative, Zero, Positive) in embedded real-time processing systems.
4. **Columnar Database Storage**:
   - Sorting tri-state boolean / nullable flags (`True`, `False`, `Null`) efficiently during database indexing and compression routines.

---

## Key Takeaways

- The Dutch National Flag Algorithm solves 3-way partitioning in **$O(n)$ time** and **$O(1)$ space**.
- **Crucial Pointer Rule**: When swapping with `high`, do **not** increment `mid` immediately because the swapped element from the right must be evaluated in the next iteration.
- It forms the core foundation of **3-way QuickSort** for handling duplicate keys efficiently.
