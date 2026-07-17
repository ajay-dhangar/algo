export type Difficulty = "Easy" | "Medium" | "Hard";

export interface TestCase {
  input: string;
  expected: string;
  description: string;
}

export interface DPChallenge {
  id: string;
  title: string;
  slug: string;
  difficulty: Difficulty;
  category: "DP";
  timeLimit: string;
  description: string;
  examples: { input: string; output: string; explanation: string }[];
  constraints: string[];
  starterCode: string;
  starterCodes?: Record<string, string>;
  testCases: TestCase[];
  timeComplexity: string;
  spaceComplexity: string;
  hint: string;
  solution: string;
}

export const DP_CHALLENGES: DPChallenge[] = [
  // ─── BEGINNER (EASY) ────────────────────────────────────────────────────────
  {
    id: "dp-01",
    title: "Fibonacci Number",
    slug: "fibonacci-number",
    difficulty: "Easy",
    category: "DP",
    timeLimit: "10 min",
    description: "Given n, calculate the n-th Fibonacci number. The Fibonacci sequence is defined as F(0) = 0, F(1) = 1, and F(n) = F(n-1) + F(n-2) for n > 1.",
    examples: [
      { input: "n = 2", output: "1", explanation: "F(2) = F(1) + F(0) = 1 + 0 = 1." },
      { input: "n = 4", output: "3", explanation: "F(4) = F(3) + F(2) = 2 + 1 = 3." }
    ],
    constraints: ["0 <= n <= 30"],
    starterCode: `/**
 * @param {number} n
 * @return {number}
 */
function fib(n) {
  // Your code here
}

console.log(fib(4)); // Expected: 3
`,
    starterCodes: {
      python: `def fib(n):
    # Your code here
    pass
`,
      cpp: `#include <vector>
using namespace std;

int fib(int n) {
    // Your code here
    return 0;
}
`
    },
    testCases: [
      { input: "0", expected: "0", description: "Base case F(0)" },
      { input: "1", expected: "1", description: "Base case F(1)" },
      { input: "2", expected: "1", description: "F(2)" },
      { input: "4", expected: "3", description: "F(4)" },
      { input: "10", expected: "55", description: "F(10)" }
    ],
    timeComplexity: "O(n) — linear scan.",
    spaceComplexity: "O(1) — constant storage space.",
    hint: "Use an array to store computed states (tabulation) or keep track of the last two states to optimize space.",
    solution: `function fib(n) {
  if (n <= 1) return n;
  let prev2 = 0, prev1 = 1;
  for (let i = 2; i <= n; i++) {
    let curr = prev1 + prev2;
    prev2 = prev1;
    prev1 = curr;
  }
  return prev1;
}`
  },
  {
    id: "dp-02",
    title: "Climbing Stairs",
    slug: "climbing-stairs",
    difficulty: "Easy",
    category: "DP",
    timeLimit: "15 min",
    description: "You are climbing a staircase. It takes n steps to reach the top. Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?",
    examples: [
      { input: "n = 2", output: "2", explanation: "There are two ways: 1 step + 1 step, or 2 steps." },
      { input: "n = 3", output: "3", explanation: "Three ways: 1+1+1, 1+2, or 2+1." }
    ],
    constraints: ["1 <= n <= 45"],
    starterCode: `/**
 * @param {number} n
 * @return {number}
 */
function climbStairs(n) {
  // Your code here
}

console.log(climbStairs(3)); // Expected: 3
`,
    testCases: [
      { input: "1", expected: "1", description: "One stair" },
      { input: "2", expected: "2", description: "Two stairs" },
      { input: "3", expected: "3", description: "Three stairs" },
      { input: "5", expected: "8", description: "Five stairs" },
      { input: "10", expected: "89", description: "Ten stairs" }
    ],
    timeComplexity: "O(n) — one pass to calculate states.",
    spaceComplexity: "O(1) — constant storage space using two variables.",
    hint: "To reach the n-th step, you can only climb from step n-1 or step n-2. Thus, ways(n) = ways(n-1) + ways(n-2).",
    solution: `function climbStairs(n) {
  if (n <= 2) return n;
  let first = 1, second = 2;
  for (let i = 3; i <= n; i++) {
    let third = first + second;
    first = second;
    second = third;
  }
  return second;
}`
  },
  {
    id: "dp-03",
    title: "Min Cost Climbing Stairs",
    slug: "min-cost-climbing-stairs",
    difficulty: "Easy",
    category: "DP",
    timeLimit: "15 min",
    description: "You are given an integer array cost where cost[i] is the cost of i-th step on a staircase. Once you pay the cost, you can climb one or two steps. You can start from index 0 or 1. Return the minimum cost to reach the top.",
    examples: [
      { input: "cost = [10, 15, 20]", output: "15", explanation: "Start at index 1, pay 15, and climb two steps to reach the top." },
      { input: "cost = [1, 100, 1, 1, 1, 100, 1, 1, 100, 1]", output: "6", explanation: "Take the path: 0 -> 2 -> 4 -> 6 -> 7 -> 9 for total cost 6." }
    ],
    constraints: ["2 <= cost.length <= 1000", "0 <= cost[i] <= 999"],
    starterCode: `/**
 * @param {number[]} cost
 * @return {number}
 */
function minCostClimbingStairs(cost) {
  // Your code here
}

console.log(minCostClimbingStairs([10, 15, 20])); // Expected: 15
`,
    testCases: [
      { input: "[10, 15, 20]", expected: "15", description: "Simple 3-stair case" },
      { input: "[1, 100, 1, 1, 1, 100, 1, 1, 100, 1]", expected: "6", description: "Alternating small/large costs" }
    ],
    timeComplexity: "O(n) — single pass over the cost array.",
    spaceComplexity: "O(1) — optimized space using two variable trackers.",
    hint: "The recurrence is dp[i] = cost[i] + min(dp[i-1], dp[i-2]). Return min(dp[n-1], dp[n-2]).",
    solution: `function minCostClimbingStairs(cost) {
  let n = cost.length;
  let prev2 = cost[0];
  let prev1 = cost[1];
  for (let i = 2; i < n; i++) {
    let curr = cost[i] + Math.min(prev1, prev2);
    prev2 = prev1;
    prev1 = curr;
  }
  return Math.min(prev1, prev2);
}`
  },
  {
    id: "dp-04",
    title: "House Robber",
    slug: "house-robber",
    difficulty: "Easy",
    category: "DP",
    timeLimit: "20 min",
    description: "You are a professional robber planning to rob houses along a street. Each house has a stashed amount of money. Return the maximum money you can rob tonight without alerting the police (cannot rob adjacent houses).",
    examples: [
      { input: "nums = [1,2,3,1]", output: "4", explanation: "Rob house 1 (money = 1) and house 3 (money = 3). Total = 4." },
      { input: "nums = [2,7,9,3,1]", output: "12", explanation: "Rob house 1 (money = 2), house 3 (money = 9), and house 5 (money = 1). Total = 12." }
    ],
    constraints: ["1 <= nums.length <= 100", "0 <= nums[i] <= 400"],
    starterCode: `/**
 * @param {number[]} nums
 * @return {number}
 */
function rob(nums) {
  // Your code here
}

console.log(rob([1, 2, 3, 1])); // Expected: 4
`,
    testCases: [
      { input: "[1,2,3,1]", expected: "4", description: "Standard array" },
      { input: "[2,7,9,3,1]", expected: "12", description: "Longer array" },
      { input: "[0]", expected: "0", description: "No money in single house" },
      { input: "[2,1,1,2]", expected: "4", description: "Rob outer houses" }
    ],
    timeComplexity: "O(n) — single pass to find max money.",
    spaceComplexity: "O(1) — constant storage space.",
    hint: "For each house, choose between robbing it (current + money from 2 houses ago) or skipping it (money from 1 house ago).",
    solution: `function rob(nums) {
  if (nums.length === 0) return 0;
  if (nums.length === 1) return nums[0];
  let prev2 = 0, prev1 = nums[0];
  for (let i = 1; i < nums.length; i++) {
    let curr = Math.max(prev1, prev2 + nums[i]);
    prev2 = prev1;
    prev1 = curr;
  }
  return prev1;
}`
  },
  {
    id: "dp-05",
    title: "Coin Change (Minimum Coins)",
    slug: "coin-change",
    difficulty: "Easy",
    category: "DP",
    timeLimit: "25 min",
    description: "You are given an integer array coins representing coins of different denominations and an integer amount representing a total amount of money. Return the fewest number of coins that you need to make up that amount. If it is impossible, return -1.",
    examples: [
      { input: "coins = [1,2,5], amount = 11", output: "3", explanation: "11 = 5 + 5 + 1" },
      { input: "coins = [2], amount = 3", output: "-1", explanation: "3 cannot be made up using only 2." }
    ],
    constraints: ["1 <= coins.length <= 12", "1 <= coins[i] <= 2^31 - 1", "0 <= amount <= 10000"],
    starterCode: `/**
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
function coinChange(coins, amount) {
  // Your code here
}

console.log(coinChange([1, 2, 5], 11)); // Expected: 3
`,
    testCases: [
      { input: "[1,2,5], 11", expected: "3", description: "Optimal combination" },
      { input: "[2], 3", expected: "-1", description: "Impossible case" },
      { input: "[1], 0", expected: "0", description: "Zero amount" },
      { input: "[186,419,83,408], 6249", expected: "20", description: "Larger denominations" }
    ],
    timeComplexity: "O(amount * coins.length) — compute min coin counts up to target amount.",
    spaceComplexity: "O(amount) — DP table size.",
    hint: "Define dp[i] as the minimum coins needed for amount i. Reoccurrence is dp[i] = min(dp[i], dp[i-coin] + 1) for coin in coins.",
    solution: `function coinChange(coins, amount) {
  const dp = Array(amount + 1).fill(Infinity);
  dp[0] = 0;
  for (let i = 1; i <= amount; i++) {
    for (const coin of coins) {
      if (i - coin >= 0) {
        dp[i] = Math.min(dp[i], dp[i - coin] + 1);
      }
    }
  }
  return dp[amount] === Infinity ? -1 : dp[amount];
}`
  },

  // ─── INTERMEDIATE (MEDIUM) ──────────────────────────────────────────────────
  {
    id: "dp-06",
    title: "Longest Increasing Subsequence (LIS)",
    slug: "longest-increasing-subsequence",
    difficulty: "Medium",
    category: "DP",
    timeLimit: "25 min",
    description: "Given an integer array nums, return the length of the longest strictly increasing subsequence.",
    examples: [
      { input: "nums = [10,9,2,5,3,7,101,18]", output: "4", explanation: "The longest increasing subsequence is [2,3,7,101], length 4." },
      { input: "nums = [0,1,0,3,2,3]", output: "4", explanation: "The longest increasing subsequence is [0,1,2,3]." }
    ],
    constraints: ["1 <= nums.length <= 2500", "-10^4 <= nums[i] <= 10^4"],
    starterCode: `/**
 * @param {number[]} nums
 * @return {number}
 */
function lengthOfLIS(nums) {
  // Your code here
}

console.log(lengthOfLIS([10,9,2,5,3,7,101,18])); // Expected: 4
`,
    testCases: [
      { input: "[10,9,2,5,3,7,101,18]", expected: "4", description: "Standard LIS" },
      { input: "[0,1,0,3,2,3]", expected: "4", description: "Array with duplicate values" },
      { input: "[7,7,7,7,7]", expected: "1", description: "All identical values" }
    ],
    timeComplexity: "O(n^2) — nested loop DP. Note that O(n log n) is possible using binary search.",
    spaceComplexity: "O(n) — DP array.",
    hint: "dp[i] represents the length of the longest increasing subsequence ending at index i. Compare with all elements before index i.",
    solution: `function lengthOfLIS(nums) {
  if (nums.length === 0) return 0;
  const dp = Array(nums.length).fill(1);
  let maxVal = 1;
  for (let i = 1; i < nums.length; i++) {
    for (let j = 0; j < i; j++) {
      if (nums[i] > nums[j]) {
        dp[i] = Math.max(dp[i], dp[j] + 1);
      }
    }
    maxVal = Math.max(maxVal, dp[i]);
  }
  return maxVal;
}`
  },
  {
    id: "dp-07",
    title: "Longest Common Subsequence (LCS)",
    slug: "longest-common-subsequence",
    difficulty: "Medium",
    category: "DP",
    timeLimit: "30 min",
    description: "Given two strings text1 and text2, return the length of their longest common subsequence. A subsequence is a string generated by deleting some or no characters without changing relative order.",
    examples: [
      { input: "text1 = 'abcde', text2 = 'ace'", output: "3", explanation: "The LCS is 'ace', length 3." },
      { input: "text1 = 'abc', text2 = 'def'", output: "0", explanation: "No common characters." }
    ],
    constraints: ["1 <= text1.length, text2.length <= 1000", "Strings contain only lowercase English characters."],
    starterCode: `/**
 * @param {string} text1
 * @param {string} text2
 * @return {number}
 */
function longestCommonSubsequence(text1, text2) {
  // Your code here
}

console.log(longestCommonSubsequence("abcde", "ace")); // Expected: 3
`,
    testCases: [
      { input: "\"abcde\", \"ace\"", expected: "3", description: "LCS exists" },
      { input: "\"abc\", \"abc\"", expected: "3", description: "Identical strings" },
      { input: "\"abc\", \"def\"", expected: "0", description: "Completely disjoint strings" }
    ],
    timeComplexity: "O(m * n) — where m and n are string lengths.",
    spaceComplexity: "O(m * n) — storing 2D array state.",
    hint: "Build a 2D matrix. If text1[i-1] == text2[j-1], dp[i][j] = dp[i-1][j-1] + 1. Otherwise, dp[i][j] = max(dp[i-1][j], dp[i][j-1]).",
    solution: `function longestCommonSubsequence(text1, text2) {
  const m = text1.length, n = text2.length;
  const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (text1[i - 1] === text2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }
  return dp[m][n];
}`
  },
  {
    id: "dp-08",
    title: "0/1 Knapsack",
    slug: "knapsack-0-1",
    difficulty: "Medium",
    category: "DP",
    timeLimit: "30 min",
    description: "Given weights and values of n items, put these items in a knapsack of capacity W to get the maximum total value in the knapsack. You cannot split items (0/1 choice).",
    examples: [
      { input: "values = [60, 100, 120], weights = [10, 20, 30], W = 50", output: "220", explanation: "Take item 2 and item 3 for a weight of 50 and value 220." }
    ],
    constraints: ["1 <= values.length <= 1000", "1 <= W <= 1000", "weights[i] <= W"],
    starterCode: `/**
 * @param {number[]} values
 * @param {number[]} weights
 * @param {number} W
 * @return {number}
 */
function knapsack(values, weights, W) {
  // Your code here
}

console.log(knapsack([60, 100, 120], [10, 20, 30], 50)); // Expected: 220
`,
    testCases: [
      { input: "[60, 100, 120], [10, 20, 30], 50", expected: "220", description: "Standard Knapsack" },
      { input: "[10, 20, 30], [1, 1, 1], 2", expected: "50", description: "Lightweight items" }
    ],
    timeComplexity: "O(n * W) — iterating items and weight capacity.",
    spaceComplexity: "O(W) — using 1D space optimized array.",
    hint: "To optimize space to O(W), iterate backwards through the capacity so that items are not counted multiple times.",
    solution: `function knapsack(values, weights, W) {
  const n = values.length;
  const dp = Array(W + 1).fill(0);
  for (let i = 0; i < n; i++) {
    for (let w = W; w >= weights[i]; w--) {
      dp[w] = Math.max(dp[w], dp[w - weights[i]] + values[i]);
    }
  }
  return dp[W];
}`
  },
  {
    id: "dp-09",
    title: "Partition Equal Subset Sum",
    slug: "partition-equal-subset-sum",
    difficulty: "Medium",
    category: "DP",
    timeLimit: "25 min",
    description: "Given an integer array nums, return true if you can partition the array into two subsets such that the sum of the elements in both subsets is equal, or false otherwise.",
    examples: [
      { input: "nums = [1,5,11,5]", output: "true", explanation: "Can be partitioned as [1, 5, 5] and [11]." },
      { input: "nums = [1,2,3,5]", output: "false", explanation: "Cannot be partitioned equally." }
    ],
    constraints: ["1 <= nums.length <= 200", "1 <= nums[i] <= 100"],
    starterCode: `/**
 * @param {number[]} nums
 * @return {boolean}
 */
function canPartition(nums) {
  // Your code here
}

console.log(canPartition([1, 5, 11, 5])); // Expected: true
`,
    testCases: [
      { input: "[1,5,11,5]", expected: "true", description: "Can partition" },
      { input: "[1,2,3,5]", expected: "false", description: "Cannot partition" }
    ],
    timeComplexity: "O(n * target) — where target is sum / 2.",
    spaceComplexity: "O(target) — space optimized DP array.",
    hint: "This is a variant of the knapsack problem. Calculate target = sum / 2. If sum is odd, return false. Find if a subset exists with sum equal to target.",
    solution: `function canPartition(nums) {
  let sum = nums.reduce((a, b) => a + b, 0);
  if (sum % 2 !== 0) return false;
  let target = sum / 2;
  const dp = Array(target + 1).fill(false);
  dp[0] = true;
  for (let num of nums) {
    for (let j = target; j >= num; j--) {
      dp[j] = dp[j] || dp[j - num];
    }
  }
  return dp[target];
}`
  },
  {
    id: "dp-10",
    title: "Decode Ways",
    slug: "decode-ways",
    difficulty: "Medium",
    category: "DP",
    timeLimit: "30 min",
    description: "A message containing letters from A-Z can be encoded into numbers using: 'A' -> 1, 'B' -> 2, ..., 'Z' -> 26. Given a string s containing only digits, return the number of ways to decode it.",
    examples: [
      { input: "s = '12'", output: "2", explanation: "Decoded as 'AB' (1 2) or 'L' (12)." },
      { input: "s = '226'", output: "3", explanation: "Decoded as 'BZ' (2 26), 'VF' (22 6), or 'BBF' (2 2 6)." }
    ],
    constraints: ["1 <= s.length <= 100", "s contains only digits and may contain leading zeroes."],
    starterCode: `/**
 * @param {string} s
 * @return {number}
 */
function numDecodings(s) {
  // Your code here
}

console.log(numDecodings("226")); // Expected: 3
`,
    testCases: [
      { input: "\"12\"", expected: "2", description: "Two possible decodings" },
      { input: "\"226\"", expected: "3", description: "Three possible decodings" },
      { input: "\"06\"", expected: "0", description: "Invalid leading zero" }
    ],
    timeComplexity: "O(n) — single pass scan.",
    spaceComplexity: "O(n) — 1D state array.",
    hint: "Define dp[i] as the decoding count of substring(0, i). Check single digit decode s[i-1] and double digit decode s[i-2, i].",
    solution: `function numDecodings(s) {
  if (!s || s[0] === '0') return 0;
  const n = s.length;
  const dp = Array(n + 1).fill(0);
  dp[0] = 1;
  dp[1] = 1;
  for (let i = 2; i <= n; i++) {
    const oneDigit = Number(s.slice(i - 1, i));
    const twoDigits = Number(s.slice(i - 2, i));
    if (oneDigit >= 1 && oneDigit <= 9) {
      dp[i] += dp[i - 1];
    }
    if (twoDigits >= 10 && twoDigits <= 26) {
      dp[i] += dp[i - 2];
    }
  }
  return dp[n];
}`
  },
  {
    id: "dp-11",
    title: "Unique Paths",
    slug: "unique-paths",
    difficulty: "Medium",
    category: "DP",
    timeLimit: "25 min",
    description: "There is a robot on an m x n grid. The robot is initially at the top-left corner (0, 0) and wants to move to the bottom-right corner (m - 1, n - 1). The robot can only move down or right. Return the number of possible unique paths.",
    examples: [
      { input: "m = 3, n = 7", output: "28", explanation: "Total paths is 28." }
    ],
    constraints: ["1 <= m, n <= 100"],
    starterCode: `/**
 * @param {number} m
 * @param {number} n
 * @return {number}
 */
function uniquePaths(m, n) {
  // Your code here
}

console.log(uniquePaths(3, 7)); // Expected: 28
`,
    testCases: [
      { input: "3, 2", expected: "3", description: "3x2 grid" },
      { input: "3, 7", expected: "28", description: "3x7 grid" },
      { input: "1, 1", expected: "1", description: "1x1 grid" }
    ],
    timeComplexity: "O(m * n) — visiting each cell once.",
    spaceComplexity: "O(n) — only a single row tracker is needed.",
    hint: "To optimize space to a 1D array, update dp[j] += dp[j - 1] while scanning row by row.",
    solution: `function uniquePaths(m, n) {
  const dp = Array(n).fill(1);
  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      dp[j] += dp[j - 1];
    }
  }
  return dp[n - 1];
}`
  },
  {
    id: "dp-12",
    title: "Edit Distance",
    slug: "edit-distance",
    difficulty: "Medium",
    category: "DP",
    timeLimit: "30 min",
    description: "Given two strings word1 and word2, return the minimum number of operations required to convert word1 to word2. You can Insert, Delete, or Replace characters.",
    examples: [
      { input: "word1 = 'horse', word2 = 'ros'", output: "3", explanation: "horse -> rorse (replace 'h') -> rose (delete 'r') -> ros (delete 'e')" }
    ],
    constraints: ["0 <= word1.length, word2.length <= 500", "word1 and word2 consist of lowercase English letters."],
    starterCode: `/**
 * @param {string} word1
 * @param {string} word2
 * @return {number}
 */
function minDistance(word1, word2) {
  // Your code here
}

console.log(minDistance("horse", "ros")); // Expected: 3
`,
    testCases: [
      { input: "\"horse\", \"ros\"", expected: "3", description: "Word mismatch" },
      { input: "\"intention\", \"execution\"", expected: "5", description: "Multi-character alignment" },
      { input: "\"\", \"abc\"", expected: "3", description: "Empty first word" }
    ],
    timeComplexity: "O(m * n) — nested grid scan of word lengths.",
    spaceComplexity: "O(m * n) — state storage matrix size.",
    hint: "dp[i][j] represents edits to convert word1[0...i-1] to word2[0...j-1]. If chars match, copy diagonal: dp[i][j] = dp[i-1][j-1]. Else, min of insert, delete, replace + 1.",
    solution: `function minDistance(word1, word2) {
  const m = word1.length, n = word2.length;
  const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));
  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (word1[i - 1] === word2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1];
      } else {
        dp[i][j] = Math.min(
          dp[i - 1][j] + 1,    // delete
          dp[i][j - 1] + 1,    // insert
          dp[i - 1][j - 1] + 1 // replace
        );
      }
    }
  }
  return dp[m][n];
}`
  },

  // ─── ADVANCED (HARD) ────────────────────────────────────────────────────────
  {
    id: "dp-13",
    title: "Coin Change II",
    slug: "coin-change-ii",
    difficulty: "Hard",
    category: "DP",
    timeLimit: "30 min",
    description: "You are given an integer array coins representing coins of different denominations and an integer amount representing a total amount of money. Return the number of combinations that make up that amount.",
    examples: [
      { input: "amount = 5, coins = [1,2,5]", output: "4", explanation: "Combinations are: 5, 2+2+1, 2+1+1+1, 1+1+1+1+1" }
    ],
    constraints: ["1 <= coins.length <= 300", "1 <= coins[i] <= 5000", "0 <= amount <= 5000"],
    starterCode: `/**
 * @param {number} amount
 * @param {number[]} coins
 * @return {number}
 */
function change(amount, coins) {
  // Your code here
}

console.log(change(5, [1, 2, 5])); // Expected: 4
`,
    testCases: [
      { input: "5, [1,2,5]", expected: "4", description: "Standard amount combinations" },
      { input: "3, [2]", expected: "0", description: "Impossible target amount" },
      { input: "10, [10]", expected: "1", description: "Single exact coin match" }
    ],
    timeComplexity: "O(coins.length * amount) — loops to accumulate possible sums.",
    spaceComplexity: "O(amount) — DP array storing paths count for each amount.",
    hint: "This is a variant of unbounded knapsack. For each coin, sweep amounts from coin to target: dp[j] += dp[j - coin].",
    solution: `function change(amount, coins) {
  const dp = Array(amount + 1).fill(0);
  dp[0] = 1;
  for (let coin of coins) {
    for (let j = coin; j <= amount; j++) {
      dp[j] += dp[j - coin];
    }
  }
  return dp[amount];
}`
  },
  {
    id: "dp-14",
    title: "Matrix Chain Multiplication",
    slug: "matrix-chain-multiplication",
    difficulty: "Hard",
    category: "DP",
    timeLimit: "35 min",
    description: "Given a sequence of matrices, find the most efficient way to multiply these matrices together. Decide the ordering to minimize the count of scalar multiplications. Input is an array p where p[i-1] x p[i] represents dimensions of Ai.",
    examples: [
      { input: "p = [40, 20, 30, 10, 30]", output: "26000", explanation: "Min multiplications cost is (A1 * (A2 * A3)) * A4 or similar configuration, cost 26000." }
    ],
    constraints: ["2 <= p.length <= 100", "1 <= p[i] <= 500"],
    starterCode: `/**
 * @param {number[]} p
 * @return {number}
 */
function matrixChainOrder(p) {
  // Your code here
}

console.log(matrixChainOrder([40, 20, 30, 10, 30])); // Expected: 26000
`,
    testCases: [
      { input: "[40, 20, 30, 10, 30]", expected: "26000", description: "4 matrices" },
      { input: "[10, 20, 30]", expected: "6000", description: "2 matrices" }
    ],
    timeComplexity: "O(n^3) — where n is the number of matrices.",
    spaceComplexity: "O(n^2) — 2D table representing optimal subsegment splits.",
    hint: "Use interval DP. Compute costs for smaller chain lengths first, trying all possible split points k inside range [i, j].",
    solution: `function matrixChainOrder(p) {
  const n = p.length - 1;
  const m = Array.from({ length: n + 1 }, () => Array(n + 1).fill(0));
  for (let l = 2; l <= n; l++) {
    for (let i = 1; i <= n - l + 1; i++) {
      let j = i + l - 1;
      m[i][j] = Infinity;
      for (let k = i; k < j; k++) {
        let q = m[i][k] + m[k + 1][j] + p[i - 1] * p[k] * p[j];
        if (q < m[i][j]) {
          m[i][j] = q;
        }
      }
    }
  }
  return m[1][n];
}`
  },
  {
    id: "dp-15",
    title: "Longest Palindromic Subsequence",
    slug: "longest-palindromic-subsequence",
    difficulty: "Hard",
    category: "DP",
    timeLimit: "30 min",
    description: "Given a string s, find the longest palindromic subsequence's length in s.",
    examples: [
      { input: "s = 'bbbab'", output: "4", explanation: "One possible longest palindromic subsequence is 'bbbb'." },
      { input: "s = 'cbbd'", output: "2", explanation: "LPS is 'bb', length 2." }
    ],
    constraints: ["1 <= s.length <= 1000", "s consists of lowercase English letters."],
    starterCode: `/**
 * @param {string} s
 * @return {number}
 */
function longestPalindromeSubseq(s) {
  // Your code here
}

console.log(longestPalindromeSubseq("bbbab")); // Expected: 4
`,
    testCases: [
      { input: "\"bbbab\"", expected: "4", description: "LPS of 4" },
      { input: "\"cbbd\"", expected: "2", description: "LPS of 2" }
    ],
    timeComplexity: "O(n^2) — interval DP matrix scan.",
    spaceComplexity: "O(n^2) — matrix storing results for indices [i...j].",
    hint: "dp[i][j] stores LPS for s[i...j]. If s[i] == s[j], dp[i][j] = dp[i+1][j-1] + 2. Otherwise, dp[i][j] = max(dp[i+1][j], dp[i][j-1]).",
    solution: `function longestPalindromeSubseq(s) {
  const n = s.length;
  const dp = Array.from({ length: n }, () => Array(n).fill(0));
  for (let i = n - 1; i >= 0; i--) {
    dp[i][i] = 1;
    for (let j = i + 1; j < n; j++) {
      if (s[i] === s[j]) {
        dp[i][j] = dp[i + 1][j - 1] + 2;
      } else {
        dp[i][j] = Math.max(dp[i + 1][j], dp[i][j - 1]);
      }
    }
  }
  return dp[0][n - 1];
}`
  },
  {
    id: "dp-16",
    title: "Burst Balloons",
    slug: "burst-balloons",
    difficulty: "Hard",
    category: "DP",
    timeLimit: "40 min",
    description: "You are given n balloons, indexed from 0 to n - 1. If you burst balloon i, you get nums[i - 1] * nums[i] * nums[i + 1] coins. Out of bounds items are treated as 1. Return the maximum coins you can collect by bursting all balloons.",
    examples: [
      { input: "nums = [3,1,5,8]", output: "167", explanation: "Coins = 3*1*5 + 3*5*8 + 1*3*8 + 1*8*1 = 167." }
    ],
    constraints: ["1 <= nums.length <= 300", "0 <= nums[i] <= 100"],
    starterCode: `/**
 * @param {number[]} nums
 * @return {number}
 */
function maxCoins(nums) {
  // Your code here
}

console.log(maxCoins([3, 1, 5, 8])); // Expected: 167
`,
    testCases: [
      { input: "[3,1,5,8]", expected: "167", description: "Standard balloons list" },
      { input: "[1,5]", expected: "10", description: "Two balloons" }
    ],
    timeComplexity: "O(n^3) — where n is the number of balloons.",
    spaceComplexity: "O(n^2) — matrix storing maximum coins for segments.",
    hint: "Instead of choosing which balloon to burst first, choose which balloon is burst last in the range [left, right].",
    solution: `function maxCoins(nums) {
  const arr = [1, ...nums, 1];
  const n = arr.length;
  const dp = Array.from({ length: n }, () => Array(n).fill(0));
  for (let len = 2; len < n; len++) {
    for (let left = 0; left < n - len; left++) {
      let right = left + len;
      for (let i = left + 1; i < right; i++) {
        dp[left][right] = Math.max(
          dp[left][right],
          arr[left] * arr[i] * arr[right] + dp[left][i] + dp[i][right]
        );
      }
    }
  }
  return dp[0][n - 1];
}`
  },
  {
    id: "dp-17",
    title: "Rod Cutting Problem",
    slug: "rod-cutting",
    difficulty: "Hard",
    category: "DP",
    timeLimit: "30 min",
    description: "Given a rod of length n inches and an array of prices that includes prices of all pieces of size smaller than n. Determine the maximum value obtainable by cutting up the rod and selling the pieces.",
    examples: [
      { input: "price = [1, 5, 8, 9, 10, 17, 17, 20], n = 8", output: "22", explanation: "Cut the rod of length 8 into two pieces of length 2 and 6. Total value = 5 + 17 = 22." }
    ],
    constraints: ["1 <= n <= 1000", "price.length >= n", "1 <= price[i] <= 10^5"],
    starterCode: `/**
 * @param {number[]} price
 * @param {number} n
 * @return {number}
 */
function cutRod(price, n) {
  // Your code here
}

console.log(cutRod([1, 5, 8, 9, 10, 17, 17, 20], 8)); // Expected: 22
`,
    testCases: [
      { input: "[1, 5, 8, 9, 10, 17, 17, 20], 8", expected: "22", description: "Length 8 rod" },
      { input: "[3, 5, 8, 9, 10, 17, 17, 20], 8", expected: "24", description: "Length 8 with high price for length 1" }
    ],
    timeComplexity: "O(n^2) — two nested loops over rod lengths.",
    spaceComplexity: "O(n) — array storing max values of rod parts.",
    hint: "dp[i] is the maximum value obtainable for rod of length i. dp[i] = max(price[j] + dp[i - j - 1]) for 0 <= j < i.",
    solution: `function cutRod(price, n) {
  const dp = Array(n + 1).fill(0);
  for (let i = 1; i <= n; i++) {
    let maxVal = -Infinity;
    for (let j = 0; j < i; j++) {
      maxVal = Math.max(maxVal, price[j] + dp[i - j - 1]);
    }
    dp[i] = maxVal;
  }
  return dp[n];
}`
  },
  {
    id: "dp-18",
    title: "Egg Dropping Puzzle",
    slug: "egg-dropping",
    difficulty: "Hard",
    category: "DP",
    timeLimit: "40 min",
    description: "You are given k identical eggs and a building with n floors. Determine the minimum number of moves that you need to find the critical floor f with certainty.",
    examples: [
      { input: "k = 2, n = 6", output: "3", explanation: "Drop first egg from floor 3. If breaks, test 1 and 2. Else drop from 5, etc." }
    ],
    constraints: ["1 <= k <= 100", "1 <= n <= 10000"],
    starterCode: `/**
 * @param {number} k
 * @param {number} n
 * @return {number}
 */
function superEggDrop(k, n) {
  // Your code here
}

console.log(superEggDrop(2, 6)); // Expected: 3
`,
    testCases: [
      { input: "2, 6", expected: "3", description: "2 eggs, 6 floors" },
      { input: "3, 14", expected: "4", description: "3 eggs, 14 floors" },
      { input: "1, 2", expected: "2", description: "1 egg, 2 floors" }
    ],
    timeComplexity: "O(k * m) — where m is the minimum number of attempts.",
    spaceComplexity: "O(k * m) — DP array storing max reachable floors for (moves, eggs).",
    hint: "Think in terms of the maximum floor we can reach with m moves and k eggs. dp[m][k] = dp[m-1][k-1] + dp[m-1][k] + 1. Stop when dp[m][k] >= n.",
    solution: `function superEggDrop(k, n) {
  const dp = Array.from({ length: n + 1 }, () => Array(k + 1).fill(0));
  let m = 0;
  while (dp[m][k] < n) {
    m++;
    dp.push(Array(k + 1).fill(0));
    for (let j = 1; j <= k; j++) {
      dp[m][j] = dp[m - 1][j - 1] + dp[m - 1][j] + 1;
    }
  }
  return m;
}`
  },
  {
    id: "dp-19",
    title: "DP on Trees",
    slug: "dp-on-trees",
    difficulty: "Hard",
    category: "DP",
    timeLimit: "45 min",
    description: "The houses are organized as a binary tree. If two directly-linked houses are robbed on the same night, the police are alerted. Return the maximum money you can rob. Node definition: { val: number, left: TreeNode | null, right: TreeNode | null }.",
    examples: [
      { input: "root = [3,2,3,null,3,null,1]", output: "7", explanation: "Rob root (3) and leaf (1), and leaf (3). Total = 3 + 1 + 3 = 7." }
    ],
    constraints: ["The number of nodes in the tree is in the range [1, 10^4].", "0 <= Node.val <= 10^4"],
    starterCode: `// TreeNode definition
class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val; this.left = left; this.right = right;
  }
}

// Helper: build tree from level-order array
function buildTree(arr) {
  if (!arr || arr.length === 0) return null;
  const root = new TreeNode(arr[0]);
  const queue = [root];
  let i = 1;
  while (queue.length && i < arr.length) {
    const node = queue.shift();
    if (arr[i] !== null) { node.left = new TreeNode(arr[i]); queue.push(node.left); }
    i++;
    if (i < arr.length && arr[i] !== null) { node.right = new TreeNode(arr[i]); queue.push(node.right); }
    i++;
  }
  return root;
}

/**
 * @param {TreeNode} root
 * @return {number}
 */
function robTree(root) {
  // Your code here
}

console.log(robTree(buildTree([3,2,3,null,3,null,1]))); // Expected: 7
`,
    testCases: [
      { input: "[3,2,3,null,3,null,1]", expected: "7", description: "Tree with max at root/leaves" },
      { input: "[3,4,5,1,3,null,1]", expected: "9", description: "Tree with max at children level" }
    ],
    timeComplexity: "O(n) — single post-order DFS traversal of nodes.",
    spaceComplexity: "O(h) — where h is the height of the tree, representing stack depth.",
    hint: "Perform a post-order traversal (DFS). For each node, return a tuple: [rob_current, skip_current]. If you rob current, you must skip both children.",
    solution: `function robTree(root) {
  function dfs(node) {
    if (!node) return [0, 0]; // [robbed, skipped]
    const left = dfs(node.left);
    const right = dfs(node.right);
    const robbed = node.val + left[1] + right[1];
    const skipped = Math.max(left[0], left[1]) + Math.max(right[0], right[1]);
    return [robbed, skipped];
  }
  const res = dfs(root);
  return Math.max(res[0], res[1]);
}`
  },
  {
    id: "dp-20",
    title: "DP with Bitmasking",
    slug: "dp-with-bitmasking",
    difficulty: "Hard",
    category: "DP",
    timeLimit: "45 min",
    description: "Given a distance matrix of size N x N representing the distance between N cities (indexed 0 to N-1), find the minimum cost to visit all cities exactly once and return to the starting city (city 0).",
    examples: [
      { input: "dist = [[0,20,42,25], [20,0,30,34], [42,30,0,10], [25,34,10,0]]", output: "85", explanation: "Optimal tour: 0 -> 1 -> 2 -> 3 -> 0. Cost = 20 + 30 + 10 + 25 = 85." }
    ],
    constraints: ["1 <= N <= 15", "0 <= dist[i][j] <= 1000", "dist[i][i] = 0"],
    starterCode: `/**
 * @param {number[][]} dist
 * @return {number}
 */
function tsp(dist) {
  // Your code here
}

console.log(tsp([[0, 20, 42, 25], [20, 0, 30, 34], [42, 30, 0, 10], [25, 34, 10, 0]])); // Expected: 85
`,
    testCases: [
      { input: "[[0,20,42,25], [20,0,30,34], [42,30,0,10], [25,34,10,0]]", expected: "85", description: "4 cities TSP" },
      { input: "[[0,10,15,20], [10,0,35,25], [15,35,0,30], [20,25,30,0]]", expected: "80", description: "4 cities symmetric TSP" }
    ],
    timeComplexity: "O(n^2 * 2^n) — states count is n * 2^n, and each transition takes O(n) time.",
    spaceComplexity: "O(n * 2^n) — storage table size for memoization.",
    hint: "Use state (mask, pos) where mask bit city represents if city is visited, and pos represents the current city index. Compute recurrences using bit operations.",
    solution: `function tsp(dist) {
  const n = dist.length;
  const memo = Array.from({ length: 1 << n }, () => Array(n).fill(-1));
  function solve(mask, pos) {
    if (mask === (1 << n) - 1) {
      return dist[pos][0];
    }
    if (memo[mask][pos] !== -1) return memo[mask][pos];
    let ans = Infinity;
    for (let city = 0; city < n; city++) {
      if ((mask & (1 << city)) === 0) {
        let newAns = dist[pos][city] + solve(mask | (1 << city), city);
        ans = Math.min(ans, newAns);
      }
    }
    return memo[mask][pos] = ans;
  }
  return solve(1, 0);
}`
  }
];

export default DP_CHALLENGES;
