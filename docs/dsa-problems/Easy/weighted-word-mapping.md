---
id: weighted-word-mapping
title: "Weighted Word Mapping"
sidebar_label: "Weighted Word Mapping"
description: "Solution to the Weighted Word Mapping problem across C++, JavaScript, Java, and Python with complexity analysis."
tags: [String, Array, Simulation, POTD]
---

## Problem Description

You are given an array of strings `words`, where each string represents a word containing lowercase English letters. You are also given an integer array `weights` of length 26, where `weights[i]` represents the weight of the $i$-th lowercase English letter. 

The weight of a word is defined as the sum of the weights of its characters. 

For each word, take its weight modulo 26 and map the result to a lowercase English letter using reverse alphabetical order ($0 \rightarrow \text{'z'}$, $1 \rightarrow \text{'y'}$, ..., $25 \rightarrow \text{'a'}$). 

Return a string formed by concatenating the mapped characters for all words in order.

### Example 1:
**Input:** `words` = `["abcd","def","xyz"]`
`weights` = `[5,3,12,14,1,2,3,2,10,6,6,9,7,8,7,10,8,9,6,9,9,8,3,7,7,2]`
**Output:** `"rij"`
**Explanation:** - The weight of `"abcd"` is $5 + 3 + 12 + 14 = 34$. The result modulo 26 is $34 \pmod{26} = 8$, which maps to `'r'`.
- The weight of `"def"` is $14 + 1 + 2 = 17$. The result modulo 26 is $17 \pmod{26} = 17$, which maps to `'i'`.
- The weight of `"xyz"` is $7 + 7 + 2 = 16$. The result modulo 26 is $16 \pmod{26} = 16$, which maps to `'j'`.
Thus, the string formed by concatenating the mapped characters is `"rij"`.

---

## Intuition & Approach

The problem asks us to simulate a specific mapping process for each word. The process is straightforward:
1. Iterate through each word and calculate its total weight by looking up the value of each character in the `weights` array.
2. Find the remainder of the total weight when divided by 26 (`total_weight % 26`).
3. Map this remainder to a character in reverse alphabetical order. Since `'z'` corresponds to 0, `'y'` to 1, etc., we can simply subtract the remainder from the ASCII value of `'z'` and convert it back to a character.
4. Append the mapped character to the final result string.

### Complexity
- **Time Complexity:** $O(N)$, where $N$ is the total number of characters across all words in the array. We visit each character exactly once to calculate the sum.
- **Space Complexity:** $O(W)$, where $W$ is the number of words. The output string will contain exactly one character per word. Auxiliary space is $O(1)$.

---

## Solutions

### C++
```cpp
class Solution {
public:
    string mapWordWeights(vector<string>& words, vector<int>& weights) {
        string result = "";
        for (const string& word : words) {
            int sum = 0;
            for (char c : word) {
                sum = (sum + weights[c - 'a']) % 26;
            }
            int rem = sum;
            result += (char)('z' - rem);
        }
        return result;
    }
};
```

### Java
```java
class Solution {
    public String mapWordWeights(String[] words, int[] weights) {
        StringBuilder result = new StringBuilder();
        for (String word : words) {
            int sum = 0;
            for (char c : word.toCharArray()) {
                sum = (sum + weights[c - 'a']) % 26;
            }
            int rem = sum;
            result.append((char)('z' - rem));
        }
        return result.toString();
    }
}
```

### Python
```py
class Solution:
    def mapWordWeights(self, words: list[str], weights: list[int]) -> str:
        result = []
        for word in words:
            total_weight = sum(weights[ord(c) - ord('a')] for c in word)
            rem = total_weight % 26
            result.append(chr(ord('z') - rem))
            
        return "".join(result)
```

### JavaScript
```js
/**
 * @param {string[]} words
 * @param {number[]} weights
 * @return {string}
 */
var mapWordWeights = function(words, weights) {
    let result = "";
    for (let word of words) {
        let sum = 0;
        for (let char of word) {
            sum = (sum + weights[char.charCodeAt(0) - 97]) % 26;
        }
        let rem = sum;
        result += String.fromCharCode(122 - rem); // 'z' is 122
    }
    return result;
};
```