---
id: difference-array
title: Difference Array
sidebar_label: Difference Array
sidebar_position: 3
description: "Learn the Difference Array technique — a complement to Prefix Sum that enables O(1) range updates and O(n) reconstruction. Includes core concepts, dry runs, step-by-step examples, and multi-language implementations."
tags: [dsa, algorithms, difference array, range update, arrays, competitive programming]
---

## Difference Array

### Introduction & Intuition

Consider this problem:

> You are given an array of `n` zeros. You must perform **Q range update** operations of the form: *"Add `val` to every element from index `l` to index `r`."* Finally, output the resulting array.

**Naïve approach:** For each update, loop from `l` to `r` and add `val` — O(n) per update, **O(n × Q)** total.

**Difference Array approach:** Perform each update in **O(1)**, reconstruct the array in **O(n)** — **O(n + Q)** total.

This is the **dual** of Prefix Sum:
- Prefix Sum: fast range *queries*, slow range *updates*
- Difference Array: fast range *updates*, fast final *reconstruction*

---

### Core Concept

The **Difference Array** `D[]` is defined as:

```
D[i] = arr[i] - arr[i-1]     for i > 0
D[0] = arr[0]
```

In other words, `D[i]` stores the *difference* between consecutive elements.

**Key insight:** Adding `val` to `arr[l..r]` only changes two values in `D[]`:
- `D[l] += val`   → marks the start of the range update
- `D[r+1] -= val` → marks the end (cancels the effect after index `r`)

After all updates, reconstruct the array using a **prefix sum** of `D[]`:

```
arr[i] = D[0] + D[1] + ... + D[i]
```

---

### Step-by-Step Dry Run

**Initial array:** `arr = [0, 0, 0, 0, 0, 0]` (size 6, 0-indexed)

**Difference array initially:** `D = [0, 0, 0, 0, 0, 0]`

---

**Update 1:** Add `3` to `arr[1..4]`

```
D[1] += 3  → D = [0,  3, 0, 0, 0, 0]
D[5] -= 3  → D = [0,  3, 0, 0, 0,-3]
```

---

**Update 2:** Add `2` to `arr[0..2]`

```
D[0] += 2  → D = [2,  3, 0, 0, 0,-3]
D[3] -= 2  → D = [2,  3, 0,-2, 0,-3]
```

---

**Update 3:** Add `-1` to `arr[3..5]`

```
D[3] += -1 → D = [2,  3, 0,-3, 0,-3]
D[6] -= -1 → valid because the difference array is created with size n + 1 to safely handle the r + 1 boundary update.
```

---

**Reconstruction via prefix sum of D:**

```
arr[0] = D[0]            = 2
arr[1] = arr[0] + D[1]   = 2 + 3 = 5
arr[2] = arr[1] + D[2]   = 5 + 0 = 5
arr[3] = arr[2] + D[3]   = 5 + (-3) = 2
arr[4] = arr[3] + D[4]   = 2 + 0 = 2
arr[5] = arr[4] + D[5]   = 2 + (-3) = -1
```

**Final array:** `arr = [2, 5, 5, 2, 2, -1]`

**Verification:**
- Update 1 added 3 to indices 1–4: `[0, 3, 3, 3, 3, 0]`
- Update 2 added 2 to indices 0–2: `[2, 5, 5, 3, 3, 0]`
- Update 3 added -1 to indices 3–5: `[2, 5, 5, 2, 2, -1]` ✓

---

### Why It Works — The Key Insight

When you compute the prefix sum of `D[]`:
- Every `D[l] += val` propagates `val` to all positions `l, l+1, l+2, ...`
- Every `D[r+1] -= val` cancels that propagation starting at `r+1`

So the net effect of `D[l] += val; D[r+1] -= val` is exactly:
*"Add `val` to positions `l` through `r`."*

---

### Time & Space Complexity

| Operation              | Complexity |
|------------------------|------------|
| Each range update      | O(1)       |
| Final reconstruction   | O(n)       |
| Total for Q updates    | O(n + Q)   |
| Space (diff array)     | O(n)       |

---

### C++ Implementation

```cpp
#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n = 6;
    vector<long long> D(n + 1, 0); // Difference array (extra slot for r+1 safety)

    // Range update: add val to arr[l..r] (0-indexed)
    auto update = [&](int l, int r, long long val) {
        D[l] += val;
        if (r + 1 <= n) D[r + 1] -= val;
    };

    // Apply updates
    update(1, 4,  3);
    update(0, 2,  2);
    update(3, 5, -1);

    // Reconstruct final array via prefix sum of D
    vector<long long> arr(n);
    arr[0] = D[0];
    for (int i = 1; i < n; i++) {
        arr[i] = arr[i-1] + D[i];
    }

    // Output result
    cout << "Final array: ";
    for (int i = 0; i < n; i++) {
        cout << arr[i] << " ";
    }
    cout << endl; // Output: 2 5 5 2 2 -1

    return 0;
}
```

