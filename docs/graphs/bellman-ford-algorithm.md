id: bellman-ford-algorithm
title: Bellman-Ford Algorithm
sidebar_label: Bellman-Ford Algorithm
sidebar_position: 2
description: A complete guide to the Bellman-Ford Algorithm with explanations, dry run, negative cycle detection, implementations in Python, Java, C++, and JavaScript, and related LeetCode problems.
tags: [graph, shortest-path, dynamic-programming, negative-weights, bellman-ford, dsa]
Bellman-Ford Algorithm
Overview
The Bellman-Ford Algorithm finds the shortest path from a single source vertex to all other vertices in a weighted graph. Unlike Dijkstra's Algorithm, Bellman-Ford works correctly even when the graph contains negative edge weights, making it more versatile for real-world problems.
:::info Key Difference from Dijkstra
Dijkstra's Algorithm fails on graphs with negative edges. Bellman-Ford handles them correctly — and can even detect negative weight cycles.
:::

How It Works
The algorithm is based on the principle of edge relaxation. It repeatedly relaxes all edges V - 1 times (where V is the number of vertices).
Relaxation Formula
For every edge (u, v) with weight w:
d[v]=min⁡(d[v], d[u]+w(u,v))d[v] = \min(d[v],\ d[u] + w(u, v))d[v]=min(d[v], d[u]+w(u,v))
Steps

Initialize distance of source to 0, all others to ∞
Repeat V - 1 times:

For every edge (u, v, w), apply the relaxation formula


Run one more pass to detect negative weight cycles:

If any distance can still be reduced, a negative cycle exists




