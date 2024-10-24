| id  | title                         | sidebar_label                | description                                                                                        | tags              |
| --- | ----------------------------- | ----------------------------- | -------------------------------------------------------------------------------------------------- | ----------------- |
| Maximum Product Subarray   | Maximum Product Subarray in a Array      | Maximum Product Subarray      | Given an array containing both negative and positive integers, find the maximum product subarray. | `Dynamic Programming`, `Array` |

---

## Problem Statement
Given an array that contains both negative and positive integers, find the maximum product subarray.

**LeetCode Problem Link**: [Maximum Product Subarray](https://leetcode.com/problems/maximum-product-subarray/description/)

---

## Examples

**Example 1**:  
Input:  
`Nums = [1, 2, 3, 4, 5, 0]`  
Output:  
`120`  
**Explanation**:  
In the given array, we can see `1 × 2 × 3 × 4 × 5` gives the maximum product value.

---

**Example 2**:  
Input:  
`Nums = [1, 2, -3, 0, -4, -5]`  
Output:  
`20`  
**Explanation**:  
In the given array, we can see `(-4) × (-5)` gives the maximum product value.

---

## Approach
The following approach is motivated by Kadane’s algorithm. The key insight is that we can obtain the maximum product from the product of two negative numbers as well.

### Steps:
1. Initially, store the value at the 0th index in `prod1`, `prod2`, and `result`.
2. Traverse the array starting from the 1st index.
3. For each element:
   - Update `prod1` to be the maximum of the current element, the product of the current element and `prod1`, and the product of the current element and `prod2`.
   - Update `prod2` to be the minimum of the current element, the product of the current element and `prod1`, and the product of the current element and `prod2`.
4. Return the maximum of `result` and `prod1`.

## Java Implementation

```java
import java.util.*;

public class Main {
    static int maxProductSubArray(int arr[]) {
        int prod1 = arr[0], prod2 = arr[0], result = arr[0];
        
        for (int i = 1; i < arr.length; i++) {
            int temp = Math.max(arr[i], Math.max(prod1 * arr[i], prod2 * arr[i]));
            prod2 = Math.min(arr[i], Math.min(prod1 * arr[i], prod2 * arr[i]));
            prod1 = temp;
            
            result = Math.max(result, prod1);
        }
        
        return result;
    }

    public static void main(String[] args) {
        int nums[] = {1, 2, -3, 0, -4, -5};
        int answer = maxProductSubArray(nums);
        System.out.print("The maximum product subarray is: " + answer);
    }
}
```

---
## Time Complexity
The time complexity of this algorithm is O(n), where n is the number of elements in the input array. We traverse the array once to calculate the maximum product.The space complexity is O(1) since we are using only a constant amount of space for variables.

---
## Conclusion
This approach efficiently finds the maximum product subarray by leveraging the properties of positive and negative integers. It maintains both the maximum and minimum products at each step, allowing it to handle negative values effectively. This solution is optimal in terms of both time and space complexity, making it suitable for large input sizes.