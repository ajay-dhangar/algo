---
id: word-break-ii
title: "Word Break II"
sidebar_label: "Word Break II"
sidebar_position: 11
description: "A hard dynamic programming problem returning all sentences formed by breaking a string into dictionary words, using memoized recursion and Trie optimization."
tags: ["dsa", "algorithms", "dynamic-programming", "backtracking"]
---

# Word Break II

## Overview

Word Break II extends Word Break I by not just checking if a string can be segmented, but returning ALL possible sentences formed by segmenting the string using a dictionary.

## Problem Definition

```
Given:
    - String s
    - Dictionary of words dict
    
Goal:
    Return ALL possible sentences where:
    - s can be segmented into a sequence of dictionary words
    - Words are separated by spaces
    
Example:
    s = "catsanddog"
    dict = ["cat", "cats", "and", "sand", "dog"]
    
Result:
    ["cat sand dog", "cats and dog"]
```

## Recurrence Relation

For each position i in the string, consider all possible words ending at position i:

```
result[i] = all combinations of:
    for each word ending at position i:
        for each sentence in result[j]:
            sentence + " " + word
    where j = i - len(word)
```

**Base case:**
- result[0] = [""] (empty string has one valid segmentation)

## Memoized Recursion Approach

```python
def word_break(s: str, word_dict: list) -> list:
    """
    Find all possible word break combinations.
    
    Args:
        s: Input string
        word_dict: List of valid words
        
    Returns:
        List of all valid sentences
        
    Time: O(n * k) where k is average word length, 
          but actually O(2^n) in worst case for output size
    Space: O(n * output_size) for memoization
    """
    word_set = set(word_dict)
    n = len(s)
    
    # Memoization: position -> list of sentences
    memo = {}
    
    def backtrack(start: int) -> list:
        # If we've processed the entire string, return empty string
        # which will be combined with previous words
        if start == n:
            return [""]
        
        # Return cached result if available
        if start in memo:
            return memo[start]
        
        sentences = []
        
        # Try all possible words starting at position 'start'
        for end in range(start + 1, n + 1):
            word = s[start:end]
            
            if word in word_set:
                # Get all sentences for the remaining string
                for sub_sentence in backtrack(end):
                    if sub_sentence:
                        sentences.append(word + " " + sub_sentence)
                    else:
                        sentences.append(word)
        
        memo[start] = sentences
        return sentences
    
    return backtrack(0)
```

## Python Implementation with Detailed Comments

```python
from typing import List, Dict, Set


class WordBreakSolver:
    """
    Word Break II Solver with multiple approaches.
    
    LeetCode 140 - Word Break II
    """
    
    def __init__(self, s: str, word_dict: List[str]):
        self.s = s
        self.word_set = set(word_dict)
        self.n = len(s)
    
    def solve_memoized(self) -> List[str]:
        """
        Memoized recursion approach.
        
        Time: O(n * L + output_size) where L is max word length
        Space: O(n * output_size)
        """
        memo = {}
        
        def dfs(start: int) -> List[str]:
            if start == self.n:
                return [""]
            
            if start in memo:
                return memo[start]
            
            results = []
            
            for end in range(start + 1, self.n + 1):
                word = self.s[start:end]
                
                if word in self.word_set:
                    for remaining in dfs(end):
                        if remaining:
                            results.append(f"{word} {remaining}")
                        else:
                            results.append(word)
            
            memo[start] = results
            return results
        
        return dfs(0)
    
    def solve_with_trie(self) -> List[str]:
        """
        Trie-based optimization for dictionary lookup.
        More efficient when checking many substrings.
        
        Time: O(n * L) average
        Space: O(total characters in dict + output)
        """
        # Build Trie
        class TrieNode:
            def __init__(self):
                self.children = {}
                self.is_word = False
        
        root = TrieNode()
        for word in self.word_set:
            node = root
            for char in word:
                if char not in node.children:
                    node.children[char] = TrieNode()
                node = node.children[char]
            node.is_word = True
        
        def check_word(start: int, end: int) -> bool:
            """Check if s[start:end] is in dictionary using Trie."""
            node = root
            for i in range(start, end):
                char = self.s[i]
                if char not in node.children:
                    return False
                node = node.children[char]
            return node.is_word
        
        memo = {}
        
        def dfs(start: int) -> List[str]:
            if start == self.n:
                return [""]
            
            if start in memo:
                return memo[start]
            
            results = []
            
            for end in range(start + 1, self.n + 1):
                if check_word(start, end):
                    for remaining in dfs(end):
                        if remaining:
                            results.append(f"{self.s[start:end]} {remaining}")
                        else:
                            results.append(self.s[start:end])
            
            memo[start] = results
            return results
        
        return dfs(0)
    
    def solve_iterative_bottom_up(self) -> List[str]:
        """
        Bottom-up DP approach.
        
        dp[i] = list of sentences for s[0:i]
        """
        dp = [[] for _ in range(self.n + 1)]
        dp[0] = [""]  # Base case: empty string
        
        for i in range(1, self.n + 1):
            for j in range(i):
                word = self.s[j:i]
                if word in self.word_set and dp[j]:
                    for sentence in dp[j]:
                        if sentence:
                            dp[i].append(f"{sentence} {word}")
                        else:
                            dp[i].append(word)
        
        return dp[self.n]


def word_break(s: str, word_dict: List[str]) -> List[str]:
    """Wrapper function for LeetCode."""
    solver = WordBreakSolver(s, word_dict)
    return solver.solve_memoized()
```

