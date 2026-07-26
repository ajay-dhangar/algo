---
id: i-o-and-serialization
sidebar_position: 13
title: "I/O and Serialization in Java"
sidebar_label: "I/O and Serialization in Java"
description: "In Java, reading from and writing to external sources (like files, network connections, or the console) is handled via I/O Streams. An I/O Stream represents an input source or an output destination. And Serialization helps you to store the state of an object into a byte stream."
tags: [java, Serialization, File Handling, I/O Streams]
---

## I/O Streams

In Java, reading from and writing to external sources (like files, network connections, or the console) is handled via I/O Streams. An I/O Stream represents an input source or an output destination.

## Video Explanation

<LiteYouTubeEmbed
  id="ScUJx4aWRi0"
  params="autoplay=1&autohide=1&showinfo=0&rel=0"
  title="Java File Input/Output - It's Way Easier Than You Think"
  lazyLoad={true}
  webp
/>

## Byte Streams vs. Character Streams

- **Byte Streams** (`InputStream` / `OutputStream`): Used to perform reading and writing of 8-bit bytes. Useful for binary data like images or audio files.
- **Character Streams** (`Reader` / `Writer`): Used to perform reading and writing of 16-bit unicode characters. Useful for text files.

## Basic Text File Read/Write Example

Java provides wrapper classes like `BufferedReader` and `BufferedWriter` to make file operations efficient and simple.

```java
import java.io.*;

public class FileIOExample {
    public static void main(String[] args) {
        String fileName = "example.txt";

        // WRITING TO A FILE
        // The try-with-resources statement ensures streams are closed automatically
        try (BufferedWriter writer = new BufferedWriter(new FileWriter(fileName))) {
            writer.write("Hello, Welcome to Java I/O!");
            writer.newLine();
            writer.write("This is the second line.");
            System.out.println("Successfully wrote to the file.");
        } catch (IOException e) {
            System.out.println("An error occurred during writing: " + e.getMessage());
        }

        // READING FROM A FILE
        try (BufferedReader reader = new BufferedReader(new FileReader(fileName))) {
            String line;
            System.out.println("\nReading from file:");
            while ((line = reader.readLine()) != null) {
                System.out.println(line);
            }
        } catch (IOException e) {
            System.out.println("An error occurred during reading: " + e.getMessage());
        }
    }
}
```

### Output

```
Successfully wrote to the file.

Reading from file:
Hello, Welcome to Java I/O!
This is the second line.
```

---

## Serialization

`Serialization` is the process of converting the state of an object into a byte stream. This byte stream can be saved to a database, sent across a network, or saved to a file.
`Deserialization` is the reverse process: reading the byte stream and converting it back into a Java object.

### The `Serializable` Interface

For an object to be serialized, its class must implement the `java.io.Serializable` interface. This is a marker interface (it has no methods) that simply tells the Java Virtual Machine (JVM) that the objects of this class are allowed to be serialized.

#### Serialization Process Example

We use `ObjectOutputStream` to write the object, and `ObjectInputStream` to read the object.

```java
import java.io.*;

// 1. Class must implement Serializable
class Student implements Serializable {
    private static final long serialVersionUID = 1L; // Recommended best practice

    int id;
    String name;

    // transient keyword prevents a field from being serialized
    transient String password;

    public Student(int id, String name, String password) {
        this.id = id;
        this.name = name;
        this.password = password;
    }
}

public class SerializationExample {
    public static void main(String[] args) {
        Student s1 = new Student(101, "Alice", "secret123");
        String filename = "student.ser";

        // SERIALIZATION (Writing Object)
        try (ObjectOutputStream out = new ObjectOutputStream(new FileOutputStream(filename))) {
            out.writeObject(s1);
            System.out.println("Object has been serialized.");
        } catch (IOException e) {
            e.printStackTrace();
        }

        // DESERIALIZATION (Reading Object)
        try (ObjectInputStream in = new ObjectInputStream(new FileInputStream(filename))) {
            Student deserializedStudent = (Student) in.readObject();

            System.out.println("\nObject has been deserialized.");
            System.out.println("ID: " + deserializedStudent.id);
            System.out.println("Name: " + deserializedStudent.name);
            // Password will be null because it was marked 'transient'
            System.out.println("Password: " + deserializedStudent.password);

        } catch (IOException | ClassNotFoundException e) {
            e.printStackTrace();
        }
    }
}
```

#### Output

```
Object has been serialized.

Object has been deserialized.
ID: 101
Name: Alice
Password: null
```

> The `transient` Keyword
> If there are specific fields in your class that you do not want to save or transmit (like sensitive passwords or temporary states), you can mark them with the `transient` keyword. When the object is serialized, `transient` fields are ignored. Upon deserialization, they take their default values (e.g., null for objects, 0 for integers).
