# Fruit Into Baskets ( Leetcode-904)

## Description
Given a collection of fruits represented as integers, the goal is to find the maximum number of fruits you can collect in a basket where you can only have at most two types of fruits at any time.

## Problem Definition
- **Input**: A vector of integers `fruits`, where each integer represents a type of fruit.
- **Output**: Return the maximum number of fruits that can be collected in the basket.

## Example
- **Input**: 
  - `fruits = [1, 2, 1]`
  
- **Output**: 
  - `3` (You can collect all three fruits since there are only two types: 1 and 2).

## Algorithm Overview
1. Use a sliding window approach to maintain a range of fruit types collected.
2. Use a HashMap to count the number of each fruit type within the current window.
3. Expand the right boundary of the window and contract the left boundary if the number of distinct fruit types exceeds two.
4. Keep track of the maximum size of the window throughout the process.

## Time Complexity
- O(n) - where `n` is the number of fruits in the input array.

## C++ Implementation

```cpp
#include <iostream>
#include <vector>
#include <unordered_map>
using namespace std;

class Solution {
public:
    int totalFruit(vector<int>& fruits) {
        unordered_map<int, int> fruitCount;
        int maxFruits = 0;
        int left = 0;

        for (int right = 0; right < fruits.size(); ++right) {
            fruitCount[fruits[right]]++;
            
            while (fruitCount.size() > 2) {
                fruitCount[fruits[left]]--;
                if (fruitCount[fruits[left]] == 0) {
                    fruitCount.erase(fruits[left]);
                }
                left++;
            }
            
            maxFruits = max(maxFruits, right - left + 1);
        }

        return maxFruits;
    }
};

int main() {
    Solution solution;
    vector<int> fruits = {1, 2, 1};
    cout << "Maximum fruits collected: " << solution.totalFruit(fruits) << endl;
    return 0;
}
