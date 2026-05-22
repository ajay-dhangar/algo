---
id: c-cheatsheet
title: C Cheatsheet
sidebar_label: C Cheatsheet
sidebar_position: 2
description: "A fast, practical C reference for DSA, competitive programming, and systems."
tags: [c, cheatsheet, dsa, systems]
---

This page is a quick reference for C patterns that show up constantly in DSA, competitive programming, and systems programming. If you're just starting out, don't worry - every snippet here is explained line by line 😊

## Basic Syntax

### Data Types

```c title="Basic data type syntax in C"
int a = 1;                // 32-bit integer
long long b = 1000000000LL; // 64-bit integer
float f = 3.14f;          // 32-bit decimal
double d = 3.14159;       // 64-bit decimal
char c = 'A';             // 8-bit character (also used as small integer)
unsigned int u = 42;      // Non-negative 32-bit integer
short s = 32767;          // 16-bit integer
```

### Format Specifiers (printf / scanf)

```c title="Common format specifiers in C"
printf("%d", a);          // int
printf("%lld", b);        // long long
printf("%f", d);          // float or double
printf("%c", c);          // char
printf("%s", str);        // string (char array)
printf("%u", u);          // unsigned int
printf("%x", a);          // hexadecimal (lowercase)
printf("%p", ptr);        // pointer address
scanf("%d", &a);          // Read int - note the & (address-of)
scanf("%lld", &b);        // Read long long
scanf("%s", str);         // Read string - no & needed for arrays
```

### Operators and Control Flow

```c title="Control flow syntax in C"
// if, else if, else
if (a > 0) {
  // ...
} else if (a == 0) {
  // ...
} else {
  // ...
}

for (int i = 0; i < n; i++) {}   // i -> 0, 1, 2, ..., n-1
while (n-- > 0) {}               // n -> n, n-1, ..., 1
do { /* runs at least once */ } while (condition);

switch (a) {
  case 1: /* ... */ break;
  default: /* ... */
}
```

### Bitwise Operators

```c title="Bitwise operators in C"
int x = 5;              // Binary: 0101
int y = 3;              // Binary: 0011

int and  = x & y;       // 0001 = 1  — both bits must be 1
int or   = x | y;       // 0111 = 7  — at least one bit is 1
int xor  = x ^ y;       // 0110 = 6  — exactly one bit is 1
int not  = ~x;          // Flips all bits
int lsh  = x << 1;      // 1010 = 10 — multiply by 2
int rsh  = x >> 1;      // 0010 = 2  — divide by 2

// Common tricks
int isEven  = !(x & 1);      // true if x is even
int setBit  = x | (1 << 2);  // Set bit 2
int clrBit  = x & ~(1 << 2); // Clear bit 2
int togBit  = x ^ (1 << 2);  // Toggle bit 2
int chkBit  = (x >> 2) & 1;  // Check bit 2
```

## Input and Output

```c title="I/O in C"
#include <stdio.h>

int n;
scanf("%d", &n);                  // Read a single integer
printf("Value: %d\n", n);        // Print integer with newline

char line[100];
fgets(line, sizeof(line), stdin); // Read full line including spaces

// Fast I/O for competitive programming
#define FAST_IO() // just use scanf/printf — already faster than cin/cout
```

## Arrays

```c title="Array syntax in C"
int arr[5] = {1, 2, 3, 4, 5};    // 1D array, size 5, values initialized
int zeros[100] = {0};             // All elements set to 0
int grid[3][4];                   // 2D array, 3 rows, 4 columns

// Initializing with memset (from string.h)
memset(arr, 0, sizeof(arr));      // Set all bytes to 0
memset(arr, -1, sizeof(arr));     // Set all bytes to 0xFF, so each int becomes -1

int len = sizeof(arr) / sizeof(arr[0]); // Number of elements in arr, i.e len = 5
```

## Strings

```c title="String syntax in C"
#include <string.h>

char s[50] = "hello";           // String is a char array ending with '\0'
int len = strlen(s);            // Length of string, i.e len = 5 (excludes '\0')
strcpy(dest, s);                // Copy s into dest
strcat(dest, s);                // Append s to dest
int cmp = strcmp(s1, s2);       // 0 if equal, <0 if s1 < s2, >0 if s1 > s2
char *pos = strstr(s, "ell");   // Pointer to first occurrence of "ell" in s, or NULL

// Character checks (from ctype.h)
#include <ctype.h>
isdigit('3');   // true — is it a digit?
isalpha('A');   // true — is it a letter?
islower('a');   // true — is it lowercase?
toupper('a');   // Returns 'A'
tolower('A');   // Returns 'a'
```

