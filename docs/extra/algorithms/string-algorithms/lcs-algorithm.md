---

id: longest-common-subsequence-algorithm
sidebar_position: 16
title: Longest Common Subsequence (LCS) Algorithm
sidebar_label: LCS Algorithm

---

### Definition:

The Longest Common Subsequence (LCS) Algorithm finds the longest subsequence that is present in two sequences in the same relative order. A subsequence is a sequence that can be derived from another sequence by deleting some or no elements without changing the order of the remaining elements. Unlike substrings, subsequences need not be contiguous.

### Characteristics:

- **Dynamic Programming**:
  - Builds solution table
  - Uses optimal substructure
  - Memoizes intermediate results

- **Backtracking**:
  - Reconstructs actual subsequence
  - Traces optimal path
  - Maintains solution history

- **Multiple Solutions**:
  - Handles multiple sequences
  - Finds all possible LCS
  - Supports various lengths

- **Optimal Substructure**:
  - Breaks into subproblems
  - Combines local solutions
  - Ensures global optimality

### Time Complexity:

- **Basic Version: $O(m \times n)$**
  - Where m, n are sequence lengths
  - Uses 2D dynamic programming
  - Includes backtracking

- **Space-Optimized: $O(min(m,n))$**
  - Reduces memory usage
  - Maintains only necessary rows
  - Optional backtracking support

### Space Complexity:

- **Basic Version: $O(m \times n)$**
  - Dynamic programming table
  - Backtracking information
  - Solution storage

### C++ Implementation:

```cpp
#include <iostream>
#include <vector>
#include <string>
#include <algorithm>
using namespace std;

class LCSAlgorithm {
private:
    // Structure to store cell information for backtracking
    struct Cell {
        int length;
        bool isMatch;
        Cell(int l = 0, bool m = false) : length(l), isMatch(m) {}
    };
    
    // Build the LCS table using dynamic programming
    vector<vector<Cell>> buildLCSTable(const string& str1, 
                                     const string& str2) {
        int m = str1.length();
        int n = str2.length();
        vector<vector<Cell>> dp(m + 1, vector<Cell>(n + 1));
        
        for (int i = 1; i <= m; i++) {
            for (int j = 1; j <= n; j++) {
                if (str1[i-1] == str2[j-1]) {
                    dp[i][j].length = dp[i-1][j-1].length + 1;
                    dp[i][j].isMatch = true;
                } else {
                    dp[i][j].length = max(dp[i-1][j].length, 
                                        dp[i][j-1].length);
                }
            }
        }
        
        return dp;
    }
    
    // Reconstruct the LCS from the dp table
    string backtrack(const vector<vector<Cell>>& dp, 
                    const string& str1, const string& str2) {
        string lcs;
        int i = str1.length();
        int j = str2.length();
        
        while (i > 0 && j > 0) {
            if (dp[i][j].isMatch) {
                lcs = str1[i-1] + lcs;
                i--; j--;
            } else if (dp[i-1][j].length > dp[i][j-1].length) {
                i--;
            } else {
                j--;
            }
        }
        
        return lcs;
    }

public:
    // Find the longest common subsequence
    string findLCS(const string& str1, const string& str2) {
        if (str1.empty() || str2.empty()) return "";
        
        vector<vector<Cell>> dp = buildLCSTable(str1, str2);
        return backtrack(dp, str1, str2);
    }
    
    // Get the length of LCS
    int getLCSLength(const string& str1, const string& str2) {
        if (str1.empty() || str2.empty()) return 0;
        
        vector<vector<Cell>> dp = buildLCSTable(str1, str2);
        return dp[str1.length()][str2.length()].length;
    }
    
    // Space-optimized LCS length calculation
    int getLCSLengthOptimized(const string& str1, const string& str2) {
        if (str1.empty() || str2.empty()) return 0;
        
        int m = str1.length();
        int n = str2.length();
        vector<int> prev(n + 1, 0);
        vector<int> curr(n + 1, 0);
        
        for (int i = 1; i <= m; i++) {
            for (int j = 1; j <= n; j++) {
                if (str1[i-1] == str2[j-1]) {
                    curr[j] = prev[j-1] + 1;
                } else {
                    curr[j] = max(prev[j], curr[j-1]);
                }
            }
            prev = curr;
        }
        
        return curr[n];
    }
    
    // Find all longest common subsequences
    vector<string> findAllLCS(const string& str1, const string& str2) {
        vector<string> result;
        if (str1.empty() || str2.empty()) return result;
        
        vector<vector<Cell>> dp = buildLCSTable(str1, str2);
        backtrackAll(dp, str1, str2, str1.length(), str2.length(), 
                    "", result);
        
        return result;
    }
    
private:
    // Recursive backtracking to find all LCS
    void backtrackAll(const vector<vector<Cell>>& dp, 
                     const string& str1, const string& str2,
                     int i, int j, string current, 
                     vector<string>& result) {
        if (i == 0 || j == 0) {
            if (!current.empty()) {
                reverse(current.begin(), current.end());
                result.push_back(current);
            }
            return;
        }
        
        if (dp[i][j].isMatch) {
            backtrackAll(dp, str1, str2, i-1, j-1, 
                        current + str1[i-1], result);
        } else {
            if (i > 0 && dp[i-1][j].length == dp[i][j].length) {
                backtrackAll(dp, str1, str2, i-1, j, current, result);
            }
            if (j > 0 && dp[i][j-1].length == dp[i][j].length) {
                backtrackAll(dp, str1, str2, i, j-1, current, result);
            }
        }
    }
};

// Demonstration class
class LCSDemo {
public:
    static void demonstrateAlgorithm() {
        LCSAlgorithm algo;
        string str1 = "ABCDGH";
        string str2 = "AEDFHR";
        
        cout << "String 1: " << str1 << endl;
        cout << "String 2: " << str2 << endl;
        
        // Find LCS
        string lcs = algo.findLCS(str1, str2);
        cout << "Longest Common Subsequence: " << lcs << endl;
        
        // Get length
        int length = algo.getLCSLength(str1, str2);
        cout << "LCS Length: " << length << endl;
        
        // Space-optimized length calculation
        int optLength = algo.getLCSLengthOptimized(str1, str2);
        cout << "LCS Length (Optimized): " << optLength << endl;
        
        // Find all LCS
        vector<string> allLCS = algo.findAllLCS(str1, str2);
        cout << "\nAll Longest Common Subsequences:" << endl;
        for (const string& s : allLCS) {
            cout << s << endl;
        }
        
        // Demonstrate with different strings
        str1 = "AGGTAB";
        str2 = "GXTXAYB";
        cout << "\nString 1: " << str1 << endl;
        cout << "String 2: " << str2 << endl;
        lcs = algo.findLCS(str1, str2);
        cout << "Longest Common Subsequence: " << lcs << endl;
    }
};

int main() {
    LCSDemo::demonstrateAlgorithm();
    return 0;
}
```

