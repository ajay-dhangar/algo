class Node {
   int data;
   Node next;

   public Node(int data) {
       this.data = data;
       this.next = null;
   }
}

class CircularLinkedList {
   private Node head;

   public CircularLinkedList() {
       this.head = null;
   }

   // Insertion into the circular list
   public void insert(int data) {
       Node newNode = new Node(data);
       if (head == null) {
           head = newNode;
           head.next = head;
       } else {
           Node current = head;
           while (current.next != head) {
               current = current.next;
           }
           current.next = newNode;
           newNode.next = head;
       }
   }

   // Deletion by value from the circular list
   public void delete(int value) {
       if (head == null) {
           System.out.println("List is empty");
           return;
       }

       Node current = head;
       Node prev = null;

       // Traverse the list to find the node with the given value
       do {
           if (current.data == value) {
               if (prev != null) {
                   prev.next = current.next;
               }
               // If the head is being deleted, update the head
               if (current == head) {
                   head = head.next;
               }
               return;
           }
           prev = current;
           current = current.next;
       } while (current != head);

       System.out.println("Value not found in the list");
   }

   // Display the circular list
   public void display() {
       if (head == null) {
           System.out.println("List is empty");
           return;
       }

       Node current = head;
       do {
           System.out.print(current.data + " ");
           current = current.next;
       } while (current != head);
       System.out.println();
   }
}

public class CircularLinkedListInsertionDeletion {
   public static void main(String[] args) {
       CircularLinkedList list = new CircularLinkedList();

       // Insert elements into the circular list
       list.insert(10);
       list.insert(20);
       list.insert(30);

       // Display the circular list
       System.out.print("Circular List: ");
       list.display();

       // Delete an element from the circular list
       list.delete(20);
       System.out.print("List after deletion: ");
       list.display();
   }
}