## Pointers

```c title="Pointer syntax in C"
int x = 10;
int *ptr = &x;        // ptr holds the address of x
int val = *ptr;       // Dereference — val = 10 (value at address ptr)
*ptr = 20;            // Modify x through ptr — now x = 20

// NULL pointer
int *p = NULL;        // Safe default for uninitialized pointers
if (p != NULL) {}     // Always check before dereferencing

// Pointer to pointer
int **pp = &ptr;      // pp holds address of ptr
int v = **pp;         // Double dereference — v = 20
```

### Pointer Arithmetic

```c title="Pointer arithmetic in C"
int arr[] = {10, 20, 30, 40};
int *p = arr;          // p points to arr[0]

p++;                   // p now points to arr[1]
int x = *(p + 2);      // x = arr[3] = 40 — offset by 2 from current position
int diff = p - arr;    // Number of elements between pointers, i.e diff = 1

// Array and pointer equivalence
arr[i] == *(arr + i);  // These are identical in C
```

### `void*` and Type Casting

```c title="void pointer and casting in C"
void *vp;              // Generic pointer — can hold any type's address
int x = 5;
vp = &x;               // Assign int address to void pointer

int *ip = (int *)vp;   // Cast back to int pointer before dereferencing
int val = *ip;         // val = 5

// Casting in general
double d = (double)5 / 2;  // d = 2.5 — cast before division
int i = (int)3.99;          // i = 3 — truncates decimal
```

## Functions

```c title="Function syntax in C"
// Declaration (prototype) — needed if defined after main
int add(int a, int b);

// Definition
int add(int a, int b) {
  return a + b;        // Returns sum of a and b
}

// Call
int result = add(3, 4); // result = 7

// Void function
void greet(char *name) {
  printf("Hello, %s\n", name); // No return value
}
```

### Pass by Value vs Pass by Pointer

```c title="Pass by value and pointer in C"
void doubleVal(int x) {
  x *= 2;              // Only modifies local copy — caller unchanged
}

void doublePtr(int *x) {
  *x *= 2;             // Modifies the original variable through pointer
}

int a = 5;
doubleVal(a);          // a still = 5
doublePtr(&a);         // a now = 10
```

### Recursion

```c title="Recursion syntax in C"
int factorial(int n) {
  if (n <= 1) return 1;         // Base case
  return n * factorial(n - 1); // Recursive call
}

int fib(int n) {
  if (n <= 1) return n;         // Base case: fib(0)=0, fib(1)=1
  return fib(n - 1) + fib(n - 2); // Recursive case
}
```

## Structures

```c title="Struct syntax in C"
struct Point {
  int x;
  int y;
};

struct Point p = {3, 4};   // Initialize struct
p.x = 10;                  // Access member with dot operator
printf("%d %d\n", p.x, p.y);

// typedef — avoid writing 'struct' every time
typedef struct {
  int x, y;
} Point;

Point q = {1, 2};          // No 'struct' keyword needed
```

### Struct with Pointer

```c title="Struct pointer syntax in C"
Point *ptr = &q;
ptr->x = 99;               // Arrow operator — dereference and access field
// Equivalent to: (*ptr).x = 99
```

### Nested Struct

```c title="Nested struct in C"
typedef struct {
  Point top_left;
  Point bottom_right;
} Rect;

Rect r = {{0, 0}, {10, 5}};
printf("%d\n", r.top_left.x); // Access nested field
```

## Unions

```c title="Union syntax in C"
union Data {
  int i;
  float f;
  char c;
};

union Data d;
d.i = 42;              // Only one member is valid at a time
printf("%d\n", d.i);   // 42 — reading the last-written member is safe

// All members share the same memory — size = size of largest member
printf("%zu\n", sizeof(union Data)); // sizeof the largest member (float or int = 4)
```

## Enums

```c title="Enum syntax in C"
enum Direction { UP, DOWN, LEFT, RIGHT }; // UP=0, DOWN=1, LEFT=2, RIGHT=3 by default

enum Direction d = UP;  // Assign enum constant
if (d == UP) {}

// Custom values
enum Status { OK = 200, NOT_FOUND = 404, ERROR = 500 };
enum Status s = NOT_FOUND; // s = 404
```

## Dynamic Memory Allocation

