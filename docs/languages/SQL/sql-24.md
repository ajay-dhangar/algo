---
id: sql-logical-operators
sidebar_position: 24
title: "SQL Logical Operators"
sidebar_label: "SQL Logical Operators"
description: "SQL logical operators are used to combine multiple conditions in a query."
tags: [sql, dbms, database, logical operators]
---

SQL logical operators are used to combine multiple conditions in a query. They help refine search criteria and filter data based on complex logic.

### Types of Logical Operators

1. **AND**: Returns records if all specified conditions are true.
2. **OR**: Returns records if at least one of the specified conditions is true.
3. **NOT**: Reverses the result of a condition, returning records if the condition is false.
4. **IN**: Checks if a value exists within a specified set of values.
5. **BETWEEN**: Checks if a value is within a specified range.
6. **ANY**: Returns true if any of the values match the condition.
7. **ALL**: Returns true only if all values match the condition.

### Syntax

Using `AND` and `OR`:

```sql
SELECT column_name(s)
FROM table_name
WHERE condition1 AND condition2;  -- both conditions must be true

SELECT column_name(s)
FROM table_name
WHERE condition1 OR condition2;   -- at least one condition must be true
```

Using NOT:

```sql
SELECT column_name(s)
FROM table_name
WHERE NOT condition
```

Using IN:

```sql
SELECT column_name(s)
FROM table_name
WHERE column_name IN (value1, value2, ...);
```

Using BETWEEN:

```sql
SELECT column_name(s)
FROM table_name
WHERE column_name BETWEEN value1 AND value2;
```

Using ANY and ALL:

```sql
SELECT column_name(s)
FROM table_name
WHERE column_name = ANY (subquery);  -- any condition can be met

SELECT column_name(s)
FROM table_name
WHERE column_name = ALL (subquery);  -- all conditions must be met
```

### Examples

**Example 1: Using AND**

Retrieve products with a price between $10 and $50.

```sql
SELECT ProductName, Price
FROM Products
WHERE Price >= 10 AND Price <= 50;
```

**Example 2: Using OR**

Retrieve products that are either in CategoryID 1 or CategoryID 2.

```sql
SELECT ProductName, CategoryID
FROM Products
WHERE CategoryID = 1 OR CategoryID = 2;
```

**Example 3: Using NOT**

Retrieve products that are not in CategoryID 3.

```sql
SELECT ProductName, CategoryID
FROM Products
WHERE NOT CategoryID = 3;
```

**Example 4: Using IN**

Retrieve products that belong to CategoryID 1, 2, or 3.

```sql
SELECT ProductName, CategoryID
FROM Products
WHERE CategoryID IN (1, 2, 3);
```

**Example 5: Using BETWEEN**

Retrieve products with a price between $20 and $100.

```sql
SELECT ProductName, Price
FROM Products
WHERE Price BETWEEN 20 AND 100;
```

**Example 6: Using ANY**

Retrieve products where the price is greater than any price in the DiscountedProducts table.

```sql
SELECT ProductName, Price
FROM Products
WHERE Price > ANY (SELECT Price FROM DiscountedProducts);
```

**Example 7: Using ALL**

Retrieve products where the price is greater than all prices in the DiscountedProducts table.

```sql
SELECT ProductName, Price
FROM Products
WHERE Price > ALL (SELECT Price FROM DiscountedProducts);
```

**Note:**
* Logical operators are evaluated in the following order: NOT, AND, then OR. Parentheses () can be used to control the evaluation order explicitly.
* IN and BETWEEN help reduce code complexity and improve readability when checking for multiple values or ranges.
* ANY and ALL are typically used with subqueries to evaluate conditions against multiple values.
