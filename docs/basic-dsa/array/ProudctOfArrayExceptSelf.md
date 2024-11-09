---
id: arrays-product-of-array-except-self
title: Arrays - Product of Array Except Self
sidebar_label: Product of Array Except Self
sidebar_position: 3
description: "The Product of Array Except Self problem requires calculating the product of all elements in an array except for the element at the current index. The challenge is to perform this without using division and in O(n) time complexity."
tags: [dsa, arrays, product-of-array, pseudocode, Implementation, explanation, conclusion]
---

<AdsComponent />

## Product of Array Except Self

The **Product of Array Except Self** problem involves computing an output array such that `output[i]` is equal to the product of all the elements of the input array except for `input[i]`. 

### Problem Statement

Given an array `nums` of length `n`, return an array `output` of the same length where `output[i]` is equal to the product of all the numbers in the input array except `nums[i]`.

### Constraints
- You must solve it in O(n) time complexity.
- You cannot use the division operation.

<BubbleSortVisualization />

## Algorithm

1. Create an output array of the same length as `nums`.
2. Initialize a variable `left` to 1.
3. Populate the output array with the product of all elements to the left of each index.
4. Initialize another variable `right` to 1.
5. Populate the output array with the product of all elements to the right of each index.
6. Return the output array.

## Pseudocode

```plaintext title="Product of Array Except Self"
procedure productExceptSelf( nums : list of integers )
    n = length(nums)
    output = array of size n

    left = 1
    for i = 0 to n - 1 do
        output[i] = left
        left *= nums[i]

    right = 1
    for i = n - 1 down to 0 do
        output[i] *= right
        right *= nums[i]

    return output
end procedure


```

### C++ Implementation:

```cpp

// Product of Array Except Self
#include <iostream>
#include <vector>
using namespace std;

vector<int> sum(vector<int> &arr)
{
    int n = arr.size();
    vector<int> ans(n, 1); // Initialize ans array with 1's.

    // Calculate prefix products
    for (int i = 1; i < n; i++)
    {
        ans[i] = ans[i - 1] * arr[i - 1]; // ans[i] is the product of all elements before arr[i].
    }

    int suffix = 1; // Initialize suffix product.
    // Calculate suffix products and multiply with prefix products
    for (int i = n - 2; i >= 0; i--)
    {
        suffix *= arr[i + 1]; // Update suffix to be the product of elements after arr[i].
        ans[i] *= suffix;     // Multiply the current ans[i] (prefix product) by the suffix product.
    }
    return ans;
}

// Main Function
int main()
{
    vector<int> arr = {1, 2, 3, 4};
    vector<int> res = sum(arr); // calling function
    for (int val : res)
    {
        cout << val << " ";
    }
    return 0;
}

```

### JAVA Implementation:

```java

public class ProductExceptSelf {
    public static int[] productExceptSelf(int[] nums) {
        int n = nums.length;
        int[] output = new int[n];

        // Step 1: Calculate prefix products
        output[0] = 1; // The first prefix product is always 1
        for (int i = 1; i < n; i++) {
            output[i] = output[i - 1] * nums[i - 1];
        }
        // Step 2: Calculate suffix products and multiply with prefix
        int suffix = 1;
        for (int i = n - 1; i >= 0; i--) {
            output[i] *= suffix;
            suffix *= nums[i];
        }
        return output;
    }

    public static void main(String[] args) {
        int[] nums = {1, 2, 3, 4};
        int[] result = productExceptSelf(nums);
        for (int value : result) {
            System.out.print(value + " "); // Output: 24 12 8 6
        }
    }
}

```

### Python Implementation:
```py

def product_except_self(nums):
    n = len(nums)
    output = [1] * n

    # Step 1: Calculate prefix products
    for i in range(1, n):
        output[i] = output[i - 1] * nums[i - 1]

    # Step 2: Calculate suffix products and multiply with prefix
    suffix = 1
    for i in range(n - 1, -1, -1):
        output[i] *= suffix
        suffix *= nums[i]

    return output

# Example usage
nums = [1, 2, 3, 4]
result = product_except_self(nums)
print(result)  # Output: [24, 12, 8, 6]

```


### JavaScript Code Implementation

```javascript
function productExceptSelf(arr) {
    const n = arr.length;
    const ans = new Array(n).fill(1); // Initialize ans array with 1's.

    // Calculate prefix products
    for (let i = 1; i < n; i++) {
        ans[i] = ans[i - 1] * arr[i - 1]; // ans[i] is the product of all elements before arr[i].
    }

    let suffix = 1; // Initialize suffix product.
    // Calculate suffix products and multiply with prefix products
    for (let i = n - 2; i >= 0; i--) {
        suffix *= arr[i + 1]; // Update suffix to be the product of elements after arr[i].
        ans[i] *= suffix;     // Multiply the current ans[i] (prefix product) by the suffix product.
    }
    
    return ans;
}

// Example usage
const arr = [1, 2, 3, 4];
const res = productExceptSelf(arr); // calling function
console.log(res.join(" ")); // Output the result
```

