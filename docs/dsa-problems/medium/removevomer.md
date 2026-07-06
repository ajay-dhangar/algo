---
id: removevomer-2241c
title: "RemovevomeR"
sidebar_label: RemovevomeR
description: "Solution for Codeforces 2241C: RemovevomeR, utilizing a greedy string observation approach."
tags: [Codeforces, strings, greedy, observation]
---

## Description:

You are given a binary string $s$ consisting only of the characters `0` and `1`.

In one operation, you can do the following:
- Choose a substring of $s$ that is a palindrome of length at least 2.
- Delete exactly one character from this chosen substring.
- The remaining parts of the string are then concatenated to form the new string $s$.

Find the minimum possible length of the string $s$ that can be achieved after applying this operation any number of times (possibly zero).

*Note: A string $a$ is a substring of a string $b$ if $a$ can be obtained from $b$ by the deletion of several (possibly, zero or all) characters from the beginning and several (possibly, zero or all) characters from the end. A string is a palindrome if it reads the same forwards and backwards.*

**Input**
The first line contains a single integer $t$ ($1 \le t \le 100$) — the number of test cases. 
The first line of each test case contains a single integer $n$ ($1 \le n \le 100$) — the length of the binary string $s$.
The second line of each test case contains a binary string $s$ of length $n$. 

**Output**
For each test case, print the minimum possible length of the string $s$ that can be achieved after applying the operation any number of times.

---

## Approaches:

### 1. Block Counting Observation (Optimal)

This problem can be solved with a simple $O(N)$ observation by grouping identical adjacent characters into "blocks". 

1. **1 Block (e.g., `000` or `111`):** If the string consists entirely of one character, the whole string is a palindrome. We can repeatedly delete a character until exactly 1 character remains. Minimum length = 1.
2. **2 Blocks (e.g., `00111` or `1100`):** If the string has exactly one transition between `0` and `1`, any palindrome of length $\ge 2$ must be entirely within the `0`s or entirely within the `1`s. We can shrink the blocks, but we can never eliminate them completely. We will inevitably end up with exactly one `0` and one `1` (i.e., `01` or `10`). Since neither `01` nor `10` contain a palindrome of length $\ge 2$, we are stuck. Minimum length = 2.
3. **$\ge$ 3 Blocks (e.g., `010`, `1001`, `00110`):** If there are 3 or more blocks, we will always have a pattern like `0..1..0` or `1..0..1`. We can shrink the inner block to a single character (e.g., forming a `010` palindrome). By picking this `010` palindrome and deleting the *first* `0`, we get `10`. This effectively consumes a boundary block, allowing us to merge blocks and reduce the total block count. By repeating this process, we can always reduce a $\ge 3$ block string down to 1. Minimum length = 1.

**Algorithm:** Count the number of blocks. If `blocks == 2`, the answer is 2. Otherwise, the answer is 1.

### Complexity
* **Time Complexity:** $O(N)$ per testcase, where $N$ is the length of the string. We iterate through the string exactly once to count the block transitions.
* **Space Complexity:** $O(1)$ as we only need a single integer variable to keep track of the block count.

---

## Solutions:

### C++
```cpp
#include <iostream>
#include <string>

using namespace std;

void solve() {
    int n;
    cin >> n;
    string s;
    cin >> s;
    
    int blocks = 1;
    for (int i = 1; i < n; i++) {
        if (s[i] != s[i - 1]) {
            blocks++;
        }
    }
    
    if (blocks == 2) {
        cout << 2 << "\n";
    } else {
        cout << 1 << "\n";
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
        String s = scanner.next();
        
        int blocks = 1;
        for (int i = 1; i < n; i++) {
            if (s.charAt(i) != s.charAt(i - 1)) {
                blocks++;
            }
        }
        
        if (blocks == 2) {
            System.out.println(2);
        } else {
            System.out.println(1);
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
        n = int(input_data[index])
        s = input_data[index+1]
        index += 2
        
        blocks = 1
        for i in range(1, n):
            if s[i] != s[i - 1]:
                blocks += 1
                
        if blocks == 2:
            print(2)
        else:
            print(1)

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
        let n = parseInt(input[index++], 10);
        let s = input[index++];
        
        let blocks = 1;
        for (let j = 1; j < n; j++) {
            if (s[j] !== s[j - 1]) {
                blocks++;
            }
        }
        
        if (blocks === 2) {
            console.log(2);
        } else {
            console.log(1);
        }
    }
}

main();
```