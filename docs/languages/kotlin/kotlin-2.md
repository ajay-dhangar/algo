---
id: kotlin-2
title: Installation and Setup
sidebar_label: Installation & Setup
sidebar_position: 2
---

# Installation and Setup

## Prerequisites

Before installing Kotlin, make sure you have the following:

- **Java Development Kit (JDK)** – Kotlin runs on the JVM, so JDK 8 or higher is required.
- **Internet connection** – To download the necessary tools.

## Step 1: Install JDK

Download and install JDK from the official Oracle or OpenJDK website.

**Check if JDK is installed:**

```bash
java -version
```

Expected output:
```
java version "17.0.x" ...
```

## Step 2: Install Kotlin

### Option A: Using SDKMAN (Linux/macOS)

```bash
# Install SDKMAN
curl -s "https://get.sdkman.io" | bash

# Install Kotlin
sdk install kotlin
```

### Option B: Using Homebrew (macOS)

```bash
brew install kotlin
```

### Option C: Using Snap (Ubuntu/Linux)

```bash
sudo snap install kotlin --classic
```

### Option D: Manual Installation (Windows/All Platforms)

1. Download the Kotlin compiler from [kotlinlang.org](https://kotlinlang.org).
2. Extract the ZIP archive.
3. Add the `bin` folder to your system PATH.

**Verify installation:**

```bash
kotlinc -version
```

Expected output:
```
kotlinc-jvm 1.9.x (JRE 17.x.x)
```

## Step 3: Set Up an IDE

### IntelliJ IDEA (Recommended)

1. Download **IntelliJ IDEA** from [jetbrains.com/idea](https://www.jetbrains.com/idea/).
2. The **Community Edition** is free and fully supports Kotlin.
3. Kotlin plugin is bundled by default — no additional installation needed.

### Android Studio

1. Download from [developer.android.com/studio](https://developer.android.com/studio).
2. Kotlin is pre-installed and ready for Android development.

### Visual Studio Code

1. Install **VS Code** from [code.visualstudio.com](https://code.visualstudio.com).
2. Install the **Kotlin** extension from the Extensions Marketplace.

## Step 4: Create Your First Kotlin Project

### In IntelliJ IDEA

1. Open IntelliJ IDEA.
2. Click **New Project**.
3. Select **Kotlin** from the left panel.
4. Choose **JVM | IDEA** as the project template.
5. Name your project and click **Create**.

### Using Command Line

```bash
# Create a file named hello.kt
echo 'fun main() { println("Hello, Kotlin!") }' > hello.kt

# Compile the file
kotlinc hello.kt -include-runtime -d hello.jar

# Run the compiled JAR
java -jar hello.jar
```

## Step 5: Online Playground (No Installation Required)

You can try Kotlin instantly in the browser using the official playground:

🔗 [play.kotlinlang.org](https://play.kotlinlang.org)

## Project Structure Overview

A typical Kotlin project looks like this:

```
MyProject/
├── src/
│   └── main/
│       └── kotlin/
│           └── Main.kt
├── build.gradle.kts
└── settings.gradle.kts
```

## Summary

| Method         | Platform         | Difficulty |
|----------------|------------------|------------|
| IntelliJ IDEA  | All              | Easy       |
| Android Studio | Android/All      | Easy       |
| SDKMAN         | Linux/macOS      | Easy       |
| Homebrew       | macOS            | Easy       |
| Manual ZIP     | Windows/All      | Medium     |
| Online IDE     | Browser          | Easiest    |

You're now ready to write your first Kotlin program!
