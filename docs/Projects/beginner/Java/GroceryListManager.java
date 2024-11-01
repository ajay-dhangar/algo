import java.util.ArrayList;
import java.util.Scanner;

public class GroceryListManager {
    private static ArrayList<String> groceryList = new ArrayList<>();
    private static Scanner scanner = new Scanner(System.in);

    public static void main(String[] args) {
        boolean quit = false;
        while (!quit) {
            System.out.println("\nGrocery List Manager Options:");
            System.out.println("1. Print Grocery List");
            System.out.println("2. Add Item");
            System.out.println("3. Modify Item");
            System.out.println("4. Remove Item");
            System.out.println("5. Search for Item");
            System.out.println("6. Quit");
            System.out.print("Choose an option (1-6): ");
            int choice = scanner.nextInt();
            scanner.nextLine(); // Clear the buffer

            switch (choice) {
                case 1:
                    printGroceryList();
                    break;
                case 2:
                    addItem();
                    break;
                case 3:
                    modifyItem();
                    break;
                case 4:
                    removeItem();
                    break;
                case 5:
                    searchItem();
                    break;
                case 6:
                    quit = true;
                    System.out.println("Exiting Grocery List Manager.");
                    break;
                default:
                    System.out.println("Invalid choice. Please choose again.");
            }
        }
    }

    public static void printGroceryList() {
        System.out.println("\nGrocery List:");
        if (groceryList.isEmpty()) {
            System.out.println("No items in the grocery list.");
        } else {
            for (int i = 0; i < groceryList.size(); i++) {
                System.out.println((i + 1) + ". " + groceryList.get(i));
            }
        }
    }

    public static void addItem() {
        System.out.print("Enter item to add: ");
        String item = scanner.nextLine();
        groceryList.add(item);
        System.out.println(item + " has been added to the list.");
    }

    public static void modifyItem() {
        System.out.print("Enter item number to modify: ");
        int itemNo = scanner.nextInt();
        scanner.nextLine(); // Clear the buffer

        if (itemNo > 0 && itemNo <= groceryList.size()) {
            System.out.print("Enter new item: ");
            String newItem = scanner.nextLine();
            groceryList.set(itemNo - 1, newItem);
            System.out.println("Item " + itemNo + " has been modified.");
        } else {
            System.out.println("Invalid item number.");
        }
    }

    public static void removeItem() {
        System.out.print("Enter item number to remove: ");
        int itemNo = scanner.nextInt();
        scanner.nextLine(); // Clear the buffer

        if (itemNo > 0 && itemNo <= groceryList.size()) {
            String removedItem = groceryList.remove(itemNo - 1);
            System.out.println(removedItem + " has been removed from the list.");
        } else {
            System.out.println("Invalid item number.");
        }
    }

    public static void searchItem() {
        System.out.print("Enter item to search: ");
        String searchItem = scanner.nextLine();

        if (groceryList.contains(searchItem)) {
            System.out.println(searchItem + " is in the grocery list.");
        } else {
            System.out.println(searchItem + " is not in the grocery list.");
        }
    }
}
