---
id: nikita-and-books-2244b
title: "Nikita and Books"
sidebar_label: Nikita and Books
description: "Solution for Codeforces 2244B: Nikita and Books, utilizing a greedy prefix sum approach."
tags: [Codeforces, greedy, math, array, prefix-sum]
---

## Description:

As is well known, Nikita loves reading. Today, he made a mess in his room and arranged his books into $n$ stacks in a row, numbered from $1$ to $n$ from left to right. The $i$-th stack contains $a_i$ books. This arrangement is called neat if, in every stack except the rightmost one, the number of books is strictly less than in the stack to its right; that is, the array $a$ is strictly increasing.

Yura wants to make the arrangement neat by performing the following operation any number of times:

- Choose a stack $i$ such that $1 \le i < n$ and $a_i > 1$.
- Take 1 book from the top of stack $i$, so $a_i$ decreases by 1.
- Put this book on top of stack $i+1$, so $a_{i+1}$ increases by 1.

Determine whether Yura can make the arrangement neat.

**Input**
The first line contains a single integer $t$ ($1 \le t \le 10^4$) — the number of test cases.
The first line of each test case contains a single integer $n$ ($1 \le n \le 2 \cdot 10^5$) — the number of stacks.
The second line of each test case contains $n$ integers $a_i$ ($1 \le a_i \le 10^9$) — the initial number of books in each stack.

**Output**
For each test case, output "YES" if Yura can make the arrangement neat, and "NO" otherwise.

---

## Video Explanation:

<LiteYouTubeEmbed
  id="aMJDgYsTM8o"
  params="autoplay=1&autohide=1&showinfo=0&rel=0&start=780"
  title="Nikita and Books (Codeforces 2244B)"
  poster="maxresdefault"
  webp
/>

---

## Approaches:

### 1. Greedy Prefix Sums (Optimal)

The goal is to make the array strictly increasing ($a_1 < a_2 < a_3 \dots < a_n$) by moving books to the right. Since all $a_i \ge 1$, the smallest possible strictly increasing array we can form is exactly `[1, 2, 3, ..., n]`. 

Because we can only move books from stack $i$ to stack $i+1$ (left to right), the total number of books in the first $k$ stacks can only *decrease* or stay the same; it can never increase. 
Therefore, in order to successfully form the minimum required sequence of `[1, 2, 3, ..., k]`, the initial sum of the first $k$ elements must be at least the sum of the first $k$ positive integers.

Mathematically, for every prefix length $k$ from $1$ to $n$, the following condition must hold:
$\sum_{i=1}^{k} a_i \ge \frac{k(k+1)}{2}$

If this condition holds for all prefixes, we can always greedily push any excess books to the right, successfully leaving exactly $i$ books in the $i$-th stack, and piling up all the remaining excess books in the final $n$-th stack to ensure it is strictly greater than the $(n-1)$-th stack. 

#### Complexity
* **Time Complexity:** $O(n)$ per testcase. We simply iterate through the array once, accumulating the prefix sum and checking the mathematical condition in $O(1)$ time at each step.
* **Space Complexity:** $O(1)$ or $O(n)$ depending on language implementation, but logically $O(1)$ auxiliary space since we just need a running sum counter.

#### Solutions:

**C++**
```cpp
#include <iostream>
#include <vector>

using namespace std;

void solve() {
    int n;
    cin >> n;
    vector<long long> a(n);
    long long sum = 0;
    bool possible = true;
    
    for (int i = 0; i < n; i++) {
        cin >> a[i];
        sum += a[i];
        
        // Sum of first (i+1) integers
        long long required = (long long)(i + 1) * (i + 2) / 2;
        if (sum < required) {
            possible = false;
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
        long sum = 0;
        boolean possible = true;
        
        for (int i = 0; i < n; i++) {
            long a = scanner.nextLong();
            sum += a;
            
            // Sum of first (i+1) integers
            long required = (long)(i + 1) * (i + 2) / 2;
            if (sum < required) {
                possible = false;
            }
        }
        
        System.out.println(possible ? "YES" : "NO");
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
        
        sum_val = 0
        possible = True
        
        for i in range(1, n + 1):
            a = int(input_data[idx])
            idx += 1
            sum_val += a
            
            required = (i * (i + 1)) // 2
            if sum_val < required:
                possible = False
                
        print("YES" if possible else "NO")

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
        let sum = 0;
        let possible = true;
        
        for (let j = 1; j <= n; j++) {
            let a = parseInt(input[idx++], 10);
            sum += a;
            
            let required = (j * (j + 1)) / 2;
            if (sum < required) {
                possible = false;
            }
        }
        
        console.log(possible ? "YES" : "NO");
    }
}

main();
```