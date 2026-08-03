---
id: plus-one
title: Plus One
sidebar_label: Plus One
description: >-
  The "Plus One" dsa problem is a classic algorithm challenge that involves
  manipulating an array of digits. The goal is to add one to a number
  represented by an array of its digits.
tags:
  - dsa
  - algorithms
  - problem-solving
companies:
  - Microsoft
---

# Plus One

## Description
You are given a large integer represented as an integer array ``digits``, where each ``digits[i]`` is the ``ith`` digit of the integer. The digits are ordered from most significant to least significant in left-to-right order. The large integer does not contain any leading ``0``'s.
Increment the large integer by one and return the resulting array of digits.

## Video Explanation

<LiteYouTubeEmbed
  id="jIaA8boiG1s"
  params="autoplay=1&autohide=1&showinfo=0&rel=0"
  title="Plus One - Leetcode 66 - Python"
  poster="maxresdefault"
  lazyLoad={true}
  webp
/>

### Example 1:

**Input:** digits = [1,2,3]

**Output:** [1,2,4]

**Explanation:** The array represents the integer 123.

Incrementing by one gives 123 + 1 = 124.

Thus, the result should be [1,2,4].

### Example 2:

**Input:** digits = [4,3,2,1]

**Output:** [4,3,2,2]

**Explanation:** The array represents the integer 4321.

Incrementing by one gives 4321 + 1 = 4322.

Thus, the result should be [4,3,2,2].

### Example 3:

**Input:** digits = [9]

**Output:** [1,0]

**Explanation:** The array represents the integer 9.

Incrementing by one gives 9 + 1 = 10.

Thus, the result should be [1,0].

# Code in Java

## Solutions

<Tabs groupId="programming-language">
  <TabItem value="cpp" label="C++" default>

```cpp
class Solution {
public:
    vector<int> plusOne(vector<int>& digits) {
        int n = digits.size();
        for (int i = n - 1; i >= 0; i--) {
            if (digits[i] < 9) {
                digits[i]++;
                return digits;
            }
            digits[i] = 0;
        }
        digits.insert(digits.begin(), 1);
        return digits;
    }
};
```

  </TabItem>
  <TabItem value="java" label="Java">

```java
class Solution {
    public int[] plusOne(int[] digits) {
        int n = digits.length;

        for(int i=n-1; i>=0; --i) {
            ++digits[i];
            digits[i] = digits[i] % 10;
            if(digits[i] != 0) {
                return digits;
            }
        }
        digits = new int[n+1];
        digits[0] = 1;
        return digits;
    }
}
```

  </TabItem>
  <TabItem value="python" label="Python">

```python
class Solution:
    def plusOne(self, digits: List[int]) -> List[int]:
        for i in range(len(digits) - 1, -1, -1):
            if digits[i] < 9:
                digits[i] += 1
                return digits
            digits[i] = 0
        return [1] + digits
```

  </TabItem>
  <TabItem value="javascript" label="JavaScript">

```javascript
var plusOne = function(digits) {
    for (let i = digits.length - 1; i >= 0; i--) {
        if (digits[i] < 9) {
            digits[i]++;
            return digits;
        }
        digits[i] = 0;
    }
    digits.unshift(1);
    return digits;
};
```

  </TabItem>
</Tabs>
