---
id: lemonade-change
title: "Lemonade Change"
sidebar_label: Lemonade Change
description: "The Lemonade Change problem on LeetCode involves determining if a vendor can provide the correct change to every customer using a greedy approach."
tags: [DSA, leetcode, greedy-algorithms]
---

## Description:

At a lemonade stand, each lemonade costs `$5`. Customers are standing in a queue to buy from you and order one at a time (in the order given by bills). Each customer will only buy one lemonade and pay with either a `$5`, `$10`, or `$20` bill. You must provide the correct change to each customer so that the net transaction is that the customer pays `$5`.

Note that you do not have any change in hand at first.

Given an integer array `bills` where `bills[i]` is the bill the $i^{th}$ customer pays, return `true` *if you can provide every customer with the correct change, or* `false` *otherwise*.

**Example 1:**
Input: `bills = [5, 5, 5, 10, 20]`
Output: `true`
**Explanation:** From the first 3 customers, we collect three `$5` bills in order.
From the fourth customer, we collect a `$10` bill and give back a `$5` bill.
From the fifth customer, we give a `$10` bill and a `$5` bill.
Since all customers received correct change, we return `true`.

**Example 2:**
Input: `bills = [5, 5, 10, 10, 20]`
Output: `false`
**Explanation:**
From the first two customers in order, we collect two `$5` bills.
For the next two customers in order, we collect a `$10` bill and give back a `$5` bill.
For the last customer, we can not give change of `$15` back because we only have two `$10` bills.
Since not every customer received correct change, the answer is `false`.

---

## Approaches:

### 1. Greedy Algorithm

When a customer pays us, we maintain a count of the `$5` and `$10` bills we have in hand (we don't need to count `$20` bills because we can never use them to give change).

There are three scenarios based on the bill received:
1. **Received `$5`:** No change needed. Increment our `$5` count.
2. **Received `$10`:** Requires `$5` change. If we have a `$5` bill, use it; otherwise, return `false`.
3. **Received `$20`:** Requires `$15` change. This is where the **greedy choice** happens. We have two ways to make `$15`:
   * *Option A (Optimal):* Give one `$10` bill and one `$5` bill.
   * *Option B:* Give three `$5` bills.
   
   > **Greedy Strategy:** Always prefer Option A. A `$5` bill is much more valuable/flexible than a `$10` bill because a `$5` bill can help give change for both `$10` and `$20` transactions, whereas a `$10` bill can only help with `$20` transactions. 

* **Time Complexity:** $O(n)$ because we iterate through the bills array once.
* **Space Complexity:** $O(1)$ because we only use a few variables for the calculation, taking constant extra space.

#### Greedy Solutions:

**C++**
```cpp
class Solution {
public:
    bool lemonadeChange(vector<int>& bills) {
        int five = 0, ten = 0;
        
        for (int bill : bills) {
            if (bill == 5) {
                five++;
            } else if (bill == 10) {
                if (five == 0) return false;
                five--;
                ten++;
            } else { // bill == 20
                if (ten > 0 && five > 0) {
                    ten--;
                    five--;
                } else if (five >= 3) {
                    five -= 3;
                } else {
                    return false;
                }
            }
        }
        return true;
    }
};
```

**Java**
```java
class Solution {
    public boolean lemonadeChange(int[] bills) {
        int five = 0, ten = 0;
        
        for (int bill : bills) {
            if (bill == 5) {
                five++;
            } else if (bill == 10) {
                if (five == 0) return false;
                five--;
                ten++;
            } else { // bill == 20
                if (ten > 0 && five > 0) {
                    ten--;
                    five--;
                } else if (five >= 3) {
                    five -= 3;
                } else {
                    return false;
                }
            }
        }
        return true;
    }
}
```

**Python**
```py
class Solution:
    def lemonadeChange(self, bills: List[int]) -> bool:
        five = ten = 0
        
        for bill in bills:
            if bill == 5:
                five += 1
            elif bill == 10:
                if not five:
                    return False
                five -= 1
                ten += 1
            else: # bill == 20
                if ten and five:
                    ten -= 1
                    five -= 1
                elif five >= 3:
                    five -= 3
                else:
                    return False
        return True
```

**JavaScript**
```js
/**
 * @param {number[]} bills
 * @return {boolean}
 */
var lemonadeChange = function(bills) {
    let five = 0, ten = 0;
    
    for (let bill of bills) {
        if (bill === 5) {
            five++;
        } else if (bill === 10) {
            if (five === 0) return false;
            five--;
            ten++;
        } else { // bill === 20
            if (ten > 0 && five > 0) {
                ten--;
                five--;
            } else if (five >= 3) {
                five -= 3;
            } else {
                return false;
            }
        }
    }
    return true;
};
```