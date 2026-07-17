---
id: yaroslav-and-productivity-2244d
title: "Yaroslav and Productivity"
sidebar_label: Yaroslav and Productivity
description: "Solution for Codeforces 2244D: Yaroslav and Productivity, utilizing block independence and greedy logic."
tags: [Codeforces, greedy, math, arrays, constructive-algorithms]
---

## Description:

Yaroslav's productivity during the day is described by an array $a$ of length $n$. His productivity can be negative if he watches short videos, or positive if he works. The total productivity is defined as the sum of all values in the array.

Sometimes Yaroslav reads motivational posts. He has $m$ posts, where the $j$-th post has an impact value $b_j$. If Yaroslav reads a post with value $b_j$, then all productivity values from the beginning of the day up to position $b_j$ change sign, that is, all integers $a_1, a_2, a_3, \dots, a_{b_j}$ are multiplied by $-1$.

What is the maximum possible total productivity Yaroslav can achieve by reading any (possibly none) of the posts?

**Input**
The first line contains a single integer $t$ ($1 \le t \le 10^4$) — the number of test cases.
The first line of each test case contains two integers $n$ and $m$ ($1 \le m \le n \le 2 \cdot 10^5$) — the number of measurements and the number of motivational posts.
The second line contains $n$ integers $a_i$ ($-10^9 \le a_i \le 10^9$) — the productivity values.
The third line contains $m$ integers $b_i$ ($1 \le b_i \le n$) — the impact values of the posts. It is guaranteed that all $b_i$ are distinct.

**Output**
For each test case, output a single integer — the maximum possible total productivity.

---

## Video Explanation:

<LiteYouTubeEmbed
  id="aMJDgYsTM8o"
  params="autoplay=1&autohide=1&showinfo=0&rel=0&start=1655"
  title="Yaroslav and Productivity (Codeforces 2244D)"
  poster="maxresdefault"
  webp
/>

---

## Approaches:

### 1. Block Independence (Optimal)

At first glance, it seems that reading a post and flipping a prefix affects many elements simultaneously, creating a complex dependency chain. However, we can break this down by partitioning the array $a$ into "blocks".

First, let's sort the allowed prefix operations $b$ in ascending order such that $c_1 < c_2 < \dots < c_m$. 
This naturally splits our array $a$ into blocks:
- Block 1: Elements from $1$ to $c_1$
- Block 2: Elements from $c_1 + 1$ to $c_2$
- ... and so on.
- Final Block: Elements from $c_m + 1$ to $n$.

Notice what happens when we apply an operation at $c_k$: it flips the signs of *all* blocks from Block 1 up to Block $k$. 
Because we can choose to apply or not apply the operation at $c_k$, and this choice uniquely toggles the sign of Block $k$ relative to all subsequent blocks, **we can independently choose the final sign (positive or negative) of every single block from $1$ to $m$.**

Since their signs can be chosen completely independently, the optimal strategy to maximize the sum is simply to take the absolute value of the sum of each block! 
*(Note: Elements after the maximum $b_j$ value, which is $c_m$, can never be flipped. Their signs remain permanently fixed).*

**Algorithm:**
1. Sort the array $b$ in ascending order.
2. Iterate through the blocks defined by the boundaries in $b$.
3. For each block, calculate its sum, and add the **absolute value** of this sum to our total.
4. For the remaining elements after the last boundary in $b$, calculate their sum and add it to our total *without* taking the absolute value (since their signs are fixed).

#### Complexity
* **Time Complexity:** $O(n \log n)$ per testcase because we must sort the array $b$. The subsequent iterations to sum the blocks take linear $O(n)$ time.
* **Space Complexity:** $O(n)$ or $O(m)$ auxiliary space depending on the language's sort implementation and input storage.

#### Solutions:

