```java
import java.util.*;

public class QueueStack {
    public static class Node {
        int data;
        Node next;

        Node(int data) {
            this.data = data;
            this.next = null;
        }
    }

    public static class StackLinked {
        Node head = null;
        int size = 0;

        public void push(int data) {
            Node newNode = new Node(data);
            newNode.next = head;
            head = newNode;
            size++;
        }

        int pop() {
            if (head == null) {
                System.out.println("Stack is Empty");
                return -1;
            }
            int x = head.data;
            head = head.next;
            size--;
            return x;
        }

        int peek() {
            if (head == null) {
                System.out.println("Stack is Empty");
                return -1;
            }
            return head.data;
        }

        int size() {
            return size;
        }

        boolean isEmpty() {
            return size() == 0;
        }
    }

    public static void main(String[] args) {
        StackLinked s1 = new StackLinked(); // Stack for input
        StackLinked s2 = new StackLinked(); // Stack for output (queue)

        // Push elements onto the input stack (s1)
        s1.push(5);
        s1.push(10);
        s1.push(20);
        s1.push(50);
        s1.push(100);

        // Reverse the elements using two stacks
        while (!s1.isEmpty()) {
            s2.push(s1.peek()); // Push top of s1 onto s2
            s1.pop(); // Remove top element from s1
        }

        // Print the elements in queue order
        System.out.print("Queue: ");
        while (!s2.isEmpty()) {
            System.out.print(s2.peek() + " "); // Peek at the top of s2
            s2.pop(); // Remove top element from s2
        }
    }
}
