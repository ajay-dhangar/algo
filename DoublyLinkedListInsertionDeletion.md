//class Node {
//    int data;
//    Node prev;
//    Node next;
//
//    public Node(int data) {
//        this.data = data;
//        this.prev = null;
//        this.next = null;
//    }
//}
//
//class DoublyLinkedList {
//    private Node head;
//
//    public DoublyLinkedList() {
//        this.head = null;
//    }
//
//    // Insertion at the head of the list
//    public void insertAtHead(int data) {
//        Node newNode = new Node(data);
//        if (head == null) {
//            head = newNode;
//        } else {
//            newNode.next = head;
//            head.prev = newNode;
//            head = newNode;
//        }
//    }
//
//    // Insertion at the tail of the list
//    public void insertAtTail(int data) {
//        Node newNode = new Node(data);
//        if (head == null) {
//            head = newNode;
//        } else {
//            Node current = head;
//            while (current.next != null) {
//                current = current.next;
//            }
//            current.next = newNode;
//            newNode.prev = current;
//        }
//    }
//
//    // Insertion at an arbitrary position
//    public void insertAtPosition(int data, int position) {
//        if (position <= 0) {
//            System.out.println("Invalid position");
//            return;
//        }
//        if (position == 1) {
//            insertAtHead(data);
//            return;
//        }
//        Node newNode = new Node(data);
//        Node current = head;
//        int count = 1;
//        while (current != null && count < position - 1) {
//            current = current.next;
//            count++;
//        }
//        if (current == null) {
//            System.out.println("Invalid position");
//            return;
//        }
//        newNode.next = current.next;
//        if (current.next != null)
//            current.next.prev = newNode;
//        current.next = newNode;
//        newNode.prev = current;
//    }
//
//    // Deletion by value
//    public void deleteByValue(int value) {
//        if (head == null) {
//            System.out.println("List is empty");
//            return;
//        }
//        if (head.data == value) {
//            head = head.next;
//            if (head != null)
//                head.prev = null;
//            return;
//        }
//        Node current = head;
//        while (current != null && current.data != value) {
//            current = current.next;
//        }
//        if (current == null) {
//            System.out.println("Value not found in the list");
//            return;
//        }
//        if (current.next != null)
//            current.next.prev = current.prev;
//        current.prev.next = current.next;
//    }
//
//    // Display the list
//    public void display() {
//        Node current = head;
//        while (current != null) {
//            System.out.print(current.data + " ");
//            current = current.next;
//        }
//        System.out.println();
//    }
//}
//
//public class DoublyLinkedListInsertionDeletion {
//    public static void main(String[] args) {
//        DoublyLinkedList list = new DoublyLinkedList();
//
//        list.insertAtHead(10);
//        list.insertAtTail(20);
//        list.insertAtPosition(15, 2);
//
//        System.out.print("List: ");
//        list.display();
//
//        list.deleteByValue(20);
//        System.out.print("List after deletion: ");
//        list.display();
//    }
//}
