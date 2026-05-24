---
id: prefix-sum-introduction
title: Prefix Sum Algorithm
sidebar_label: Prefix Sum (1D)
sidebar_position: 1
description: "Learn the Prefix Sum technique — a powerful range-query optimization that answers range sum queries in O(1) after O(n) preprocessing. Includes dry runs, complexity analysis, common mistakes, and multi-language implementations."
tags: [dsa, algorithms, prefix sum, range query, arrays, competitive programming]
---

## Prefix Sum Algorithm

### Introduction & Intuition

Imagine you are given an array of `n` numbers and asked **hundreds of thousands of times**: *"What is the sum of elements from index `l` to index `r`?"*

A naive approach would loop through `arr[l..r]` for every query — costing **O(n)** per query, or **O(n × Q)** total (where Q is the number of queries). For large inputs, this is too slow.

**Prefix Sum** solves this with a simple preprocessing trick:

> Build an auxiliary array `prefix[]` where `prefix[i]` stores the **sum of all elements from index 0 to i**.

Then, any range sum `arr[l..r]` can be answered in **O(1)** using:

```
rangeSum(l, r) = prefix[r] - prefix[l - 1]
```

This is the core idea: **precompute cumulative sums once, then answer each query in constant time.**

---

### Building the Prefix Sum Array

Given an array:

```
arr = [3, 1, 4, 1, 5, 9, 2, 6]
```

The prefix sum array is built as:

```
prefix[0] = arr[0]            = 3
prefix[1] = prefix[0] + arr[1] = 3 + 1 = 4
prefix[2] = prefix[1] + arr[2] = 4 + 4 = 8
prefix[3] = prefix[2] + arr[3] = 8 + 1 = 9
prefix[4] = prefix[3] + arr[4] = 9 + 5 = 14
prefix[5] = prefix[4] + arr[5] = 14 + 9 = 23
prefix[6] = prefix[5] + arr[6] = 23 + 2 = 25
prefix[7] = prefix[6] + arr[7] = 25 + 6 = 31
```

So:

```
prefix = [3, 4, 8, 9, 14, 23, 25, 31]
```

---

### Range Sum Query — Dry Run

**Query:** Sum of `arr[2..5]` → expected = `4 + 1 + 5 + 9 = 19`

Using the formula:

```
rangeSum(2, 5) = prefix[5] - prefix[1]
              = 23 - 4
              = 19  ✓
```

**Query:** Sum of `arr[0..4]` → expected = `3 + 1 + 4 + 1 + 5 = 14`

```
rangeSum(0, 4) = prefix[4] - prefix[-1]
              = 14 - 0          (prefix[-1] is defined as 0)
              = 14  ✓
```

> **Tip:** Use a 1-indexed prefix array (`prefix[1..n]`) to avoid the special case for `l = 0`.

---

### Formula (1-indexed version)

If `prefix[i] = arr[1] + arr[2] + ... + arr[i]`, then:

```
rangeSum(l, r) = prefix[r] - prefix[l - 1]
```

This is uniform for all `l`, including `l = 1`.

---

### Time & Space Complexity

| Operation         | Complexity |
|-------------------|------------|
| Build prefix array | O(n)      |
| Single range query | O(1)      |
| Total for Q queries | O(n + Q) |
| Space (prefix array) | O(n)    |

---

### Common Mistakes

1. **Off-by-one errors** — confusing 0-indexed vs 1-indexed. Always decide upfront and be consistent.
2. **Forgetting `prefix[-1] = 0`** — when using 0-indexed and `l = 0`, you must handle this edge case.
3. **Modifying the original array** — don't overwrite `arr[]` while building `prefix[]`.
4. **Integer overflow** — for large arrays with large values, use `long long` in C++ or `long` in Java.
5. **Not re-building on updates** — prefix sum is static; for dynamic updates, consider a Fenwick Tree or Segment Tree.

---

### C++ Implementation

```cpp
#include <iostream>
#include <vector>
using namespace std;

int main() {
    vector<int> arr = {3, 1, 4, 1, 5, 9, 2, 6};
    int n = arr.size();

    // Build prefix sum array (1-indexed for simplicity)
    vector<long long> prefix(n + 1, 0);
    for (int i = 1; i <= n; i++) {
        prefix[i] = prefix[i - 1] + arr[i - 1];
    }

    // Range sum query: sum of arr[l..r] (1-indexed)
    auto rangeSum = [&](int l, int r) -> long long {
        return prefix[r] - prefix[l - 1];
    };

    // Example queries
    cout << "Sum of arr[1..4] = " << rangeSum(1, 4) << endl;  // 3+1+4+1 = 9
    cout << "Sum of arr[3..6] = " << rangeSum(3, 6) << endl;  // 4+1+5+9 = 19
    cout << "Sum of arr[1..8] = " << rangeSum(1, 8) << endl;  // 31

    return 0;
}
```

