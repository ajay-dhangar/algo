---
id: date-to-binary-conversion
title: Date to Binary
sidebar_label: Date to Binary
description: >-
  The Date to Binary Conversion problem on LeetCode typically involves
  converting a given date into its binary representation.
tags:
  - DSA
  - leetcode
  - problem-solving
companies:
  - Apple
---

# Leetcode: Problem-3280

## Description:

You are given a string ``date`` representing a Gregorian calendar date in the ``yyyy-mm-dd`` format. 
``date`` can be written in its binary representation obtained by converting year, month, and day to their binary representations without any leading zeroes and writing them down in ``year-month-day`` format.
Return the binary representation of ``date``.

## Video Explanation

<LiteYouTubeEmbed
  id="NMTBmR_lQjc"
  params="autoplay=1&autohide=1&showinfo=0&rel=0"
  title="Very Easy Explanation || Convert Date to Binary || String Methods || Weekly Contest 414"
  poster="maxresdefault"
  lazyLoad={true}
  webp
/>

**Example 1:**
Input: date = "2080-02-29"
Output: "100000100000-10-11101"

**Explanation:**
100000100000, 10, and 11101 are the binary representations of 2080, 02, and 29 respectively.

**Example 2:**
Input: date = "1900-01-01"
Output: "11101101100-1-1"

**Explanation:**
11101101100, 1, and 1 are the binary representations of 1900, 1, and 1 respectively.

## Steps:
**1. Date Input:** Given a date in the format YYYY-MM-DD.

**2. Binary Conversion:**

    • Convert the year (YYYY) to binary.
    • Convert the month (MM) to binary.
    • Convert the day (DD) to binary.

**3. Output:** Provide the combined binary representation.

## Solutions

<Tabs groupId="programming-language">
  <TabItem value="cpp" label="C++" default>

```cpp
class Solution {
public:
    string convertDateToBinary(string date) {
        int year = stoi(date.substr(0, 4));
        int month = stoi(date.substr(5, 2));
        int day = stoi(date.substr(8, 2));
        
        auto toBin = [](int val) {
            string s = "";
            while (val > 0) {
                s = to_string(val % 2) + s;
                val /= 2;
            }
            return s;
        };
        
        return toBin(year) + "-" + toBin(month) + "-" + toBin(day);
    }
};
```

  </TabItem>
  <TabItem value="java" label="Java">

```java
class Solution {
    public String convertDateToBinary(String date) {
        String[] parts = date.split("-");
        int year = Integer.parseInt(parts[0]);
        int month = Integer.parseInt(parts[1]);
        int day = Integer.parseInt(parts[2]);

        String yearBinary = Integer.toBinaryString(year);
        String monthBinary = Integer.toBinaryString(month);
        String dayBinary = Integer.toBinaryString(day);
        return yearBinary + "-" + monthBinary + "-" + dayBinary;
    }
}
```

  </TabItem>
  <TabItem value="python" label="Python">

```python
class Solution:
    def convertDateToBinary(self, date: str) -> str:
        parts = date.split('-')
        return '-'.join(bin(int(p))[2:] for p in parts)
```

  </TabItem>
  <TabItem value="javascript" label="JavaScript">

```javascript
var convertDateToBinary = function(date) {
    return date.split('-').map(part => Number(part).toString(2)).join('-');
};
```

  </TabItem>
</Tabs>
