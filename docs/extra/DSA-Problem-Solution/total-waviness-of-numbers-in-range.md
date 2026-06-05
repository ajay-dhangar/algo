---
id: total-waviness-of-numbers-in-range
title: "Total Waviness of Numbers in Range I"
sidebar_label: Total Waviness of Numbers in Range I
description: "Determining the total sum of waviness for all numbers in a given range by checking for peaks and valleys among their digits."
tags: [DSA, leetcode, math, simulation]
---

## Description:

You are given two integers `num1` and `num2` representing an inclusive range `[num1, num2]`.

The **waviness** of a number is defined as the total count of its peaks and valleys:
- A digit is a **peak** if it is strictly greater than both of its immediate neighbors.
- A digit is a **valley** if it is strictly less than both of its immediate neighbors.
- The first and last digits of a number cannot be peaks or valleys.
- Any number with fewer than 3 digits has a waviness of `0`.

**Objective:** Return the total sum of waviness for all numbers in the range `[num1, num2]`.

---

## Approaches:

### 1. Digit Simulation

Since we need to check the waviness for every number in the given range, we can iterate through each number from `num1` to `num2`. For each number:
1. Extract its digits. (Note: Extracting digits via modulo arithmetic reverses the number, but since peaks and valleys are symmetric, the sequence order doesn't change the total count).
2. If the number has fewer than 3 digits, its waviness is `0`.
3. Iterate through the extracted digits (excluding the first and last elements) and check if each digit is strictly greater than its adjacent elements (a peak) or strictly less than its adjacent elements (a valley).
4. Keep a running sum of all valid peaks and valleys and add it to our total answer.

* **Time Complexity:** $O(N \cdot \log_{10}(\text{num2}))$ where $N$ is the number of elements in the range `[num1, num2]`. We iterate through $N$ numbers, and extracting digits takes logarithmic time.
* **Space Complexity:** $O(\log_{10}(\text{num2}))$ because we use an array/list to temporarily store the digits of each number while processing it, taking minimal extra space.

#### Solutions:

**C++**
```cpp
class Solution {
public:
    int totalWaviness(int num1, int num2) {
        int totalSum = 0;
        for (int x = num1; x <= num2; x++) {
            totalSum += getWaviness(x);
        }
        return totalSum;
    }

private:
    int getWaviness(int x) {
        vector<int> nums;
        while (x > 0) {
            nums.push_back(x % 10);
            x /= 10;
        }
        
        int m = nums.size();
        if (m < 3) return 0;
        
        int waviness = 0;
        for (int i = 1; i < m - 1; i++) {
            if (nums[i] > nums[i - 1] && nums[i] > nums[i + 1]) {
                waviness++; 
            } else if (nums[i] < nums[i - 1] && nums[i] < nums[i + 1]) {
                waviness++; 
            }
        }
        return waviness;
    }
};
```

**Java**
```java
class Solution {
    public int totalWaviness(int num1, int num2) {
        int totalSum = 0;
        for (int x = num1; x <= num2; x++) {
            totalSum += getWaviness(x);
        }
        return totalSum;
    }
    
    private int getWaviness(int x) {
        int[] nums = new int[12]; 
        int m = 0;
        while (x > 0) {
            nums[m++] = x % 10;
            x /= 10;
        }
        
        if (m < 3) return 0;
        
        int waviness = 0;
        for (int i = 1; i < m - 1; i++) {
            if (nums[i] > nums[i - 1] && nums[i] > nums[i + 1]) {
                waviness++; 
            } else if (nums[i] < nums[i - 1] && nums[i] < nums[i + 1]) {
                waviness++; 
            } 
        }
        return waviness;
    }
}
```

**Python**
```py
class Solution:
    def totalWaviness(self, num1: int, num2: int) -> int:
        def get_waviness(x: int) -> int:
            nums = []
            while x > 0:
                nums.append(x % 10)
                x //= 10
                
            m = len(nums)
            if m < 3:
                return 0
                
            waviness = 0
            for i in range(1, m - 1):
                if nums[i] > nums[i - 1] and nums[i] > nums[i + 1]:
                    waviness += 1 
                elif nums[i] < nums[i - 1] and nums[i] < nums[i + 1]:
                    waviness += 1 
                    
            return waviness
            
        return sum(get_waviness(x) for x in range(num1, num2 + 1))
```

**JavaScript**
```js
/**
 * @param {number} num1
 * @param {number} num2
 * @return {number}
 */
const totalWaviness = function(num1, num2) {
    let totalSum = 0;
    
    const getWaviness = (x) => {
        const nums = [];
        while (x > 0) {
            nums.push(x % 10);
            x = Math.floor(x / 10);
        }
        
        const m = nums.length;
        if (m < 3) return 0;
        
        let waviness = 0;
        for (let i = 1; i < m - 1; i++) {
            if (nums[i] > nums[i - 1] && nums[i] > nums[i + 1]) {
                waviness++; 
            } else if (nums[i] < nums[i - 1] && nums[i] < nums[i + 1]) {
                waviness++; 
            }
        }
        return waviness;
    };

    for (let x = num1; x <= num2; x++) {
        totalSum += getWaviness(x);
    }
    
    return totalSum;
};
```
