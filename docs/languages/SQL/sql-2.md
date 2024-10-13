---
id: "sql_syntax"
sidebar_position: 2
title: "SQL Syntax"
sidebar_label: "SQL Statements"
description: "SQL statements are commands used to perform tasks such as querying, updating, and managing data in relational databases."
tags: [sql, dbms, database]
---



## SQL Statements

Most of the actions you need to perform on a database are done with SQL statements.

SQL statements consist of keywords that are easy to understand.

## Database Tables

A database most often contains one or more tables. Each table is identified by a name (e.g., "Customers" or "Orders") and contains records (rows) with data.

In this tutorial, we will use the well-known Northwind sample database (included in MS Access and MS SQL Server).

Below is a selection from the Customers table used in the examples:

| CustomerID | CustomerName                  | ContactName    | Address                | City        | PostalCode | Country  |
|------------|-------------------------------|----------------|------------------------|-------------|------------|----------|
| 1          | Alfreds Futterkiste           | Maria Anders   | Obere Str. 57          | Berlin      | 12209      | Germany  |
| 2          | Ana Trujillo Emparedados y Helados | Ana Trujillo  | Avda. de la Constitución 2222 | México D.F. | 05021      | Mexico   |
| 3          | Antonio Moreno Taquería       | Antonio Moreno | Mataderos 2312         | México D.F. | 05023      | Mexico   |
| 4          | Around the Horn               | Thomas Hardy   | 120 Hanover Sq.        | London      | WA1 1DP    | UK       |
| 5          | Berglunds snabbköp            | Christina Berglund | Berguvsvägen 8        | Luleå       | S-958 22   | Sweden   |

The table above contains five records (one for each customer) and seven columns (CustomerID, CustomerName, ContactName, Address, City, PostalCode, and Country).

## Keep in Mind That...

SQL keywords are NOT case-sensitive: `select` is the same as `SELECT`.

In this tutorial, we will write all SQL keywords in upper-case.

* * *

## Semicolon after SQL Statements?

Some database systems require a semicolon at the end of each SQL statement.

A semicolon is the standard way to separate each SQL statement in database systems that allow more than one SQL statement to be executed in the same call to the server.

In this tutorial, we will use a semicolon at the end of each SQL statement.

* * *

## Some of The Most Important SQL Commands

* `SELECT` - extracts data from a database
* `UPDATE` - updates data in a database
* `DELETE` - deletes data from a database
* `INSERT INTO` - inserts new data into a database
* `CREATE DATABASE` - creates a new database
* `ALTER DATABASE` - modifies a database
* `CREATE TABLE` - creates a new table
* `ALTER TABLE` - modifies a table
* `DROP TABLE` - deletes a table
* `CREATE INDEX` - creates an index (search key)
* `DROP INDEX` - deletes an index
