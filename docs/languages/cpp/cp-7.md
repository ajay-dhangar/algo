
---
id: strings-in-cpp
sidebar_position: 7
title: "Strings In C++"
sidebar_label: "Strings In C++"
---

# Strings in C++

Hey there! In this guide, we'll explore how to work with strings in C++. Strings are used to store sequences of characters and are a vital part of any C++ program. Let's dive in!

---

## 1. C-Style Strings

C++ inherits its basic string handling capabilities from C, known as C-style strings. These are arrays of characters terminated by a null character (`\0`).

#### Example:
```cpp
#include <iostream>
using namespace std;

int main() {
    char greeting[] = "Hello";
    cout << greeting << endl;
    return 0;
}
```

#### Output:
```
Hello
```

---

## 2. C++ String Class

C++ provides a more convenient way to handle strings through the `std::string` class, which is part of the C++ Standard Library.

#### Example:
```cpp
#include <iostream>
#include <string> // Required for string
using namespace std;

int main() {
    string greeting = "Hello, World!";
    cout << greeting << endl;
    return 0;
}
```

#### Output:
```
Hello, World!
```

---

## 3. Common String Operations

### 3.1 String Length

You can use the `.length()` or `.size()` method to get the length of a string.

#### Example:
```cpp
#include <iostream>
#include <string>
using namespace std;

int main() {
    string greeting = "Hello, World!";
    cout << "Length: " << greeting.length() << endl;
    return 0;
}
```

#### Output:
```
Length: 13
```

---

### 3.2 String Concatenation

You can concatenate two strings using the `+` operator or the `.append()` method.

#### Example:
```cpp
#include <iostream>
#include <string>
using namespace std;

int main() {
    string firstName = "John";
    string lastName = "Doe";
    string fullName = firstName + " " + lastName;
    cout << fullName << endl;
    return 0;
}
```

#### Output:
```
John Doe
```

---

### 3.3 Accessing Characters in a String

You can access individual characters in a string using array-like indexing.

#### Example:
```cpp
#include <iostream>
#include <string>
using namespace std;

int main() {
    string greeting = "Hello";
    cout << greeting[0] << endl; // Output: H
    return 0;
}
```

#### Output:
```
H
```

---

## 4. Modifying Strings

### 4.1 Changing Characters

You can modify individual characters in a string using array-like indexing.

#### Example:
```cpp
#include <iostream>
#include <string>
using namespace std;

int main() {
    string greeting = "Hello";
    greeting[0] = 'J';
    cout << greeting << endl; // Output: Jello
    return 0;
}
```

#### Output:
```
Jello
```

---

### 4.2 Substrings

You can extract a substring from a string using the `.substr()` method.

#### Example:
```cpp
#include <iostream>
#include <string>
using namespace std;

int main() {
    string greeting = "Hello, World!";
    string sub = greeting.substr(0, 5); // Extracts "Hello"
    cout << sub << endl;
    return 0;
}
```

#### Output:
```
Hello
```

---

### 4.3 String Comparison

You can compare two strings using the comparison operators (`==`, `!=`, `>`, `<`, etc.) or the `.compare()` method.

#### Example:
```cpp
#include <iostream>
#include <string>
using namespace std;

int main() {
    string str1 = "Hello";
    string str2 = "World";

    if (str1 == str2) {
        cout << "Strings are equal" << endl;
    } else {
        cout << "Strings are not equal" << endl;
    }

    return 0;
}
```

#### Output:
```
Strings are not equal
```

---

## 5. String Input

You can input strings from the user using `cin` and `getline()`.

### 5.1 Using `cin`

`cin` stops reading input at the first space.

#### Example:
```cpp
#include <iostream>
#include <string>
using namespace std;

int main() {
    string name;
    cout << "Enter your name: ";
    cin >> name;
    cout << "Hello, " << name << endl;
    return 0;
}
```

#### Output:
```
Enter your name: John
Hello, John
```

### 5.2 Using `getline()`

`getline()` reads the entire line, including spaces.

#### Example:
```cpp
#include <iostream>
#include <string>
using namespace std;

int main() {
    string name;
    cout << "Enter your full name: ";
    getline(cin, name);
    cout << "Hello, " << name << endl;
    return 0;
}
```

#### Output:
```
Enter your full name: John Doe
Hello, John Doe
```

---

## 6. String Functions

C++ provides several functions to manipulate strings. Some of the most common ones are:

### 6.1 `find()`

Finds the first occurrence of a substring.

#### Example:
```cpp
#include <iostream>
#include <string>
using namespace std;

int main() {
    string str = "Hello, World!";
    size_t pos = str.find("World");

    if (pos != string::npos) {
        cout << "Found at position: " << pos << endl;
    } else {
        cout << "Not found!" << endl;
    }

    return 0;
}
```

#### Output:
```
Found at position: 7
```

---

### 6.2 `replace()`

Replaces part of the string with another string.

#### Example:
```cpp
#include <iostream>
#include <string>
using namespace std;

int main() {
    string str = "Hello, World!";
    str.replace(7, 5, "Universe");
    cout << str << endl;
    return 0;
}
```

#### Output:
```
Hello, Universe!
```

---

Strings are an essential part of C++ programming, and mastering them will greatly improve your ability to handle text and input in your programs. Happy coding!
