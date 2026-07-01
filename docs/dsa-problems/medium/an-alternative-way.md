---
id: an-alternative-way-2241d
title: "An Alternative Way"
sidebar_label: An Alternative Way
description: "Solution for Codeforces 2241D: An Alternative Way, utilizing a prefix sum invariant approach."
tags: [Codeforces, math, array, prefix-sum]
---

## Description:

You are given two arrays $a$ and $b$, each of length $n$. You are allowed to perform the following operation on array $a$ any number of times (including zero):

- Choose two indices $l$ and $r$ such that $1 \le l \le r \le n$;
- For each index $i$ from $l$ to $r$ (both inclusive),
  - Set $a_i := a_i - 1$ if $i - l$ is odd.
  - Set $a_i := a_i + 1$ if $i - l$ is even.

Determine whether you can make the array $a$ equal to the array $b$ by performing the operation any number of times.

**Input**
The first line contains a single integer $t$ ($1 \le t \le 10^4$) — the number of test cases. 
The first line of each test case contains a single integer $n$ ($1 \le n \le 2 \cdot 10^5$) — the length of the arrays.
The second line contains $n$ integers $a_1, a_2, \dots, a_n$.
The third line contains $n$ integers $b_1, b_2, \dots, b_n$.

**Output**
For each test case, print "YES" if you can make array $a$ equal to array $b$ and "NO" otherwise.

---

## Approaches:

### 1. Prefix Sum Invariant (Optimal)

Whenever an array operation involves alternating additions and subtractions (like $+1, -1, +1, -1 \dots$), it is highly recommended to look at how it affects the **prefix sums** of the array.

1. **Analyzing the Operation's Effect:**
   Let's see what happens to the prefix sums of $a$ when we apply an operation on $[l, r]$. 
   - The sequence of changes to the elements is $+1, -1, +1, -1 \dots$
   - The prefix sums of *this change sequence* are always either $1$ or $0$. 
   - This means that no matter what $l$ and $r$ we pick, we can **never decrease** any prefix sum of the array $a$. We can only increase them or leave them unchanged.

2. **Proving Independence:**
   Can we increase a specific prefix sum $P_i$ without messing up the others? Yes!
   - For any $i < n$, choosing $l = i$ and $r = i + 1$ adds $+1$ to $a_i$ and $-1$ to $a_{i+1}$. This increases the prefix sum at index $i$ by exactly $1$, and leaves all other prefix sums unchanged.
   - For $i = n$, choosing $l = n$ and $r = n$ adds $+1$ to $a_n$. This increases the total sum ($P_n$) by exactly $1$, and leaves all other prefix sums unchanged.

3. **Algorithm:**
   Since we can independently increase any prefix sum, but we can *never* decrease any prefix sum, the only condition to transform $a$ into $b$ is that every prefix sum of $b$ must be greater than or equal to the corresponding prefix sum of $a$. We just calculate a running sum for both arrays and check if `sumA <= sumB` at every step.

### Complexity
* **Time Complexity:** $O(N)$ per testcase, where $N$ is the length of the arrays. We iterate through the arrays exactly once.
* **Space Complexity:** $O(1)$ auxiliary space, as we only need two integer variables to keep track of the running prefix sums.

---

## Solutions:

### C++
```cpp
#include <iostream>
#include <vector>

using namespace std;

void solve() {
    int n;
    cin >> n;
    vector<long long> a(n), b(n);
    
    for (int i = 0; i < n; i++) cin >> a[i];
    for (int i = 0; i < n; i++) cin >> b[i];
    
    long long sumA = 0, sumB = 0;
    bool possible = true;
    
    for (int i = 0; i < n; i++) {
        sumA += a[i];
        sumB += b[i];
        
        // The prefix sum of a can never exceed the prefix sum of b
        if (sumA > sumB) {
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

### Java
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
        long[] a = new long[n];
        long[] b = new long[n];
        
        for (int i = 0; i < n; i++) a[i] = scanner.nextLong();
        for (int i = 0; i < n; i++) b[i] = scanner.nextLong();
        
        long sumA = 0, sumB = 0;
        boolean possible = true;
        
        for (int i = 0; i < n; i++) {
            sumA += a[i];
            sumB += b[i];
            
            if (sumA > sumB) {
                possible = false;
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

### Python
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
        
        b = [int(x) for x in input_data[idx : idx + n]]
        idx += n
        
        sumA = 0
        sumB = 0
        possible = True
        
        for i in range(n):
            sumA += a[i]
            sumB += b[i]
            
            if sumA > sumB:
                possible = False
                break
                
        if possible:
            print("YES")
        else:
            print("NO")

if __name__ == "__main__":
    solve()
```

### JavaScript
```js
const fs = require('fs');

function main() {
    const input = fs.readFileSync('/dev/stdin', 'utf-8').trim().split(/\s+/);
    if (input.length === 0 || input[0] === '') return;
    
    let t = parseInt(input[0], 10);
    let idx = 1;
    
    for (let i = 0; i < t; i++) {
        let n = parseInt(input[idx++], 10);
        
        let a = [];
        for (let j = 0; j < n; j++) {
            a.push(parseInt(input[idx++], 10));
        }
        
        let b = [];
        for (let j = 0; j < n; j++) {
            b.push(parseInt(input[idx++], 10));
        }
        
        let sumA = 0n; // Using BigInt for safety against large sums
        let sumB = 0n;
        let possible = true;
        
        for (let j = 0; j < n; j++) {
            sumA += BigInt(a[j]);
            sumB += BigInt(b[j]);
            
            if (sumA > sumB) {
                possible = false;
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