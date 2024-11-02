---
id: boyer-moore-search  
sidebar_position: 5  
title: Boyer-Moore Search  
sidebar_label: Boyer-Moore  
---

### Definition:

**Boyer-Moore Search** is a string-search algorithm that skips sections of text to improve efficiency, making it highly effective for long text searches. It relies on two heuristics—bad character rule and good suffix rule—to skip sections that don’t match, enabling faster matching.

### Characteristics:

- **String Matching**: Efficient for matching strings in long texts.
- **Heuristic-Based Skipping**: Uses heuristics to skip mismatching sections.
- **Backward Matching**: Compares the pattern from right to left.

### How Boyer-Moore Works:

1. **Initialize**: Place pattern at the start of the text.
2. **Compare Backwards**: Match the pattern from right to left.
3. **Skip**: Use heuristics to skip mismatching sections.
4. **Repeat**: Continue until the pattern is found or text is exhausted.

### Time Complexity:

- **Best Case**: \(O(n/m)\), where `n` is the length of the text and `m` is the length of the pattern.
- **Worst Case**: \(O(n \times m)\)

### Space Complexity:

- **Space Complexity**: \(O(m)\) for storing pattern rules.

### Advantages of Boyer-Moore:

- **High Efficiency**: Reduces unnecessary comparisons.
- **Ideal for Large Texts**: Particularly effective with long strings.

### Disadvantages of Boyer-Moore:

- **Complex Heuristic**: More challenging to implement than simpler algorithms.
- **Less Effective for Short Patterns**: Overhead is high for short patterns.

### Boyer-Moore Algorithm (Java Implementation):

```java
class BoyerMoore {
    public static int boyerMooreSearch(String text, String pattern) {
        int[] last = new int[256];
        Arrays.fill(last, -1);
        for (int i = 0; i < pattern.length(); i++) {
            last[pattern.charAt(i)] = i;
        }

        int n = text.length();
        int m = pattern.length();
        int s = 0;

        while (s <= n - m) {
            int j = m - 1;
            while (j >= 0 && pattern.charAt(j) == text.charAt(s + j)) {
                j--;
            }
            if (j < 0) {
                return s;
            } else {
                s += Math.max(1, j - last[text.charAt(s + j)]);
            }
        }
        return -1;  // Pattern not found
    }
}
```
### Applications of Boyer-Moore:
Text Editors: Searching for patterns in documents.
DNA Sequencing: Efficiently matches DNA sequences.
Intrusion Detection: Finds malicious patterns in network traffic.
### Summary:
The Boyer-Moore algorithm is a high-performance string-matching algorithm that uses heuristics to skip non-matching segments, making it efficient for long strings and complex searches.
