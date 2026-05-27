---
id: maps-in-go
sidebar_position: 5
title: "Maps in Go"
sidebar_label: "Maps"
---

Hey there! In this guide, we'll explore **Maps** in Go. Maps are Go's built-in associative data type (often called hashes or dictionaries in other languages). They are incredibly useful for storing key-value pairs. Let's dive in!

## 1. What is a Map?

A map maps keys to values. For example, you might use a map to store the ages of users, where the user's name is the key (a string), and their age is the value (an int).

## 2. Declaring and Initializing Maps

You define a map using the syntax `map[KeyType]ValueType`. The easiest way to create an empty map is by using the built-in `make` function.

```go
// Creates an empty map where keys are strings and values are ints
ages := make(map[string]int)
```

You can also use a map literal to initialize a map with data immediately:

```go
capitals := map[string]string{
    "USA":    "Washington D.C.",
    "France": "Paris",
    "Japan":  "Tokyo", // Note: The trailing comma is required in Go!
}
```

## 3. Working with Maps

### Inserting and Updating
To insert a new key-value pair or update an existing one, simply assign a value to a specific key.

```go
ages := make(map[string]int)
ages["Alice"] = 25   // Insert
ages["Bob"] = 30     // Insert
ages["Alice"] = 26   // Update Alice's age
```

### Retrieving Elements
You can retrieve the value associated with a key using the bracket syntax.

```go
fmt.Println("Alice's age:", ages["Alice"]) // Output: 26
```

### Deleting Elements
Use the built-in `delete` function to remove a key-value pair from a map.

```go
delete(ages, "Bob") // Removes Bob from the map
```

## 4. Checking if a Key Exists

If you ask for a key that doesn't exist, a map returns the **zero value** for the value type (e.g., `0` for an int, `""` for a string).

```go
ages := make(map[string]int)
fmt.Println(ages["Charlie"]) // Output: 0 (because Charlie isn't in the map)
```

However, sometimes you need to know if the value `0` means the key wasn't there, or if the key actually had the value `0`. You can test for the existence of a key with a two-value assignment:

```go
age, exists := ages["Charlie"]

if exists {
    fmt.Println("Charlie's age is", age)
} else {
    fmt.Println("Charlie is not in the map")
}
```
*If `Charlie` is in the map, `exists` will be `true`; if not, `exists` will be `false`.*

## 5. Iterating over Maps

You can loop over the key-value pairs of a map using the `range` keyword, just like with slices.

```go
capitals := map[string]string{
    "USA":    "Washington D.C.",
    "France": "Paris",
}

for country, capital := range capitals {
    fmt.Printf("The capital of %s is %s\n", country, capital)
}
```
*Important Note: Maps in Go are unordered! When you iterate over a map, the order of the keys is completely randomized by the Go runtime.*

## 6. Best Practices

- **Always initialize your maps:** A declared but uninitialized map is `nil`. Trying to write to a `nil` map will cause a runtime panic! Always use `make()` or a map literal `{}`.
- **Use the `ok` idiom:** Whenever retrieving a value from a map where the zero value is a valid piece of data, always use the `value, ok := map[key]` idiom to check if the key actually exists.
