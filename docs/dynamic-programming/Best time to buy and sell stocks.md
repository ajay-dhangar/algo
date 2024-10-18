# 📊 Best Time to Buy and Sell Stock Problems (1-5) - Dynamic Programming Solutions

## Problem 1: Best Time to Buy and Sell Stock I
You are given an array `prices` where `prices[i]` is the price of a given stock on the ith day. You want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock. Return the maximum profit you can achieve from this transaction. If no profit can be achieved, return 0.

### Solution Approach:
#### Problem Breakdown:
- The goal is to find the maximum profit from a single transaction (buy and sell once).

- As we move through the prices array, we need to keep track of the minimum price encountered so far and calculate the profit if we sell on the current day.
- The maximum profit is the difference between the current price and the minimum price seen so far.
#### Approach:
- Define min_price as the minimum price we encounter while traversing the array.
- For each day i, calculate the profit as prices[i] - min_price.
- Update min_price to ensure it holds the minimum price encountered so far.
- Keep track of the max_profit during the traversal.
#### Algorithm:
- Initialize min_price to a large value (infinity).
- Initialize max_profit to 0.
#### Traverse the array:
- For each day i, update min_price to be the minimum between min_price and prices[i].
- Calculate the current profit as prices[i] - min_price.
Update max_profit to be the maximum between max_profit and the current profit.
- Return max_profit at the end.
### Example:
```
Input: prices = [7,1,5,3,6,4]
Output: 5
Explanation: Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6 - 1 = 5. 
```
```
Input: prices = [7,6,4,3,1]
Output: 0
Explanation: In this case, no transaction is done, and the max profit = 0.
```
### Code:
```cpp
int maxProfit(vector<int>& prices) {
    int min_price = INT_MAX;
    int max_profit = 0;

    for (int i = 0; i < prices.size(); i++) {
        // Update min_price if current price is lower
        if (prices[i] < min_price) {
            min_price = prices[i];
        }
        // Calculate profit if we sell on day i
        int profit = prices[i] - min_price;
        // Update max_profit
        if (profit > max_profit) {
            max_profit = profit;
        }
    }

    return max_profit;
}
```
### Explanation:
- min_price keeps track of the lowest price up to the current day.
- For each day, we calculate the potential profit if we were to sell on that day.
- max_profit ensures that we always store the best profit possible.
- We iterate through the array once, ensuring an efficient O(n) time complexity.
### Time Complexity:
O(n), where n is the number of days. We loop through the prices array once.
### Space Complexity:
O(1), since we only use two variables (min_price and max_profit) to store the intermediate results.
## Problem 2: Best Time to Buy and Sell Stock II
You are given an array `prices` where `prices[i]` is the price of a given stock on the ith day.  
You want to maximize your profit by choosing a day to buy one stock and choosing a different day in the future to sell that stock. You may complete as many transactions as you like (i.e., buy one and sell one share of the stock multiple times).

**Note**: You may not engage in multiple transactions simultaneously (i.e., you must sell the stock before you buy again).

### Example:
```bash
Input: prices = [7,1,5,3,6,4]
Output: 7
Explanation: Buy on day 2 (price = 1) and sell on day 3 (price = 5), profit = 5-1 = 4. 
           - Then buy on day 4 (price = 3) and sell on day 5 (price = 6), profit = 6-3 = 3.
```
```bash
Input: prices = [1,2,3,4,5]
Output: 4
Explanation: Buy on day 1 (price = 1) and sell on day 5 (price = 5), profit = 5-1 = 4. 
           - You cannot do multiple transactions simultaneously, so you must sell before buying again.
```
### Solution Approach:
#### Problem Breakdown:
In this approach, we will use dynamic programming to track the maximum profit in different states:

- hold[i]: The maximum profit on day i when we hold a stock (we have already bought a stock).
- sold[i]: The maximum profit on day i when we don't hold any stock (we have already sold a stock).
### Transitions:
If we hold a stock on day i: We either bought it today, or we held it from the previous day:

- hold[i] = max(hold[i-1], sold[i-1] - prices[i])
If we sold the stock on day i: We either sold it today or kept the state from the previous day:

