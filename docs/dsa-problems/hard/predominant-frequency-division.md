---
id: predominant-frequency-division-2242b
title: "Predominant Frequency Division"
sidebar_label: Predominant Frequency Division
description: "Solution for Codeforces 2242B: Predominant Frequency Division, utilizing a linear prefix sum and greedy approach."
tags: [Codeforces, prefix-sum, greedy, array, math]
---

## Description:

You are given an array $a$ consisting of the numbers 1, 2, and 3. Check whether it is possible to split it into three contiguous non-empty parts such that, for each part $i$ from 1 to 3, the following condition holds:

- the number of elements greater than $i$ is at most half of the part.

In other words, you need to divide the array $a$ into three pairwise disjoint contiguous non-empty parts so that in the left part the number of ones is at least the total number of twos and threes, in the middle part the total number of ones and twos is at least the number of threes, and the right part can be anything, but it must be non-empty.

**Input**
Each test contains multiple test cases. The first line contains the number of test cases $t$ ($1 \le t \le 10^4$). The description of the test cases follows.

The first line of each test case contains an integer $n$ ($3 \le n \le 2 \cdot 10^5$) — the length of the array.
The second line of each test case contains $n$ integers $a_i$ ($1 \le a_i \le 3$).

**Output**
For each test case, print "YES" if there exists a way to split the array as required, and "NO" otherwise.

---

## Video Explanation:

<LiteYouTubeEmbed
  id="XWw7AzV4LWk"
  params="autoplay=1&autohide=1&showinfo=0&rel=0"
  title="Predominant Frequency Division (Codeforces 2242B)"
  poster="maxresdefault"
  webp
/>

---

## Approaches:

### 1. Prefix Sum Optimization (Optimal)

To split the array into three contiguous parts ($P_1, P_2, P_3$), we can simplify the mathematical conditions:
- **Condition for $P_1$:** `count(1) >= count(2) + count(3)`. 
  If we assign $+1$ to `1`s and $-1$ to `2`s and `3`s, the prefix sum of $P_1$ must be $\ge 0$.
- **Condition for $P_2$:** `count(1) + count(2) >= count(3)`.
  If we assign $+1$ to `1`s and `2`s, and $-1$ to `3`s, the sum of this segment must be $\ge 0$.
- **Condition for $P_3$:** Simply needs to be non-empty.

Instead of testing all $O(N^2)$ possible split points, we can use prefix sums to do this in $O(N)$:
1. Let $P_2[k]$ be the prefix sum from index $0$ to $k$ using the weights for the second condition (where `1`s and `2`s are $+1$, `3`s are $-1$).
2. The sum for the middle segment $P_2$ (from index $i+1$ to $j$) is calculated as $P_2[j] - P_2[i]$. We need this to be $\ge 0$, which means $P_2[i] \le P_2[j]$.
3. To maximize our chances of finding a valid $j$ for a given $i$, we should precalculate the **maximum** possible $P_2[j]$ to the right of $i$. We create an array `max_P2_right` where `max_P2_right[i+1]` holds the maximum $P_2[j]$ for all $j \in [i+1, n-2]$. (Note: $j \le n-2$ because $P_3$ must have at least one element).
4. As we iterate to find the end of $P_1$ (index $i$), we maintain the running sum for Condition 1. If the $P_1$ running sum is $\ge 0$ **and** $P_2[i] \le \text{max\_P2\_right}[i+1]$, we have found a valid split!

#### Complexity
* **Time Complexity:** $O(N)$ per testcase, where $N$ is the length of the array. We scan the array to build the prefix sums and then do a single pass to check the conditions.
* **Space Complexity:** $O(N)$ auxiliary space to store the prefix sums and the `max_P2_right` array.

#### Solutions:

