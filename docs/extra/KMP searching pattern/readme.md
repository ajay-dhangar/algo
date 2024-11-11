---
id: kmp-searching-pattern
title: KMP Pattern Searching Algorithm - Complete Guide
sidebar_label: KMP Pattern Searching
description: A comprehensive guide to the Knuth-Morris-Pratt (KMP) string matching algorithm, including theory, analysis, and implementations in multiple languages
tags: [Algorithms, String Matching, Pattern Searching, Dynamic Programming]
---

# 🔍 KMP (Knuth-Morris-Pratt) Pattern Searching Algorithm

## 📚 Introduction

The Knuth-Morris-Pratt (KMP) algorithm is an efficient string-matching algorithm that searches for occurrences of a "word" W within a main "text string" S. Unlike naive approaches, it achieves linear time complexity by utilizing pattern information to avoid unnecessary comparisons.

## ⭐ Key Features

- 🚀 Time Complexity: O(n + m) where n is text length and m is pattern length
- 💾 Space Complexity: O(m) for pattern preprocessing
- 🎯 Efficient for patterns with repeating characters
- 🔄 No backtracking in the main text string

## 🛠️ How It Works

### Algorithm Overview

The key insight of KMP is that when a mismatch occurs, the pattern's structure can determine where to continue the search, rather than starting over. This is achieved through two main phases:

1. **Preprocessing Phase**: 
   - Create a Longest Proper Prefix which is also Suffix (LPS) array
   - This array helps skip unnecessary comparisons
   
2. **Searching Phase**: 
   - Use the LPS array to efficiently find pattern matches
   - Avoid re-examining previously matched characters

### LPS Array Explanation

The LPS array stores the lengths of the longest proper prefix that is also a suffix for each position in the pattern.

Example:
```
Pattern: "AAACAAAA"
LPS:     [0,1,2,0,1,2,3,3]
```

## 💻 Multi-Language Implementations

### Python Implementation

```python
class KMPMatcher:
    def __init__(self, pattern: str):
        """
        Initialize KMP matcher with a pattern.
        
        Args:
            pattern: The pattern string to search for
        """
        self.pattern = pattern
        self.partial_match_table = self._build_partial_match_table()
    
    def _build_partial_match_table(self) -> list[int]:
        """
        Build the partial match table (failure function) for the pattern.
        
        Returns:
            List of integers representing the partial match values
        """
        table = [0] * len(self.pattern)
        length = 0
        i = 1
        
        while i < len(self.pattern):
            if self.pattern[i] == self.pattern[length]:
                length += 1
                table[i] = length
                i += 1
            else:
                if length != 0:
                    length = table[length - 1]
                else:
                    table[i] = 0
                    i += 1
        
        return table
    
    def search(self, text: str) -> list[int]:
        """
        Find all occurrences of the pattern in the given text.
        
        Args:
            text: The text string to search in
            
        Returns:
            List of starting indices where the pattern was found
        """
        if not self.pattern or not text:
            return []
            
        matches = []
        j = 0  # Pattern index
        i = 0  # Text index
        
        while i < len(text):
            if self.pattern[j] == text[i]:
                i += 1
                j += 1
                
                if j == len(self.pattern):
                    matches.append(i - j)
                    j = self.partial_match_table[j - 1]
            else:
                if j != 0:
                    j = self.partial_match_table[j - 1]
                else:
                    i += 1
        
        return matches
```

### C++ Implementation

```cpp
#include <vector>
#include <string>
#include <string_view>

class KMPMatcher {
private:
    std::string pattern;
    std::vector<int> partial_match_table;
    
    std::vector<int> buildPartialMatchTable() {
        std::vector<int> table(pattern.length(), 0);
        int length = 0;
        int i = 1;
        
        while (i < pattern.length()) {
            if (pattern[i] == pattern[length]) {
                ++length;
                table[i] = length;
                ++i;
            } else {
                if (length != 0) {
                    length = table[length - 1];
                } else {
                    table[i] = 0;
                    ++i;
                }
            }
        }
        
        return table;
    }
    
public:
    explicit KMPMatcher(std::string_view pat) 
        : pattern(pat)
        , partial_match_table(buildPartialMatchTable()) {}
    
    std::vector<int> search(std::string_view text) const {
        std::vector<int> matches;
        if (pattern.empty() || text.empty()) {
            return matches;
        }
        
        int j = 0;  // Pattern index
        int i = 0;  // Text index
        
        while (i < text.length()) {
            if (pattern[j] == text[i]) {
                ++i;
                ++j;
                
                if (j == pattern.length()) {
                    matches.push_back(i - j);
                    j = partial_match_table[j - 1];
                }
            } else {
                if (j != 0) {
                    j = partial_match_table[j - 1];
                } else {
                    ++i;
                }
            }
        }
        
        return matches;
    }
};
```

