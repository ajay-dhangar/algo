---
id: Practice-Problems-on-Combinatorics
title: Practice Problems in Combinatorics
sidebar_label: Combinatorics Practice Problems
sidebar_position: 4
description: A comprehensive list of practice problems focused on combinatorics, covering various topics and concepts.
tags: [DSA, algorithms, combinatorics, practice problems]
---

## Practice Problems on Combinatorics

This section provides a list of practice problems focused on combinatorics, covering various concepts and applications. Each problem includes a clear description, example inputs and outputs, and hints or solutions where applicable.

### Easy Problems:

1. **Sum of All Subset XOR Totals**  
   **Description:** Given an array of integers, calculate the sum of the XOR totals of all possible subsets. The XOR of a subset is calculated by taking the XOR of all its elements. For instance, for the array `[1, 2]`, the subsets are `[]`, `[1]`, `[2]`, and `[1, 2]`, with their XOR totals being `0`, `1`, `2`, and `3`, respectively. Your task is to find the total sum of these XOR values.

   - **Example:**  
     Input: `[1, 2, 3]`  
     Output: `6` (Subsets: `[] -> 0`, `[1] -> 1`, `[2] -> 2`, `[3] -> 3`, `[1,2] -> 3`, `[1,3] -> 2`, `[2,3] -> 1`, `[1,2,3] -> 0`)

   - **Hint:** Use recursion or bit manipulation to generate all subsets.

   **Link:** [Sum of All Subset XOR Totals - LeetCode](https://leetcode.com/problems/sum-of-all-subset-xor-totals?envType=problem-list-v2&envId=combinatorics&difficulty=EASY)

2. **Distribute Candies Among Children I**  
   **Description:** You have a certain number of candies to distribute among `k` children in such a way that each child receives at least one candy. The challenge is to maximize the number of children that receive candies while ensuring that no child receives more than one candy. Given `n` candies and `k` children, determine how many children can receive candies.

   - **Example:**  
     Input: `n = 7, k = 4`  
     Output: `4` (Each child can get at least one candy)

   - **Hint:** Use the formula for distribution and check constraints.

   **Link:** [Distribute Candies Among Children I - LeetCode](https://leetcode.com/problems/distribute-candies-among-children-i?envType=problem-list-v2&envId=combinatorics&difficulty=EASY)

---

### Medium Problems:

1. **Unique Paths**  
   **Description:** Given an `m x n` grid, count the number of unique paths from the top-left corner to the bottom-right corner, moving only down or to the right. The challenge is to implement an algorithm that computes this efficiently.

   - **Example:**  
     Input: `m = 3, n = 7`  
     Output: `28` (There are 28 unique paths in a 3x7 grid)

   - **Hint:** Use dynamic programming to store intermediate results.

   **Link:** [Unique Paths - LeetCode](https://leetcode.com/problems/unique-paths?envType=problem-list-v2&envId=combinatorics&difficulty=MEDIUM)

2. **Ugly Number III**  
   **Description:** An ugly number is a positive number whose prime factors only include `2`, `3`, and `5`. Given an integer `n`, your task is to find the `n-th` ugly number.

   - **Example:**  
     Input: `n = 10`  
     Output: `12` (The first 10 ugly numbers are `1, 2, 3, 4, 5, 6, 8, 9, 10, 12`)

   - **Hint:** Consider a min-heap or dynamic programming to generate ugly numbers efficiently.

   **Link:** [Ugly Number III - LeetCode](https://leetcode.com/problems/ugly-number-iii?envType=problem-list-v2&envId=combinatorics&difficulty=MEDIUM)

3. **Number of Sets of K Non-Overlapping Line Segments**  
   **Description:** Given an array of segments defined by their endpoints, count the number of ways to select `k` non-overlapping segments.

   - **Example:**  
     Input: `segments = [[1, 2], [2, 3], [3, 4]], k = 2`  
     Output: `1` (Only one way to select two non-overlapping segments)

   - **Hint:** Use combinatorial counting and dynamic programming.

   **Link:** [Number of Sets of K Non-Overlapping Line Segments - LeetCode](https://leetcode.com/problems/number-of-sets-of-k-non-overlapping-line-segments?envType=problem-list-v2&envId=combinatorics&difficulty=MEDIUM)

4. **Vowels of All Substrings**  
   **Description:** Count the number of vowels in all substrings of a given string. Each vowel contributes to each substring it appears in.

   - **Example:**  
     Input: `s = "abc"`  
     Output: `3` (Vowels: `a` contributes to 1 substring, `b` and `c` contribute to 0)

   - **Hint:** Use a two-pointer technique to count contributions of each vowel.

   **Link:** [Vowels of All Substrings - LeetCode](https://leetcode.com/problems/vowels-of-all-substrings?envType=problem-list-v2&envId=combinatorics&difficulty=MEDIUM)

5. **The Number of Beautiful Subsets**  
   **Description:** Determine the number of beautiful subsets of a given array based on specific conditions that define a beautiful subset.

   - **Example:**  
     Input: `nums = [1, 2, 3], condition = even sum`  
     Output: `4` (The beautiful subsets could be `[]`, `[2]`, `[1, 3]`, and `[1, 2, 3]`)

   - **Hint:** Apply a combinatorial approach to generate subsets and filter based on the condition.

   **Link:** [The Number of Beautiful Subsets - LeetCode](https://leetcode.com/problems/the-number-of-beautiful-subsets?envType=problem-list-v2&envId=combinatorics&difficulty=MEDIUM)

---

### Hard Problems:

1. **Poor Pigs**  
   **Description:** You have a certain number of pigs and buckets. Each bucket may contain either water or poison, and you need to find out which buckets are poisoned using the least number of pigs within a given time limit.

   - **Example:**  
     Input: `pigs = 1, buckets = 1000, minutes = 15, minutesToDie = 15`  
     Output: `1` (One pig is enough to find the poisoned bucket)

   - **Hint:** Use a binary approach to represent the pigs' tests.

   **Link:** [Poor Pigs - LeetCode](https://leetcode.com/problems/poor-pigs?envType=problem-list-v2&envId=combinatorics&difficulty=HARD)

2. **Kth Smallest Instructions**  
   **Description:** Given a number of `k`, your task is to find the `k-th` smallest instruction in a certain set of instructions.

   - **Example:**  
     Input: `n = 3, k = 5`  
     Output: `5` (Find the 5th smallest instruction)

   - **Hint:** Use combinatorial techniques to generate the set of instructions.

   **Link:** [Kth Smallest Instructions - LeetCode](https://leetcode.com/problems/kth-smallest-instructions?envType=problem-list-v2&envId=combinatorics&difficulty=HARD)

3. **Number of Music Playlists**  
   **Description:** Calculate the number of playlists of a given length that can be created under specific conditions, such as the maximum number of unique songs allowed in the playlist.

   - **Example:**  
     Input: `n = 3, l = 3, k = 1`  
     Output: `6` (Six different playlists can be created)

   - **Hint:** Use dynamic programming to keep track of playlists.

   **Link:** [Number of Music Playlists - LeetCode](https://leetcode.com/problems/number-of-music-playlists?envType=problem-list-v2&envId=combinatorics&difficulty=HARD)

4. **Number of Ways to Reorder Array to Get Same BST**  
   **Description:** Given an array, find the number of ways to reorder it to obtain the same binary search tree (BST).

   - **Example:**  
     Input: `arr = [2, 1, 3]`  
     Output: `1` (Only one way to order the array for the same BST structure)

   - **Hint:** Use combinatorial counting based on the properties of BST.

   **Link:** [Number of Ways to Reorder Array to Get Same BST - LeetCode](https://leetcode.com/problems/number-of-ways-to-reorder-array-to-get-same-bst?envType=problem-list-v2&envId=combinatorics&difficulty=HARD)

5. **Count the Number of Ideal Arrays**  
   **Description:** Count the number of ideal arrays based on certain properties defined in the problem.

   - **Example:**  
     Input: `n = 5, maxValue = 2`  
     Output: `7` (Count ideal arrays of length 5 with values not exceeding 2)

   - **Hint:** Use combinatorial counting and generating functions.

   **Link:** [Count the Number of Ideal Arrays - LeetCode](https://leetcode.com/problems/count-the-number-of-ideal-arrays?envType=problem-list-v2&envId=combinatorics&difficulty=HARD)

---

## Conclusion

These problems are designed to strengthen your understanding of combinatorial mathematics. Make sure to attempt each problem and utilize the hints provided to assist your learning. Solutions may be found online for additional support.
