```java
import java.util.ArrayList;

public class StackDSByArrayList {
    static int[] arr = {1, 2, 3}; // Initialize with some elements
    static int size = 3; // Current size of the stack

    // Method to increase the size of the array
    static void increaseArraySize() {
        int n = arr.length + 1;
        int[] b = new int[n]; // Create a new array with increased size
        for (int i = 0; i < arr.length; i++) {
            b[i] = arr[i]; // Copy elements from the old array
        }
        arr = b; // Update the 'arr' reference to the new array
        size++; // Increment the size
    }

    // Method to decrease the size of the array
    static void decreaseArraySize() {
        int n = arr.length - 1;
        int[] b = new int[n]; // Create a new array with decreased size
        for (int i = 0; i < n; i++) {
            b[i] = arr[i]; // Copy elements from the old array
        }
        arr = b; // Update the 'arr' reference to the new array
        size--; // Decrement the size
    }

    // Method to push an element onto the stack
    static void push(int x) {
        int[] c = new int[arr.length + 1]; // Create a new array with increased size
        for (int i = 0; i <= arr.length - 1; i++) {
            c[i] = arr[i]; // Copy elements from the old array
        }
        c[arr.length] = x; // Add the new element at the end
        increaseArraySize(); // Increase the size of the array
        arr = c; // Update the 'arr' reference to the new array
        for (int i = 0; i < arr.length; i++) {
            System.out.print(arr[i] + " "); // Print the updated array (stack)
        }
        System.out.println();
    }

    // Method to pop an element from the stack
    static void pop() {
        int[] c = new int[arr.length - 1]; // Create a new array with decreased size
        for (int i = 0; i < arr.length - 1; i++) {
            c[i] = arr[i]; // Copy elements from the old array
        }
        decreaseArraySize(); // Decrease the size of the array
        arr = c; // Update the 'arr' reference to the new array
        for (int i = 0; i < arr.length; i++) {
            System.out.print(arr[i] + " "); // Print the updated array (stack)
        }
        System.out.println();
    }

    public static void main(String[] args) {
        push(25); // Push elements onto the stack
        push(12);
        System.out.println("size:" + size);
        push(8);
        System.out.println("size:" + size);
        pop(); // Pop an element from the stack
    }
}
