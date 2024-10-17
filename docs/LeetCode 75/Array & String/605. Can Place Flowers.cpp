class Solution {
public:
    bool canPlaceFlowers(vector<int>& flowerbed, int n) {
      int size = flowerbed.size();
        
        for (int i = 0; i < size; ++i) {
            // Check if current spot is empty and can plant a flower
            if (flowerbed[i] == 0) {
                // Check if the previous and next spots are empty or out of bounds
                bool leftEmpty = (i == 0) || (flowerbed[i - 1] == 0);
                bool rightEmpty = (i == size - 1) || (flowerbed[i + 1] == 0);
                
                if (leftEmpty && rightEmpty) {
                    // Plant a flower at the current spot
                    flowerbed[i] = 1;
                    --n;
                    // Early exit if all flowers are planted
                    if (n == 0) {
                        return true;
                    }
                }
            }
        }
        
        // After the loop, check if we were able to plant all the flowers
        return n <= 0;
    }
};
