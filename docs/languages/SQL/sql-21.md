---
id: sql-group-by
sidebar_position: 21
title: "SQL GROUP BY Statement"
sidebar_label: "SQL GROUP BY"
description: "The SQL GROUP BY statement is used to group rows that have the same values in specified columns and apply aggregate functions."
tags: [sql, dbms, database, group by]
---

The `GROUP BY` statement in SQL is used to arrange identical data into groups. It is typically used with aggregate functions (such as `COUNT`, `SUM`, `AVG`, `MAX`, or `MIN`) to perform operations on each group.

### Syntax

```sql
SELECT COUNT(CustomerID), Country
FROM Customers
GROUP BY Country
HAVING COUNT(CustomerID) > 5;
```

### Key Points

* The GROUP BY statement groups rows that have the same values in specified columns.
* It is often combined with aggregate functions to perform calculations on each group.
* Using ORDER BY with GROUP BY allows you to sort the grouped results.

### Examples

**Example 1: Count the number of products in each category**

```sql
SELECT CategoryID, COUNT(ProductID) AS ProductCount
FROM Products
GROUP BY CategoryID;
```

**Example 2: Find the total sales for each salesperson**

```sql
SELECT SalespersonID, SUM(SaleAmount) AS TotalSales
FROM Sales
GROUP BY SalespersonID;
```

**Example 3: Retrieve the average salary of employees in each department**

```sql
SELECT DepartmentID, AVG(Salary) AS AverageSalary
FROM Employees
GROUP BY DepartmentID;
```

**Note:**
* The GROUP BY clause must appear after the WHERE clause and before the ORDER BY clause if they are used together.
* When using GROUP BY, only the grouped columns or aggregate functions can be included in the SELECT statement, as other columns would produce ambiguous results.
* The HAVING clause can be used with GROUP BY to filter groups based on aggregate conditions.
