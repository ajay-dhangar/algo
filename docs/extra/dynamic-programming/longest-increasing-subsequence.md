---
id: longest-increasing-subsequence
title: "Longest Increasing Subsequence (LIS)"
sidebar_label: Longest Increasing Subsequence
sidebar_position: 17
description: "An architectural guide to the Longest Increasing Subsequence (LIS) problem—covering combinatorial brute force foundations, the standard quadratic Dynamic Programming model, and the optimal log-linear Binary Search technique. Includes structural dry runs, complexity proofs, and robust multi-language implementations."
tags: [dsa, dynamic programming, LIS, binary search, subsequence, competitive programming, interview]
---

The **Longest Increasing Subsequence (LIS)** problem is a foundational paradigm in sequence optimization and dynamic programming. The objective is formalized as follows:

> Given an integer array $\text{arr}$ of length $n$, determine the **maximum length** of a subsequence such that all elements are sorted in a **strictly increasing** order.

A **subsequence** is derived by deleting zero or more elements from the original array while preserving the relative spatial ordering of the remaining elements.

### Formalized Example

Consider the sequence:

$$\text{arr} = [10, 9, 2, 5, 3, 7, 101, 18]$$

Valid strictly increasing subsequences include:
* $[2, 5, 7, 101] \implies \text{length} = 4$
* $[2, 3, 7, 101] \implies \text{length} = 4$
* $[2, 5, 7, 18] \implies \text{length} = 4$
* $[10, 101] \implies \text{length} = 2$

**Optimal Evaluation:** $4$

## Video Explanation

<LiteYouTubeEmbed
  id="ekcwMsSIzVc"
  params="autoplay=1&autohide=1&showinfo=0&rel=0"
  title="DP 41. Longest Increasing Subsequence | Memoization"
  poster="maxresdefault"
  lazyLoad={true}
  webp
/>

---

## Combinatorial Brute Force Intuition

A naive approach evaluates the entire state space of subsequences. At each index $i$, a decision boundary emerges: either **include** $\text{arr}[i]$ (conditioned on it being strictly greater than the previously selected element) or **exclude** it. 

This generates a state-space tree bounded by the power set of the array, yielding a total of $2^n$ possible subsets. The resulting time complexity is $\mathcal{O}(2^n)$, which is computationally intractable for inputs where $n > 30$. This bottleneck motivates optimization via Dynamic Programming and Greedy/Binary Search strategies.

---

## Approach 1: The Quadratic Dynamic Programming Model $\mathcal{O}(n^2)$

### Mathematical Formulation

Let $\text{dp}[i]$ represent the length of the LIS whose terminal element resides precisely at index $i$.

For any given index $i$, we scan all historical states $j$ where $0 \le j < i$. If $\text{arr}[j] < \text{arr}[i]$, the element at $i$ can structurally extend the optimal subsequence terminating at $j$.

### Recurrence Relation

$$\text{dp}[i] = 1 + \max_{0 \le j < i, \, \text{arr}[j] < \text{arr}[i]} \{ \text{dp}[j] \}$$

$$\text{Base Case:} \quad \text{dp}[i] = 1 \quad \forall \quad i \in [0, n-1]$$

$$\text{Global Solution:} \quad \text{LIS} = \max_{0 \le i < n} \{ \text{dp}[i] \}$$

---

### Step-by-Step Execution Matrix

**Input Instance:** $\text{arr} = [3, 10, 2, 1, 20]$  
**Initialization:** $\text{dp} = [1, 1, 1, 1, 1]$

| Target Index ($i$) | Element ($\text{arr}[i]$) | Valid Lookback Constraints Checked ($j < i$) | Candidate Evaluations ($\text{dp}[j] + 1$) | State Mutation ($\text{dp}[i]$) |
| :---: | :---: | :--- | :---: | :---: |
| **0** | `3` | None | None | **1** |
| **1** | `10` | $j=0: 3 < 10 \ \checkmark$ | $\text{dp}[0] + 1 = 2$ | **2** |
| **2** | `2` | $j=0: 3 \not< 2; \ j=1: 10 \not< 2$ | None | **1** |
| **3** | `1` | $j=0, 1, 2: \text{all elements} \ge 1$ | None | **1** |
| **4** | `20` | $j=0: 3 < 20 \ \checkmark$ <br /> $j=1: 10 < 20 \ \checkmark$ <br /> $j=2: 2 < 20 \ \checkmark$ <br /> $j=3: 1 < 20 \ \checkmark$ | $\max(1+1, 2+1, 1+1, 1+1)$ | **3** |

