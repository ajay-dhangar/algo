---
id: SQL-AVG-Function
sidebar_position: 17
title: "SQL AVG() Function"
sidebar_label: "SQL AVG() Function"
description: "SQL (Structured Query Language) is a standardized programming language for managing and manipulating relational databases."
tags: [sql, dbms, database]
---



The `AVG()` function returns the average value of a numeric column.

### Example

Find the average price of all products:
```
SELECT AVG(Price)  
FROM Products;
```

### Syntax

`SELECT AVG(_column_name_)   FROM _table_name_   WHERE _condition_;`


### Demo Database

Below is a selection from the Products table used in the examples:

| ProductID | ProductName | SupplierID | CategoryID | Unit | Price |
| --- | --- | --- | --- | --- | --- |
| 1 | Chais | 1 | 1 | 10 boxes x 20 bags | 18 |
| 2 | Chang | 1 | 1 | 24 - 12 oz bottles | 19 |
| 3 | Aniseed Syrup | 1 | 2 | 12 - 550 ml bottles | 10 |
| 4 | Chef Anton's Cajun Seasoning | 2 | 2 | 48 - 6 oz jars | 22 |
| 5 | Chef Anton's Gumbo Mix | 2 | 2 | 36 boxes | 21.35 |
### Add a WHERE Clause

You can add a `WHERE` clause to specify conditions:

### Example

Return the average price of products in category 1:
```
SELECT AVG(Price)  
FROM Products  
WHERE CategoryID = 1;
```

### Use an Alias

Give the AVG column a name by using the `AS` keyword.

### Example

Name the column "average price":
```
SELECT AVG(Price) AS \[average price\]  
FROM Products;
```

## Higher Than Average

To list all records with a higher price than average, we can use the `AVG()` function in a sub query:

### Example

Return all products with a higher price than the average price:
```
SELECT \* FROM Products  
WHERE price > (SELECT AVG(price) FROM Products);
```

## Use AVG() with GROUP BY

Here we use the `AVG()` function and the `GROUP BY` clause, to return the average price for each category in the Products table:

### Example
```
SELECT AVG(Price) AS AveragePrice, CategoryID  
FROM Products  
GROUP BY CategoryID;
```