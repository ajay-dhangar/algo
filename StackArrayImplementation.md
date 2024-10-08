```java
import java.util.Stack;

public class StackArrayImplementation {
    public static class Stack {
        private int[] arr = new int[5]; // Fixed-size array for stack
        private int idx = 0; // Index of the top element

        // Push operation
        void push(int x) {
            if (isFull()) {
                System.out.println("Stack is Full");
                return;
            }
            arr[idx] = x; // Add element at the current index
            idx++; // Increment the index to point to the next available position
        }

        // Peek operation (return top element without removing)
        int peek() {
            if (idx == 0) {
                System.out.println("STACK IS EMPTY");
                return -1;
            }
            return arr[idx - 1]; // Return the element at the top of the stack
        }

        // Pop operation (remove and return top element)
        int pop() {
            if (idx == 0) {
                System.out.println("Stack is Empty");
                return -1;
            }
            int top = arr[idx - 1]; // Store the top element
            arr[idx - 1] = 0; // Clear the top element (optional, for clarity)
            idx--; // Decrement the index to point to the new top element
            return top; // Return the removed element
        }

        // Display the stack
        void display() {
            for (int i = 0; i <= idx - 1; i++) {
                System.out.print(arr[i] + " ");
            }
            System.out.println();
        }

        // Return the size of the stack
        int size() {
            return idx;
        }

        // Check if the stack is empty
        boolean isEmpty() {
            return size() == 0;
        }

        // Check if the stack is full
        boolean isFull() {
            return idx == arr.length;
        }
    }

    public static void main(String[] args) {
        Stack st = new Stack(); // Create a Stack object

        st.push(4);
        st.display();
        st.push(8);
        st.display();
        st.push(20);
        st.display();
        System.out.println(st.size());
        st.pop();
        st.display();
        System.out.println(st.size());
        st.push(7);
        st.push(10);
        System.out.println(st.isFull());
    }
}
