---
id: cpp-cheatsheet
title: "C++ Cheatsheet"
sidebar_label: "C++ Cheatsheet"
sidebar_position: 3
description: "A fast, practical C++ reference for DSA and competitive programming."
tags: [cpp, cheatsheet, dsa]
---

This page is a quick reference for C++ patterns that show up constantly in DSA and competitive programming. If you're just starting out, don't worry, every snippet here is explained line by line 😊

## Fast I/O Configuration

### Optimize Input/Output Speed

```cpp title="Fast I/O setup for competitive programming"
#include <iostream>
using namespace std;

int main() {
    ios::sync_with_stdio(false); // Disables C-style I/O sync, makes cin/cout faster
    cin.tie(nullptr);             // Unties cin from cout, prevents automatic flushing
    
    int n;
    cin >> n; // Now significantly faster for large inputs
    return 0;
}
```

## Basic Syntax

### Data Types

```cpp title="Basic data types in C++"
int a = 1;                // 32-bit signed integer (-2^31 to 2^31-1)
long long b = 1000000000LL; // 64-bit signed integer, use LL suffix for literals
double d = 3.14;          // 64-bit floating point
bool ok = true;           // true or false
char c = 'A';             // Single character
string s = "hello";       // String from STL, dynamic size
```

### Operators and Control Flow

```cpp title="Control flow in C++"
// if, else if, else
if (a > 0) {
    // ...
} else if (a == 0) {
    // ...
} else {
    // ...
}

for (int i = 0; i < n; i++) {} // i goes from 0 to n-1
while (n-- > 0) {}             // Decrements n after each check, runs n times
```

### Arrays

```cpp title="Array syntax in C++"
int arr[100];              // Fixed-size array of 100 integers
int grid[50][50];          // 2D array with 50 rows and 50 columns
fill(arr, arr + 100, -1);  // Fills entire array with -1
memset(arr, 0, sizeof(arr)); // Fast zero-fill (use only for 0 or -1)
```

## Strings

### Basic String Operations

```cpp title="String operations in C++"
string s = "abc";
char ch = s[1];            // Access character at index 1, ch = 'b'
int len = s.length();      // Returns length, len = 3
s += "def";                // Concatenation, s = "abcdef"
string sub = s.substr(0, 3); // Substring from index 0, length 3, sub = "abc"

// Check if substring exists
if (s.find("cd") != string::npos) { // npos means "not found"
    // "cd" exists in s
}
```

### String Streams

```cpp title="String stream for parsing"
#include <sstream>

string line = "10 20 30";
stringstream ss(line);
int x, y, z;
ss >> x >> y >> z; // Parses space-separated integers, x=10, y=20, z=30
```

## STL Containers

### Vector (Dynamic Array)

```cpp title="Vector operations in C++"
#include <vector>

vector<int> v;             // Empty vector
vector<int> v2(10);        // Vector of size 10, initialized to 0
vector<int> v3(10, -1);    // Vector of size 10, all elements = -1

v.push_back(5);            // Appends 5 to end, O(1) amortized
int x = v[0];              // Access element at index 0
int back = v.back();       // Returns last element
v.pop_back();              // Removes last element, O(1)
int sz = v.size();         // Returns number of elements

// 2D vector (dynamic grid)
vector<vector<int>> grid(r, vector<int>(c, 0)); // r rows, c columns, all 0
```

### Pair and Tuple

```cpp title="Pair and tuple in C++"
#include <utility>

pair<int, int> p = {1, 2}; // Or make_pair(1, 2)
int first = p.first;       // first = 1
int second = p.second;     // second = 2

// Tuple for 3+ elements
tuple<int, int, int> t = {1, 2, 3};
int a = get<0>(t);         // a = 1
int b = get<1>(t);         // b = 2
```

### Map (Ordered Key-Value)

