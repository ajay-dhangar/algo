class Solution {
public:
    vector<bool> kidsWithCandies(vector<int>& candies, int extraCandies) {
        int maxCandies = *max_element(candies.begin(), candies.end());
        vector<bool> results;

        for(int candy:candies){
            if(candy + extraCandies >= maxCandies){
                results.push_back(true);
            }
            else{
                results.push_back(false);
            }
        }
        return results;
    }
};