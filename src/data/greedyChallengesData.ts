export type Difficulty = "Easy" | "Medium" | "Hard";

export interface TestCase {
  input: string;
  expected: string;
  description: string;
}

export interface GreedyChallenge {
  id: string;
  title: string;
  slug: string;
  difficulty: Difficulty;
  category: "Greedy";
  timeLimit: string;
  description: string;
  examples: { input: string; output: string; explanation: string }[];
  constraints: string[];
  starterCode: string;
  starterCodes?: Record<string, string>;
  solution: string;
  testCases: TestCase[];
  timeComplexity: string;
  spaceComplexity: string;
  hint: string;
}

const GREEDY_CHALLENGES: GreedyChallenge[] = [
  // ─── Beginner (Easy) ────────────────────────────────────────────────────────
  {
    id: "gr-01",
    title: "Assign Cookies",
    slug: "assign-cookies",
    difficulty: "Easy",
    category: "Greedy",
    timeLimit: "15 min",
    description: "Assume you are an awesome parent and want to give your children some cookies. But, you should give each child at most one cookie.\n\nEach child i has a greed factor g[i], which is the minimum size of a cookie that the child will be content with; and each cookie j has a size s[j]. If s[j] >= g[i], we can assign the cookie j to the child i, and the child i will be content.\n\nYour goal is to maximize the number of your content children and output the maximum number.",
    examples: [
      { input: "g = [1,2,3], s = [1,1]", output: "1", explanation: "You have 3 children and 2 cookies. The greed factors of 3 children are 1, 2, 3. And even though you have 2 cookies, since their size is both 1, you can only make the child whose greed factor is 1 content." }
    ],
    constraints: ["1 <= g.length <= 3 * 10^4", "0 <= s.length <= 3 * 10^4", "1 <= g[i], s[j] <= 2^31 - 1"],
    starterCode: `/**
 * @param {number[]} g
 * @param {number[]} s
 * @return {number}
 */
function findContentChildren(g, s) {
  // Write your code here
  
}`,
    starterCodes: {
      python: `def find_content_children(g, s):
    # Write your code here
    pass
`,
      cpp: `#include <vector>
using namespace std;

int findContentChildren(vector<int>& g, vector<int>& s) {
    // Write your code here
    return 0;
}
`
    },
    solution: `function findContentChildren(g, s) {
  g.sort((a, b) => a - b);
  s.sort((a, b) => a - b);
  
  let i = 0; // children index
  let j = 0; // cookie index
  
  while (i < g.length && j < s.length) {
    if (s[j] >= g[i]) {
      // Cookie fits, child is content
      i++;
    }
    // Always move to next cookie
    j++;
  }
  
  return i;
}`,
    testCases: [
      { input: "g = [1,2,3], s = [1,1]", expected: "1", description: "Not enough big cookies" },
      { input: "g = [1,2], s = [1,2,3]", expected: "2", description: "Plenty of cookies" }
    ],
    timeComplexity: "O(n log n + m log m) — where n and m are the lengths of the arrays (dominated by sorting).",
    spaceComplexity: "O(1) or O(log n) — auxiliary space for sorting.",
    hint: "Sort both arrays. Try to satisfy the least greedy children with the smallest cookies that are big enough."
  },
  {
    id: "gr-02",
    title: "Maximum Number of Meetings",
    slug: "maximum-number-of-meetings",
    difficulty: "Easy",
    category: "Greedy",
    timeLimit: "15 min",
    description: "You are given the start and end times of N meetings in the form of arrays start[] and end[]. Find the maximum number of meetings that can be accommodated in a single meeting room.",
    examples: [
      { input: "start = [1, 3, 0, 5, 8, 5], end = [2, 4, 6, 7, 9, 9]", output: "4", explanation: "Maximum 4 meetings can be accommodated: [1,2], [3,4], [5,7], and [8,9]." }
    ],
    constraints: ["1 <= N <= 10^5", "0 <= start[i] < end[i] <= 10^5"],
    starterCode: `/**
 * @param {number[]} start
 * @param {number[]} end
 * @return {number}
 */
function maxMeetings(start, end) {
  // Write your code here
  
}`,
    solution: `function maxMeetings(start, end) {
  const meetings = [];
  for (let i = 0; i < start.length; i++) {
    meetings.push({ start: start[i], end: end[i] });
  }
  
  // Sort primarily by end time
  meetings.sort((a, b) => a.end - b.end);
  
  let count = 0;
  let lastEndTime = -1;
  
  for (let i = 0; i < meetings.length; i++) {
    if (meetings[i].start > lastEndTime) {
      count++;
      lastEndTime = meetings[i].end;
    }
  }
  
  return count;
}`,
    testCases: [
      { input: "start = [1,3,0,5,8,5], end = [2,4,6,7,9,9]", expected: "4", description: "Standard case" },
      { input: "start = [10,12,20], end = [20,25,30]", expected: "2", description: "No overlapping meetings" }
    ],
    timeComplexity: "O(N log N) — due to sorting.",
    spaceComplexity: "O(N) — to store the combined meeting objects.",
    hint: "Sort the meetings by their ending time. Always pick the meeting that ends earliest and doesn't conflict with previously chosen meetings."
  },
  {
    id: "gr-03",
    title: "Lemonade Change",
    slug: "lemonade-change",
    difficulty: "Easy",
    category: "Greedy",
    timeLimit: "20 min",
    description: "At a lemonade stand, each lemonade costs $5. Customers are standing in a queue to buy from you and order one at a time.\n\nEach customer will only buy one lemonade and pay with either a $5, $10, or $20 bill. You must provide the correct change to each customer so that the net transaction is that the customer pays $5.\n\nReturn true if and only if you can provide every customer with the correct change.",
    examples: [
      { input: "bills = [5,5,5,10,20]", output: "true", explanation: "Collect three $5s, give one $5 as change for $10, and give one $10 and one $5 as change for $20." },
      { input: "bills = [5,5,10,10,20]", output: "false", explanation: "You run out of $5 bills for the last customer." }
    ],
    constraints: ["1 <= bills.length <= 10^5", "bills[i] is either 5, 10, or 20."],
    starterCode: `/**
 * @param {number[]} bills
 * @return {boolean}
 */
function lemonadeChange(bills) {
  // Write your code here
  
}`,
    solution: `function lemonadeChange(bills) {
  let five = 0;
  let ten = 0;
  
  for (let bill of bills) {
    if (bill === 5) {
      five++;
    } else if (bill === 10) {
      if (five === 0) return false;
      five--;
      ten++;
    } else {
      // bill === 20
      // Prefer giving one $10 and one $5
      if (ten > 0 && five > 0) {
        ten--;
        five--;
      } else if (five >= 3) {
        // Fallback to three $5s
        five -= 3;
      } else {
        return false;
      }
    }
  }
  
  return true;
}`,
    testCases: [
      { input: "bills = [5,5,5,10,20]", expected: "true", description: "Change is exact" },
      { input: "bills = [5,5,10,10,20]", expected: "false", description: "Not enough $5 bills" }
    ],
    timeComplexity: "O(N) — iterating through the bills array once.",
    spaceComplexity: "O(1) — only keeping track of counts of $5 and $10 bills.",
    hint: "Keep track of how many $5 and $10 bills you have. Always prefer giving a $10 bill as change instead of two $5 bills when possible."
  },
  {
    id: "gr-04",
    title: "Can Place Flowers",
    slug: "can-place-flowers",
    difficulty: "Easy",
    category: "Greedy",
    timeLimit: "20 min",
    description: "You have a long flowerbed in which some of the plots are planted, and some are not. However, flowers cannot be planted in adjacent plots.\n\nGiven an integer array flowerbed containing 0's and 1's, where 0 means empty and 1 means not empty, and an integer n, return if n new flowers can be planted in the flowerbed without violating the no-adjacent-flowers rule.",
    examples: [
      { input: "flowerbed = [1,0,0,0,1], n = 1", output: "true", explanation: "A flower can be planted at index 2." },
      { input: "flowerbed = [1,0,0,0,1], n = 2", output: "false", explanation: "Only one flower can be planted." }
    ],
    constraints: ["1 <= flowerbed.length <= 2 * 10^4", "flowerbed[i] is 0 or 1", "0 <= n <= flowerbed.length"],
    starterCode: `/**
 * @param {number[]} flowerbed
 * @param {number} n
 * @return {boolean}
 */
function canPlaceFlowers(flowerbed, n) {
  // Write your code here
  
}`,
    solution: `function canPlaceFlowers(flowerbed, n) {
  let count = 0;
  for (let i = 0; i < flowerbed.length; i++) {
    // Check if current plot is empty
    if (flowerbed[i] === 0) {
      // Check left and right bounds/plots
      const emptyLeft = (i === 0) || (flowerbed[i - 1] === 0);
      const emptyRight = (i === flowerbed.length - 1) || (flowerbed[i + 1] === 0);
      
      if (emptyLeft && emptyRight) {
        flowerbed[i] = 1; // Plant a flower here
        count++;
      }
    }
    if (count >= n) return true;
  }
  return count >= n;
}`,
    testCases: [
      { input: "flowerbed = [1,0,0,0,1], n = 1", expected: "true", description: "One flower can fit" },
      { input: "flowerbed = [1,0,0,0,1], n = 2", expected: "false", description: "Not enough space for two" }
    ],
    timeComplexity: "O(N) — iterating through the array once.",
    spaceComplexity: "O(1) — modifying array in place.",
    hint: "Iterate through the flowerbed. Whenever you find an empty plot with empty adjacent plots, plant a flower there greedily."
  },
  {
    id: "gr-05",
    title: "Minimum Absolute Difference",
    slug: "minimum-absolute-difference",
    difficulty: "Easy",
    category: "Greedy",
    timeLimit: "15 min",
    description: "Given an array of distinct integers arr, find all pairs of elements with the minimum absolute difference of any two elements.\n\nReturn a list of pairs in ascending order(with respect to pairs), each pair [a, b] follows: a, b are from arr, a < b, and b - a equals to the minimum absolute difference.",
    examples: [
      { input: "arr = [4,2,1,3]", output: "[[1,2],[2,3],[3,4]]", explanation: "The minimum absolute difference is 1, and there are 3 pairs with difference 1." }
    ],
    constraints: ["2 <= arr.length <= 10^5", "-10^6 <= arr[i] <= 10^6"],
    starterCode: `/**
 * @param {number[]} arr
 * @return {number[][]}
 */
function minimumAbsDifference(arr) {
  // Write your code here
  
}`,
    solution: `function minimumAbsDifference(arr) {
  arr.sort((a, b) => a - b);
  
  let minDiff = Infinity;
  for (let i = 1; i < arr.length; i++) {
    minDiff = Math.min(minDiff, arr[i] - arr[i - 1]);
  }
  
  const result = [];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] - arr[i - 1] === minDiff) {
      result.push([arr[i - 1], arr[i]]);
    }
  }
  
  return result;
}`,
    testCases: [
      { input: "arr = [4,2,1,3]", expected: "[[1,2],[2,3],[3,4]]", description: "Multiple pairs" },
      { input: "arr = [1,3,6,10,15]", expected: "[[1,3]]", description: "Single pair" }
    ],
    timeComplexity: "O(N log N) — to sort the array.",
    spaceComplexity: "O(1) auxiliary, O(N) for the result array.",
    hint: "Sort the array. The minimum difference must occur between two adjacent elements in the sorted array."
  },
  // ─── Intermediate (Medium) ──────────────────────────────────────────────────
  {
    id: "gr-06",
    title: "Activity Selection Problem",
    slug: "activity-selection-problem",
    difficulty: "Medium",
    category: "Greedy",
    timeLimit: "25 min",
    description: "Given N activities with their start and finish times. Select the maximum number of activities that can be performed by a single person, assuming that a person can only work on a single activity at a time.",
    examples: [
      { input: "start = [10, 12, 20], finish = [20, 25, 30]", output: "2", explanation: "A person can perform at most two activities: [10, 20] and [20, 30]." }
    ],
    constraints: ["1 <= start.length <= 10^5", "0 <= start[i] <= finish[i] <= 10^5"],
    starterCode: `/**
 * @param {number[]} start
 * @param {number[]} finish
 * @return {number}
 */
function activitySelection(start, finish) {
  // Write your code here
  
}`,
    solution: `function activitySelection(start, finish) {
  const activities = start.map((s, i) => ({ start: s, finish: finish[i] }));
  
  activities.sort((a, b) => a.finish - b.finish);
  
  let count = 0;
  let lastFinish = -1;
  
  for (const activity of activities) {
    if (activity.start >= lastFinish) {
      count++;
      lastFinish = activity.finish;
    }
  }
  
  return count;
}`,
    testCases: [
      { input: "start = [10,12,20], finish = [20,25,30]", expected: "2", description: "Overlap handled" },
      { input: "start = [1,3,0,5,8,5], finish = [2,4,6,7,9,9]", expected: "4", description: "Standard case" }
    ],
    timeComplexity: "O(N log N) — dominated by sorting.",
    spaceComplexity: "O(N) — creating an array of objects.",
    hint: "This is identical to the Maximum Meetings problem. Sort by finish time!"
  },
  {
    id: "gr-07",
    title: "Fractional Knapsack",
    slug: "fractional-knapsack",
    difficulty: "Medium",
    category: "Greedy",
    timeLimit: "30 min",
    description: "Given weights and values of N items, we need to put these items in a knapsack of capacity W to get the maximum total value in the knapsack. Unlike 0/1 knapsack, you are allowed to break the item.",
    examples: [
      { input: "W = 50, values = [60, 100, 120], weights = [10, 20, 30]", output: "240", explanation: "Take item 1 (value 60, weight 10), item 2 (value 100, weight 20), and 2/3 of item 3 (value 80, weight 20)." }
    ],
    constraints: ["1 <= N <= 10^5", "1 <= W <= 10^9", "1 <= values[i], weights[i] <= 10^4"],
    starterCode: `/**
 * @param {number} W
 * @param {number[]} values
 * @param {number[]} weights
 * @return {number}
 */
function fractionalKnapsack(W, values, weights) {
  // Write your code here
  
}`,
    solution: `function fractionalKnapsack(W, values, weights) {
  const items = values.map((v, i) => ({
    value: v,
    weight: weights[i],
    ratio: v / weights[i]
  }));
  
  // Sort descending by value/weight ratio
  items.sort((a, b) => b.ratio - a.ratio);
  
  let totalValue = 0;
  let currentWeight = 0;
  
  for (const item of items) {
    if (currentWeight + item.weight <= W) {
      currentWeight += item.weight;
      totalValue += item.value;
    } else {
      const remainingWeight = W - currentWeight;
      totalValue += item.ratio * remainingWeight;
      break;
    }
  }
  
  // Round to 2 decimal places to handle float inaccuracies 
  return Number(totalValue.toFixed(2));
}`,
    testCases: [
      { input: "W = 50, values = [60,100,120], weights = [10,20,30]", expected: "240", description: "Standard case" },
      { input: "W = 10, values = [500], weights = [30]", expected: "166.67", description: "Single item fraction" }
    ],
    timeComplexity: "O(N log N) — due to sorting the items.",
    spaceComplexity: "O(N) — to store item objects.",
    hint: "Sort the items by their value-to-weight ratio in descending order. Take as much of the high-ratio items as possible."
  },
  {
    id: "gr-08",
    title: "Jump Game",
    slug: "jump-game",
    difficulty: "Medium",
    category: "Greedy",
    timeLimit: "30 min",
    description: "You are given an integer array nums. You are initially positioned at the array's first index, and each element in the array represents your maximum jump length at that position.\n\nReturn true if you can reach the last index, or false otherwise.",
    examples: [
      { input: "nums = [2,3,1,1,4]", output: "true", explanation: "Jump 1 step from index 0 to 1, then 3 steps to the last index." },
      { input: "nums = [3,2,1,0,4]", output: "false", explanation: "You will always arrive at index 3 no matter what. Its maximum jump length is 0, which makes it impossible to reach the last index." }
    ],
    constraints: ["1 <= nums.length <= 10^4", "0 <= nums[i] <= 10^5"],
    starterCode: `/**
 * @param {number[]} nums
 * @return {boolean}
 */
function canJump(nums) {
  // Write your code here
  
}`,
    solution: `function canJump(nums) {
  let maxReach = 0;
  
  for (let i = 0; i < nums.length; i++) {
    // If current index is beyond the max reachable index, we can't move forward
    if (i > maxReach) {
      return false;
    }
    maxReach = Math.max(maxReach, i + nums[i]);
    
    // Optimization: if maxReach already covers the end, we're good
    if (maxReach >= nums.length - 1) {
      return true;
    }
  }
  
  return true;
}`,
    testCases: [
      { input: "nums = [2,3,1,1,4]", expected: "true", description: "Reachable" },
      { input: "nums = [3,2,1,0,4]", expected: "false", description: "Blocked by 0" }
    ],
    timeComplexity: "O(N) — iterating through the array once.",
    spaceComplexity: "O(1) — constant extra space.",
    hint: "Keep track of the furthest index you can reach. If you ever reach an index that is greater than your furthest reach, you're stuck."
  },
  {
    id: "gr-09",
    title: "Gas Station",
    slug: "gas-station",
    difficulty: "Medium",
    category: "Greedy",
    timeLimit: "35 min",
    description: "There are n gas stations along a circular route, where the amount of gas at the ith station is gas[i].\n\nYou have a car with an unlimited gas tank and it costs cost[i] of gas to travel from the ith station to its next (i + 1)th station. You begin the journey with an empty tank at one of the gas stations.\n\nGiven two integer arrays gas and cost, return the starting gas station's index if you can travel around the circuit once in the clockwise direction, otherwise return -1. If there exists a solution, it is guaranteed to be unique.",
    examples: [
      { input: "gas = [1,2,3,4,5], cost = [3,4,5,1,2]", output: "3", explanation: "Start at station 3 (index 3). Gas left: 4 - 1 + 5 - 2 + 1 - 3 + 2 - 4 + 3 - 5 = 0." }
    ],
    constraints: ["n == gas.length == cost.length", "1 <= n <= 10^5", "0 <= gas[i], cost[i] <= 10^4"],
    starterCode: `/**
 * @param {number[]} gas
 * @param {number[]} cost
 * @return {number}
 */
function canCompleteCircuit(gas, cost) {
  // Write your code here
  
}`,
    solution: `function canCompleteCircuit(gas, cost) {
  let totalGas = 0;
  let currentGas = 0;
  let startIndex = 0;
  
  for (let i = 0; i < gas.length; i++) {
    const diff = gas[i] - cost[i];
    totalGas += diff;
    currentGas += diff;
    
    // If we run out of gas, we can't start at any station from startIndex to i.
    // The next possible start station is i + 1.
    if (currentGas < 0) {
      startIndex = i + 1;
      currentGas = 0;
    }
  }
  
  // If total gas is negative, we can't complete the circuit at all
  return totalGas >= 0 ? startIndex : -1;
}`,
    testCases: [
      { input: "gas = [1,2,3,4,5], cost = [3,4,5,1,2]", expected: "3", description: "Possible to complete circuit" },
      { input: "gas = [2,3,4], cost = [3,4,3]", expected: "-1", description: "Total gas is less than total cost" }
    ],
    timeComplexity: "O(N) — one pass through the arrays.",
    spaceComplexity: "O(1) — variables only.",
    hint: "If the total gas is less than the total cost, it's impossible. Otherwise, if you run out of gas at station i starting from station j, you can't start at any station between j and i."
  },
  {
    id: "gr-10",
    title: "Non-overlapping Intervals",
    slug: "non-overlapping-intervals",
    difficulty: "Medium",
    category: "Greedy",
    timeLimit: "30 min",
    description: "Given an array of intervals where intervals[i] = [start_i, end_i], return the minimum number of intervals you need to remove to make the rest of the intervals non-overlapping.",
    examples: [
      { input: "intervals = [[1,2],[2,3],[3,4],[1,3]]", output: "1", explanation: "Remove [1,3] to make the rest non-overlapping." },
      { input: "intervals = [[1,2],[1,2],[1,2]]", output: "2", explanation: "Remove two [1,2]s to leave one valid interval." }
    ],
    constraints: ["1 <= intervals.length <= 10^5", "intervals[i].length == 2", "-5 * 10^4 <= start_i < end_i <= 5 * 10^4"],
    starterCode: `/**
 * @param {number[][]} intervals
 * @return {number}
 */
function eraseOverlapIntervals(intervals) {
  // Write your code here
  
}`,
    solution: `function eraseOverlapIntervals(intervals) {
  if (intervals.length === 0) return 0;
  
  // Sort intervals by their end time
  intervals.sort((a, b) => a[1] - b[1]);
  
  let count = 0;
  let lastEnd = intervals[0][1];
  
  for (let i = 1; i < intervals.length; i++) {
    // If the current interval overlaps with the previous one, remove it
    if (intervals[i][0] < lastEnd) {
      count++;
    } else {
      // Otherwise, keep it and update the end time
      lastEnd = intervals[i][1];
    }
  }
  
  return count;
}`,
    testCases: [
      { input: "intervals = [[1,2],[2,3],[3,4],[1,3]]", expected: "1", description: "Standard case" },
      { input: "intervals = [[1,2],[1,2],[1,2]]", expected: "2", description: "All overlapping" }
    ],
    timeComplexity: "O(N log N) — sorting the intervals.",
    spaceComplexity: "O(1) auxiliary space (ignoring sort implementation details).",
    hint: "Sort the intervals by their end times. Always keep the interval that ends earliest to leave room for future intervals."
  },
  {
    id: "gr-11",
    title: "Minimum Number of Arrows to Burst Balloons",
    slug: "minimum-arrows-to-burst-balloons",
    difficulty: "Medium",
    category: "Greedy",
    timeLimit: "30 min",
    description: "There are some spherical balloons taped onto a flat wall that represents the XY-plane. The balloons are represented as a 2D integer array points where points[i] = [x_start, x_end].\n\nArrows can be shot up directly vertically (in the positive y-direction) from different points along the x-axis. A balloon with x_start and x_end is burst by an arrow shot at x if x_start <= x <= x_end.\n\nReturn the minimum number of arrows that must be shot to burst all balloons.",
    examples: [
      { input: "points = [[10,16],[2,8],[1,6],[7,12]]", output: "2", explanation: "Shoot one arrow at x = 6 (bursting [2,8] and [1,6]) and another at x = 11 (bursting [10,16] and [7,12])." }
    ],
    constraints: ["1 <= points.length <= 10^5", "points[i].length == 2", "-2^31 <= x_start < x_end <= 2^31 - 1"],
    starterCode: `/**
 * @param {number[][]} points
 * @return {number}
 */
function findMinArrowShots(points) {
  // Write your code here
  
}`,
    solution: `function findMinArrowShots(points) {
  if (points.length === 0) return 0;
  
  // Sort by ending coordinate
  points.sort((a, b) => a[1] - b[1]);
  
  let arrows = 1;
  let currentEnd = points[0][1];
  
  for (let i = 1; i < points.length; i++) {
    // If the next balloon starts after the current arrow's range
    if (points[i][0] > currentEnd) {
      arrows++;
      currentEnd = points[i][1];
    }
  }
  
  return arrows;
}`,
    testCases: [
      { input: "points = [[10,16],[2,8],[1,6],[7,12]]", expected: "2", description: "Overlap handled" },
      { input: "points = [[1,2],[3,4],[5,6],[7,8]]", expected: "4", description: "No overlap" }
    ],
    timeComplexity: "O(N log N) — due to sorting the balloons.",
    spaceComplexity: "O(1) auxiliary space.",
    hint: "Sort the balloons by their ending x-coordinate. Shoot the first arrow at the end of the first balloon, and see how many others it hits."
  },
  {
    id: "gr-12",
    title: "Partition Labels",
    slug: "partition-labels",
    difficulty: "Medium",
    category: "Greedy",
    timeLimit: "30 min",
    description: "You are given a string s. We want to partition the string into as many parts as possible so that each letter appears in at most one part.\n\nNote that the partition is done so that after concatenating all the parts in order, the resultant string should be s.\n\nReturn a list of integers representing the size of these parts.",
    examples: [
      { input: "s = 'ababcbacadefegdehijhklij'", output: "[9,7,8]", explanation: "The partition is 'ababcbaca', 'defegde', 'hijhklij'. Each letter appears in at most one part." }
    ],
    constraints: ["1 <= s.length <= 500", "s consists of lowercase English letters."],
    starterCode: `/**
 * @param {string} s
 * @return {number[]}
 */
function partitionLabels(s) {
  // Write your code here
  
}`,
    solution: `function partitionLabels(s) {
  const lastIndex = {};
  for (let i = 0; i < s.length; i++) {
    lastIndex[s[i]] = i;
  }
  
  const result = [];
  let start = 0;
  let end = 0;
  
  for (let i = 0; i < s.length; i++) {
    // Update the end of the current partition to be the maximum last index
    // of any character encountered so far in this partition
    end = Math.max(end, lastIndex[s[i]]);
    
    // When we reach the 'end', we found a valid partition
    if (i === end) {
      result.push(end - start + 1);
      start = i + 1;
    }
  }
  
  return result;
}`,
    testCases: [
      { input: "s = 'ababcbacadefegdehijhklij'", expected: "[9,7,8]", description: "Standard case" },
      { input: "s = 'eccbbbbdec'", expected: "[10]", description: "Single partition" }
    ],
    timeComplexity: "O(N) — two passes over the string of length N.",
    spaceComplexity: "O(1) — alphabet size is at most 26.",
    hint: "First, find the last occurrence index for each character. Then, iterate through the string and update the required end of the current partition."
  },
  // ─── Advanced (Hard) ────────────────────────────────────────────────────────
  {
    id: "gr-13",
    title: "Job Sequencing with Deadlines",
    slug: "job-sequencing-deadlines",
    difficulty: "Hard",
    category: "Greedy",
    timeLimit: "45 min",
    description: "Given a set of N jobs where each job i has a deadline and profit associated with it. Each job takes 1 unit of time to complete and only one job can be scheduled at a time. We earn the profit if and only if the job is completed by its deadline.\n\nFind the maximum profit and the number of jobs done.",
    examples: [
      { input: "id = [1,2,3,4,5], deadline = [2,1,2,1,3], profit = [100,19,27,25,15]", output: "[3, 142]", explanation: "Do job 3 (profit 27), job 1 (profit 100) and job 5 (profit 15) for max profit 142." }
    ],
    constraints: ["1 <= N <= 10^5", "1 <= deadline[i] <= N", "1 <= profit[i] <= 500"],
    starterCode: `/**
 * @param {number[]} id
 * @param {number[]} deadline
 * @param {number[]} profit
 * @return {number[]} [count, maxProfit]
 */
function jobScheduling(id, deadline, profit) {
  // Write your code here
  
}`,
    solution: `function jobScheduling(id, deadline, profit) {
  const jobs = [];
  for (let i = 0; i < id.length; i++) {
    jobs.push({ id: id[i], deadline: deadline[i], profit: profit[i] });
  }
  
  // Sort jobs descending by profit
  jobs.sort((a, b) => b.profit - a.profit);
  
  let maxDeadline = 0;
  for (let i = 0; i < jobs.length; i++) {
    maxDeadline = Math.max(maxDeadline, jobs[i].deadline);
  }
  
  // Keep track of free time slots (1-indexed)
  const slots = new Array(maxDeadline + 1).fill(-1);
  let count = 0;
  let totalProfit = 0;
  
  for (let i = 0; i < jobs.length; i++) {
    // Find a free slot starting from its deadline backwards
    for (let j = jobs[i].deadline; j > 0; j--) {
      if (slots[j] === -1) {
        slots[j] = jobs[i].id;
        count++;
        totalProfit += jobs[i].profit;
        break;
      }
    }
  }
  
  return [count, totalProfit];
}`,
    testCases: [
      { input: "id = [1,2,3,4,5], deadline = [2,1,2,1,3], profit = [100,19,27,25,15]", expected: "[3,142]", description: "Standard case" },
      { input: "id = [1,2,3,4], deadline = [4,1,1,1], profit = [20,10,40,30]", expected: "[2,60]", description: "Limited deadlines" }
    ],
    timeComplexity: "O(N log N + N * maxDeadline) — or O(N log N) using a Disjoint Set.",
    spaceComplexity: "O(maxDeadline) — slot array.",
    hint: "Sort the jobs by highest profit. For each job, try to schedule it as late as possible before its deadline."
  },
  {
    id: "gr-14",
    title: "Huffman Coding",
    slug: "huffman-coding",
    difficulty: "Hard",
    category: "Greedy",
    timeLimit: "50 min",
    description: "Given a string of characters, return the Huffman encoding of the string.\n\nHuffman coding is a lossless data compression algorithm. It assigns variable-length codes to input characters, with lengths based on the frequencies of the corresponding characters.",
    examples: [
      { input: "s = 'abcdef'", output: "Custom output depending on tree shape (often tested via total encoded length). For now, return a frequency map.", explanation: "Normally Huffman constructs a prefix tree." }
    ],
    constraints: ["1 <= s.length <= 10^5"],
    starterCode: `/**
 * @param {string} s
 * @return {number} Return the total number of bits for the encoded string
 */
function huffmanEncodingLength(s) {
  // Write your code here
  
}`,
    solution: `function huffmanEncodingLength(s) {
  if (s.length === 0) return 0;
  
  const freqMap = new Map();
  for (let char of s) {
    freqMap.set(char, (freqMap.get(char) || 0) + 1);
  }
  
  if (freqMap.size === 1) return s.length;
  
  const pq = Array.from(freqMap.values()).sort((a, b) => a - b);
  let totalBits = 0;
  
  while (pq.length > 1) {
    // Sort array (a naive priority queue for simplicity in JS)
    pq.sort((a, b) => a - b);
    
    const left = pq.shift();
    const right = pq.shift();
    
    const sum = left + right;
    totalBits += sum; // Each time nodes merge, all leaf paths under it get 1 bit longer
    
    pq.push(sum);
  }
  
  return totalBits;
}`,
    testCases: [
      { input: "s = 'abbccc'", expected: "9", description: "a:2 bits, b:2 bits, c:1 bit. 1*2 + 2*2 + 3*1 = 9" },
      { input: "s = 'a'", expected: "1", description: "Single character" }
    ],
    timeComplexity: "O(N log N) using a proper Min-Heap.",
    spaceComplexity: "O(U) where U is unique characters.",
    hint: "Use a Min-Heap (or array sorting) to continuously merge the two nodes with the lowest frequencies."
  },
  {
    id: "gr-15",
    title: "Minimum Platforms Required",
    slug: "minimum-platforms",
    difficulty: "Hard",
    category: "Greedy",
    timeLimit: "45 min",
    description: "Given the arrival and departure times of all trains that reach a railway station, find the minimum number of platforms required for the railway station so that no train is kept waiting.",
    examples: [
      { input: "arr = [900, 940, 950, 1100, 1500, 1800], dep = [910, 1200, 1120, 1130, 1900, 2000]", output: "3", explanation: "There are at most three trains at a time." }
    ],
    constraints: ["1 <= N <= 10^5", "0 <= arr[i] <= dep[i] <= 2359"],
    starterCode: `/**
 * @param {number[]} arr
 * @param {number[]} dep
 * @return {number}
 */
function findPlatform(arr, dep) {
  // Write your code here
  
}`,
    solution: `function findPlatform(arr, dep) {
  // Sort arrival and departure arrays
  arr.sort((a, b) => a - b);
  dep.sort((a, b) => a - b);
  
  let platformsNeeded = 1;
  let maxPlatforms = 1;
  
  let i = 1; // arrival index
  let j = 0; // departure index
  
  while (i < arr.length && j < dep.length) {
    // If next event is arrival, increment platforms
    if (arr[i] <= dep[j]) {
      platformsNeeded++;
      i++;
    } else {
      // If next event is departure, decrement platforms
      platformsNeeded--;
      j++;
    }
    
    maxPlatforms = Math.max(maxPlatforms, platformsNeeded);
  }
  
  return maxPlatforms;
}`,
    testCases: [
      { input: "arr = [900, 940, 950, 1100, 1500, 1800], dep = [910, 1200, 1120, 1130, 1900, 2000]", expected: "3", description: "Standard case" },
      { input: "arr = [900, 1100, 1235], dep = [1000, 1200, 1240]", expected: "1", description: "No overlapping trains" }
    ],
    timeComplexity: "O(N log N) — due to sorting both arrays.",
    spaceComplexity: "O(1) auxiliary space (or O(N) if copy needed).",
    hint: "Sort both arrival and departure arrays independently. Use two pointers to process events in chronological order."
  },
  {
    id: "gr-16",
    title: "Minimum Cost to Connect Ropes",
    slug: "minimum-cost-ropes",
    difficulty: "Hard",
    category: "Greedy",
    timeLimit: "45 min",
    description: "There are given N ropes of different lengths, we need to connect these ropes into one rope. The cost to connect two ropes is equal to sum of their lengths. Find the minimum cost to connect all the ropes.",
    examples: [
      { input: "arr = [4, 3, 2, 6]", output: "29", explanation: "Connect 2 and 3 (cost 5). Array becomes [4, 6, 5]. Connect 4 and 5 (cost 9). Array becomes [9, 6]. Connect 9 and 6 (cost 15). Total cost: 5+9+15 = 29." }
    ],
    constraints: ["1 <= arr.length <= 10^5", "1 <= arr[i] <= 10^6"],
    starterCode: `/**
 * @param {number[]} arr
 * @return {number}
 */
function minCost(arr) {
  // Write your code here
  
}`,
    solution: `function minCost(arr) {
  // Simple naive priority queue replacement for JS environment
  const pq = [...arr].sort((a, b) => a - b);
  let totalCost = 0;
  
  while (pq.length > 1) {
    // In a real environment, use a MinHeap to pop the 2 smallest.
    // Since array shift() is O(N), this works but is O(N^2) in JS.
    const first = pq.shift();
    const second = pq.shift();
    
    const cost = first + second;
    totalCost += cost;
    
    // Insert back maintaining sorted order
    let i = 0;
    while (i < pq.length && pq[i] < cost) {
      i++;
    }
    pq.splice(i, 0, cost);
  }
  
  return totalCost;
}`,
    testCases: [
      { input: "arr = [4, 3, 2, 6]", expected: "29", description: "Standard case" },
      { input: "arr = [4, 2, 7, 6, 9]", expected: "62", description: "Multiple merges" }
    ],
    timeComplexity: "O(N log N) with Min-Heap, O(N^2) with array shifts.",
    spaceComplexity: "O(N) — for the priority queue structure.",
    hint: "Always pick the two smallest available ropes and merge them. A Min-Heap is perfect for this."
  },
  {
    id: "gr-17",
    title: "Reorganize String",
    slug: "reorganize-string",
    difficulty: "Hard",
    category: "Greedy",
    timeLimit: "50 min",
    description: "Given a string s, rearrange the characters of s so that any two adjacent characters are not the same.\n\nReturn any possible rearrangement of s or return '' if not possible.",
    examples: [
      { input: "s = 'aab'", output: "'aba'", explanation: "Rearranged so 'a's aren't together." },
      { input: "s = 'aaab'", output: "''", explanation: "Impossible to separate three 'a's with one 'b'." }
    ],
    constraints: ["1 <= s.length <= 500", "s consists of lowercase English letters."],
    starterCode: `/**
 * @param {string} s
 * @return {string}
 */
function reorganizeString(s) {
  // Write your code here
  
}`,
    solution: `function reorganizeString(s) {
  const map = new Map();
  let maxFreq = 0;
  let maxChar = '';
  
  for (let char of s) {
    const freq = (map.get(char) || 0) + 1;
    map.set(char, freq);
    if (freq > maxFreq) {
      maxFreq = freq;
      maxChar = char;
    }
  }
  
  if (maxFreq > Math.floor((s.length + 1) / 2)) return '';
  
  const res = new Array(s.length);
  let idx = 0;
  
  // Fill the most frequent char at even indices first
  while (map.get(maxChar) > 0) {
    res[idx] = maxChar;
    idx += 2;
    map.set(maxChar, map.get(maxChar) - 1);
  }
  
  // Fill the rest
  for (let [char, freq] of map) {
    while (freq > 0) {
      if (idx >= res.length) {
        idx = 1; // start filling odd indices
      }
      res[idx] = char;
      idx += 2;
      freq--;
    }
  }
  
  return res.join('');
}`,
    testCases: [
      { input: "s = 'aab'", expected: "'aba'", description: "Possible" },
      { input: "s = 'aaab'", expected: "''", description: "Impossible" }
    ],
    timeComplexity: "O(N) — character frequencies and filling the array.",
    spaceComplexity: "O(1) — since alphabet is 26 characters max.",
    hint: "Count character frequencies. Find the most frequent character. If it appears more than (N+1)/2 times, it's impossible. Otherwise, place it at even indices, then fill the rest."
  },
  {
    id: "gr-18",
    title: "Remove K Digits",
    slug: "remove-k-digits",
    difficulty: "Hard",
    category: "Greedy",
    timeLimit: "45 min",
    description: "Given string num representing a non-negative integer num, and an integer k, return the smallest possible integer after removing k digits from num.",
    examples: [
      { input: "num = '1432219', k = 3", output: "'1219'", explanation: "Remove the three digits 4, 3, and 2 to form the new number 1219 which is the smallest." }
    ],
    constraints: ["1 <= k <= num.length <= 10^5", "num consists of only digits.", "num does not have any leading zeros except for the zero itself."],
    starterCode: `/**
 * @param {string} num
 * @param {number} k
 * @return {string}
 */
function removeKdigits(num, k) {
  // Write your code here
  
}`,
    solution: `function removeKdigits(num, k) {
  const stack = [];
  
  for (let digit of num) {
    // If the current digit is smaller than the top of the stack,
    // we should pop the stack to make the number smaller.
    while (k > 0 && stack.length > 0 && stack[stack.length - 1] > digit) {
      stack.pop();
      k--;
    }
    stack.push(digit);
  }
  
  // If we still have k to remove (e.g., all digits were increasing)
  while (k > 0) {
    stack.pop();
    k--;
  }
  
  // Remove leading zeros
  let res = stack.join('').replace(/^0+/, '');
  return res === '' ? '0' : res;
}`,
    testCases: [
      { input: "num = '1432219', k = 3", expected: "'1219'", description: "Standard case" },
      { input: "num = '10200', k = 1", expected: "'200'", description: "Remove to handle leading zeros" }
    ],
    timeComplexity: "O(N) — each digit is pushed/popped at most once.",
    spaceComplexity: "O(N) — using a stack.",
    hint: "Use a monotonic increasing stack. Traverse the digits, and pop from the stack if the current digit is smaller than the top of the stack and you still have k removals left."
  },
  {
    id: "gr-19",
    title: "Course Schedule III",
    slug: "course-schedule-iii",
    difficulty: "Hard",
    category: "Greedy",
    timeLimit: "55 min",
    description: "There are n different online courses numbered from 1 to n. You are given an array courses where courses[i] = [duration_i, lastDay_i] indicate that the ith course should be taken continuously for duration_i days and must be finished before or on lastDay_i.\n\nYou will start on the 1st day and you cannot take two or more courses simultaneously.\n\nReturn the maximum number of courses that you can take.",
    examples: [
      { input: "courses = [[100,200],[200,1300],[1000,1250],[2000,3200]]", output: "3", explanation: "Take the 1st, 2nd, and 3rd courses for a total duration of 1300." }
    ],
    constraints: ["1 <= courses.length <= 10^4", "1 <= duration_i, lastDay_i <= 10^4"],
    starterCode: `/**
 * @param {number[][]} courses
 * @return {number}
 */
function scheduleCourse(courses) {
  // Write your code here
  
}`,
    solution: `function scheduleCourse(courses) {
  // Sort courses by their deadlines (lastDay)
  courses.sort((a, b) => a[1] - b[1]);
  
  // Max-heap array simulation
  const selectedDurations = [];
  let time = 0;
  
  for (const [duration, lastDay] of courses) {
    if (time + duration <= lastDay) {
      // If we have time, take the course
      selectedDurations.push(duration);
      selectedDurations.sort((a, b) => a - b); // Simulate max-heap
      time += duration;
    } else if (selectedDurations.length > 0 && selectedDurations[selectedDurations.length - 1] > duration) {
      // If we don't have time but this course is shorter than the longest one we took
      // swap them to save time
      time += duration - selectedDurations.pop();
      selectedDurations.push(duration);
      selectedDurations.sort((a, b) => a - b); // Simulate max-heap
    }
  }
  
  return selectedDurations.length;
}`,
    testCases: [
      { input: "courses = [[100,200],[200,1300],[1000,1250],[2000,3200]]", expected: "3", description: "Standard case" },
      { input: "courses = [[1,2]]", expected: "1", description: "Single course" }
    ],
    timeComplexity: "O(N log N) using a true Priority Queue (the array sort approach is O(N^2)).",
    spaceComplexity: "O(N) — storing selected durations.",
    hint: "Sort the courses by their deadlines. Keep track of the taken courses in a max-heap (by duration). If you miss a deadline, drop the course with the longest duration you've taken so far."
  }
];

export default GREEDY_CHALLENGES;