```c title="Dynamic memory in C"
#include <stdlib.h>

// malloc — allocates uninitialized memory
int *arr = (int *)malloc(n * sizeof(int));  // Allocate n integers
if (arr == NULL) { /* handle allocation failure */ }

// calloc — allocates and zero-initializes
int *zeros = (int *)calloc(n, sizeof(int)); // n integers, all set to 0

// realloc — resize existing allocation
int *tmp = (int *)realloc(arr, 2 * n * sizeof(int)); // Double the size
if (tmp) arr = tmp;                              // Only update if realloc succeeded

// free — release allocated memory (always!)
free(arr);
arr = NULL; // Good practice — prevents dangling pointer
```

### Common DSA Pattern: Dynamic Array

```c title="Dynamic array pattern in C"
int *arr = (int *)malloc(capacity * sizeof(int));
int size = 0;

// Add element
arr[size++] = value;

// Grow when full
if (size == capacity) {
  capacity *= 2;
  int *tmp = (int *)realloc(arr, capacity * sizeof(int));
  if (tmp) arr = tmp;                            // Only update if realloc succeeded
}

free(arr); // Clean up at end
```

## Preprocessor Directives and Header Files

```c title="Preprocessor and header syntax in C"
#include <stdio.h>         // Standard I/O
#include <stdlib.h>        // malloc, free, rand, exit
#include <string.h>        // strlen, strcpy, memset
#include <math.h>          // sqrt, pow, floor, ceil (link with -lm)
#include <ctype.h>         // isdigit, isalpha, toupper
#include <limits.h>        // INT_MAX, INT_MIN, LLONG_MAX

#define MAX 100000         // Constant macro
#define MOD 1000000007     // Common modulus in competitive programming

// Function-like macro
#define max(a, b) ((a) > (b) ? (a) : (b))
#define min(a, b) ((a) < (b) ? (a) : (b))
#define ABS(x)    ((x) < 0 ? -(x) : (x))

// Conditional compilation
#ifdef DEBUG
  printf("Debug mode\n");
#endif
```

### Custom Header File

```c title="Custom header file example"
// myutils.h
#ifndef MYUTILS_H         // Include guard — prevents double inclusion
#define MYUTILS_H

int add(int a, int b);    // Declaration only
void printArr(int *arr, int n);

#endif

// myutils.c
#include "myutils.h"
int add(int a, int b) { return a + b; }
void printArr(int *arr, int n) {
  for (int i = 0; i < n; i++) printf("%d ", arr[i]);
}

// main.c
#include "myutils.h"
int main() {
  int x = add(2, 3); // x = 5
}
```

## Storage Classes

```c title="Storage classes in C"
auto int x = 5;       // Default for local variables — stack allocated, scope-limited
static int count = 0; // Retains value between function calls, initialized once
extern int g;         // Declares variable defined in another file
register int i;       // Hint to store in CPU register — fast loop counters (compiler may ignore)

// Static local variable example
void counter() {
  static int c = 0;   // Initialized only once
  c++;
  printf("%d\n", c);  // Prints 1, 2, 3, ... on successive calls
}
```

## File Handling

```c title="File handling in C"
#include <stdio.h>

FILE *fp = fopen("data.txt", "r");  // Open for reading; "w" = write, "a" = append
if (fp == NULL) { /* handle error */ }

// Reading
int x;
fscanf(fp, "%d", &x);              // Read formatted value
char line[256];
fgets(line, sizeof(line), fp);     // Read a full line

// Writing
FILE *out = fopen("out.txt", "w");
fprintf(out, "Value: %d\n", x);   // Write formatted output

fclose(fp);                        // Always close the file
fclose(out);
```

## Command Line Arguments

```c title="Command line arguments in C"
int main(int argc, char *argv[]) {
  // argc = number of arguments (includes program name)
  // argv[0] = program name, argv[1] = first arg, ...

  printf("Program: %s\n", argv[0]);

  if (argc < 2) {
    printf("Usage: %s <input>\n", argv[0]);
    return 1;
  }

  int n = atoi(argv[1]);           // Convert string argument to integer
  printf("n = %d\n", n);
  return 0;
}
// Run: ./program 42 → n = 42
```

## Common DSA Patterns in C

### Linked List

```c title="Linked list in C"
typedef struct Node {
  int data;
  struct Node *next;           // Pointer to next node (self-referential)
} Node;

// Create a new node
Node *newNode(int val) {
  Node *n = (Node *)malloc(sizeof(Node));
  n->data = val;
  n->next = NULL;
  return n;
}

// Insert at head
Node *insertHead(Node *head, int val) {
  Node *n = newNode(val);
  n->next = head;              // New node points to old head
  return n;                    // New head
}

// Traverse
void printList(Node *head) {
  while (head != NULL) {
    printf("%d -> ", head->data);
    head = head->next;
  }
  printf("NULL\n");
}

// Free all nodes
void freeList(Node *head) {
  while (head) {
    Node *tmp = head;
    head = head->next;
    free(tmp);
  }
}
```

