---

id: knuth-morris-pratt-algorithm
sidebar_position: 11
title: Knuth-Morris-Pratt Algorithm
sidebar_label: Knuth-Morris-Pratt Algorithm

---

### Definition:

The Knuth-Morris-Pratt (KMP) Algorithm is a string matching algorithm developed by Donald Knuth, James H. Morris, and Vaughan Pratt. It improves upon naive string matching by utilizing information about previous character matches to avoid unnecessary comparisons, making it particularly efficient for patterns containing repeating subsequences.

### Example with Explanation

Consider a scenario where we have the following:

- **Text**: `ABABDABACDABABCABAB`
- **Pattern**: `ABABCABAB`

The goal of the KMP algorithm is to efficiently find all occurrences of the pattern in the text by using a precomputed "failure function."

## 1. Failure Function (Partial Match Table)

For the given pattern, the KMP algorithm builds a failure function (also called the partial match table) to help track the longest prefix that is also a suffix up to each position in the pattern. The failure function for the pattern `ABABCABAB` is constructed as follows:

1. **Initialization**:
   - We start by setting `π[1] = 0` for the first character in the pattern, as it has no proper prefix or suffix.
   - The table at this stage:

     ```
     | Sequence Position (i)   | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 |
     |-------------------------|---|---|---|---|---|---|---|---|---|
     | Pattern (P[i])          | A | B | A | B | C | A | B | A | B |
     | Failure Function (π[i]) | 0 |   |   |   |   |   |   |   |   |
     ```

2. **Step-by-Step Table Construction**:

   - **At i = 2** (Substring `AB`):
     - The prefix `A` and suffix `B` are different, so there is no prefix that is also a suffix.
     - We set `π[2] = 0`.
     - Updated table:

       ```
       | Sequence Position (i)   | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 |
       |-------------------------|---|---|---|---|---|---|---|---|---|
       | Pattern (P[i])          | A | B | A | B | C | A | B | A | B |
       | Failure Function (π[i]) | 0 | 0 |   |   |   |   |   |   |   |
       ```

   - **At i = 3** (Substring `ABA`):
     - The longest prefix which is also a suffix is `A` (length 1).
     - We set `π[3] = 1`.
     - Updated table:

       ```
       | Sequence Position (i)   | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 |
       |-------------------------|---|---|---|---|---|---|---|---|---|
       | Pattern (P[i])          | A | B | A | B | C | A | B | A | B |
       | Failure Function (π[i]) | 0 | 0 | 1 |   |   |   |   |   |   |
       ```

   - **At i = 4** (Substring `ABAB`):
     - The longest prefix which is also a suffix is `AB` (length 2).
     - We set `π[4] = 2`.
     - Updated table:

       ```
       | Sequence Position (i)   | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 |
       |-------------------------|---|---|---|---|---|---|---|---|---|
       | Pattern (P[i])          | A | B | A | B | C | A | B | A | B |
       | Failure Function (π[i]) | 0 | 0 | 1 | 2 |   |   |   |   |   |
       ```

   - **At i = 5** (Substring `ABABC`):
     - There is no prefix that is also a suffix here.
     - We set `π[5] = 0`.
     - Updated table:

       ```
       | Sequence Position (i)   | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 |
       |-------------------------|---|---|---|---|---|---|---|---|---|
       | Pattern (P[i])          | A | B | A | B | C | A | B | A | B |
       | Failure Function (π[i]) | 0 | 0 | 1 | 2 | 0 |   |   |   |   |
       ```

   - **At i = 6** (Substring `ABABCA`):
     - The longest prefix-suffix match is `A` (length 1).
     - We set `π[6] = 1`.
     - Updated table:

       ```
       | Sequence Position (i)   | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 |
       |-------------------------|---|---|---|---|---|---|---|---|---|
       | Pattern (P[i])          | A | B | A | B | C | A | B | A | B |
       | Failure Function (π[i]) | 0 | 0 | 1 | 2 | 0 | 1 |   |   |   |
       ```

   - **At i = 7** (Substring `ABABCAB`):
     - The longest prefix-suffix match is `AB` (length 2).
     - We set `π[7] = 2`.
     - Updated table:

       ```
       | Sequence Position (i)   | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 |
       |-------------------------|---|---|---|---|---|---|---|---|---|
       | Pattern (P[i])          | A | B | A | B | C | A | B | A | B |
       | Failure Function (π[i]) | 0 | 0 | 1 | 2 | 0 | 1 | 2 |   |   |
       ```

   - **At i = 8** (Substring `ABABCABA`):
     - The longest prefix-suffix match is `ABA` (length 3).
     - We set `π[8] = 3`.
     - Updated table:

       ```
       | Sequence Position (i)   | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 |
       |-------------------------|---|---|---|---|---|---|---|---|---|
       | Pattern (P[i])          | A | B | A | B | C | A | B | A | B |
       | Failure Function (π[i]) | 0 | 0 | 1 | 2 | 0 | 1 | 2 | 3 |   |
       ```

   - **At i = 9** (Substring `ABABCABAB`):
     - The longest prefix-suffix match is `ABAB` (length 4).
     - We set `π[9] = 4`.
     - Final table:

       ```
       | Sequence Position (i)   | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 |
       |-------------------------|---|---|---|---|---|---|---|---|---|
       | Pattern (P[i])          | A | B | A | B | C | A | B | A | B |
       | Failure Function (π[i]) | 0 | 0 | 1 | 2 | 0 | 1 | 2 | 3 | 4 |
       ```

