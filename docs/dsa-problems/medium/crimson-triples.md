---
id: crimson-triples
title: "Crimson Triples"
sidebar_label: Crimson Triples
description: "Solution for Codeforces 2238B: Crimson Triples, utilizing mathematical observations and a greedy approach."
tags: [Codeforces, math, greedy, competitive-programming, array]
---

## Description:

After summoning the next boss — The Brain of Cthulhu, you noticed that it surrounds itself with $n$ eyes, numbered from $1$ to $n$. In one attack, The Brain of Cthulhu chooses a triple of eyes (not necessarily distinct) with numbers $(a,b,c)$. The triple of eyes is called crimson if and only if the following property holds:

$$ \gcd(\operatorname{lcm}(a,b),\operatorname{lcm}(b,c))=\gcd(a,c) $$

To defeat the boss, you want to know how many ways The Brain of Cthulhu can choose a crimson triple of eyes. The triples of eyes $(a_1,b_1,c_1)$ and $(a_2,b_2,c_2)$ are considered different if $a_1 \neq a_2$, or $b_1 \neq b_2$, or $c_1 \neq c_2$.

**Input**
Each test contains multiple test cases. The first line contains the number of test cases $t$ ($1 \le t \le 1000$). The description of the test cases follows.
The only line of each test case contains one integer $n$ ($1 \le n \le 2 \cdot 10^5$) — the number of eyes of The Brain of Cthulhu.
It is guaranteed that the sum of $n$ across all test cases does not exceed $2 \cdot 10^5$.

**Output**
For each test case, output one integer — the number of ways to choose a crimson triple of eyes.

---

## Approaches:

### 1. Math and Number Theory Observation

To solve this problem efficiently, we need to simplify the condition $\gcd(\operatorname{lcm}(a,b),\operatorname{lcm}(b,c)) = \gcd(a,c)$. 

1. **Prime Factorization Analysis:** Let's look at the exponent of a specific prime $p$ in the prime factorization of $a, b,$ and $c$. Let these exponents be $x, y,$ and $z$ respectively.
   - The exponent of $p$ in $\operatorname{lcm}(a,b)$ is $\max(x, y)$.
   - The exponent of $p$ in $\operatorname{lcm}(b,c)$ is $\max(y, z)$.
   - The exponent of $p$ on the left-hand side (LHS) of our equation is $\min(\max(x, y), \max(y, z))$.
   - The exponent of $p$ on the right-hand side (RHS) of our equation is $\min(x, z)$.
2. **Deriving the Requirement:** We need $\min(\max(x, y), \max(y, z)) = \min(x, z)$ for all primes $p$.
   - If you test the possible orderings of $x, y,$ and $z$, you will find this equality only holds if $y \le x$ and $y \le z$. 
   - This means the exponent of any prime $p$ in $b$ must be less than or equal to its exponent in both $a$ and $c$.
   - In number theory terms, this simply means **$b$ must divide $a$** and **$b$ must divide $c$**.
3. **Counting the Triples:** Now the problem is reduced to finding the number of pairs $(a, c)$ such that both are multiples of $b$, for every possible $b$ from $1$ to $n$.
   - For a fixed $b$, there are exactly $\lfloor n/b \rfloor$ multiples of $b$ in the range $[1, n]$.
   - Since $a$ and $c$ are chosen independently from these multiples, there are $\lfloor n/b \rfloor \times \lfloor n/b \rfloor$ valid pairs for a given $b$.
   - We just need to sum $\lfloor n/b \rfloor^2$ for all $b$ from $1$ to $n$.

### Complexity
* **Time Complexity:** $O(n)$ per testcase. Since the sum of $n$ across all test cases is $\le 2 \cdot 10^5$, the overall time complexity is $O(N)$ which easily passes within the time limit.
* **Space Complexity:** $O(1)$ as we only need a few variables to store the sum.

---

## Solutions:

### C++
```cpp
#include <iostream>

using namespace std;

void solve() {
    int n;
    cin >> n;
    long long res = 0;
    
    // Sum (n / b)^2 for all 1 <= b <= n
    for (int b = 1; b <= n; b++) {
        long long multiples = n / b;
        res += multiples * multiples;
    }
    
    cout << res << "\n";
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
        long res = 0;
        
        // Sum (n / b)^2 for all 1 <= b <= n
        for (int b = 1; b <= n; b++) {
            long multiples = n / b;
            res += multiples * multiples;
        }
        
        System.out.println(res);
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
    
    for i in range(1, t + 1):
        n = int(input_data[i])
        res = 0
        
        # Sum (n / b)^2 for all 1 <= b <= n
        for b in range(1, n + 1):
            multiples = n // b
            res += multiples * multiples
            
        print(res)

if __name__ == "__main__":
    solve()
```

### JavaScript
```js
const fs = require('fs');

function main() {
    const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
    if (input.length === 0 || input[0] === '') return;
    
    let t = parseInt(input[0], 10);
    let index = 1;
    
    for (let i = 0; i < t; i++) {
        let n = parseInt(input[index++], 10);
        let res = 0; // Number max safe integer is ~9e15, max answer is ~3.2e10, so safe.
        
        // Sum (n / b)^2 for all 1 <= b <= n
        for (let b = 1; b <= n; b++) {
            let multiples = Math.floor(n / b);
            res += multiples * multiples;
        }
        
        console.log(res);
    }
}

main();
```