$$\text{Final State Array: } \text{dp} = [1, 2, 1, 1, 3] \implies \max(\text{dp}) = 3 \, \text{ (Subsequence: } [3, 10, 20]\text{)}$$

---

### Production Implementations


```cpp
#include <iostream>
#include <vector>
#include <algorithm>

int lisQuadratic(const std::vector<int>& arr) {
    const size_t n = arr.size();
    if (n == 0) return 0;
    
    std::vector<int> dp(n, 1);

    for (size_t i = 1; i < n; ++i) {
        for (size_t j = 0; j < i; ++j) {
            if (arr[j] < arr[i]) {
                dp[i] = std::max(dp[i], dp[j] + 1);
            }
        }
    }
    return *std::max_element(dp.begin(), dp.end());
}

int main() {
    std::vector<int> arr = {10, 9, 2, 5, 3, 7, 101, 18};
    std::cout << "LIS Length: " << lisQuadratic(arr) << "\n";
    return 0;
}

```

```java
import java.util.Arrays;

public class LongestIncreasingSubsequence {
    public static int lisQuadratic(int[] arr) {
        if (arr == null || arr.length == 0) return 0;
        
        int n = arr.length;
        int[] dp = new int[n];
        Arrays.fill(dp, 1);
        int maxLIS = 1;

        for (int i = 1; i < n; i++) {
            for (int j = 0; j < i; j++) {
                if (arr[j] < arr[i]) {
                    dp[i] = Math.max(dp[i], dp[j] + 1);
                }
            }
            maxLIS = Math.max(maxLIS, dp[i]);
        }
        return maxLIS;
    }

    public static void main(String[] args) {
        int[] arr = {10, 9, 2, 5, 3, 7, 101, 18};
        System.out.println("LIS Length: " + lisQuadratic(arr));
    }
}

```

```python
from typing import List

def lis_quadratic(arr: List[int]) -> int:
    if not arr:
        return 0
        
    n = len(arr)
    dp = [1] * n

    for i in range(1, n):
        for j in range(i):
            if arr[j] < arr[i]:
                dp[i] = max(dp[i], dp[j] + 1)

    return max(dp)

if __name__ == "__main__":
    arr = [10, 9, 2, 5, 3, 7, 101, 18]
    print(f"LIS Length: {lis_quadratic(arr)}")

```

```javascript
function lisQuadratic(arr) {
    if (!arr || arr.length === 0) return 0;
    
    const n = arr.length;
    const dp = new Array(n).fill(1);
    let maxLIS = 1;

    for (let i = 1; i < n; i++) {
        for (let j = 0; j < i; j++) {
            if (arr[j] < arr[i]) {
                dp[i] = Math.max(dp[i], dp[j] + 1);
            }
        }
        maxLIS = Math.max(maxLIS, dp[i]);
    }
    return maxLIS;
}

const arr = [10, 9, 2, 5, 3, 7, 101, 18];
console.log(`LIS Length: ${lisQuadratic(arr)}`);

```

---

## Approach 2: The Log-Linear Greedy Binary Search Paradigm $\mathcal{O}(n \log n)$

### Operational Core

To scale past quadratic limits, we optimize retrieval through a dynamic array, $\text{tails}$. Let $\text{tails}[k]$ be defined as the **monotonically minimal tail value** found among all encountered increasing subsequences of length $k + 1$.

For each sequential element $x \in \text{arr}$:

1. **Append Criterion:** If $x$ is strictly greater than the current maximum value in $\text{tails}$ (the final array position), append $x$. This signals a structural increment to the global LIS length.
2. **Substitution Criterion:** If $x$ is bounded within or below the sequence, find the lowest index $m$ such that $\text{tails}[m] \ge x$ using binary search. Mutate this position to $x$.

> **Design Invariant:** Updating an entry to a smaller value does not immediately alter the verified max length of the LIS, but optimizing the boundary values lowers the threshold for upcoming elements to build upon the sequence.

---

### Step-by-Step State Mutation Trace

