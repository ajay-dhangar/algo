---
id: rising-temperature
title: "Rising Temperature"
sidebar_label: Rising Temperature
description: "The Rising Temperature problem on LeetCode involves finding all dates' Ids with higher temperatures compared to their previous dates (yesterday)."
tags: [SQL, Pandas, leetcode, database]
---

## Description:

Write a solution to find all dates' `id` with higher temperatures compared to its previous dates (yesterday).

Return the result table in **any order**.

**Table: Weather**

| Column Name   | Type    |
|---------------|---------|
| id            | int     |
| recordDate    | date    |
| temperature   | int     |

`id` is the column with unique values for this table.
There are no different rows with the same `recordDate`.
This table contains information about the temperature on a certain day.

**Example 1:**

Input: 
`Weather` table:
| id | recordDate | temperature |
|----|------------|-------------|
| 1  | 2015-01-01 | 10          |
| 2  | 2015-01-02 | 25          |
| 3  | 2015-01-03 | 20          |
| 4  | 2015-01-04 | 30          |

Output: 
| id |
|----|
| 2  |
| 4  |

**Explanation:** In 2015-01-02, the temperature was higher than the previous day (10 -> 25).
In 2015-01-04, the temperature was higher than the previous day (20 -> 30).

---

## Approaches:

### 1. Using DATEDIFF (SQL)
We can join the `Weather` table to itself to compare the temperature of a specific date with the temperature of the previous date. The `DATEDIFF()` function helps ensure we are comparing strictly consecutive days.

* **Time Complexity:** $O(N)$ or $O(N \log N)$ depending on the database engine's join implementation and indexing.
* **Space Complexity:** $O(N)$ to store the final result set.

#### SQL Solution (MySQL):

```sql
SELECT w1.id
FROM Weather w1
JOIN Weather w2 
  ON DATEDIFF(w1.recordDate, w2.recordDate) = 1
WHERE w1.temperature > w2.temperature;
```

### 2. Shift and Sort (Pandas)
We can solve this in Pandas by first sorting the DataFrame by `recordDate` to ensure chronological order. Then, we can use the `shift(1)` method to bring the previous day's date and temperature to the current row, allowing for a vectorized row-wise comparison.

* **Time Complexity:** $O(N \log N)$ due to sorting the dataframe.
* **Space Complexity:** $O(N)$ to store the shifted columns and the final result dataframe.

#### Pandas Solution:

```python
import pandas as pd

def rising_temperature(weather: pd.DataFrame) -> pd.DataFrame:
    # Sort by date to ensure chronological order
    weather.sort_values(by='recordDate', inplace=True)
    
    # Shift temperatures and dates by 1 to compare with the previous row
    weather['prev_temp'] = weather['temperature'].shift(1)
    weather['prev_date'] = weather['recordDate'].shift(1)
    
    # Conditions: consecutive days AND strictly higher temperature
    is_consecutive = (weather['recordDate'] - weather['prev_date']).dt.days == 1
    is_warmer = weather['temperature'] > weather['prev_temp']
    
    # Filter and return only the 'id' column
    return weather[is_warmer & is_consecutive][['id']]
```    