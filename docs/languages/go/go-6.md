---
id: structs-and-interfaces-in-go
sidebar_position: 6
title: "Structs and Interfaces in Go"
sidebar_label: "Structs & Interfaces"
---

# Structs and Interfaces in Go

Hey there! In this guide, we'll explore **Structs and Interfaces** in Go. Go is not a traditional object-oriented language—it doesn't have classes or inheritance. Instead, it uses structs and interfaces to achieve similar, and often more flexible, designs. Let's dive in!

## 1. Structs in Go

A struct (short for structure) is a typed collection of fields. They are useful for grouping data together to form records.

### Defining a Struct

You define a struct using the `type` and `struct` keywords.

```go
type Person struct {
    FirstName string
    LastName  string
    Age       int
}
```

### Initializing a Struct

You can create an instance of a struct by providing values for its fields.

```go
// Creating a struct with field names (recommended)
p1 := Person{
    FirstName: "Alice",
    LastName:  "Smith",
    Age:       30,
}

// Creating a struct without field names (relies on field order)
p2 := Person{"Bob", "Jones", 25}
```

### Accessing Struct Fields

You can access or modify the fields of a struct using the dot `.` operator.

```go
fmt.Println(p1.FirstName) // Output: Alice
p1.Age = 31               // Update age
```

## 2. Methods in Go

Go does not have classes. However, you can define methods on struct types! A method is simply a function with a special **receiver** argument.

```go
// Method with a receiver of type Person
func (p Person) FullName() string {
    return p.FirstName + " " + p.LastName
}

func main() {
    p := Person{FirstName: "Alice", LastName: "Smith"}
    fmt.Println(p.FullName()) // Output: Alice Smith
}
```

### Pointer Receivers
If you want to modify the struct within the method, you must use a **pointer receiver** (`*Person`). If you just use a value receiver (like above), Go passes a copy of the struct.

```go
func (p *Person) HaveBirthday() {
    p.Age++ // This actually modifies the original struct!
}
```

## 3. Interfaces in Go

Interfaces in Go provide a way to specify the behavior of an object: if something can do *this*, then it can be used *here*.

An interface type is defined as a set of method signatures.

### Defining an Interface

```go
type Speaker interface {
    Speak() string
}
```

### Implementing an Interface

In Go, **interfaces are implemented implicitly**. You don't use an `implements` keyword. If a type has all the methods defined by an interface, it automatically implements that interface!

```go
type Dog struct{}

func (d Dog) Speak() string {
    return "Woof!"
}

type Cat struct{}

func (c Cat) Speak() string {
    return "Meow!"
}
```

Because both `Dog` and `Cat` have a `Speak() string` method, they both implement the `Speaker` interface.

### Using Interfaces

You can use interfaces to write functions that accept any type that implements the interface.

```go
func MakeSound(s Speaker) {
    fmt.Println(s.Speak())
}

func main() {
    myDog := Dog{}
    myCat := Cat{}

    MakeSound(myDog) // Output: Woof!
    MakeSound(myCat) // Output: Meow!
}
```

## 4. The Empty Interface

The interface type that specifies zero methods is known as the empty interface: `interface{}` (or `any` in modern Go). 
Because every type has at least zero methods, **every type implements the empty interface**. It is used to handle values of unknown type.

```go
func PrintAnything(v any) {
    fmt.Println(v)
}
```

## 5. Best Practices

- **Favour small interfaces:** In Go, interfaces usually have just one or two methods. (e.g., `io.Reader`, `io.Writer`).
- **Accept interfaces, return structs:** It is a common Go idiom to have functions take interfaces as arguments (for flexibility) but return concrete struct types.
