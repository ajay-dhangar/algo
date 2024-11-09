---
id: sql-stored-procedures
sidebar_position: 28
title: "SQL Stored Procedures"
sidebar_label: "SQL Stored Procedures"
description: "SQL Stored Procedures are a set of SQL statements that can be stored and reused."
tags: [sql, dbms, database, stored procedure, functions]
---

A **Stored Procedure** in SQL is a set of SQL statements that can be stored in the database and executed later, either manually or automatically. Stored procedures allow you to encapsulate complex SQL logic and reuse it multiple times, improving code modularity and performance.

### Advantages of Stored Procedures

- **Modularity**: Reuse SQL code without rewriting it.
- **Performance**: Improve performance by pre-compiling SQL code.
- **Security**: Restrict direct access to data by only allowing procedure execution.
- **Maintainability**: Simplify complex queries and logic by encapsulating them in procedures.

### Syntax

Creating a stored procedure:

```sql
CREATE PROCEDURE procedure_name
AS
BEGIN
    -- SQL statements
END;
```

Creating a stored procedure with parameters:

```sql
CREATE PROCEDURE procedure_name @parameter_name data_type
AS
BEGIN
    -- SQL statements using @parameter_name
END;
```

### Example

**Example 1: Basic Stored Procedure**

***Create a stored procedure to retrieve all products.***

```sql
CREATE PROCEDURE GetAllProducts
AS
BEGIN
    SELECT * FROM Products;
END;
```

To execute this procedure:

```sql
EXEC GetAllProducts;
```

**Example 2: Stored Procedure with Parameters**

***Create a stored procedure to retrieve products from a specific supplier.***

```sql
CREATE PROCEDURE GetProductsBySupplier @SupplierID INT
AS
BEGIN
    SELECT * FROM Products
    WHERE SupplierID = @SupplierID;
END;
```

To execute this procedure:

```sql
EXEC GetProductsBySupplier @SupplierID = 1;
```

**Example 3: Stored Procedure with Input and Output Parameters**

***Create a procedure that returns the count of products from a specific category.***

```sql
CREATE PROCEDURE GetProductCountByCategory 
    @CategoryID INT, 
    @ProductCount INT OUTPUT
AS
BEGIN
    SELECT @ProductCount = COUNT(*)
    FROM Products
    WHERE CategoryID = @CategoryID;
END;
```

To execute this procedure with an output parameter:

```sql
DECLARE @Count INT;
EXEC GetProductCountByCategory @CategoryID = 3, @ProductCount = @Count OUTPUT;
SELECT @Count AS ProductCount;
```

**Notes :**
* Input Parameters: Allow data to be passed into the stored procedure.
* Output Parameters: Return values from the stored procedure.
* Error Handling: Use TRY...CATCH blocks in certain SQL databases (e.g., SQL Server) for error handling in stored procedures.


Stored procedures provide a powerful way to encapsulate and reuse SQL code, making your database queries more modular, secure, and efficient.