**C++**
```cpp
#include <iostream>
#include <vector>
#include <algorithm>

using namespace std;

void solve() {
    int n;
    cin >> n;
    vector<int> a(n);
    vector<int> p2(n);
    int current_p2 = 0;
    
    for (int i = 0; i < n; i++) {
        cin >> a[i];
        current_p2 += (a[i] != 3 ? 1 : -1);
        p2[i] = current_p2;
    }

    // Precalculate the maximum P2 values from the right
    vector<int> max_p2_right(n);
    max_p2_right[n - 2] = p2[n - 2];
    for (int i = n - 3; i >= 1; i--) {
        max_p2_right[i] = max(p2[i], max_p2_right[i + 1]);
    }

    int p1 = 0;
    bool possible = false;
    
    // Iterate to find a valid split point for P1 (index i)
    for (int i = 0; i < n - 2; i++) {
        p1 += (a[i] == 1 ? 1 : -1);
        
        if (p1 >= 0 && p2[i] <= max_p2_right[i + 1]) {
            possible = true;
            break;
        }
    }

    if (possible) {
        cout << "YES\n";
    } else {
        cout << "NO\n";
    }
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

**java**
```java
import java.util.Scanner;

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
        int[] a = new int[n];
        int[] p2 = new int[n];
        int currentP2 = 0;
        
        for (int i = 0; i < n; i++) {
            a[i] = scanner.nextInt();
            currentP2 += (a[i] != 3 ? 1 : -1);
            p2[i] = currentP2;
        }
        
        int[] maxP2Right = new int[n];
        maxP2Right[n - 2] = p2[n - 2];
        for (int i = n - 3; i >= 1; i--) {
            maxP2Right[i] = Math.max(p2[i], maxP2Right[i + 1]);
        }
        
        int p1 = 0;
        boolean possible = false;
        
        for (int i = 0; i < n - 2; i++) {
            p1 += (a[i] == 1 ? 1 : -1);
            
            if (p1 >= 0 && p2[i] <= maxP2Right[i + 1]) {
                possible = true;
                break;
            }
        }
        
        if (possible) {
            System.out.println("YES");
        } else {
            System.out.println("NO");
        }
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
        idx += 1
        
        a = [int(x) for x in input_data[idx : idx + n]]
        idx += n
        
        p2 = [0] * n
        current_p2 = 0
        for i in range(n):
            current_p2 += 1 if a[i] != 3 else -1
            p2[i] = current_p2
            
        max_p2_right = [0] * n
        max_p2_right[n - 2] = p2[n - 2]
        for i in range(n - 3, 0, -1):
            max_p2_right[i] = max(p2[i], max_p2_right[i + 1])
            
        p1 = 0
        possible = False
        
        for i in range(n - 2):
            p1 += 1 if a[i] == 1 else -1
            
            if p1 >= 0 and p2[i] <= max_p2_right[i + 1]:
                possible = True
                break
                
        if possible:
            print("YES")
        else:
            print("NO")

if __name__ == "__main__":
    solve()
```

**JavaScript**
```js
const fs = require('fs');

function main() {
    const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
    if (input.length === 0 || input[0] === '') return;
    
    let t = parseInt(input[0], 10);
    let idx = 1;
    
    for (let i = 0; i < t; i++) {
        let n = parseInt(input[idx++], 10);
        
        let a = [];
        for (let j = 0; j < n; j++) {
            a.push(parseInt(input[idx++], 10));
        }
        
        let p2 = new Int32Array(n);
        let currentP2 = 0;
        for (let j = 0; j < n; j++) {
            currentP2 += (a[j] !== 3 ? 1 : -1);
            p2[j] = currentP2;
        }
        
        let maxP2Right = new Int32Array(n);
        maxP2Right[n - 2] = p2[n - 2];
        for (let j = n - 3; j >= 1; j--) {
            maxP2Right[j] = Math.max(p2[j], maxP2Right[j + 1]);
        }
        
        let p1 = 0;
        let possible = false;
        
        for (let j = 0; j < n - 2; j++) {
            p1 += (a[j] === 1 ? 1 : -1);
            
            if (p1 >= 0 && p2[j] <= maxP2Right[j + 1]) {
                possible = true;
                break;
            }
        }
        
        if (possible) {
            console.log("YES");
        } else {
            console.log("NO");
        }
    }
}

main();
```