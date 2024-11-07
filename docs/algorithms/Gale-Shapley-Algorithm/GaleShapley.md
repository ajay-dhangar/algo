---
id: gale-shapley-algorithm  
sidebar_position: 15  
title: Gale-Shapley Algorithm  
sidebar_label: Gale-Shapley Algorithm  
---

## Overview:
The Gale-Shapley algorithm, also known as the **Deferred Acceptance Algorithm** or **Stable Marriage Problem** algorithm, is used to find a stable matching between two sets of participants, ensuring no pair would rather be matched with each other than their current partners.

This algorithm is widely applied in real-world scenarios such as college admissions, job matching, and organ donation systems.

## Key Features:
- **Stable Pairing**: Ensures no unmatched pair would prefer to be matched together rather than their current partners.
- **Deferred Acceptance**: Matching is based on proposals made by one side (e.g., men proposing to women) and acceptance is deferred until a stable match is found.
- **Two-sided Matching**: Matches two distinct sets of participants (e.g., applicants and schools).

## Time Complexity:
- **O(n²)**  
  The time complexity of the Gale-Shapley algorithm is O(n²), where n is the number of participants on either side of the matching. This is because in the worst case, each participant can be rejected by every member of the opposite set before a stable match is found.



### Space Complexity:
- **O(n)**  
  The space complexity is linear because the algorithm only needs to store the current matches and the free participants, which takes up space proportional to the number of participants, `n`.

## Algorithm Steps:

1. **Initialization**:
   - Each participant on one side proposes to their top choice from the other side.
   - The other side maintains a list of tentative matches.

2. **Proposals and Tentative Engagements**:
   - Unengaged participants propose to their top choice.
   - The participants being proposed to tentatively accept the best proposal they receive but may switch if a better proposal arrives.

3. **Rejections**:
   - If a better proposal is received, the current engagement is rejected, and the rejected participant moves to the next preference on their list.

4. **Termination**:
   - The process continues until all participants are engaged. No participant would prefer another partner over their current match, resulting in a stable pairing.

## C++ Code Implementation:

```cpp
#include <iostream>
#include <vector>
#include <cstring>
using namespace std;

#define N 5

bool wPrefersM1OverM(int prefer[2 * N][N], int w, int m, int m1) {
    for (int i = 0; i < N; i++) {
        if (prefer[w][i] == m1)
            return true;
        if (prefer[w][i] == m)
            return false;
    }
    return false;
}

void stableMarriage(int prefer[2 * N][N]) {
    int wPartner[N];
    bool mFree[N];
    memset(wPartner, -1, sizeof(wPartner));
    memset(mFree, false, sizeof(mFree));
    int freeCount = N;

    while (freeCount > 0) {
        int m;
        for (m = 0; m < N; m++)
            if (mFree[m] == false)
                break;

        for (int i = 0; i < N && mFree[m] == false; i++) {
            int w = prefer[m][i];

            if (wPartner[w - N] == -1) {
                wPartner[w - N] = m;
                mFree[m] = true;
                freeCount--;
            } else {
                int m1 = wPartner[w - N];
                if (!wPrefersM1OverM(prefer, w, m, m1)) {
                    wPartner[w - N] = m;
                    mFree[m] = true;
                    mFree[m1] = false;
                }
            }
        }
    }

    cout << "Woman   Man" << endl;
    for (int i = 0; i < N; i++)
        cout << " " << i + N << "\t" << wPartner[i] << endl;
}

int main() {
    int prefer[2 * N][N] = {
        {6, 5, 8, 9, 7}, {8, 6, 5, 7, 9}, {6, 9, 7, 8, 5},
        {5, 8, 7, 6, 9}, {6, 8, 5, 9, 7}, {4, 0, 1, 3, 2},
        {2, 1, 3, 0, 4}, {1, 2, 3, 4, 0}, {0, 4, 3, 2, 1},
        {3, 1, 0, 2, 4}};

    stableMarriage(prefer);
    return 0;
}
```

## Java Implementation:

```java
import java.util.Arrays;

public class StableMarriage {
    static final int N = 5;

    boolean wPrefersM1OverM(int prefer[][], int w, int m, int m1) {
        for (int i = 0; i < N; i++) {
            if (prefer[w][i] == m1)
                return true;
            if (prefer[w][i] == m)
                return false;
        }
        return false;
    }

    void stableMarriage(int prefer[][]) {
        int[] wPartner = new int[N];
        boolean[] mFree = new boolean[N];

        Arrays.fill(wPartner, -1);
        int freeCount = N;

        while (freeCount > 0) {
            int m;
            for (m = 0; m < N; m++)
                if (!mFree[m])
                    break;

            for (int i = 0; i < N && !mFree[m]; i++) {
                int w = prefer[m][i];

                if (wPartner[w - N] == -1) {
                    wPartner[w - N] = m;
                    mFree[m] = true;
                    freeCount--;
                } else {
                    int m1 = wPartner[w - N];
                    if (!wPrefersM1OverM(prefer, w, m, m1)) {
                        wPartner[w - N] = m;
                        mFree[m] = true;
                        mFree[m1] = false;
                    }
                }
            }
        }

        System.out.println("Woman   Man");
        for (int i = 0; i < N; i++)
            System.out.println(" " + (i + N) + "\t" + wPartner[i]);
    }

    public static void main(String[] args) {
        int prefer[][] = {
            {6, 5, 8, 9, 7}, {8, 6, 5, 7, 9}, {6, 9, 7, 8, 5},
            {5, 8, 7, 6, 9}, {6, 8, 5, 9, 7}, {4, 0, 1, 3, 2},
            {2, 1, 3, 0, 4}, {1, 2, 3, 4, 0}, {0, 4, 3, 2, 1},
            {3, 1, 0, 2, 4}
        };

        new StableMarriage().stableMarriage(prefer);
    }
}
```