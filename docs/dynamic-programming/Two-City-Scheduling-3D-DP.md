# Two City Scheduling Problem

## Problem Statement
You are given two cities, `A` and `B`, and a list of people, where each person has a cost associated with flying to either city. Your goal is to find the optimal way to send `N` people to city `A` and `N` people to city `B` such that the total cost is minimized.

The input consists of an array `costs` where `costs[i] = [aCost, bCost]`, which represents the cost of flying the `i-th` person to city `A` and city `B`. 

### Objective
- Return the minimum total cost to send `N` people to each city.

### Example
```plaintext
Input: costs = [[10,20],[30,200],[50,30],[200,500]]
Output: 370
```


### Constraints
- `2 * n == costs.length`
- `2 <= costs.length <= 100`
- `costs.length` is even.
- `1 <= aCosti, bCosti <= 1000`

## Solution
This solution employs a dynamic programming approach to solve the Two City Scheduling problem.

### Dynamic Programming Approach

**DP Array Initialization:**

We initialize a 3D DP array `dp[i][wA][wB]`, where:
- `i` represents the first `i` people considered.
- `wA` represents the number of people sent to city `A`.
- `wB` represents the number of people sent to city `B`.

**Base Case:**

For `0` people, the total cost is `0` (no one is sent).

**Transition:**

For each person, we can choose to send them to either city `A` or city `B`, updating our DP table accordingly:
- If a person is sent to city `A`, we reduce the count of people going to city `A` and add the cost of sending them there.
- Similarly, if sent to city `B`, we reduce the count of people going to city `B` and add the respective cost.

**Final Calculation:**

The minimum total cost will be found in `dp[2 * N][N][N]`.

### Time and Space Complexity
- **Time Complexity:** O(N³), where N is half the size of the costs array.
- **Space Complexity:** O(N³) due to the 3D DP array.

### Code Implementation

C++:
```cpp
class Solution {
public:
    int twoCitySchedCost(vector<vector<int>>& costs) {        
        int N = costs.size() / 2;
        int dp[2 * N + 1][N + 1][N + 1];
        for (int i = 0; i <= N; ++i) {
            for (int j = 0; j <= N; ++j) {
                dp[0][i][j] = 0;
            }
        }
        for (int i = 1; i <= 2 * N; ++i) {
            for (int wA = 1; wA <= N; ++wA) {
                if (dp[i - 1][wA - 1][0] == INT_MAX) {
                    dp[i][wA][0] = INT_MAX;
                } else {
                    dp[i][wA][0] = costs[i - 1][0] + dp[i - 1][wA - 1][0];
                }
            }
            for (int wB = 1; wB <= N; ++wB) {
                if (dp[i - 1][0][wB - 1] == INT_MAX) {
                    dp[i][0][wB] = INT_MAX;
                } else {
                    dp[i][0][wB] = costs[i - 1][1] + dp[i - 1][0][wB - 1];
                }
            }
            dp[i][0][0] = INT_MAX;
        }
        
        for (int i = 1; i <= 2 * N; ++i) {
            for (int wA = 1; wA <= N; ++wA) {
                for (int wB = 1; wB <= N; ++wB) {
                    if (dp[i - 1][wA - 1][wB] == INT_MAX) {
                        dp[i][wA][wB] = costs[i - 1][1];
                    } else if (dp[i - 1][wA][wB - 1] == INT_MAX) {
                        dp[i][wA][wB] = costs[i - 1][0];
                    } else {
                        dp[i][wA][wB] = min(costs[i - 1][0] + dp[i - 1][wA - 1][wB],
                                        costs[i - 1][1] + dp[i - 1][wA][wB - 1]);
                    }
                }
            }
        }   
        return dp[2 * N][N][N];
    }
};
```

Java:
```java
class Solution {
    public int twoCitySchedCost(int[][] costs) {
        int N = costs.length / 2;
        int[][][] dp = new int[2 * N + 1][N + 1][N + 1];
        
        for (int i = 0; i <= N; i++) {
            for (int j = 0; j <= N; j++) {
                dp[0][i][j] = 0;
            }
        }
        
        for (int i = 1; i <= 2 * N; i++) {
            for (int wA = 1; wA <= N; wA++) {
                if (dp[i - 1][wA - 1][0] == Integer.MAX_VALUE) {
                    dp[i][wA][0] = Integer.MAX_VALUE;
                } else {
                    dp[i][wA][0] = costs[i - 1][0] + dp[i - 1][wA - 1][0];
                }
            }
            for (int wB = 1; wB <= N; wB++) {
                if (dp[i - 1][0][wB - 1] == Integer.MAX_VALUE) {
                    dp[i][0][wB] = Integer.MAX_VALUE;
                } else {
                    dp[i][0][wB] = costs[i - 1][1] + dp[i - 1][0][wB - 1];
                }
            }
            dp[i][0][0] = Integer.MAX_VALUE;
        }
        
        for (int i = 1; i <= 2 * N; i++) {
            for (int wA = 1; wA <= N; wA++) {
                for (int wB = 1; wB <= N; wB++) {
                    if (dp[i - 1][wA - 1][wB] == Integer.MAX_VALUE) {
                        dp[i][wA][wB] = costs[i - 1][1];
                    } else if (dp[i - 1][wA][wB - 1] == Integer.MAX_VALUE) {
                        dp[i][wA][wB] = costs[i - 1][0];
                    } else {
                        dp[i][wA][wB] = Math.min(costs[i - 1][0] + dp[i - 1][wA - 1][wB],
                                                costs[i - 1][1] + dp[i - 1][wA][wB - 1]);
                    }
                }
            }
        }
        
        return dp[2 * N][N][N];
    }
}
```