**C++**
```cpp
#include <iostream>
#include <vector>
#include <algorithm>
#include <cmath>

using namespace std;

void solve() {
    int n, m;
    cin >> n >> m;
    
    vector<long long> a(n);
    for (int i = 0; i < n; i++) {
        cin >> a[i];
    }
    
    vector<int> b(m);
    for (int i = 0; i < m; i++) {
        cin >> b[i];
    }
    
    // Sort the prefix operations
    sort(b.begin(), b.end());
    
    long long total_sum = 0;
    int last_idx = 0;
    
    // Calculate max possible sum for each block (independent signs)
    for (int i = 0; i < m; i++) {
        long long block_sum = 0;
        for (int j = last_idx; j < b[i]; j++) {
            block_sum += a[j];
        }
        total_sum += abs(block_sum);
        last_idx = b[i];
    }
    
    // Elements after the maximum allowed prefix can never be flipped
    long long rest_sum = 0;
    for (int j = last_idx; j < n; j++) {
        rest_sum += a[j];
    }
    
    total_sum += rest_sum;
    cout << total_sum << "\n";
}

int main() {
    // Fast I/O
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    
    int t;
    cin >> t;
    while (t--) {
        solve();
    }
    return 0;
}
```

**Java**
```java
import java.util.Scanner;
import java.util.Arrays;

public class Solution {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        if (scanner.hasNextInt()) {
            int t = scanner.nextInt();
            while (t-- > 0) {
                solve(scanner);
            }
        }
        scanner.close();
    }
    
    private static void solve(Scanner scanner) {
        int n = scanner.nextInt();
        int m = scanner.nextInt();
        
        long[] a = new long[n];
        for (int i = 0; i < n; i++) {
            a[i] = scanner.nextLong();
        }
        
        int[] b = new int[m];
        for (int i = 0; i < m; i++) {
            b[i] = scanner.nextInt();
        }
        
        // Sort the prefix operations
        Arrays.sort(b);
        
        long totalSum = 0;
        int lastIdx = 0;
        
        // Calculate max possible sum for each block (independent signs)
        for (int i = 0; i < m; i++) {
            long blockSum = 0;
            for (int j = lastIdx; j < b[i]; j++) {
                blockSum += a[j];
            }
            totalSum += Math.abs(blockSum);
            lastIdx = b[i];
        }
        
        // Elements after the maximum allowed prefix can never be flipped
        long restSum = 0;
        for (int j = lastIdx; j < n; j++) {
            restSum += a[j];
        }
        
        totalSum += restSum;
        System.out.println(totalSum);
    }
}
```

**Python**
```py
import sys

def solve():
    input_data = sys.stdin.read().split()
    if not input_data:
        return
        
    t = int(input_data[0])
    idx = 1
    
    for _ in range(t):
        n = int(input_data[idx])
        m = int(input_data[idx+1])
        idx += 2
        
        a = [int(x) for x in input_data[idx : idx + n]]
        idx += n
        
        b = [int(x) for x in input_data[idx : idx + m]]
        idx += m
        
        # Sort the prefix operations
        b.sort()
        
        total_sum = 0
        last_idx = 0
        
        # Calculate max possible sum for each block (independent signs)
        for i in range(m):
            block_sum = sum(a[last_idx:b[i]])
            total_sum += abs(block_sum)
            last_idx = b[i]
            
        # Elements after the maximum allowed prefix can never be flipped
        total_sum += sum(a[last_idx:n])
        
        print(total_sum)

if __name__ == "__main__":
    solve()
```

**JavaScript**
```js
const fs = require('fs');

function main() {
    const input = fs.readFileSync('/dev/stdin', 'utf-8').trim().split(/\s+/);
    if (input.length === 0 || input[0] === '') return;
    
    let t = parseInt(input[0], 10);
    let idx = 1;
    
    for (let i = 0; i < t; i++) {
        let n = parseInt(input[idx++], 10);
        let m = parseInt(input[idx++], 10);
        
        let a = [];
        for (let j = 0; j < n; j++) {
            a.push(BigInt(input[idx++]));
        }
        
        let b = [];
        for (let j = 0; j < m; j++) {
            b.push(parseInt(input[idx++], 10));
        }
        
        // Sort the prefix operations
        b.sort((x, y) => x - y);
        
        let totalSum = 0n;
        let lastIdx = 0;
        
        // Calculate max possible sum for each block (independent signs)
        for (let j = 0; j < m; j++) {
            let blockSum = 0n;
            for (let k = lastIdx; k < b[j]; k++) {
                blockSum += a[k];
            }
            
            // Adding absolute value of BigInt
            totalSum += blockSum < 0n ? -blockSum : blockSum;
            lastIdx = b[j];
        }
        
        // Elements after the maximum allowed prefix can never be flipped
        for (let k = lastIdx; k < n; k++) {
            totalSum += a[k];
        }
        
        console.log(totalSum.toString());
    }
}

main();
```