---
id: ezraft-and-array-2246b
title: "Ezraft and Array"
sidebar_label: Ezraft and Array
description: "Solution for Codeforces 2246B: Ezraft and Array, utilizing a greedy constructive approach."
tags: [Codeforces, constructive-algorithms, math]
---

## Description:

You are given a single integer $n$. Construct an array of $n$ distinct positive integers $a_1, \dots, a_n$ such that for all $i$ ($1 \le i \le n$), $a_1 + a_2 + a_3 + \dots + a_n$ is divisible by $a_i$, or determine that no such array exists.

**Input**
Each test contains multiple test cases. The first line contains the number of test cases $t$ ($1 \le t \le 50$). The description of the test cases follows.

The first and only line of each test case contains a single integer $n$ ($1 \le n \le 50$).

**Output**
For each test case, if there is no solution, output a single integer $-1$.

Otherwise, output $n$ integers $a_1, \dots, a_n$ ($1 \le a_i \le 10^{17}$) — an array satisfying the conditions.

If there are multiple solutions, print any of them.

---

## Video Explanation

<LiteYouTubeEmbed
  id="rTcYFlk4X3s"
  params="autoplay=1&autohide=1&showinfo=0&rel=0"
  title="Codeforces 2246B: ezraft and Array (Div 2)"
  poster="maxresdefault"
  webp
/>

---

## Approaches:

### 1. Constructive Pattern (Optimal)

This is a classic constructive algorithm problem. Let's analyze small values of $n$:
- For $n = 1$: The array `[1]` works perfectly since $1$ divides $1$.
- For $n = 2$: We need two *distinct* integers $a_1, a_2$ such that both divide $a_1 + a_2$. This means $a_1$ must divide $a_2$ and $a_2$ must divide $a_1$, which is only mathematically possible if $a_1 = a_2$. Since the integers must be strictly distinct, there is **no solution** for $n = 2$.
- For $n = 3$: The array `[1, 2, 3]` has a total sum of $6$. Since $1$, $2$, and $3$ all evenly divide $6$, this is a valid base solution!

From $n = 3$ onwards, we can build the rest of the array inductively. 
If we already have a valid array (like `[1, 2, 3]`), its sum is $S$. If we append exactly $S$ to the array as the next element, the new total sum becomes $S + S = 2S$. 
Since every previous element successfully divided $S$, they will definitely divide $2S$. And our newly added element $S$ obviously divides $2S$ as well.

**Algorithm:**
1. Handle base cases: if $n = 1$, return `[1]`. If $n = 2$, return `-1`.
2. Start with the base array `[1, 2, 3]` for $n = 3$. The running sum is $6$.
3. For each subsequent element from $4$ to $n$, append the current running sum to the array, and then double the running sum for the next iteration.
4. *Constraint Check:* For $n = 50$, the maximum value in the array would be $3 \times 2^{46}$, which is approximately $2.1 \times 10^{14}$. This easily fits within the $10^{17}$ constraint limit, meaning standard 64-bit integers (`long long` / `BigInt`) are sufficient.

#### Complexity
* **Time Complexity:** $O(N)$ per testcase, where $N$ is the desired length of the array. We construct the array in a single linear pass.
* **Space Complexity:** $O(N)$ to store the array elements before printing the result.

#### Solutions:

**C++**
```cpp
#include <iostream>
#include <vector>

using namespace std;

void solve() {
    int n;
    cin >> n;
    
    if (n == 1) {
        cout << 1 << "\n";
        return;
    }
    if (n == 2) {
        cout << -1 << "\n";
        return;
    }
    
    vector<long long> a = {1, 2, 3};
    long long current_sum = 6;
    
    for (int i = 3; i < n; i++) {
        a.push_back(current_sum);
        current_sum *= 2;
    }
    
    for (int i = 0; i < n; i++) {
        cout << a[i] << (i == n - 1 ? "" : " ");
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
import java.util.ArrayList;

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
        
        if (n == 1) {
            System.out.println(1);
            return;
        }
        if (n == 2) {
            System.out.println(-1);
            return;
        }
        
        ArrayList<Long> a = new ArrayList<>();
        a.add(1L);
        a.add(2L);
        a.add(3L);
        long currentSum = 6;
        
        for (int i = 3; i < n; i++) {
            a.add(currentSum);
            currentSum *= 2;
        }
        
        for (int i = 0; i < n; i++) {
            System.out.print(a.get(i) + (i == n - 1 ? "" : " "));
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
    
    for i in range(1, t + 1):
        n = int(input_data[i])
        
        if n == 1:
            print(1)
            continue
        if n == 2:
            print(-1)
            continue
            
        a = [1, 2, 3]
        current_sum = 6
        
        for _ in range(3, n):
            a.append(current_sum)
            current_sum *= 2
            
        print(*(a))

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
    
    for (let i = 1; i <= t; i++) {
        let n = parseInt(input[i], 10);
        
        if (n === 1) {
            console.log(1);
            continue;
        }
        if (n === 2) {
            console.log(-1);
            continue;
        }
        
        // Using BigInt to safely handle 64-bit integers
        let a = [1n, 2n, 3n]; 
        let currentSum = 6n;
        
        for (let j = 3; j < n; j++) {
            a.push(currentSum);
            currentSum *= 2n;
        }
        
        console.log(a.join(' '));
    }
}

main();
```