```cpp title="Map operations in C++"
#include <map>

map<string, int> m;        // Keys sorted in ascending order, O(log n) operations
m["key"] = 10;             // Insert or update
m["key"]++;                // Safe even if key doesn't exist, initializes to 0 first

if (m.count("key")) {      // Check if key exists, returns 1 or 0
    int val = m["key"];
}

// Iterate in sorted key order
for (auto& [k, v] : m) {   // Structured binding (C++17)
    // k = key, v = value
}
```

### Unordered Map (Hash Map)

```cpp title="Unordered map operations in C++"
#include <unordered_map>

unordered_map<int, int> um; // O(1) average operations, unordered
um[5] = 10;                 // Insert or update
um[5]++;                    // Safe increment

if (um.find(5) != um.end()) { // Check existence
    int val = um[5];
}
```

### Set (Ordered Unique Elements)

```cpp title="Set operations in C++"
#include <set>

set<int> s;                // Sorted unique elements, O(log n) operations
s.insert(5);               // Inserts 5
s.insert(5);               // Duplicate ignored, still only one 5
s.erase(5);                // Removes 5

if (s.count(5)) {          // Check if 5 exists, returns 1 or 0
    // 5 is in set
}

// Iterate in sorted order
for (int x : s) {
    // x = each element in ascending order
}
```

### Unordered Set (Hash Set)

```cpp title="Unordered set operations in C++"
#include <unordered_set>

unordered_set<int> us;     // O(1) average operations, unordered
us.insert(10);
us.erase(10);

if (us.find(10) != us.end()) { // Check existence
    // 10 exists
}
```

### Stack

```cpp title="Stack operations in C++"
#include <stack>

stack<int> st;             // LIFO - Last In First Out
st.push(1);                // st = [1]
st.push(2);                // st = [1, 2] (2 is on top)
int top = st.top();        // Returns top without removing, top = 2
st.pop();                  // Removes top, st = [1]
bool empty = st.empty();   // Returns true if stack is empty
```

### Queue

```cpp title="Queue operations in C++"
#include <queue>

queue<int> q;              // FIFO - First In First Out
q.push(1);                 // q = [1]
q.push(2);                 // q = [1, 2]
int front = q.front();     // Returns front, front = 1
q.pop();                   // Removes front, q = [2]
```

### Deque (Double-Ended Queue)

```cpp title="Deque operations in C++"
#include <deque>

deque<int> dq;             // O(1) insert/remove at both ends
dq.push_back(1);           // dq = [1]
dq.push_front(0);          // dq = [0, 1]
dq.push_back(2);           // dq = [0, 1, 2]
int front = dq.front();    // front = 0
int back = dq.back();      // back = 2
dq.pop_front();            // dq = [1, 2]
dq.pop_back();             // dq = [1]
```

### Priority Queue (Heap)

```cpp title="Priority queue operations in C++"
#include <queue>

// Max-heap by default (largest element on top)
priority_queue<int> maxpq;
maxpq.push(5);             // maxpq = [5]
maxpq.push(10);            // maxpq = [10, 5] (10 on top)
int top = maxpq.top();     // top = 10
maxpq.pop();               // Removes 10, maxpq = [5]

// Min-heap (smallest element on top)
priority_queue<int, vector<int>, greater<int>> minpq;
minpq.push(5);             // minpq = [5]
minpq.push(1);             // minpq = [1, 5] (1 on top)
int minTop = minpq.top();  // minTop = 1
```

## STL Algorithms

### Sorting

```cpp title="Sorting with STL"
#include <algorithm>

vector<int> v = {3, 1, 4, 1, 5};
sort(v.begin(), v.end());           // Ascending: [1, 1, 3, 4, 5]
sort(v.begin(), v.end(), greater<int>()); // Descending: [5, 4, 3, 1, 1]

// Custom comparator with lambda
vector<pair<int, int>> pairs = {{3, 1}, {1, 2}, {3, 0}};
sort(pairs.begin(), pairs.end(), [](auto& a, auto& b) {
    if (a.first != b.first) return a.first < b.first;  // Sort by first ascending
    return a.second > b.second;                         // Then by second descending
});
// Result: [(1,2), (3,1), (3,0)]
```

