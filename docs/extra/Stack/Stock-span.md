---
id: stock-span 
title: Stock Span Problem 
sidebar_label: Stock Span Problem 
description: "The Stock Span Problem is a financial problem that calculates the span of stock's price on a given day."  
tags: [dsa, algorithms, stack]
---

### Definition:
The Stock Span Problem is defined as follows: Given a list of daily stock prices, the span of the stock's price on a given day is defined as the maximum number of consecutive days (including the current day) for which the price of the stock was less than or equal to the price on the given day.

### Problem Statement:
You are given an array of stock prices, where each element represents the stock price on a particular day. Your task is to compute an array of the same size, where each element at index `i` contains the span of the stock price on day `i`. 

The span of the stock price is defined as the number of consecutive days (including the current day) for which the stock price was less than or equal to the price on day `i`. 

### Algorithm Steps:

1. Initialize an empty stack to hold indices of the days.
2. Traverse the array of stock prices from left to right.
3. For each day, while the stack is not empty and the price of the current day is greater than the price of the day at the index on the top of the stack, pop from the stack.
4. If the stack is empty, it means the current price is greater than all previous prices, so the span is the current index + 1. If the stack is not empty, the span is the difference between the current index and the index at the top of the stack.
5. Push the current index onto the stack.
6. Repeat the above steps for all stock prices.

### Steps Involved:
1. **Input Array:** The program receives an array of stock prices.
2. **Function `calculateStockSpan`:** This function calculates the span for each day.
   
    *Step 2.1:* A `stack<int>` is initialized to store indices of the stock prices.
    
    *Step 2.2:* An array `span[]` is initialized to store the span of each day.
3. **Iterate through `prices`:** For each price in the stock prices:
   
    *Step 3.1:* While the stack is not empty and the current price is greater than the price at the index of the stack's top, the top index is popped from the stack.
    
    *Step 3.2:* If the stack is empty, the span is the current index + 1; otherwise, it's the difference between the current index and the index at the top of the stack.
    
4. **Push the current index:** After calculating the span for the current price, push the index onto the stack.
5. **Return the `span[]`:** After processing all prices, return the computed spans.

### Time Complexity:
- The time complexity of this solution is `O(n)`, where `n` is the number of stock prices. Each price is pushed and popped from the stack at most once.

### Sample Input:
```cpp
int prices[] = {100, 80, 60, 70, 60, 75, 85}; 
int n = sizeof(prices) / sizeof(prices[0]);
```
### Sample Output:
Span array: [1, 1, 1, 2, 1, 4, 6]

### C++ Implementation:
```cpp
#include <iostream>
#include <stack>
using namespace std;

// Function to calculate stock span values
void calculateStockSpan(int prices[], int span[], int n) {
    stack<int> st;
    st.push(0); // First day's price always has a span of 1
    span[0] = 1;

    for (int i = 1; i < n; i++) {
        // Pop elements from the stack while the current price is greater
        while (!st.empty() && prices[st.top()] <= prices[i]) {
            st.pop();
        }

        // If the stack is empty, current price is greater than all previous prices
        span[i] = st.empty() ? i + 1 : i - st.top();
        st.push(i);
    }
}
int main() {
    int prices[] = {100, 80, 60, 70, 60, 75, 85};
    int n = sizeof(prices) / sizeof(prices[0]);
    int span[n];

    calculateStockSpan(prices, span, n);

    cout << "Span array: ";
    for (int i = 0; i < n; i++) {
        cout << span[i] << " ";
    }
    cout << endl;

    return 0;
}
```
### Python Implementation:
```python
def calculate_stock_span(prices):
    n = len(prices)
    span = [0] * n
    stack = []

    for i in range(n):
        # Calculate span for the current price
        while stack and prices[stack[-1]] <= prices[i]:
            stack.pop()
        
        # If the stack is empty, current price is greater than all previous prices
        span[i] = i + 1 if not stack else i - stack[-1]
        
        # Push the current index onto the stack
        stack.append(i)

    return span

if __name__ == "__main__":
    prices = [100, 80, 60, 70, 60, 75, 85]
    span = calculate_stock_span(prices)

    print("Span array:", span)
```
