// class Node {
//    int data;
//    Node next;

//    public Node(int data) {
//        this.data = data;
//        this.next = null;
//    }
// }

// class CircularLinkedList {
//    private Node head;

//    public CircularLinkedList() {
//        this.head = null;
//    }

//    // Insertion into the circular list
//    public void insertAtIndex(int data, int index) {
//        Node newNode = new Node(data);
//        if (head == null) {
//            head = newNode;
//            head.next = head;
//            return;
//        }
//        if (index == 0) {
//            newNode.next = head.next;
//            head.next = newNode;
//            int temp = head.data;
//            head.data = newNode.data;
//            newNode.data = temp;
//            return;
//        }
//        Node current = head;
//        int count = 0;
//        while (current.next != head && count < index - 1) {
//            current = current.next;
//            count++;
//        }
//        newNode.next = current.next;
//        current.next = newNode;
//    }

//    // Deletion by value from the circular list
//    public void deleteAtIndex(int index) {
//        if (head == null) {
//            System.out.println("List is empty");
//            return;
//        }
//        if (index == 0) {
//            if (head.next == head) {
//                head = null;
//            } else {
//                Node last = head.next;
//                while (last.next != head) {
//                    last = last.next;
//                }
//                last.next = head.next;
//                head = head.next;
//            }
//            return;
//        }
//        Node current = head;
//        int count = 0;
//        while (current.next != head && count < index - 1) {
//            current = current.next;
//            count++;
//        }
//        if (current.next == head) {
//            System.out.println("Index out of bounds");
//            return;
//        }
//        current.next = current.next.next;
//    }

//    // Display the circular list
//    public void printList() {
//        if (head == null) {
//            System.out.println("List is empty");
//            return;
//        }

//        Node current = head;
//        do {
//            System.out.print(current.data + " ");
//            current = current.next;
//        } while (current != head);
//        System.out.println();
//    }
// }

// public class CircularLinkedListInsertionDeletionAtAnyIndex {
//    public static void main(String[] args) {
//        CircularLinkedList list = new CircularLinkedList();

//        // Insert elements into the circular list
//        list.insertAtIndex(10, 1);
//        list.insertAtIndex(20, 3);
//        list.insertAtIndex(30, 2);

//        // Display the circular list
//        System.out.print("Circular List: ");
//        list.printList();

//        // Delete an element from the circular list
//        list.deleteAtIndex(2);
//        System.out.print("List after deletion: ");
//        list.printList();
//    }
// }
