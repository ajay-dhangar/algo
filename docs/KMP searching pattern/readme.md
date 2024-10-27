# 🔍 KMP (Knuth-Morris-Pratt) Pattern Searching Algorithm

## 📚 Overview
The KMP algorithm is an efficient string matching algorithm that finds occurrences of a "word" W within a main "text string" S by employing the observation that when a mismatch occurs, the word itself embodies sufficient information to determine where the next match could begin, thus bypassing re-examination of previously matched characters.

<div align="center">
    <img src="https://media.geeksforgeeks.org/wp-content/uploads/20221125004358/image-660x398.png" alt="KMP Algorithm" width="500">
</div>

## ⭐ Key Features
- 🚀 Time Complexity: O(n + m) where n is text length and m is pattern length
- 💾 Space Complexity: O(m) for pattern preprocessing
- 🎯 Efficient for patterns with repeating characters
- 🔄 No backtracking in the main text string

## 🛠️ How It Works
1. **Preprocessing Phase**: Create a Longest Proper Prefix which is also Suffix (LPS) array
2. **Searching Phase**: Use the LPS array to skip unnecessary comparisons

### LPS Array Explanation
The LPS array stores the lengths of the longest proper prefix that is also a suffix for each position in the pattern. This helps in determining how many characters to skip when a mismatch occurs.

Example:
```
Pattern: "AAACAAAA"
LPS:     [0,1,2,0,1,2,3,3]
```

## 💻 Implementation

### Creating the LPS Array
```python
def compute_lps_array(pattern):
    m = len(pattern)
    lps = [0] * m  # Initialize LPS array with zeros
    
    length = 0  # Length of previous longest prefix suffix
    i = 1       # Iterator starting from second character
    
    while i < m:
        if pattern[i] == pattern[length]:
            length += 1
            lps[i] = length
            i += 1
        else:
            if length != 0:
                # This is the tricky part
                length = lps[length - 1]
            else:
                lps[i] = 0
                i += 1
    return lps
```

### KMP Search Algorithm
```python
def kmp_search(text, pattern):
    n = len(text)
    m = len(pattern)
    matches = []  # Store all positions where pattern is found
    
    # Create LPS array
    lps = compute_lps_array(pattern)
    
    i = 0  # Index for text
    j = 0  # Index for pattern
    
    while i < n:
        if pattern[j] == text[i]:
            i += 1
            j += 1
        
        if j == m:
            matches.append(i - j)  # Pattern found at i-j
            j = lps[j - 1]
        
        elif i < n and pattern[j] != text[i]:
            if j != 0:
                j = lps[j - 1]
            else:
                i += 1
                
    return matches
```

## 🎯 Example Usage
```python
# Example usage
text = "ABABDABACDABABCABAB"
pattern = "ABABCABAB"

matches = kmp_search(text, pattern)
print(f"Pattern found at indices: {matches}")
```

## 🔍 Step-by-Step Example
Let's see how KMP works with a simple example:
```
Text: "ABABCABAB"
Pattern: "ABAB"

LPS array for pattern: [0,0,1,2]

Step 1: Compare text and pattern
A B A B C A B A B
A B A B
✓ ✓ ✓ ✓         Pattern found at index 0

Step 2: Use LPS to slide pattern
A B A B C A B A B
    A B A B
    ✗           Mismatch, use LPS to slide

Step 3: Continue searching
A B A B C A B A B
        A B A B
        ✗       Mismatch, continue...
```

## ⚡ Performance Comparison
Traditional string matching algorithms:
- Naive approach: O(mn)
- KMP algorithm: O(m + n)

Where:
- m = length of pattern
- n = length of text

## 🚨 Common Pitfalls
1. Not handling empty strings
2. Incorrect LPS array computation
3. Not considering case sensitivity
4. Improper handling of pattern length > text length

## 🔗 Additional Resources
- Original Paper: Knuth, Morris, Pratt (1977)
- Applications in:
  - Text editors
  - DNA sequence matching
  - Network security
  - Pattern recognition

## ✨ Best Practices
1. Always validate input strings
2. Use built-in string functions for small strings
3. Consider memory constraints for large texts
4. Cache LPS array if same pattern is used multiple times