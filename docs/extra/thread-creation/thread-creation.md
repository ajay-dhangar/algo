---
id: thread-creation
title: Thread Creation
sidebar_label: "Thread Creation"
sidebar_position: 1
description: "Thread creation is the allocation and initialization of a new, independent execution stream within an existing process's memory space to enable concurrent task performance."
tags: [Threads, Creation, C]
---

# Thread Creation in C

A thread is an independent flow of execution within a process. Multiple threads of the same process share the same memory space and resources, allowing different tasks to execute concurrently.

## 1. Introduction

In C, threads are commonly created using the POSIX Threads (Pthreads) library. Thread creation is useful when a program needs to perform multiple operations simultaneously, such as calculations, file handling, network communication, or background processing.

The following example demonstrates thread creation by running three independent tasks concurrently:

- Printing Pascal's Triangle rows
- Printing Triangular Numbers
- Printing Fibonacci Numbers


## 2. C Implementation

```c
#include <stdio.h>
#include <pthread.h>
#include <unistd.h>

//Printing pascal rows
void *pascal_rows(void *arg){
int n = *(int*)arg;
int a[50]={1};

for (int i=1;i<=n;i++){
printf("Pascal row %d = 1 ", i);
for (int j=1;j<i;j++){
int z = a[j-1]+a[j];
printf("%d ", z);
a[j]=z;
}
printf("1 \n");
sleep(1);
a[i]=1;
}
pthread_exit(NULL);
}

//Printing triangular numbers
void *triangular_nos(void *arg){
int n = *(int*)arg;
int a=0;
for (int i=1;i<=n;i++){
a+=i;
printf("Triangular number %d = %d\n", i, a);
sleep(2);
}
pthread_exit(NULL);
}

//Printing fibonacci numbers
int fibonacci(int m){
if (m==0)
return 0;
if (m==1)
return 1;
return fibonacci(m-1)+fibonacci(m-2);
}

void *prt_fib(void *arg){
int n = *(int*)arg;
for (int i=1;i<=n;i++){
printf("Fibonacci no %d = %d\n", i, fibonacci(i));
sleep(3);
}
pthread_exit(NULL);
}

int main(){

pthread_t p,t,f;
int x = 0;
printf("Enter a positive integer: ");
scanf("%d", &x);

pthread_create(&p, NULL, pascal_rows, &x);
pthread_create(&t, NULL, triangular_nos, &x);
pthread_create(&f, NULL, prt_fib, &x);

pthread_join(p, NULL);
pthread_join(t, NULL);
pthread_join(f, NULL);

printf("End of main thread\n");

return 0;
}
```

Input:

```text
Enter a positive integer: 3
```

Output:

```text
Pascal row 1 = 1 1 
Triangular number 1 = 1
Fibonacci no 1 = 1
Pascal row 2 = 1 2 1 
Triangular number 2 = 3
Pascal row 3 = 1 3 4 1 
Fibonacci no 2 = 1
Triangular number 3 = 6
Fibonacci no 3 = 2
End of main thread
```

## 3. Explanation:

### 3.1 Header Files Used
- `stdio.h` – Input and output functions like `printf()` and `scanf()`.
- `pthread.h` – Functions for creating and managing threads.
- `unistd.h` – Provides the `sleep()` function.

### 3.2 Creating Threads

The main thread creates three separate threads:
- `pthread_create(&p, NULL, pascal_rows, &x);`
- `pthread_create(&t, NULL, triangular_nos, &x);`
- `pthread_create(&f, NULL, prt_fib, &x);`

**Syntax:**

```c
pthread_create(
    pthread_t *thread,
    const pthread_attr_t *attr,
    void *(*start_routine)(void *),
    void *arg
);
```
- `&p`, `&t`, `&f` are thread identifiers.
- `NULL` indicates default thread attributes.
- `pascal_rows`, `triangular_nos`, and `prt_fib` are the functions executed by the threads.
- `&x` passes the user-entered value to each thread.

After these calls, all three threads begin executing concurrently.

### 3.3 Passing Arguments to Threads

- The user enters a value: `scanf("%d", &x);`
- This value is passed to each thread using: `&x`
- Inside the thread function, it is retrieved as: `int n = *(int*)arg;`

**Why Type Casting?**
The thread function parameter is always of type: `void *arg`
Therefore, it must be cast back to the appropriate data type before use.

### 3.4 Thread Termination

Each thread ends using: `pthread_exit(NULL);`
This terminates only the calling thread without affecting other running threads.

The main thread waits for all created threads to complete:
- `pthread_join(p, NULL);`
- `pthread_join(t, NULL);`
- `pthread_join(f, NULL);`

Only after all threads finish does the program execute `printf("End of main thread\n");`.

### 3.5 Execuation Flow

1. Main thread reads the value.
2. Three threads are created.
3. All threads start executing concurrently.
4. Outputs from different threads may appear intermixed.
5. Each thread completes its assigned task.
6. pthread_join() waits for all threads.
7. Main thread prints: "End of main thread"