Dry Run Example
Consider this graph (5 nodes, directed, with a negative edge):
#mermaid-r1g4{font-family:inherit;font-size:16px;fill:#E5E5E5;}@keyframes edge-animation-frame{from{stroke-dashoffset:0;}}@keyframes dash{to{stroke-dashoffset:0;}}#mermaid-r1g4 .edge-animation-slow{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 50s linear infinite;stroke-linecap:round;}#mermaid-r1g4 .edge-animation-fast{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 20s linear infinite;stroke-linecap:round;}#mermaid-r1g4 .error-icon{fill:#CC785C;}#mermaid-r1g4 .error-text{fill:#3387a3;stroke:#3387a3;}#mermaid-r1g4 .edge-thickness-normal{stroke-width:1px;}#mermaid-r1g4 .edge-thickness-thick{stroke-width:3.5px;}#mermaid-r1g4 .edge-pattern-solid{stroke-dasharray:0;}#mermaid-r1g4 .edge-thickness-invisible{stroke-width:0;fill:none;}#mermaid-r1g4 .edge-pattern-dashed{stroke-dasharray:3;}#mermaid-r1g4 .edge-pattern-dotted{stroke-dasharray:2;}#mermaid-r1g4 .marker{fill:#A1A1A1;stroke:#A1A1A1;}#mermaid-r1g4 .marker.cross{stroke:#A1A1A1;}#mermaid-r1g4 svg{font-family:inherit;font-size:16px;}#mermaid-r1g4 p{margin:0;}#mermaid-r1g4 .label{font-family:inherit;color:#E5E5E5;}#mermaid-r1g4 .cluster-label text{fill:#3387a3;}#mermaid-r1g4 .cluster-label span{color:#3387a3;}#mermaid-r1g4 .cluster-label span p{background-color:transparent;}#mermaid-r1g4 .label text,#mermaid-r1g4 span{fill:#E5E5E5;color:#E5E5E5;}#mermaid-r1g4 .node rect,#mermaid-r1g4 .node circle,#mermaid-r1g4 .node ellipse,#mermaid-r1g4 .node polygon,#mermaid-r1g4 .node path{fill:transparent;stroke:#A1A1A1;stroke-width:1px;}#mermaid-r1g4 .rough-node .label text,#mermaid-r1g4 .node .label text,#mermaid-r1g4 .image-shape .label,#mermaid-r1g4 .icon-shape .label{text-anchor:middle;}#mermaid-r1g4 .node .katex path{fill:#000;stroke:#000;stroke-width:1px;}#mermaid-r1g4 .rough-node .label,#mermaid-r1g4 .node .label,#mermaid-r1g4 .image-shape .label,#mermaid-r1g4 .icon-shape .label{text-align:center;}#mermaid-r1g4 .node.clickable{cursor:pointer;}#mermaid-r1g4 .root .anchor path{fill:#A1A1A1!important;stroke-width:0;stroke:#A1A1A1;}#mermaid-r1g4 .arrowheadPath{fill:#0b0b0b;}#mermaid-r1g4 .edgePath .path{stroke:#A1A1A1;stroke-width:1px;}#mermaid-r1g4 .flowchart-link{stroke:#A1A1A1;fill:none;}#mermaid-r1g4 .edgeLabel{background-color:transparent;text-align:center;}#mermaid-r1g4 .edgeLabel p{background-color:transparent;}#mermaid-r1g4 .edgeLabel rect{opacity:0.5;background-color:transparent;fill:transparent;}#mermaid-r1g4 .labelBkg{background-color:rgba(0, 0, 0, 0.5);}#mermaid-r1g4 .cluster rect{fill:#CC785C;stroke:hsl(15, 12.3364485981%, 48.0392156863%);stroke-width:1px;}#mermaid-r1g4 .cluster text{fill:#3387a3;}#mermaid-r1g4 .cluster span{color:#3387a3;}#mermaid-r1g4 div.mermaidTooltip{position:absolute;text-align:center;max-width:200px;padding:2px;font-family:inherit;font-size:12px;background:#CC785C;border:1px solid hsl(15, 12.3364485981%, 48.0392156863%);border-radius:2px;pointer-events:none;z-index:100;}#mermaid-r1g4 .flowchartTitleText{text-anchor:middle;font-size:18px;fill:#E5E5E5;}#mermaid-r1g4 rect.text{fill:none;stroke-width:0;}#mermaid-r1g4 .icon-shape,#mermaid-r1g4 .image-shape{background-color:transparent;text-align:center;}#mermaid-r1g4 .icon-shape p,#mermaid-r1g4 .image-shape p{background-color:transparent;padding:2px;}#mermaid-r1g4 .icon-shape .label rect,#mermaid-r1g4 .image-shape .label rect{opacity:0.5;background-color:transparent;fill:transparent;}#mermaid-r1g4 .label-icon{display:inline-block;height:1em;overflow:visible;vertical-align:-0.125em;}#mermaid-r1g4 .node .label-icon path{fill:currentColor;stroke:revert;stroke-width:revert;}#mermaid-r1g4 .node .neo-node{stroke:#A1A1A1;}#mermaid-r1g4 [data-look="neo"].node rect,#mermaid-r1g4 [data-look="neo"].cluster rect,#mermaid-r1g4 [data-look="neo"].node polygon{stroke:url(#mermaid-r1g4-gradient);filter:drop-shadow( 1px 2px 2px rgba(185,185,185,1));}#mermaid-r1g4 [data-look="neo"].node path{stroke:url(#mermaid-r1g4-gradient);stroke-width:1px;}#mermaid-r1g4 [data-look="neo"].node .outer-path{filter:drop-shadow( 1px 2px 2px rgba(185,185,185,1));}#mermaid-r1g4 [data-look="neo"].node .neo-line path{stroke:#A1A1A1;filter:none;}#mermaid-r1g4 [data-look="neo"].node circle{stroke:url(#mermaid-r1g4-gradient);filter:drop-shadow( 1px 2px 2px rgba(185,185,185,1));}#mermaid-r1g4 [data-look="neo"].node circle .state-start{fill:#000000;}#mermaid-r1g4 [data-look="neo"].icon-shape .icon{fill:url(#mermaid-r1g4-gradient);filter:drop-shadow( 1px 2px 2px rgba(185,185,185,1));}#mermaid-r1g4 [data-look="neo"].icon-shape .icon-neo path{stroke:url(#mermaid-r1g4-gradient);filter:drop-shadow( 1px 2px 2px rgba(185,185,185,1));}#mermaid-r1g4 :root{--mermaid-font-family:inherit;}4232-124ABCDE
Source: A
Passd[A]d[B]d[C]d[D]d[E]Init0∞∞∞∞1042∞∞20123∞301235401235
Final shortest distances from A: A=0, B=1, C=2, D=3, E=5
Notice how d[B] was reduced from 4 → 1 because the path A → C → B (weight 2 + (-1) = 1) is shorter. This is only possible because Bellman-Ford handles negative edges.

