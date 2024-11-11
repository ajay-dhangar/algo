---

id: manachers-algorithm
sidebar_position: 15
title: Manacher's Algorithm
sidebar_label: Manacher's Algorithm

---

### Definition:

Manacher's Algorithm is a linear-time algorithm developed by Glenn K. Manacher in 1975 for finding all palindromic substrings in a string. It efficiently solves the problem by utilizing previously computed palindrome lengths and symmetry properties, avoiding redundant comparisons through the use of an auxiliary array.

### Characteristics:

- **Linear Time Processing**:
  - Finds all palindromes in O(n) time
  - Avoids redundant comparisons
  - Utilizes symmetry properties

- **LPS Array**:
  - Stores palindrome lengths
  - Enables efficient lookups
  - Maintains symmetry information

- **String Transformation**:
  - Handles both odd and even length palindromes
  - Special character insertion
  - Unified palindrome detection

- **Center Expansion**:
  - Expands around centers
  - Uses previous computations
  - Optimizes palindrome detection

### Time Complexity:

- **Overall: $O(n)$**
  - Linear time processing
  - No preprocessing required
  - Optimal complexity

### Space Complexity:

- **Space Usage: $O(n)$**
  - LPS array storage
  - Transformed string storage
  - Auxiliary space for processing

### C++ Implementation:

```cpp
#include <iostream>
#include <vector>
#include <string>
using namespace std;

class ManachersAlgorithm {
private:
    // Transform string to handle both odd and even length palindromes
    string transformString(const string& s) {
        string transformed = "#";
        for (char c : s) {
            transformed += c;
            transformed += "#";
        }
        return transformed;
    }

public:
    // Find all palindromic substrings and their lengths
    vector<int> findPalindromes(const string& s) {
        string t = transformString(s);
        int n = t.length();
        vector<int> lps(n, 0);  // LPS array for palindrome lengths
        
        int center = 0;    // Current center of palindrome
        int right = 0;     // Right boundary of current palindrome
        
        // Process all characters as potential centers
        for (int i = 0; i < n; i++) {
            // Initialize palindrome length at current position
            if (i < right) {
                int mirror = 2 * center - i;
                lps[i] = min(right - i, lps[mirror]);
            }
            
            // Expand around current position
            int a = i + (1 + lps[i]);
            int b = i - (1 + lps[i]);
            while (b >= 0 && a < n && t[a] == t[b]) {
                lps[i]++;
                a++;
                b--;
            }
            
            // Update center and right boundary if needed
            if (i + lps[i] > right) {
                center = i;
                right = i + lps[i];
            }
        }
        
        return lps;
    }
    
    // Get all palindromic substrings
    vector<string> getAllPalindromes(const string& s) {
        vector<string> palindromes;
        string t = transformString(s);
        vector<int> lps = findPalindromes(s);
        
        for (int i = 0; i < t.length(); i++) {
            int len = lps[i];
            if (len > 0) {
                string palindrome;
                for (int j = i - len; j <= i + len; j++) {
                    if (t[j] != '#') {
                        palindrome += t[j];
                    }
                }
                if (!palindrome.empty()) {
                    palindromes.push_back(palindrome);
                }
            }
        }
        
        return palindromes;
    }
    
    // Get longest palindromic substring
    string getLongestPalindrome(const string& s) {
        string t = transformString(s);
        vector<int> lps = findPalindromes(s);
        
        int maxLen = 0;
        int centerIndex = 0;
        
        for (int i = 0; i < t.length(); i++) {
            if (lps[i] > maxLen) {
                maxLen = lps[i];
                centerIndex = i;
            }
        }
        
        string longestPalindrome;
        for (int i = centerIndex - maxLen; i <= centerIndex + maxLen; i++) {
            if (t[i] != '#') {
                longestPalindrome += t[i];
            }
        }
        
        return longestPalindrome;
    }
};

// Demonstration class
class ManachersDemo {
public:
    static void demonstrateAlgorithm() {
        ManachersAlgorithm algo;
        string text = "babadada";
        
        cout << "Text: " << text << endl;
        
        // Find longest palindrome
        string longest = algo.getLongestPalindrome(text);
        cout << "Longest palindrome: " << longest << endl;
        
        // Find all palindromes
        vector<string> allPalindromes = algo.getAllPalindromes(text);
        cout << "\nAll palindromic substrings:" << endl;
        for (const string& palindrome : allPalindromes) {
            if (palindrome.length() > 1) {  // Skip single-character palindromes
                cout << palindrome << endl;
            }
        }
        
        // Show palindrome lengths
        vector<int> lps = algo.findPalindromes(text);
        cout << "\nPalindrome lengths at each center:" << endl;
        string transformed = "#" + string(text.begin(), text.end()) + "#";
        for (int i = 0; i < transformed.length(); i++) {
            cout << transformed[i] << ": " << lps[i] << endl;
        }
    }
};

int main() {
    ManachersDemo::demonstrateAlgorithm();
    return 0;
}
```

### Key Features:

1. **Linear Time Processing**:
   - Efficient palindrome detection
   - No backtracking required
   - Optimal time complexity

2. **Symmetry Exploitation**:
   - Mirror property usage
   - Center-based expansion
   - Boundary tracking

3. **Optimization Techniques**:
   - Unified even/odd handling
   - Efficient boundary checking
   - Minimal comparisons

### Applications:

1. **Text Processing**:
   - Palindrome detection
   - String analysis
   - Pattern recognition

2. **Bioinformatics**:
   - DNA palindrome finding
   - Sequence analysis
   - Structural patterns

3. **Data Compression**:
   - Pattern identification
   - Redundancy detection
   - Compression optimization

4. **String Analysis**:
   - Text mining
   - Pattern searching
   - String manipulation

### Advanced Features:

1. **Algorithm Variants**:
   - Streaming version
   - Space-optimized version
   - Multiple string processing

2. **Implementation Optimizations**:
   - Cache-efficient versions
   - Memory-efficient variants
   - Parallel implementations

### Comparison with Other Algorithms:

1. **Advantages**:
   - Linear time complexity
   - Handles all palindromes
   - No preprocessing needed

2. **Trade-offs**:
   - Space requirement
   - Implementation complexity
   - String transformation overhead

### Performance Characteristics:

1. **Best Case**:
   - O(n) operations
   - Linear scanning
   - Optimal performance

2. **Average Case**:
   - O(n) operations
   - Consistent performance
   - Predictable behavior

3. **Worst Case**:
   - O(n) operations
   - Guaranteed performance
   - No degradation

### Summary:

Manacher's Algorithm represents a significant breakthrough in palindrome detection by providing a linear-time solution to find all palindromic substrings in a string. Its innovative approach of using symmetry properties and previously computed results eliminates redundant comparisons, making it highly efficient.

The algorithm's strength lies in its ability to handle both odd and even length palindromes uniformly through string transformation, while maintaining linear time complexity. The use of the LPS array and center expansion technique allows for optimal palindrome detection without backtracking.

The implementation provides a comprehensive solution for palindrome-related problems, offering functions to find the longest palindromic substring, all palindromic substrings, and palindrome lengths at each position. Its guaranteed linear-time performance and ability to find all palindromes make it an essential tool in string processing applications where palindrome detection is required.

The algorithm's practical applications extend beyond simple palindrome detection to areas such as bioinformatics, data compression, and pattern recognition, where its efficient processing of palindromic structures provides valuable insights into string patterns and symmetries.