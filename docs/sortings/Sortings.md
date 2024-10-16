---
id: sortings
title: Sortings Data Structure (C Language)
sidebar_label: Introduction to Sortings
description: 'Sorting algorithms are fundamental in computer science, used to arrange data in a particular order, typically ascending or descending. Various sorting techniques are designed to optimize performance based on factors like time complexity, space complexity.'
tags: [dsa, Sortings, Bubble sort, Insertion sort, Selection sort, Merge sort, Quick sort , C language, Heap Sort]
---

### Introduction to Sortings

Sorting algorithms play a crucial role in organizing data for efficient access and manipulation. Different algorithms are optimized for various use cases based on their time complexity, space complexity, and stability.

In this page we will learn about **Bubble Sort** , **Selection Sort** , **Insertion Sort** , **Merge Sort** and **Quick Sort**.

### Bubble Sort

Bubble sort is a simple, comparison-based sorting algorithm. It works by repeatedly stepping through the list, comparing adjacent elements, and swapping them if they are in the wrong order. This process is repeated until no more swaps are needed, indicating that the list is sorted.

**Alogrithm**

  - Start at the beginning of the array.
  - Compare each pair of adjacent elements and then swap them if they are in the wrong order.
  - Repeat the process for the entire list until no swaps are made during a pass.

    ```text
        void bubble_sort(int a[],int n) 
        { 
            int i,j,temp; 
            for(i=1;i<n;i++) 
            for(j=0;j<n-i;j++) 
            if(a[j]>a[j+1]) 
            { 
                temp=a[j]; 
                a[j]=a[j+1]; 
                a[j+1]=temp; 
            } 
        display(a,n); 
        }    
    ```
**Time Complexity**
    - **Worst Case**: O(n²) – when the array is sorted in reverse order.
    - **Best Case**: O(n) – when the array is already sorted.
    
**Space Complexity**
   - O(1) – sorts the list in place without extra space.

**Stability**
   - Stable – equal elements remain in the same relative order after sorting.

**Usage**
   - Not used in practical applications due to its inefficiency, but useful for educational purposes.

### Selection Sort

Selection sort divides the array into a sorted and an unsorted region. It works by repeatedly selecting the smallest (or largest) element from the unsorted region and swapping it with the first unsorted element. This process continues until the entire array is sorted.

**Alogrithm**

  - Start at the beginning of the array.
  - Find the minimum element from the unsorted portion of the array.
  - Swap it with the first element in the unsorted portion and move forward.
  - Repeat until the array is fully sorted.

    ```text
        void selection_sort(int a[],int n) 
        {
            int i,j,k,temp,temper; 
            for(i=0;i<n;i++) 
            { 
                k=0; 
                temp=a[i]; 
                for(j=i+1;j<n;j++) 
                    if(temp>a[j]) 
                    {
                        k=j; 
                        temp=a[j]; 
                    } 
                if(k!=0){ 
                    temper=a[i]; 
                    a[i]=a[k]; 
                    a[k]=temper; 
                } 
            } 
        display(a,n); 
        }
    ```
**Time Complexity**
    - **Worst Case**: O(n²) – as it performs n comparisons for each element.
    - **Best Case**: O(n) – when the array is already sorted.
    
**Space Complexity**
    - O(1) – in-place sorting.

**Stability**
    - Unstable – equal elements may be swapped, changing their relative order.

**Usage**
    - Useful when memory space is limited due to its in-place nature. Not efficient for large datasets.


### Insertion Sort

Insertion sort works similarly to how people arrange playing cards in their hands. It builds the sorted list one element at a time by inserting each new element into its proper position relative to the elements already sorted.

