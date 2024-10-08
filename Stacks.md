```java
import java.util.*;

public class Stacks {
    public static void display(Stack<Integer> s) {
        // This method is not implemented in this code example.
        // You would need to implement the logic to display the stack elements.
        // One way to do this is to iterate through the stack and print each element.
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in); // Create a Scanner object to read input
        Stack<Integer> st = new Stack<>(); // Create a Stack object

        // Push elements onto the stack
        st.push(1);
        st.push(2);
        st.push(3);
        st.push(4);
        st.push(5);

        System.out.println(); // Print an empty line

        // Pop an element from the stack
        st.pop();

        System.out.println(st); // Print the stack: [1, 2, 3, 4]

        // Reverse the stack elements
        int n = st.size(); // Get the size of the stack
        int[] arr = new int[n]; // Create an array to store the elements
        for (int i = n - 1; i >= 0; i--) { // Pop elements from the stack and store them in the array in reverse order
            arr[i] = st.pop();
        }
        for (int i = 0; i < n; i++) { // Push the elements back onto the stack in the original order
            System.out.print(arr[i] + " "); // Print the elements
            st.push(arr[i]);
        }

        // Reversing the stack using two stacks
        Stack<Integer> rt = new Stack<>(); // Create a temporary stack
        while (st.size() > 0) { // Pop elements from st and push them onto rt
            rt.push(st.pop());
        }
        while (rt.size() > 0) { // Pop elements from rt and push them back onto st
            int x = rt.pop();
            System.out.print(x + " ");
            st.push(x);
        }
        System.out.println(st); // Print the reversed stack

        // Taking input from the user
        System.out.println("Enter the number of elements : - ");
        n = sc.nextInt(); // Read the number of elements
        System.out.println("Enter the elements : ");
        for (int i = 1; i <= n; i++) { // Read elements from the user and push them onto the stack
            int x = sc.nextInt();
            st.push(x);
        }
        System.out.println(st); // Print the stack

        // Inserting an element at a specific index
        int idx = 2; // Index at which to insert
        int x = 7; // Element to insert
        Stack<Integer> temp = new Stack<>(); // Create a temporary stack
        while (st.size() > idx) { // Pop elements from st and push them onto temp until the index is reached
            temp.push(st.pop());
        }
        st.push(x); // Push the new element onto st
        while (temp.size() > 0) { // Push elements back from temp onto st
            st.push(temp.pop());
        }
        System.out.println(st); // Print the updated stack

        // Removing element at specific index
        rt = new Stack<>(); // Create a temporary stack
        while (st.size() > idx) { // Pop elements from st and push them onto rt until the index is reached
            rt.push(st.pop());
        }
        st.pop(); // Remove the element at the specific index
        while (rt.size() > 0) { // Push elements back from rt onto st
            st.push(rt.pop());
        }
        System.out.println(st); // Print the updated stack

        // Peek at the top element
        st.push(1);
        st.push(15);
        st.push(25);
        st.push(50);
        System.out.println(st.peek()); // Print the top element: 50
        System.out.println(st); // Print the stack: [1, 15, 25, 50]

        // Pop the top element
        st.pop();
        System.out.println(st); // Print the stack: [1, 15, 25]

        // Get the size of the stack
        System.out.println("Size is : " + st.size()); // Print the size: 3

        // Pop elements until the stack size is 2
        while (st.size() > 2) {
            st.pop();
        }
        System.out.println(st.peek()); // Print the top element: 15
    }
}
