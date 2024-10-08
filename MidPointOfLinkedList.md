class ll {
    private Node head;

    class Node {
        String data;
        Node next;

        Node(String data) {
            this.data = data;
            this.next = null;
        }
    }

    public void addFirst(String data) {
        Node newNode = new Node(data);
        if (head == null) {
            head = newNode;
            return;
        }
        newNode.next = head;
        head = newNode;
    }
    public Node findMiddle() {
        if (head == null) {
            return null; // Empty list
        }

        Node slowPtr = head;
        Node fastPtr = head.next;

        while (fastPtr != null && fastPtr.next != null) {
            slowPtr = slowPtr.next;
            fastPtr = fastPtr.next.next;
        }

        return slowPtr;
    }


    public void printList() {
        if (head == null) {
            System.out.println("empty list");
            return;
        }
        Node currNode = head;
        while (currNode != null) {
            System.out.print(currNode.data + "-->");
            currNode = currNode.next;
        }
        System.out.println("{null}");
    }

    public static void main(String[] args) {
        ll list = new ll();
        list.addFirst("Anuj Saha");
        list.addFirst(" am ");
        list.addFirst("I ");
        list.addFirst("ha");
        list.addFirst("hi");
        list.printList();
        Node middleNode = list.findMiddle();
        System.out.println("Middle node: " + middleNode.data);

    }
}
