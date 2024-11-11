---
id: josephus-queries
title: Josephus Queries Problem
sidebar_label: Josephus Queries
sidebar_position: 1
description: "In this post, we'll explore the Josephus Queries problem, where children are removed from a circle in a specific order. We will discuss the recursive approach to find out which child is removed at a given position and provide solutions in multiple languages such as C++, Java, Python, JavaScript, and Go. By the end, you'll understand how to efficiently determine the order of removals."
tags: [dsa, recursion, josephus]
---

## Problem Statement
You are given `n` children numbered from `1` to `n` standing in a circle. Every second child is removed until no children are left. The task is to process `q` queries, where each query specifies `n` and `k`, and you need to determine which child is the `k`-th to be removed.

### Objective
- For each query, return the position of the `k`-th child that will be removed.

### Example
```plaintext
Input:
4
7 1
7 3
2 2
1337 1313

Output:
2
6
1
1107
```

## Constraints
- $1 \leq q \leq 100,000$  
- $1 \leq k \leq n \leq 1,000,000,000$ 

## Solution
This solution employs a recursive approach to solve the Josephus Queries problem.

### Recursive Approach
The problem can be defined recursively as follows:

1. If there is only one child, the only child present is the one that is removed.
2. For more than one child, the $k^{th}$ removal can be computed by reducing the problem size by 1 each time we remove a child.

### Recursive Function Definition
Let `josephus(n, k)` be the function that returns the position of the $k^{th}$ child to be removed when there are $n$ children.

#### Base Case
- If $n = 1$, return $1$ (the only child).

#### Recursive Case
- If there are more than one child, the position of the $k^{th}$ child can be found using:
$$  
josephus(n, k) =  
\begin{cases} 
0 & \text{if } n = 1, \\  
(josephus(n-1, k) + k) \% n & \text{if } n > 1.  
\end{cases}  
$$  
  This gives the position in the new configuration after one child has been removed.

### Final Adjustment
Since our function will return a 0-based index, we will need to add $1$ to convert it back to a $1$-based index.

## Time and Space Complexity
- **Time Complexity:** $O(n)$, where $n$ is the number of children.
- **Space Complexity:** $O(n)$ due to the recursive stack space.

## Code Implementation

C++
```cpp
#include <iostream>
using namespace std;

int josephus(int n, int k) {
    if (n == 1) return 1;
    return (josephus(n - 1, k) + k - 1) % n + 1;
}

int main() {
    int q;
    cin >> q;
    while (q--) {
        int n, k;
        cin >> n >> k;
        cout << josephus(n, k) << endl;
    }
    return 0;
}
```

Java:

```java
import java.util.Scanner;

class Solution {
    public int josephus(int n, int k) {
        if (n == 1) return 1;
        return (josephus(n - 1, k) + k - 1) % n + 1;
    }

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        int q = scanner.nextInt();
        Solution solution = new Solution();
        while (q-- > 0) {
            int n = scanner.nextInt();
            int k = scanner.nextInt();
            System.out.println(solution.josephus(n, k));
        }
        scanner.close();
    }
}
```

Python: 

```python
def josephus(n, k):
    if n == 1:
        return 1
    return (josephus(n - 1, k) + k - 1) % n + 1

q = int(input())
for _ in range(q):
    n, k = map(int, input().split())
    print(josephus(n, k))
```

Javascript:

```javascript
function josephus(n, k) {
    if (n === 1) return 1;
    return (josephus(n - 1, k) + k - 1) % n + 1;
}

const q = parseInt(readline());
for (let i = 0; i < q; i++) {
    const [n, k] = readline().split(' ').map(Number);
    console.log(josephus(n, k));
}
```

Go:

```go
package main

import (
	"fmt"
)

func josephus(n, k int) int {
	if n == 1 {
		return 1
	}
	return (josephus(n-1, k) + k - 1) % n + 1
}

func main() {
	var q int
	fmt.Scan(&q)
	for i := 0; i < q; i++ {
		var n, k int
		fmt.Scan(&n, &k)
		fmt.Println(josephus(n, k))
	}
}
```

## Conclusion
The Josephus problem presents a fascinating exploration of recursive algorithms and their efficiency in solving complex queries. By employing a recursive approach, we can derive the position of the $k^{th}$ child to be removed in a circle of $n$ children efficiently. Despite the recursive nature of the solution leading to a time complexity of  $O(n)$ and a space complexity of $O(n)$, it effectively highlights the power of recursion in algorithm design.


