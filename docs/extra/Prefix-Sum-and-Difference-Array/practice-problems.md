---
id: prefix-sum-practice-problems
title: Practice Problems — Prefix Sum & Difference Array
sidebar_label: Practice Problems
sidebar_position: 4
description: "Curated practice problems for mastering Prefix Sum and Difference Array techniques. Problems are organized by difficulty with hints and approach guidance."
tags: [dsa, algorithms, prefix sum, difference array, practice problems, competitive programming, leetcode]
---

## Practice Problems

Sharpen your understanding of **Prefix Sum** and **Difference Array** with these carefully selected problems, organized by difficulty level.

---

### 🟢 Beginner — Warm-Up

These problems have a direct and straightforward application of the techniques.

---

#### 1. Range Sum Query — Immutable
**Platform:** LeetCode #303  
**Link:** [leetcode.com/problems/range-sum-query-immutable](https://leetcode.com/problems/range-sum-query-immutable/)

**Problem:** Given an integer array, handle multiple queries of the form `sumRange(l, r)`.

**Technique:** 1D Prefix Sum  
**Hint:** Build prefix once in the constructor. Answer each query in O(1).

```python
class NumArray:
    def __init__(self, nums):
        n = len(nums)
        self.prefix = [0] * (n + 1)
        for i in range(1, n + 1):
            self.prefix[i] = self.prefix[i-1] + nums[i-1]

    def sumRange(self, left, right):
        return self.prefix[right + 1] - self.prefix[left]
```

---

#### 2. Running Sum of 1D Array
**Platform:** LeetCode #1480  
**Link:** [leetcode.com/problems/running-sum-of-1d-array](https://leetcode.com/problems/running-sum-of-1d-array/)

**Problem:** Return the running sum of an array, where `runningSum[i]` = sum of `nums[0..i]`.

**Technique:** Prefix Sum (in-place)  
**Hint:** This IS the prefix array itself.

```python
def runningSum(nums):
    for i in range(1, len(nums)):
        nums[i] += nums[i-1]
    return nums
```

---

#### 3. Find the Middle Index in Array
**Platform:** LeetCode #1991  
**Link:** [leetcode.com/problems/find-the-middle-index-in-array](https://leetcode.com/problems/find-the-middle-index-in-array/)

**Problem:** Find the leftmost index where the sum of elements to the left equals the sum to the right.

**Technique:** Prefix Sum + Suffix Sum  
**Complexity:** O(n) time, O(1) space

---

### 🟡 Intermediate — Core Mastery

These require combining prefix sum with additional observations.

---

#### 4. Subarray Sum Equals K
**Platform:** LeetCode #560  
**Link:** [leetcode.com/problems/subarray-sum-equals-k](https://leetcode.com/problems/subarray-sum-equals-k/)

**Problem:** Count the number of subarrays that sum to `k`.

**Technique:** Prefix Sum + HashMap  
**Key Insight:** `prefix[j] - prefix[i] == k` ⟺ `prefix[i] == prefix[j] - k`

**Approach:**
1. Maintain a hash map of `{prefix_sum: count}`.
2. For each element, check if `current_prefix - k` is in the map.
3. Add the count to the answer, then update the map.

**Complexity:** O(n) time, O(n) space

---

#### 5. Corporate Flight Bookings
**Platform:** LeetCode #1109  
**Link:** [leetcode.com/problems/corporate-flight-bookings](https://leetcode.com/problems/corporate-flight-bookings/)

**Problem:** Given bookings `[first, last, seats]`, find total seats reserved for each flight.

**Technique:** Difference Array  
**Hint:** Each booking is a range update. Apply all, then reconstruct.

```python
def corpFlightBookings(bookings, n):
    D = [0] * (n + 2)
    for first, last, seats in bookings:
        D[first] += seats
        D[last + 1] -= seats
    # Reconstruct (prefix sum of D)
    for i in range(1, n + 1):
        D[i] += D[i-1]
    return D[1:n+1]
```

---

#### 6. Car Pooling
**Platform:** LeetCode #1094  
**Link:** [leetcode.com/problems/car-pooling](https://leetcode.com/problems/car-pooling/)

**Problem:** Passengers board at `from` and exit at `to`. Can the car hold at most `capacity` at any point?

**Technique:** Difference Array  
**Hint:** Track passenger count changes at each stop. Check max never exceeds capacity.

---

#### 7. Range Addition
**Platform:** LeetCode #370 (Premium)

**Problem:** Apply Q range addition updates to a zero array, then return the final array.

**Technique:** Difference Array — the most direct application.

---

#### 8. Number of Subarrays with Bounded Maximum
**Platform:** LeetCode #795  
**Link:** [leetcode.com/problems/number-of-subarrays-with-bounded-maximum](https://leetcode.com/problems/number-of-subarrays-with-bounded-maximum/)

**Problem:** Count subarrays with maximum in range `[left, right]`.

**Technique:** Prefix counting — count subarrays with max ≤ right minus those with max ≤ left-1.

---

### 🔴 Advanced — Competitive Programming

These combine Prefix Sum / Difference Array with other techniques.

---

#### 9. Range Sum Query 2D — Immutable
**Platform:** LeetCode #304  
**Link:** [leetcode.com/problems/range-sum-query-2d-immutable](https://leetcode.com/problems/range-sum-query-2d-immutable/)

**Problem:** Answer multiple rectangle sum queries on a 2D matrix.

**Technique:** 2D Prefix Sum  
**Hint:** Use the inclusion-exclusion formula:  
`P[r2][c2] - P[r1-1][c2] - P[r2][c1-1] + P[r1-1][c1-1]`

---

#### 10. Minimum Average Subarray
**Platform:** Codeforces, CSES (Range Queries)

**Problem:** Find the minimum length subarray with average ≤ threshold.

**Technique:** Prefix Sum + Binary Search or sliding window

---

#### 11. Count Number of Texts
**Platform:** LeetCode #2266  
**Link:** [leetcode.com/problems/count-number-of-texts](https://leetcode.com/problems/count-number-of-texts/)

**Technique:** DP + prefix-sum-style counting.

---

#### 12. CSES — Static Range Sum Queries
**Platform:** CSES Problem Set  
**Link:** [cses.fi/problemset/task/1646](https://cses.fi/problemset/task/1646)

**Problem:** Classic 1D prefix sum with large inputs. Great for testing efficiency.

---

#### 13. CSES — Forest Queries
**Platform:** CSES Problem Set  
**Link:** [cses.fi/problemset/task/1648](https://cses.fi/problemset/task/1648)

**Problem:** Count trees in a rectangular region of a 2D forest.

**Technique:** 2D Prefix Sum

---

#### 14. CSES — Range Update Queries
**Platform:** CSES Problem Set  
**Link:** [cses.fi/problemset/task/1651](https://cses.fi/problemset/task/1651)

**Problem:** Perform range increment updates and point queries.

**Technique:** Difference Array (then prefix sum for point queries)

---

### Problem Summary Table

| # | Problem | Difficulty | Technique | Platform |
|---|---------|-----------|-----------|---------|
| 1 | Range Sum Query — Immutable | 🟢 Easy | 1D Prefix Sum | LeetCode 303 |
| 2 | Running Sum of 1D Array | 🟢 Easy | Prefix Sum | LeetCode 1480 |
| 3 | Find Middle Index | 🟢 Easy | Prefix + Suffix Sum | LeetCode 1991 |
| 4 | Subarray Sum Equals K | 🟡 Medium | Prefix Sum + HashMap | LeetCode 560 |
| 5 | Corporate Flight Bookings | 🟡 Medium | Difference Array | LeetCode 1109 |
| 6 | Car Pooling | 🟡 Medium | Difference Array | LeetCode 1094 |
| 7 | Range Addition | 🟡 Medium | Difference Array | LeetCode 370 |
| 8 | Subarrays with Bounded Max | 🟡 Medium | Prefix Count | LeetCode 795 |
| 9 | Range Sum Query 2D | 🔴 Medium-Hard | 2D Prefix Sum | LeetCode 304 |
| 10 | Static Range Sum Queries | 🔴 Medium | 1D Prefix Sum | CSES 1646 |
| 11 | Forest Queries | 🔴 Medium | 2D Prefix Sum | CSES 1648 |
| 12 | Range Update Queries | 🔴 Medium | Difference Array | CSES 1651 |

---

### Tips for Solving Problems

1. **Identify the pattern:**
   - Many queries, few updates → **Prefix Sum**
   - Many range updates, one final read → **Difference Array**
   - 2D grid, rectangle queries → **2D Prefix Sum**

2. **Watch for hidden prefix sums:**
   - *"Count subarrays with sum K"* → prefix sum + hash map
   - *"Is there a subarray summing to zero?"* → same prefix appeared twice

3. **Modular arithmetic:**
   - In problems with mod, apply mod carefully: `(prefix[r] - prefix[l-1] + MOD) % MOD`

4. **Combine with other techniques:**
   - Prefix Sum + Binary Search → range existence problems
   - Prefix Sum + DP → knapsack, counting problems
   - Difference Array + Greedy → scheduling, interval problems

---

### Additional Resources

- 📖 [CP-Algorithms: Prefix Sums](https://cp-algorithms.com/algebra/prefix-sums.html)
- 📖 [USACO Guide: Prefix Sums](https://usaco.guide/silver/prefix-sums)
- 🎯 [CSES Problem Set — Range Queries](https://cses.fi/problemset/list/) — The gold standard for practicing these techniques
