public class LinearSearch {

    public static int linearSearch(int[] arr, int target) {
        // Iterate through each element in the array
        for (int i = 0; i < arr.length; i++) {
            // Check if the current element matches the target
            if (arr[i] == target) {
                return i; // Return the index if found
            
        }
        return -1; // Return -1 if the target is not found
    }

    public static void main(String[] args) {
        // Example array
        int[] numbers = {5, 3, 8, 4, 2};
        int target = 4; // The value we want to find

        // Call the linear search function
        int result = linearSearch(numbers, target);

        // Output the result
        if (result != -1) {
            System.out.println("Element found at index: " + result);
        } else {
            System.out.println("Element not found in the array.");
        }
    }
}