### Stack (Array-based)

```c title="Stack using array in C"
#define MAXN 100005

int stack[MAXN];
int top = -1;

void push(int val) { stack[++top] = val; }       // Add to top
int  pop()         { return stack[top--]; }       // Remove from top
int  peek()        { return stack[top]; }         // View top without removing
int  isEmpty()     { return top == -1; }          // Check if empty
```

### Queue (Array-based)

```c title="Queue using array in C"
#define MAXN 100005

int queue[MAXN];
int front = 0, back = 0;

void enqueue(int val) { queue[back++] = val; }   // Add to back
int  dequeue()        { return queue[front++]; }  // Remove from front
int  isEmpty()        { return front == back; }   // Check if empty
```

### Sorting

```c title="Sorting in C"
#include <stdlib.h>

// Comparator for qsort — ascending order
int cmp(const void *a, const void *b) {
  int va = *(const int *)a, vb = *(const int *)b;
  return (va > vb) - (va < vb);    // Safe: no overflow risk unlike subtraction
}

int arr[] = {5, 2, 8, 1};
qsort(arr, 4, sizeof(int), cmp);  // arr = [1, 2, 5, 8]

// Descending order comparator
int cmpDesc(const void *a, const void *b) {
  int va = *(const int *)a, vb = *(const int *)b;
  return (vb > va) - (vb < va);    // Reversed for descending order
}

// Sort array of structs by field
typedef struct { int val, idx; } Pair;
int cmpPair(const void *a, const void *b) {
  int va = ((const Pair *)a)->val, vb = ((const Pair *)b)->val;
  return (va > vb) - (va < vb);    // Sort by val ascending, overflow-safe
}
```

### Binary Search

```c title="Binary search in C"
// Returns index of target, or -1 if not found
int binarySearch(int *arr, int n, int target) {
  int lo = 0, hi = n - 1;
  while (lo <= hi) {
    int mid = lo + (hi - lo) / 2;     // Avoids overflow vs (lo+hi)/2
    if (arr[mid] == target) return mid;
    else if (arr[mid] < target) lo = mid + 1;
    else hi = mid - 1;
  }
  return -1;
}
```

### Two Pointers

```c title="Two pointers pattern in C"
// Check if a sorted array has a pair summing to target
int hasPair(int *arr, int n, int target) {
  int l = 0, r = n - 1;
  while (l < r) {
    int sum = arr[l] + arr[r];
    if (sum == target) return 1;       // Found
    else if (sum < target) l++;        // Need larger sum
    else r--;                           // Need smaller sum
  }
  return 0;
}
```

### Sliding Window

```c title="Sliding window pattern in C"
// Maximum sum of subarray of size k
int maxSumWindow(int *arr, int n, int k) {
  int sum = 0;
  for (int i = 0; i < k; i++) sum += arr[i];  // First window
  int maxSum = sum;
  for (int i = k; i < n; i++) {
    sum += arr[i] - arr[i - k];                // Slide window
    if (sum > maxSum) maxSum = sum;
  }
  return maxSum;
}
```

## Common Errors and Best Practices

```c title="Common errors in C"
// 1. Dereferencing NULL pointer — always check malloc return
int *p = malloc(sizeof(int));
if (p == NULL) { exit(1); }        // Never skip this

// 2. Buffer overflow — always bound-check strings/arrays
char buf[10];
// strncpy is safer than strcpy
strncpy(buf, src, sizeof(buf) - 1);
buf[sizeof(buf) - 1] = '\0';       // Ensure null termination

// 3. Forgetting to free — always pair malloc with free
int *arr = malloc(n * sizeof(int));
// ... use arr ...
free(arr);

// 4. Integer overflow — use long long for large products
long long result = (long long)a * b;  // Cast before multiply

// 5. Off-by-one in loops
for (int i = 0; i < n; i++) {}     // Correct: 0 to n-1
for (int i = 0; i <= n; i++) {}    // BUG: accesses index n (out of bounds)

// 6. Dangling pointer — set to NULL after free
free(p);
p = NULL;
```

## References

- [C Standard Library Reference (cppreference)](https://en.cppreference.com/w/c)
- [GNU C Manual](https://www.gnu.org/software/gnu-c-manual/)
- [Beej's Guide to C Programming](https://beej.us/guide/bgc/)