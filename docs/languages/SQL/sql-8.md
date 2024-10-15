---
id: "sql-not-operator"
sidebar_position: 8
title: "SQL NOT Operator"
sidebar_label: "SQL NOT Operator"
description: "SQL (Structured Query Language) is a standardized programming language for managing and manipulating relational databases."
tags: [sql, dbms, database]
---

The `NOT` operator is used in combination with other operators to give the opposite result, also called the negative result.

In the select statement below we want to return all customers that are NOT from Spain:

### Example

Select only the customers that are NOT from Spain:
```
SELECT \* FROM Customers  
WHERE NOT Country = 'Spain';
```

In the example above, the `NOT` operator is used in combination with the `=` operator, but it can be used in combination with other comparison and/or logical operators. See examples below.

* * *

### Syntax

`SELECT _column1_, _column2, ..._   FROM _table_name_   WHERE NOT _condition_;`

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

## NOT LIKE

### Example

Select customers that does not start with the letter 'A':
```
SELECT \* FROM Customers  
WHERE CustomerName NOT LIKE 'A%';
```
* * *

## NOT BETWEEN

### Example

Select customers with a customerID not between 10 and 60:
```
SELECT \* FROM Customers  
WHERE CustomerID NOT BETWEEN 10 AND 60;
```


##  NOT IN
### Example

Select customers that are not from Paris or London:
```
SELECT \* FROM Customers  
WHERE City NOT IN ('Paris', 'London');
```
* * *

## NOT Greater Than

### Example

Select customers with a CustomerId not greater than 50:
```
SELECT \* FROM Customers  
WHERE NOT CustomerID > 50;
```
**Note:** There is a not-greater-than operator: `!>` that would give you the same result.

* * *

## NOT Less Than

### Example

Select customers with a CustomerID not less than 50:
```
SELECT \* FROM Customers  
WHERE NOT CustomerId < 50;
```
**Note:** There is a not-less-than operator: `!<` that would give you the same result.

* * *