**Output:**
```
Sum of arr[1..4] = 9
Sum of arr[3..6] = 19
Sum of arr[1..8] = 31
```

---

### Java Implementation

```java
public class PrefixSum {

    static long[] buildPrefix(int[] arr) {
        int n = arr.length;
        long[] prefix = new long[n + 1]; // 1-indexed
        for (int i = 1; i <= n; i++) {
            prefix[i] = prefix[i - 1] + arr[i - 1];
        }
        return prefix;
    }

    static long rangeSum(long[] prefix, int l, int r) {
        return prefix[r] - prefix[l - 1];
    }

    public static void main(String[] args) {
        int[] arr = {3, 1, 4, 1, 5, 9, 2, 6};
        long[] prefix = buildPrefix(arr);

        System.out.println("Sum of arr[1..4] = " + rangeSum(prefix, 1, 4)); // 9
        System.out.println("Sum of arr[3..6] = " + rangeSum(prefix, 3, 6)); // 19
        System.out.println("Sum of arr[1..8] = " + rangeSum(prefix, 1, 8)); // 31
    }
}
```

---

### Python Implementation

```python
def build_prefix(arr):
    n = len(arr)
    prefix = [0] * (n + 1)  # 1-indexed
    for i in range(1, n + 1):
        prefix[i] = prefix[i - 1] + arr[i - 1]
    return prefix

def range_sum(prefix, l, r):
    """Returns sum of arr[l..r] (1-indexed)."""
    return prefix[r] - prefix[l - 1]

# Example usage
arr = [3, 1, 4, 1, 5, 9, 2, 6]
prefix = build_prefix(arr)

print(f"Sum of arr[1..4] = {range_sum(prefix, 1, 4)}")  # 9
print(f"Sum of arr[3..6] = {range_sum(prefix, 3, 6)}")  # 19
print(f"Sum of arr[1..8] = {range_sum(prefix, 1, 8)}")  # 31
```

---

### JavaScript Implementation

```javascript
function buildPrefix(arr) {
    const n = arr.length;
    const prefix = new Array(n + 1).fill(0); // 1-indexed
    for (let i = 1; i <= n; i++) {
        prefix[i] = prefix[i - 1] + arr[i - 1];
    }
    return prefix;
}

function rangeSum(prefix, l, r) {
    return prefix[r] - prefix[l - 1];
}

// Example usage
const arr = [3, 1, 4, 1, 5, 9, 2, 6];
const prefix = buildPrefix(arr);

console.log(`Sum of arr[1..4] = ${rangeSum(prefix, 1, 4)}`); // 9
console.log(`Sum of arr[3..6] = ${rangeSum(prefix, 3, 6)}`); // 19
console.log(`Sum of arr[1..8] = ${rangeSum(prefix, 1, 8)}`); // 31
```

---

### Competitive Programming Applications

| Problem Type | How Prefix Sum Helps |
|---|---|
| Range Sum Query | Direct application — O(1) per query |
| Subarray with Target Sum | Check if `prefix[r] - prefix[l] == target` |
| Count of Odd/Even numbers in range | Use prefix counts instead of sums |
| Equilibrium Index | Left sum = total - left sum - arr[i] |
| Maximum Subarray Sum (Kadane's variant) | Track min prefix seen so far |
| Counting Inversions | Combined with merge sort |
| Number of subarrays with given XOR | Replace `+` with `XOR` in prefix array |

---

### Equilibrium Index — Classic Prefix Sum Problem

An **equilibrium index** is an index `i` where the sum of elements to the left equals the sum to the right.

```python
def find_equilibrium(arr):
    total = sum(arr)
    left_sum = 0
    for i, val in enumerate(arr):
        # right_sum = total - left_sum - arr[i]
        if left_sum == total - left_sum - val:
            return i
        left_sum += val
    return -1

arr = [1, 7, 3, 6, 5, 6]
print(f"Equilibrium index: {find_equilibrium(arr)}")  # Output: 3
```

---

### Summary

- Prefix Sum preprocesses an array in **O(n)** to answer range sum queries in **O(1)**.
- It's one of the most frequently used techniques in competitive programming.
- Use **1-indexed prefix arrays** to avoid edge-case handling for `l = 0`.
- For large values, watch for **integer overflow** — use 64-bit integers.
- Prefix Sum is the foundation for more advanced structures like **Fenwick Trees** and **2D Prefix Sum**.

---

### Next Steps

- 📄 [2D Prefix Sum](./2d-prefix-sum) — Extend the concept to matrices for 2D range queries
- 📄 [Difference Array](./difference-array) — Efficiently handle range update operations
- 📄 [Practice Problems](./practice-problems) — Sharpen your skills with curated problems
