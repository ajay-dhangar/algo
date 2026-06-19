---
id: angle-between-hands-of-a-clock
title: "Angle Between Hands of a Clock"
sidebar_label: Angle Between Hands of a Clock
description: "Finding the smaller angle formed between the hour and minute hands of a clock."
tags: [DSA, leetcode, math]
---

## Description:

Given two numbers, `hour` and `minutes`, return the smaller angle (in degrees) formed between the `hour` and the `minute` hand.

**Example 1:**

Input: `hour = 12`, `minutes = 30`
Output: `165`

**Example 2:**

Input: `hour = 3`, `minutes = 30`
Output: `75`

**Example 3:**

Input: `hour = 3`, `minutes = 15`
Output: `7.5`

---

## Approaches:

### 1. Mathematical Approach (Relative Speeds)

To find the angle between the hands, we calculate the exact position (in degrees) of both the minute and hour hands relative to the 12:00 position, and then find the absolute difference between them.

1. **Minute Hand:** The minute hand moves $360^\circ$ in $60$ minutes. Therefore, it moves at a speed of $6^\circ$ per minute.
2. **Hour Hand:** The hour hand moves $360^\circ$ in $12$ hours ($720$ minutes). Therefore, it moves at a speed of $0.5^\circ$ per minute. It also shifts based on the current hour.
3. **Find the Difference:** Subtract the two angles and take the absolute value.
4. **Find the Smaller Angle:** A clock is $360^\circ$. If the difference is greater than $180^\circ$, the smaller angle will be on the other side. Return the minimum of the difference and $360$ minus the difference.

* **Time Complexity:** $O(1)$ because the calculation relies on a few basic arithmetic operations, regardless of the input size.
* **Space Complexity:** $O(1)$ because we only use a few variables to store the angles, requiring constant extra space.

#### Solutions:

**C++**
```cpp
class Solution {
public:
    double angleClock(int hour, int minutes) {
        double minute_angle = minutes * 6.0;
        double hour_angle = (hour % 12) * 30.0 + minutes * 0.5;
        
        double diff = abs(hour_angle - minute_angle);
        
        return min(diff, 360.0 - diff);
    }
};
```

**Java**
```java
class Solution {
    public double angleClock(int hour, int minutes) {
        double minuteAngle = minutes * 6.0;
        double hourAngle = (hour % 12) * 30.0 + minutes * 0.5;
        
        double diff = Math.abs(hourAngle - minuteAngle);
        
        return Math.min(diff, 360.0 - diff);
    }
}
```

**Python**
```py
class Solution:
    def angleClock(self, hour: int, minutes: int) -> float:
        minute_angle = minutes * 6
        hour_angle = (hour % 12) * 30 + minutes * 0.5
        
        diff = abs(hour_angle - minute_angle)
        
        return min(diff, 360 - diff)
```

**JavaScript**
```js
/**
 * @param {number} hour
 * @param {number} minutes
 * @return {number}
 */
const angleClock = function(hour, minutes) {
    const minuteAngle = minutes * 6;
    const hourAngle = (hour % 12) * 30 + minutes * 0.5;
    
    const diff = Math.abs(hourAngle - minuteAngle);
    
    return Math.min(diff, 360 - diff);
};
```