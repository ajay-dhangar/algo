```java
import java.util.Arrays;

public class QueueArrayListImplementation {
    static int[] arr = {}; // Initialize an empty array
    static int num = 4; // Initial capacity of the array

    // Method to increase the size of the array
    static void increaseArraySize() {
        int n = arr.length * 2;
        int[] b = new int[n];
        for (int i = 0; i < arr.length; i++) {
            b[i] = arr[i];
        }
        arr = b;
        num++;
    }

    // Method to decrease the size of the array
    static void decreaseArraySize() {
        int n = arr.length - 1;
        int[] b = new int[n];
        for (int i = 0; i < n; i++) {
            b[i] = arr[i];
        }
        arr = b;
        num--;
    }

    // Method to add an element to the queue (enqueue)
    static void push(int x) {
        if (arr.length == num) {
            increaseArraySize();
        }
        arr[num] = x;
        num++;
    }

    // Method to remove an element from the queue (dequeue)
    static void pop() {
        if (num == 0) {
            System.out.println("Queue is empty");
            return;
        }
        for (int i = 0; i < num - 1; i++) {
            arr[i] = arr[i + 1];
        }
        num--;
        decreaseArraySize();
    }

    // Method to display the queue
    static void display() {
        for (int i = 0; i < num; i++) {
            System.out.print(arr[i] + " ");
        }
        System.out.println();
    }

    public static void main(String[] args) {
        push(4);
        display();
        push(8);
        display();
        push(20);
        display();
        pop();
        display();
        push(5);
        display();
    }
}
