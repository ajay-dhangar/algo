---
id: sql-joins
sidebar_position: 18
title: "SQL Joins"
sidebar_label: "SQL Joins"
description: "SQL Joins are used to combine rows from two or more tables based on a related column between them."
tags: [sql, dbms, database, joins]
---

### SQL Joins

SQL Joins are used to combine rows from two or more tables based on a related column between them.

### Types of Joins

1. **INNER JOIN**: Returns records that have matching values in both tables.
2. **LEFT JOIN**: Returns all records from the left table and the matched records from the right table. If there is no match, the result is NULL from the right side.
3. **RIGHT JOIN**: Returns all records from the right table and the matched records from the left table. If there is no match, the result is NULL from the left side.
4. **FULL JOIN**: Returns all records when there is a match in either left or right table records. If there is no match, the result is NULL on the side that does not have a match.

### INNER JOIN 

- **Description**:Retrieve a list of all products with their supplier names.
- **Example**: 
    ```
    SELECT Products.ProductName, Suppliers.SupplierName
    FROM Products
    INNER JOIN Suppliers ON Products.SupplierID = Suppliers.SupplierID;
    ```

### LEFT JOIN 

- **Description**:Retrieve a list of all products and their suppliers, including those without suppliers.
- **Example**: 
    ```
    SELECT Products.ProductName, Suppliers.SupplierName
    FROM Products
    LEFT JOIN Suppliers ON Products.SupplierID = Suppliers.SupplierID;
    ```

### RIGHT JOIN 

- **Description**:Retrieve a list of all suppliers and their products, including those without products.
- **Example**: 
    ```
    SELECT Products.ProductName, Suppliers.SupplierName
    FROM Products
    RIGHT JOIN Suppliers ON Products.SupplierID = Suppliers.SupplierID;
    ```

### FULL JOIN 

- **Description**:Retrieve a complete list of products and suppliers, regardless of matches.
- **Example**: 
    ```
    SELECT Products.ProductName, Suppliers.SupplierName
    FROM Products
    FULL JOIN Suppliers ON Products.SupplierID = Suppliers.SupplierID;
    ```

### Combining Joins 

- **Description**:Retrieve product details along with supplier and category information.
- **Example**: 
    ```
    SELECT Products.ProductName, Suppliers.SupplierName, Categories.CategoryName
    FROM Products
    INNER JOIN Suppliers ON Products.SupplierID = Suppliers.SupplierID
    INNER JOIN Categories ON Products.CategoryID = Categories.CategoryID;
    ```