---
id: sql-case-expression
sidebar_position: 26
title: "SQL CASE Expression"
sidebar_label: "SQL CASE"
description: "The SQL CASE expression is used to add conditional logic to SQL queries."
tags: [sql, dbms, database, case, conditional]
---

The `CASE` expression in SQL is used to apply conditional logic within a query. It allows you to return different values based on specific conditions, similar to an `if-else` statement in programming.

### Syntax

There are two main formats for the `CASE` expression: **Simple CASE** and **Searched CASE**.

#### Simple CASE

```sql
SELECT column_name,
    CASE column_name
        WHEN value1 THEN result1
        WHEN value2 THEN result2
        ...
        ELSE default_result
    END AS alias_name
FROM table_name;
```

#### Searched CASE
```sql
SELECT column_name,
    CASE 
        WHEN condition1 THEN result1
        WHEN condition2 THEN result2
        ...
        ELSE default_result
    END AS alias_name
FROM table_name;
```

### Key Points
* Simple CASE compares an expression to a list of values and returns the corresponding result.
* Searched CASE evaluates a list of conditions and returns the result for the first condition that is TRUE.
* The ELSE clause is optional. If no conditions are met and ELSE is not specified, the CASE expression will return NULL.

### Examples

**Example 1: Simple CASE**

***Assign a label based on a product’s category.***

```sql
SELECT ProductName,
    CASE CategoryID
        WHEN 1 THEN 'Electronics'
        WHEN 2 THEN 'Furniture'
        WHEN 3 THEN 'Groceries'
        ELSE 'Other'
    END AS CategoryLabel
FROM Products;
```

**Example 2: Searched CASE**

***Assign a rating based on the price of a product.***

```sql
SELECT ProductName, Price,
    CASE 
        WHEN Price > 100 THEN 'Expensive'
        WHEN Price BETWEEN 50 AND 100 THEN 'Moderate'
        WHEN Price < 50 THEN 'Affordable'
        ELSE 'Unknown'
    END AS PriceRange
FROM Products;
```

**Example 3: Using CASE with Aggregation**

***Calculate the total sales for online and in-store orders separately.***

```sql
SELECT 
    SUM(CASE WHEN OrderType = 'Online' THEN Amount ELSE 0 END) AS OnlineSales,
    SUM(CASE WHEN OrderType = 'In-Store' THEN Amount ELSE 0 END) AS InStoreSales
FROM Orders;
```

**Note :**
* CASE expressions can be used in SELECT, WHERE, ORDER BY, and GROUP BY clauses.
* CASE can simplify complex IF-THEN-ELSE logic and help make SQL queries more readable.
* In GROUP BY statements, CASE is often used with aggregate functions to conditionally group data.
