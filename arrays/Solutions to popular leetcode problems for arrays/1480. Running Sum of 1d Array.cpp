//Dev Wadhwa

class Solution {
public:
    vector<int> runningSum(vector<int>& nums) {
        int n=nums.size(),sum=0;
        for(int i=0;i<n;i++)
        {
            sum+=nums[i];
            nums[i]=sum;
        }
        return nums;
    }
};
