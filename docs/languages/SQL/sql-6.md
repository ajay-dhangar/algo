---
id: "sql-and-operator"
sidebar_position: 6
title: "SQL AND Operator"
sidebar_label: "SQL AND Operator"
description: "SQL (Structured Query Language) is a standardized programming language for managing and manipulating relational databases."
tags: [sql, dbms, database]
---


The `WHERE` clause can contain one or many `AND` operators.

The `AND` operator is used to filter records based on more than one condition, like if you want to return all customers from Spain that starts with the letter 'G':

### Example

Select all customers from Spain that starts with the letter 'G':
```
SELECT \*  
FROM Customers  
WHERE Country = 'Spain' AND CustomerName LIKE 'G%';
```
* * *

### Syntax

`SELECT _column1_, _column2, ..._   FROM _table_name_   WHERE _condition1_ AND _condition2_ AND _condition3 ..._;`

* * *

## AND vs OR

The `AND` operator displays a record if _all_ the conditions are TRUE.

The `OR` operator displays a record if _any_ of the conditions are TRUE.

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


## All Conditions Must Be True

The following SQL statement selects all fields from `Customers` where `Country` is "Germany" AND `City` is "Berlin" AND `PostalCode` is higher than 12000:

### Example
```
SELECT \* FROM Customers  
WHERE Country = 'Germany'  
AND City = 'Berlin'  
AND PostalCode > 12000;
```
* * *

## Combining AND and OR

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

