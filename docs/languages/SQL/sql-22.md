---
id: sql-select-top
sidebar_position: 22
title: "SQL SELECT TOP"
sidebar_label: "SQL SELECT TOP"
description: "The SQL SELECT TOP clause is used to limit the number of rows returned in a result set."
tags: [sql, dbms, database, select top]
---

The `SELECT TOP` clause is used in SQL to limit the number of rows returned in a query result. It is commonly used when you want to retrieve a specific number or percentage of records.

### Syntax

In SQL Server:

```sql
SELECT TOP number|percent column_name(s)
FROM table_name
WHERE condition;
```
In MySQL and PostgreSQL, you can use LIMIT instead:

```sql
SELECT column_name(s)
FROM table_name
WHERE condition
LIMIT number;
```

### Key Points

* The SELECT TOP clause is supported in SQL Server, while MySQL and PostgreSQL use the LIMIT clause instead.
* You can specify either a fixed number or a percentage of rows to return.
* This clause is especially useful for retrieving a subset of rows from large datasets, such as the top-performing items or recent entries.

### Examples

**Example 1: Retrieve the top 5 most expensive products**

```sql
SELECT TOP 5 ProductName, Price
FROM Products
ORDER BY Price DESC;
```
In MySQL/PostgreSQL, use:

```sql
SELECT ProductName, Price
FROM Products
ORDER BY Price DESC
LIMIT 5;
```

**Example 2: Retrieve the top 10% of employees with the highest salaries**

```sql
SELECT TOP 10 PERCENT EmployeeName, Salary
FROM Employees
ORDER BY Salary DESC;
```

In MySQL/PostgreSQL, you would need to calculate the percentage manually, as they don’t support the PERCENT keyword in the same way.

**Note:**
The SELECT TOP clause is typically used with ORDER BY to control which records are selected based on specific criteria, such as descending order of price or date. Keep in mind that different SQL databases have variations in syntax for limiting rows.
