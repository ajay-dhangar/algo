---
id: bigrams-2242a
title: "Bigrams"
sidebar_label: Bigrams
description: "Solution for Codeforces 2242A: Bigrams, utilizing a greedy frequency counting approach."
tags: [Codeforces, strings, math, greedy]
---

## Description:

A bigram in a string is a pair of adjacent characters. For example, the string `helloello` contains 8 bigrams: `he`, `el`, `ll`, `lo`, `oe`, `el`, `ll`, `lo`.

Monocarp has cards with letters: $c_1$ cards with the letter a, $c_2$ cards with the letter b, ..., $c_k$ cards with the $k$-th letter of the Latin alphabet. He wants to make a string from these cards, using each card exactly once. The resulting string must contain at least two equal bigrams. The order of characters in each bigram matters; for example, the string `aba` does not have two equal bigrams.

Determine whether it is possible to make a string that satisfies these requirements.

**Input**
The first line contains one integer $t$ ($1 \le t \le 10^4$) — the number of test cases.

Each test case consists of two lines:
- the first line contains one integer $k$ ($1 \le k \le 10$);
- the second line contains $k$ integers $c_1, c_2, \dots, c_k$ ($1 \le c_i \le 10^8$), where $c_i$ is the number of cards with the $i$-th letter of the Latin alphabet.

**Output**
For each test case, output "YES" if it is possible to construct a string satisfying the condition, or "NO" otherwise.

---

## Approaches:

### 1. Greedy Frequency Counting (Optimal)

To form a repeating bigram (let's say $XY$), we need it to appear at least twice in the string. We can break this down into two distinct scenarios:

1. **The bigram consists of two different characters ($X \neq Y$):** If we want the bigram $XY$ to repeat (e.g., `XY...XY`), we must use the character $X$ at least twice and the character $Y$ at least twice. This means we need at least **two distinct characters that both have a frequency $\ge 2$**.
2. **The bigram consists of the same character ($X = Y$):**
   If we want the bigram $XX$ to repeat, it must appear twice. These appearances can overlap (like `XXX`, which contains `XX` at indices 0-1 and 1-2) or be entirely separate (`XX...XX`). The minimum number of characters required to form this overlapping pattern is 3. This means we need at least **one character that has a frequency $\ge 3$**.

**Algorithm:**
If neither of these conditions is met (i.e., no character appears 3 or more times, and at most one character appears 2 times), it is mathematically impossible to form any repeating bigram. We simply count how many characters meet these frequency thresholds and evaluate.

#### Complexity
* **Time Complexity:** $O(K)$ per testcase, where $K$ is the size of the alphabet ($K \le 10$). The algorithm practically runs in $O(1)$ time.
* **Space Complexity:** $O(1)$ auxiliary space, as we only maintain two frequency counters.

#### Solutions:

**C++**
```cpp
#include <iostream>
#include <vector>

using namespace std;

void solve() {
    int k;
    cin >> k;
    int count2 = 0, count3 = 0;
    
    for (int i = 0; i < k; i++) {
        int c;
        cin >> c;
        if (c >= 3) count3++;
        if (c >= 2) count2++;
    }
    
    if (count3 >= 1 || count2 >= 2) {
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
        int k = scanner.nextInt();
        int count2 = 0, count3 = 0;
        
        for (int i = 0; i < k; i++) {
            int c = scanner.nextInt();
            if (c >= 3) count3++;
            if (c >= 2) count2++;
        }
        
        if (count3 >= 1 || count2 >= 2) {
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
        k = int(input_data[idx])
        idx += 1
        
        count2 = 0
        count3 = 0
        
        for _ in range(k):
            c = int(input_data[idx])
            idx += 1
            if c >= 3:
                count3 += 1
            if c >= 2:
                count2 += 1
                
        if count3 >= 1 or count2 >= 2:
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
    const input = fs.readFileSync('/dev/stdin', 'utf-8').trim().split(/\s+/);
    if (input.length === 0 || input[0] === '') return;
    
    let t = parseInt(input[0], 10);
    let idx = 1;
    
    for (let i = 0; i < t; i++) {
        let k = parseInt(input[idx++], 10);
        
        let count2 = 0, count3 = 0;
        for (let j = 0; j < k; j++) {
            let c = parseInt(input[idx++], 10);
            if (c >= 3) count3++;
            if (c >= 2) count2++;
        }
        
        if (count3 >= 1 || count2 >= 2) {
            console.log("YES");
        } else {
            console.log("NO");
        }
    }
}

main();
```