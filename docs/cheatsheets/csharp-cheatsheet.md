---
id: csharp-cheatsheet
title: "C# Cheatsheet"
sidebar_label: "C# Cheatsheet"
sidebar_position: 4
description: "A fast, practical C# reference for DSA, competitive programming, and interviews."
tags: [csharp, cheatsheet, dsa]
---

This page is a quick reference for C# patterns that commonly appear in DSA, competitive programming, and technical interviews.

## Basic Syntax

### Hello World

```csharp
using System;

class Program
{
    static void Main()
    {
        Console.WriteLine("Hello World");
    }
}
```

### Data Types

```csharp
int a = 10;
long b = 10000000000L;
double d = 3.14;
float f = 2.5f;
char c = 'A';
bool flag = true;
string s = "Hello";
```

### Operators and Control Flow

```csharp
if (a > 0)
{
    Console.WriteLine("Positive");
}
else if (a == 0)
{
    Console.WriteLine("Zero");
}
else
{
    Console.WriteLine("Negative");
}

for (int i = 0; i < 5; i++)
{
    Console.WriteLine(i);
}

while (a > 0)
{
    a--;
}
```

## Arrays

### Array Declaration

```csharp
int[] arr = new int[5];

int[] nums = {1, 2, 3, 4, 5};

Console.WriteLine(arr.Length);
```

### Multidimensional Array

```csharp
int[,] grid = new int[3,3];

grid[0,0] = 10;
```

## Strings

### Common String Operations

```csharp
string s = "hello";

int len = s.Length;

string upper = s.ToUpper();

bool contains = s.Contains("ell");

string sub = s.Substring(1, 3);

string replaced = s.Replace("h", "H");
```

### StringBuilder

```csharp
using System.Text;

StringBuilder sb = new StringBuilder();

sb.Append("Hello");
sb.Append(" World");

string result = sb.ToString();
```

## Collections

### List

```csharp
using System.Collections.Generic;

List<int> list = new List<int>();

list.Add(10);
list.Add(20);

int first = list[0];

list.Remove(10);

int size = list.Count;
```

### Dictionary

```csharp
Dictionary<string, int> map =
    new Dictionary<string, int>();

map["Alice"] = 95;

if (map.ContainsKey("Alice"))
{
    Console.WriteLine(map["Alice"]);
}
```

### HashSet

```csharp
HashSet<int> set = new HashSet<int>();

set.Add(1);
set.Add(2);

bool exists = set.Contains(1);

set.Remove(2);
```

### Queue

```csharp
Queue<int> q = new Queue<int>();

q.Enqueue(10);
q.Enqueue(20);

int front = q.Dequeue();
```

### Stack

```csharp
Stack<int> st = new Stack<int>();

st.Push(1);
st.Push(2);

int top = st.Pop();
```

## Sorting

### Array Sort

```csharp
int[] arr = {5, 2, 8, 1};

Array.Sort(arr);
```

### Custom Sort

```csharp
Array.Sort(arr, (a, b) => b.CompareTo(a));
```

## LINQ

### Filtering

```csharp
using System.Linq;

List<int> nums =
    new List<int>() {1,2,3,4,5};

var even =
    nums.Where(x => x % 2 == 0);

foreach(var x in even)
{
    Console.WriteLine(x);
}
```

### Aggregation

```csharp
int sum = nums.Sum();

int max = nums.Max();

int min = nums.Min();

double avg = nums.Average();
```

## Classes and OOP

### Class

```csharp
class Person
{
    public string Name;

    public Person(string name)
    {
        Name = name;
    }

    public void Greet()
    {
        Console.WriteLine($"Hello {Name}");
    }
}

Person p = new Person("John");
p.Greet();
```

### Inheritance

```csharp
class Animal
{
    public virtual void Speak()
    {
        Console.WriteLine("Animal");
    }
}

class Dog : Animal
{
    public override void Speak()
    {
        Console.WriteLine("Bark");
    }
}
```

## Generics

```csharp
class Box<T>
{
    public T Value;

    public Box(T value)
    {
        Value = value;
    }
}

Box<int> box = new Box<int>(10);
```

## Exception Handling

```csharp
try
{
    int x = int.Parse("123");
}
catch(Exception ex)
{
    Console.WriteLine(ex.Message);
}
finally
{
    Console.WriteLine("Done");
}
```

## File Handling

```csharp
using System.IO;

File.WriteAllText(
    "test.txt",
    "Hello"
);

string content =
    File.ReadAllText("test.txt");
```

## Common DSA Patterns

### Fast Input

```csharp
string[] input =
    Console.ReadLine().Split();

int n = int.Parse(input[0]);
```

### Priority Queue (.NET 6+)

```csharp
PriorityQueue<int, int> pq =
    new PriorityQueue<int, int>();

pq.Enqueue(5, 5);
pq.Enqueue(2, 2);

int value = pq.Dequeue();
```

### Binary Search

```csharp
int index =
    Array.BinarySearch(arr, 5);

if(index >= 0)
{
    Console.WriteLine("Found");
}
```

## References

- https://learn.microsoft.com/en-us/dotnet/csharp/
- https://learn.microsoft.com/en-us/dotnet/api/
- https://learn.microsoft.com/en-us/dotnet/csharp/programming-guide/