**Input Sequence:** $\text{arr} = [10, 9, 2, 5, 3, 7, 101, 18]$

$$\text{Initial State Matrix: } \text{tails} = [\,]$$

| Step ($i$) | Current Input ($x$) | Initial State Vector ($\text{tails}$) | Algorithmic Routing Engine Decisions | Resulting Vector State ($\text{tails}$) |
| --- | --- | --- | --- | --- |
| **1** | `10` | `[]` | Vector empty $\implies$ push $x$ | `[10]` |
| **2** | `9` | `[10]` | Lower-bound index $0 \implies$ overwrite $10$ with $9$ | `[9]` |
| **3** | `2` | `[9]` | Lower-bound index $0 \implies$ overwrite $9$ with $2$ | `[2]` |
| **4** | `5` | `[2]` | $5 > 2 \implies$ append to vector terminal | `[2, 5]` |
| **5** | `3` | `[2, 5]` | Lower-bound index $1 \implies$ overwrite $5$ with $3$ | `[2, 3]` |
| **6** | `7` | `[2, 3]` | $7 > 3 \implies$ append to vector terminal | `[2, 3, 7]` |
| **7** | `101` | `[2, 3, 7]` | $101 > 7 \implies$ append to vector terminal | `[2, 3, 7, 101]` |
| **8** | `18` | `[2, 3, 7, 101]` | Lower-bound index $3 \implies$ overwrite $101$ with $18$ | `[2, 3, 7, 18]` |

$$\text{Terminal Size Measurement: } |\text{tails}| = 4 \implies \text{LIS Length} = 4$$

> **Crucial Invariant Property:** The structure $\text{tails} = [2, 3, 7, 18]$ acts purely as a tracking mechanism for lengths; it does *not* track the actual sequence order. Here, the correct length 4 is found, but the true underlying sequence paths are $[2, 5, 7, 101]$ or $[2, 3, 7, 101]$.

---

### Production Implementations

```cpp
#include <iostream>
#include <vector>
#include <algorithm>

int lisLogLinear(const std::vector<int>& arr) {
    std::vector<int> tails;
    tails.reserve(arr.size());

    for (const int x : arr) {
        auto it = std::lower_bound(tails.begin(), tails.end(), x);
        if (it == tails.end()) {
            tails.push_back(x);
        } else {
            *it = x;
        }
    }
    return static_cast<int>(tails.size());
}

int main() {
    std::vector<int> arr = {10, 9, 2, 5, 3, 7, 101, 18};
    std::cout << "LIS Length: " << lisLogLinear(arr) << "\n";
    return 0;
}

```

```java
import java.util.ArrayList;
import java.util.List;

public class LISOptimized {
    private static int executeLowerBound(List<Integer> list, int target) {
        int low = 0;
        int high = list.size();
        
        while (low < high) {
            int mid = low + ((high - low) >>> 1);
            if (list.get(mid) < target) {
                low = mid + 1;
            } else {
                high = mid;
            }
        }
        return low;
    }

    public static int lisLogLinear(int[] arr) {
        if (arr == null || arr.length == 0) return 0;
        
        List<Integer> tails = new ArrayList<>(arr.length);
        for (int x : arr) {
            int index = executeLowerBound(tails, x);
            if (index == tails.size()) {
                tails.add(x);
            } else {
                tails.set(index, x);
            }
        }
        return tails.size();
    }

    public static void main(String[] args) {
        int[] arr = {10, 9, 2, 5, 3, 7, 101, 18};
        System.out.println("LIS Length: " + lisLogLinear(arr));
    }
}

```

```python
import bisect
from typing import List

def lis_log_linear(arr: List[int]) -> int:
    if not arr:
        return 0
        
    tails: List[int] = []
    for x in arr:
        idx = bisect.bisect_left(tails, x)
        if idx == len(tails):
            tails.append(x)
        else:
            tails[idx] = x
            
    return len(tails)

if __name__ == "__main__":
    arr = [10, 9, 2, 5, 3, 7, 101, 18]
    print(f"LIS Length: {lis_log_linear(arr)}")

```

