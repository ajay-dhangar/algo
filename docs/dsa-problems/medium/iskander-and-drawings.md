---
id: iskander-and-drawings-2244a
title: "Iskander and Drawings"
sidebar_label: Iskander and Drawings
description: "Solution for Codeforces 2244A: Iskander and Drawings, calculating the maximum time to erase a line."
tags: [Codeforces, strings, math, implementation]
---

## Description:

During a geometry lesson, Iskander got very bored, so he decided to draw in Yura's notebook. To do this, he took a row and drew horizontal lines on it. Some lines are long, some are short, and some parts of the page remain empty.

The page is represented by a string `s`, where the character `*` denotes an empty part of the paper, and the character `#` denotes one centimeter of a drawn line. A continuous sequence of `#` characters forms a single line.

Yura decided to erase all the lines and made Iskander help him: they will erase one of the lines from both ends simultaneously.

Each second, Iskander erases 1 centimeter from the right end of the line, and Yura erases 1 centimeter from the left end. If the current length of the line is 1 or 2 centimeters, then in the next second it is erased completely, and the process ends.

Yura wants to choose a line so that, together with Iskander, they erase it for as long as possible. Help him determine this maximum time. If there are no lines on the page, the answer is 0 seconds.

**Input**
The first line contains a single integer `t (1 <= t <= 2500)` — the number of test cases.
The first line of each test case contains an integer `n (1 <= n <= 10)` — the length of the string `s`.
The second line of each test case contains a string `s` of length `n`, consisting of characters `#` and `*`.

**Output**
For each test case, output a single integer — the maximum time required to erase a line.

---

## Video Explanation:

<LiteYouTubeEmbed id="0KFlUD16v2M" params="autoplay=1&amp;autohide=1&amp;showinfo=0&amp;rel=0" title="Iskander and Drawings (Codeforces 2244A)" poster="maxresdefault" webp={true} />

---

## Approaches:

### 1. Max Contiguous Sequence (Optimal)

To maximize the time spent erasing, Yura and Iskander should pick the longest continuous line available on the page. We just need to find the length of the longest contiguous sequence of `#` characters, let's call this maximum length `L`.

Because both of them erase 1 centimeter per second simultaneously (one from the left, one from the right), the length of the line decreases by 2 centimeters each second. 
- A line of length 1 or 2 takes exactly 1 second to erase.
- A line of length 3 or 4 takes exactly 2 seconds.
- Mathematically, the time required to erase a line of length `L` is simply the ceiling of `L / 2`, which can be calculated using integer division as `(L + 1) / 2`.

**Algorithm:**
1. Iterate through the string `s`.
2. Maintain a counter for the current sequence of `#` characters.
3. Keep track of the global maximum sequence length found so far.
4. If a `*` is encountered, reset the current counter to 0.
5. After scanning the string, apply the formula `(max_len + 1) / 2` and print the result.

#### Complexity
* **Time Complexity:** $O(n)$ per testcase, where `n` is the length of the string. We perform a single linear scan of the string.
* **Space Complexity:** $O(1)$ auxiliary space, as we only need two integer variables to keep track of the counts regardless of the string's length.

#### Solutions:

**C++**
```cpp
#include <iostream>
#include <string>
#include <algorithm>

using namespace std;

void solve() {
    int n;
    cin >> n;
    string s;
    cin >> s;
    
    int max_len = 0;
    int current_len = 0;
    
    for (char c : s) {
        if (c == '#') {
            current_len++;
            max_len = max(max_len, current_len);
        } else {
            current_len = 0;
        }
    }
    
    // Applying ceiling division formula for L / 2
    cout << (max_len + 1) / 2 << "\n";
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
        String s = scanner.next();
        
        int maxLen = 0;
        int currentLen = 0;
        
        for (int i = 0; i < n; i++) {
            if (s.charAt(i) == '#') {
                currentLen++;
                maxLen = Math.max(maxLen, currentLen);
            } else {
                currentLen = 0;
            }
        }
        
        // Applying ceiling division formula for L / 2
        System.out.println((maxLen + 1) / 2);
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
        s = input_data[idx + 1]
        idx += 2
        
        max_len = 0
        current_len = 0
        
        for char in s:
            if char == '#':
                current_len += 1
                max_len = max(max_len, current_len)
            else:
                current_len = 0
                
        # Applying ceiling division formula for L / 2
        print((max_len + 1) // 2)

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
        let s = input[idx++];
        
        let maxLen = 0;
        let currentLen = 0;
        
        for (let j = 0; j < n; j++) {
            if (s[j] === '#') {
                currentLen++;
                maxLen = Math.max(maxLen, currentLen);
            } else {
                currentLen = 0;
            }
        }
        
        // Applying ceiling division formula for L / 2
        console.log(Math.floor((maxLen + 1) / 2));
    }
}

main();
```
