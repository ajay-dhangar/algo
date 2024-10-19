---
id: gfg-solutions
sidebar_position: 3
title: GFG Solutions
sidebar_label: GFG Solutions
description: "This document contains solutions to GFG DSA problems."
tags: [GFG, algorithms, problem-solving, DSA, data structure]
---

# GFG Solutions

## Questions
1. [Sum of Series](#1-sum-of-series)  
2. [Mirror Tree](#2-mirror-tree)  
3. [Middle of a Linked List](#3-middle-of-a-linked-list)  
4. [Multiply two Linked Lists](#4-multiply-two-linked-lists)  
5. [Roof Top](#5-roof-top)
6. [Reverse Words](#6-reverse-words)
7. [Parenthesis Checker](#7-parenthesis-checker)
8. [Minimum Cost of Ropes](#8-minimum-cost-of-ropes)
9. [Alternate positive and negative numbers](#9-alternate-positive-and-negative-numbers)
10. [Facing the sun](#10-facing-the-sun)
11. [Total Count](#11-total-count)
12. [Array to BST](#12-array-to-bst)
13. [Palindrome Linked List](#13-palindrome-linked-list)
14. [Merge two BST's](#14-merge-two-bsts)
15. [Deletion and Reverse in Circular Linked List](#15-deletion-and-reverse-in-circular-linked-list)
16. [Rotate and Delete](#16-rotate-and-delete)
17. [K Sized Subarray Maximum](#17-k-sized-subarray-maximum)
18. [Missing and Repeating](#18-missing-and-repeating)
19. [Form a Palindrome](#19-form-a-palindrome)
20. [Minimize the Heights ||](#20-minimize-the-heights-)
21. [Majority Element ||](#21-majority-element-)
22. [Minimal Cost](#22-minimal-cost)
23. [Binary Tree to DLL](#23-binary-tree-to-dll)
24. [Clone a linked list with next and random pointer](#24-clone-a-linked-list-with-next-and-random-pointer)
25. [Smallest window in a string containing all the characters of another string](#25-smallest-window-in-a-string-containing-all-the-characters-of-another-string)
26. [Longest Prefix Suffix](#26-longest-prefix-suffix)
27. [Longest Valid Parenthesis](#27-longest-valid-parenthesis)

---

## 1. Sum Of Series
**Description:** Write a program to find the sum of the given series 1+2+3+ . . . . . . (n terms) 
```cpp code:

class Solution {
  public:
    long long seriesSum(int n) {
        // code here
        long long sum = static_cast<long long>(n)*(n+1)/2;
        return sum;
    }
};
```

## 2. Mirror Tree
**Description:** Given a Binary Tree, convert it into its mirror.
```cpp code:
class Solution {
  public:
    // Function to convert a binary tree into its mirror tree.
    void mirror(Node* node) {
        // code here
        
        // Return when leaf node is encountered
        if(node->left == NULL && node->right == NULL){
            return;
        }
        
        // Swap the left and right pointers for a non-leaf node
        if(node->left != NULL && node->right != NULL){
            Node* temp = node->left;
            node->left = node->right;
            node->right = temp;
        }
        
        // If one child is NULL, interchange their positions making the (non-null -> null) and (null -> non-null)
        if (node->left == NULL && node->right != NULL){
            node->left = node->right;
            node->right = NULL;
        }
        else if (node->right == NULL && node->left != NULL){
            node->right = node->left;
            node->left = NULL;
        }
        
        // Recursively call the mirror() function for the non-null child
        if (node->left != NULL){
            mirror(node->left);
        }
        if (node->right != NULL){
            mirror(node->right);
        }
    }
};
```

## 3. Middle of a Linked List
**Description:** Given the head of a linked list, the task is to find the middle. For example, the middle of 1-> 2->3->4->5 is 3. If there are two middle nodes (even count), return the second middle. For example, middle of 1->2->3->4->5->6 is 4.
```cpp code:
class Solution {
  public:
    /* Should return data of middle node. If linked list is empty, then -1 */
    int getMiddle(Node* head) {
        // code here
        Node* temp = head;
        int size = 0;
        while(temp != NULL){
            size++;
            temp = temp->next;
        }
        
        int mid = (size/2);
        temp = head;
        while(mid != 0){
            mid--;
            temp = temp->next;
        }
        
        return temp->data;
    }
};
```  

## 4. Multiply two Linked Lists
**Description:** Given elements as nodes of the two singly linked lists. The task is to multiply these two linked lists, say L1 and L2. Note: The output could be large take modulo 10^9+7.
```cpp code:
#define MOD 1000000007
class solution {
  public:
    long long multiplyTwoLists(Node *first, Node *second) {
        // code here
        
        long long num1=0, num2=0;
        
        Node* temp = first;
        while(temp != nullptr){
            num1 = (num1*10 + temp->data)%MOD;
            temp = temp->next;
        }
        
        temp = second;
        while(temp != nullptr){
            num2 = (num2*10 + temp->data)%MOD;
            temp = temp->next;
        }
        
        
        return (num1*num2)%MOD;
    }
};
```

## 5. Roof Top
**Description:** You are given the heights of consecutive buildings. You can move from the roof of a building to the roof of the next adjacent building. You need to find the maximum number of consecutive steps you can put forward such that you gain an increase in altitude with each step.
```cpp code:

class Solution {
  public:
    // Function to find maximum number of consecutive steps
    // to gain an increase in altitude with each step.
    int maxStep(vector<int>& arr) {
        // Your code here
        int count = 0, result = 0;
        
        for(int i=1; i<arr.size(); i++){
            if(arr[i] > arr[i-1]){
                count++;
                result = max(result, count);
            }
            else
                count = 0;
        }
        
        return result;
    }
};
```

## 6. Reverse Words
**Description:** Given a String str, reverse the string without reversing its individual words. Words are separated by dots. Note: The last character has not been '.'.
```cpp code:

class Solution {
  public:
    // Function to reverse words in a given string.
    string reverseWords(string str) {
        // code here
        string result = "", word="";
        for(int i=0; i<str.size(); i++){
            word += str[i];
            if (str[i+1] == '.'){
                result = "." + word + result;
                word = ""; i++;
            }
            if(i == str.size()-1){
                result = word + result;
            }
        }
        
        return result;
    }
};
```

## 7. Parenthesis Checker
**Description:** Given an expression string x. Examine whether the pairs and the orders of {,},(,),[,] are correct in exp. For example, the function should return 'true' for exp = [()]{}{[()()]()} and 'false' for exp = [(]). Note: The driver code prints "balanced" if function return true, otherwise it prints "not balanced".
```cpp code:

class Solution
{
    public:
    //Function to check if brackets are balanced or not.
    bool ispar(string x)
    {
        if ((x.size() == 1) || (x.size() % 2 != 0))
            return false;
            
        if ((x[0] == ')') || (x[0] == ']') || (x[0] == '}'))
            return false;
        
        stack<char> s;
        
        for(int i = 0; i<x.size(); i++){
            if ((x[i] == '(') || x[i] == '{' || x[i] == '[')
                s.push(x[i]);
            else{
                if(x[i] == ')'){
                    if (!s.empty() && s.top() == '('){
                        s.pop();
                        continue;
                    }
                    else
                        return false;
                }
                    
                if(x[i] == '}'){
                    if (!s.empty() && s.top() == '{'){
                        s.pop();
                        continue;
                    }
                    else
                        return false;
                }
                
                if(x[i] == ']'){
                    if (!s.empty() && s.top() == '['){
                        s.pop();
                        continue;
                    }
                    else
                        return false;
                }
            }
        }
        
        if(s.empty())
            return true;
            
        return false;
    }

};
```

## 8. Minimum Cost of Ropes
**Description:** Given an array arr containing the lengths of the different ropes, we need to connect these ropes to form one rope. The cost to connect two ropes is equal to sum of their lengths. The task is to connect the ropes with minimum cost.
```cpp code:
class Solution {
  public:
    // Function to return the minimum cost of connecting the ropes.
    
    long long minCost(vector<long long>& arr) {
        // Your code here
        // Min-heap to store the ropes
    priority_queue<long long, vector<long long>, greater<long long>> minHeap(arr.begin(), arr.end());
    
    long long totalCost = 0;

    // Keep combining the ropes until only one remains
    while (minHeap.size() > 1) {
        // Extract the two smallest ropes
        long long first = minHeap.top();
        minHeap.pop();
        long long second = minHeap.top();
        minHeap.pop();

        // Cost to combine these two ropes
        long long cost = first + second;
        totalCost += cost;

        // Push the combined rope back into the heap
        minHeap.push(cost);
    }

    return totalCost;
    }
};
```

## 9. Alternate positive and negative numbers
**Description:** Given an unsorted array arr containing both positive and negative numbers. Your task is to rearrange the array and convert it into an array of alternate positive and negative numbers without changing the relative order.
Note:
- Resulting array should start with a positive integer (0 will also be considered as a positive integer).
- If any of the positive or negative integers are exhausted, then add the remaining integers in the answer as it is by maintaining the relative order.
- The array may or may not have equal number of positive and negative integers.
```cpp code:
// User function template for C++
class Solution {
  public:

    void rearrange(vector<int> &arr) {
        // code here
        vector<int> positive, negative;
        int i;
        for(i=0; i<arr.size(); i++){
            if(arr[i] == abs(arr[i]))
                positive.push_back(arr[i]);
            else
                negative.push_back(arr[i]);
        }
        
        i=0;
        int j=0;
        while(i<positive.size() && i<negative.size()){
            arr[j] = positive[i];
            arr[++j] = negative[i];
            i++; j++;
        }
        
        while(i<positive.size()){
            arr[j++] = positive[i];
            i++;
        }
        
        while(i<negative.size()){
            arr[j++] = negative[i];
            i++;
        }
        
        
    }
};
```

## 10. Facing the sun
**Description:** Given an array height representing the heights of buildings. You have to count the buildings that will see the sunrise (Assume the sun rises on the side of the array starting point). Note: The height of the building should be strictly greater than the height of the buildings left in order to see the sun.
```cpp code:
// User function template for C++
class Solution {
  public:
    // Returns count buildings that can see sunlight
    int countBuildings(vector<int> &height) {
        // code here
        int max = height[0], c= 1;
        
        for(int i = 1; i < height.size(); i++){
            if (height[i] > max){
                c++;
                max = height[i];
            }
        }
        
        return c;
    }
};
```

## 11. Total Count
**Description:** You are given an array arr[] of positive integers and a threshold value k. For each element in the array, divide it into the minimum number of small integers such that each divided integer is less than or equal to k. Compute the total number of these integer across all elements of the array.
```cpp code:
// User function template for C++

class Solution {
  public:
    int totalCount(int k, vector<int>& arr) {
        // code here
        int result = 0;
        for(int i:arr){
            result += (i/k);
            if(i%k != 0)
                result++;
        }
        
        return result;
    }
};
```

## 12. Array to BST
**Description:** Given a sorted array. Convert it into a Height Balanced Binary Search Tree (BST). Return the root of the BST.

Height-balanced BST means a binary tree in which the depth of the left subtree and the right subtree of every node never differ by more than 1.

Note: The driver code will check the BST, if it is a Height-balanced BST, the output will be true otherwise the output will be false.
```cpp code:
class Solution {
public:
    Node* sortedArrayToBST(vector<int>& nums) {
        return convert(nums, 0, nums.size() - 1);
    }

private:
    Node* convert(const vector<int>& nums, int left, int right) {
        if (left > right) {
            return nullptr;
        }

        int mid = left + (right - left) / 2;
        Node* node = new Node(nums[mid]);
        node->left = convert(nums, left, mid - 1);
        node->right = convert(nums, mid + 1, right);
        return node;
    }
};
```

## 13. Palindrome Linked List
**Description:** Given a singly linked list of integers. The task is to check if the given linked list is palindrome or not.
```cpp code:
class Solution {
  public:
    Node* reversalList(Node* head){
        Node* pre = NULL;
        Node* next = NULL;
        
        while(head != NULL){
            next = head->next;
            head->next = pre;
            pre = head;
            head = next;
        }
        return pre;
    }
    // Function to check whether the list is palindrome.
    bool isPalindrome(Node *head) {
        if(head == nullptr || head->next == nullptr)
            return true;
            
        Node* slow = head;
        Node* fast = head;
        
        // Find middle element
        while(fast->next != nullptr && fast->next->next != nullptr){
            slow = slow->next;
            fast = fast->next->next;
        }
        
        slow->next = reversalList(slow->next);
        slow = slow->next;
        
        while(slow != nullptr){
            if(head->data != slow->data)
                return false;
            
            head = head->next;
            slow = slow->next;
        }
        return true;
    }
};
```

## 14. Merge two BST's
**Description:** Given two BSTs, return elements of merged BSTs in sorted form.
```cpp code:
class Solution {
  public:
    // Function to return a list of integers denoting the node
    // values of both the BST in a sorted order.
    
    void leftIterator(Node* root, stack<Node*>& s){
        Node* temp = root;
        while(temp != nullptr){
            s.push(temp);
            temp = temp->left;
        }
    }
    
    vector<int> merge(Node *root1, Node *root2) {
        // Your code here
        stack<Node*> s1, s2;
        
        vector<int> result;
        
        leftIterator(root1, s1);
        leftIterator(root2, s2);
        
    
        while(!s1.empty() && !s2.empty()){
            if(s1.top()->data <= s2.top()->data){
                Node* current = s1.top();
                result.push_back(current->data);
                s1.pop();
                leftIterator(current->right, s1);
            }
            else{
                Node* current = s2.top();
                result.push_back(current->data);
                s2.pop();
                leftIterator(current->right, s2);
            }
        }
        
        while(!s1.empty()){
            Node* current = s1.top();
            result.push_back(current->data);
            s1.pop();
            leftIterator(current->right, s1);
        }
        
        while(!s2.empty()){
            Node* current = s2.top();
            result.push_back(current->data);
            s2.pop();
            leftIterator(current->right, s2);
        }
        
        return result;
    }
};
```

## 15. Deletion and Reverse in Circular Linked List
**Description:** Given a Circular Linked List. The task is to delete the given node, key in the circular linked list, and reverse the circular linked list.

Note:

1. You don't have to print anything, just return the head of the modified list in each function.
2. Nodes may consist of Duplicate values.
3. The key may or may not be present.
```cpp code:
class Solution {
  public:
    // Function to reverse a circular linked list
    Node* reverse(Node* head) {
    // If the list is empty or contains only one node, no need to reverse
    if (head == NULL || head->next == head) {
        return head;
    }
    
    Node* prev = NULL;
    Node* current = head;
    Node* next = NULL;

    // This loop will reverse the links of the circular linked list
    do {
        next = current->next;  // Store next node
        current->next = prev;   // Reverse the link
        prev = current;         // Move prev to current
        current = next;         // Move current to next
    } while (current != head);  // Stop when we complete the full circle

    // At this point, current is at the head node
    // head should now point to the last node
    head->next = prev;
    head = prev;  // Update the head to be the new first node

    return head;
}


    // Function to delete a node from the circular linked list
    Node* deleteNode(Node* head, int key) {
        // code here
        Node* temp = head;
        Node* prev;
        // Search for the element
        while(temp->next != head && temp->data != key){
            prev = temp;
            temp = temp->next;
        }
        
        // Element found
        if(temp->data == key){
            if(temp == head){
                Node* itr = head;
                while(itr->next != head){
                    itr = itr->next;
                }
                itr->next = head->next;
                head = itr->next;
            }
            else{
                prev->next = temp->next;
            }
            delete temp;
        }
        // 1 2 3
        
        return head;
        
    }
};
```

## 16. Rotate and Delete
**Description:** Given an array arr integers. Assume sz to be the initial size of the array. Do the following operations exactly sz/2 times. In every kth (1<= k <= sz/2) operation:

- Right-rotate the array clockwise by 1.
- Delete the (n– k + 1)th element from begin.
Now, Return the first element of the array.
Note: Here n keeps on decreasing with every operation.
```cpp code:
class Solution {
  public:
    int rotateDelete(vector<int> &arr) {
        // Your code here
        int n = arr.size();
        int k = 1;
        while(n > 1){
            arr.insert(arr.begin(), arr.back());
            arr.pop_back();
            
            if (k > n){
                arr.erase(arr.begin());
            }
            else{
                arr.erase(arr.end()-k);
            }
            k++; n--;
        }
        
        return arr[0];
    }
};
```

## 17. K Sized Subarray Maximum
**Description:** Given an array arr[] and an integer k. Find the maximum for each and every contiguous subarray of size k.
```cpp code:
// User function template for C++

class Solution {
public:
    vector<int> max_of_subarrays(int k, vector<int>& arr) {
        deque<int> dq;
        vector<int> result;
        int n = arr.size();

        // Traverse the array
        for (int i = 0; i < n; ++i) {
            // Remove elements that are out of this window
            if (!dq.empty() && dq.front() == i - k) {
                dq.pop_front();
            }

            // Remove elements that are smaller than the current element
            // because they are not useful anymore
            while (!dq.empty() && arr[dq.back()] <= arr[i]) {
                dq.pop_back();
            }

            // Add current element at the back of the deque
            dq.push_back(i);

            // The front of the deque is the largest element of the current window
            if (i >= k - 1) {
                result.push_back(arr[dq.front()]);
            }
        }

        return result;
    }
};
```

## 18. Missing and Repeating
**Description:** Given an unsorted array arr of positive integers. One number a from the set [1, 2,....,n] is missing and one number b occurs twice in the array. Find numbers a and b.

Note: The test cases are generated such that there always exists one missing and one repeating number within the range [1,n].
```cpp code:
class Solution {
  public:
    vector<int> findTwoElement(vector<int>& arr) {
        // code here
        sort(arr.begin(), arr.end());
        
        // Loop for missing and repeating
        int repeating=-1, missing = 1;
        
        for(int i=0; i<arr.size()-1; i++){
            if(arr[i] == arr[i+1]){
                repeating = arr[i];
                break;
            }
        }
        
        if(repeating == -1)
            repeating = arr[arr.size()-1];
        
        for(int i=0; i<arr.size(); i++){
            if(arr[i] == missing)
                missing++;
            if(arr[i] > missing)
                break;
        }
        
        // if(missing = arr[arr.size()-1])
            // missing = arr[arr.size()-1]+1;
        
        vector<int> result;
        
        result.push_back(repeating);
        result.push_back(missing);
        
        return result;
    }
};
```

## 19. Form a Palindrome
**Description:** Given a string, find the minimum number of characters to be inserted to convert it to a palindrome.
```cpp code:
//User function template for C++

class Solution{
  public:
    int countMin(string str){
        int n = str.length();
        
        // Create a table to store results of subproblems
        vector<vector<int>> dp(n, vector<int>(n, 0));

        // Strings of length 1 are palindromic of length 1
        for (int i = 0; i < n; ++i) {
            dp[i][i] = 1;
        }

        // Build the table. cl is the length of the substring.
        for (int cl = 2; cl <= n; ++cl) {
            for (int i = 0; i < n - cl + 1; ++i) {
                int j = i + cl - 1;
                if (str[i] == str[j] && cl == 2) {
                    dp[i][j] = 2;
                } else if (str[i] == str[j]) {
                    dp[i][j] = dp[i + 1][j - 1] + 2;
                } else {
                    dp[i][j] = max(dp[i][j - 1], dp[i + 1][j]);
                }
            }
        }

        // The length of the longest palindromic subsequence is in dp[0][n-1]
        int lps = dp[0][n - 1];

        // Minimum insertions needed = length of string - length of longest palindromic subsequence
        return n - lps;
    }
};
```

## 20. Minimize the Heights ||
**Description:** Given an array arr[] denoting heights of N towers and a positive integer K.

For each tower, you must perform exactly one of the following operations exactly once.

- Increase the height of the tower by K
- Decrease the height of the tower by K
Find out the minimum possible difference between the height of the shortest and tallest towers after you have modified each tower.

You can find a slight modification of the problem here.
Note: It is compulsory to increase or decrease the height by K for each tower. After the operation, the resultant array should not contain any negative integers.
```cpp code:
// User function template for C++

class Solution {
  public:
    int getMinDiff(vector<int> &arr, int k) {
        // code here
        sort(arr.begin(), arr.end());
        int small = arr[0], size = arr.size(), large = arr[size-1];
        int ans = arr[size-1] - arr[0];
        for(int i=1; i<size; i++){
            if (arr[i]-k < 0)
                continue;
                
            small = min(arr[0]+k, arr[i]-k);
            large = max(arr[size-1]-k, arr[i-1]+k);
        
            ans = min(ans, large-small);
        }
        return ans;
    }
};
```

## 21. Majority Element ||
**Description:** You are given an array of integer arr[] where each number represents a vote to a candidate. Return the candidates that have votes greater than one-third of the total votes, If there's not a majority vote, return -1. 

Note: The answer should be returned in an increasing format.
```cpp code:
class Solution {
  public:
    // Function to find the majority elements in the array
    vector<int> findMajority(vector<int>& nums) {
        // Your code goes here.
        int n = nums.size();
        int one_third = n/3;
        
        vector<int> result;
        map<int, int> myMap;
        
        for(int i=0; i<n; i++){
            myMap[nums[i]]++;
        }
        
        
        for(auto& pair:myMap){
            if(pair.second > one_third) result.push_back(pair.first);
        }
        
        if(result.empty()) return {-1};
        
        return result;
    }
};
```

## 22. Minimal Cost
**Description:** There is an array arr of heights of stone and Geek is standing at the first stone and can jump to one of the following: Stone i+1, i+2, ... i+k stone, where k is the maximum number of steps that can be jumped and cost will be |hi-hj| is incurred, where j is the stone to land on. Find the minimum possible total cost incurred before the Geek reaches the last stone.
```cpp code:
class Solution {
  public:
    int func(int i, int k, vector<int>& arr, vector<int>& dp){
        if(i == arr.size()-1)
            return 0;
        
        if(dp[i] != -1)
            return dp[i];
        
        int result = INT_MAX;
        
        for(int j = i+1; (j<arr.size() && j <= i+k); j++){
            int cost = abs(arr[i] - arr[j]) + func(j, k, arr, dp);
            result = min(cost, result);
        }
        
        
        return dp[i] = result;
    }
    
    int minimizeCost(int k, vector<int>& arr) {
        // Code here
        vector<int> dp(arr.size(), -1);
        return func(0, k, arr, dp);
    }
};
```

## 23. Binary Tree to DLL
**Description:** Given a Binary Tree (BT), convert it to a Doubly Linked List (DLL) in place. The left and right pointers in nodes will be used as previous and next pointers respectively in converted DLL. The order of nodes in DLL must be the same as the order of the given Binary Tree. The first node of Inorder traversal (leftmost node in BT) must be the head node of the DLL.

Note: h is the tree's height, and this space is used implicitly for the recursion stack.
```cpp code:
class Solution {
  public:
    void inorder(Node* root){
        // Find predecessor
        if (root->left != nullptr){
            Node* pred = root->left;
            while (pred->right != nullptr){
                pred = pred->right;
            }
            // recursive call for left subtree
            inorder(root->left);
            
            pred->right = root;
            root->left = pred;
        }
        
        // Find successor
        if (root->right != nullptr){
            Node* succ = root->right;
            while (succ->left != nullptr){
                succ = succ->left;
            }
            // recursive call for right subtree
            inorder(root->right);
            
            succ->left = root;
            root->right = succ;
        }
    }
    
    Node* bToDLL(Node* root) {
        // code here
        
        // If root is null, return nullptr
        if(root == nullptr)
            return nullptr;
            
        // Find the head of dll
        Node* head = root;
        while (head -> left != nullptr){
            head = head->left;
        }
        
        inorder(root);
        
        return head;
    }
};
```

## 24. Clone a linked list with next and random pointer
**Description:** You are given a special linked list where each node has a next pointer pointing to its next node. You are also given some random pointers, where you will be given some pairs denoting two nodes a and b i.e. a->random = b (random is a pointer to a random node).

Construct a copy of the given list. The copy should consist of the same number of new nodes, where each new node has its value set to the value of its corresponding original node. Both the next and random pointer of the new nodes should point to new nodes in the copied list such that the original and copied list pointers represent the same list state. None of the pointers in the new list should point to nodes in the original list.

For example, if there are two nodes x and y in the original list, where x->random = y, then for the corresponding two nodes xnew and ynew in the copied list, xnew->random = ynew.

Return the head of the copied linked list.

NOTE : 
1. If there is any node whose arbitrary pointer is not given then it's by default NULL. 
2. Don't make any changes to the original linked list.
```cpp code:
class Solution {
  public:
    Node* duplicate(Node* head){
        Node* temp = head;
        
        while(temp != NULL){
            Node* nnode = new Node(temp->data);
            nnode->next = temp->next;
            temp->next = nnode;
            temp = temp->next->next;
        }
        
        return head;
    }
    
    Node* setRandom(Node* head){
        Node* current = head;
        
        while(current != nullptr){
            if(current->random == nullptr){
                current->next->random = nullptr;
            }
            else{
                current->next->random = current->random->next;
            }
            
            current = current->next->next;
        }
        
        return head;
    }
    
    Node* breakLinks(Node* head){
        Node* temp = head;
        Node* header = head->next;
        
        while(temp->next!=nullptr){
            Node* nodeDL = temp->next;
            
            temp->next = nodeDL->next;
            temp = nodeDL;
        }
        
        return header;
    }
    
    Node *copyList(Node *head) {
        // Write your code here
        return breakLinks(setRandom(duplicate(head)));
    }
};
```

## 25. Smallest window in a string containing all the characters of another string
**Description:** Given two strings s and p. Find the smallest window in the string s consisting of all the characters(including duplicates) of the string p.  Return "-1" in case there is no such window present. In case there are multiple such windows of same length, return the one with the least starting index.
Note : All characters are in Lowercase alphabets. 
```cpp code:
class Solution
{
    public:
    //Function to find the smallest window in the string s consisting
    //of all the characters of string p.
    string smallestWindow (string s, string p)
    {
        int minLength = INT_MAX, start = -1, right = 0, left = 0;
        
        vector<int> vec(256, 0);
        for(int i=0; i<p.size(); i++)
            vec[p[i]]++;
        
        int count = 0;
        while(right < s.size()){
            if(vec[s[right]] > 0)
                count++;
            
            vec[s[right]]--;
            
            
            while(count == p.size()){
                if(right-left+1 < minLength){
                    minLength = right-left+1;
                    start = left;
                }
                vec[s[left]]++;
                if(vec[s[left]] > 0)
                    count--;
                left++;
            }
            
            right++;
        }
        return start == -1 ? "-1" : s.substr(start, minLength);
    }
};
```

## 26. Longest Prefix Suffix
**Description:** Given a string of characters, find the length of the longest proper prefix which is also a proper suffix.

NOTE: Prefix and suffix can be overlapping but they should not be equal to the entire string.
```cpp code:

// User function template for C++

class Solution {
  public:
    int lps(string str) {
        // Your code goes here
        int i=1, j=0, size = str.size();
        vector<int> result(size, 0);
        
        while(i < size){
            if (str[i] == str[j])
                result[i++] = ++j;
            else{
                if (j>0)
                    j = result[j-1];
                else
                    i++;
            }
        }
        
        return result[size-1];
    }
};
```

## 27. Longest Valid Parenthesis
**Description:** Given a string str consisting of opening and closing parenthesis '(' and ')'. Find length of the longest valid parenthesis substring.

A parenthesis string is valid if:
- For every opening parenthesis, there is a closing parenthesis.
- Opening parenthesis must be closed in the correct order.
```cpp code:
// User function Template for C++

class Solution {
  public:
    int maxLength(string& str) {
        int n = str.size();
        
        stack<int>st;
        
        int i = 0;
        while(i < n){
            if(str[i] == '(')
                st.push(i);
            else if(str[i]==')'){
                if(st.empty() || str[st.top()]!='(')
                    st.push(i);
                else if(str[st.top()]=='(')
                    st.pop();
            }
            i++;
        }
        int substr = 0;
        int end = n; 
        
        while (!st.empty()) {
            int l = st.top();
            st.pop();
            substr = max(substr, end - l - 1);
            end = l; 
        }
        substr = max(substr, end);   
        
        return substr;
    }
};
```









