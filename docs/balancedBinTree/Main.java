package docs.balancedBinTree;


import java.lang.Math;

// Node structure for the binary tree
class Node {
    int data;
    Node left;
    Node right;

    // Constructor to initialize the node with a value
    Node(int val) {
        data = val;
        left = null;
        right = null;
    }
}

class Solution {

    // Function to check if a binary tree is balanced
    public boolean isBalanced(Node root) {
        // Check if the tree's height difference between subtrees is less than 2
        return dfsHeight(root) != -1;
    }

    // Recursive function to calculate the height of the tree and check for balance
    private int dfsHeight(Node root) {
        // Base case: if the current node is NULL, return 0 (height of an empty tree)
        if (root == null) return 0;

        // Recursively calculate the height of the left subtree
        int leftHeight = dfsHeight(root.left);
        if (leftHeight == -1) return -1; // Left subtree is unbalanced

        // Recursively calculate the height of the right subtree
        int rightHeight = dfsHeight(root.right);
        if (rightHeight == -1) return -1; // Right subtree is unbalanced

        // Check if the difference in height between left and right subtrees is greater than 1
        if (Math.abs(leftHeight - rightHeight) > 1) return -1; // Tree is unbalanced

        // Return the maximum height of left and right subtrees, adding 1 for the current node
        return Math.max(leftHeight, rightHeight) + 1;
    }
}

public class Main {
    // Main function
    public static void main(String[] args) {
        // Creating a sample binary tree
       /*  Node root = new Node(1);
        root.left = new Node(2);
        root.right = new Node(3);
        root.left.left = new Node(4);
        root.left.right = new Node(5);
        root.left.right.right = new Node(6);
        root.left.right.right.right = new Node(7);

        // Creating an instance of the Solution class
        Solution solution = new Solution();

        // Checking if the tree is balanced
        if (solution.isBalanced(root)) {
            System.out.println("The tree is balanced.");
        } else {
            System.out.println("The tree is not balanced.");
        }*/
    }
}