**Alogrithm**

  - Start at the beginning of the array.
  - Assume the first element is sorted and pick the next element.
  - Compare it to the elements in the sorted portion and shift elements larger than it to the right and insert the element in its correct position.
  - Repeat until the array is fully sorted.

    ```text
        void insertion_sort(int a[],int n) 
        { 
            int i,j,temp; 
            for(i=1;i<n;i++) 
            { 
                temp=a[i]; 
                for(j=i-1;j>=0&&a[j]>temp;j--) 
                { 
                    a[j+1]=a[j]; 
                    a[j]=temp; 
                } 
            } 
        display(a,n); 
        }
    ```
**Time Complexity**
    - **Worst Case**: O(n²) – when the array is sorted in reverse order.
    - **Best Case**: O(n) – when the array is already sorted.
    
**Space Complexity**
    - O(1) – in-place sorting.

**Stability**
    - Stable – maintains the relative order of equal elements.

**Usage**
    - Useful when memory space is limited due to its in-place nature. 
    - Efficient for small datasets or nearly sorted data. 
    - Commonly used in hybrid algorithms like Timsort.

### Merge Sort

Merge sort is a divide-and-conquer algorithm. It splits the array into two halves, recursively sorts each half, and then merges the sorted halves to produce the sorted array.

**Alogrithm**

  - Start at the beginning of the array.
  - Divide the array into two halves.
  - Recursively sort each half and merge the sorted halves into a single sorted array.
  - Repeat until the array is fully sorted.

    ```text

    //fUNCTION FOR MERGING 

       void merge(int a[],int l,int mid,int u) 
        { 
            int i=l; 
            int j=mid+1; 
            int x=0; 
            int c[10]; 
            while(i<=mid&&j<=u) 
            { 
                if(a[i]<=a[j]) 
                { 
                    c[x]=a[i]; 
                    i++; 
                    x++; 
                } 
                else 
                { 
                    c[x]=a[j]; 
                    j++; 
                    x++; 
                } 
            } 
            while(i<=mid) 
            { 
                c[x]=a[i]; 
                i++;x++; 
            } 
            while(j<=u) 
            { 
                c[x]=a[j]; 
                j++;x++; 
            } 
            for(i=0,j=l;i<x;i++,j++) 
                a[j]=c[i]; 
        } 
    ```
    ```text
        //FUNCTION FOR SPLITING AND CALLING MERGE FUNCTION

        void merge_sort(int a[],int l,int u) 
        { 
            int mid; 
            if(l<u) 
            { 
                mid=l+(u-l)/2; 
                merge_sort(a,l,mid); 
                merge_sort(a,mid+1,u); 
                merge(a,l,mid,u); 
            } 
        }
    ```
**Time Complexity**
    - O(n log n) – consistently for all cases (worst, average, and best).
    
**Space Complexity**
    - O(n) – requires additional space for temporary arrays during the merge process.

**Stability**
    - Stable – equal elements maintain their relative order.

**Usage**
    - Suitable for large datasets and linked lists.


### Quick Sort

Quick sort is a divide-and-conquer algorithm. It selects a **pivot (IN THIS IT IS DENOTED BY PI)** element and partitions the array such that elements less than the pivot are on the left and those greater than the pivot are on the right. This process is recursively applied to the subarrays.

**Alogrithm**

  - Choose a pivot 
  - Rearrange the array such that elements smaller than the pivot are on its left and larger elements on its right.
  - Recursively apply the process to the left and right subarrays.
  - Repeat until the array is fully sorted.

    ```text
    //FUNCTION FOR SORTING THE PARTITIONED ARRAY
       int partition(int a[],int l,int u) 
        { 
            int pi,i,j,temp; 
            pi=a[l]; 
            i=l; 
            j=u+1; 
            do 
            { 
                do 
                i++; 
                while(a[i]<pi&&i<=u); 
                do 
                j--; 
                while(a[j]>pi); 
                if(i<j) 
                { 
                    temp=a[i]; 
                    a[i]=a[j]; 
                    a[j]=temp; 
                } 
            } 
            while(i<j); 
            a[l]=a[j]; 
            a[j]=pi; 
            return(j); 
        } 
    ```
    ```text
    //FUNCTION FOR PARTITION THE ARRAY IN TWO SUBPARTS LEFT AND RIGHT BY RECURSIVE CALL
    void quick_sort(int a[],int l,int u) 
    { 
        int x,i; 
        if(l<u) 
        { 
            x=partition(a,l,u); 
            quick_sort(a,l,x-1); 
            quick_sort(a,x+1,u); 
        } 
    }
    ```