This failure function table helps optimize the KMP pattern matching process by indicating how much the pattern should shift on a mismatch, ensuring no redundant comparisons are made.

### 2. Matching Phase

The KMP algorithm scans the text from left to right while comparing the pattern to each substring in the text. When a mismatch occurs, the algorithm uses the failure function to shift the pattern appropriately, ensuring that already-matched characters do not need to be rechecked.

#### Step-by-Step Matching for `ABABCABAB` in `ABABDABACDABABCABAB`:

1. **Initialize**:
   - Text (T) = `ABABDABACDABABCABAB`
   - Pattern (P) = `ABABCABAB`
   - Start at the first character of the text and pattern.

2. **Match Characters**:
   - **T[0] to T[4]** (Text substring `ABABD`) matches **P[0] to P[4]**. A mismatch occurs at **T[4] (D)** and **P[4] (C)**.

3. **Use Failure Function**:
   - At mismatch, 4 characters have matched (`k = 4`).
   - Use the formula: `shift = k - π[k]`, where π[4] = 2.
   - **Shift**: `shift = 4 - 2 = 2`. Move the pattern 2 characters to the right.

4. **Continue Matching**:
   - Resume comparison with **T[2] to T[7]** and **P[0] to P[5]**. Another mismatch occurs at **T[7] (C)** and **P[5] (A)**.
   - With **k = 3** matched characters, **π[3] = 1**.
   - **Shift**: `shift = 3 - 1 = 2`. Move the pattern 2 characters right.

5. **Repeat Process**:
   - Continue aligning and comparing until **T[10] to T[18]** perfectly matches **P[0] to P[8]**.
   - Pattern `ABABCABAB` is found at **position 10** in the text.

6. **Result**:
   - Pattern `ABABCABAB` occurs at index 10 in the text.

By using the failure function for shifts, KMP avoids redundant comparisons, resulting in a linear time complexity for the matching phase.


### Characteristics:

- **Failure Function**:
  - Computes partial match table (also called failure function)
  - Tracks longest proper prefixes that are also suffixes
  - Enables efficient backtracking

- **Linear Time Matching**:
  - Never backtracks in the main text
  - Utilizes preprocessed information
  - Maintains constant space complexity

- **Preprocessing Phase**:
  - Builds failure function array
  - Analyzes pattern structure
  - Enables optimal shifts during search

- **Left-to-Right Scanning**:
  - Scans both pattern and text left to right
  - Uses failure function for mismatches
  - Maintains linear time complexity

### Time Complexity:

- **Preprocessing: $O(m)$**
  - Where m is pattern length
  - Constructs failure function
  - One-time computation

- **Searching: $O(n)$**
  - Where n is text length
  - Linear time guaranteed
  - No backtracking in text

### Space Complexity:

- **Space Usage: $O(m)$**
  - Failure function array
  - No additional dynamic space
  - Independent of text length

### C++ Implementation:

