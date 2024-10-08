```java
public class StackLinkedList {
    public static class Node {
        int data;
        Node next;

        Node(int data) {
            this.data = data;
            this.next = null;
        }
    }

    public static class LinkedListStack {
        Node head = null; // Head of the linked list (top of the stack)
        int size = 0; // Number of elements in the stack

        // Push operation
        public void push(int data) {
            Node newNode = new Node(data); // Create a new node
            newNode.next = head; // Set the new node's next to the current head
            head = newNode; // Update the head to the new node
            size++; // Increment the size
        }

        // Pop operation
        int pop() {
            if (head == null) {
                System.out.println("Stack is Empty");
                return -1;
            }
            int x = head.data; // Store the data of the top node
            head = head.next; // Update the head to the next node
            size--; // Decrement the size
            return x; // Return the popped data
        }

        // Clear the stack
        void erase() {
            head = null; // Set the head to null, effectively clearing the stack
            size = 0; // Reset the size to 0
        }

        // Peek operation (return top element without removing)
        int peek() {
            if (head == null) {
                System.out.println("Stack is Empty");
                return -1;
            }
            return head.data; // Return the data of the top node
        }

        // Return the size of the stack
        int size() {
            return size;
        }

        // Check if the stack is empty
        boolean isEmpty() {
            return size() == 0;
        }

        // Display the stack
        void display() {
            Node current = head; // Start from the head
            while (current != null) {
                System.out.print(current.data + " "); // Print the data of the current node
                current = current.next; // Move to the next node
            }
            System.out.println();
        }
    }

    public static void main(String[] args) {
        LinkedListStack st = new LinkedListStack();

        st.push(4);
        st.display();
        st.push(8);
        st.display();
        int a = st.peek();
        System.out.println(a);
        st.push(20);
        st.display();
        System.out.println(st.size());
        st.pop();
        st.display();
        System.out.println(st.size());
        st.erase();
        st.push(5);
        st.display();
    }
}
