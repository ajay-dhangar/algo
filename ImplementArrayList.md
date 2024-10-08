# Implementing an ArrayList in Java

This code demonstrates a simple implementation of an ArrayList-like data structure in Java, using a `char` array. It handles common operations such as adding, removing, and clearing elements.

## Code Breakdown

```java
import java.util.Arrays;

public class ImplementArrayList {
    static char[] arr = {'A', 'N', 'U', 'J'}; // Array to store elements
    static int num = 4; // Number of elements in the array

    // Function to increase the size of the array
    static void increaseArraySize() {
        int n = arr.length * 2;
        char[] b = new char[n];
        for (int i = 0; i < arr.length; i++) {
            b[i] = arr[i];
        }
        arr = b;
        num++;
    }

    // Function to decrease the size of the array
    static void decreaseArraySize() {
        int n = arr.length - 1;
        char[] b = new char[n];
        for (int i = 0; i < n; i++) {
            b[i] = arr[i];
        }
        arr = b;
        num--;
    }

    // Function to add an element at the beginning of the array
    static void addFirst(char x) {
        char[] c = new char[arr.length + 1];
        c[0] = x;
        for (int i = 1; i < c.length; i++) {
            c[i] = arr[i - 1];
        }
        increaseArraySize();
        arr = c;
        printArray();
    }

    // Function to add an element at the end of the array
    static void addLast(char x) {
        char[] c = new char[arr.length + 1];
        for (int i = 0; i < arr.length; i++) {
            c[i] = arr[i];
        }
        c[arr.length] = x;
        increaseArraySize();
        arr = c;
        printArray();
    }

    // Function to add an element at a specific index
    static void addAtIndex(char x, int index) {
        char[] c = new char[arr.length + 1];
        c[index] = x;
        for (int i = 0; i < index; i++) {
            c[i] = arr[i];
        }
        for (int i = index + 1; i < c.length; i++) {
            c[i] = arr[i - 1];
        }
        increaseArraySize();
        arr = c;
        printArray();
    }

    // Function to remove the first element from the array
    static void removeFirstIndex() {
        char[] c = new char[arr.length - 1];
        for (int i = 0; i < c.length; i++) {
            c[i] = arr[i + 1];
        }
        decreaseArraySize();
        arr = c;
        printArray();
    }

    // Function to remove the last element from the array
    static void removeLastIndex() {
        char[] c = new char[arr.length - 1];
        for (int i = 0; i < c.length; i++) {
            c[i] = arr[i];
        }
        decreaseArraySize();
        arr = c;
        printArray();
    }

    // Function to remove an element at a specific index
    static void removeIndex(int index) {
        char[] c = new char[arr.length - 1];
        for (int i = 0; i < index; i++) {
            c[i] = arr[i];
        }
        for (int i = index; i < c.length; i++) {
            c[i] = arr[i + 1];
        }
        decreaseArraySize();
        arr = c;
        printArray();
    }

    // Function to clear all elements from the array
    static void clear() {
        arr = new char[0];
        num = 0;
        System.out.println();
        System.out.println("Array cleared!");
    }

    // Function to print the array
    static void printArray() {
        for (int i = 0; i < arr.length; i++) {
            System.out.print(arr[i] + " ");
        }
        System.out.println();
        System.out.println(num);
    }

    public static void main(String[] args) {
        addFirst('w');
        addLast('r');
        addAtIndex('t', 2);
        System.out.println();
        removeFirstIndex();
        System.out.println();
        removeLastIndex();
        System.out.println();
        removeIndex(1);
        clear();
    }
}

// The time complexity for adding or removing elements from the start, end, or at a specific index is O(n) because it requires copying elements to a new array, where n is the number of elements in the array.
// The time complexity for clearing the array is O(1) because it only involves resetting the array reference and the number of elements.
