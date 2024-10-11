// Product of Array Except Self
#include <iostream>
#include <vector>
using namespace std;

// Time Complexity: O(n)
// Space Complexity: O(n)
vector<int> sum(vector<int> &arr)
{
    int n = arr.size();
    vector<int> ans(n, 1); // Initialize ans array with 1's.

    // Calculate prefix products
    for (int i = 1; i < n; i++)
    {
        ans[i] = ans[i - 1] * arr[i - 1]; // ans[i] is the product of all elements before arr[i].
    }

    int suffix = 1; // Initialize suffix product.
    // Calculate suffix products and multiply with prefix products
    for (int i = n - 2; i >= 0; i--)
    {
        suffix *= arr[i + 1]; // Update suffix to be the product of elements after arr[i].
        ans[i] *= suffix;     // Multiply the current ans[i] (prefix product) by the suffix product.
    }
    return ans;
}

// Main Function
int main()
{
    vector<int> arr = {1, 2, 3, 4};
    vector<int> res = sum(arr); // calling function
    for (int val : res)
    {
        cout << val << " ";
    }
    return 0;
}
