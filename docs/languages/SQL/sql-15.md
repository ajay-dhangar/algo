---
id: SQL-COUNT-Function
sidebar_position: 15
title: "SQL COUNT() Function"
sidebar_label: "SQL COUNT() Function"
description: "SQL (Structured Query Language) is a standardized programming language for managing and manipulating relational databases."
tags: [sql, dbms, database]
---


The `COUNT()` function returns the number of rows that matches a specified criterion.

### Example
Find the total number of rows in the `Products` table:
```
SELECT COUNT(\*)  
FROM Products;
```

### Syntax

`SELECT COUNT(_column_name_)   FROM _table_name_   WHERE _condition_;`


### Demo Database

Below is a selection from the Products table used in the examples:


| ProductID | ProductName | SupplierID | CategoryID | Unit | Price |
| --- | --- | --- | --- | --- | --- |
| 1 | Chais | 1 | 1 | 10 boxes x 20 bags | 18 |
| 2 | Chang | 1 | 1 | 24 - 12 oz bottles | 19 |
| 3 | Aniseed Syrup | 1 | 2 | 12 - 550 ml bottles | 10 |
| 4 | Chef Anton's Cajun Seasoning | 2 | 2 | 48 - 6 oz jars | 22 |
| 5 | Chef Anton's Gumbo Mix | 2 | 2 | 36 boxes | 21.35 |


## Specify Column

You can specify a column name instead of the asterix symbol `(*)`.

If you specify a column name instead of `(*)`, NULL values will not be counted.

### Example

Find the number of products where the `ProductName` is not null:
```
SELECT COUNT(ProductName)  
FROM Products;
```

## Add a WHERE Clause

You can add a `WHERE` clause to specify conditions:

### Example

Find the number of products where `Price` is higher than 20:

SELECT COUNT(ProductID)  
FROM Products  
WHERE Price > 20;

* * *

## Ignore Duplicates

You can ignore duplicates by using the `DISTINCT` keyword in the `COUNT()` function.

If `DISTINCT` is specified, rows with the same value for the specified column will be counted as one.

### Example

How many _different_ prices are there in the `Products` table:
```
SELECT COUNT(DISTINCT Price)  
FROM Products;
```

## Use an Alias

Give the counted column a name by using the `AS` keyword.

### Example

Name the column "Number of records":
```
SELECT COUNT(\*) AS \[Number of records\]  
FROM Products;
```


## Use COUNT() with GROUP B

Here we use the `COUNT()` function and the `GROUP BY` clause, to return the number of records for each category in the Products table:

### Example
```
SELECT COUNT(\*) AS \[Number of records\], CategoryID  
FROM Products  
GROUP BY CategoryID;
```

