//import java.util.Arrays;
//
//public class ImplementArrayList {
//    static char[] arr = {'A', 'N', 'U', 'J'}; // Change to char[] instead of Object[]
//    static int num = 4;
//    static void increaseArraySize() {
//        int n = arr.length * 2;
//        char[] b = new char[n]; // Change to char[] instead of Object[]
//        for (int i = 0; i < arr.length; i++) {
//            b[i] = arr[i];
//        }
//        arr = b;
//        num++;
//    }
//    static void decreaseArraySize() {
//        int n = arr.length - 1;
//        char[] b = new char[n]; // Change to char[] instead of Object[]
//        for (int i = 0; i < n; i++) {
//            b[i] = arr[i];
//        }
//        arr = b;
//        num--;
//    }
//    static void addFirst(char x) {
//        char[] c = new char[arr.length + 1]; // Change to char[] instead of Object[]
//        c[0] = x;
//        for (int i = 1; i < c.length; i++) {
//            c[i] = arr[i - 1];
//        }
//        increaseArraySize();
//        arr = c;
//        printArray();
//    }
//    static void addLast(char x) {
//        char[] c = new char[arr.length + 1]; // Change to char[] instead of Object[]
//        for (int i = 0; i < arr.length; i++) {
//            c[i] = arr[i];
//        }
//        c[arr.length] = x;
//        increaseArraySize();
//        arr = c;
//        printArray();
//    }
//    static void addAtIndex(char x, int index) {
//        char[] c = new char[arr.length + 1]; // Change to char[] instead of Object[]
//        c[index] = x;
//        for (int i = 0; i < index; i++) {
//            c[i] = arr[i];
//        }
//        for (int i = index + 1; i < c.length; i++) {
//            c[i] = arr[i - 1];
//        }
//        increaseArraySize();
//        arr = c;
//        printArray();
//    }
//    static void removeFirstIndex() {
//        char[] c = new char[arr.length - 1]; // Change to char[] instead of Object[]
//        for (int i = 0; i < c.length; i++) {
//            c[i] = arr[i + 1];
//        }
//        decreaseArraySize();
//        arr = c;
//        printArray();
//    }
//    static void removeLastIndex() {
//        char[] c = new char[arr.length - 1]; // Change to char[] instead of Object[]
//        for (int i = 0; i < c.length; i++) {
//            c[i] = arr[i];
//        }
//        decreaseArraySize();
//        arr = c;
//        printArray();
//    }
//    static void removeIndex(int index) {
//        char[] c = new char[arr.length - 1]; // Change to char[] instead of Object[]
//        for (int i = 0; i < index; i++) {
//            c[i] = arr[i];
//        }
//        for (int i = index; i < c.length; i++) {
//            c[i] = arr[i + 1];
//        }
//        decreaseArraySize();
//        arr = c;
//        printArray();
//    }
//    static void clear() {
//        arr = new char[0]; // Change to char[] instead of Object[]
//        num = 0;
//        System.out.println();
//        System.out.println("Array cleared!");
//    }
//    static void printArray() {
//        for (int i = 0; i < arr.length; i++) {
//            System.out.print(arr[i] + " ");
//        }
//        System.out.println();
//        System.out.println(num);
//    }
//    public static void main(String[] args) {
//        addFirst('w');
//
//        addLast('r');
//        addAtIndex('t', 2);
//        System.out.println();
//        removeFirstIndex();
//        System.out.println();
//        removeLastIndex();
//        System.out.println();
//        removeIndex(1);
//        clear();
//    }
//}
////The time complexity for adding or removing elements from the start, end, or at a specific index is O(n) because it requires copying elements to a new array, where n is the number of elements in the array.
////The time complexity for clearing the array is O(1) because it only involves resetting the array reference and the number of elements.