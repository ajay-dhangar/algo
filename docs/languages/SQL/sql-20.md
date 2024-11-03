---
id: SQL-Having-Clause
sidebar_position: 20
title: "SQL Having Clause"
sidebar_label: "SQL Having Clause"
description: "The `HAVING` clause in SQL is used to filter records in combination with the `GROUP BY` clause."
tags: [sql, dbms, database, having]
---

The `HAVING` clause is used in conjunction with the `GROUP BY` clause to filter the results of aggregated data. It allows you to specify conditions on groups created by the `GROUP BY` clause, enabling more advanced data filtering.

### Syntax

```sql
SELECT column_name(s), aggregate_function(column_name)
FROM table_name
WHERE condition
GROUP BY column_name(s)
HAVING condition;
```
### Key Points

* The HAVING clause is similar to the WHERE clause, but it is applied to groups rather than individual rows.
* You typically use HAVING to filter records after aggregation, making it suitable for conditions on aggregated data.

### Examples
**Example 1: Find all categories with more than 10 products**

```sql
SELECT CategoryID, COUNT(ProductID) AS ProductCount 
FROM Products 
GROUP BY CategoryID 
HAVING COUNT(ProductID) > 10;
```

**Example 2: Retrieve suppliers who have provided products worth more than $1,000**

```sql
SELECT SupplierID, SUM(Price) AS TotalValue 
FROM Products 
GROUP BY SupplierID 
HAVING SUM(Price) > 1000;
```

**Example 3: List all customers with more than one order**

```sql
SELECT CustomerID, COUNT(OrderID) AS OrderCount 
FROM Orders 
GROUP BY CustomerID 
HAVING COUNT(OrderID) > 1;
```
**Note**:
The HAVING clause is often used with aggregate functions such as SUM(), COUNT(), AVG(), etc. It is important to note that the HAVING clause is evaluated after the GROUP BY clause, which means you cannot use it without grouping your results first.
