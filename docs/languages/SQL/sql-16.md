---
id: SQL-SUM-Function
sidebar_position: 16
title: "SQL SUM() Function"
sidebar_label: "SQL SUM() Function"
description: "SQL (Structured Query Language) is a standardized programming language for managing and manipulating relational databases."
tags: [sql, dbms, database]
---

The `SUM()` function returns the total sum of a numeric column.

### Example

Return the sum of all `Quantity` fields in the `OrderDetails` table:
```
SELECT SUM(Quantity)  
FROM OrderDetails;
```

### Syntax

`SELECT SUM(_column_name_)   FROM _table_name_   WHERE _condition_;`


### Demo Database

Below is a selection from the OrderDetails table used in the examples:

| OrderDetailID | OrderID | ProductID | Quantity |
|----------------|---------|-----------|----------|
| 1              | 10248   | 11        | 12       |
| 2              | 10248   | 42        | 10       |
| 3              | 10248   | 72        | 5        |
| 4              | 10249   | 14        | 9        |
| 5              | 10249   | 51        | 40       |


### Add a WHERE Clause

You can add a `WHERE` clause to specify conditions:

### Example

Return the sum of the `Quantity` field for the product with `ProductID` 11:
```
SELECT SUM(Quantity)  
FROM OrderDetails  
WHERE ProductId = 11;
```
### Use an Alias

Give the summarized column a name by using the `AS` keyword.

### Example

Name the column "total":
```
SELECT SUM(Quantity) AS total  
FROM OrderDetails;
```
## Use SUM() with GROUP BY

Here we use the `SUM()` function and the `GROUP BY` clause, to return the `Quantity` for each `OrderID` in the OrderDetails table:

### Example
```
SELECT OrderID, SUM(Quantity) AS \[Total Quantity\]  
FROM OrderDetails  
GROUP BY OrderID;
``` 
## SUM() With an Expression

The parameter inside the `SUM()` function can also be an expression.

If we assume that each product in the `OrderDetails` column costs 10 dollars, we can find the total earnings in dollars by multiply each quantity with 10:

### Example

Use an expression inside the `SUM()` function:
```
SELECT SUM(Quantity \* 10)  
FROM OrderDetails;
```

We can also join the `OrderDetails` table to the `Products` table to find the actual amount, instead of assuming it is 10 dollars:

### Example

Join `OrderDetails` with `Products`, and use `SUM()` to find the total amount:
```
SELECT SUM(Price \* Quantity)  
FROM OrderDetails  
LEFT JOIN Products ON OrderDetails.ProductID = Products.ProductID;
```


