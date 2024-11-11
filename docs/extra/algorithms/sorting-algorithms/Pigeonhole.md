---

id: pigeonhole-sort-algo  
sidebar_position: 14  
title: Pigeonhole Sort  
sidebar_label: Pigeonhole Sort  

---

### Definition:

Pigeonhole Sort is a non-comparison sorting algorithm based on the pigeonhole principle. It sorts an array of n elements where the range of input values ( k ) is not significantly greater than n. The algorithm distributes the elements into "pigeonholes" (or buckets) according to their value and then collects them back into a sorted order.

### Characteristics:

- **Pigeonhole Principle**:
  - Pigeonhole sort works on the idea that if n items are put into m containers, with n>m, at least one container must contain more than one item. This principle is used to allocate input values into corresponding pigeonholes.

- **Bucket Distribution**:
  - The algorithm creates an array of pigeonholes to store the input values, where the index corresponds to the value of the elements being sorted.

- **In-Place**:
  - While pigeonhole sort requires additional space to hold the pigeonholes, the sorting operation itself can be performed in-place.

- **Stable**:
  - Pigeonhole sort can be implemented in a stable manner, meaning it preserves the relative order of equal elements.

### Time Complexity:

- **Best Case: O(n + k)**  
  In the best case, when the input values are well-distributed, the algorithm performs efficiently.

- **Average Case: O(n + k)**  
The average-case complexity remains linear with respect to the number of elements and the range of the input values.

- **Worst Case: O(n + k)**  
The worst-case scenario still yields linear time complexity as it processes all values in the range.

### Space Complexity:

- **Space Complexity: O(k)**  
The space complexity is linear relative to the range of input values, which may lead to inefficiency when the range is much larger than \( n \).

### Java Implementation:

```java
import java.util.Arrays;

public class PigeonholeSort {
    public static void pigeonholeSort(int[] arr) {
        int min = arr[0];
        int max = arr[0];

        // Find the range (min and max values)
        for (int i = 1; i < arr.length; i++) {
            if (arr[i] < min) {
                min = arr[i];
            }
            if (arr[i] > max) {
                max = arr[i];
            }
        }

        int range = max - min + 1; // Size of pigeonholes
        int[] pigeonholes = new int[range];

        // Populate the pigeonholes
        for (int i = 0; i < arr.length; i++) {
            pigeonholes[arr[i] - min]++;
        }

        // Collect the sorted elements
        int index = 0;
        for (int i = 0; i < range; i++) {
            while (pigeonholes[i] > 0) {
                arr[index++] = i + min;
                pigeonholes[i]--;
            }
        }
    }

    public static void main(String[] args) {
        int[] arr = {8, 3, 2, 7, 4, 6, 1, 5};
        pigeonholeSort(arr);
        System.out.println("Sorted array: " + Arrays.toString(arr));
    }
}
```

### Summary:
Pigeonhole Sort is an efficient sorting algorithm for datasets with a limited range of values. With a time complexity of 𝑂(𝑛+𝑘), it performs well when the range of input values is not excessively large compared to the number of elements. However, it is not widely used in practical applications due to its linear space requirement when the range is much larger than 𝑛.
