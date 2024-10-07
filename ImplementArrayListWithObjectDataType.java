import java.util.Arrays;
public class ImplementArrayListWithObjectDataType {
    // Static variables to hold the array and its size
    static Object[] arr = {'A', 'N', 'U', 'J'}; // Initial array
    static int num = 4; // Initial size
    // Increase the size of the array
    static void increaseArraySize() {
        int n = arr.length * 2;
        Object[] b = new Object[n];
        arr = b;
        num++;
    }
    // Decrease the size of the array
    static void decreaseArraySize() {
        int n = arr.length - 1;
        Object[] b = new Object[n];
        arr = b;
        num--;
    }
    // Add an element at the first index
    static void addFirst(Object x) {
        Object[] c = new Object[arr.length + 1];
        for (int i = 1; i < c.length; i++) {
            c[i] = arr[i - 1];
        }
        c[0] = x;
        increaseArraySize();
        arr = c;
        // Print array elements and size after addition
        for (int i = 0; i < arr.length; i++) {
            System.out.print(arr[i] + " ");
        }
        System.out.println();
        System.out.println(num);
    }
    // Add an element at the last index
    static void addLast(Object x) {
        Object[] c = new Object[arr.length + 1];
        c[arr.length] = x;
        for (int i = 0; i < c.length - 1; i++) {
            c[i] = arr[i];
        }
        increaseArraySize();
        arr = c;
        // Print array elements and size after addition
        for (int i = 0; i < arr.length; i++) {
            System.out.print(arr[i] + " ");
        }
        System.out.println();
        System.out.println(num);
    }
    // Add an element at a specific index
    static void addAtIndex(Object x, int index) {
        Object[] c = new Object[arr.length + 1];
        c[index] = x;
        for (int i = 0; i < index; i++) {
            c[i] = arr[i];
        }
        for (int i = index + 1; i < c.length; i++) {
            c[i] = arr[i - 1];
        }
        increaseArraySize();
        arr = c;
        // Print array elements and size after addition
        for (int i = 0; i < arr.length; i++) {
            System.out.print(arr[i] + " ");
        }
        System.out.println();
        System.out.println(num);
    }
    // Remove the element at the first index
    static void removeFirstIndex() {
        Object[] c = new Object[arr.length - 1];
        for (int i = 0; i < c.length; i++) {
            c[i] = arr[i + 1];
        }
        decreaseArraySize();
        arr = c;
        // Print array elements and size after removal
        for (int i = 0; i < arr.length; i++) {
            System.out.print(arr[i] + " ");
        }
        System.out.println();
        System.out.println(num);
    }
    // Remove the element at the last index
    static void removeLastIndex() {
        Object[] c = new Object[arr.length - 1];
        for (int i = 0; i < c.length; i++) {
            c[i] = arr[i];
        }
        decreaseArraySize();
        arr = c;
        // Print array elements and size after removal
        for (int i = 0; i < arr.length; i++) {
            System.out.print(arr[i] + " ");
        }
        System.out.println();
        System.out.println(num);
    }
    // Remove the element at a specific index
    static void removeAtIndex(int index) {
        Object[] c = new Object[arr.length - 1];
        for (int i = 0; i < index; i++) {
            c[i] = arr[i];
        }
        for (int i = index; i < c.length; i++) {
            c[i] = arr[i + 1];
        }
        decreaseArraySize();
        arr = c;
        // Print array elements and size after removal
        for (int i = 0; i < arr.length; i++) {
            System.out.print(arr[i] + " ");
        }
        System.out.println();
        System.out.println(num);
    }
    // Clear the array
    static void clear() {
        Object[] c = new Object[0];
        arr = c;
        num = 0;
        System.out.println();
        System.out.println("Array cleared!");
    }
    // Main method to test the arraylist operations
    public static void main(String[] args) {
        // Adding elements to the arraylist
        addFirst('w');
        addLast('r');
        addAtIndex('t', 2);

        // Removing elements from the arraylist
        removeFirstIndex();
        removeLastIndex();
        removeAtIndex(1);

        // Clearing the arraylist
        clear();
    }
}
//The time complexity for adding an element at the first index (addFirst) and removing an element at the first index (removeFirstIndex) is O(n) because it requires shifting all existing elements to the right or left by one position.
//The time complexity for adding an element at the last index (addLast) and removing an element at the last index (removeLastIndex) is O(1) because it directly operates on the last index.
//The time complexity for adding an element at a specific index (addAtIndex) and removing an element at a specific index (removeAtIndex) is O(n) because it involves shifting elements to create space or fill the gap at the specified index.
//The time complexity for clearing the arraylist (clear) is O(1) because it simply assigns a new empty array and updates the size variable.
