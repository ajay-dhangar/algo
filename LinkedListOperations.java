class LinkedList {
    static class Node {
        int data;
        Node next;

        public Node(int data) {
            this.data = data;
            this.next = null;
        }
    }

    Node head;
    int size;

    public LinkedList() {
        this.head = null;
        this.size = 0;
    }

    // Method to add a new element at the beginning of the linked list
    public void addFirst(int data) {
        Node newNode = new Node(data);
        newNode.next = head;
        head = newNode;
        size++;
    }

    // Method to add a new element at the end of the linked list
    public void addLast(int data) {
        Node newNode = new Node(data);
        if (head == null) {
            head = newNode;
        } else {
            Node current = head;
            while (current.next != null) {
                current = current.next;
            }
            current.next = newNode;
        }
        size++;
    }

    // Method to add a new element at a specific position in the linked list
    public void addAtPosition(int data, int position) {
        if (position < 0 || position > size) {
            System.out.println("Invalid position");
            return;
        }
        if (position == 0) {
            addFirst(data);
        } else if (position == size) {
            addLast(data);
        } else {
            Node newNode = new Node(data);
            Node current = head;
            for (int i = 0; i < position - 1; i++) {
                current = current.next;
            }
            newNode.next = current.next;
            current.next = newNode;
            size++;
        }
    }

    // Method to delete an element at a specific position in the linked list
    public void deleteElement(int position) {
        if (position < 0 || position >= size) {
            System.out.println("Invalid position");
            return;
        }
        if (position == 0) {
            head = head.next;
        } else {
            Node current = head;
            for (int i = 0; i < position - 1; i++) {
                current = current.next;
            }
            current.next = current.next.next;
        }
        size--;
    }

    // Method to get the element at a specific position in the linked list
    public int getElementAtPosition(int position) {
        if (position < 0 || position >= size) {
            System.out.println("Invalid position");
            return -1;
        }
        Node current = head;
        for (int i = 0; i < position; i++) {
            current = current.next;
        }
        return current.data;
    }

    // Method to get the position of a given element in the linked list
    public int getPositionOfElement(int data) {
        Node current = head;
        int position = 0;
        while (current != null) {
            if (current.data == data) {
                return position;
            }
            current = current.next;
            position++;
        }
        return -1;
    }

    // Method to get the size of the linked list
    public int getSize() {
        return size;
    }
}

public class LinkedListOperations {
    public static void main(String[] args) {
        LinkedList linkedList = new LinkedList();

        // Adding elements
        linkedList.addFirst(3);
        linkedList.addLast(5);
        linkedList.addAtPosition(4, 1);

        // Printing the linked list
        System.out.print("Linked list: ");
        for (int i = 0; i < linkedList.getSize(); i++) {
            System.out.print(linkedList.getElementAtPosition(i) + " ");
        }
        System.out.println();

        // Deleting an element
        linkedList.deleteElement(1);

        // Getting the position of an element
        int position = linkedList.getPositionOfElement(4);
        if (position != -1) {
            System.out.println("Element 4 is at position: " + position);
        } else {
            System.out.println("Element 4 not found");
        }

        // Getting the size of the linked list
        System.out.println("Size of linked list: " + linkedList.getSize());
    }
}