---

### Java Implementation

```java
import java.util.Arrays;

public class DifferenceArray {

    static void update(long[] D, int l, int r, long val) {
        D[l] += val;
        if (r + 1 < D.length) D[r + 1] -= val;
    }

    static long[] reconstruct(long[] D, int n) {
        long[] arr = new long[n];
        arr[0] = D[0];
        for (int i = 1; i < n; i++) {
            arr[i] = arr[i-1] + D[i];
        }
        return arr;
    }

    public static void main(String[] args) {
        int n = 6;
        long[] D = new long[n + 1]; // Extra slot for safety

        update(D, 1, 4,  3);
        update(D, 0, 2,  2);
        update(D, 3, 5, -1);

        long[] result = reconstruct(D, n);
        System.out.println("Final array: " + Arrays.toString(result));
        // Output: [2, 5, 5, 2, 2, -1]
    }
}
```

---

### Python Implementation

```python
def update(D, l, r, val):
    """Add val to arr[l..r] using difference array (0-indexed)."""
    D[l] += val
    if r + 1 < len(D):
        D[r + 1] -= val

def reconstruct(D, n):
    """Reconstruct final array from difference array."""
    arr = [0] * n
    arr[0] = D[0]
    for i in range(1, n):
        arr[i] = arr[i-1] + D[i]
    return arr

# Example usage
n = 6
D = [0] * (n + 1)  # Extra slot for safety

update(D, 1, 4,  3)
update(D, 0, 2,  2)
update(D, 3, 5, -1)

result = reconstruct(D, n)
print(f"Final array: {result}")  # [2, 5, 5, 2, 2, -1]
```

---

### JavaScript Implementation

```javascript
function update(D, l, r, val) {
    D[l] += val;
    if (r + 1 < D.length) D[r + 1] -= val;
}

function reconstruct(D, n) {
    const arr = new Array(n).fill(0);
    arr[0] = D[0];
    for (let i = 1; i < n; i++) {
        arr[i] = arr[i-1] + D[i];
    }
    return arr;
}

// Example usage
const n = 6;
const D = new Array(n + 1).fill(0); // Extra slot for safety

update(D, 1, 4,  3);
update(D, 0, 2,  2);
update(D, 3, 5, -1);

const result = reconstruct(D, n);
console.log("Final array:", result); // [2, 5, 5, 2, 2, -1]
```

---

### Practical Problem-Solving Use Cases

#### 1. Range Increment on an Array (Classic)
Apply a series of range `+val` operations, then output the final array.
- **Strategy:** Use difference array for updates, prefix sum for reconstruction.

#### 2. Car Pooling / Passenger Count (LeetCode #1094)
At each stop, passengers board or alight. Check if the car ever exceeds capacity.
- **Strategy:** Use difference array to track net passenger count at each stop.

#### 3. Corporate Flight Bookings (LeetCode #1109)
Given a list of flight bookings `[first, last, seats]`, find total seats booked per flight.
- **Strategy:** Direct difference array application.

#### 4. Paint House / Interval Coloring
Determine if overlapping intervals can be assigned colors without conflicts.
- **Strategy:** Use difference array to count overlapping intervals per point.

#### 5. Minimum Number of Arrows (Greedy + Difference Array)
Find minimum number of operations to complete range tasks efficiently.

---

### Difference Array vs Prefix Sum — At a Glance

| Feature | Prefix Sum | Difference Array |
|---|---|---|
| **Best for** | Range *queries* (fast read) | Range *updates* (fast write) |
| **Query time** | O(1) | O(n) to reconstruct |
| **Update time** | O(n) to rebuild | O(1) per update |
| **When to use** | Many reads, few writes | Many writes, one final read |
| **Complements** | Difference Array | Prefix Sum |

> **Pro Tip:** These two techniques are *duals* of each other. Together, they cover the two primary array manipulation patterns in competitive programming.

---

### Common Mistakes

1. **Out-of-bounds `D[r+1]`** — Always allocate `D` with size `n+1` and guard with bounds check.
2. **Forgetting to reconstruct** — The difference array itself is not the answer; always compute the prefix sum.
3. **Off-by-one in range** — Carefully verify whether your range indices are 0-based or 1-based.
4. **Applying to queries instead of updates** — Difference array is for *updates*, not for answering range queries directly.

---

### Summary

- The **Difference Array** is the dual of Prefix Sum — it trades fast queries for fast range updates.
- Each update costs **O(1)**; final reconstruction costs **O(n)**.
- Essential for problems with many range increment/decrement operations followed by a final output.
- Combined with Prefix Sum, you have a powerful toolkit for all array range problems.

---

### Next Steps

- 📄 [Introduction to Prefix Sum](./introduction-to-prefix-sum) — Range query optimization
- 📄 [2D Prefix Sum](./2d-prefix-sum) — Extend to matrix range queries
- 📄 [Practice Problems](./practice-problems) — Apply both techniques on real problems