### Java Implementation

```java
import java.util.ArrayList;
import java.util.List;

public class KMPMatcher {
    private final String pattern;
    private final int[] partialMatchTable;
    
    public KMPMatcher(String pattern) {
        this.pattern = pattern;
        this.partialMatchTable = buildPartialMatchTable();
    }
    
    private int[] buildPartialMatchTable() {
        int[] table = new int[pattern.length()];
        int length = 0;
        int i = 1;
        
        while (i < pattern.length()) {
            if (pattern.charAt(i) == pattern.charAt(length)) {
                length++;
                table[i] = length;
                i++;
            } else {
                if (length != 0) {
                    length = table[length - 1];
                } else {
                    table[i] = 0;
                    i++;
                }
            }
        }
        
        return table;
    }
    
    public List<Integer> search(String text) {
        List<Integer> matches = new ArrayList<>();
        
        if (pattern.isEmpty() || text.isEmpty()) {
            return matches;
        }
        
        int j = 0;  // Pattern index
        int i = 0;  // Text index
        
        while (i < text.length()) {
            if (pattern.charAt(j) == text.charAt(i)) {
                i++;
                j++;
                
                if (j == pattern.length()) {
                    matches.add(i - j);
                    j = partialMatchTable[j - 1];
                }
            } else {
                if (j != 0) {
                    j = partialMatchTable[j - 1];
                } else {
                    i++;
                }
            }
        }
        
        return matches;
    }
}
```

## 🎯 Usage Examples

### Basic Usage
```python
# Python example
matcher = KMPMatcher("ABAB")
text = "ABABCABABABD"
matches = matcher.search(text)
print(f"Pattern found at indices: {matches}")  # Output: [0, 6]
```

### Step-by-Step Example

Let's walk through how KMP processes a simple example:
```
Text:    ABABCABAB
Pattern: ABAB

Step 1: Build partial match table for pattern
Pattern: A  B  A  B
Table:  [0, 0, 1, 2]

Step 2: Search process
1. ABABCABAB  (match at index 0)
   ABAB
   ✓✓✓✓

2. ABABCABAB  (attempt at index 2, using partial match table)
     ABAB
     ✓✓✓✓

3. ABABCABAB  (match at index 5)
        ABAB
        ✓✓✓✓
```

## 🚨 Common Pitfalls and Solutions

1. **Empty String Handling**
   ```python
   def search(self, text: str) -> list[int]:
       if not self.pattern or not text:
           return []  # Handle empty strings gracefully
   ```

2. **Pattern Longer Than Text**
   ```python
   def search(self, text: str) -> list[int]:
       if len(self.pattern) > len(text):
           return []  # Pattern can't be found in shorter text
   ```

3. **Case Sensitivity**
   ```python
   def case_insensitive_search(self, text: str) -> list[int]:
       return self.search(text.lower())  # Convert both to same case
   ```

## ✨ Best Practices

1. **Input Validation**
   - Always validate input strings
   - Handle edge cases gracefully
   - Document expected behavior

2. **Memory Efficiency**
   - Reuse partial match table for multiple searches
   - Use appropriate data structures for your language
   - Consider memory constraints for large texts

3. **Performance Optimization**
   - Use built-in string methods for very short patterns
   - Consider streaming for large texts
   - Profile your specific use case

## 🔗 Applications

1. **Text Editors**
   - Find and replace functionality
   - Search highlighting
   - Code completion

2. **Bioinformatics**
   - DNA sequence matching
   - Protein pattern recognition
   - Genome analysis

3. **Network Security**
   - Intrusion detection
   - Pattern matching in network packets
   - Malware signature detection
