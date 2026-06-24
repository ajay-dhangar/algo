---
id: kotlin-21
title: Coroutines
sidebar_label: Coroutines
sidebar_position: 21
---

# Coroutines

## What are Coroutines?

Coroutines are Kotlin's approach to **asynchronous, non-blocking programming**. They are lightweight threads that can be suspended and resumed, allowing you to write asynchronous code that looks sequential and is easy to read.

## Setup

Add to your `build.gradle.kts`:

```kotlin
dependencies {
    implementation("org.jetbrains.kotlinx:kotlinx-coroutines-core:1.7.3")
}
```

## Your First Coroutine

```kotlin
import kotlinx.coroutines.*

fun main() = runBlocking {
    launch {
        delay(1000L)
        println("World!")
    }
    println("Hello,")
}
// Output:
// Hello,
// World!
```

## Key Concepts

### `suspend` Functions

Functions that can be paused and resumed. Must be called from a coroutine or another `suspend` function:

```kotlin
import kotlinx.coroutines.*

suspend fun fetchData(): String {
    delay(2000L)  // Simulate network delay
    return "Data loaded!"
}

fun main() = runBlocking {
    println("Fetching...")
    val result = fetchData()
    println(result)
}
```

### Coroutine Builders

| Builder        | Description                                      |
|----------------|--------------------------------------------------|
| `runBlocking`  | Blocks the thread, for testing/main functions    |
| `launch`       | Fire-and-forget, returns `Job`                   |
| `async`        | Returns `Deferred<T>` (future value)             |
| `coroutineScope` | Creates a scope, suspends until children finish |

## `launch` — Fire and Forget

```kotlin
import kotlinx.coroutines.*

fun main() = runBlocking {
    val job = launch {
        repeat(5) { i ->
            println("Working... $i")
            delay(500L)
        }
    }

    println("Main continues")
    job.join()  // Wait for coroutine to finish
    println("Done!")
}
```

## `async` — Get a Result

```kotlin
import kotlinx.coroutines.*

suspend fun getTemperature(): Int {
    delay(1000L)
    return 25
}

suspend fun getHumidity(): Int {
    delay(800L)
    return 60
}

fun main() = runBlocking {
    val tempDeferred = async { getTemperature() }
    val humidDeferred = async { getHumidity() }

    // Both run concurrently!
    val temp = tempDeferred.await()
    val humid = humidDeferred.await()

    println("Temp: $temp°C, Humidity: $humid%")
}
```

## Coroutine Scope

```kotlin
import kotlinx.coroutines.*

fun main() = runBlocking {
    coroutineScope {
        launch {
            delay(200L)
            println("Task 1 done")
        }
        launch {
            delay(100L)
            println("Task 2 done")
        }
    }
    println("All tasks done")
}
// Output:
// Task 2 done
// Task 1 done
// All tasks done
```

## Coroutine Dispatchers

Control which thread the coroutine runs on:

```kotlin
import kotlinx.coroutines.*

fun main() = runBlocking {
    launch(Dispatchers.Main) { /* UI thread (Android) */ }
    launch(Dispatchers.IO) { /* I/O operations */ }
    launch(Dispatchers.Default) { /* CPU-intensive work */ }
    launch(Dispatchers.Unconfined) { /* No specific thread */ }
}
```

### Switching Dispatchers

```kotlin
import kotlinx.coroutines.*

suspend fun loadData(): String = withContext(Dispatchers.IO) {
    // Runs on IO thread
    Thread.sleep(1000)
    "Data from server"
}

fun main() = runBlocking {
    val data = loadData()
    println(data)  // Prints on main thread
}
```

## Job and Cancellation

```kotlin
import kotlinx.coroutines.*

fun main() = runBlocking {
    val job = launch {
        try {
            repeat(100) { i ->
                println("Processing $i")
                delay(100L)
            }
        } catch (e: CancellationException) {
            println("Coroutine was cancelled")
        } finally {
            println("Cleanup done")
        }
    }

    delay(500L)
    job.cancel()
    job.join()
    println("Main ends")
}
```

## Timeout

```kotlin
import kotlinx.coroutines.*

fun main() = runBlocking {
    try {
        withTimeout(1500L) {
            repeat(10) { i ->
                println("Processing $i")
                delay(400L)
            }
        }
    } catch (e: TimeoutCancellationException) {
        println("Timed out!")
    }
}
```

## Flow — Asynchronous Streams

```kotlin
import kotlinx.coroutines.*
import kotlinx.coroutines.flow.*

fun numberFlow(): Flow<Int> = flow {
    for (i in 1..5) {
        delay(300L)
        emit(i)  // Emit value
    }
}

fun main() = runBlocking {
    numberFlow()
        .map { it * it }        // Transform
        .filter { it > 5 }      // Filter
        .collect { println(it) } // Collect
}
```

## Channel — Communication Between Coroutines

```kotlin
import kotlinx.coroutines.*
import kotlinx.coroutines.channels.*

fun main() = runBlocking {
    val channel = Channel<Int>()

    launch {
        for (i in 1..5) {
            channel.send(i)   // Producer
            delay(100L)
        }
        channel.close()
    }

    for (value in channel) {  // Consumer
        println("Received: $value")
    }
}
```

## Summary

| Concept          | Description                                  |
|------------------|----------------------------------------------|
| `suspend`        | Mark a function as suspendable               |
| `runBlocking`    | Bridge between coroutines and blocking code  |
| `launch`         | Start coroutine, get `Job`                   |
| `async`          | Start coroutine, get `Deferred<T>`           |
| `await()`        | Get result from `Deferred`                   |
| `delay()`        | Suspend without blocking thread              |
| `withContext()`  | Switch dispatcher within a coroutine         |
| `cancel()`       | Cancel a running coroutine                   |
| `Flow`           | Cold asynchronous stream                     |
| `Channel`        | Hot stream for producer-consumer pattern     |
