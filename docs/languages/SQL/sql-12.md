---
id: "sql-alter-table-statement"
sidebar_position: 12
title: "SQL ALTER TABLE Statement"
sidebar_label: "SQL ALTER TABLE Statement"
description: "SQL (Structured Query Language) is a standardized programming language for managing and manipulating relational databases."
tags: [sql, dbms, database]
---

The `ALTER TABLE` statement is used to modify an existing table structure, such as adding, deleting, or modifying columns, and altering table constraints.

In the statement below, we add a new column to the **Customers** table.

### Example

Add a new column for storing the customer’s email:

```sql
ALTER TABLE Customers
ADD Email VARCHAR(100);
```

In this example, the `ALTER TABLE` statement adds a new column called `Email` with a data type of `VARCHAR(100)`.

---

### Syntax

To **add** a column:

```sql
ALTER TABLE table_name
ADD column_name datatype;
```

To **drop** a column:

```sql
ALTER TABLE table_name
DROP COLUMN column_name;
```

To **modify** a column:

```sql
ALTER TABLE table_name
MODIFY COLUMN column_name datatype;
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

## Adding a Column

### Example

Add a `Phone` column to the table:

```sql
ALTER TABLE Customers
ADD Phone VARCHAR(15);
```

This example shows how to add a new column named `Phone` to the table.

---

## Dropping a Column

### Example

Remove the `PostalCode` column from the table:

```sql
ALTER TABLE Customers
DROP COLUMN PostalCode;
```

Using `DROP COLUMN` removes the specified column and all data within it.

---

## Modifying a Column

### Example

Change the `City` column’s data type to `CHAR(50)`:

```sql
ALTER TABLE Customers
MODIFY COLUMN City CHAR(50);
```

You can use `MODIFY COLUMN` to change a column’s data type, length, or constraints.

---

## Renaming a Column

### Example

Rename the `Address` column to `StreetAddress`:

```sql
ALTER TABLE Customers
RENAME COLUMN Address TO StreetAddress;
```

Note: Some SQL databases use the `ALTER TABLE` with `CHANGE` or `MODIFY` syntax for renaming columns.

---

## Adding Constraints

### Example

Add a `UNIQUE` constraint on the `Email` column:

```sql
ALTER TABLE Customers
ADD CONSTRAINT uc_email UNIQUE (Email);
```

Adding constraints can enforce data integrity and consistency in the table.

---

## Dropping Constraints

### Example

Remove the `UNIQUE` constraint from the `Email` column:

```sql
ALTER TABLE Customers
DROP CONSTRAINT uc_email;
```

When dropping constraints, use the specific constraint name to identify it.

---

## Renaming a Table

### Example

Rename the `Customers` table to `Clients`:

```sql
ALTER TABLE Customers
RENAME TO Clients;
```

This will change the name of the entire table to `Clients`.

---
