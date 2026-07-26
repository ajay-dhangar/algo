---
id: banker's-algorithm
title: Banker's Algorithm
sidebar_label: Banker's Algorithm
description: "It is a method used to avoid deadlocks in a system by checking if there exists a safe sequence of resource allocation for processes using safety checks based on available resources."
tags: [operating systems, algorithms, deadlock prevention]
---

The Banker's Algorithm is a deadlock avoidance algorithm used in operating systems. It allocates resources to processes in a safe manner by verifying that the system can allocate resources in a way that avoids deadlocks. It ensures a "safe state" where resources can be allocated without risk of deadlock, based on maximum and current allocations.

## Video Explanation

<LiteYouTubeEmbed
  id="7gMLNiEz3nw"
  params="autoplay=1&autohide=1&showinfo=0&rel=0"
  title="L-4.5: Deadlock Avoidance Banker's Algorithm with Example |With English Subtutles"
  poster="maxresdefault"
  lazyLoad={true}
  webp
/>

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
### Python Implementation:

```python

# Input
nr = int(input("Enter number of resources: "))
np = int(input("Enter number of processes: "))

maxm1 = []
alln1 = []
need1 = []

print("\nEnter max resources required per process:")

for _ in range(np):
    maxm1.append(list(map(int, input().split())))

print("\nEnter allocated resources requred per process:")

for _ in range(np):
    alln1.append(list(map(int, input().split())))

avbl1 = list(map(int, input("\nEnter number of available resources: ").split()))

# Need matric calculation
print("\nNeed matrix:")

for i in range(np):
    l = []
    sl = []
    for j in range(nr):
        l.append(maxm1[i][j] - alln1[i][j])
        sl.append(str(maxm1[i][j] - alln1[i][j]))
    need1.append(l)
    print(" ".join(sl))

# If more resources are requested by a process
req = input("\nIs any process requesting resources? y/n: ")
if req == "y":
    pno = int(input("Please enter process number, (counting starting from 0): "))
    r_req = list(map(int, input("Please enter number of resources requested by the process: ").split()))
    for h in range(nr):
        need1[pno][h]-=r_req[h]
        alln1[pno][h]+=r_req[h]
        avbl1[h]-=r_req[h]


    print("New allocation matrix:")
    for i in range(np):
        for j in range(nr):
            print(alln1[i][j], end=" ")
        print()

    print("New need matrix:")
    for i in range(np):
        for j in range(nr):
            print(need1[i][j], end=" ")
        print()

    print("New available vector:")
    for i in range(nr):
        print(avbl1[i], end=" ")


maxm = maxm1.copy()
alln = alln1.copy()
need = need1.copy()
avbl = avbl1.copy()

for i in range(np):
    need[i].append(0)

flag=0
done = []
cmpr = [-1, -2,]

while len(done)!=np:
    cycle = 0 
    for i in range(np):
        f=-1
        for j in range(nr):
            if need[i][j]>avbl[j] and need[i][-1]==0:
                f+=2
            else:
                f=0

        #need<=available
        if f==0:
            print()
            done.append(str(i))
            need[i][-1]=-1
            print(f"{need[i]} <= {avbl}")
            for r in range(nr):
                avbl[r] += alln[i][r]
            print("New available = ", avbl)

        elif f>0:
            cycle+=1

    cmpr.append(cycle)
    if cmpr[-1]==cmpr[-2]:
        flag=1
        break       # Prevention of infinite while loop


if flag==1:
    print("\nNo safe sequence exists.")
else:
    print(f"\nSafe sequence: {' -> '.join(done)}")
    print("A safe sequence exists.")
```

### Time Complexity:

- **Time Complexity: O(P * R)**, where `P` is the number of processes and `R` is the number of resources. Each process is checked with respect to each resource during the safety check.

### Space Complexity:

- **Space Complexity: O(P + R)** due to arrays storing resource availability, allocation, and the safe sequence.

### Summary:

The Banker's Algorithm is crucial for systems requiring deadlock avoidance in resource allocation. By dynamically checking if resources can be safely allocated without risking deadlock, it helps maintain system stability, making it widely used in operating system designs.