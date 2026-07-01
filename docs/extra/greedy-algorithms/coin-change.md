---
id: coin-change-greedy
title: Coin Change Problem (Greedy Approach)
sidebar_label: Coin Change (Greedy)
sidebar_position: 8
description: The greedy approach to the coin change problem, its applicability, and limitations.
tags: [greedy, algorithm, coin-change, coins]
---

The Coin Change Problem asks for the minimum number of coins needed to make a target change amount $V$ using a given set of coin denominations.

## Real-World Analogy

When a cashier gives you change, they automatically pick the largest possible denominations first. For example, to give $\$0.87$ in change, they will give you $3$ quarters ( $\$0.75$), $1$ dime ( $\$0.85$), and $2$ pennies ( $\$0.87$).

## Greedy Choice Property

At each step, we **choose the largest denomination** coin that is less than or equal to the remaining target amount.

### Why/When Greedy Works

The greedy approach is guaranteed to yield the optimal solution only for **canonical coin systems** (such as standard US coins or Euro coins).

For example, with standard US denominations $\{1, 5, 10, 25\}$, the greedy approach is always optimal.

### When Greedy Fails

If the coin denominations are arbitrary, greedy can fail.
For example, with denominations $\{1, 3, 4\}$ and a target of $6$:

* **Greedy Choice:** $4 + 1 + 1 = 6$ ($3$ coins)
* **Optimal Choice:** $3 + 3 = 6$ ($2$ coins)

For general coin systems, a Dynamic Programming approach is required to guarantee optimality.

## Complexity Analysis

* **Time Complexity:** $O(N \log N + N)$ where $N$ is the number of coin denominations (due to sorting the denominations in descending order). If they are already sorted, it is $O(N)$.
* **Space Complexity:** $O(1)$ auxiliary space.

## Implementation

### Python

```python
def get_min_coins(coins, value):
    # Sort coins in descending order
    coins.sort(reverse=True)
    
    result = []
    for coin in coins:
        while value >= coin:
            value -= coin
            result.append(coin)
            
    if value > 0:
         # Target could not be fully changed (should not happen if 1 is in the coins set)
         return []
    return result
```

### C++

```cpp
#include <iostream>
#include <vector>
#include <algorithm>

void findMinCoins(std::vector<int>& coins, int value) {
    std::sort(coins.rbegin(), coins.rend());
    std::vector<int> result;
    
    for (int coin : coins) {
        while (value >= coin) {
            value -= coin;
            result.push_back(coin);
        }
    }
    
    std::cout << "Coins used: ";
    for (int coin : result) {
        std::cout << coin << " ";
    }
    std::cout << "\nTotal Coins: " << result.size() << std::endl;
}
```
