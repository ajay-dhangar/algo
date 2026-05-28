---
id: arrays-and-slices-in-go
sidebar_position: 4
title: "Arrays and Slices in Go"
sidebar_label: "Arrays and Slices"
---

Hey there! In this guide, we'll explore **Arrays and Slices** in Go. These are the primary ways to group multiple values of the same type together. Let's dive in!

## 1. Arrays in Go

An array is a numbered sequence of elements of a specific length. In Go, the size of an array is part of its type, which means arrays cannot be resized once they are created.

### Declaring an Array

You declare an array by specifying its length inside square brackets `[]`, followed by the type of elements it will hold.

```go
var a [5]int // An array of 5 integers, initialized to 0
a[0] = 10    // Set the first element to 10
a[4] = 50    // Set the last element to 50
```

### Initializing an Array

You can initialize an array with values at the time of declaration using an array literal.

```go
primes := [5]int{2, 3, 5, 7, 11}
```

If you use `...` instead of a length, the compiler will count the elements for you:
```go
names := [...]string{"Alice", "Bob", "Charlie"} // Length is automatically 3
```

## 2. Slices in Go

Because arrays have a fixed size, they can be restrictive. **Slices** are much more common in Go. A slice is a dynamically-sized, flexible view into the elements of an array.

### Declaring a Slice

You declare a slice just like an array, but without specifying the length in the brackets.

```go
var s []int // A slice of integers
```

### Creating a Slice from an Array

You can create a slice by specifying a range `[low:high]` on an existing array. This creates a view from `low` up to (but not including) `high`.

var primes = [5]int{2, 3, 5, 7, 11}
var s []int = primes[1:4] // s will contain [3, 5, 7]
var s []int = primes[1:4] // s will contain [3, 5, 7]
```

### Creating a Slice with `make`

The built-in `make` function is the standard way to create dynamically-sized arrays (slices).

```go
// Creates a slice of ints with length 5 and capacity 5
a := make([]int, 5)

// Creates a slice with length 0 but capacity 5
b := make([]int, 0, 5)
```

## 3. Slice Length and Capacity

A slice has both a **length** and a **capacity**.
- **Length (`len`)**: The number of elements the slice currently contains.
- **Capacity (`cap`)**: The maximum number of elements the underlying array can hold before it needs to be resized.

```go
s := []int{2, 3, 5, 7, 11, 13}
fmt.Printf("len=%d cap=%d\n", len(s), cap(s)) // len=6 cap=6
```

## 4. Appending to a Slice

You can easily add new elements to the end of a slice using the built-in `append` function. If the underlying array is full, Go will automatically allocate a larger array and copy the elements over.

```go
var s []int
s = append(s, 1)      // [1]
s = append(s, 2, 3)   // [1, 2, 3]
```

## 5. Iterating over Slices

The `range` form of the `for` loop iterates over a slice or map. It returns two values: the index and the copy of the element at that index.

```go
fruits := []string{"Apple", "Banana", "Cherry"}

for index, value := range fruits {
    fmt.Printf("Index: %d, Value: %s\n", index, value)
}
```
*Tip: If you don't need the index, use the blank identifier `_` to ignore it!*
```go
for _, value := range fruits {
    fmt.Println(value)
}
```

## 6. Best Practices

- **Prefer Slices over Arrays:** In 99% of Go code, you will use slices rather than arrays because of their flexibility.
- **Preallocate if you know the size:** If you know you are going to append 100 elements to a slice, create it with `make([]int, 0, 100)`. This saves Go from having to resize the slice repeatedly behind the scenes, greatly improving performance.
