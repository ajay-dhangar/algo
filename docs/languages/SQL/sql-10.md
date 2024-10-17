---
id: "sql-delete-statement"
sidebar_position: 10
title: "SQL DELETE Statement"
sidebar_label: "SQL DELETE Statement"
description: "SQL (Structured Query Language) is a standardized programming language for managing and manipulating relational databases."
tags: [sql, dbms, database]
---

The `DELETE` statement is used to remove existing records from a table. You can delete specific records using the `WHERE` clause, or delete all records from a table without deleting the table itself.

In the statement below, we delete the customer with `CustomerID` 1.

### Example

Delete the customer with `CustomerID` equal to 1:

```sql
DELETE FROM Customers
WHERE CustomerID = 1;
```

In the example above, the `DELETE` statement removes the row(s) matching the condition specified in the `WHERE` clause.

---

### Syntax

```sql
DELETE FROM table_name
WHERE condition;
```

If you omit the `WHERE` clause, all records in the table will be deleted.

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

## Deleting Multiple Records

### Example

Delete all customers from Mexico:

```sql
DELETE FROM Customers
WHERE Country = 'Mexico';
```

---

## Deleting All Records

### Example

Delete all customers from the table:

```sql
DELETE FROM Customers;
```

**Note:** Be careful when using `DELETE` without a `WHERE` clause, as it will remove all records in the table.

---

## Using Subquery in DELETE

### Example

Delete customers who have no orders in the `Orders` table:

```sql
DELETE FROM Customers
WHERE CustomerID NOT IN (SELECT CustomerID FROM Orders);
```

In this example, a subquery is used to specify customers who do not have entries in the `Orders` table.

---

## Conditional Delete with Multiple Conditions

### Example

Delete customers from Germany who live in Berlin:

```sql
DELETE FROM Customers
WHERE Country = 'Germany' AND City = 'Berlin';
```

You can combine multiple conditions using `AND`, `OR`, etc., to refine which records should be deleted.

---

## Truncate Table (Alternative to DELETE)

While `DELETE` removes records row by row and can be filtered, `TRUNCATE` is another option to delete all rows quickly.

### Example

```sql
TRUNCATE TABLE Customers;
```

**Note:** `TRUNCATE` is faster than `DELETE` without a `WHERE` clause but cannot be used to delete specific records and usually cannot be rolled back.

---
