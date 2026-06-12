---
id: employees-earning-more-than-their-managers
title: "Employees Earning More Than Their Managers"
sidebar_label: Employees Earning More Than Their Managers
description: "The Employees Earning More Than Their Managers problem on LeetCode involves finding employees whose salary is strictly greater than their manager's salary using a self-join."
tags: [SQL, leetcode, database]
---

## Description:

Write a solution to find the employees who earn more than their managers. Return the result table in **any order**.

**Table: Employee**
| Column Name | Type    |
|-------------|---------|
| id          | int     |
| name        | varchar |
| salary      | int     |
| managerId   | int     |

`id` is the primary key for this table.
Each row of this table indicates the ID of an employee, their name, salary, and the ID of their manager.

**Example 1:**
Input: 
`Employee` table:
| id | name  | salary | managerId |
|----|-------|--------|-----------|
| 1  | Joe   | 70000  | 3         |
| 2  | Henry | 80000  | 4         |
| 3  | Sam   | 60000  | Null      |
| 4  | Max   | 90000  | Null      |

Output: 
| Employee |
|----------|
| Joe      |

**Explanation:** Joe is the only employee who earns more than his manager.

---

## Approaches:

### 1. Self-Join

We can join the `Employee` table to itself to compare an employee's salary directly with their manager's salary. By matching an employee's `managerId` to another employee's `id` (who acts as the manager), we can filter for cases where the employee's salary is strictly greater.

* **Time Complexity:** $O(N)$ or $O(N \log N)$ depending on the database engine's join implementation and available indexing.
* **Space Complexity:** $O(N)$ to store the final result set.

#### Self-Join Solutions:

**MySQL / PostgreSQL**
```sql
SELECT 
    e1.name AS Employee
FROM 
    Employee e1
JOIN 
    Employee e2 
ON 
    e1.managerId = e2.id
WHERE 
    e1.salary > e2.salary;
```    