```javascript
function executeLowerBound(arr, target) {
    let low = 0;
    let high = arr.length;
    
    while (low < high) {
        const mid = low + ((high - low) >> 1);
        if (arr[mid] < target) {
            low = mid + 1;
        } else {
            high = mid;
        }
    }
    return low;
}

function lisLogLinear(arr) {
    if (!arr || arr.length === 0) return 0;
    
    const tails = [];
    for (const x of arr) {
        const idx = executeLowerBound(tails, x);
        if (idx === tails.length) {
            tails.push(x);
        } else {
            tails[idx] = x;
        }
    }
    return tails.length;
}

const arr = [10, 9, 2, 5, 3, 7, 101, 18];
console.log(`LIS Length: ${lisLogLinear(arr)}`);

```

---

## Architectural Comparison Matrix

| Dimensional Criteria | Brute Force Pattern | Classical DP Model | Log-Linear Binary Search |
| --- | --- | --- | --- |
| **Time Complexity** | $\mathcal{O}(2^n)$ | $\mathcal{O}(n^2)$ | $\mathcal{O}(n \log n)$ |
| **Space Complexity** | $\mathcal{O}(n)$ | $\mathcal{O}(n)$ | $\mathcal{O}(n)$ |
| **Sequence Recovery** | Trivial | Built-in via backtracking pointers | Complex (requires secondary mapping trackers) |
| **Application Suitability** | Non-viable | Ideal for moderate array scales ($n \le 10^4$) | Essential for large systems ($n \le 10^6$) |

---

## Reconstructing the Structural Subsequence Path

To retrieve the exact elements that form the sequence rather than just computing its scalar length, we introduce a tracking array $\text{parent}[i]$ into the classical dynamic programming engine. This acts as a reverse pointer system.

```python
from typing import List, Tuple

def reconstruct_lis(arr: List[int]) -> Tuple[int, List[int]]:
    if not arr:
        return 0, []
        
    n = len(arr)
    dp = [1] * n
    parent = [-1] * n

    for i in range(1, n):
        for j in range(i):
            if arr[j] < arr[i] and dp[j] + 1 > dp[i]:
                dp[i] = dp[j] + 1
                parent[i] = j

    # Locate the peak of the tracking array
    max_len = max(dp)
    current_idx = dp.index(max_len)

    # Reconstruct back to the initial node tracking points
    sequence = []
    while current_idx != -1:
        sequence.append(arr[current_idx])
        current_idx = parent[current_idx]

    return max_len, sequence[::-1]

if __name__ == "__main__":
    arr = [3, 10, 2, 1, 20]
    length, path = reconstruct_lis(arr)
    print(f"Verified Max Length: {length}")  # Output: 3
    print(f"Reconstructed Path:  {path}")    # Output: [3, 10, 20]

```

---

## Boundary Edge Cases and Failure Modes

### Strict vs. Non-Strict Monotonic Boundaries

* **Error:** Applying a non-strict inequality operator ($\le$) instead of a strict less-than constraint ($<$).
* **Fix:** Ensure execution matches problem specifications. For strict tracking conditions, enforce $\text{arr}[j] < \text{arr}[i]$ and use `lower_bound`. For non-strict (non-decreasing) sequences, switch to $\text{arr}[j] \le \text{arr}[i]$ and apply `upper_bound`.

### Global Extrema Extraction Errors

* **Error:** Assuming that the final entry ($\text{dp}[n-1]$) contains the total global maximum length.
* **Fix:** The maximum length sequence can terminate at any point in the array. Always sweep the entire table ($\max_{0 \le i < n} \{\text{dp}[i]\}$) or track the running maximum inline.

### Degenerate Uniform Sequences

* **Error:** Code hangs, overflows, or incorrectly increments counts when arrays contain duplicate entries (e.g., $[5, 5, 5, 5]$).
* **Fix:** Enforce clear invariant rules for matching values during binary search steps.

---

## Technical Real-World Engineering Implementations

* **Patience Sorting Engines:** The computation of minimum pile formations during sorting runs is structurally equivalent to solving the LIS problem.
* **Computational Biology (Gene Alignment):** Used to isolate matching chromosomal strands or map variations by analyzing parallel long-chain patterns.
* **Multidimensional Spatial Layouts:** Problems such as the *Russian Doll Envelopes* challenge (LeetCode #354) or *Box Stacking* sort data along one dimension (e.g., width) and then apply standard LIS calculations along the remaining dimensions (e.g., height) to find the optimal arrangement.