## Complexity

- **Time Complexity**: O(n)
- **Space Complexity**: O(1) if we use the output array directly for left and right products (optimized version).

> **Note**: The above implementation uses O(n) space for the output array.

## Explanation

To find the output array where each element at index `i` is the product of all the numbers in the input array except the one at `i`, we can utilize prefix and suffix products.

### Step-by-step Breakdown

1. **Initial Array**: 
   We start with the input array:  
   `[1, 2, 3, 4]`

2. **Calculate Prefix Products**:
   - We create an output array initialized with 1's:  
   `output = [1, 1, 1, 1]`
   - The prefix product at each index is calculated as follows:
     - For index 0:  
       `output[0] = 1` (no elements to the left)
     - For index 1:  
       `output[1] = output[0] * 1 = 1 * 1 = 1`
     - For index 2:  
       `output[2] = output[1] * 2 = 1 * 2 = 2`
     - For index 3:  
       `output[3] = output[2] * 3 = 2 * 3 = 6`

   After calculating the prefix products, we get:  
   `output = [1, 1, 2, 6]`

3. **Calculate Suffix Products**:
   - We now iterate from the end of the array to the beginning to calculate the suffix products:
   - Initialize a variable for the suffix product:
     - `suffix = 1`
   - Update the output array while multiplying by the suffix product:
     - For index 3:  
       `output[3] = output[3] * suffix = 6 * 1 = 6`  
       Update suffix: `suffix = suffix * 4 = 4`
     - For index 2:  
       `output[2] = output[2] * suffix = 2 * 4 = 8`  
       Update suffix: `suffix = suffix * 3 = 12`
     - For index 1:  
       `output[1] = output[1] * suffix = 1 * 12 = 12`  
       Update suffix: `suffix = suffix * 2 = 24`
     - For index 0:  
       `output[0] = output[0] * suffix = 1 * 24 = 24`  
       Update suffix: `suffix = suffix * 1 = 24`

   After calculating the suffix products, we get:  
   `output = [24, 12, 8, 6]`

### Final Output

Thus, the output for the input array `[1, 2, 3, 4]` is:  
`[24, 12, 8, 6]`

- `output[0] = 2 * 3 * 4 = 24`
- `output[1] = 1 * 3 * 4 = 12`
- `output[2] = 1 * 2 * 4 = 8`
- `output[3] = 1 * 2 * 3 = 6`


### Note

This problem is commonly asked in coding interviews and is a great way to understand how to manipulate arrays without using division.

:::info
**Try it yourself:** Change the array values and see how the output array changes based on the product of the other elements.
:::

<AdsComponent />

## Conclusion

The **Product of Array Except Self** problem showcases a fundamental approach in algorithm design where efficient solutions can be derived through thoughtful manipulation of arrays. By utilizing the concept of prefix and suffix products, we can compute the desired output without resorting to division, which can often complicate matters when dealing with zeroes or other special cases in arrays.

### Key Takeaways:

1. **Efficiency**: The algorithm operates in O(n) time complexity, making it highly efficient even for larger datasets. The use of a single pass to compute both prefix and suffix products illustrates how to leverage iterative techniques to minimize computational overhead.

2. **Space Optimization**: While the naive approach might suggest using additional arrays for prefix and suffix products, this solution elegantly maintains a single output array, thereby achieving O(1) space complexity in terms of auxiliary space. This is crucial in scenarios where memory usage is a concern.

3. **Versatility**: This problem serves as a great illustration of how array manipulation can be utilized in various applications, from statistical calculations to financial analyses. Understanding this algorithm equips developers with the ability to tackle a range of similar challenges effectively.

4. **Practical Applications**: The principles demonstrated in this algorithm can be extended to various real-world applications, such as calculating cumulative products in datasets, performance analysis, and even in fields like signal processing where such operations are commonplace.

In summary, mastering the **Product of Array Except Self** problem not only enhances one’s problem-solving skills but also lays the groundwork for tackling more complex algorithmic challenges involving arrays and other data structures.

## References

- [LeetCode](https://leetcode.com/problems/product-of-array-except-self/)
- [GeeksforGeeks](https://www.geeksforgeeks.org/problems/product-array-puzzle4525/1)

<AdsComponent />
