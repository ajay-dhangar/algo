---

id: csharp-cheatsheet

title: C# Cheatsheet

sidebar_label: C# Cheatsheet

sidebar_position: 2

description: "A fast, practical C# reference for DSA, competitive programming, interviews, and .NET development."

tags: [csharp, dotnet, cheatsheet, dsa]

---



This page is a quick reference for C# patterns that show up constantly in DSA, competitive programming, interviews, and modern .NET development. If you're just starting out, don't worry — every snippet here is explained line by line 😊



\## Basic Syntax



\### Data Types



\#### Theory



C# is a statically typed language, which means every variable has a type known at compile time.



Common primitive types:



\- `int` → 32-bit integer

\- `long` → 64-bit integer

\- `float` → 32-bit decimal

\- `double` → 64-bit decimal

\- `decimal` → high-precision financial values

\- `char` → single Unicode character

\- `bool` → true or false

\- `string` → sequence of characters



```csharp title="Basic data type syntax in C#"

int a = 1;                    // 32-bit integer

long b = 1000000000L;         // 64-bit integer



float f = 3.14f;              // 32-bit decimal

double d = 3.14159;           // 64-bit decimal

decimal money = 99.99m;       // Financial calculations



char c = 'A';                 // Unicode character



bool isActive = true;         // Boolean



string name = "Alice";        // String