## JavaScript Implementation

```javascript
/**
 * Word Break II - Memoized Recursion
 * 
 * @param {string} s - Input string
 * @param {string[]} wordDict - Dictionary of words
 * @returns {string[]} - All valid sentences
 * 
 * Time: O(n * L + output_size)
 * Space: O(n * output_size)
 */
function wordBreak(s, wordDict) {
    const wordSet = new Set(wordDict);
    const n = s.length;
    const memo = new Map();  // position -> list of sentences
    
    function dfs(start) {
        if (start === n) {
            return [""];
        }
        
        if (memo.has(start)) {
            return memo.get(start);
        }
        
        const results = [];
        
        // Try all possible words starting at 'start'
        for (let end = start + 1; end <= n; end++) {
            const word = s.slice(start, end);
            
            if (wordSet.has(word)) {
                const subSentences = dfs(end);
                
                for (const sub of subSentences) {
                    if (sub) {
                        results.push(word + " " + sub);
                    } else {
                        results.push(word);
                    }
                }
            }
        }
        
        memo.set(start, results);
        return results;
    }
    
    return dfs(0);
}

/**
 * Trie-based optimized solution
 */
class TrieNode {
    constructor() {
        this.children = new Map();
        this.isWord = false;
    }
}

function wordBreakWithTrie(s, wordDict) {
    // Build trie
    const root = new TrieNode();
    for (const word of wordDict) {
        let node = root;
        for (const char of word) {
            if (!node.children.has(char)) {
                node.children.set(char, new TrieNode());
            }
            node = node.children.get(char);
        }
        node.isWord = true;
    }
    
    const memo = new Map();
    
    function canBreak(start, end) {
        let node = root;
        for (let i = start; i < end; i++) {
            const char = s[i];
            if (!node.children.has(char)) {
                return false;
            }
            node = node.children.get(char);
        }
        return node.isWord;
    }
    
    function dfs(start) {
        if (start === s.length) {
            return [""];
        }
        
        if (memo.has(start)) {
            return memo.get(start);
        }
        
        const results = [];
        
        for (let end = start + 1; end <= s.length; end++) {
            if (canBreak(start, end)) {
                const subSentences = dfs(end);
                
                for (const sub of subSentences) {
                    if (sub) {
                        results.push(s.slice(start, end) + " " + sub);
                    } else {
                        results.push(s.slice(start, end));
                    }
                }
            }
        }
        
        memo.set(start, results);
        return results;
    }
    
    return dfs(0);
}

// Example usage
const s = "catsanddog";
const wordDict = ["cat", "cats", "and", "sand", "dog"];

console.log(wordBreak(s, wordDict));
// Output: ["cat sand dog", "cats and dog"]
```

## Comparison: Word Break I vs Word Break II

| Aspect | Word Break I | Word Break II |
|--------|-------------|---------------|
| Return type | Boolean | List of strings |
| Time complexity | O(n * L) | O(n * L + output) |
| Space complexity | O(n) | O(n * output) |
| Use case | Check possibility | Generate all combinations |
| Approach | Simple DP | Memoized recursion |

```python
# Word Break I - Boolean DP
def word_break_i(s: str, word_dict: List[str]) -> bool:
    """Check if s can be segmented."""
    word_set = set(word_dict)
    n = len(s)
    dp = [False] * (n + 1)
    dp[0] = True
    
    for i in range(1, n + 1):
        for j in range(i):
            if dp[j] and s[j:i] in word_set:
                dp[i] = True
                break
    
    return dp[n]
```

## Visual Example

```
s = "catsanddog"
dict = ["cat", "cats", "and", "sand", "dog"]

Recursion tree:
                      start=0
                     /        \
              "cat"           "cats"
              (start=3)        (start=4)
             /      \          |
         "sand"    (no match)  "and"
         (start=7)             (start=7)
            |                    |
          "dog"                 "dog"
          (start=10)             (start=10)
             |                    |
           [""]                  [""]
              |                    |
         ["cat sand dog"]    ["cats and dog"]
```

## Complexity Analysis

| Operation | Time | Space |
|-----------|------|-------|
| Memoized recursion | O(n * L + output_size) | O(n * output_size) |
| Trie optimization | O(n * L + output_size) | O(total_chars + n * output_size) |
| Bottom-up DP | O(n^2 * L + output_size) | O(n * output_size) |

Where:
- n = length of string s
- L = max word length in dictionary
- output_size = total length of all generated sentences

**Note**: The output itself can be exponential in worst case (e.g., s="aaaaaaa", dict=["a","aa","aaa",...]).

## LeetCode Problem

**LeetCode 140 - Word Break II**

```python
class Solution:
    def wordBreak(self, s: str, wordDict: List[str]) -> List[str]:
        return word_break(s, wordDict)
```

## Common Pitfalls

1. **Base case handling**: Empty suffix should return [""], not []
2. **Space in concatenation**: Handle first word vs subsequent words differently
3. **Large output**: Realize output can be exponential
4. **Memoization key**: Position is sufficient key for memoization
5. **Trie overhead**: Only use Trie if dictionary is large and strings are long
