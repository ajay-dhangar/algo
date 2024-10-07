
# Longest Common Subsequence (LCS)

## Understanding LCS

  

A subsequence is a sequence that can be derived from another sequence by deleting some elements without changing the order of the remaining elements. The longest common subsequence (LCS) of two sequences is the longest sequence that is a subsequence of both.

  

## Example:

  

Sequence 1: ABCDE

Sequence 2: ACE

LCS: ACE

Algorithm: Dynamic Programming

 
The dynamic programming approach is a common and efficient method to solve the LCS problem. It involves creating a 2D table (dp) where dp[i][j] represents the length of the LCS of the first i characters in sequence 1 and the first j characters in sequence 2.

  

### Code Implementation (Python):





    def lcs(seq1, seq2):
    
    m = len(seq1)
    
    n = len(seq2)
    
      
    
    dp = [[0] * (n + 1) for _ in range(m + 1)]
    
      
    
    for i in range(1, m + 1):
    
    for j in range(1, n + 1):
    
    if seq1[i - 1] == seq2[j - 1]:
    
    dp[i][j] = dp[i - 1][j - 1] + 1
    
    else:
    
    dp[i][j] = max(dp[i - 1][j], dp[i][j - 1])
    
      
      
    
    return dp[m][n]



  

## Example usage

seq1 = "ABCDE"

seq2 = "ACE"

print(lcs(seq1, seq2)) # Output: 3

Use code with caution.

  

## Code Explanation:

  

### Initialization:

  

Create a 2D table dp of size (m+1) x (n+1), where m and n are the lengths of the sequences.

Initialize the first row and column of dp to 0.

Filling the Table:

  

Iterate over each character in both sequences.

If the current characters in both sequences are the same, the length of the LCS for the current i and j is one more than the length of the LCS for i-1 and j-1.

Otherwise, the length of the LCS for the current i and j is the maximum of the LCS for i-1 and j, and the LCS for i and j-1.

Returning the Result:

  

The final value in the bottom right corner of the dp table represents the length of the LCS.

### Time Complexity: 
O(m * n)

### Space Complexity: 
O(m * n)

  

### Note:

  

To reconstruct the actual LCS, we can backtrack through the dp table, starting from the bottom right corner.

There are other algorithms like the Hirschberg algorithm that can reduce the space complexity to O(min(m, n)).