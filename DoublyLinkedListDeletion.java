//class Node {
//    int data;
//    Node prev;
//    Node next;
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
//    public void deleteAtFirst() {
//        if (head == null) {
//            System.out.println("Empty List");
//            return;
//        }
//        if (head.next == null) {
//            head = null;
//        } else {
//            head = head.next;
//            head.prev = null;
//        }
//    }
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
//    public void deleteAtLast() {
//        if (head == null) {
//            System.out.println("Empty List");
//            return;
//        }
//        if (head.next == null) {
//            head = null;
//        } else {
//            Node current = head;
//            while (current.next.next != null) {
//                current = current.next;
//            }
//            current.next = null;
//        }
//    }
//    public void deleteByIndex(int index) {
//        if (head == null) {
//            System.out.println("Empty List");
//            return;
//        }
//        if (index == 0) {
//            deleteAtFirst();
//            return;
//        }
//        Node current = head;
//        int count = 0;
//        while (current != null && count < index) {
//            current = current.next;
//            count ++;
//        }
//        if (current == null) {
//            System.out.println("Index out of bounds");
//            return;
//        }
//        if (current.next == null) {
//            deleteAtLast();
//            return;
//        }
//        current.prev.next = current.next;
//        current.next.prev = current.prev;
//    }
//    public void printList() {
//        Node current = head;
//        while (current != null) {
//            System.out.print(current.data + " ");
//            current = current.next;
//        }
//        System.out.println();
//    }
//}
//public class DoublyLinkedListDeletion {
//    public static void main(String[] args) {
//        DoublyLinkedList list = new DoublyLinkedList();
//
//        list.insertAtHead(10);
//        list.insertAtHead(30);
//        list.insertAtHead(20);
//        list.insertAtHead(40);
//        list.insertAtHead(50);
//
//        System.out.print("List: ");
//        list.printList();
//
//        list.deleteAtFirst();
//        System.out.print("List after deletion: ");
//        list.printList();
//
//        list.deleteAtLast();
//        System.out.print("List after deletion: ");
//        list.printList();
//
//        list.deleteByIndex(1);
//        System.out.print("List after deletion: ");
//        list.printList();
//
//    }
//}
