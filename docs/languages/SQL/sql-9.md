---
id: "sql-update-statement"
sidebar_position: 9
title: "SQL UPDATE Statement"
sidebar_label: "SQL UPDATE Statement"
description: "SQL (Structured Query Language) is a standardized programming language for managing and manipulating relational databases."
tags: [sql, dbms, database]
---The `UPDATE` statement is used to modify existing records in a table. You can update specific records using the `WHERE` clause, or update all records in a table.

In the statement below, we want to update the address of the customer with `CustomerID` 1.

### Example

Update the address for the customer with `CustomerID` equal to 1:

```sql
UPDATE Customers
SET Address = 'New Address, 123'
WHERE CustomerID = 1;
```

In the example above, the `SET` clause specifies the column(s) to update, and the `WHERE` clause specifies which record(s) to modify.

---### Syntax

```sql
UPDATE table_name
SET column1 = value1, column2 = value2, ...
WHERE condition;
```

If you omit the `WHERE` clause, all records in the table will be updated.

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

## Updating Multiple Columns

### Example

Update both the `Address` and `City` for the customer with `CustomerID` equal to 2:

```sql
UPDATE Customers
SET Address = 'New Street 456', City = 'Berlin'
WHERE CustomerID = 2;
```

---

## Updating All Records

### Example

Increase all customer postal codes by 100:

```sql
UPDATE Customers
SET PostalCode = PostalCode + 100;
```

**Note:** Be careful when using `UPDATE` without a `WHERE` clause, as it will modify all records in the table.

---

## Using Subquery in UPDATE

### Example

Update customers’ `City` based on another table called `Orders`:

```sql
UPDATE Customers
SET City = (SELECT ShipCity FROM Orders WHERE Orders.CustomerID = Customers.CustomerID)
WHERE Country = 'USA';
```

In this example, a subquery is used to select the `ShipCity` from the `Orders` table for updating `City` in the `Customers` table.

---

## Conditional Update with CASE

### Example

Update the `City` based on customer conditions using the `CASE` statement:

```sql
UPDATE Customers
SET City = CASE
              WHEN Country = 'Mexico' THEN 'Mexico City'
              WHEN Country = 'Germany' THEN 'Munich'
              ELSE City
           END;
```

The `CASE` statement is used here to conditionally update the `City` field based on the `Country` field.

---