- sold[i] = max(sold[i-1], hold[i-1] + prices[i])
### Base Case:
- On day 0, if we hold a stock, the profit is -prices[0] (we bought the stock).
- On day 0, if we sold a stock, the profit is 0 (we haven't bought any stock yet).

### Code:
```cpp
int maxProfit(vector<int>& prices) {
    int n = prices.size();
    if (n == 0) return 0;

    // Initial state (day 0)
    int hold = -prices[0];  // If we buy on day 0
    int sold = 0;           // If we don't buy on day 0

    for (int i = 1; i < n; i++) {
        int prev_sold = sold;  // Store previous sold value
        sold = max(sold, hold + prices[i]);  // Either we sold today or remained sold
        hold = max(hold, prev_sold - prices[i]);  // Either we bought today or remained holding
    }

    return sold;  // Max profit is in the sold state (since we can't end while holding)
}
```
### Explanation:
- hold[i] keeps track of the maximum profit we can have if we hold a stock on day i.
- sold[i] keeps track of the maximum profit we can have if we sell a stock on day i.
- The final result is in the sold state, because we want to end the process having sold all the stocks.
### Time Complexity:
- O(n), where n is the number of days. We loop through the prices array once.
### Space Complexity:
- O(1), since we are only using two variables (hold and sold) to store the current state.

## Problem 3: Best Time to Buy and Sell Stock III
You are given an array `prices` where `prices[i]` is the price of a given stock on the `i`-th day.

Find the maximum profit you can achieve. You may complete at most two transactions.

### Example:
```bash
Input: prices = [3,2,6,5,0,3]
Output: 7
Explanation: 
- Buy on day 2 (price = 2) and sell on day 3 (price = 6), profit = 6-2 = 4.
- Then buy on day 5 (price = 0) and sell on day 6 (price = 3), profit = 3-0 = 3.
- Total profit = 4 + 3 = 7.
```
```bash
Input: prices = [1,2,3,4,5]
Output: 4
Explanation: 
- Buy on day 0 (price = 1) and sell on day 4 (price = 5), profit = 5-1 = 4.
- Total profit = 4.
```
### Solution Approach:
#### Problem Breakdown:
To maximize profit while allowing at most two transactions, we can break the problem into two parts:

- Calculate the maximum profit for the first transaction from day 0 to day i.
- Calculate the maximum profit for the second transaction from day i to the last day.
#### Approach:
We will use two arrays:

- first_profit[i]: The maximum profit that can be made from day 0 to day i.
- second_profit[i]: The maximum profit that can be made from day i to the last day.
#### Algorithm Steps:
- Initialize the first_profit and second_profit arrays.
- Calculate the maximum profit for the first transaction up to each day.
- Calculate the maximum profit for the second transaction from each day to the end.
- Combine the results to find the maximum profit achievable with two transactions.

### Code:
```cpp
int maxProfit(vector<int>& prices) {
    int n = prices.size();
    if (n == 0) return 0;

    vector<int> first_profit(n, 0);
    vector<int> second_profit(n, 0);

    // Calculate maximum profit for the first transaction
    int min_price = prices[0];
    for (int i = 1; i < n; i++) {
        min_price = min(min_price, prices[i]);
        first_profit[i] = max(first_profit[i - 1], prices[i] - min_price);
    }

    // Calculate maximum profit for the second transaction
    int max_price = prices[n - 1];
    for (int i = n - 2; i >= 0; i--) {
        max_price = max(max_price, prices[i]);
        second_profit[i] = max(second_profit[i + 1], max_price - prices[i]);
    }

    // Combine profits from the two transactions
    int max_profit = 0;
    for (int i = 0; i < n; i++) {
        max_profit = max(max_profit, first_profit[i] + second_profit[i]);
    }

    return max_profit;
}
```
### Explanation:
- first_profit[i] captures the maximum profit achievable with one transaction from day 0 to i.
- second_profit[i] captures the maximum profit achievable with one transaction from day i to the last day.
- By combining both profits, we find the maximum profit obtainable with at most two transactions.
### Time Complexity:
O(n), where n is the number of days. We iterate through the prices array twice.
### Space Complexity:
O(n), due to the two auxiliary arrays (first_profit and second_profit). This can be optimized to O(1) by keeping track of only the necessary variables.

## Problem 4: Best Time to Buy and Sell Stock IV
You are given an integer `k` and an array `prices` where `prices[i]` is the price of a given stock on the `i`-th day.

Design an algorithm to find the maximum profit you can achieve. You may complete at most `k` transactions.

**Note**: You may not engage in multiple transactions simultaneously (i.e., you must sell the stock before you buy again).

### Example:
```bash
Input: k = 2, prices = [2,4,1]
Output: 2
Explanation: Buy on day 1 (price = 2) and sell on day 2 (price = 4), profit = 4-2 = 2.
```
```
Input: k = 2, prices = [3,2,6,5,0,3]
Output: 7
Explanation: Buy on day 2 (price = 2) and sell on day 3 (price = 6), profit = 6-2 = 4.
           - Then buy on day 5 (price = 0) and sell on day 6 (price = 3), profit = 3-0 = 3.
```
### Solution Approach:
#### Problem Breakdown:
This problem is an extension of the previous ones, but now we are limited to at most k transactions. Each transaction consists of buying and selling a stock.

To solve this using dynamic programming, we define:

- dp[t][i]: The maximum profit on day i with at most t transactions.

The idea is to compute the maximum profit day-by-day while limiting the number of transactions.

### Approach:
- If k >= len(prices) / 2, we can complete as many transactions as we want (problem reduces to Best Time to Buy and Sell Stock II).
- Otherwise, use dynamic programming to solve for k transactions.
### Transitions:
- For each transaction t, we compute the maximum profit up to day i:

- dp[t][i] = max(dp[t][i-1], prices[i] + max_diff)
- max_diff = max(max_diff, dp[t-1][i-1] - prices[i])
  
The max_diff stores the maximum profit obtainable up to day i-1 for t-1 transactions, minus the price of the stock.

### Algorithm:
- Create a 2D dp array where dp[t][i] represents the maximum profit with at most t transactions up to day i.
- Initialize the base cases where dp[0][i] = 0 (no profit without any transactions).
- Loop through the transactions and days, updating the dp values based on previous transactions and day values.
### Code:
```cpp
int maxProfit(int k, vector<int>& prices) {
    int n = prices.size();
    if (n == 0) return 0;

    // If k >= n/2, it means we can perform unlimited transactions
    if (k >= n / 2) {
        int maxProfit = 0;
        for (int i = 1; i < n; i++) {
            if (prices[i] > prices[i - 1]) {
                maxProfit += prices[i] - prices[i - 1];
            }
        }
        return maxProfit;
    }

    // Initialize dp table
    vector<vector<int>> dp(k + 1, vector<int>(n, 0));

    // Fill the dp table
    for (int t = 1; t <= k; t++) {
        int max_diff = -prices[0];
        for (int i = 1; i < n; i++) {
            dp[t][i] = max(dp[t][i - 1], prices[i] + max_diff);
            max_diff = max(max_diff, dp[t - 1][i] - prices[i]);
        }
    }

    return dp[k][n - 1];
}
```
### Explanation:
- dp[t][i]: Represents the maximum profit obtainable with at most t transactions up to day i.
- max_diff: Stores the best opportunity to buy on or before day i-1 for t-1 transactions.
- We iterate through each transaction level t and each day i, updating the maximum profit using previous values.
### Time Complexity:
O(k * n), where k is the number of transactions and n is the number of days. We iterate over each transaction and each day.
### Space Complexity:
O(k * n), due to the 2D dp array used to store the intermediate states.


## Problem 5: Best Time to Buy and Sell Stock with Cooldown
You are given an array `prices` where `prices[i]` is the price of a given stock on the `i`-th day.

Find the maximum profit you can achieve. You may complete as many transactions as you like (i.e., buy one and sell one share of the stock multiple times) with the following restriction:
- After you sell your stock, you cannot buy stock on the next day (i.e., there is a **cooldown** of 1 day).

### Example:
```
Input: prices = [1,2,3,0,2]
Output: 3
Explanation: Transactions = [buy, sell, cooldown, buy, sell], profit = 3.
```
```
Input: prices = [7,1,5,3,6,4]
Output: 5
Explanation: Transactions = [buy, sell, cooldown, buy, sell], profit = 5.
```
### Solution Approach:
#### Problem Breakdown:
To maximize profit, we need to account for multiple transactions, but after each sell, a cooldown of 1 day is required.

We define three states:

- sell[i]: Maximum profit on day i if we sell the stock.
- buy[i]: Maximum profit on day i if we buy the stock.
- cooldown[i]: Maximum profit on day i if we are in the cooldown period.
### Transitions:
If we buy on day i: We either bought today, or we carried forward the buying state from the previous day.

- buy[i] = max(buy[i-1], cooldown[i-1] - prices[i])
If we sell on day i: We must have bought the stock on a previous day, and then sold it today.

- sell[i] = buy[i-1] + prices[i]
If we are in cooldown on day i: We either stayed in cooldown from the previous day or just sold today.

- cooldown[i] = max(cooldown[i-1], sell[i-1])
### Base Case:
- On day 0, buy[0] = -prices[0] (because we bought the stock), sell[0] = 0 (no profit yet), and cooldown[0] = 0.

```cpp
int maxProfit(vector<int>& prices) {
    if (prices.empty()) return 0;
    
    int n = prices.size();
    vector<int> buy(n, 0), sell(n, 0), cooldown(n, 0);

    // Base case for day 0
    buy[0] = -prices[0]; // Buy the stock on day 0
    sell[0] = 0;         // Cannot sell on day 0
    cooldown[0] = 0;     // No cooldown on day 0

    for (int i = 1; i < n; i++) {
        buy[i] = max(buy[i - 1], cooldown[i - 1] - prices[i]); // Buy or cooldown
        sell[i] = buy[i - 1] + prices[i];                      // Sell
        cooldown[i] = max(cooldown[i - 1], sell[i - 1]);       // Cooldown or remain
    }

    // Maximum profit is either we sell or are in cooldown on the last day
    return max(sell[n - 1], cooldown[n - 1]);
}
```
### Explanation:
- buy[i] keeps track of the maximum profit if we bought a stock on day i.
- sell[i] keeps track of the maximum profit if we sold the stock on day i.
- cooldown[i] keeps track of the maximum profit when we are in a cooldown period on day i.
- The transitions ensure that the solution adheres to the problem constraint of a 1-day cooldown after selling.
### Time Complexity:
O(n), where n is the number of days. We loop through the prices array once.
### Space Complexity:
O(n), since we store buy, sell, and cooldown arrays of size n. This can be optimized to O(1) by only keeping track of the previous day's values.
