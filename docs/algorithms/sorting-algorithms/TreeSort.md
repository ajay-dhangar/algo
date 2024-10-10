---
id: tree-sort-algo  
sidebar_position: 15  
title: Tree Sort  
sidebar_label: Tree Sort  
---

### Definition:

Tree Sort is a sorting algorithm that builds a Binary Search Tree (BST) from the elements of the array and then performs an in-order traversal to retrieve the elements in sorted order. It is efficient when the tree remains balanced, but can degrade to quadratic time complexity in the worst case.

### Characteristics:

- **Binary Search Tree (BST)**:
  - Tree Sort inserts elements into a binary search tree where each node follows the property: the left child is smaller than the parent node and the right child is larger.

- **In-Order Traversal**:
  - Once all elements are inserted into the BST, an in-order traversal is performed to retrieve the elements in sorted order.

- **Not In-Place**:
  - Tree Sort is not an in-place algorithm because it uses additional memory to store the BST.

- **Stable**:
  - Tree Sort can be stable if implemented carefully by ensuring that equal elements are inserted in a way that maintains their relative order.

### Time Complexity:

- **Best Case: O(n log n)**  
  When the tree remains balanced, insertion and traversal operations are logarithmic, resulting in an overall complexity of O(n log n).

- **Average Case: O(n log n)**  
  For random input, the tree usually remains balanced.

- **Worst Case: O(n²)**  
  In the worst case, such as when inserting elements that are already sorted, the tree can become skewed, and the algorithm may take O(n²) time.

### Space Complexity:

- **Space Complexity: O(n)**  
  The algorithm uses extra space for the tree structure, proportional to the number of elements in the input array.

### Java Implementation:

```java
// Class to represent a node in the BST
class TreeNode {
    int value;
    TreeNode left, right;

    public TreeNode(int value) {
        this.value = value;
        left = right = null;
    }
}

// TreeSort class
public class TreeSort {
    TreeNode root;

    // Method to insert a node into the BST
    void insert(int value) {
        root = insertRec(root, value);
    }

    // Recursive method to insert a node into the BST
    TreeNode insertRec(TreeNode root, int value) {
        if (root == null) {
            root = new TreeNode(value);
            return root;
        }
        if (value < root.value) {
            root.left = insertRec(root.left, value);
        } else if (value > root.value) {
            root.right = insertRec(root.right, value);
        }
        return root;
    }

    // Method to perform an in-order traversal
    void inorderRec(TreeNode root) {
        if (root != null) {
            inorderRec(root.left);
            System.out.print(root.value + " ");
            inorderRec(root.right);
        }
    }

    // Main function to sort an array using Tree Sort
    void treeSort(int[] arr) {
        for (int value : arr) {
            insert(value);
        }
        inorderRec(root);  // Prints the sorted elements
    }

    public static void main(String[] args) {
        TreeSort tree = new TreeSort();
        int[] arr = {5, 3, 7, 2, 8, 1, 9};
        System.out.println("Sorted array:");
        tree.treeSort(arr);
    }
}
```

### Summary:
Tree Sort is an intuitive and simple sorting algorithm that leverages the properties of Binary Search Trees to sort an array. While its average-case time complexity is 𝑂(𝑛log𝑛) O(nlogn), it can degrade to 𝑂(𝑛2) O(n2) in the worst case, making it less suitable for practical use in many scenarios compared to other algorithms like QuickSort or MergeSort.