Negative Cycle Detection
After V - 1 passes, run one more relaxation pass. If any distance is still updated, the graph contains a negative weight cycle (a cycle whose total weight is negative), and no valid shortest path exists.
#mermaid-r1g5{font-family:inherit;font-size:16px;fill:#E5E5E5;}@keyframes edge-animation-frame{from{stroke-dashoffset:0;}}@keyframes dash{to{stroke-dashoffset:0;}}#mermaid-r1g5 .edge-animation-slow{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 50s linear infinite;stroke-linecap:round;}#mermaid-r1g5 .edge-animation-fast{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 20s linear infinite;stroke-linecap:round;}#mermaid-r1g5 .error-icon{fill:#CC785C;}#mermaid-r1g5 .error-text{fill:#3387a3;stroke:#3387a3;}#mermaid-r1g5 .edge-thickness-normal{stroke-width:1px;}#mermaid-r1g5 .edge-thickness-thick{stroke-width:3.5px;}#mermaid-r1g5 .edge-pattern-solid{stroke-dasharray:0;}#mermaid-r1g5 .edge-thickness-invisible{stroke-width:0;fill:none;}#mermaid-r1g5 .edge-pattern-dashed{stroke-dasharray:3;}#mermaid-r1g5 .edge-pattern-dotted{stroke-dasharray:2;}#mermaid-r1g5 .marker{fill:#A1A1A1;stroke:#A1A1A1;}#mermaid-r1g5 .marker.cross{stroke:#A1A1A1;}#mermaid-r1g5 svg{font-family:inherit;font-size:16px;}#mermaid-r1g5 p{margin:0;}#mermaid-r1g5 .label{font-family:inherit;color:#E5E5E5;}#mermaid-r1g5 .cluster-label text{fill:#3387a3;}#mermaid-r1g5 .cluster-label span{color:#3387a3;}#mermaid-r1g5 .cluster-label span p{background-color:transparent;}#mermaid-r1g5 .label text,#mermaid-r1g5 span{fill:#E5E5E5;color:#E5E5E5;}#mermaid-r1g5 .node rect,#mermaid-r1g5 .node circle,#mermaid-r1g5 .node ellipse,#mermaid-r1g5 .node polygon,#mermaid-r1g5 .node path{fill:transparent;stroke:#A1A1A1;stroke-width:1px;}#mermaid-r1g5 .rough-node .label text,#mermaid-r1g5 .node .label text,#mermaid-r1g5 .image-shape .label,#mermaid-r1g5 .icon-shape .label{text-anchor:middle;}#mermaid-r1g5 .node .katex path{fill:#000;stroke:#000;stroke-width:1px;}#mermaid-r1g5 .rough-node .label,#mermaid-r1g5 .node .label,#mermaid-r1g5 .image-shape .label,#mermaid-r1g5 .icon-shape .label{text-align:center;}#mermaid-r1g5 .node.clickable{cursor:pointer;}#mermaid-r1g5 .root .anchor path{fill:#A1A1A1!important;stroke-width:0;stroke:#A1A1A1;}#mermaid-r1g5 .arrowheadPath{fill:#0b0b0b;}#mermaid-r1g5 .edgePath .path{stroke:#A1A1A1;stroke-width:1px;}#mermaid-r1g5 .flowchart-link{stroke:#A1A1A1;fill:none;}#mermaid-r1g5 .edgeLabel{background-color:transparent;text-align:center;}#mermaid-r1g5 .edgeLabel p{background-color:transparent;}#mermaid-r1g5 .edgeLabel rect{opacity:0.5;background-color:transparent;fill:transparent;}#mermaid-r1g5 .labelBkg{background-color:rgba(0, 0, 0, 0.5);}#mermaid-r1g5 .cluster rect{fill:#CC785C;stroke:hsl(15, 12.3364485981%, 48.0392156863%);stroke-width:1px;}#mermaid-r1g5 .cluster text{fill:#3387a3;}#mermaid-r1g5 .cluster span{color:#3387a3;}#mermaid-r1g5 div.mermaidTooltip{position:absolute;text-align:center;max-width:200px;padding:2px;font-family:inherit;font-size:12px;background:#CC785C;border:1px solid hsl(15, 12.3364485981%, 48.0392156863%);border-radius:2px;pointer-events:none;z-index:100;}#mermaid-r1g5 .flowchartTitleText{text-anchor:middle;font-size:18px;fill:#E5E5E5;}#mermaid-r1g5 rect.text{fill:none;stroke-width:0;}#mermaid-r1g5 .icon-shape,#mermaid-r1g5 .image-shape{background-color:transparent;text-align:center;}#mermaid-r1g5 .icon-shape p,#mermaid-r1g5 .image-shape p{background-color:transparent;padding:2px;}#mermaid-r1g5 .icon-shape .label rect,#mermaid-r1g5 .image-shape .label rect{opacity:0.5;background-color:transparent;fill:transparent;}#mermaid-r1g5 .label-icon{display:inline-block;height:1em;overflow:visible;vertical-align:-0.125em;}#mermaid-r1g5 .node .label-icon path{fill:currentColor;stroke:revert;stroke-width:revert;}#mermaid-r1g5 .node .neo-node{stroke:#A1A1A1;}#mermaid-r1g5 [data-look="neo"].node rect,#mermaid-r1g5 [data-look="neo"].cluster rect,#mermaid-r1g5 [data-look="neo"].node polygon{stroke:url(#mermaid-r1g5-gradient);filter:drop-shadow( 1px 2px 2px rgba(185,185,185,1));}#mermaid-r1g5 [data-look="neo"].node path{stroke:url(#mermaid-r1g5-gradient);stroke-width:1px;}#mermaid-r1g5 [data-look="neo"].node .outer-path{filter:drop-shadow( 1px 2px 2px rgba(185,185,185,1));}#mermaid-r1g5 [data-look="neo"].node .neo-line path{stroke:#A1A1A1;filter:none;}#mermaid-r1g5 [data-look="neo"].node circle{stroke:url(#mermaid-r1g5-gradient);filter:drop-shadow( 1px 2px 2px rgba(185,185,185,1));}#mermaid-r1g5 [data-look="neo"].node circle .state-start{fill:#000000;}#mermaid-r1g5 [data-look="neo"].icon-shape .icon{fill:url(#mermaid-r1g5-gradient);filter:drop-shadow( 1px 2px 2px rgba(185,185,185,1));}#mermaid-r1g5 [data-look="neo"].icon-shape .icon-neo path{stroke:url(#mermaid-r1g5-gradient);filter:drop-shadow( 1px 2px 2px rgba(185,185,185,1));}#mermaid-r1g5 :root{--mermaid-font-family:inherit;}-1-21XYZ
Here, X → Y → Z → X has total weight -1 + -2 + 1 = -2. Going around this cycle indefinitely keeps reducing the distance → negative cycle detected.

