---
id: divide-and-conquer-2241a
title: "Divide and Conquer"
sidebar_label: Divide and Conquer
description: "Solution for Codeforces 2241A: Divide and Conquer, utilizing a highly optimal math approach."
tags: [Codeforces, math, implementation, greedy]
---

## Description:

You are given two positive integers $x$ and $y$.

You are allowed to perform the following operation any number of times (possibly zero):

- Choose any positive integer $z$ such that $z$ divides $x$.
- Set $x := \frac{x}{z}$.

Determine whether you can make $x$ exactly equal to $y$ using this operation.

**Input**
The first line of the input contains a single integer $t$ ($1 \le t \le 10^4$) — the number of test cases. The description of each test case follows.

The only line of each test case contains two space-separated integers $x$ and $y$ ($1 \le x, y \le 100$).

**Output**
For each test case, print "YES" if you can make $x$ exactly equal to $y$ and "NO" otherwise.

You can output "YES" and "NO" in any case (for example, strings "yEs", "yes" and "Yes" will be recognized as a positive response).

---

## Approaches:

### 1. Optimal Math Approach

The operation replaces $x$ with $x / z$ where $z$ is a divisor of $x$. This essentially means we can divide $x$ by any of its factors to reach a smaller integer. 

1. **Observation:** For $x$ to become exactly $y$ through division, $y$ must be a factor of $x$. In other words, $x$ must be perfectly divisible by $y$. 
2. **Algorithm:** We just need to check if $x \pmod y == 0$. If it is, the answer is "YES" (we can achieve this by performing valid divisions). If $x$ is not a multiple of $y$, it is mathematically impossible to reach $y$, so the answer is "NO".

### Complexity
* **Time Complexity:** $O(1)$ per testcase. We only perform a single modulo operation, which takes constant time.
* **Space Complexity:** $O(1)$ as no extra memory is needed beyond storing the two variables.

---

## Solutions:

### C++
```cpp
#include <iostream>

using namespace std;

void solve() {
    int x, y;
    cin >> x >> y;
    
    if (x % y == 0) {
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
        int x = scanner.nextInt();
        int y = scanner.nextInt();
        
        if (x % y == 0) {
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
    index = 1
    
    for _ in range(t):
        x = int(input_data[index])
        y = int(input_data[index+1])
        index += 2
        
        if x % y == 0:
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
    let index = 1;
    
    for (let i = 0; i < t; i++) {
        let x = parseInt(input[index++], 10);
        let y = parseInt(input[index++], 10);
        
        if (x % y === 0) {
            console.log("YES");
        } else {
            console.log("NO");
        }
    }
}

main();
```