Python:
```python
class Solution:
    def twoCitySchedCost(self, costs: List[List[int]]) -> int:
        N = len(costs) // 2
        dp = [[[0] * (N + 1) for _ in range(N + 1)] for _ in range(2 * N + 1)]
        
        for i in range(1, 2 * N + 1):
            for wA in range(1, N + 1):
                if dp[i - 1][wA - 1][0] == float('inf'):
                    dp[i][wA][0] = float('inf')
                else:
                    dp[i][wA][0] = costs[i - 1][0] + dp[i - 1][wA - 1][0]

            for wB in range(1, N + 1):
                if dp[i - 1][0][wB - 1] == float('inf'):
                    dp[i][0][wB] = float('inf')
                else:
                    dp[i][0][wB] = costs[i - 1][1] + dp[i - 1][0][wB - 1]
            
            dp[i][0][0] = float('inf')

        for i in range(1, 2 * N + 1):
            for wA in range(1, N + 1):
                for wB in range(1, N + 1):
                    if dp[i - 1][wA - 1][wB] == float('inf'):
                        dp[i][wA][wB] = costs[i - 1][1]
                    elif dp[i - 1][wA][wB - 1] == float('inf'):
                        dp[i][wA][wB] = costs[i - 1][0]
                    else:
                        dp[i][wA][wB] = min(costs[i - 1][0] + dp[i - 1][wA - 1][wB],
                                            costs[i - 1][1] + dp[i - 1][wA][wB - 1])

        return dp[2 * N][N][N]
```

Javascript:
```javascript
class Solution {
    twoCitySchedCost(costs) {
        const N = costs.length / 2;
        const dp = Array.from({ length: 2 * N + 1 }, () => 
            Array.from({ length: N + 1 }, () => Array(N + 1).fill(0))
        );

        for (let i = 0; i <= N; i++) {
            for (let j = 0; j <= N; j++) {
                dp[0][i][j] = 0;
            }
        }

        for (let i = 1; i <= 2 * N; i++) {
            for (let wA = 1; wA <= N; wA++) {
                dp[i][wA][0] = dp[i - 1][wA - 1][0] === Infinity ? Infinity : costs[i - 1][0] + dp[i - 1][wA - 1][0];
            }
            for (let wB = 1; wB <= N; wB++) {
                dp[i][0][wB] = dp[i - 1][0][wB - 1] === Infinity ? Infinity : costs[i - 1][1] + dp[i - 1][0][wB - 1];
            }
            dp[i][0][0] = Infinity;
        }

        for (let i = 1; i <= 2 * N; i++) {
            for (let wA = 1; wA <= N; wA++) {
                for (let wB = 1; wB <= N; wB++) {
                    if (dp[i - 1][wA - 1][wB] === Infinity) {
                        dp[i][wA][wB] = costs[i - 1][1];
                    } else if (dp[i - 1][wA][wB - 1] === Infinity) {
                        dp[i][wA][wB] = costs[i - 1][0];
                    } else {
                        dp[i][wA][wB] = Math.min(costs[i - 1][0] + dp[i - 1][wA - 1][wB], 
                                                 costs[i - 1][1] + dp[i - 1][wA][wB - 1]);
                    }
                }
            }
        }
        
        return dp[2 * N][N][N];
    }
}
```

Go:
```go
package main

import (
	"math"
)

func twoCitySchedCost(costs [][]int) int {
	N := len(costs) / 2
	dp := make([][][]int, 2*N+1)
	for i := range dp {
		dp[i] = make([][]int, N+1)
		for j := range dp[i] {
			dp[i][j] = make([]int, N+1)
		}
	}

	for i := 0; i <= N; i++ {
		for j := 0; j <= N; j++ {
			dp[0][i][j] = 0
		}
	}

	for i := 1; i <= 2*N; i++ {
		for wA := 1; wA <= N; wA++ {
			if dp[i-1][wA-1][0] == math.MaxInt {
				dp[i][wA][0] = math.MaxInt
			} else {
				dp[i][wA][0] = costs[i-1][0] + dp[i-1][wA-1][0]
			}
		}
		for wB := 1; wB <= N; wB++ {
			if dp[i-1][0][wB-1] == math.MaxInt {
				dp[i][0][wB] = math.MaxInt
			} else {
				dp[i][0][wB] = costs[i-1][1] + dp[i-1][0][wB-1]
			}
		}
		dp[i][0][0] = math.MaxInt
	}

	for i := 1; i <= 2*N; i++ {
		for wA := 1; wA <= N; wA++ {
			for wB := 1; wB <= N; wB++ {
				if dp[i-1][wA-1][wB] == math.MaxInt {
					dp[i][wA][wB] = costs[i-1][1]
				} else if dp[i-1][wA][wB-1] == math.MaxInt {
					dp[i][wA][wB] = costs[i-1][0]
				} else {
					dp[i][wA][wB] = min(costs[i-1][0]+dp[i-1][wA-1][wB],
						costs[i-1][1]+dp[i-1][wA][wB-1])
				}
			}
		}
	}

	return dp[2*N][N][N]
}

func min(a, b int) int {
	if a < b {
		return a
	}
	return b
}
```

### Conclusion
This solution effectively utilizes dynamic programming to optimize the process of scheduling flights to two cities, significantly reducing the computational complexity compared to a brute-force approach. By leveraging a 3D DP array, we ensure that we only compute each state once, leading to an efficient solution.