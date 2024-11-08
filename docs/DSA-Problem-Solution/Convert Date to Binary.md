---
id: date-to-binary-conversion
title: DSA Problem Solution
sidebar_label: DSA Problem Solution
sidebar-position: 1
description: The "Date to Binary Conversion" problem on LeetCode typically involves converting a given date into its binary representation.
tags: [DSA, leetcode, problem-solving]
---

# Leetcode: Problem-3280

## Description:

You are given a string ``date`` representing a Gregorian calendar date in the ``yyyy-mm-dd`` format. 
``date`` can be written in its binary representation obtained by converting year, month, and day to their binary representations without any leading zeroes and writing them down in ``year-month-day`` format.
Return the binary representation of ``date``.

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

# Solution in Java

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
