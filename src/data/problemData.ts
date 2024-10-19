// data/problemsData.js
const problemsData = {
    twoSum: {
        title: "1. Two Sum",
        description: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
        examples: [
            { input: "[2,7,11,15], target = 9", output: "[0,1]" },
            { input: "[3,2,4], target = 6", output: "[1,2]" },
            { input: "[3,3], target = 6", output: "[0,1]" },
        ],
        solution: `
  class Solution {
  public:
      vector<int> twoSum(vector<int>& nums, int target) {
          unordered_map<int, int> res; 
          vector<int> result;
  
          for(int i = 0; i < nums.size(); i++) {
              if(res.find(target - nums[i]) != res.end()) {
                  result.push_back(i);
                  result.push_back(res[target - nums[i]]);
                  break;
              } else {
                  res[nums[i]] = i;
              }
          }
          return result;
      }
  };`,
    },
    containerWithMostWater: {
        title: "2. Container With Most Water",
        description: "Given n non-negative integers a1, a2, ..., an, where each represents a point at coordinate (i, ai). Find two lines that form a container with the maximum area of water.",
        examples: [
            { input: "[1,8,6,2,5,4,8,3,7]", output: "49" },
            { input: "[1,1]", output: "1" },
            { input: "[4,3,2,1,4]", output: "16" },
            { input: "[1,2,1]", output: "2" },
        ],
        solution: `
  class Solution {
  public:
      int maxArea(vector<int>& height) {
          int current_area = INT_MIN;
          int area = 0;
          int left = 0, right = height.size() - 1;
          while (left < right) {
              current_area = min(height[left], height[right]) * (right - left);
              if (height[left] < height[right]) left++;
              else right--;
              area = max(area, current_area);
          }
          return area;
      }
  };`,
    },
    threeSum: {
        title: "3. 3Sum",
        description: "Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]] such that i != j, i != k, and j != k, and nums[i] + nums[j] + nums[k] == 0.",
        examples: [
            { input: "[-1,0,1,2,-1,-4]", output: "[[-1,-1,2],[-1,0,1]]" },
            { input: "[]", output: "[]" },
            { input: "[0]", output: "[]" },
        ],
        solution: `
    class Solution {
    public:
        vector<vector<int>> threeSum(vector<int>& nums) {
            vector<vector<int>> res;
    
            if(nums.size() < 3)
                return res;
    
            sort(nums.begin(), nums.end());
    
            int n = nums.size();
            for(int i = 0; i < n - 2; i++) {
                if(i > 0 && nums[i] == nums[i - 1]) continue; // Skip duplicates
                int j = i + 1;
                int k = n - 1;
                while(j < k) {
                    int s = nums[i] + nums[j] + nums[k];
                    if(s < 0) j++;
                    else if(s > 0) k--;
                    else {
                        res.push_back({nums[i], nums[j], nums[k]});
                        while(j < k && nums[j] == nums[j + 1]) j++; // Skip duplicates
                        while(j < k && nums[k] == nums[k - 1]) k--; // Skip duplicates
                        j++;
                        k--;
                    }
                }
            }
    
            return res;
        }
    };`,
    },
    isValidParentheses: {
        title: "4. Valid Parentheses",
        description: "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.",
        examples: [
            { input: "(){}", output: "true" },
            { input: "()[]{}", output: "true" },
            { input: "(]", output: "false" },
            { input: "([)]", output: "false" },
            { input: "{[]}", output: "true" },
        ],
        solution: `
    class Solution {
    public:
        bool isValid(string s) {
            stack<char> stk;
    
            for(auto c : s) {
                switch(c) {
                    case '{': stk.push('}'); break;
                    case '[': stk.push(']'); break;
                    case '(': stk.push(')'); break;
                    default:
                        if(stk.empty() || c != stk.top())
                            return false;
                        else
                            stk.pop();
                }
            }
            return stk.empty();
        }
    };`,
    },

    mergeTwoLists: {
        title: "5. Merge Two Sorted Lists",
        description: "Merge two sorted linked lists and return it as a sorted list. The list should be made by splicing together the nodes of the first two lists.",
        examples: [
            { input: "[1,2,4], [1,3,4]", output: "[1,1,2,3,4,4]" },
            { input: "[], []", output: "[]" },
            { input: "[], [0]", output: "[0]" },
        ],
        solutionOne: ` 
    class Solution {
    public:
        ListNode* mergeTwoLists(ListNode* l1, ListNode* l2) {
            ListNode* res = new ListNode(0);
            ListNode* temp = res;
    
            while(l1 && l2){
                if(l1->val < l2->val){
                    temp->next = l1;
                    l1 = l1->next; 
                } else {
                    temp->next = l2;
                    l2 = l2->next;
                }
                temp = temp->next;
            }
            
            if(l1) temp->next = l1;
            if(l2) temp->next = l2;
    
            return res->next;
        }
    };`,
        solutionTwo: ` 
    class Solution {
    public:
        ListNode* mergeTwoLists(ListNode* l1, ListNode* l2) {
            if(l1 == NULL)
                return l2;
            
            if(l2 == NULL)
                return l1;
    
            if(l1->val >= l2->val)
                l2->next = mergeTwoLists(l1,l2->next);
                
            else{
                l1->next = mergeTwoLists(l1->next,l2);
                l2=l1;
            }
            
            return l2;
        }
    };`,
    },

    nextPermutation: {
        title: "6. Next Permutation",
        description: "Implement next permutation which rearranges numbers into the lexicographically next greater permutation of numbers.",
        examples: [
            { input: "[1,2,3]", output: "[1,3,2]" },
            { input: "[3,2,1]", output: "[1,2,3]" },
            { input: "[1,5]", output: "[5,1]" },
            { input: "[5]", output: "[5]" },
        ],
        solution: ` 
    class Solution {
    public:
       void nextPermutation(vector<int>& nums) {
           next_permutation(nums.begin(),nums.end());
       }
    };`,
    },

    searchInsert: {
        title: "7. Search Insert Position",
        description: "Given a sorted array of distinct integers and a target value...",
        examples: [
            { input: "[1,3,5,6], target=5", output: "2" },
            { input: "[1,3], target=0", output: "0" },
            { input: "[3], target=4", output: "-" },
        ],
        solution: ` 
    class Solution {
    public:
       int searchInsert(vector<int>& nums,int target){
           int low=0 , high=nums.size()-1 , mid ;
           while(low<=high){
               mid=low+(high-low)/2 ;
               if(nums[mid]==target)
                   return mid ;
               else if(nums[mid]>target)
                   high=mid-1 ;
               else
                   low=mid+1 ;
           }
           return low ;
       }
    };`,
    },

    isValidSudoku: {
        title: "8. Valid Sudoku",
        description: "Determine if a 9 x 9 Sudoku board is valid...",
        examples: [
            {
                input: `[['5','3','.','.','7','.','.','.','.'],
                     ['6','.','.','1','9','5','.','.','.'],
                     ['.','9','8','.','.','.','.','6','.'],
                     ['8','.','.','.','6','.','.','.','3'],
                     ['4','.','.','8','.','3','.','.','1'],
                     ['7','.','.','.','2','.','.','.','6'],
                     ['.','6','.','.','.','.','2','8','.'],
                     ['.','.' ,'.' ,'4' ,'1' ,'9' ,'.' ,'.' ,'5'],
                     ['.' ,'.' ,'.' ,'.' ,'8' ,'.' ,'.' ,'7' ,'9']]`, output: "true"
            },
            {
                input: `[['8','3','.','.','7','.','.','.','.'],
                     ['6','.','.','1','9','5','.','.','.'],
                     ['.','9','8','.','.','.','.','6', '.'],
                     ['8', '.', '.', '.', '6', '.', '.', '.', '3'],
                     ['4', '.', '.', '8', '.', '3', '.', '.', '1'],
                     ['7', '.', '.', '.', '2', '.', '.', '.', '6'],
                     ['.', '6', '.', '.', '.', '.', '2', '8', '.'],
                     ['.', '.', '.', '4', '1', '9', '.', '.', '5'],
                     ['.', '.', '.', '.', '8', '.', '.', '7', '9']]`, output: "false"
            },
        ],
        solution: ` 
    class Solution {
    public:
       bool isValidSudoku(vector<vector<char>>& board){
           vector<set<int>> rows(9), cols(9), blocks(9);
           
           for(int i=0;i<9;i++){ //rows
               for(int j=0;j<9;j++){ //columns
                   if(board[i][j]=='.') continue;
    
                   int curr = board[i][j]-'0';
                   if(rows[i].count(curr) || cols[j].count(curr) || blocks[(i/3)*3+j/3].count(curr))
                       return false;
    
                   rows[i].insert(curr);
                   cols[j].insert(curr);
                   blocks[(i/3)*3+j/3].insert(curr);
               }
           }
           return true;
       }
    };`,
    },

    firstMissingPositive: {
        title: "9. First Missing Positive",
        description: "Given an unsorted integer array nums, return the smallest missing positive integer.",
        examples: [
            { input: "[1,2,0]", output: "3" },
            { input: "[3,4,-1,1]", output: "2" },
            { input: "[7,8,9,11,12]", output: "1" },
        ],
        solution: `
    class Solution {
    public:
        int firstMissingPositive(vector<int>& nums) {
            int n = nums.size();
            
            vector<bool> present(n + 1, false); // Use n + 1 to account for the range
            
            for (int num : nums) {
                if (num > 0 && num <= n) {
                    present[num] = true;
                }
            }
            
            for (int i = 1; i <= n; i++) {
                if (!present[i]) return i;
            }
            
            return n + 1;
        }
    };`,
    },

    maxSubArray: {
        title: "10. Maximum Subarray",
        description: "Given an integer array nums, find the contiguous subarray which has the largest sum and return its sum.",
        examples: [
            { input: "[-2,1,-3,4,-1,2,1,-5,4]", output: "6" },
            { input: "[1]", output: "1" },
            { input: "[5,4,-1,7,8]", output: "23" },
        ],
        solutionOne: `
    class Solution {
    public:
        int maxSubArray(vector<int>& nums) {
            int sum = nums[0], max_sum = nums[0];
            for (int i = 1; i < nums.size(); i++) {
                sum = max(nums[i], sum + nums[i]);
                max_sum = max(sum, max_sum);
            }
            return max_sum;
        }
    };`,
        solutionTwo: `
    class Solution {
    public:
        int maxSubArray(vector<int>& nums) {
            int m1= INT_MIN;
            int m2 = 0;
    
            for(int i=0; i < nums.size(); i++) {
                m2 = max(nums[i], m2 + nums[i]);
                if(m2 > m1)
                    m1 = m2;
    
                if(m2 < 0)
                    m2 = 0;
            }
            return m1;
        }
    };`,
    },

    mySqrt: {
        title: "11. Sqrt(x)",
        description: "Given a non-negative integer x, compute and return the square root of x.",
        examples: [
            { input: "4", output: "2" },
            { input: "8", output: "2" },
            { input: "16", output: "4" },
        ],
        solution: `
    class Solution {
    public:
        int mySqrt(int x) {
            if (x < 2) return x;
    
            long long int res;
            long long int start = 1;
            long long int end = x / 2;
    
            while (start <= end) {
                long long int mid = start + (end - start) / 2;
                if (mid * mid == x)
                    return mid;
    
                else if (mid * mid < x) {
                    start = mid + 1;
                    res = mid;
                } else
                    end = mid - 1;
            }
            return res;
        }
    };`,
    },

    searchMatrix: {
        title: "12. Search a 2D Matrix",
        description: "Write an efficient algorithm that searches for a value in an m x n matrix.",
        examples: [
            { input: "[[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 3", output: "true" },
            { input: "[[1,3,5],[10],[23]], target = 13", output: "false" },
        ],
        solution: `
    class Solution {
    public:
        bool searchMatrix(vector<vector<int>>& matrix, int target) {
            if (!matrix.size()) return false;
    
            int n = matrix.size(); // number of rows
            int m = matrix[0].size(); // number of columns
    
            int low = 0;
            int high = (n * m) - 1;
    
            while (low <= high) { // using binary search
                int mid = (low + (high - low) / 2); // to overcome integer overflow
                if (matrix[mid / m][mid % m] == target) // mid/m gives row number , mid%m gives column number
                    return true;
    
                if (matrix[mid / m][mid % m] < target)
                    low = mid + 1;
                else
                    high = mid - 1;
            }
            return false;
        }
    };`,
    },

    deleteDuplicates: {
        title: "13. Remove Duplicates from Sorted List",
        description: "Given the head of a sorted linked list, delete all duplicates such that each element appears only once.",
        examples: [
            { input: "[1,1,2]", output: "[1,2]" },
            { input: "[1,1,2,3,3]", output: "[1,2,3]" },
        ],
        solution:
            `class Solution {
    public:
       ListNode* deleteDuplicates(ListNode* head) {
           if(head == NULL)
               return NULL;
    
           ListNode* curr = head;
           while(curr->next) {
               if(curr->val == curr->next->val)
                   curr->next = curr->next->next;
               else
                   curr = curr->next;
           }
           return head;
       }
    };`,
    },

    mergeTwoSortedLists: {
        title: "14. Merge Two Sorted Lists",
        description: "You are given two integer arrays nums1 and nums2, sorted in non-decreasing order, and two integers m and n, representing the number of elements in nums1 and nums2 respectively. Merge nums1 and nums2 into a single array sorted in non-decreasing order.",
        examples: [
            { input: "[1,2,4,0,0,0], m = 3, nums2 = [2,5,6], n = 3", output: "[1,2,2,3,5,6]" },
            { input: "[1], m = 1, nums2 = [], n = 0", output: "[1]" },
        ],
        solution: `
    class Solution {
    public:
        void merge(vector<int>& nums1, int m, vector<int>& nums2, int n) {
            int i = 0;
            while (i < n) {
                nums1[m++] = nums2[i];
                i++;
            }
            sort(nums1.begin(), nums1.end());
        }
    };`,
    },

    inorderTraversal: {
        title: "15. Binary Tree Inorder Traversal",
        description: "Given the root of a binary tree, return the inorder traversal of its nodes' values.",
        examples: [
            { input: "[1,null,2,3]", output: "[1,3,2]" },
            { input: "[]", output: "[]" },
            { input: "[1]", output: "[1]" },
        ],
        solution: `
    class Solution {
    public:
        vector<int> ans;
        vector<int> inorderTraversal(TreeNode* root) {
            if (root == NULL)
                return ans;
    
            inorderTraversal(root->left);
            ans.push_back(root->val);
            inorderTraversal(root->right);
    
            return ans;
        }
    };`,
    },

    isSymmetric: {
        title: "16. Symmetric Tree",
        description: "Given the root of a binary tree, check whether it is a mirror of itself (i.e., symmetric around its center).",
        examples: [
            { input: "[1,2,2,3,4,4,3]", output: "true" },
            { input: "[1,2,2,null,3,null,3]", output: "false" },
        ],
        solution: `
    class Solution {
    public:
        bool isSymmetric(TreeNode* root) {
            if (root == NULL)
                return true;
            return isSymmetricTest(root->left , root->right);
        }
    
        bool isSymmetricTest(TreeNode* p, TreeNode* q) {
            if (p == NULL && q == NULL)
                return true;
            else if (p == NULL || q == NULL)
                return false;
            else if (p->val != q->val)
                return false;
    
            return isSymmetricTest(p->left,q->right) && isSymmetricTest(p->right,q->left);
        }
    };`,
    },

    levelOrderTraversal: {
        title: "17. Binary Tree Level Order Traversal",
        description: "Given the root of a binary tree, return the level order traversal of its nodes' values.",
        examples: [
            { input: "[3,9,20,null,null,15,7]", output: "[[3],[9,20],[15,7]]" },
            { input: "[1]", output: "[[1]]" },
            { input: "[]", output: "[]" },
        ],
        solution:
            `class Solution {
    public:
       vector<vector<int>> levelOrder(TreeNode* root) {
           vector<vector<int>> ans;
           if (root == NULL) return ans;
    
           queue<TreeNode*> q;
           q.push(root);
           while (!q.empty()) {
               int size = q.size();
               vector<int> level;
               for (int i = 0; i < size; i++) {
                   TreeNode* node = q.front();
                   q.pop();
                   if (node->left != NULL)
                       q.push(node->left);
                   if (node->right != NULL)
                       q.push(node->right);
                   level.push_back(node->val);
               }
               ans.push_back(level);
           }
           return ans;
       }
    };`,
    },

    maxDepthBinaryTree: {
        title: "18. Maximum Depth of Binary Tree",
        description: "Given the root of a binary tree , return its maximum depth.",
        examples: [
            { input: "[3,9,20,null,null,15,7]", output: "3" },
            { input: "[1,null,2]", output: "2" },
            { input: "[]", output: "0" },
        ],
        solution: ` 
    class Solution {
    public:
       int maxDepth(TreeNode* root) {
           if (root == NULL)
               return 0;
    
           int leftDepth = maxDepth(root->left);
           int rightDepth = maxDepth(root->right);
    
           return max(leftDepth,rightDepth) + 1;
       }
    };`,
    },

    hasPathSum: {
        title: "19. Path Sum",
        description: "Given the root of a binary tree and an integer targetSum...",
        examples: [
            { input: "[5,4,8,11,null,13,4], targetSum = 22", output: "true" },
            { input: "[1], targetSum = 5", output: "false" },
        ],
        solution: ` 
    class Solution {
    public:
       bool hasPathSum(TreeNode* root,int sum) {
           if (root == NULL)
               return false;
    
           if (root->left == NULL && root->right == NULL)
               return sum == root->val;
    
           return hasPathSum(root->left,sum - root->val) || hasPathSum(root->right,sum - root->val);
       }
    };`,
    },

    generatePascalTriangle: {
        title: "20. Pascal's Triangle",
        description: "Given an integer numRows , return the first numRows of Pascal's triangle.",
        examples: [
            { input: "5", output: `[[1],[1,1],[1,2,1],[1,3,3],[1,4,6]]` },
            { input: "1", output: `[[1]]` },
        ],
        solution: ` 
    class Solution {
    public:
       vector<vector<int>> generate(int numRows) {
           vector<vector<int>> res(numRows);
    
           for (int i = 0; i < numRows; i++) {
               res[i].resize(i + 1); // number of rows
               res[i][0] = res[i][i] = 1;
    
               for (int j = 1; j < i; j++) {
                   res[i][j] = res[i - 1][j - 1] + res[i - 1][j];
               }
           }
           return res;
       }
    };`,
    },

    maxProfit: {
        title: "21. Best Time to Buy and Sell Stock",
        description: "You are given an array prices where prices[i] is the price of a given stock on the ith day...",
        examples: [
            { input: "[7,1,5,3,6,4]", output: "5" },
            { input: "[7,6,4,3,1]", output: "0" },
        ],
        solution: ` 
    class Solution {
    public:
       int maxProfit(vector<int>& prices) {
           int minm = INT_MAX;
           int result = 0;
    
           for (int i = 0; i < prices.size(); i++) {
               minm = min(minm , prices[i]);
               result = max(prices[i] - minm , result);
           }
           return result;
       }
    };`,
    },

    hasCycle: {
        title: "22. Linked List Cycle",
        description: "Given head , the head of a linked list , determine if the linked list has a cycle in it.",
        examples: [
            { input: "[3 ,2 ,0 ,-4], pos=1", output: "true" },
            { input: "[1 ,2], pos=0", output: "true" },
            { input: "[1], pos=-1", output: "false" },
        ],
        solution: ` 
    class Solution {
    public:
       bool hasCycle(ListNode *head) {
           if(head == NULL || head -> next == NULL)
               return false;
    
           ListNode *slow = head;
           ListNode *fast = head;
    
           while(fast -> next != NULL && fast -> next -> next != NULL) {
               fast = fast -> next -> next;
               slow = slow -> next;
    
               if(fast == slow)
                   return true;
           }
           
           return false;
       }
    };`,
    },

    preorderTraversal: {
        title: "23. Binary Tree Preorder Traversal",
        description: "Given the root of a binary tree , return the preorder traversal of its nodes' values.",
        examples: [
            { input: "[1,null ,2 ,3]", output: `[1 ,2 ,3]` },
            { input: "[]", output: `[]` },
            { input: "[1]", output: `[1]` },
            { input: "[1 ,2]", output: `[1 ,2]` },
            { input: "[1,null ,2]", output: `[1 ,2]` },
        ],
        solution: ` 
    class Solution {
    public:
       vector<int> ans;
       vector<int> preorderTraversal(TreeNode* root) {
           if(root == NULL)
               return ans;
    
           ans.push_back(root -> val);
           preorderTraversal(root -> left);
           preorderTraversal(root -> right);
    
           return ans;
       }
    };`,
    },

    postorderTraversal: {
        title: "24. Binary Tree Postorder Traversal",
        description: "Given the root of a binary tree , return the postorder traversal of its nodes' values.",
        examples: [
            { input: "[1,null ,2 ,3]", output: `[3 ,2 ,1]` },
            { input: "[]", output: `[]` },
            { input: "[1]", output: `[1]` },
            { input: "[1 ,2]", output: `[2 ,1]` },
            { input: "[1,null ,2]", output: `[2 ,1]` },
        ],
        solution: ` 
    class Solution {
    public:
       vector<int> ans;
       vector<int> postorderTraversal(TreeNode* root) {
           if(root == NULL)
               return ans;
    
           postorderTraversal(root -> left);
           postorderTraversal(root -> right);
           
           ans.push_back(root -> val);
    
           return ans;
       }
    };`,
    },

    removeElements: {
        title: "25. Remove Linked List Elements",
        description: "Given the head of a linked list and an integer val...",
        examples: [
            { input: "[1 ,2 ,6 ,3 ,4 ,5 ,6], val=6", output: "[1 ,2 ,3 ,4 ,5]" },
            { input: "[], val=1", output: "[]" },
            { input: "[7 ,7 ,7 ,7], val=7", output: "[]" },
        ],
        solution: `
    class Solution {
    public:
    ListNode* removeElements(ListNode* head,int val){
    if(head==0) //if head is empty 
    return head;
    if(head->val==val) //if value matches 
    return removeElements(head->next,val); //just ignore the element node 
    else{
    head->next=removeElements(head->next,val); 
    }
    return head;
    }
    };
    `
    },

    reverseList: {
        title: "26. Reverse Linked List",
        description: "Given the head of a singly linked list...",
        examples: [
            { input: "[1 ,2 ,3 ,4 ,5]", output: "[5 ,4 ,3 ,2 ,1]" },
            { input: "[1 ,2]", output: "[2 ,1]" },
            { input: "[]", output: "[]" },
        ],
        solution: `
    class Solution{
    public:
    ListNode* reverseList(ListNode* head){
    vector<int>res;
    ListNode* temp=head;
    while(temp){
    res.push_back(temp->val);
    temp=temp->next;
    }
    
    temp=head;
    
    for(int i=res.size()-1;i>=0;i--){
    temp->val=res[i];
    temp=temp->next;
    }
    return head;
    }
    };
    `},

    findKthLargest: {
        title: "27. Kth Largest Element in an Array",
        description: "Given an integer array nums and an integer k, return the kth largest element in the array.",
        examples: [
            { input: "[3,2,1,5,6,4], k = 2", output: "5" },
            { input: "[3,2,3,1,2,4,5,5,6], k = 4", output: "4" },
        ],
        solution: `
    class Solution {
    public:
        int findKthLargest(vector<int>& nums, int k) {
            sort(nums.begin(), nums.end());
            int n = nums.size();
            return nums[n - k];
        }
    };`,
    },

    containsDuplicate: {
        title: "28. Contains Duplicate",
        description: "Given an integer array nums, return true if any value appears at least twice in the array.",
        examples: [
            { input: "[1,2,3,1]", output: "true" },
            { input: "[1,2,3,4]", output: "false" },
            { input: "[1,1,1,3,3,4,3,2,4,2]", output: "true" },
        ],
        solutionOne: `
    class Solution {
    public:
        bool containsDuplicate(vector<int>& nums) {
            return (nums.size() > unordered_set<int>(nums.begin(), nums.end()).size());
        }
    };`,
        solutionTwo: `
    class Solution {
    public:
        bool containsDuplicate(vector<int>& nums) {
            unordered_map<int,int> ans;
            for(int i = 0; i < nums.size(); i++) {
                ans[nums[i]]++;
            }
            
            for(auto x : ans) {
                if(x.second >= 2) {
                    return true;
                }
            }
            return false;
        }
    };`,
    },

    invertBinaryTree: {
        title: "29. Invert Binary Tree",
        description: "Given the root of a binary tree, invert the tree and return its root.",
        examples: [
            { input: "[4,2,7,1,3,6,9]", output: "[4,7,2,9,6,3,1]" },
            { input: "[2,1,3]", output: "[2,3,1]" },
            { input: "[]", output: "[]" },
        ],
        solution:
            `class Solution {
    public:
        TreeNode* invertTree(TreeNode* root) {
           if(root) {
               invertTree(root->left);
               invertTree(root->right);
               swap(root->left , root->right); 
           }
           return root;
        }
    };`,
    },

    MyQueue: {
        title: "30. Implement Queue using Stacks",
        description: "Implement a first in first out (FIFO) queue using only two stacks.",
        examples: [
            { input: `["MyQueue", "push", "push", "peek", "pop", "empty"]`, output: `[null,null,null ,1 ,1 ,false]` },
        ],
        solution: ` 
    class MyQueue {
    public:
       stack<int> s1,s2;
    
       MyQueue() {}
    
       void push(int x) {
           while(!s1.empty()) {
               s2.push(s1.top());
               s1.pop();
           }
    
           s2.push(x);
           while(!s2.empty()) {
               s1.push(s2.top());
               s2.pop();
           }
       }
    
       int pop() {
           int curr = s1.top();
           s1.pop();
           return curr;
       }
    
       int peek() {
           return s1.top();
       }
    
       bool empty() {
           return s1.empty();
       }
    };`,
    },

    isAnagram: {
        title: "31. Valid Anagram",
        description: "Given two strings s and t , return true if t is an anagram of s , and false otherwise.",
        examples: [
            { input: "anagram , nagaram", output: "true" },
            { input: "rat , car", output: "false" },
        ],
        solution: ` 
    class Solution {
    public:
       bool isAnagram(string s,string t) {
           if(s.length() != t.length())
               return false;
    
           int count[26] = {0};
           for(char ch : s)
               count[ch - 'a']++;
    
           for(char ch : t)
               count[ch - 'a']--;
    
           for(int i = 0; i < 26; i++) {
               if(count[i] != 0)
                   return false;
           }
           
           return true;
       }
    };`,
    },

    missingNumber: {
        title: "32. Missing Number",
        description: "Given an array nums containing n distinct numbers in the range [0,n], return the only number in the range that is missing from the array.",
        examples: [
            { input: "[3 ,0 ,1]", output: "2" },
            { input: "[0 ,1]", output: "2" },
        ],
        solution: ` 
    class Solution {
    public:
       int missingNumber(vector<int>& nums) {
           int sum = 0;
           int n = nums.size();
           
           for(int i = 0; i < n; i++) {
               sum += nums[i];
           }
    
           return (n * (n + 1) / 2 - sum);
       }
    };`,
    },

    guessNumber: {
        title: "33. Guess Number Higher or Lower",
        description: "You are playing a Guess Game...",
        examples: [
            { input: "n=10,pick=6", output: "6" },
            { input: "n=1,pick=1", output: "1" },
            { input: "n=2,pick=2", output: "2" },
        ],
        solution: ` 
    class Solution {
    public:
       int guessNumber(int n) {
           int start = 1;
           int end = n;
    
           while(start <= end) {
               int mid = start + (end - start) / 2;
    
               if(guess(mid) == 0)
                   return mid;
               else if(guess(mid) < 0)
                   end = mid - 1;
               else
                   start = mid + 1;
           }
           
           return -1;
       }
    };`,
    },

    intersect: {
        title: "34. Intersection of Two Arrays II",
        description: "Given two integer arrays nums1 and nums2...",
        examples: [
            { input: "[1 ,2 ,2 ,1], [2 ,2]", output: "[2 ,2]" },
            { input: "[4 ,9 ,5], [9 ,4 ,9 ,8 ,4]", output: "[4 ,9]" },
        ],
        solution: `
    class Solution{
    public:
    vector<int> intersect(vector<int>& nums1 , vector<int>& nums2){
    vector<int> ans ;
    sort(nums1.begin() , nums1.end());
    sort(nums2.begin() , nums2.end());
    
    int i=0,j=0 ;
    while(i<nums1.size() && j<nums2.size()){
    if(nums1[i]<nums2[j])
    i++ ;
    else if(nums1[i]>nums2[j])
    j++ ;
    else{
    ans.push_back(nums1[i]);
    i++ ;
    j++ ;
    }
    }
    return ans ;
    }
    };
    `
    },

    runningSum: {
        title: "35. Running Sum of 1d Array",
        description: "Given an array nums...",
        examples: [
            { input: "[1 ,2 ,3 ,4]", output: "[1 ,3 ,6 ,10]" },
            { input: "[5]", output: "[5]" },
        ],
        solution: `
        class Solution{
        public:
        vector<int> runningSum(vector<int>& nums){
        for(int i=1;i<nums.size();i++)
        {
        nums[i]+=nums[i-1];
        }
        return nums;
        }
        };
        `
    },

    shuffleString: {
        title: "36. Shuffle String",
        description: "Given a string s and an integer array indices...",
        examples: [
            { input: `"codeleet", indices = [4,5,6,7,0,2,1,3]`, output: `"leetcode"` },
        ],
        solution: `
        class Solution{
        public:
        string restoreString(string s , vector<int>& indices){
        string res=s;
        for(int i=0;i<indices.size();i++)
        {
        res[indices[i]]=s[i];
        }
        return res;
        }
        };
        `
    },

    maxLevelSum: {
        title: "37. Maximum Level Sum of a Binary Tree",
        description: "Given the root of a binary tree...",
        examples: [
            { input: "[1 ,7 ,0 ,7 ,-8,null,null]", output: "2" },
        ],
        solution: ` 
        class Solution{
        public:
        int maxLevelSum(TreeNode* root){
        queue<TreeNode*>q;
        int level=1,max_level=0,max_sum=INT_MIN;
        
        if(root==nullptr)
        return 0;
        
        q.push(root);
        while(!q.empty()){
        int len=q.size();
        int sum=0;
        
        while(len--){
        TreeNode* front=q.front();
        q.pop();
        
        if(front->right)
        q.push(front->right);
        if(front->left)
        q.push(front->left);
        sum=sum+front->val;
        }
        if(sum>max_sum)
        {
        max_sum=sum;
        max_level=level;
        }
        level++;
        }
        return max_level;
        }
        };`,
    },

    firstAlphabet: {
        title: "38. First Alphabet of Each Word",
        description: "Given a string S, create a string with the first letter of every word in the string.",
        examples: [
            { input: "geeks for geeks", output: "gfg" },
            { input: "bad is good", output: "big" },
        ],
        solution: `
    class Solution {
    public:
        string firstAlphabet(string S) {
            string ans;
            ans += S[0]; // Add the first character of the first word
    
            for (int i = 1; i < S.size(); i++) {
                if (S[i - 1] == ' ') // Check if the previous character is a space
                    ans += S[i]; // Add the current character to the answer
            }
            return ans;
        }
    };`,
    },

    countLeaves: {
        title: "39. Count Leaves in a Binary Tree",
        description: "Given a Binary Tree of size N, count the number of leaves in it.",
        examples: [
            {
                input: "Given Tree is [4, 8, 10, 7, 3, null, 5, null, null, null]",
                output: "3"
            },
        ],
        solution: `
    int countLeaves(Node* root) {
        if (root == NULL)
            return 0;
    
        if (root->left == NULL && root->right == NULL)
            return 1;
    
        return countLeaves(root->left) + countLeaves(root->right);
    }
    `,
        timeComplexity: "O(n) where n is the number of nodes in the binary tree.",
    },

    generateBinaryNumbers: {
        title: "40. Generate Binary Numbers from 1 to N",
        description: "Given a number N, generate and print all binary numbers with decimal values from 1 to N.",
        examples: [
            { input: "N = 2", output: "1 10" },
            { input: "N = 5", output: "1 10 11 100 101" },
        ],
        solution: `
    vector<string> generate(int N) {
        queue<string> q;
        vector<string> v;
    
        q.push("1");
        while (N--) {
            string s = q.front();
            v.push_back(s);
            q.pop();
            q.push(s + "0");
            q.push(s + "1");
        }
        return v;
    }
    `,
        timeComplexity: "O(N log2N)",
        spaceComplexity: "O(N log2N)",
    },

    minimumDifference: {
        title: "41. Minimum Difference Between Any Pair",
        description: "Given an unsorted array, find the minimum difference between any pair in the given array.",
        examples: [
            { input: "[2, 4, 5, 9, 7]", output: "1" },
            { input: "[3, 10, 8, 6]", output: "2" },
        ],
        solution: `
    class Solution {
    public:
        int minimum_difference(vector<int> nums) {
            sort(nums.begin(), nums.end());
            int minm = INT_MAX;
            
            for (int i = 0; i < nums.size() - 1; i++) {
                minm = min(minm, nums[i + 1] - nums[i]);
            }
            return minm;
        }    
    };`,
        timeComplexity: "O(N log N) where N is the length of the array.",
        spaceComplexity: "O(1)",
    },
    mthHalf: {
        title: "42. Halve N, M-1 Times",
        description: "Given two values N and M, return the value when N is halved M-1 times.",
        examples: [
            { input: "N = 100, M = 4", output: "12" },
            { input: "N = 10, M = 5", output: "0" },
        ],
        solution: `
    class Solution {
    public:
        int mthHalf(int N, int M) {
            return N / pow(2, M - 1);
        }
    };`,
        timeComplexity: "O(1)",
        spaceComplexity: "O(1)",
    },

    removeChars: {
        title: "43. Remove Characters from First String",
        description: "Given two strings string1 and string2, remove those characters from string1 which are present in string2.",
        examples: [
            { input: 'string1 = "computer", string2 = "cat"', output: '"ompuer"' },
            { input: 'string1 = "occurrence", string2 = "car"', output: '"ouene"' },
        ],
        solution: `
    class Solution {
    public:
        string removeChars(string string1, string string2) {
            int arr[26] = {0};
            for (int i = 0; i < string2.size(); i++)
                arr[string2[i] - 'a']++;
            
            string ans;
            for (int i = 0; i < string1.size(); i++) {
                if (arr[string1[i] - 'a'] == 0) // If value is 0, add to new string
                    ans += string1[i];
            }
            return ans;
        }
    };`,
        timeComplexity: "O(|String1| + |String2|)",
        spaceComplexity: "O(1)",
    },
    rotateArray: {
        title: "44. Rotate Array by D Elements",
        description: "Given an unsorted array arr[] of size N, rotate it by D elements (clockwise).",
        examples: [
            { input: "N = 5, D = 2, arr = [1, 2, 3, 4, 5]", output: "[3, 4, 5, 1, 2]" },
            { input: "N = 10, D = 3, arr = [2, 4, 6, 8, 10, 12, 14, 16, 18, 20]", output: "[8, 10, 12, 14, 16, 18, 20, 2, 4, 6]" },
        ],
        solution: `
    #include<bits/stdc++.h>
    using namespace std;
    
    class Solution {
    public:
        void rotateArray(int n, int d, vector<int>& arr) {
            d = d % n; // Handle cases where d >= n
            vector<int> rotated(n);
            
            for (int i = 0; i < n; i++) {
                rotated[(i + n - d) % n] = arr[i];
            }
            
            for (int i = 0; i < n; i++) {
                cout << rotated[i] << " ";
            }
            cout << endl;
        }
    };`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(n)",
    },


};

export default problemsData;