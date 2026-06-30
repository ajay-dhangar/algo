---
id: department-top-three-salaries
title: "Department Top Three Salaries"
sidebar_label: Department Top Three Salaries
description: "The Department Top Three Salaries problem on LeetCode involves finding the top three unique earners in each department using window functions like DENSE_RANK()."
tags: [SQL, leetcode, database]
---

## Description:

A company's executives are interested in seeing who earns the most money in each of the company's departments. A high earner in a department is an employee who has a salary in the top three unique salaries for that department.

Write a solution to find the employees who are high earners in each of the departments. Return the result table in **any order**.

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
| 1  | Joe   | 85000  | 1            |
| 2  | Henry | 80000  | 2            |
| 3  | Sam   | 60000  | 2            |
| 4  | Max   | 90000  | 1            |
| 5  | Janet | 69000  | 1            |
| 6  | Randy | 85000  | 1            |
| 7  | Will  | 70000  | 1            |

`Department` table:
| id | name  |
|----|-------|
| 1  | IT    |
| 2  | Sales |

Output: 
| Department | Employee | Salary |
|------------|----------|--------|
| IT         | Max      | 90000  |
| IT         | Joe      | 85000  |
| IT         | Randy    | 85000  |
| IT         | Will     | 70000  |
| Sales      | Henry    | 80000  |
| Sales      | Sam      | 60000  |

**Explanation:** In the IT department: Max earns the highest, Joe and Randy both earn the second-highest, and Will earns the third-highest. In the Sales department: Henry earns the highest and Sam earns the second-highest.

## Video Explanation

<LiteYouTubeEmbed
  id="_SrCMbCsn2w"
  params="autoplay=1&autohide=1&showinfo=0&rel=0"
  title="Lec-58: Operator overloading in C++ Programming | C++ programming for beginners | C++ by Varun sir"
  lazyLoad={true}
  webp
/>

---

## Approaches:

### 1. Using Window Function (`DENSE_RANK()`)

We can use a Common Table Expression (CTE) along with the `DENSE_RANK()` window function to assign a rank to each employee's salary within their specific department. The `DENSE_RANK()` function ensures that identical salaries receive the same rank without skipping the next consecutive integer. We then filter out any employee whose rank is greater than 3.

* **Time Complexity:** $O(N \log N)$ as window functions require sorting the data based on the `ORDER BY` clause inside the `OVER()` partition.
* **Space Complexity:** $O(N)$ for the temporary storage required by the CTE to hold the ranked intermediate data.

#### Window Function Solutions:

**MySQL / PostgreSQL**
```sql
WITH RankedSalaries AS (
    SELECT 
        departmentId, 
        name, 
        salary, 
        DENSE_RANK() OVER (PARTITION BY departmentId ORDER BY salary DESC) as rnk
    FROM 
        Employee
)
SELECT 
    d.name AS Department, 
    rs.name AS Employee, 
    rs.salary AS Salary
FROM 
    RankedSalaries rs
JOIN 
    Department d 
ON 
    rs.departmentId = d.id
WHERE 
    rs.rnk <= 3;
```    