---
id: SQL-LIKE-Operator
sidebar_position: 19
title: "SQL LIKE Operator"
sidebar_label: "SQL LIKE Operator"
description: "The SQL LIKE operator is used to filter data based on patterns."
tags: [sql, dbms, database, like]
---

The `LIKE` operator is used in a `WHERE` clause to search for a specific pattern in a column.

### Syntax

```sql
SELECT column_name(s)
FROM table_name
WHERE column_name LIKE pattern;
```

### Pattern Matching

You can use the following wildcard characters in the pattern:

* **%**: Matches any character sequence, zero or more times.
* **_**: Matches any single character.

### Examples

**Example 1: Find all products that start with 'Ch'**

```sql
SELECT *
FROM Products
WHERE ProductName LIKE 'Ch%';
```

**Example 2: Find all products that contain 'an' anywhere in the name**

```sql
SELECT *
FROM Products
WHERE ProductName LIKE '%an%';
```

**Example 3: Find all products that end with 'syrup'**

```sql
SELECT *
FROM Products
WHERE ProductName LIKE '%syrup';
```

**Example 4: Find all products with a 4-character product ID starting with '1'**

```sql
SELECT *
FROM Products
WHERE ProductID LIKE '1___';
```

**Note:** The specific implementation and syntax might vary slightly depending on the database system you're using (e.g., MySQL, PostgreSQL, SQL Server). However, the core concept of using the `LIKE` operator with wildcard characters remains consistent.
