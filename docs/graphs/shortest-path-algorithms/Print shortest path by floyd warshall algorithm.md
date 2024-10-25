# Finding Shortest distance + printing shortest path using Floyd-Warshall Algorithm

We pobably learned to find the magnitude of shortest distance for a multi-source graph using Floyd-Warshall Algorithm.
Here, we will learn to print the path taken as well that results in the shortest distance.


## Introduction

Flyod-Warshall Algorithm solves all pairs shortest path problem on a directed graph using dynamic programming formulation.
The graph may contain negative weight edges but there should be no negative weight cycles.


## Intitution
We initiate a 2D distance matrix of n x n (n is number of nodes), with initial values of distances between each pair of nodes and 2D parent matrix of n x n. \
The value of dist[i][j] would be the shortest distance between node i to j. \
The value of parent[i][j] would be immediate parent of j, that means, to travel to i to j, first we have to travel i to parent[i][j] than from parent[i][j] to j. 

To find shortest distance from node i to j, we will travel from i to j via every node, lets say j, and compare to find the minimum one.
That means: \
dist[i][j] =min(dist[i][j], dist[i][k]+dist[k][j]), where i = source node, j = destination node, and k = the node via which we are reaching from i to j.
Each time when we are updating a cell of matrix, we will also update parent matrix: parent[i][j]=k

## Implementation
### Code in c++
```cpp
#include<bits/stdc++.h>
using namespace std;
//initiatlizing distance and parent matrix using the input graph
void make_distance_parent_matrix(int n, vector<vector<double>> graph, vector<vector<double>> &dist, 
            vector<vector<double>> &parent){
    for(int i=1;i<n;i++){
        for(int j=1; j<n; j++){
            if(graph[i][j] == -1){
                //implies there's no path from i to j
                dist[i][j] = 1e9;   
            }
            else if(graph[i][j]!=0){
                //i->j(edge from i to j) implies i is the parent of j
                parent[i][j] = i;        
                //copying values from graph to distance matrix 
                dist[i][j] = graph[i][j];
            }
        }
    }
}
//updating distance and parent matrix 
void update_distance_parent_matrix(int n, vector<vector<double>> &dist, 
            vector<vector<double>> &parent){
    for(int via = 1; via<n; via++){
        for(int i=1; i<n; i++){
            for(int j=1; j<n; j++){
                if(dist[i][via] + dist[via][j] < dist[i][j]){
                    //updating minimum distance
                    dist[i][j] = dist[i][via] + dist[via][j]; 
                    //updating immediate parent of node
                    parent[i][j] = via;                         
                }
            }
        }   
    }
}
//Return the shortest distance magnitude and a vector where the path will be stored, is referenced
double findPath(int src_node, int dest_node, vector<vector<double>> dist, 
            vector<vector<double>> parent,
vector<int> &path){
    stack<int> st;
    int node = dest_node;
    st.push(node);
    while(parent[src_node][node]!=src_node){
        node = parent[src_node][node];
        st.push(node);
    }
    st.push(src_node);
    while(!st.empty()){
        path.push_back(st.top());
        st.pop();
    }  
    return dist[src_node][dest_node]; 
} 
