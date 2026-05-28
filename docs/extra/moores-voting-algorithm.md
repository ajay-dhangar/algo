---
id: moores-voting-algorithm
title: "Moore's Voting Algorithm"
sidebar_label: "Moore's Voting Algorithm"
sidebar_position: 1
description: "Efficient for recognizing the element which appears more than half in a given dataset"
tags: [Algorithm, Moore, Majority element]
---

**Moore's Voting Algorithm** is a highly efficient algorithm used to find the **"majority element"** in a sequence or dataset - an element that appears strictly more than $(n/2)$ times.

## Use Cases

- **Practical Use CasesData Stream Analytics**: Identifying the most frequent user action in massive real-time streams without storing all data.
- **Inventory Management**: Detecting high-demand items in IoT-based warehouse systems to prioritize restocking.
- **Fault Tolerance**: In redundant hardware systems (like aerospace sensors), if three sensors give readings, the majority value is used to filter out noise or a malfunctioning unit.
- **Image Processing**: Identifying the dominant color or feature in a segment of an image to simplify data for object recognition.

## Algorithm Details

### Algorithm Complexity
- **Time Complexity**: $O(N)$ because it requires exactly two passes through the data.
    - **Best Case**: $O(N)$.
    - **Worst Case**: $O(N)$, where $N$ is the number of elements.

- **Space Complexity**: $O(1)$ because it only ever stores two variables (the candidate and the count), regardless of data size.

- **Requirement**: It only works if a majority ($> 50\%$) exists.

### Real - Life Analogy

Think of a battlefield where soldiers from different armies arrive one by one:
* If a soldier finds a teammate at the post, they join forces (count increases).
* If they find an enemy, they fight and both die (count decreases).
* If the post is empty, the next soldier to arrive takes control (new candidate).
* If one army has more than half of the total soldiers, they are guaranteed to have someone left standing at the end.


## Example Pseudocode

### Moore's Voting Algorithm

```cpp
function MooreVotingAlgoritm(array):
    n = len(array)
    count = 0
    for i in range(n) :
        // If count is 0, we need a new soldier to start the next battle
        if count = 0 :
            soldier = array[i]
        // If current matches our soldier, their "voting power" grows
        if array[i] == soldier :
            count = count + 1
        // If they don't match, they cancel each other out (count drops)
        else :
            count = count - 1
    // The candidate left standing is our only possible majority element
    return soldier
```

## Code Example in C++: Moore's Voting Algorithm

```Cpp
#include <iostream>
#include <vector>
#include <algorithm>
#include <array>
using namespace std;

// Implementation of Moore's Voting Algorithm
int MooreVotingAlgorithm(int arr[], int n) {
    int element; //Initialize the variable to store majority element 

    int count = 0; //Initialize the voting power to zero

    for(int i = 0; i < n; i++) {
        //Check if the voting power is zero
        if(count == 0){
            element = arr[i] ;
        }

        //Check whether the element is already in power
        if(element == arr[i]){
            count++ ; //Increases the voting power of element
        }
        else{
            count-- ; //Decrease the voting power of element
        }
        /*
        An alternative to implement the if-else loop using ternary operator

        count -= (element == arr[i]) ? 1 : -1 ;

        */
    }
    return element; //Returns the majority element
}

int main() {
    int arr[] = {1,2,1,1,4,5,1,1,1,3};
    int n = sizeof(arr) / sizeof(arr[0]) ;
    int result = MooreVotingAlgorithm(arr, n);
    cout << "The majority element is: " << result << endl ;
    return 0;
}
```

## Explanation of the Code

- Element variable: It stores the value of the element that is currently winning the "battle." It only changes when the previous leader has been completely neutralized (count reaches zero).
- Count variable: It tracks the relative frequency, not the total frequency.

## Example Walkthrough

For example let's use the array [1,2,2,1,3,1,1].
At first the variable count = 0 ,therefore variable element stores '1' as its data.
Next, count = 1, but element != arr[1] ,therefore count decreases back to 0.
Next, count = 0, element stores arr[2] as its data and count is increased to 1.
Next, count = 1, but element != arr[3] ,therefore count decreases back to 0.
Next, count = 0, element stores arr[4] as its data and count is increased to 1.
Next, count = 1, but element != arr[5] ,therefore count decreases back to 0.
Finally, count = 0, the element stores arr[6] as its data and is returned as result.
Here the final result will be arr[6], which is **'1'**.
And **1** has the majority frequency in the given array.


## Real-World Example

- **Network Packet Routing**: A router needs to identify a "heavy hitter" (an IP address sending > 50% of traffic) to prevent a DDoS attack. It can't store millions of IPs, so it uses Moore's to track the most dominant one.
- **Fault-Tolerant Computing**: In a spacecraft, three separate computers calculate the landing trajectory. A "voter" circuit uses this logic to instantly pick the result that at least two computers agreed on, ignoring the one that might have a hardware glitch.
- **Sensor Data Cleaning**: An industrial thermometer takes 100 readings per second. To ignore "outlier" spikes caused by electrical interference, the system looks for the majority reading value to ensure accuracy.

This algorithm is especially useful for developers and researchers working with large data processing tasks involving the need for finding the majority data.