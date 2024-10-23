---
id: sql-aggregate-functions
sidebar_position: 14
title: "SQL Aggregate Functions"
sidebar_label: "SQL Aggregate Functions"
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
---