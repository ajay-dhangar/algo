---

id: sql-cheatsheet
title: "SQL Cheatsheet"
sidebar_label: "SQL Cheatsheet"
sidebar_position: 5
description: "A fast, practical SQL reference for interviews, DBMS, and backend development."
tags: [sql, database, mysql, cheatsheet]
---

This page is a quick reference for commonly used SQL commands and database operations. Whether you're preparing for interviews, learning DBMS, or building backend applications, this cheatsheet covers the essentials.

## Video Explanation

<LiteYouTubeEmbed
  id="HXV3zeQKqGY"
  params="autoplay=1&autohide=1&showinfo=0&rel=0"
  title="SQL Tutorial - Full Database Course for Beginners"
  lazyLoad={true}
  webp
/>

## Database Operations

### Create Database

```sql
CREATE DATABASE company_db;
```

### Use Database

```sql
USE company_db;
```

### Delete Database

```sql
DROP DATABASE company_db;
```

---

## Table Operations

### Create Table

```sql
CREATE TABLE employees (
    id INT PRIMARY KEY,
    name VARCHAR(100),
    department VARCHAR(50),
    salary DECIMAL(10,2),
    joining_date DATE
);
```

### View Table Structure

```sql
DESC employees;
```

### Rename Table

```sql
RENAME TABLE employees TO staff;
```

### Delete Table

```sql
DROP TABLE employees;
```

---

## Insert Data

### Insert Single Row

```sql
INSERT INTO employees
VALUES (1, 'John Doe', 'IT', 50000, '2025-01-15');
```

### Insert Multiple Rows

```sql
INSERT INTO employees
VALUES
(2, 'Alice', 'HR', 45000, '2025-02-10'),
(3, 'Bob', 'Finance', 55000, '2025-03-05');
```

---

## Select Queries

### Select All Data

```sql
SELECT * FROM employees;
```

### Select Specific Columns

```sql
SELECT name, salary
FROM employees;
```

### Distinct Values

```sql
SELECT DISTINCT department
FROM employees;
```

---

## Filtering Data

### WHERE Clause

```sql
SELECT *
FROM employees
WHERE salary > 50000;
```

### AND Operator

```sql
SELECT *
FROM employees
WHERE department = 'IT'
AND salary > 40000;
```

### OR Operator

```sql
SELECT *
FROM employees
WHERE department = 'IT'
OR department = 'HR';
```

### BETWEEN

```sql
SELECT *
FROM employees
WHERE salary BETWEEN 40000 AND 60000;
```

### IN

```sql
SELECT *
FROM employees
WHERE department IN ('IT', 'HR');
```

### LIKE

```sql
SELECT *
FROM employees
WHERE name LIKE 'A%';
```

### Wildcards

- `'A%'` → Starts with A
- `'%A'` → Ends with A
- `'%A%'` → Contains A
- `'_A%'` → Second character is A

---

## Sorting Data

### Ascending Order

```sql
SELECT *
FROM employees
ORDER BY salary ASC;
```

### Descending Order

```sql
SELECT *
FROM employees
ORDER BY salary DESC;
```

---

## Aggregate Functions

### COUNT

```sql
SELECT COUNT(*) AS total_employees
FROM employees;
```

### SUM

```sql
SELECT SUM(salary)
FROM employees;
```

### AVG

```sql
SELECT AVG(salary)
FROM employees;
```

### MAX

```sql
SELECT MAX(salary)
FROM employees;
```

### MIN

```sql
SELECT MIN(salary)
FROM employees;
```

---

## GROUP BY

### Department-wise Employee Count

```sql
SELECT department,
       COUNT(*)
FROM employees
GROUP BY department;
```

### Department-wise Average Salary

```sql
SELECT department,
       AVG(salary)
FROM employees
GROUP BY department;
```

---

## HAVING Clause

```sql
SELECT department,
       COUNT(*)
FROM employees
GROUP BY department
HAVING COUNT(*) > 2;
```

---

## Update Data

### Update Record

```sql
UPDATE employees
SET salary = 60000
WHERE id = 1;
```

---

## Delete Data

### Delete Specific Row

```sql
DELETE FROM employees
WHERE id = 1;
```

### Delete All Rows

```sql
DELETE FROM employees;
```

---

## ALTER TABLE

### Add Column

```sql
ALTER TABLE employees
ADD email VARCHAR(100);
```

### Modify Column

```sql
ALTER TABLE employees
MODIFY salary DECIMAL(12,2);
```

### Rename Column

```sql
ALTER TABLE employees
RENAME COLUMN name TO employee_name;
```

### Drop Column

```sql
ALTER TABLE employees
DROP COLUMN email;
```

---

## SQL Constraints

### Common Constraints

```sql
CREATE TABLE students (
    id INT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE,
    age INT CHECK(age >= 18)
);
```

### Constraint Types

```text
PRIMARY KEY
FOREIGN KEY
UNIQUE
NOT NULL
CHECK
DEFAULT
```

---

## Joins

### INNER JOIN

```sql
SELECT e.name,
       d.department_name
FROM employees e
INNER JOIN departments d
ON e.department_id = d.id;
```

### LEFT JOIN

```sql
SELECT *
FROM employees e
LEFT JOIN departments d
ON e.department_id = d.id;
```

### RIGHT JOIN

```sql
SELECT *
FROM employees e
RIGHT JOIN departments d
ON e.department_id = d.id;
```

### FULL OUTER JOIN

```sql
SELECT *
FROM employees e
FULL OUTER JOIN departments d
ON e.department_id = d.id;
```

---

## Subqueries

### Above Average Salary

```sql
SELECT *
FROM employees
WHERE salary >
(
    SELECT AVG(salary)
    FROM employees
);
```

---

## Views

### Create View

```sql
CREATE VIEW high_salary_employees AS
SELECT *
FROM employees
WHERE salary > 50000;
```

### Use View

```sql
SELECT * FROM high_salary_employees;
```

---

## Indexes

### Create Index

```sql
CREATE INDEX idx_employee_name
ON employees(name);
```

### Remove Index

```sql
DROP INDEX idx_employee_name ON employees;
```

---

## Transactions

### Commit Transaction

```sql
START TRANSACTION;

UPDATE accounts
SET balance = balance - 1000
WHERE id = 1;

UPDATE accounts
SET balance = balance + 1000
WHERE id = 2;

COMMIT;
```

### Rollback Transaction

```sql
ROLLBACK;
```

---

## Common Interview Queries

### Second Highest Salary

```sql
SELECT MAX(salary)
FROM employees
WHERE salary <
(
    SELECT MAX(salary)
    FROM employees
);
```

### Find Duplicate Records

```sql
SELECT name,
       COUNT(*)
FROM employees
GROUP BY name
HAVING COUNT(*) > 1;
```

### Delete Duplicate Records

```sql
DELETE e1
FROM employees e1
INNER JOIN employees e2
ON e1.name = e2.name
AND e1.id > e2.id;
```

### Top 5 Highest Salaries

```sql
SELECT *
FROM employees
ORDER BY salary DESC
LIMIT 5;
```

---

## SQL Execution Order

```text
FROM
WHERE
GROUP BY
HAVING
SELECT
ORDER BY
LIMIT
```

---

## References

- [MySQL Documentation](https://dev.mysql.com/doc/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [SQLBolt](https://sqlbolt.com/)
- [W3Schools SQL](https://www.w3schools.com/sql/)
- [GeeksforGeeks SQL Tutorial](https://www.geeksforgeeks.org/sql-tutorial/)
