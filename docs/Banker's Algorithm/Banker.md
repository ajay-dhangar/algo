---
id: banker's-algorithm
title: Banker's Algorithm
sidebar_label: Banker's Algorithm
description: "It is a method used to avoid deadlocks in a system by checking if there exists a safe sequence of resource allocation for processes using safety checks based on available resources."
tags: [operating systems, algorithms, deadlock prevention]
---

### Definition:
The Banker's Algorithm is a deadlock avoidance algorithm used in operating systems. It allocates resources to processes in a safe manner by verifying that the system can allocate resources in a way that avoids deadlocks. It ensures a "safe state" where resources can be allocated without risk of deadlock, based on maximum and current allocations.

### Characteristics:
- **Safety Check**:
  - The algorithm uses a **safety check** to determine if the system is in a safe state by calculating a "safe sequence" for process execution.
  
- **Work Array and Finish Array**:
  - The **work array** is initialized to available resources, and **finish array** tracks completed processes. A safe sequence is identified if all processes can be allocated resources in an order that completes without deadlock.
  
- **Efficient Deadlock Avoidance**:
  - The algorithm helps avoid deadlock by dynamically checking if resources can be safely allocated before fulfilling a process request, ensuring a safe state.

### C Implementation:
```c

#include <stdio.h>
#include <stdbool.h>

#define MAX_PROCESSES 10
#define MAX_RESOURCES 10

bool isSafe(int processes, int resources, int max[MAX_PROCESSES][MAX_RESOURCES],
            int allocation[MAX_PROCESSES][MAX_RESOURCES], int available[MAX_RESOURCES]) {

    int work[MAX_RESOURCES];
    bool finish[MAX_PROCESSES] = {false};
    int safeSequence[MAX_PROCESSES];
    int count = 0;

    // Initialize work with available resources
    for (int i = 0; i < resources; i++) {
        work[i] = available[i];
    }

    // Find a safe sequence
    while (count < processes) {
        bool found = false;
        for (int p = 0; p < processes; p++) {
            if (!finish[p]) {
                bool canAllocate = true;
                for (int r = 0; r < resources; r++) {
                    if (max[p][r] - allocation[p][r] > work[r]) {
                        canAllocate = false;
                        break;
                    }
                }
                if (canAllocate) {
                    for (int r = 0; r < resources; r++) {
                        work[r] += allocation[p][r];
                    }
                    safeSequence[count++] = p;
                    finish[p] = true;
                    found = true;
                }
            }
        }
        if (!found) {
            printf("System is not in a safe state.\n");
            return false;
        }
    }
    printf("System is in a safe state.\nSafe sequence: ");
    for (int i = 0; i < processes; i++) {
        printf("%d ", safeSequence[i]);
    }
    printf("\n");
    return true;
}

int main() {
    int processes, resources;
    int max[MAX_PROCESSES][MAX_RESOURCES];
    int allocation[MAX_PROCESSES][MAX_RESOURCES];
    int available[MAX_RESOURCES];

    printf("Enter number of processes: ");
    scanf("%d", &processes);
    printf("Enter number of resources: ");
    scanf("%d", &resources);

    printf("Enter the Max matrix:\n");
    for (int i = 0; i < processes; i++) {
        for (int j = 0; j < resources; j++) {
            scanf("%d", &max[i][j]);
        }
    }

    printf("Enter the Allocation matrix:\n");
    for (int i = 0; i < processes; i++) {
        for (int j = 0; j < resources; j++) {
            scanf("%d", &allocation[i][j]);
        }
    }

    printf("Enter the Available resources:\n");
    for (int i = 0; i < resources; i++) {
        scanf("%d", &available[i]);
    }

    isSafe(processes, resources, max, allocation, available);

    return 0;
}


```

### Time Complexity:
- **Time Complexity: O(P * R)**, where `P` is the number of processes and `R` is the number of resources. Each process is checked with respect to each resource during the safety check.

### Space Complexity:
- **Space Complexity: O(P + R)** due to arrays storing resource availability, allocation, and the safe sequence.

### Summary:
The Banker's Algorithm is crucial for systems requiring deadlock avoidance in resource allocation. By dynamically checking if resources can be safely allocated without risking deadlock, it helps maintain system stability, making it widely used in operating system designs.
