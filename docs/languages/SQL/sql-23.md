---
id: sql-alias
sidebar_position: 23
title: "SQL Alias"
sidebar_label: "SQL Alias"
description: "The SQL Alias is used to give a table or a column a temporary name."
tags: [sql, dbms, database, alias]
---

SQL aliases are temporary names assigned to tables or columns. They are primarily used to make column names more readable and to simplify queries, especially when working with multiple tables or complex calculations.

### Syntax

For Column Alias:

```sql
SELECT column_name AS alias_name
FROM table_name;
```

For Table Alias:

```sql
SELECT column_name(s)
FROM table_name AS alias_name;
```

### Key Points
* Aliases are created using the AS keyword, although the keyword is optional in most databases.
* Column aliases are useful for renaming columns in the result set.
* Table aliases are helpful when dealing with complex queries, especially joins, where referencing the same table multiple times can make the query easier to read and write.

### Examples
**Example 1: Assign an alias to a column**

```sql
SELECT ProductName AS Product, Price AS Cost
FROM Products;
```
In this example, ProductName is displayed as Product and Price as Cost in the result.

**Example 2: Assign an alias to a table**

```sql
SELECT p.ProductName, s.SupplierName
FROM Products AS p
INNER JOIN Suppliers AS s ON p.SupplierID = s.SupplierID;
```
Here, Products is aliased as p and Suppliers as s, making it easier to reference columns in the JOIN operation.

**Example 3: Using aliases with calculations**

```sql
SELECT Price, Price * 0.1 AS Tax
FROM Products;
```
In this example, the calculated value Price * 0.1 is given the alias Tax for readability.

**Note:**
* Aliases exist only for the duration of the query; they do not change the actual column or table names in the database.
* When using aliases, especially in complex queries or subqueries, it’s good practice to use clear, descriptive names to improve readability.
