id: knapsack-disaster-relief 

title: 0/1 Knapsack Problem: Optimizing Disaster Relief Supply Packing 

sidebar\_label: Knapsack for Disaster Relief 

sidebar\_position : 1 

description: Solving the 0/1 Knapsack problem to optimize the packing of supplies for disaster relief missions. tags: [Knapsack, Dynamic Programming, Disaster Relief, Algorithms] 

**0/1 Knapsack Problem: Optimizing Disaster Relief Supply Packing** 

In real-world scenarios, the 0/1 Knapsack Problem can be used to optimize packing decisions for disaster relief missions. The goal is to maximize the priority of supplies (such as food, medical supplies, and blankets) that can be loaded into a truck with limited capacity. 

**Problem Description :-** 

You are part of a disaster relief team, and you need to pack a limited-capacity truck with supplies. The truck has a weight limit of `W` kilograms, and you have several different types of supplies available. Each type of supply has: 

- **Weight** : The weight of the supply. 
- **Priority score** : How essential the supply is for the mission (e.g., medical supplies are more critical than blankets). The task is to maximize the total priority score of supplies packed into the truck without exceeding the weight limit. 

**Input:** 

- `W` (integer): Maximum weight capacity of the truck. 
- A list of `n` items, where each item has: 
  - `weight[i]`: The weight of the i-th supply. 
  - `value[i]`: The priority score of the i-th supply. 

` `**Output:** 

- The maximum total priority score that can be achieved by packing supplies without exceeding the weight limit.  **Example Scenario :** 

  Consider a scenario where the truck capacity is  **50** kg , and the available supplies are: 

- Supply 1: 10 kg, priority score 60 
- Supply 2: 20 kg, priority score 100 
- Supply 3: 30 kg, priority score 120 

You can't pack all three supplies as their combined weight (10 + 20 + 30 = 60 kg) exceeds the truck's capacity. The optimal choice is to pack supplies 2 and 3, which gives a total weight of 50 kg and a priority score of **220**. 

**Algorithm and Solution :-**

The 0/1 Knapsack problem can be solved using **Dynamic Programming** . Here's the C++ implementation: **CPP CODE :** 

#include <iostream> !
#include <vector> 
using namespace std; 

// Function to solve the 0/1 Knapsack Problem 

int knapsack(int W, vector<int>& weights, vector<int>& values, int n) 
{     vector<vector<int>> dp(n + 1, vector<int>(W + 1, 0)); 

`    `for (int i = 1; i <= n; i++) { 

`        `for (int w = 0; w <= W; w++) { 

`            `if (weights[i - 1] <= w) { 

`                `dp[i][w] = max(dp[i - 1][w], dp[i - 1][w - weights[i - 1]] + values[i - 1]); 

`            `} else { 

`                `dp[i][w] = dp[i - 1][w]; 

`            `} 

`        `} 

`    `} 

`    `return dp[n][W]; } 

int main() { 

`    `int W = 50; 

`    `vector<int> weights = {10, 20, 30};     vector<int> values = {60, 100, 120};     int n = weights.size(); 

cout << "Maximum priority score: " << knapsack(W, weights, values, n) << endl;
`    `return 0;
 } 

**Explanation of Code:** 

1. **Dynamic Programming Table**: 
- A 2D array dp[n+1][W+1] is used to store the maximum priority score for each subproblem. 
- The first dimension corresponds to the number of items considered. 
- The second dimension corresponds to the weight capacity from 0 to W. 
2. **Decision Making**: 
- For each item, the algorithm checks if its weight is less than or equal to the current weight w being considered. 
- If yes, we decide whether to include it or not by taking the maximum value between: 
- Excluding the item (same value as before). 
- Including the item (add its value and reduce the available capacity). 
3. **Result**: 
- The final result is stored in dp[n][W], which gives the maximum achievable priority score without exceeding the weight capacity. 
