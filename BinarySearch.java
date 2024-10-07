public class BinarySearch {

    // Function to perform binary search
    public static int binarySearch(int[] arr, int target) {
        // Initialize left and right pointers
        int left = 0;
        int right = arr.length - 1;

        // Iterate until left pointer is less than or equal to right pointer
        while (left <= right) {
            // Calculate the middle index
            int mid = left + (right - left) / 2;

            // If the target is found at middle index, return the index
            if (arr[mid] == target) {
                return mid;
            }

            // If target is greater, ignore left half
            if (arr[mid] < target) {
                left = mid + 1;
            }
            // If target is smaller, ignore right half
            else {
                right = mid - 1;
            }
        }

        // If target is not found, return -1
        return -1;
    }

    // Main method to test binary search
    public static void main(String[] args) {
        int[] arr = { 2, 5, 8, 12, 16, 23, 38, 56, 72, 91 };
        int target = 23;
        int result = binarySearch(arr, target);
        if (result != -1) {
            System.out.println("Element found at index: " + result);
        } else {
            System.out.println("Element not found in the array.");
        }
    }
}
