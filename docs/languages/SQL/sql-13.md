---
id: sql-drop-statement
sidebar_position: 13
title: "SQL DROP Statement"
sidebar_label: "SQL DROP Statement"
description: "SQL (Structured Query Language) is a standardized programming language for managing and manipulating relational databases."
tags: [sql, dbms, database]
---

The `DROP` statement is used to delete entire tables, databases, or specific constraints from a table. It removes the specified object and all associated data permanently, so use with caution.

In the statement below, we delete the entire **Customers** table from the database.

### Example

Drop the **Customers** table:

```sql
DROP TABLE Customers;
```

In this example, the `DROP TABLE` statement deletes the **Customers** table and all data within it.

---

### Syntax

To **drop a table**:

```sql
DROP TABLE table_name;
```

To **drop a database**:

```sql
DROP DATABASE database_name;
```

To **drop a constraint** from a table:

```sql
ALTER TABLE table_name
DROP CONSTRAINT constraint_name;
```

---

### Demo Database

The **Customers** table structure used in the examples would look like this before dropping:

| CustomerID | CustomerName                       | ContactName        | Address                       | City        | PostalCode | Country |
| ---------- | ---------------------------------- | ------------------ | ----------------------------- | ----------- | ---------- | ------- |
| 1          | Alfreds Futterkiste                | Maria Anders       | Obere Str. 57                 | Berlin      | 12209      | Germany |
| 2          | Ana Trujillo Emparedados y Helados | Ana Trujillo       | Avda. de la Constitución 2222 | México D.F. | 05021      | Mexico  |
| 3          | Antonio Moreno Taquería            | Antonio Moreno     | Mataderos 2312                | México D.F. | 05023      | Mexico  |
| 4          | Around the Horn                    | Thomas Hardy       | 120 Hanover Sq.               | London      | WA1 1DP    | UK      |
| 5          | Berglunds snabbköp                 | Christina Berglund | Berguvsvägen 8                | Luleå       | S-958 22   | Sweden  |

---

## Dropping a Table

### Example

Delete the **Orders** table:

```sql
DROP TABLE Orders;
```

This deletes the entire **Orders** table and all of its data permanently.

---

## Dropping a Database

### Example

Delete the **SalesDB** database:

```sql
DROP DATABASE SalesDB;
```

Using `DROP DATABASE` will remove the database and all tables and data within it.

---

## Dropping a Column Constraint

### Example

Remove the `UNIQUE` constraint from the **Email** column in the **Customers** table:

```sql
ALTER TABLE Customers
DROP CONSTRAINT uc_email;
```

To drop constraints such as `UNIQUE`, `FOREIGN KEY`, or `PRIMARY KEY`, use `ALTER TABLE` followed by `DROP CONSTRAINT` and the specific constraint name.

---

## Dropping an Index

### Example

Delete an index named `idx_customer_name`:

```sql
DROP INDEX idx_customer_name;
```

Dropping an index improves space efficiency but may slow down query performance for indexed columns.

---

## Dropping a View

### Example

Delete a view named `CustomerOrders`:

```sql
DROP VIEW CustomerOrders;
```

Views can be removed using the `DROP VIEW` statement, similar to tables.

---

## Important Notes

- **Irreversible**: The `DROP` statement permanently removes objects, and this action cannot be undone.
- **Dependencies**: Dropping tables or databases with dependencies will fail unless the dependencies are removed first.
- **Permissions**: Dropping tables or databases may require specific user permissions.

---