### Binary Search

```cpp title="Binary search operations in C++"
#include <algorithm>

vector<int> v = {1, 2, 4, 4, 5, 7};

// Check if element exists
bool found = binary_search(v.begin(), v.end(), 4); // found = true

// Find first position >= target
auto it = lower_bound(v.begin(), v.end(), 4); // Points to first 4
int idx = it - v.begin();                      // idx = 2

// Find first position > target
auto it2 = upper_bound(v.begin(), v.end(), 4); // Points to 5
int idx2 = it2 - v.begin();                    // idx2 = 4

// Count occurrences of 4
int cnt = upper_bound(v.begin(), v.end(), 4) - lower_bound(v.begin(), v.end(), 4); // cnt = 2
```

### Other Useful Algorithms

```cpp title="Common STL algorithms"
#include <algorithm>
#include <numeric>

vector<int> v = {1, 2, 3, 4, 5};

int sum = accumulate(v.begin(), v.end(), 0);     // Sum of all elements, sum = 15
int maxVal = *max_element(v.begin(), v.end());   // maxVal = 5
int minVal = *min_element(v.begin(), v.end());   // minVal = 1

reverse(v.begin(), v.end());                     // v = [5, 4, 3, 2, 1]

// Remove duplicates from sorted vector
sort(v.begin(), v.end());
v.erase(unique(v.begin(), v.end()), v.end());    // Removes consecutive duplicates

// Fill range with value
fill(v.begin(), v.end(), 0);                     // All elements = 0
```
## Bitwise Operations

Bitwise operators work directly on bits and are extremely common in DSA and competitive programming for efficient solutions.

### Common Limits

```cpp title="Common limit constants in C++"
#include <climits>

INT_MAX   // 2147483647  (2^31 - 1)
INT_MIN   // -2147483648 (-2^31)
LLONG_MAX // 9223372036854775807 (2^63 - 1)
LLONG_MIN // -9223372036854775808 (-2^63)
```

### Bit Tricks

```cpp title="Essential bitwise tricks for competitive programming"
int n = 6; // binary: 110

// Check if number is odd
bool isOdd = n & 1;               // 0 = even, 1 = odd

// Multiply / divide by 2
int doubled = n << 1;             // n * 2 = 12
int halved  = n >> 1;             // n / 2 = 3

// Check if i-th bit is set (0-indexed)
int i = 1;
bool isSet = n & (1U << i);        // checks bit at position i

// Set i-th bit
n = n | (1U << i);                 // forces bit i to 1

// Clear i-th bit
n = n & ~(1U << i);                // forces bit i to 0

// Toggle i-th bit
n = n ^ (1U << i);                 // flips bit i

// Remove lowest set bit (used in bit-counting loops)
n = n & (n - 1);                  // 110 -> 100

// Check if n is a power of 2
bool isPow2 = n > 0 && !(n & (n - 1)); // true if exactly one bit set
```

### Count Set Bits

```cpp title="Counting set bits (popcount)"
int n = 7; // binary: 111

// Built-in functions (fastest)
int bits   = __builtin_popcount(n);   // for int,      bits = 3
int bitsLL = __builtin_popcountll(n); // for long long

// Manual method
int count = 0;
while (n) {
    n = n & (n - 1); // removes lowest set bit each iteration
    count++;
}
// count = 3
```
## Object-Oriented Programming

### Classes and Constructors

```cpp title="Class definition in C++"
class Point {
public:
    int x, y;
    
    Point(int x, int y) : x(x), y(y) {} // Constructor with initializer list
    
    int distSquared() {                  // Member function
        return x * x + y * y;
    }
};

Point p(3, 4);                           // Create Point object
int dist = p.distSquared();              // dist = 25
```

### Inheritance