```cpp
#include <iostream>
#include <vector>
#include <string>
using namespace std;

class KMPAlgorithm {
private:
    // Compute the failure function
    vector<int> computeLPSArray(const string& pattern) {
        int m = pattern.length();
        vector<int> lps(m, 0);
        
        int len = 0;  // length of previous longest prefix suffix
        int i = 1;
        
        while (i < m) {
            if (pattern[i] == pattern[len]) {
                len++;
                lps[i] = len;
                i++;
            } else {
                if (len != 0) {
                    len = lps[len - 1];
                } else {
                    lps[i] = 0;
                    i++;
                }
            }
        }
        
        return lps;
    }

public:
    vector<int> search(const string& text, const string& pattern) {
        vector<int> matches;
        int n = text.length();
        int m = pattern.length();
        
        if (m == 0 || m > n) return matches;
        
        // Preprocessing: compute failure function
        vector<int> lps = computeLPSArray(pattern);
        
        // Searching phase
        int i = 0;  // index for text
        int j = 0;  // index for pattern
        
        while (i < n) {
            if (pattern[j] == text[i]) {
                i++;
                j++;
            }
            
            if (j == m) {
                // Pattern found
                matches.push_back(i - j);
                j = lps[j - 1];
            } else if (i < n && pattern[j] != text[i]) {
                if (j != 0) {
                    j = lps[j - 1];
                } else {
                    i++;
                }
            }
        }
        
        return matches;
    }
};

// Demonstration class
class KMPDemo {
public:
    static void demonstrateSearch() {
        KMPAlgorithm algo;
        string text = "ABABDABACDABABCABAB";
        string pattern = "ABABCABAB";
        
        cout << "Text: " << text << endl;
        cout << "Pattern: " << pattern << endl;
        
        vector<int> matches = algo.search(text, pattern);
        
        cout << "Pattern found at positions: ";
        for (int pos : matches) {
            cout << pos << " ";
        }
        cout << endl;
    }
};

int main() {
    KMPDemo::demonstrateSearch();
    return 0;
}
```

### Key Features:

1. **Failure Function**:
   - Efficient prefix-suffix matching
   - Optimal shift calculation
   - Pattern preprocessing

2. **Linear Time Guarantee**:
   - No backtracking in text
   - Optimal worst-case complexity
   - Efficient pattern matching

3. **Optimization Techniques**:
   - Preprocessed pattern analysis
   - Efficient state transitions
   - Minimal character comparisons

### Applications:

1. **Text Processing**:
   - Text editors
   - File searching
   - Document analysis

2. **Bioinformatics**:
   - DNA sequence matching
   - Protein pattern analysis
   - Genome sequencing

3. **Network Security**:
   - Packet inspection
   - Signature detection
   - Data filtering

4. **Information Retrieval**:
   - Pattern matching
   - Text mining
   - Content searching

### Advanced Features:

1. **Algorithm Variants**:
   - Multiple pattern matching
   - Circular string matching
   - Approximate matching

2. **Implementation Optimizations**:
   - Cache-friendly versions
   - Parallel implementations
   - Memory-efficient variants

### Comparison with Other Algorithms:

1. **Advantages**:
   - Linear time guarantee
   - No text backtracking
   - Efficient for repetitive patterns

2. **Trade-offs**:
   - Preprocessing overhead
   - Additional space requirement
   - Complex implementation

### Performance Characteristics:

1. **Best Case**:
   - O(n) comparisons
   - Linear scanning
   - Immediate mismatches

2. **Average Case**:
   - O(n) performance
   - Consistent behavior
   - Pattern-independent

3. **Worst Case**:
   - O(n) guaranteed
   - No performance degradation
   - Stable behavior

### Summary:

The Knuth-Morris-Pratt Algorithm represents a significant advancement in string matching algorithms by introducing the concept of the failure function. This innovation allows the algorithm to avoid unnecessary comparisons by utilizing information about previous matches, resulting in a guaranteed linear-time performance.

The algorithm's efficiency comes from its ability to preprocess the pattern and build a failure function that enables optimal shifts during the matching phase. While it requires additional space for preprocessing, the KMP algorithm's guarantee of linear-time performance and its ability to handle repetitive patterns make it a valuable tool in various applications, from text processing to bioinformatics.

The implementation combines elegant theoretical concepts with practical efficiency, making it a fundamental algorithm in computer science. Its consistent performance characteristics and lack of text backtracking make it particularly suitable for real-time applications and streaming data processing.