//Dev Wadhwa

class Solution {
public:
    vector<int> sortArrayByParity(vector<int>& nums) {
        vector<int> res;
        int n=nums.size();
        for(int i=0;i<n;i++)
        {
            if(nums[i]%2==0) res.insert(res.begin(),nums[i]);
            else res.push_back(nums[i]);
        }
        return res;
    }
};
