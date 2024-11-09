---
id: sql-null-functions
sidebar_position: 27
title: "SQL NULL Functions"
sidebar_label: "SQL NULL Functions"
description: "SQL NULL functions are used to handle NULL values in SQL queries."
tags: [sql, dbms, database, nullfunction, functions]
---

SQL NULL functions are used to handle `NULL` values in SQL queries. Since `NULL` represents unknown or missing data, these functions help manage `NULL` values by providing default values or modifying their behavior in expressions.

### Common NULL Functions

1. **IS NULL**: Checks if a value is `NULL`.
2. **IS NOT NULL**: Checks if a value is not `NULL`.
3. **COALESCE**: Returns the first non-`NULL` value in a list.
4. **IFNULL**: Returns an alternative value if the expression is `NULL` (specific to certain databases like MySQL).
5. **NULLIF**: Returns `NULL` if two expressions are equal; otherwise, it returns the first expression.

### Syntax

Using `IS NULL` and `IS NOT NULL`:

```sql
SELECT column_name
FROM table_name
WHERE column_name IS NULL;
```
```sql
SELECT column_name
FROM table_name
WHERE column_name IS NOT NULL;
```

Using COALESCE:

```sql
SELECT COALESCE(column1, column2, ..., default_value) AS alias_name
FROM table_name;
```

Using IFNULL (specific to MySQL):

```sql
SELECT IFNULL(column_name, default_value) AS alias_name
FROM table_name;
```

Using NULLIF:

```sql
SELECT NULLIF(expression1, expression2) AS alias_name
FROM table_name;
```

## Examples
**Example 1: Using IS NULL**

***Retrieve all products that do not have a listed price.***

```sql
SELECT ProductName
FROM Products
WHERE Price IS NULL;
```

**Example 2: Using COALESCE**

***Retrieve product prices, substituting 0 for any NULL values.***

```sql
SELECT ProductName, COALESCE(Price, 0) AS Price
FROM Products;
```

**Example 3: Using IFNULL**

***Retrieve supplier names, substituting "Unknown" for any NULL values.***

```sql
SELECT SupplierName, IFNULL(City, 'Unknown') AS City
FROM Suppliers;
```

**Example 4: Using NULLIF**

***Compare two columns and return NULL if they are equal.***

```sql
SELECT ProductName, NULLIF(SupplierID, CategoryID) AS UniqueIdentifier
FROM Products;
```

In this example, NULLIF returns NULL if SupplierID is equal to CategoryID; otherwise, it returns the SupplierID value.

**Note :**

* COALESCE is widely supported across SQL databases and is often preferred for providing default values.
* IFNULL is specific to MySQL, while ISNULL serves a similar purpose in SQL Server.
* NULLIF is useful for conditional logic when you need to return NULL for specific comparisons.
* SQL NULL functions allow you to manage NULL values effectively, making it easier to handle missing or unknown data in queries.
