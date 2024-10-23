---
id: sql-aggregate-functions
sidebar_position: 14
title: "SQL Aggregate Functions"
sidebar_label: "SQL Aggregate Functions"
description: "SQL (Structured Query Language) is a standardized programming language for managing and manipulating relational databases."
tags: [sql, dbms, database]
---

An aggregate function is a function that performs a calculation on a set of values, and returns a single value.

Aggregate functions are often used with the `GROUP BY` clause of the `SELECT` statement. The `GROUP BY` clause splits the result-set into groups of values and the aggregate function can be used to return a single value for each group.

The most commonly used SQL aggregate functions are:

*   `MIN()` - returns the smallest value within the selected column
*   `MAX()` - returns the largest value within the selected column
*   `COUNT()` - returns the number of rows in a set
*   `SUM()` - returns the total sum of a numerical column
*   `AVG()` - returns the average value of a numerical column

Aggregate functions ignore null values (except for `COUNT()`).


## SQL MIN() and MAX() Functions

The `MIN()` function returns the smallest value of the selected column.

The `MAX()` function returns the largest value of the selected column.

### MIN Example

Find the lowest price in the Price column:
```
SELECT MIN(Price)  
FROM Products;
```

### MAX Example

Find the highest price in the Price column:
```
SELECT MAX(Price)  
FROM Products;
```

### Syntax

`SELECT MIN(_column_name_)   FROM _table_name_   WHERE _condition_;`

`SELECT MAX(_column_name_)   FROM _table_name_   WHERE _condition_;`

### Demo Database

Below is a selection from the Products table used in the examples:

| ProductID | ProductName | SupplierID | CategoryID | Unit | Price |
| --- | --- | --- | --- | --- | --- |
| 1 | Chais | 1 | 1 | 10 boxes x 20 bags | 18 |
| 2 | Chang | 1 | 1 | 24 - 12 oz bottles | 19 |
| 3 | Aniseed Syrup | 1 | 2 | 12 - 550 ml bottles | 10 |
| 4 | Chef Anton's Cajun Seasoning | 2 | 2 | 48 - 6 oz jars | 22 |
| 5 | Chef Anton's Gumbo Mix | 2 | 2 | 36 boxes | 21.35 |

## Set Column Name (Alias)

When you use `MIN()` or `MAX()`, the returned column will not have a descriptive name. To give the column a descriptive name, use the `AS` keyword:

### Example
```
SELECT MIN(Price) AS SmallestPrice  
FROM Products;
```

## Use MIN() with GROUP BY

Here we use the `MIN()` function and the `GROUP BY` clause, to return the smallest price for each category in the Products table:

### Example
```
SELECT MIN(Price) AS SmallestPrice, CategoryID  
FROM Products  
GROUP BY CategoryID;
```

You will learn more about the `[GROUP BY](sql_groupby.asp)` clause later in this tutorial.

=======
description: "An aggregate function is a function that performs a calculation on a set of values, and returns a single value."
tags: [sql, dbms, database]
---

## About SQL Aggregates

An aggregate function is a function that performs a calculation on a set of values and returns a single value. These functions are commonly used with the `GROUP BY` clause in SQL to group rows that share a common attribute.

The most commonly used SQL aggregate functions include:

- **MIN()**: Returns the smallest value within a selected column.
- **MAX()**: Returns the largest value within a selected column.
- **COUNT()**: Returns the number of rows in a set.
- **SUM()**: Returns the total sum of a numerical column.
- **AVG()**: Returns the average value of a numerical column.

Aggregate functions ignore null values, except for `COUNT()`.

---

## Common SQL Aggregate Functions

### MIN()
- **Description**: Returns the smallest value within the selected column.
- **Syntax**: `MIN(column_name)`
- **Example**: 
  ```sql
  SELECT MIN(salary) FROM employees;
  ```

### MAX()
- **Description**: Returns the largest value within the selected column.
- **Syntax**: `MAX(column_name)`
- **Example**: 
  ```sql
  SELECT MAX(salary) FROM employees;
  ```

### COUNT()
- **Description**: Returns the number of rows in a set.
- **Syntax**: 
  - `COUNT(column_name)`  -- Counts non-null values in the specified column  
  - `COUNT(*)`            -- Counts all rows
- **Example**: 
  ```sql
  SELECT COUNT(*) FROM employees;
  ```

### SUM()
- **Description**: Returns the total sum of a numerical column.
- **Syntax**: `SUM(column_name)`
- **Example**: 
  ```sql
  SELECT SUM(salary) FROM employees;
  ```

### AVG()
- **Description**: Returns the average value of a numerical column.
- **Syntax**: `AVG(column_name)`
- **Example**: 
  ```sql
  SELECT AVG(salary) FROM employees;
  ```

## Using Aggregate Functions with GROUP BY

Aggregate functions can be combined with the `GROUP BY` clause to group rows that have the same values in specified columns.

- **Syntax**:
  ```sql
  SELECT column1, AGGREGATE_FUNCTION(column2)
  FROM table_name
  GROUP BY column1;
  ```

- **Example**: 
  ```sql
  SELECT department, COUNT(*) AS employee_count
  FROM employees
  GROUP BY department;
 ```