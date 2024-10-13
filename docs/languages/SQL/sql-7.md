---
id: "sql-or-operator"
sidebar_position: 7
title: "SQL OR Operator"
sidebar_label: "SQL OR Operator"
description: "SQL (Structured Query Language) is a standardized programming language for managing and manipulating relational databases."
tags: [sql, dbms, database]
---
## SQL OR Operator

The `WHERE` clause can contain one or more `OR` operators.

The `OR` operator is used to filter records based on more than one condition, like if you want to return all customers from Germany but also those from Spain:

### Example

Select all customers from Germany or Spain:
```
SELECT \*  
FROM Customers  
WHERE Country = 'Germany' OR Country = 'Spain';
```
* * *

### Syntax

`SELECT _column1_, _column2, ..._   FROM _table_name_   WHERE _condition1_ OR _condition2_ OR _condition3 ..._;`

* * *

### OR vs AND

The `OR` operator displays a record if _any_ of the conditions are TRUE.

The `AND` operator displays a record if _all_ the conditions are TRUE.

* * *

### Demo Database

Below is a selection from the **Customers** table used in the examples:

| CustomerID | CustomerName                  | ContactName    | Address                | City        | PostalCode | Country  |
|------------|-------------------------------|----------------|------------------------|-------------|------------|----------|
| 1          | Alfreds Futterkiste           | Maria Anders   | Obere Str. 57          | Berlin      | 12209      | Germany  |
| 2          | Ana Trujillo Emparedados y Helados | Ana Trujillo  | Avda. de la Constitución 2222 | México D.F. | 05021      | Mexico   |
| 3          | Antonio Moreno Taquería       | Antonio Moreno | Mataderos 2312         | México D.F. | 05023      | Mexico   |
| 4          | Around the Horn               | Thomas Hardy   | 120 Hanover Sq.        | London      | WA1 1DP    | UK       |
| 5          | Berglunds snabbköp            | Christina Berglund | Berguvsvägen 8        | Luleå       | S-958 22   | Sweden   |

* * *

### At Least One Condition Must Be True

The following SQL statement selects all fields from Customers where either `City` is "Berlin", `CustomerName` starts with the letter "G" or `Country` is "Norway":

### Example
```
SELECT \* FROM Customers  
WHERE City = 'Berlin' OR CustomerName LIKE 'G%' OR Country = 'Norway';
```
* * *

### Combining AND and OR

You can combine the `AND` and `OR` operators.

The following SQL statement selects all customers from Spain that starts with a "G" or an "R".

Make sure you use parenthesis to get the correct result.

### Example

Select all Spanish customers that starts with either "G" or "R":
```
SELECT \* FROM Customers  
WHERE Country = 'Spain' AND (CustomerName LIKE 'G%' OR CustomerName LIKE 'R%');
```
Without parenthesis, the select statement will return all customers from Spain that starts with a "G", _plus_ all customers that starts with an "R", regardless of the country value:

### Example

Select all customers that either:  
are from Spain and starts with either "G", _or_  
starts with the letter "R":
```
SELECT \* FROM Customers  
WHERE Country = 'Spain' AND CustomerName LIKE 'G%' OR CustomerName LIKE 'R%';
```
* * *