### Key Features:

1. **Dynamic Programming Solution**:
   - Bottom-up approach
   - Optimal substructure
   - Memoization

2. **Multiple Implementation Options**:
   - Basic implementation
   - Space-optimized version
   - All-solutions variant

3. **Optimization Techniques**:
   - Memory efficiency
   - Backtracking optimization
   - Space-time trade-offs

### Applications:

1. **Bioinformatics**:
   - DNA sequence alignment
   - Protein sequence comparison
   - Evolutionary distance

2. **Text Processing**:
   - Diff utilities
   - Version control
   - File comparison

3. **Natural Language Processing**:
   - Text similarity
   - Plagiarism detection
   - Document comparison

4. **Data Analysis**:
   - Pattern matching
   - Sequence alignment
   - Similarity metrics

### Advanced Features:

1. **Algorithm Variants**:
   - Space-optimized version
   - All-solutions finding
   - Multiple sequence LCS

2. **Implementation Optimizations**:
   - Memory-efficient versions
   - Parallel implementations
   - Hirschberg's algorithm

### Comparison with Other Algorithms:

1. **Advantages**:
   - Optimal solution guaranteed
   - Handles non-contiguous matches
   - Versatile applications

2. **Trade-offs**:
   - Memory requirements
   - Computational complexity
   - Backtracking overhead

### Performance Characteristics:

1. **Best Case**:
   - O(mn) operations
   - Full table required
   - Complete solution

2. **Average Case**:
   - O(mn) operations
   - Consistent performance
   - Predictable behavior

3. **Worst Case**:
   - O(mn) operations
   - Space complexity trade-offs
   - Backtracking considerations

### Summary:

The Longest Common Subsequence Algorithm represents a fundamental solution in sequence analysis and comparison. Its dynamic programming approach efficiently solves the problem of finding the longest shared subsequence between two sequences, with applications ranging from bioinformatics to text processing.

The algorithm's strength lies in its ability to handle non-contiguous matches while maintaining optimal solution guarantees. The implementation provides multiple approaches, from basic dynamic programming to space-optimized versions and variants that can find all possible solutions.

The practical applications of LCS extend beyond simple sequence matching to areas such as version control systems, DNA sequence analysis, and plagiarism detection. Its versatility and reliability make it a crucial tool in various fields where sequence comparison and analysis are essential.

The ability to handle different requirements through various implementation options (basic, space-optimized, all-solutions) makes it adaptable to different use cases while maintaining its fundamental efficiency in finding the longest common subsequence between strings.