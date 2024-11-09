---
id: sql-create-table
sidebar_position: 32
title: "SQL CREATE TABLE Statement"
sidebar_label: "SQL CREATE TABLE"
description: "The SQL CREATE TABLE statement is used to create a new table in the database."
tags: [sql, dbms, database, create table, schema]
---

The `CREATE TABLE` statement in SQL is used to create a new table in the database. It allows you to define the table's columns, data types, and any constraints.

### Syntax

```sql
CREATE TABLE table_name (
    column1 datatype constraint,
    column2 datatype constraint,
    ...
);
```

### Key Points

* Table and Column Names: Table names and column names should be unique within the database.
* Data Types: Define the type of data each column will hold (e.g., INT, VARCHAR, DATE).
* Constraints: Apply constraints like PRIMARY KEY, FOREIGN KEY, UNIQUE, NOT NULL, and CHECK to control data integrity.

### Example

**Example 1: Basic CREATE TABLE Statement**

Create a table named Customers with basic columns and data types.

```sql
CREATE TABLE Customers (
    CustomerID INT PRIMARY KEY,
    CustomerName VARCHAR(100) NOT NULL,
    ContactName VARCHAR(100),
    Country VARCHAR(50)
);
```

**Example 2: CREATE TABLE with Constraints**

Create a table named Orders with primary key, foreign key, and other constraints.

```sql
CREATE TABLE Orders (
    OrderID INT PRIMARY KEY,
    OrderDate DATE NOT NULL,
    CustomerID INT,
    Amount DECIMAL(10, 2),
    CONSTRAINT FK_CustomerOrder FOREIGN KEY (CustomerID) REFERENCES Customers(CustomerID)
);
```

**Example 3: CREATE TABLE with Default Values**

Create a table with a column that has a default value.

```sql
CREATE TABLE Products (
    ProductID INT PRIMARY KEY,
    ProductName VARCHAR(100) NOT NULL,
    Price DECIMAL(10, 2) DEFAULT 0.00
);
```

**Notes :**

* Primary Key: Uniquely identifies each record in the table.
* Foreign Key: Establishes a relationship with another table, ensuring data consistency.
* Default Values: Assign default values to columns when no data is provided.
* Auto-Increment: Certain SQL databases support the AUTO_INCREMENT attribute (e.g., SERIAL in PostgreSQL) for automatically generating unique values for primary keys.

The CREATE TABLE statement is fundamental for setting up the schema of a database and defining the structure and constraints for data storage.