**Time Complexity**
    - **Worst Case**:O(n²) – occurs when the pivot is poorly chosen, such as when the array is already sorted.
    
**Space Complexity**
    - O(log n) – due to recursive calls, but in-place sorting.

**Stability**
    - Unstable – the relative order of equal elements may change.

**Usage**
    - Variants like randomized quicksort and 3-way quicksort improve performance in the worst case.

### Main Function
```text
// Display function
void display(int a[],int n) 
{ 
  int i; 
  printf("\nArray is:"); 
  for(i=0;i<n;i++) 
  printf("%d\t",a[i]); 
}
```
```text
//main funcion
void main() 
{ 
  int a[50],i,n,x; 
  clrscr(); 
  printf("Sortings\n"); 

  //creation of array
  
  printf("\nenter no. of elements in array:"); 
  scanf("%d",&n); 
  for(i=0;i<n;i++) 
  { 
    printf("\nEnter no.:"); 
    scanf("%d",&x); 
    a[i]=x; 
  } 
display(a,n);

//Function calling

printf("\nInsertion sorting:\n"); 
insertion_sort(a,n); 
printf("\nBubble sortimg:\n"); 
bubble_sort(a,n); 
printf("\nSelection sorting:\n"); 
selection_sort(a,n); 
printf("\nQuick sorting:\n"); 
quick_sort(a,0,n-1); 
display(a,n); 
printf("\nMerge sorting:\n"); 
merge_sort(a,0,n-1); 
display(a,n); 
getch(); 
} 
```

### Heap Sort
Heap Sort is a comparison-based sorting algorithm that uses a binary heap data structure. It first builds a max heap and then repeatedly extracts the largest element (root of the heap) and places it at the end of the array, reducing the heap size and repeating the process until all elements are sorted.

**Algorithm**
1. Build a max heap from the input array.
2. Swap the root (largest element) with the last element of the heap.
3. Reduce the heap size by one and heapify the root.
4. Repeat steps 2 and 3 until the heap size is reduced to 1.

**Code:**

// FUNCTION TO BUILD MAX HEAP
void heapify(int arr[], int n, int i) {
    int largest = i; 
    int left = 2 * i + 1; 
    int right = 2 * i + 2;

    if (left < n && arr[left] > arr[largest])
        largest = left;

    if (right < n && arr[right] > arr[largest])
        largest = right;

    if (largest != i) {
        swap(&arr[i], &arr[largest]);
        heapify(arr, n, largest);
    }
}

// HEAP SORT FUNCTION
void heapSort(int arr[], int n) {
    for (int i = n / 2 - 1; i >= 0; i--){
        heapify(arr, n, i);
    }

    for (int i = n - 1; i > 0; i--) {
        swap(&arr[0], &arr[i]);
        heapify(arr, i, 0);
    }
}

// FUNCTION TO SWAP TWO ELEMENTS
void swap(int* a, int* b) {
    int temp = *a;
    *a = *b;
    *b = temp;
}

**Time Complexity**
O(n log n) – consistently for all cases.

**Space Complexity**
O(1) – in-place sorting, no extra space required.

**Stability**
Unstable – the relative order of equal elements may change.

**Usage**
Used in applications where a guarantee of O(n log n) time is necessary and space is limited.

### Conclusion

Choosing the right sorting algorithm ensures optimal performance, especially in applications involving large datasets or time-sensitive operations. Understanding these techniques allows developers to make informed decisions and write efficient code for a variety of sorting tasks.

When implementing sorting in C, the standard library provides built-in functions like qsort() in stdlib.h, or you can create custom algorithms depending on the requirements.
