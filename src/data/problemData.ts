const problemsData = {
  twoSum: {
    title: "1. Two Sum",
    description:
      "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
    examples: [
      { input: "[2,7,11,15], target = 9", output: "[0,1]" },
      { input: "[3,2,4], target = 6", output: "[1,2]" },
      { input: "[3,3], target = 6", output: "[0,1]" },
    ],
    solution: {
      cpp: `
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
      java: `
  import java.util.HashMap;
  
  public class Solution {
      public int[] twoSum(int[] nums, int target) {
          HashMap<Integer, Integer> map = new HashMap<>();
          
          for (int i = 0; i < nums.length; i++) {
              int complement = target - nums[i];
              
              if (map.containsKey(complement)) {
                  return new int[] { map.get(complement), i };
              }
              
              map.put(nums[i], i);
          }
          return new int[] {};
      }
  }`,
      python: `
  class Solution:
      def twoSum(self, nums: List[int], target: int) -> List[int]:
          res = {}
          
          for i, num in enumerate(nums):
              complement = target - num
              
              if complement in res:
                  return [res[complement], i]
              
              res[num] = i`,
    },
    timeComplexity: { cpp: "O(n)", java: "O(n)", python: "O(n)" },
    spaceComplexity: { cpp: "O(1)", java: "O(1)", python: "O(1)" }
  },
  containerWithMostWater: {
    title: "2. Container With Most Water",
    description:
      "Given n non-negative integers a1, a2, ..., an, where each represents a point at coordinate (i, ai). Find two lines that form a container with the maximum area of water.",
    examples: [
      { input: "[1,8,6,2,5,4,8,3,7]", output: "49" },
      { input: "[1,1]", output: "1" },
      { input: "[4,3,2,1,4]", output: "16" },
      { input: "[1,2,1]", output: "2" },
    ],
    solution: {
      cpp: `
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
      java: `
  public class Solution {
      public int maxArea(int[] height) {
          int left = 0, right = height.length - 1;
          int maxArea = 0;
          
          while (left < right) {
              int currentArea = Math.min(height[left], height[right]) * (right - left);
              maxArea = Math.max(maxArea, currentArea);
              
              if (height[left] < height[right]) {
                  left++;
              } else {
                  right--;
              }
          }
          
          return maxArea;
      }
  }`,
      python: `
class Solution:
      def maxArea(self, height: List[int]) -> int:
          left, right = 0, len(height) - 1
          max_area = 0
          
          while left < right:
              current_area = min(height[left], height[right]) * (right - left)
              max_area = max(max_area, current_area)
              
              if height[left] < height[right]:
                  left += 1
              else:
                  right -= 1
          
          return max_area`,
    },
    timeComplexity: {
        cpp: "O(n)",
        java: "O(n)",
        python: "O(n)",
      },
      spaceComplexity: {
        cpp: "O(1)",
        java: "O(1)",
        python: "O(1)",
      },
  },
  threeSum: {
    title: "3. 3Sum",
    description:
      "Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]] such that i != j, i != k, and j != k, and nums[i] + nums[j] + nums[k] == 0.",
    examples: [
      { input: "[-1,0,1,2,-1,-4]", output: "[[-1,-1,2],[-1,0,1]]" },
      { input: "[]", output: "[]" },
      { input: "[0]", output: "[]" },
    ],
    solution: {
      cpp: `
    vector<vector<int>> threeSum(vector<int>& nums) {
        vector<vector<int>> res;
        if(nums.size() < 3) return res;
        sort(nums.begin(), nums.end());
        int n = nums.size();
        for(int i = 0; i < n - 2; i++) {
            if(i > 0 && nums[i] == nums[i - 1]) continue;
            int j = i + 1, k = n - 1;
            while(j < k) {
                int s = nums[i] + nums[j] + nums[k];
                if(s < 0) j++;
                else if(s > 0) k--;
                else {
                    res.push_back({nums[i], nums[j], nums[k]});
                    while(j < k && nums[j] == nums[j + 1]) j++;
                    while(j < k && nums[k] == nums[k - 1]) k--;
                    j++, k--;
                }
            }
        }
        return res;
    }
};`,
      java: `
import java.util.*;
public class Solution {
    public List<List<Integer>> threeSum(int[] nums) {
        List<List<Integer>> res = new ArrayList<>();
        if(nums.length < 3) return res;
        Arrays.sort(nums);
        for(int i = 0; i < nums.length - 2; i++) {
            if(i > 0 && nums[i] == nums[i - 1]) continue;
            int j = i + 1, k = nums.length - 1;
            while(j < k) {
                int sum = nums[i] + nums[j] + nums[k];
                if(sum < 0) j++;
                else if(sum > 0) k--;
                else {
                    res.add(Arrays.asList(nums[i], nums[j], nums[k]));
                    while(j < k && nums[j] == nums[j + 1]) j++;
                    while(j < k && nums[k] == nums[k - 1]) k--;
                    j++; k--;
                }
            }
        }
        return res;
    }
};`,
      python: `
class Solution:
    def threeSum(self, nums: List[int]) -> List[List[int]]:
        res = []
        nums.sort()
        for i in range(len(nums) - 2):
            if i > 0 and nums[i] == nums[i - 1]:
                continue
            j, k = i + 1, len(nums) - 1
            while j < k:
                s = nums[i] + nums[j] + nums[k]
                if s < 0:
                    j += 1
                elif s > 0:
                    k -= 1
                else:
                    res.append([nums[i], nums[j], nums[k]])
                    while j < k and nums[j] == nums[j + 1]:
                        j += 1
                    while j < k and nums[k] == nums[k - 1]:
                        k -= 1
                    j += 1
                    k -= 1
        return res`,
    },
    timeComplexity: {
        cpp: "O(n^2)",
        java: "O(n^2)",
        python: "O(n^2)",
    },
    spaceComplexity: {
        cpp: "O(1)",
        java: "O(1)",
        python: "O(1)",
    },
  },

  isValidParentheses: {
    title: "4. Valid Parentheses",
    description:
      "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.",
    examples: [
      { input: "(){}", output: "true" },
      { input: "()[]{}", output: "true" },
      { input: "(]", output: "false" },
      { input: "([)]", output: "false" },
      { input: "{[]}", output: "true" },
    ],
    solution: {
      cpp: `
class Solution {
public:
    bool isValid(string s) {
        stack<char> stk;
        for(char c : s) {
            if(c == '{') stk.push('}');
            else if(c == '[') stk.push(']');
            else if(c == '(') stk.push(')');
            else if(stk.empty() || stk.top() != c) return false;
            else stk.pop();
        }
        return stk.empty();
    }
};`,
      java: `
import java.util.Stack;

public class Solution {
    public boolean isValid(String s) {
        Stack<Character> stack = new Stack<>();
        for (char c : s.toCharArray()) {
            if (c == '(') stack.push(')');
            else if (c == '{') stack.push('}');
            else if (c == '[') stack.push(']');
            else if (stack.isEmpty() || stack.pop() != c) return false;
        }
        return stack.isEmpty();
    }
};`,
      python: `
class Solution:
    def isValid(self, s: str) -> bool:
        stack = []
        mapping = {')': '(', '}': '{', ']': '['}
        for char in s:
            if char in mapping:
                top_element = stack.pop() if stack else '#'
                if mapping[char] != top_element:
                    return False
            else:
                stack.append(char)
        return not stack`,
    },
    timeComplexity: {
        cpp: "O(n)",
        java: "O(n)",
        python: "O(n)",
    },
    spaceComplexity: {
        cpp: "O(n)",
        java: "O(n)",
        python: "O(n)",
    },
    
  },

  mergeTwoLists: {
    title: "5. Merge Two Sorted Lists",
    description:
      "Merge two sorted linked lists and return it as a sorted list. The list should be made by splicing together the nodes of the first two lists.",
    examples: [
      { input: "[1,2,4], [1,3,4]", output: "[1,1,2,3,4,4]" },
      { input: "[], []", output: "[]" },
      { input: "[], [0]", output: "[0]" },
    ],
    solution: {
      cpp: `
class Solution {
public:
    ListNode* mergeTwoLists(ListNode* l1, ListNode* l2) {
        if (!l1) return l2;
        if (!l2) return l1;
        if (l1->val < l2->val) {
            l1->next = mergeTwoLists(l1->next, l2);
            return l1;
        } else {
            l2->next = mergeTwoLists(l1, l2->next);
            return l2;
        }
    }
};`,
      java: `
public class Solution {
    public ListNode mergeTwoLists(ListNode l1, ListNode l2) {
        if (l1 == null) return l2;
        if (l2 == null) return l1;
        if (l1.val < l2.val) {
            l1.next = mergeTwoLists(l1.next, l2);
            return l1;
        } else {
            l2.next = mergeTwoLists(l1, l2.next);
            return l2;
        }
    }
};`,
      python: `
class Solution:
    def mergeTwoLists(self, l1: ListNode, l2: ListNode) -> ListNode:
        if not l1:
            return l2
        if not l2:
            return l1
        if l1.val < l2.val:
            l1.next = self.mergeTwoLists(l1.next, l2)
            return l1
        else:
            l2.next = self.mergeTwoLists(l1, l2.next)
            return l2`,
    },
    timeComplexity: {
        cpp: "O(n + m)",
        java: "O(n + m)",
        python: "O(n + m)",
    },
    spaceComplexity: {
        cpp: "O(1)",
        java: "O(1)",
        python: "O(1)",
    },
    
  },

  nextPermutation: {
    title: "6. Next Permutation",
    description:
      "Implement next permutation which rearranges numbers into the lexicographically next greater permutation of numbers.",
    examples: [
      { input: "[1,2,3]", output: "[1,3,2]" },
      { input: "[3,2,1]", output: "[1,2,3]" },
      { input: "[1,5]", output: "[5,1]" },
      { input: "[5]", output: "[5]" },
    ],
    solution: {
      cpp: `
class Solution {
public:
    void nextPermutation(vector<int>& nums) {
        next_permutation(nums.begin(), nums.end());
    }
};`,
      java: `
import java.util.Arrays;
public class Solution {
    public void nextPermutation(int[] nums) {
        int i = nums.length - 2;
        while (i >= 0 && nums[i] >= nums[i + 1]) i--;
        if (i >= 0) {
            int j = nums.length - 1;
            while (nums[j] <= nums[i]) j--;
            swap(nums, i, j);
        }
        reverse(nums, i + 1);
    }

    private void swap(int[] nums, int i, int j) {
        int temp = nums[i];
        nums[i] = nums[j];
        nums[j] = temp;
    }

    private void reverse(int[] nums, int start) {
        int i = start, j = nums.length - 1;
        while (i < j) {
            swap(nums, i++, j--);
        }
    }
};`,
      python: `
class Solution:
    def nextPermutation(self, nums: List[int]) -> None:
        i = len(nums) - 2
        while i >= 0 and nums[i] >= nums[i + 1]:
            i -= 1
        if i >= 0:
            j = len(nums) - 1
            while nums[j] <= nums[i]:
                j -= 1
            nums[i], nums[j] = nums[j], nums[i]
        nums[i + 1:] = nums[i + 1:][::-1]`,
    },
    timeComplexity: {
    cpp: "O(n)",
    java: "O(n)",
    python: "O(n)",
},
spaceComplexity: {
    cpp: "O(1)",
    java: "O(1)",
    python: "O(1)",
},

  },
  searchInsert: {
    title: "7. Search Insert Position",
    description:
      "Given a sorted array of distinct integers and a target value, return the index if the target is found. If not, return the index where it would be if it were inserted in order. You must write an algorithm with O(log n) runtime complexity.",
    examples: [
      { input: "[1,3,5,6], target=5", output: "2" },
      { input: "[1,3], target=0", output: "0" },
      { input: "[3], target=4", output: "1" },
    ],
    solution: {
      cpp: `
class Solution {
public:
    int searchInsert(vector<int>& nums, int target) {
        int low = 0, high = nums.size() - 1;
        while (low <= high) {
            int mid = low + (high - low) / 2;
            if (nums[mid] == target) return mid;
            else if (nums[mid] > target) high = mid - 1;
            else low = mid + 1;
        }
        return low;
    }
};`,
      java: `
class Solution {
    public int searchInsert(int[] nums, int target) {
        int low = 0, high = nums.length - 1;
        while (low <= high) {
            int mid = low + (high - low) / 2;
            if (nums[mid] == target) return mid;
            else if (nums[mid] > target) high = mid - 1;
            else low = mid + 1;
        }
        return low;
    }
};`,
      python: `
class Solution:
    def searchInsert(self, nums: List[int], target: int) -> int:
        low, high = 0, len(nums) - 1
        while low <= high:
            mid = (low + high) // 2
            if nums[mid] == target:
                return mid
            elif nums[mid] > target:
                high = mid - 1
            else:
                low = mid + 1
        return low`,
    },
    timeComplexity: {
        cpp: "O(log n)",
        java: "O(log n)",
        python: "O(log n)",
    },
    spaceComplexity: {
        cpp: "O(1)",
        java: "O(1)",
        python: "O(1)",
    },
    
  },

  isValidSudoku: {
    title: "8. Valid Sudoku",
    description:
      "Determine if a 9 x 9 Sudoku board is valid by checking that each row, column, and 3 x 3 sub-box contains the digits 1-9 without repetition. The board may be partially filled, with empty cells represented by the character '.'. A board is considered valid if it adheres to these rules.",
    examples: [
      {
        input: `[['5','3','.','.','7','.','.','.','.'],['6','.','.','1','9','5','.','.','.'],['.','9','8','.','.','.','.','6','.'],['8','.','.','.','6','.','.','.','3'],['4','.','.','8','.','3','.','.','1'],['7','.','.','.','2','.','.','.','6'],['.','6','.','.','.','.','2','8','.'],['.','.' ,'.' ,'4' ,'1' ,'9' ,'.' ,'.' ,'5'],['.' ,'.' ,'.' ,'.' ,'8' ,'.' ,'.' ,'7' ,'9']]`,
        output: "true",
      },
      {
        input: `[['8','3','.','.','7','.','.','.','.'],['6','.','.','1','9','5','.','.','.'],['.','9','8','.','.','.','.','6', '.'],['8', '.', '.', '.', '6', '.', '.', '.', '3'],['4', '.', '.', '8', '.', '3', '.', '.', '1'],['7', '.', '.', '.', '2', '.', '.', '.', '6'],['.', '6', '.', '.', '.', '.', '2', '8', '.'],['.', '.', '.', '4', '1', '9', '.', '.', '5'],['.', '.', '.', '.', '8', '.', '.', '7', '9']]`,
        output: "false",
      },
    ],
    solution: {
      cpp: `
  class Solution {
  public:
    bool isValidSudoku(vector<vector<char>>& board) {
      vector<set<int>> rows(9), cols(9), blocks(9);
      for(int i=0; i<9; i++) {
        for(int j=0; j<9; j++) {
          if(board[i][j]=='.') continue;
          int curr = board[i][j]-'0';
          if(rows[i].count(curr) || cols[j].count(curr) || blocks[(i/3)*3+j/3].count(curr)) return false;
          rows[i].insert(curr);
          cols[j].insert(curr);
          blocks[(i/3)*3+j/3].insert(curr);
        }
      }
      return true;
    }
  };`,
      java: `
  class Solution {
    public boolean isValidSudoku(char[][] board) {
      HashSet<String> seen = new HashSet<>();
      for (int r = 0; r < 9; r++) {
        for (int c = 0; c < 9; c++) {
          if (board[r][c] != '.') {
            String num = String.valueOf(board[r][c]);
            if (!seen.add(num + " in row " + r) || !seen.add(num + " in column " + c) || 
                !seen.add(num + " in block " + r / 3 + "-" + c / 3)) return false;
          }
        }
      }
      return true;
    }
  };`,
      python: `
  class Solution:
    def isValidSudoku(self, board: List[List[str]]) -> bool:
      rows, cols, blocks = [set() for _ in range(9)], [set() for _ in range(9)], [set() for _ in range(9)]
      for i in range(9):
        for j in range(9):
          if board[i][j] == '.': continue
          curr = board[i][j]
          if (curr in rows[i] or curr in cols[j] or curr in blocks[(i//3)*3+j//3]):
            return False
          rows[i].add(curr)
          cols[j].add(curr)
          blocks[(i//3)*3+j//3].add(curr)
      return True`,
    },
    timeComplexity: {
        cpp: "O(1)",
        java: "O(1)",
        python: "O(1)",
    },
    spaceComplexity: {
        cpp: "O(1)",
        java: "O(1)",
        python: "O(1)",
    },
    
  },

  firstMissingPositive: {
    title: "9. First Missing Positive",
    description:
      "Given an unsorted integer array nums, return the smallest missing positive integer.",
    examples: [
      { input: "[1,2,0]", output: "3" },
      { input: "[3,4,-1,1]", output: "2" },
      { input: "[7,8,9,11,12]", output: "1" },
    ],
    solution: {
      cpp: `
  class Solution {
  public:
    int firstMissingPositive(vector<int>& nums) {
      int n = nums.size();
      vector<bool> present(n + 1, false);
      for (int num : nums) {
        if (num > 0 && num <= n) present[num] = true;
      }
      for (int i = 1; i <= n; i++) {
        if (!present[i]) return i;
      }
      return n + 1;
    }
  };`,
      java: `
  class Solution {
    public int firstMissingPositive(int[] nums) {
      int n = nums.length;
      boolean[] present = new boolean[n + 1];
      for (int num : nums) {
        if (num > 0 && num <= n) present[num] = true;
      }
      for (int i = 1; i <= n; i++) {
        if (!present[i]) return i;
      }
      return n + 1;
    }
  };`,
      python: `
  class Solution:
    def firstMissingPositive(self, nums: List[int]) -> int:
      n = len(nums)
      present = [False] * (n + 1)
      for num in nums:
        if 1 <= num <= n:
          present[num] = True
      for i in range(1, n + 1):
        if not present[i]: return i
      return n + 1`,
    },
  },

  maxSubArray: {
    title: "10. Maximum Subarray",
    description:
      "Given an integer array nums, find the contiguous subarray which has the largest sum and return its sum.",
    examples: [
      { input: "[-2,1,-3,4,-1,2,1,-5,4]", output: "6" },
      { input: "[1]", output: "1" },
      { input: "[5,4,-1,7,8]", output: "23" },
    ],
    solution: {
      cpp: `
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
      java: `
  class Solution {
    public int maxSubArray(int[] nums) {
      int maxSum = nums[0], currSum = nums[0];
      for (int i = 1; i < nums.length; i++) {
        currSum = Math.max(nums[i], currSum + nums[i]);
        maxSum = Math.max(maxSum, currSum);
      }
      return maxSum;
    }
  };`,
      python: `
  class Solution:
    def maxSubArray(self, nums: List[int]) -> int:
      max_sum = nums[0]
      curr_sum = nums[0]
      for num in nums[1:]:
        curr_sum = max(num, curr_sum + num)
        max_sum = max(max_sum, curr_sum)
      return max_sum`,
    },
  },
  mySqrt: {
    title: "11. Sqrt(x)",
    description:
      "Given a non-negative integer x, compute and return the square root of x.",
    examples: [
      { input: "4", output: "2" },
      { input: "8", output: "2" },
      { input: "16", output: "4" },
    ],
    solution: {
      cpp: `
class Solution {
public:
    int mySqrt(int x) {
        if (x < 2) return x;
        long long int res;
        long long int start = 1, end = x / 2;
        while (start <= end) {
            long long int mid = start + (end - start) / 2;
            if (mid * mid == x) return mid;
            else if (mid * mid < x) {
                start = mid + 1; res = mid;
            } else end = mid - 1;
        }
        return res;
    }
};`,
      java: `
class Solution {
    public int mySqrt(int x) {
        if (x < 2) return x;
        long res = 0;
        long start = 1, end = x / 2;
        while (start <= end) {
            long mid = start + (end - start) / 2;
            if (mid * mid == x) return (int) mid;
            else if (mid * mid < x) {
                start = mid + 1; res = mid;
            } else end = mid - 1;
        }
        return (int) res;
    }
};`,
      python: `
class Solution:
    def mySqrt(self, x: int) -> int:
        if x < 2: return x
        start, end, res = 1, x // 2, 0
        while start <= end:
            mid = start + (end - start) // 2
            if mid * mid == x: return mid
            elif mid * mid < x:
                start = mid + 1; res = mid
            else: end = mid - 1
        return res
    `,
    },
  },

  searchMatrix: {
    title: "12. Search a 2D Matrix",
    description:
      "Write an efficient algorithm that searches for a value in an m x n matrix.",
    examples: [
      {
        input: "[[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 3",
        output: "true",
      },
      { input: "[[1,3,5],[10],[23]], target = 13", output: "false" },
    ],
    solution: {
      cpp: `
class Solution {
public:
    bool searchMatrix(vector<vector<int>>& matrix, int target) {
        if (!matrix.size()) return false;
        int n = matrix.size(), m = matrix[0].size(), low = 0, high = (n * m) - 1;
        while (low <= high) {
            int mid = (low + (high - low) / 2);
            if (matrix[mid / m][mid % m] == target) return true;
            if (matrix[mid / m][mid % m] < target) low = mid + 1;
            else high = mid - 1;
        }
        return false;
    }
};`,
      java: `
class Solution {
    public boolean searchMatrix(int[][] matrix, int target) {
        if (matrix.length == 0) return false;
        int n = matrix.length, m = matrix[0].length, low = 0, high = (n * m) - 1;
        while (low <= high) {
            int mid = (low + (high - low) / 2);
            if (matrix[mid / m][mid % m] == target) return true;
            if (matrix[mid / m][mid % m] < target) low = mid + 1;
            else high = mid - 1;
        }
        return false;
    }
};`,
      python: `
class Solution:
    def searchMatrix(self, matrix: List[List[int]], target: int) -> bool:
        if not matrix: return False
        n, m = len(matrix), len(matrix[0])
        low, high = 0, (n * m) - 1
        while low <= high:
            mid = (low + (high - low) // 2)
            if matrix[mid // m][mid % m] == target: return True
            if matrix[mid // m][mid % m] < target: low = mid + 1
            else: high = mid - 1
        return False
    `,
    },
  },

  deleteDuplicates: {
    title: "13. Remove Duplicates from Sorted List",
    description:
      "Given the head of a sorted linked list, delete all duplicates such that each element appears only once.",
    examples: [
      { input: "[1,1,2]", output: "[1,2]" },
      { input: "[1,1,2,3,3]", output: "[1,2,3]" },
    ],
    solution: {
      cpp: `
class Solution {
public:
    ListNode* deleteDuplicates(ListNode* head) {
        if(head == NULL) return NULL;
        ListNode* curr = head;
        while(curr->next) {
            if(curr->val == curr->next->val)
                curr->next = curr->next->next;
            else curr = curr->next;
        }
        return head;
    }
};`,
      java: `
class Solution {
    public ListNode deleteDuplicates(ListNode head) {
        if (head == null) return null;
        ListNode curr = head;
        while (curr.next != null) {
            if (curr.val == curr.next.val)
                curr.next = curr.next.next;
            else curr = curr.next;
        }
        return head;
    }
};`,
      python: `
class Solution:
    def deleteDuplicates(self, head: ListNode) -> ListNode:
        if head is None: return None
        curr = head
        while curr.next:
            if curr.val == curr.next.val:
                curr.next = curr.next.next
            else: curr = curr.next
        return head
    `,
    },
  },

  mergeTwoSortedLists: {
    title: "14. Merge Two Sorted Lists",
    description:
      "You are given two integer arrays nums1 and nums2, sorted in non-decreasing order, and two integers m and n, representing the number of elements in nums1 and nums2 respectively. Merge nums1 and nums2 into a single array sorted in non-decreasing order.",
    examples: [
      {
        input: "[1,2,4,0,0,0], m = 3, nums2 = [2,5,6], n = 3",
        output: "[1,2,2,3,5,6]",
      },
      { input: "[1], m = 1, nums2 = [], n = 0", output: "[1]" },
    ],
    solution: {
      cpp: `
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
      java: `
class Solution {
    public void merge(int[] nums1, int m, int[] nums2, int n) {
        int i = 0;
        while (i < n) {
            nums1[m++] = nums2[i];
            i++;
        }
        Arrays.sort(nums1);
    }
};`,
      python: `
class Solution:
    def merge(self, nums1: List[int], m: int, nums2: List[int], n: int) -> None:
        i = 0
        while i < n:
            nums1[m] = nums2[i]
            m += 1
            i += 1
        nums1.sort()
    `,
    },
  },
  inorderTraversal: {
    title: "15. Binary Tree Inorder Traversal",
    description:
      "Given the root of a binary tree, return the inorder traversal of its nodes' values.",
    examples: [
      { input: "[1,null,2,3]", output: "[1,3,2]" },
      { input: "[]", output: "[]" },
      { input: "[1]", output: "[1]" },
    ],
    solution: {
      cpp: `
class Solution {
public:
    vector<int> ans;
    vector<int> inorderTraversal(TreeNode* root) {
        if (root == NULL) return ans;
        inorderTraversal(root->left);
        ans.push_back(root->val);
        inorderTraversal(root->right);
        return ans;
    }
};`,
      java: `
class Solution {
    public List<Integer> inorderTraversal(TreeNode root) {
        List<Integer> ans = new ArrayList<>();
        inorderTraversalHelper(root, ans);
        return ans;
    }
    private void inorderTraversalHelper(TreeNode root, List<Integer> ans) {
        if (root == null) return;
        inorderTraversalHelper(root.left, ans);
        ans.add(root.val);
        inorderTraversalHelper(root.right, ans);
    }
};`,
      python: `
class Solution:
    def inorderTraversal(self, root: TreeNode) -> List[int]:
        ans = []
        def inorder(node):
            if not node: return
            inorder(node.left)
            ans.append(node.val)
            inorder(node.right)
        inorder(root)
        return ans
    `,
    },
  },

  isSymmetric: {
    title: "16. Symmetric Tree",
    description:
      "Given the root of a binary tree, check whether it is a mirror of itself (i.e., symmetric around its center).",
    examples: [
      { input: "[1,2,2,3,4,4,3]", output: "true" },
      { input: "[1,2,2,null,3,null,3]", output: "false" },
    ],
    solution: {
      cpp: `
class Solution {
public:
    bool isSymmetric(TreeNode* root) {
        if (root == NULL) return true;
        return isSymmetricTest(root->left, root->right);
    }
    bool isSymmetricTest(TreeNode* p, TreeNode* q) {
        if (p == NULL && q == NULL) return true;
        else if (p == NULL || q == NULL) return false;
        else if (p->val != q->val) return false;
        return isSymmetricTest(p->left, q->right) && isSymmetricTest(p->right, q->left);
    }
};`,
      java: `
class Solution {
    public boolean isSymmetric(TreeNode root) {
        if (root == null) return true;
        return isSymmetricTest(root.left, root.right);
    }
    private boolean isSymmetricTest(TreeNode p, TreeNode q) {
        if (p == null && q == null) return true;
        else if (p == null || q == null) return false;
        else if (p.val != q.val) return false;
        return isSymmetricTest(p.left, q.right) && isSymmetricTest(p.right, q.left);
    }
};`,
      python: `
class Solution:
    def isSymmetric(self, root: TreeNode) -> bool:
        if not root: return True
        return self.isSymmetricTest(root.left, root.right)
    def isSymmetricTest(self, p: TreeNode, q: TreeNode) -> bool:
        if not p and not q: return True
        if not p or not q: return False
        if p.val != q.val: return False
        return self.isSymmetricTest(p.left, q.right) and self.isSymmetricTest(p.right, q.left)
    `,
    },
  },

  levelOrderTraversal: {
    title: "17. Binary Tree Level Order Traversal",
    description:
      "Given the root of a binary tree, return the level order traversal of its nodes' values.",
    examples: [
      { input: "[3,9,20,null,null,15,7]", output: "[[3],[9,20],[15,7]]" },
      { input: "[1]", output: "[[1]]" },
      { input: "[]", output: "[]" },
    ],
    solution: {
      cpp: `
class Solution {
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
                if (node->left != NULL) q.push(node->left);
                if (node->right != NULL) q.push(node->right);
                level.push_back(node->val);
            }
            ans.push_back(level);
        }
        return ans;
    }
};`,
      java: `
class Solution {
    public List<List<Integer>> levelOrder(TreeNode root) {
        List<List<Integer>> ans = new ArrayList<>();
        if (root == null) return ans;

        Queue<TreeNode> q = new LinkedList<>();
        q.offer(root);
        while (!q.isEmpty()) {
            int size = q.size();
            List<Integer> level = new ArrayList<>();
            for (int i = 0; i < size; i++) {
                TreeNode node = q.poll();
                if (node.left != null) q.offer(node.left);
                if (node.right != null) q.offer(node.right);
                level.add(node.val);
            }
            ans.add(level);
        }
        return ans;
    }
};`,
      python: `
class Solution:
    def levelOrder(self, root: TreeNode) -> List[List[int]]:
        ans = []
        if not root: return ans
        q = collections.deque([root])
        while q:
            size = len(q)
            level = []
            for _ in range(size):
                node = q.popleft()
                if node.left: q.append(node.left)
                if node.right: q.append(node.right)
                level.append(node.val)
            ans.append(level)
        return ans
    `,
    },
  },

  maxDepthBinaryTree: {
    title: "18. Maximum Depth of Binary Tree",
    description: "Given the root of a binary tree, return its maximum depth.",
    examples: [
      { input: "[3,9,20,null,null,15,7]", output: "3" },
      { input: "[1,null,2]", output: "2" },
      { input: "[]", output: "0" },
    ],
    solution: {
      cpp: `
class Solution {
public:
    int maxDepth(TreeNode* root) {
        if (root == NULL) return 0;
        int leftDepth = maxDepth(root->left);
        int rightDepth = maxDepth(root->right);
        return max(leftDepth, rightDepth) + 1;
    }
};`,
      java: `
class Solution {
    public int maxDepth(TreeNode root) {
        if (root == null) return 0;
        int leftDepth = maxDepth(root.left);
        int rightDepth = maxDepth(root.right);
        return Math.max(leftDepth, rightDepth) + 1;
    }
};`,
      python: `
class Solution:
    def maxDepth(self, root: TreeNode) -> int:
        if not root: return 0
        leftDepth = self.maxDepth(root.left)
        rightDepth = self.maxDepth(root.right)
        return max(leftDepth, rightDepth) + 1
    `,
    },
  },
  hasPathSum: {
    title: "19. Path Sum",
    description:
      "Given the root of a binary tree and an integer targetSum, return true if the tree has a root-to-leaf path such that adding up all the values along the path equals targetSum. A leaf is a node with no children.",
    examples: [
      { input: "[5,4,8,11,null,13,4], targetSum = 22", output: "true" },
      { input: "[1], targetSum = 5", output: "false" },
    ],
    solution: {
      cpp: `
class Solution {
public:
    bool hasPathSum(TreeNode* root, int sum) {
        if (root == NULL)
            return false;

        if (root->left == NULL && root->right == NULL)
            return sum == root->val;

        return hasPathSum(root->left, sum - root->val) || hasPathSum(root->right, sum - root->val);
    }
};`,
      java: `
class Solution {
    public boolean hasPathSum(TreeNode root, int sum) {
        if (root == null)
            return false;

        if (root.left == null && root.right == null)
            return sum == root.val;

        return hasPathSum(root.left, sum - root.val) || hasPathSum(root.right, sum - root.val);
    }
};`,
      python: `
class Solution:
    def hasPathSum(self, root: TreeNode, sum: int) -> bool:
        if not root:
            return False
        
        if not root.left and not root.right:
            return sum == root.val
        
        return self.hasPathSum(root.left, sum - root.val) or self.hasPathSum(root.right, sum - root.val)
    `,
    },
  },

  generatePascalTriangle: {
    title: "20. Pascal's Triangle",
    description:
      "Given an integer numRows, return a string that concatenates the elements of the first numRows of Pascal's triangle in a single line.",
    examples: [
      { input: "5", output: [[1], [1, 1], [1, 2, 1], [1, 3, 3], [1, 4, 6]] },
      { input: "1", output: [[1]] },
    ],
    solution: {
      cpp: `
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
      java: `
class Solution {
    public List<List<Integer>> generate(int numRows) {
        List<List<Integer>> res = new ArrayList<>();

        for (int i = 0; i < numRows; i++) {
            List<Integer> row = new ArrayList<>(Collections.nCopies(i + 1, 0));
            row.set(0, 1);
            row.set(i, 1);

            for (int j = 1; j < i; j++) {
                row.set(j, res.get(i - 1).get(j - 1) + res.get(i - 1).get(j));
            }
            res.add(row);
        }
        return res;
    }
};`,
      python: `
class Solution:
    def generate(self, numRows: int) -> List[List[int]]:
        res = []

        for i in range(numRows):
            row = [1] * (i + 1)
            for j in range(1, i):
                row[j] = res[i - 1][j - 1] + res[i - 1][j]
            res.append(row)
        
        return res
    `,
    },
  },

  maxProfit: {
    title: "21. Best Time to Buy and Sell Stock",
    description:
      "You are given an array prices where prices[i] represents the price of a given stock on the i-th day.You want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock.Return the maximum profit you can achieve from this transaction. If no profit can be made, return 0.",
    examples: [
      { input: "[7,1,5,3,6,4]", output: "5" },
      { input: "[7,6,4,3,1]", output: "0" },
    ],
    solution: {
      cpp: `
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
      java: `
class Solution {
    public int maxProfit(int[] prices) {
        int minm = Integer.MAX_VALUE;
        int result = 0;

        for (int price : prices) {
            minm = Math.min(minm, price);
            result = Math.max(result, price - minm);
        }
        return result;
    }
};`,
      python: `
class Solution:
    def maxProfit(self, prices: List[int]) -> int:
        minm = float('inf')
        result = 0

        for price in prices:
            minm = min(minm, price)
            result = max(result, price - minm)
        
        return result
    `,
    },
  },

  hasCycle: {
    title: "22. Linked List Cycle",
    description:
      "Given the head of a linked list, determine if the linked list has a cycle in it.",
    examples: [
      { input: "[3,2,0,-4], pos=1", output: "true" },
      { input: "[1,2], pos=0", output: "true" },
      { input: "[1], pos=-1", output: "false" },
    ],
    solution: {
      cpp: `
class Solution {
public:
    bool hasCycle(ListNode *head) {
        if (head == NULL || head->next == NULL)
            return false;

        ListNode *slow = head;
        ListNode *fast = head;

        while (fast->next != NULL && fast->next->next != NULL) {
            fast = fast->next->next;
            slow = slow->next;

            if (fast == slow)
                return true;
        }

        return false;
    }
};`,
      java: `
class Solution {
    public boolean hasCycle(ListNode head) {
        if (head == null || head.next == null)
            return false;

        ListNode slow = head;
        ListNode fast = head;

        while (fast.next != null && fast.next.next != null) {
            slow = slow.next;
            fast = fast.next.next;

            if (slow == fast)
                return true;
        }

        return false;
    }
};`,
      python: `
class Solution:
    def hasCycle(self, head: ListNode) -> bool:
        if not head or not head.next:
            return False
        
        slow = head
        fast = head

        while fast and fast.next:
            slow = slow.next
            fast = fast.next.next

            if slow == fast:
                return True

        return False
    `,
    },
  },
  preorderTraversal: {
    title: "23. Binary Tree Preorder Traversal",
    description:
      "Given the root of a binary tree, return the preorder traversal of its nodes' values.",
    examples: [
      { input: "[1,null,2,3]", output: "[1,2,3]" },
      { input: "[]", output: "[]" },
      { input: "[1]", output: "[1]" },
      { input: "[1,2]", output: "[1,2]" },
      { input: "[1,null,2]", output: "[1,2]" },
    ],
    solution: {
      cpp: `
  class Solution {
  public:
      vector<int> ans;
      vector<int> preorderTraversal(TreeNode* root) {
          if (root == NULL)
              return ans;
  
          ans.push_back(root->val);
          preorderTraversal(root->left);
          preorderTraversal(root->right);
  
          return ans;
      }
  };`,

      java: `
  import java.util.*;
  
  class Solution {
      public List<Integer> preorderTraversal(TreeNode root) {
          List<Integer> result = new ArrayList<>();
          preorder(root, result);
          return result;
      }
  
      private void preorder(TreeNode node, List<Integer> result) {
          if (node == null) return;
          result.add(node.val);
          preorder(node.left, result);
          preorder(node.right, result);
      }
  };`,

      python: `
  class Solution:
      def preorderTraversal(self, root: TreeNode) -> List[int]:
          result = []
          self.preorder(root, result)
          return result
  
      def preorder(self, node: TreeNode, result: List[int]) -> None:
          if not node:
              return
          result.append(node.val)
          self.preorder(node.left, result)
          self.preorder(node.right, result)
      `,
    },
  },

  postorderTraversal: {
    title: "24. Binary Tree Postorder Traversal",
    description:
      "Given the root of a binary tree, return the postorder traversal of its nodes' values.",
    examples: [
      { input: "[1,null,2,3]", output: "[3,2,1]" },
      { input: "[]", output: "[]" },
      { input: "[1]", output: "[1]" },
      { input: "[1,2]", output: "[2,1]" },
      { input: "[1,null,2]", output: "[2,1]" },
    ],
    solution: {
      cpp: `
  class Solution {
  public:
      vector<int> ans;
      vector<int> postorderTraversal(TreeNode* root) {
          if (root == NULL)
              return ans;
  
          postorderTraversal(root->left);
          postorderTraversal(root->right);
          ans.push_back(root->val);
  
          return ans;
      }
  };`,

      java: `
  import java.util.*;
  
  class Solution {
      public List<Integer> postorderTraversal(TreeNode root) {
          List<Integer> result = new ArrayList<>();
          postorder(root, result);
          return result;
      }
  
      private void postorder(TreeNode node, List<Integer> result) {
          if (node == null) return;
          postorder(node.left, result);
          postorder(node.right, result);
          result.add(node.val);
      }
  };`,

      python: `
  class Solution:
      def postorderTraversal(self, root: TreeNode) -> List[int]:
          result = []
          self.postorder(root, result)
          return result
  
      def postorder(self, node: TreeNode, result: List[int]) -> None:
          if not node:
              return
          self.postorder(node.left, result)
          self.postorder(node.right, result)
          result.append(node.val)
      `,
    },
  },

  removeElements: {
    title: "25. Remove Linked List Elements",
    description:
      "Given the head of a linked list and an integer val, remove all the nodes of the linked list that have Node.val equal to val, and return the new head.",
    examples: [
      { input: "[1,2,6,3,4,5,6], val=6", output: "[1,2,3,4,5]" },
      { input: "[], val=1", output: "[]" },
      { input: "[7,7,7,7], val=7", output: "[]" },
    ],
    solution: {
      cpp: `
  class Solution {
  public:
      ListNode* removeElements(ListNode* head, int val) {
          if (head == NULL)
              return head;
          if (head->val == val)
              return removeElements(head->next, val);
          head->next = removeElements(head->next, val);
          return head;
      }
  };`,

      java: `
  class Solution {
      public ListNode removeElements(ListNode head, int val) {
          if (head == null) return null;
          if (head.val == val) return removeElements(head.next, val);
          head.next = removeElements(head.next, val);
          return head;
      }
  };`,

      python: `
  class Solution:
      def removeElements(self, head: ListNode, val: int) -> ListNode:
          if not head:
              return None
          if head.val == val:
              return self.removeElements(head.next, val)
          head.next = self.removeElements(head.next, val)
          return head
      `,
    },
  },

  reverseList: {
    title: "26. Reverse Linked List",
    description:
      "Given the head of a singly linked list, reverse the list, and return the reversed list.",
    examples: [
      { input: "[1,2,3,4,5]", output: "[5,4,3,2,1]" },
      { input: "[1,2]", output: "[2,1]" },
      { input: "[]", output: "[]" },
    ],
    solution: {
      cpp: `
  class Solution {
  public:
      ListNode* reverseList(ListNode* head) {
          vector<int> res;
          ListNode* temp = head;
          while (temp) {
              res.push_back(temp->val);
              temp = temp->next;
          }
  
          temp = head;
          for (int i = res.size() - 1; i >= 0; i--) {
              temp->val = res[i];
              temp = temp->next;
          }
          return head;
      }
  };`,

      java: `
  class Solution {
      public ListNode reverseList(ListNode head) {
          List<Integer> values = new ArrayList<>();
          ListNode temp = head;
          while (temp != null) {
              values.add(temp.val);
              temp = temp.next;
          }
  
          temp = head;
          for (int i = values.size() - 1; i >= 0; i--) {
              temp.val = values.get(i);
              temp = temp.next;
          }
  
          return head;
      }
  };`,

      python: `
  class Solution:
      def reverseList(self, head: ListNode) -> ListNode:
          values = []
          current = head
          while current:
              values.append(current.val)
              current = current.next
  
          current = head
          for val in reversed(values):
              current.val = val
              current = current.next
  
          return head
      `,
    },
  },

  findKthLargest: {
    title: "27. Kth Largest Element in an Array",
    description:
      "Given an integer array nums and an integer k, return the kth largest element in the array.",
    examples: [
      { input: "[3,2,1,5,6,4], k = 2", output: "5" },
      { input: "[3,2,3,1,2,4,5,5,6], k = 4", output: "4" },
    ],
    solution: {
      cpp: `
  class Solution {
  public:
      int findKthLargest(vector<int>& nums, int k) {
          sort(nums.begin(), nums.end());
          return nums[nums.size() - k];
      }
  };`,

      java: `
  import java.util.*;
  
  class Solution {
      public int findKthLargest(int[] nums, int k) {
          Arrays.sort(nums);
          return nums[nums.length - k];
      }
  };`,

      python: `
  class Solution:
      def findKthLargest(self, nums: List[int], k: int) -> int:
          nums.sort()
          return nums[-k]
      `,
    },
  },

  containsDuplicate: {
    title: "28. Contains Duplicate",
    description:
      "Given an integer array nums, return true if any value appears at least twice in the array.",
    examples: [
      { input: "[1,2,3,1]", output: "true" },
      { input: "[1,2,3,4]", output: "false" },
      { input: "[1,1,1,3,3,4,3,2,4,2]", output: "true" },
    ],
    solution: {
      cpp: `
  class Solution {
  public:
      bool containsDuplicate(vector<int>& nums) {
          return (nums.size() > unordered_set<int>(nums.begin(), nums.end()).size());
      }
  };`,

      java: `
  import java.util.*;
  
  class Solution {
      public boolean containsDuplicate(int[] nums) {
          Set<Integer> numSet = new HashSet<>();
          for (int num : nums) {
              if (!numSet.add(num)) return true;
          }
          return false;
      }
  };`,

      python: `
  class Solution:
      def containsDuplicate(self, nums: List[int]) -> bool:
          return len(nums) > len(set(nums))
      `,
    },
  },

  invertBinaryTree: {
    title: "29. Invert Binary Tree",
    description:
      "Given the root of a binary tree, invert the tree and return its root.",
    examples: [
      { input: "[4,2,7,1,3,6,9]", output: "[4,7,2,9,6,3,1]" },
      { input: "[2,1,3]", output: "[2,3,1]" },
      { input: "[]", output: "[]" },
    ],
    solution: {
      cpp: `
  class Solution {
  public:
      TreeNode* invertTree(TreeNode* root) {
          if (root) {
              invertTree(root->left);
              invertTree(root->right);
              swap(root->left, root->right);
          }
          return root;
      }
  };`,

      java: `
  class Solution {
      public TreeNode invertTree(TreeNode root) {
          if (root == null) return null;
          TreeNode left = invertTree(root.left);
          TreeNode right = invertTree(root.right);
          root.left = right;
          root.right = left;
          return root;
      }
  };`,

      python: `
  class Solution:
      def invertTree(self, root: TreeNode) -> TreeNode:
          if root is None:
              return None
          root.left, root.right = self.invertTree(root.right), self.invertTree(root.left)
          return root
      `,
    },
  },

  MyQueue: {
    title: "30. Implement Queue using Stacks",
    description:
      "Implement a first-in-first-out (FIFO) queue using only two stacks.",
    examples: [
      {
        input: `["MyQueue", "push", "push", "peek", "pop", "empty"]`,
        output: `[null,null,null,1,1,false]`,
      },
    ],
    solution: {
      cpp: `
  class MyQueue {
  public:
      stack<int> s1, s2;
  
      MyQueue() {}
  
      void push(int x) {
          while (!s1.empty()) {
              s2.push(s1.top());
              s1.pop();
          }
          s2.push(x);
          while (!s2.empty()) {
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

      java: `
  import java.util.Stack;
  
  class MyQueue {
      private Stack<Integer> s1;
      private Stack<Integer> s2;
  
      public MyQueue() {
          s1 = new Stack<>();
          s2 = new Stack<>();
      }
  
      public void push(int x) {
          while (!s1.isEmpty()) {
              s2.push(s1.pop());
          }
          s2.push(x);
          while (!s2.isEmpty()) {
              s1.push(s2.pop());
          }
      }
  
      public int pop() {
          return s1.pop();
      }
  
      public int peek() {
          return s1.peek();
      }
  
      public boolean empty() {
          return s1.isEmpty();
      }
  };`,

      python: `
  class MyQueue:
  
      def __init__(self):
          self.s1 = []
          self.s2 = []
  
      def push(self, x: int) -> None:
          while self.s1:
              self.s2.append(self.s1.pop())
          self.s2.append(x)
          while self.s2:
              self.s1.append(self.s2.pop())
  
      def pop(self) -> int:
          return self.s1.pop()
  
      def peek(self) -> int:
          return self.s1[-1]
  
      def empty(self) -> bool:
          return not self.s1
      `,
    },
  },

  isAnagram: {
    title: "31. Valid Anagram",
    description:
      "Given two strings s and t, return true if t is an anagram of s, and false otherwise.",
    examples: [
      { input: "anagram, nagaram", output: "true" },
      { input: "rat, car", output: "false" },
    ],
    solution: {
      cpp: `
  class Solution {
  public:
      bool isAnagram(string s, string t) {
          if (s.length() != t.length())
              return false;
  
          int count[26] = {0};
          for (char ch : s)
              count[ch - 'a']++;
  
          for (char ch : t)
              count[ch - 'a']--;
  
          for (int i = 0; i < 26; i++) {
              if (count[i] != 0)
                  return false;
          }
  
          return true;
      }
  };`,

      java: `
  class Solution {
      public boolean isAnagram(String s, String t) {
          if (s.length() != t.length()) return false;
          int[] count = new int[26];
          for (char c : s.toCharArray()) count[c - 'a']++;
          for (char c : t.toCharArray()) {
              if (--count[c - 'a'] < 0) return false;
          }
          return true;
      }
  };`,

      python: `
  class Solution:
      def isAnagram(self, s: str, t: str) -> bool:
          if len(s) != len(t):
              return False
          count = [0] * 26
          for ch in s:
              count[ord(ch) - ord('a')] += 1
          for ch in t:
              count[ord(ch) - ord('a')] -= 1
          return all(c == 0 for c in count)
      `,
    },
  },

  missingNumber: {
    title: "32. Missing Number",
    description:
      "Given an array nums containing n distinct numbers in the range [0,n], return the only number in the range that is missing from the array.",
    examples: [
      { input: "[3, 0, 1]", output: "2" },
      { input: "[0, 1]", output: "2" },
    ],
    solution: {
      cpp: `
  class Solution {
  public:
      int missingNumber(vector<int>& nums) {
          int sum = 0;
          int n = nums.size();
  
          for (int i = 0; i < n; i++) {
              sum += nums[i];
          }
  
          return (n * (n + 1) / 2 - sum);
      }
  };`,

      java: `
  class Solution {
      public int missingNumber(int[] nums) {
          int sum = 0, n = nums.length;
          for (int num : nums) {
              sum += num;
          }
          return n * (n + 1) / 2 - sum;
      }
  };`,

      python: `
  class Solution:
      def missingNumber(self, nums: List[int]) -> int:
          n = len(nums)
          return n * (n + 1) // 2 - sum(nums)
      `,
    },
  },

  guessNumber: {
    title: "33. Guess Number Higher or Lower",
    description:
      "You are playing a Guess Game where you have to guess a number between 1 and n. Each time you guess wrong, the system will tell you whether the actual number is higher or lower.",
    examples: [
      { input: "n=10, pick=6", output: "6" },
      { input: "n=1, pick=1", output: "1" },
      { input: "n=2, pick=2", output: "2" },
    ],
    solution: {
      cpp: `
  class Solution {
  public:
      int guessNumber(int n) {
          int start = 1;
          int end = n;
  
          while (start <= end) {
              int mid = start + (end - start) / 2;
  
              if (guess(mid) == 0)
                  return mid;
              else if (guess(mid) < 0)
                  end = mid - 1;
              else
                  start = mid + 1;
          }
  
          return -1;
      }
  };`,

      java: `
  class Solution extends GuessGame {
      public int guessNumber(int n) {
          int start = 1, end = n;
  
          while (start <= end) {
              int mid = start + (end - start) / 2;
              int result = guess(mid);
              if (result == 0) return mid;
              else if (result < 0) end = mid - 1;
              else start = mid + 1;
          }
  
          return -1;
      }
  };`,

      python: `
  class Solution:
      def guessNumber(self, n: int) -> int:
          start, end = 1, n
          while start <= end:
              mid = (start + end) // 2
              res = guess(mid)
              if res == 0:
                  return mid
              elif res < 0:
                  end = mid - 1
              else:
                  start = mid + 1
      `,
    },
  },

  intersect: {
    title: "34. Intersection of Two Arrays II",
    description:
      "Given two integer arrays nums1 and nums2, return an array of their intersection. Each element in the result must appear as many times as it shows in both arrays, and you may return the result in any order.",
    examples: [
      { input: "[1, 2, 2, 1], [2, 2]", output: "[2, 2]" },
      { input: "[4, 9, 5], [9, 4, 9, 8, 4]", output: "[4, 9]" },
    ],
    solution: {
      cpp: `
  class Solution {
  public:
      vector<int> intersect(vector<int>& nums1, vector<int>& nums2) {
          vector<int> ans;
          sort(nums1.begin(), nums1.end());
          sort(nums2.begin(), nums2.end());
  
          int i = 0, j = 0;
          while (i < nums1.size() && j < nums2.size()) {
              if (nums1[i] < nums2[j]) {
                  i++;
              } else if (nums1[i] > nums2[j]) {
                  j++;
              } else {
                  ans.push_back(nums1[i]);
                  i++;
                  j++;
              }
          }
          return ans;
      }
  };`,

      java: `
  import java.util.Arrays;
  import java.util.ArrayList;
  
  class Solution {
      public int[] intersect(int[] nums1, int[] nums2) {
          Arrays.sort(nums1);
          Arrays.sort(nums2);
          ArrayList<Integer> result = new ArrayList<>();
          
          int i = 0, j = 0;
          while (i < nums1.length && j < nums2.length) {
              if (nums1[i] < nums2[j]) {
                  i++;
              } else if (nums1[i] > nums2[j]) {
                  j++;
              } else {
                  result.add(nums1[i]);
                  i++;
                  j++;
              }
          }
  
          return result.stream().mapToInt(k -> k).toArray();
      }
  };`,

      python: `
  class Solution:
      def intersect(self, nums1: List[int], nums2: List[int]) -> List[int]:
          nums1.sort()
          nums2.sort()
          result = []
          i = j = 0
          while i < len(nums1) and j < len(nums2):
              if nums1[i] < nums2[j]:
                  i += 1
              elif nums1[i] > nums2[j]:
                  j += 1
              else:
                  result.append(nums1[i])
                  i += 1
                  j += 1
          return result
      `,
    },
  },

  runningSum: {
    title: "35. Running Sum of 1d Array",
    description: "Given an array nums, return the running sum of nums.",
    examples: [
      { input: "[1, 2, 3, 4]", output: "[1, 3, 6, 10]" },
      { input: "[5]", output: "[5]" },
    ],
    solution: {
      cpp: `
  class Solution {
  public:
      vector<int> runningSum(vector<int>& nums) {
          for (int i = 1; i < nums.size(); i++) {
              nums[i] += nums[i - 1];
          }
          return nums;
      }
  };`,

      java: `
  class Solution {
      public int[] runningSum(int[] nums) {
          for (int i = 1; i < nums.length; i++) {
              nums[i] += nums[i - 1];
          }
          return nums;
      }
  };`,

      python: `
  class Solution:
      def runningSum(self, nums: List[int]) -> List[int]:
          for i in range(1, len(nums)):
              nums[i] += nums[i - 1]
          return nums
      `,
    },
  },

  shuffleString: {
    title: "36. Shuffle String",
    description:
      "Given a string s and an integer array indices of the same length as s, shuffle the string according to the indices array.",
    examples: [
      {
        input: `"codeleet", indices = [4, 5, 6, 7, 0, 2, 1, 3]`,
        output: `"leetcode"`,
      },
    ],
    solution: {
      cpp: `
  class Solution {
  public:
      string restoreString(string s, vector<int>& indices) {
          string res = s;
          for (int i = 0; i < indices.size(); i++) {
              res[indices[i]] = s[i];
          }
          return res;
      }
  };`,

      java: `
  class Solution {
      public String restoreString(String s, int[] indices) {
          char[] res = new char[s.length()];
          for (int i = 0; i < s.length(); i++) {
              res[indices[i]] = s.charAt(i);
          }
          return new String(res);
      }
  };`,

      python: `
  class Solution:
      def restoreString(self, s: str, indices: List[int]) -> str:
          res = [''] * len(s)
          for i, idx in enumerate(indices):
              res[idx] = s[i]
          return ''.join(res)
      `,
    },
  },

  maxLevelSum: {
    title: "37. Maximum Level Sum of a Binary Tree",
    description:
      "Given the root of a binary tree, return the level with the maximum sum.",
    examples: [{ input: "[1, 7, 0, 7, -8, null, null]", output: "2" }],
    solution: {
      cpp: `
  class Solution {
  public:
      int maxLevelSum(TreeNode* root) {
          if (!root) return 0;
          
          queue<TreeNode*> q;
          q.push(root);
          
          int maxSum = INT_MIN, level = 1, maxLevel = 1;
          
          while (!q.empty()) {
              int size = q.size();
              int levelSum = 0;
              
              for (int i = 0; i < size; i++) {
                  TreeNode* node = q.front();
                  q.pop();
                  levelSum += node->val;
                  
                  if (node->left) q.push(node->left);
                  if (node->right) q.push(node->right);
              }
              
              if (levelSum > maxSum) {
                  maxSum = levelSum;
                  maxLevel = level;
              }
              level++;
          }
          return maxLevel;
      }
  };`,

      java: `
  class Solution {
      public int maxLevelSum(TreeNode root) {
          if (root == null) return 0;
          
          Queue<TreeNode> queue = new LinkedList<>();
          queue.add(root);
          
          int level = 1, maxLevel = 1;
          int maxSum = Integer.MIN_VALUE;
          
          while (!queue.isEmpty()) {
              int size = queue.size();
              int currentSum = 0;
              
              for (int i = 0; i < size; i++) {
                  TreeNode node = queue.poll();
                  currentSum += node.val;
                  
                  if (node.left != null) queue.add(node.left);
                  if (node.right != null) queue.add(node.right);
              }
              
              if (currentSum > maxSum) {
                  maxSum = currentSum;
                  maxLevel = level;
              }
              level++;
          }
          
          return maxLevel;
      }
  };`,

      python: `
  class Solution:
      def maxLevelSum(self, root: Optional[TreeNode]) -> int:
          if not root:
              return 0
          
          q = deque([root])
          level = 1
          max_sum = float('-inf')
          result_level = 1
          
          while q:
              current_sum = 0
              for _ in range(len(q)):
                  node = q.popleft()
                  current_sum += node.val
                  if node.left:
                      q.append(node.left)
                  if node.right:
                      q.append(node.right)
              
              if current_sum > max_sum:
                  max_sum = current_sum
                  result_level = level
              
              level += 1
          
          return result_level
      `,
    },
  },

  firstAlphabet: {
    title: "38. First Alphabet of Each Word",
    description:
      "Given a string S, return a string containing the first letter of each word in the string.",
    examples: [
      { input: `"geeks for geeks"`, output: `"gfg"` },
      { input: `"bad is good"`, output: `"big"` },
    ],
    solution: {
      cpp: `
  class Solution {
  public:
      string firstAlphabet(string S) {
          string ans;
          ans += S[0];  // Add the first character
          
          for (int i = 1; i < S.size(); i++) {
              if (S[i - 1] == ' ')
                  ans += S[i];  // Add character after space
          }
          
          return ans;
      }
  };`,

      java: `
  class Solution {
      public String firstAlphabet(String S) {
          StringBuilder ans = new StringBuilder();
          ans.append(S.charAt(0));  // Add first letter
          
          for (int i = 1; i < S.length(); i++) {
              if (S.charAt(i - 1) == ' ') {
                  ans.append(S.charAt(i));  // Add letter after space
              }
          }
          
          return ans.toString();
      }
  };`,

      python: `
  class Solution:
      def firstAlphabet(self, S: str) -> str:
          result = S[0]  # Start with the first character
          for i in range(1, len(S)):
              if S[i-1] == ' ':
                  result += S[i]  # Add character after space
          return result
      `,
    },
  },

  countLeaves: {
    title: "39. Count Leaves in a Binary Tree",
    description: "Given a Binary Tree, count the number of leaf nodes.",
    examples: [
      { input: "[4, 8, 10, 7, 3, null, 5, null, null, null]", output: "3" },
    ],
    solution: {
      cpp: `
  int countLeaves(Node* root) {
      if (!root) return 0;
      
      if (!root->left && !root->right) return 1;
      
      return countLeaves(root->left) + countLeaves(root->right);
  };`,

      java: `
  class Solution {
      public int countLeaves(Node root) {
          if (root == null) return 0;
          
          if (root.left == null && root.right == null) return 1;
          
          return countLeaves(root.left) + countLeaves(root.right);
      }
  };`,

      python: `
  class Solution:
      def countLeaves(self, root: Optional[Node]) -> int:
          if not root:
              return 0
          
          if not root.left and not root.right:
              return 1
          
          return self.countLeaves(root.left) + self.countLeaves(root.right)
      `,
    },
  },

  generateBinaryNumbers: {
    title: "40. Generate Binary Numbers from 1 to N",
    description:
      "Given a number N, generate and print all binary numbers with decimal values from 1 to N.",
    examples: [
      { input: "N = 2", output: "1 10" },
      { input: "N = 5", output: "1 10 11 100 101" },
    ],
    solution: {
      cpp: `
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
  };`,

      java: `
  import java.util.*;
  class Solution {
      public List<String> generate(int N) {
          Queue<String> q = new LinkedList<>();
          List<String> result = new ArrayList<>();
          
          q.add("1");
          while (N-- > 0) {
              String s = q.poll();
              result.add(s);
              q.add(s + "0");
              q.add(s + "1");
          }
          return result;
      }
  };`,

      python: `
  from collections import deque
  class Solution:
      def generate(self, N: int) -> List[str]:
          q = deque(["1"])
          result = []
          while N > 0:
              s = q.popleft()
              result.append(s)
              q.append(s + '0')
              q.append(s + '1')
              N -= 1
          return result
      `,
    },
  },

  minimumDifference: {
    title: "41. Minimum Difference Between Any Pair",
    description:
      "Given an unsorted array, find the minimum difference between any pair in the given array.",
    examples: [
      { input: "[2, 4, 5, 9, 7]", output: "1" },
      { input: "[3, 10, 8, 6]", output: "2" },
    ],
    solution: {
      cpp: `
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

      java: `
  import java.util.*;
  class Solution {
      public int minimum_difference(int[] nums) {
          Arrays.sort(nums);
          int minm = Integer.MAX_VALUE;

          for (int i = 0; i < nums.length - 1; i++) {
              minm = Math.min(minm, nums[i + 1] - nums[i]);
          }
          return minm;
      }
  };`,

      python: `
  class Solution:
      def minimum_difference(self, nums: List[int]) -> int:
          nums.sort()
          minm = float('inf')

          for i in range(len(nums) - 1):
              minm = min(minm, nums[i + 1] - nums[i])
          
          return minm
      `,
    },
  },

  mthHalf: {
    title: "42. Halve N, M-1 Times",
    description:
      "Given two values N and M, return the value when N is halved M-1 times.",
    examples: [
      { input: "N = 100, M = 4", output: "12" },
      { input: "N = 10, M = 5", output: "0" },
    ],
    solution: {
      cpp: `
  class Solution {
  public:
      int mthHalf(int N, int M) {
          return N / pow(2, M - 1);
      }
  };`,

      java: `
  class Solution {
      public int mthHalf(int N, int M) {
          return (int) (N / Math.pow(2, M - 1));
      }
  };`,

      python: `
  class Solution:
      def mthHalf(self, N: int, M: int) -> int:
          return N // (2 ** (M - 1))
          `,
    },
  },

  removeChars: {
    title: "43. Remove Characters from First String",
    description:
      "Given two strings string1 and string2, remove those characters from string1 which are present in string2.",
    examples: [
      { input: 'string1 = "computer", string2 = "cat"', output: '"ompuer"' },
      { input: 'string1 = "occurrence", string2 = "car"', output: '"ouene"' },
    ],
    solution: {
      cpp: `
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

      java: `
  class Solution {
      public String removeChars(String string1, String string2) {
          int[] arr = new int[26];
          for (int i = 0; i < string2.length(); i++)
              arr[string2.charAt(i) - 'a']++;

          StringBuilder ans = new StringBuilder();
          for (int i = 0; i < string1.length(); i++) {
              if (arr[string1.charAt(i) - 'a'] == 0)
                  ans.append(string1.charAt(i));
          }
          return ans.toString();
      }
  };`,

      python: `
  class Solution:
      def removeChars(self, string1: str, string2: str) -> str:
          arr = [0] * 26
          for char in string2:
              arr[ord(char) - ord('a')] += 1

          ans = []
          for char in string1:
              if arr[ord(char) - ord('a')] == 0:
                  ans.append(char)

          return ''.join(ans)
          `,
    },
  },

  rotateArray: {
    title: "44. Rotate Array by D Elements",
    description:
      "Given an unsorted array arr[] of size N, rotate it by D elements (clockwise).",
    examples: [
      {
        input: "N = 5, D = 2, arr = [1, 2, 3, 4, 5]",
        output: "[3, 4, 5, 1, 2]",
      },
      {
        input: "N = 10, D = 3, arr = [2, 4, 6, 8, 10, 12, 14, 16, 18, 20]",
        output: "[8, 10, 12, 14, 16, 18, 20, 2, 4, 6]",
      },
    ],
    solution: {
      cpp: `
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

      java: `
  import java.util.*;

  class Solution {
      public void rotateArray(int n, int d, int[] arr) {
          d = d % n; // Handle cases where d >= n
          int[] rotated = new int[n];

          for (int i = 0; i < n; i++) {
              rotated[(i + n - d) % n] = arr[i];
          }

          for (int i = 0; i < n; i++) {
              System.out.print(rotated[i] + " ");
          }
          System.out.println();
      }
  };`,

      python: `
  class Solution:
      def rotateArray(self, n: int, d: int, arr: List[int]) -> List[int]:
          d = d % n  # Handle cases where d >= n
          return arr[d:] + arr[:d]
          `,
    },
  },
};

export default problemsData;
