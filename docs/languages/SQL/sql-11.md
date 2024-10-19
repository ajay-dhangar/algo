---
id: sql-insert-into-statement
sidebar_position: 11
title: "SQL INSERT INTO Statement"
sidebar_label: "SQL INSERT INTO Statement"
description: "SQL (Structured Query Language) is a standardized programming language for managing and manipulating relational databases."
tags: [sql, dbms, database]
---

The `INSERT INTO` statement is used to add new records to a table. You can insert data into all columns or only into specific columns by specifying their names.

In the example below, we add a new customer record to the **Customers** table.

### Example

Insert a new customer with all column values specified:

```sql
INSERT INTO Customers (CustomerID, CustomerName, ContactName, Address, City, PostalCode, Country)
VALUES (6, 'Tortuga Cafe', 'Linda Tortuga', 'Ocean St. 45', 'San Diego', '92101', 'USA');
```

In this example, the `INSERT INTO` statement adds a new row with specific values for each column.

---

### Syntax

For inserting data into **all columns**:

```sql
INSERT INTO table_name
VALUES (value1, value2, ...);
```

For inserting data into **specific columns**:

```sql
INSERT INTO table_name (column1, column2, ...)
VALUES (value1, value2, ...);
```

---

### Demo Database

Below is a selection from the **Customers** table used in the examples:

| CustomerID | CustomerName                       | ContactName        | Address                       | City        | PostalCode | Country |
| ---------- | ---------------------------------- | ------------------ | ----------------------------- | ----------- | ---------- | ------- |
| 1          | Alfreds Futterkiste                | Maria Anders       | Obere Str. 57                 | Berlin      | 12209      | Germany |
| 2          | Ana Trujillo Emparedados y Helados | Ana Trujillo       | Avda. de la Constitución 2222 | México D.F. | 05021      | Mexico  |
| 3          | Antonio Moreno Taquería            | Antonio Moreno     | Mataderos 2312                | México D.F. | 05023      | Mexico  |
| 4          | Around the Horn                    | Thomas Hardy       | 120 Hanover Sq.               | London      | WA1 1DP    | UK      |
| 5          | Berglunds snabbköp                 | Christina Berglund | Berguvsvägen 8                | Luleå       | S-958 22   | Sweden  |

---

## Insert into Specific Columns

### Example

Insert a new customer into specific columns only:

```sql
INSERT INTO Customers (CustomerName, Country)
VALUES ('Desert King', 'USA');
```

If you don’t specify certain columns, they may be filled with default values or `NULL` depending on the table structure.

---

## Insert Multiple Rows

### Example

Insert multiple rows at once:

```sql
INSERT INTO Customers (CustomerName, Country)
VALUES ('Kingdom Cones', 'Canada'),
       ('Sunrise Deli', 'Australia');
```

Multiple rows can be inserted in a single `INSERT INTO` statement by separating each row with a comma.

---

## Using Subquery in INSERT INTO

### Example

Insert new customers based on data from another table:

```sql
INSERT INTO Customers (CustomerName, Country)
SELECT SupplierName, Country FROM Suppliers
WHERE Country = 'USA';
```

In this example, data is copied from the `Suppliers` table into the `Customers` table, based on a condition.

---

## Inserting Default Values

### Example

Insert a new customer with default values for certain columns:

```sql
INSERT INTO Customers (CustomerName)
VALUES ('Misty Mountain Market');
```

Columns not specified will use their default value or `NULL` if no default is set.

---

## Inserting Data with NULL Values

### Example

Insert a new customer, leaving some columns as `NULL`:

```sql
INSERT INTO Customers (CustomerID, CustomerName, ContactName)
VALUES (7, 'Mountain Bakery', NULL);
```

In this case, `NULL` can be explicitly inserted for columns where data is unknown or not applicable.

---