Complexity Analysis
MetricValueTime ComplexityO(V × E)Space ComplexityO(V)
Where V = number of vertices, E = number of edges.

Bellman-Ford vs Dijkstra
FeatureBellman-FordDijkstraNegative edge weights✅ Supported❌ Not supportedNegative cycle detection✅ Yes❌ NoTime ComplexityO(V × E)O((V + E) log V)Best forDense/negative graphsNon-negative graphsApproachDynamic ProgrammingGreedy
Rule of thumb:

Use Dijkstra when all edge weights are non-negative (faster)
Use Bellman-Ford when negative weights are possible or you need cycle detection


Implementations
Python
pythondef bellman_ford(vertices, edges, source):
    # Step 1: Initialize distances
    dist = {v: float('inf') for v in range(vertices)}
    dist[source] = 0

    # Step 2: Relax all edges V-1 times
    for _ in range(vertices - 1):
        for u, v, w in edges:
            if dist[u] != float('inf') and dist[u] + w < dist[v]:
                dist[v] = dist[u] + w

    # Step 3: Check for negative weight cycles
    for u, v, w in edges:
        if dist[u] != float('inf') and dist[u] + w < dist[v]:
            print("Graph contains a negative weight cycle")
            return None

    return dist

# Example usage
V = 5
# edges: (u, v, weight)
edges = [(0, 1, 4), (0, 2, 2), (1, 2, 3), (1, 3, 2), (2, 1, -1), (3, 4, 2), (2, 4, 4)]
result = bellman_ford(V, edges, 0)
print(result)  # {0: 0, 1: 1, 2: 2, 3: 3, 4: 5}

Java
javaimport java.util.Arrays;

public class BellmanFord {