```cpp title="Inheritance in C++"
class Shape {
public:
    virtual double area() = 0;           // Pure virtual function (abstract)
    virtual ~Shape() {}                  // Virtual destructor
};

class Circle : public Shape {
public:
    double r;
    Circle(double r) : r(r) {}
    
    double area() override {             // Override base class method
        return 3.14159 * r * r;
    }
};

Circle c(5.0);
double a = c.area();                     // a = 78.54...
```

### Templates

```cpp title="Template functions and classes"
// Template function
template<typename T>
T maximum(T a, T b) {
    return (a > b) ? a : b;
}

int x = maximum(5, 10);                  // x = 10
double y = maximum(3.5, 2.1);            // y = 3.5

// Template class
template<typename T>
class Box {
public:
    T value;
    Box(T v) : value(v) {}
};

Box<int> intBox(42);                     // Box containing int
Box<string> strBox("hello");             // Box containing string
```

## Lambda Functions

### Basic Lambda Syntax

```cpp title="Lambda expressions in C++"
// Basic lambda
auto add = [](int a, int b) { return a + b; };
int sum = add(3, 5);                     // sum = 8

// Lambda with capture
int multiplier = 10;
auto multiply = [multiplier](int x) { return x * multiplier; }; // Captures multiplier by value
int result = multiply(5);                // result = 50

// Capture by reference
int counter = 0;
auto increment = [&counter]() { counter++; }; // Captures counter by reference
increment();                             // counter = 1
```

### Lambda in STL Algorithms

```cpp title="Using lambdas with STL"
vector<int> v = {1, 2, 3, 4, 5};

// Count even numbers
int evenCount = count_if(v.begin(), v.end(), [](int x) { return x % 2 == 0; }); // evenCount = 2

// Transform elements
transform(v.begin(), v.end(), v.begin(), [](int x) { return x * 2; }); // v = [2, 4, 6, 8, 10]
```

## Common Patterns

### Range-Based For Loop

```cpp title="Range-based for loops"
vector<int> v = {1, 2, 3, 4, 5};

// Read-only iteration
for (int x : v) {                        // x is a copy
    // Use x
}

// Modify elements
for (int& x : v) {                       // x is a reference
    x *= 2;                              // Modifies original vector
}

// Const reference (efficient for large objects)
for (const auto& x : v) {                // No copy, cannot modify
    // Use x
}
```

### Auto Keyword

```cpp title="Auto type deduction"
auto x = 5;                              // x is int
auto y = 3.14;                           // y is double
auto s = "hello";                        // s is const char*
auto str = string("hello");              // str is string

vector<int> v = {1, 2, 3};
auto it = v.begin();                     // it is vector<int>::iterator
```

### Structured Bindings (C++17)

```cpp title="Structured bindings"
pair<int, string> p = {1, "one"};
auto [num, word] = p;                    // num = 1, word = "one"

map<string, int> m = {{"a", 1}, {"b", 2}};
for (auto& [key, val] : m) {             // Iterate with structured binding
    // key and val are references to map elements
}
```

## Input/Output Patterns

### Reading Input

```cpp title="Common input patterns"
// Read single line
string line;
getline(cin, line);                      // Reads entire line including spaces

// Read until EOF
int x;
while (cin >> x) {                       // Reads integers until input ends
    // Process x
}

// Read n integers
int n;
cin >> n;
vector<int> v(n);
for (int i = 0; i < n; i++) {
    cin >> v[i];
}
```

### Formatted Output

```cpp title="Output formatting"
#include <iomanip>

double pi = 3.14159265;
cout << fixed << setprecision(2) << pi;  // Outputs: 3.14

int num = 42;
cout << setw(5) << setfill('0') << num;  // Outputs: 00042
```

## References

- [C++ Reference](https://en.cppreference.com/w/)
- [C++ STL Documentation](https://en.cppreference.com/w/cpp/container)
- [C++ Algorithms Library](https://en.cppreference.com/w/cpp/algorithm)
- [Competitive Programming Handbook](https://cses.fi/book/book.pdf)
