---
id: farmpiggie-and-subset-sum-2246a
title: "farmpiggie and Subset Sum"
sidebar_label: farmpiggie and Subset Sum
description: "Solution for Codeforces 2246A: farmpiggie and Subset Sum, utilizing a parity observation approach."
tags: [Codeforces, math, constructive-algorithms]
---

## Description:

For a permutation $p$ of even length, you can do the following process:

Initialize a counter $c = 0$.
For each $i$ from $1$ to $n$, either add $i \cdot p_i$ to $c$, subtract $i \cdot p_i$ from $c$, or do nothing.
Let the final value of the counter be $c_{\text{final}}$.
Formally, for each $i \in \{1, \dots, n\}$, consider the set $S_i = \{-i \cdot p_i, 0, i \cdot p_i\}$ and choose some $x_i \in S_i$. Set $c_{\text{final}} = \sum_{i=1}^n x_i$.

You are given a single even integer $n$. Find any permutation of length $n$ so that regardless of the operations chosen, the final value $c_{\text{final}}$ will not be 1.

**Input**
Each test contains multiple test cases. The first line contains the number of test cases $t$ ($1 \le t \le 25$). The description of the test cases follows.

The first and only line of each test case contains a single even integer $n$ ($2 \le n \le 50$) — the length of the desired permutation.

**Output**
For each test case, output $n$ integers $p_1, \dots, p_n$ ($1 \le p_i \le n$) — a permutation satisfying the conditions.

If there are multiple solutions, print any of them.

---

## Video Explanation:

<LiteYouTubeEmbed
  id="sueNMwcd-Is"
  params="autoplay=1&autohide=1&showinfo=0&rel=0"
  title="Codeforces 2246A: farmpiggie and Subset Sum (Div 2)"
  poster="maxresdefault"
  webp
/>
---

## Approaches:

### 1. Parity Observation (Optimal)

To ensure that the final sum $c_{\text{final}}$ can **never** be exactly 1, we can leverage parity. The number 1 is an odd number. If we can force every possible term $x_i$ to be an **even** number, then any sum or difference of these terms will always result in an even number. Since an even number can never equal 1, the condition will be perfectly satisfied.

The term we are adding or subtracting is $i \cdot p_i$. For a product to be even, at least one of its factors ($i$ or $p_i$) must be even. 
- If the index $i$ is odd, we *must* make $p_i$ even.
- If the index $i$ is even, $p_i$ can be anything (but to make it a valid permutation, we will just use the odd numbers here).

Because $n$ is always guaranteed to be an even number, there are exactly $n/2$ even indices and $n/2$ odd indices. We can just swap adjacent elements!
By making $p = [2, 1, 4, 3, 6, 5, \dots, n, n-1]$, we guarantee:
- Odd indices ($1, 3, 5\dots$) get even values ($2, 4, 6\dots$). Product is even.
- Even indices ($2, 4, 6\dots$) get odd values ($1, 3, 5\dots$). Product is even.

#### Complexity
* **Time Complexity:** $O(N)$ per testcase, where $N$ is the length of the permutation. We simply loop from $1$ to $N$ and print the pairs.
* **Space Complexity:** $O(1)$ auxiliary space. 

#### Solutions:

**C++**
```cpp
#include <iostream>

using namespace std;

void solve() {
    int n;
    cin >> n;
    
    // Swap adjacent elements: 2 1 4 3 6 5 ...
    for (int i = 1; i <= n; i += 2) {
        cout << i + 1 << " " << i << " ";
    }
    cout << "\n";
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
        
        // Swap adjacent elements: 2 1 4 3 6 5 ...
        for (int i = 1; i <= n; i += 2) {
            System.out.print((i + 1) + " " + i + " ");
        }
        System.out.println();
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
        
        ans = []
        # Swap adjacent elements: 2 1 4 3 6 5 ...
        for i in range(1, n + 1, 2):
            ans.append(i + 1)
            ans.append(i)
            
        print(*(ans))

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
        
        let ans = [];
        // Swap adjacent elements: 2 1 4 3 6 5 ...
        for (let j = 1; j <= n; j += 2) {
            ans.push(j + 1);
            ans.push(j);
        }
        
        console.log(ans.join(' '));
    }
}

main();
```