    static void bellmanFord(int V, int[][] edges, int source) {
        int[] dist = new int[V];
        Arrays.fill(dist, Integer.MAX_VALUE);
        dist[source] = 0;

        // Relax all edges V-1 times
        for (int i = 0; i < V - 1; i++) {
            for (int[] edge : edges) {
                int u = edge[0], v = edge[1], w = edge[2];
                if (dist[u] != Integer.MAX_VALUE && dist[u] + w < dist[v]) {
                    dist[v] = dist[u] + w;
                }
            }
        }

        // Check for negative weight cycles
        for (int[] edge : edges) {
            int u = edge[0], v = edge[1], w = edge[2];
            if (dist[u] != Integer.MAX_VALUE && dist[u] + w < dist[v]) {
                System.out.println("Graph contains a negative weight cycle");
                return;
            }
        }

        // Print result
        System.out.println("Vertex\tDistance from Source");
        for (int i = 0; i < V; i++) {
            System.out.println(i + "\t" + dist[i]);
        }
    }

    public static void main(String[] args) {
        int V = 5;
        int[][] edges = {
            {0, 1, 4}, {0, 2, 2}, {1, 2, 3},
            {1, 3, 2}, {2, 1, -1}, {3, 4, 2}, {2, 4, 4}
        };
        bellmanFord(V, edges, 0);
    }
}

C++
cpp#include <bits/stdc++.h>
using namespace std;

struct Edge {
    int u, v, w;
};

void bellmanFord(int V, vector<Edge>& edges, int source) {
    vector<int> dist(V, INT_MAX);
    dist[source] = 0;

    // Relax all edges V-1 times
    for (int i = 0; i < V - 1; i++) {
        for (auto& edge : edges) {
            if (dist[edge.u] != INT_MAX && dist[edge.u] + edge.w < dist[edge.v]) {
                dist[edge.v] = dist[edge.u] + edge.w;
            }
        }
    }

    // Check for negative weight cycles
    for (auto& edge : edges) {
        if (dist[edge.u] != INT_MAX && dist[edge.u] + edge.w < dist[edge.v]) {
            cout << "Graph contains a negative weight cycle\n";
            return;
        }
    }

    cout << "Vertex\tDistance from Source\n";
    for (int i = 0; i < V; i++) {
        cout << i << "\t" << dist[i] << "\n";
    }
}

int main() {
    int V = 5;
    vector<Edge> edges = {
        {0, 1, 4}, {0, 2, 2}, {1, 2, 3},
        {1, 3, 2}, {2, 1, -1}, {3, 4, 2}, {2, 4, 4}
    };
    bellmanFord(V, edges, 0);
    return 0;
}

JavaScript
javascriptfunction bellmanFord(V, edges, source) {
    // Initialize distances
    const dist = new Array(V).fill(Infinity);
    dist[source] = 0;

    // Relax all edges V-1 times
    for (let i = 0; i < V - 1; i++) {
        for (const [u, v, w] of edges) {
            if (dist[u] !== Infinity && dist[u] + w < dist[v]) {
                dist[v] = dist[u] + w;
            }
        }
    }

    // Check for negative weight cycles
    for (const [u, v, w] of edges) {
        if (dist[u] !== Infinity && dist[u] + w < dist[v]) {
            console.log("Graph contains a negative weight cycle");
            return null;
        }
    }

    return dist;
}

// Example usage
const V = 5;
const edges = [
    [0, 1, 4], [0, 2, 2], [1, 2, 3],
    [1, 3, 2], [2, 1, -1], [3, 4, 2], [2, 4, 4]
];
console.log(bellmanFord(V, edges, 0)); // [0, 1, 2, 3, 5]

Real-World Use Cases

Network Routing — BGP (Border Gateway Protocol) uses Bellman-Ford for routing decisions across the internet
Currency Arbitrage Detection — Negative cycles in a currency exchange graph indicate arbitrage opportunities
Traffic Navigation — Road networks with toll discounts (negative weights) or penalties


Related LeetCode Problems
ProblemDifficultyLink#743 — Network Delay TimeMediumLeetCode#787 — Cheapest Flights Within K StopsMediumLeetCode#1334 — Find the City With the Smallest Number of NeighborsMediumLeetCode

Summary

Bellman-Ford finds single-source shortest paths in O(V × E) time
It handles negative edge weights — unlike Dijkstra
It can detect negative weight cycles after V - 1 relaxation passes
Use it when graphs have negative weights; prefer Dijkstra for non-negative graphs