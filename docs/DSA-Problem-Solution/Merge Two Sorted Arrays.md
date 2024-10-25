# Merge Two Sorted Arrays

## Problem Description
Given two sorted arrays, the task is to merge them into a single sorted array. The input arrays may contain duplicates, and the final output should also be sorted. This problem is a common exercise in understanding array manipulation and is often used to illustrate the two-pointer technique.

### Example
- **Input**:
  - `arr1 = [1, 3, 5]`
  - `arr2 = [2, 4, 6]`
  
- **Output**:
  - `[1, 2, 3, 4, 5, 6]`

## Approach
To merge the two sorted arrays efficiently, we can use the following approach:

1. **Initialize Two Pointers**: Start with two pointers, one for each array, both set to zero.
2. **Compare Elements**: Traverse both arrays and compare the current elements pointed to by the pointers.
   - If the element in the first array is smaller, add it to the merged array and increment the pointer for the first array.
   - If the element in the second array is smaller, add it to the merged array and increment the pointer for the second array.
3. **Handle Remaining Elements**: Once one of the arrays is completely traversed, append any remaining elements from the other array to the merged array.
4. **Return the Merged Array**: The final output will be a single sorted array containing all elements from both input arrays.

### Time Complexity
The time complexity for this approach is \(O(n + m)\), where \(n\) and \(m\) are the lengths of the two input arrays.

## Implementation

### Python Implementation

```python
def merge_sorted_arrays(arr1, arr2):
    i, j = 0, 0  # Pointers for arr1 and arr2
    merged_array = []

    # Traverse both arrays
    while i < len(arr1) and j < len(arr2):
        if arr1[i] < arr2[j]:
            merged_array.append(arr1[i])
            i += 1
        else:
            merged_array.append(arr2[j])
            j += 1

    # Add any remaining elements from arr1
    while i < len(arr1):
        merged_array.append(arr1[i])
        i += 1

    # Add any remaining elements from arr2
    while j < len(arr2):
        merged_array.append(arr2[j])
        j += 1

    return merged_array

# Example usage
arr1 = [1, 3, 5]
arr2 = [2, 4, 6]
merged_result = merge_sorted_arrays(arr1, arr2)
print(merged_result)  # Output: [1, 2, 3, 4, 5, 6]
```
### JavaScript Implementation

```javaScript 
function mergeSortedArrays(arr1, arr2) {
    let i = 0; // Pointer for arr1
    let j = 0; // Pointer for arr2
    const mergedArray = [];

    // Traverse both arrays
    while (i < arr1.length && j < arr2.length) {
        if (arr1[i] < arr2[j]) {
            mergedArray.push(arr1[i]);
            i++;
        } else {
            mergedArray.push(arr2[j]);
            j++;
        }
    }

    // Add remaining elements from arr1
    while (i < arr1.length) {
        mergedArray.push(arr1[i]);
        i++;
    }

    // Add remaining elements from arr2
    while (j < arr2.length) {
        mergedArray.push(arr2[j]);
        j++;
    }

    return mergedArray;
}

// Example usage
const arr1 = [1, 3, 5];
const arr2 = [2, 4, 6];
const mergedResult = mergeSortedArrays(arr1, arr2);
console.log(mergedResult); // Output: [1, 2, 3, 4, 5, 6]
```
### Java Implementation

```java 
import java.util.ArrayList;
import java.util.Arrays;

public class MergeSortedArrays {
    public static int[] mergeSortedArrays(int[] arr1, int[] arr2) {
        int i = 0, j = 0;
        ArrayList<Integer> mergedList = new ArrayList<>();

        // Traverse both arrays
        while (i < arr1.length && j < arr2.length) {
            if (arr1[i] < arr2[j]) {
                mergedList.add(arr1[i]);
                i++;
            } else {
                mergedList.add(arr2[j]);
                j++;
            }
        }

        // Add remaining elements from arr1
        while (i < arr1.length) {
            mergedList.add(arr1[i]);
            i++;
        }

        // Add remaining elements from arr2
        while (j < arr2.length) {
            mergedList.add(arr2[j]);
            j++;
        }

        // Convert ArrayList to int[]
        return mergedList.stream().mapToInt(Integer::intValue).toArray();
    }

    public static void main(String[] args) {
        int[] arr1 = {1, 3, 5};
        int[] arr2 = {2, 4, 6};
        int[] mergedResult = mergeSortedArrays(arr1, arr2);
        System.out.println(Arrays.toString(mergedResult)); // Output: [1, 2, 3, 4, 5, 6]
    }
}
```
## Conclusion
The merging of two sorted arrays is a fundamental problem in computer science that demonstrates the efficiency of the two-pointer technique. The provided implementations in Python, JavaScript, and Java offer a straightforward approach to solving this problem.
