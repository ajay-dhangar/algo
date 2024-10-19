/*Algorithm for Heap Sort
Heap Sort is a comparison-based sorting algorithm that uses a binary heap data structure. It follows the following steps:

Step 1: Build a Max Heap
    1. Start from the last non-leaf node and heapify each node in a bottom-up manner.
    2. The last non-leaf node can be found at index n/2 - 1, where n is the number of elements in the array.

    Heapify Function: The heapify operation is essential to maintain the max heap property.
        1. Given a node index i, compare it with its left and right children.
        2. If either child is greater than the node, swap the node with the largest child.
        3. Recursively heapify the affected subtree to ensure the max heap property is maintained.

Step 2: Sorting the Heap
    1. Extract Elements: The maximum element (root of the heap) is swapped with the last element of the heap. The size of the heap is reduced by one.
    2. Restore Heap Property: After the swap, heapify the new root to restore the max heap property.
    3. Repeat the extraction process until the heap is empty.

Step 3: Output the Sorted Array
The array will be sorted in ascending order.
*/

#include <iostream>
using namespace std;

// Function to heapify a subtree rooted at index i
void heapify(int arr[], int n, int i) {
    int largest = i; // Initialize largest as root
    int left = 2 * i + 1; // left child index
    int right = 2 * i + 2; // right child index

    // If left child is larger than root
    if (left < n && arr[left] > arr[largest]) {
        largest = left;
    }

    // If right child is larger than largest so far
    if (right < n && arr[right] > arr[largest]) {
        largest = right;
    }

    // If largest is not root
    if (largest != i) {
        swap(arr[i], arr[largest]); // Swap root and largest

        // Recursively heapify the affected subtree
        heapify(arr, n, largest);
    }
}

// Function to perform heap sort
void heapSort(int arr[], int n) {
    // Build a max heap
    for (int i = n / 2 - 1; i >= 0; i--) {
        heapify(arr, n, i);
    }

    // One by one extract elements from heap
    for (int i = n - 1; i >= 0; i--) {
        swap(arr[0], arr[i]); // Move current root to end

        // Call heapify on the reduced heap
        heapify(arr, i, 0);
    }
}

// Function to print an array
void printArray(int arr[], int size) {
    for (int i = 0; i < size; i++) {
        cout << arr[i] << " ";
    }
    cout << endl;
}

// Main function to test the above functions
int main() {
    int n;

    cout << "Enter the number of elements in the array: ";
    cin >> n;

    int* arr = new int[n]; // Dynamic array allocation

    cout << "Enter the elements of the array:" << endl;
    for (int i = 0; i < n; i++) {
        cin >> arr[i]; // Take input from the user
    }

    cout << "Unsorted array: ";
    printArray(arr, n);

    heapSort(arr, n);

    cout << "Sorted array: ";
    printArray(arr, n);

    delete[] arr; // Free the allocated memory
    return 0;
}
