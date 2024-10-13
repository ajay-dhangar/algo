---
id: "sql-order-by"
sidebar_position: 5
title: "SQL ORDER BY"
sidebar_label: "SQL ORDER BY"
description: "SQL (Structured Query Language) is a standardized programming language for managing and manipulating relational databases."
tags: [sql, dbms, database]
---
## SQL ORDER BY

The `ORDER BY` keyword is used to sort the result-set in ascending or descending order.

### Example

Sort the products by price:
```
SELECT \* FROM Products  
ORDER BY Price;
```

* * *

### Syntax

`SELECT _column1_, _column2, ..._   FROM _table_name_   ORDER BY _column1, column2, ..._ ASC|DESC;`

* * *

### Demo Database

Below is a selection from the **Products** table used in the examples:

| ProductID | ProductName | SupplierID | CategoryID | Unit | Price |
| --- | --- | --- | --- | --- | --- |
| 1 | Chais | 1 | 1 | 10 boxes x 20 bags | 18 |
| 2 | Chang | 1 | 1 | 24 - 12 oz bottles | 19 |
| 3 | Aniseed Syrup | 1 | 2 | 12 - 550 ml bottles | 10 |
| 4 | Chef Anton's Cajun Seasoning | 2 | 2 | 48 - 6 oz jars | 22 |
| 5 | Chef Anton's Gumbo Mix | 2 | 2 | 36 boxes | 21.35 |

* * *


### DESC

The `ORDER BY` keyword sorts the records in ascending order by default. To sort the records in descending order, use the `DESC` keyword.

### Example

Sort the products from highest to lowest price:
```
SELECT \* FROM Products  
ORDER BY Price DESC;
```
* * *

### Order Alphabetically

For string values the `ORDER BY` keyword will order alphabetically:

### Example

Sort the products alphabetically by ProductName:
```
SELECT \* FROM Products  
ORDER BY ProductName;
```

* * *

### Alphabetically DESC

To sort the table reverse alphabetically, use the `DESC` keyword:

### Example

Sort the products by ProductName in reverse order:
```
SELECT \* FROM Products  
ORDER BY ProductName DESC;
```

* * *

### ORDER BY Several Columns

The following SQL statement selects all customers from the "Customers" table, sorted by the "Country" and the "CustomerName" column. This means that it orders by Country, but if some rows have the same Country, it orders them by CustomerName:

### Example

```
SELECT \* FROM Customers  
ORDER BY Country, CustomerName;
```
* * *

### Using Both ASC and DESC

The following SQL statement selects all customers from the "Customers" table, sorted ascending by the "Country" and descending by the "CustomerName" column:

### Example
```
SELECT \* FROM Customers  
ORDER BY Country ASC, CustomerName DESC;
```
* * *

