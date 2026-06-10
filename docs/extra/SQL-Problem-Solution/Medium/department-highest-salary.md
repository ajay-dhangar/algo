---
id: department-highest-salary
title: "Department Highest Salary"
sidebar_label: Department Highest Salary
description: "The Department Highest Salary problem involves finding the employees who have the highest salary in each department using joins and subqueries."
tags: [SQL, leetcode, database]
---

## Description:

Write a solution to find employees who have the highest salary in each of the departments. Return the result table in **any order**.

**Table: Employee**
| Column Name  | Type    |
|--------------|---------|
| id           | int     |
| name         | varchar |
| salary       | int     |
| departmentId | int     |

`id` is the primary key for this table.

**Table: Department**
| Column Name | Type    |
|-------------|---------|
| id          | int     |
| name        | varchar |

`id` is the primary key for this table.

**Example 1:**
Input: 
`Employee` table:
| id | name  | salary | departmentId |
|----|-------|--------|--------------|
| 1  | Joe   | 70000  | 1            |
| 2  | Jim   | 90000  | 1            |
| 3  | Henry | 80000  | 2            |
| 4  | Sam   | 60000  | 2            |
| 5  | Max   | 90000  | 1            |

`Department` table:
| id | name  |
|----|-------|
| 1  | IT    |
| 2  | Sales |

Output: 
| Department | Employee | Salary |
|------------|----------|--------|
| IT         | Jim      | 90000  |
| Sales      | Henry    | 80000  |
| IT         | Max      | 90000  |

**Explanation:** Max and Jim both have the highest salary in the IT department and Henry has the highest salary in the Sales department.

---

## Approaches:

### 1. `JOIN` with a `GROUP BY` Subquery

To find the highest earner, we first need to determine the maximum salary for each `departmentId` using a `GROUP BY` subquery. Then, we join the `Employee` and `Department` tables and filter the results so we only select rows where the `departmentId` and `salary` match the maximum values found in our subquery.

* **Time Complexity:** $O(N \log N)$ where $N$ is the number of employees, due to the grouping and joining operations.
* **Space Complexity:** $O(D)$ where $D$ is the number of distinct departments temporarily stored during the subquery execution.

#### Subquery Solutions:

**MySQL / PostgreSQL**
```sql
SELECT 
    d.name AS Department, 
    e.name AS Employee, 
    e.salary AS Salary
FROM 
    Employee e
JOIN 
    Department d 
ON 
    e.departmentId = d.id
WHERE 
    (e.departmentId, e.salary) IN (
        SELECT departmentId, MAX(salary)
        FROM Employee
        GROUP BY departmentId
    );
```    