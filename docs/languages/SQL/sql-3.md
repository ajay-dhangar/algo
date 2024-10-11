---
id: "sql_select_statement"
sidebar_position: 3
title: "SQL SELECT"
sidebar_label: "SQL Select"
description: "The SELECT statement retrieves specific data from one or more tables in a database."
tags: [sql, dbms, database]
---


## Syntax

`SELECT _column1_, _column2_, ... FROM _table_name_;`

Here, column1, column2, ... are the _field names_ of the table you want to select data from.

The `table_name` represents the name of the _table_ you want to select data from.

* * *

## Demo Database


Below is a selection from the Customers table used in the examples:

| CustomerID | CustomerName                  | ContactName    | Address                | City        | PostalCode | Country  |
|------------|-------------------------------|----------------|------------------------|-------------|------------|----------|
| 1          | Alfreds Futterkiste           | Maria Anders   | Obere Str. 57          | Berlin      | 12209      | Germany  |
| 2          | Ana Trujillo Emparedados y Helados | Ana Trujillo  | Avda. de la Constitución 2222 | México D.F. | 05021      | Mexico   |
| 3          | Antonio Moreno Taquería       | Antonio Moreno | Mataderos 2312         | México D.F. | 05023      | Mexico   |
| 4          | Around the Horn               | Thomas Hardy   | 120 Hanover Sq.        | London      | WA1 1DP    | UK       |
| 5          | Berglunds snabbköp            | Christina Berglund | Berguvsvägen 8        | Luleå       | S-958 22   | Sweden   |

## Select ALL columns

If you want to return all columns without specifying every column name, you can use the `SELECT *` syntax:

### Example

Return all the columns from the Customers table:

`SELECT * FROM Customers;`

SQL SELECT DISTINCT Statement
-----------------------------

The SQL SELECT DISTINCT Statement
---------------------------------

The `SELECT DISTINCT` statement is used to return only distinct (different) values.

### Example

Select all the different countries from the "Customers" table:

`SELECT DISTINCT Country FROM Customers;`

Inside a table, a column often contains many duplicate values; and sometimes you only want to list the different (distinct) values.

| CustomerID | CustomerName                  | ContactName    | Address                | City        | PostalCode | Country  |
|------------|-------------------------------|----------------|------------------------|-------------|------------|----------|
| 1          | Alfreds Futterkiste           | Maria Anders   | Obere Str. 57          | Berlin      | 12209      | Germany  |
| 2          | Ana Trujillo Emparedados y Helados | Ana Trujillo  | Avda. de la Constitución 2222 | México D.F. | 05021      | Mexico   |
| 3          | Antonio Moreno Taquería       | Antonio Moreno | Mataderos 2312         | México D.F. | 05023      | Mexico   |
| 4          | Around the Horn               | Thomas Hardy   | 120 Hanover Sq.        | London      | WA1 1DP    | UK       |
| 5          | Berglunds snabbköp            | Christina Berglund | Berguvsvägen 8        | Luleå       | S-958 22   | Sweden   |

## SELECT Example Without DISTINCT

If you omit the `DISTINCT` keyword, the SQL statement returns the "Country" value from all the records of the "Customers" table:

### Example

`SELECT Country FROM Customers;`

## Count Distinct

By using the `DISTINCT` keyword in a function called `COUNT`, we can return the number of different countries.

### Example

`SELECT COUNT(DISTINCT Country) FROM Customers;`

**Note:** The `COUNT(DISTINCT _column_name_)` is not supported in Microsoft Access databases.

Here is a workaround for MS Access:

### Example

`SELECT Count(*) AS DistinctCountries FROM (SELECT DISTINCT Country FROM Customers);`

You will learn about the COUNT function later in this tutorial.
