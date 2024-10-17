---
id: "sql-where-clause"
sidebar_position: 4
title: "SQL WHERE Clause"
sidebar_label: "SQL WHERE Clause"
description: "SQL (Structured Query Language) is a standardized programming language for managing and manipulating relational databases."
tags: [sql, dbms, database]
---

The `WHERE` clause is used to filter records.

It is used to extract only those records that fulfill a specified condition.

### Example

Select all customers from Mexico:

```
SELECT \* FROM Customers  
WHERE Country='Mexico';
```

* * *

### Syntax

`SELECT _column1_, _column2, ..._   FROM _table_name_   WHERE _condition_;`

**Note:** The `WHERE` clause is not only used in `SELECT` statements, it is also used in `UPDATE`, `DELETE`, etc.!

* * *

### Demo Database

Below is a selection from the **Customers** table used in the examples:

| CustomerID | CustomerName                  | ContactName    | Address                | City        | PostalCode | Country  |
|------------|-------------------------------|----------------|------------------------|-------------|------------|----------|
| 1          | Alfreds Futterkiste           | Maria Anders   | Obere Str. 57          | Berlin      | 12209      | Germany  |
| 2          | Ana Trujillo Emparedados y Helados | Ana Trujillo  | Avda. de la Constitución 2222 | México D.F. | 05021      | Mexico   |
| 3          | Antonio Moreno Taquería       | Antonio Moreno | Mataderos 2312         | México D.F. | 05023      | Mexico   |
| 4          | Around the Horn               | Thomas Hardy   | 120 Hanover Sq.        | London      | WA1 1DP    | UK       |
| 5          | Berglunds snabbköp            | Christina Berglund | Berguvsvägen 8        | Luleå       | S-958 22   | Sweden   |

* * *

## Text Fields vs. Numeric Fields

SQL requires single quotes around text values (most database systems will also allow double quotes).

However, numeric fields should not be enclosed in quotes:

### Example

```
SELECT \* FROM Customers  
WHERE CustomerID=1;
```

* * *

## Operators in The WHERE Clause

You can use other operators than the `=` operator to filter the search.

### Example

Select all customers with a CustomerID greater than 80:
```
SELECT \* FROM Customers  
WHERE CustomerID > 80;
```

The following operators can be used in the `WHERE` clause:

| Operator | Description |
| --- | --- |
| `=` | Equal |
| `>` | Greater than |
| `<` | Less than |
| `>=` | Greater than or equal |
| `<=` | Less than or equal |
| `<>` | Not equal |
| `BETWEEN` | Between a certain range |
| `LIKE` | Search for a pattern |
| `IN` | To specify multiple possible values for a column |

* * *

