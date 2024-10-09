---

id: sweep-line-algorithm  
title: "Sweep Line Algorithm"  
sidebar_label: "Sweep Line Algorithm"  
sidebar_position: 6  
description: "A comprehensive guide to understanding and implementing the sweep line algorithm for computational geometry."  
tags: [computational geometry, algorithms, competitive programming]  

---

## Sweep Line Algorithm


The Sweep Line Algorithm is a powerful approach used in computational geometry to solve problems involving geometric figures (e.g., finding intersections, computing areas, etc.). The idea is to "sweep" a vertical line across the plane from left to right and process events as they occur.

### Key Concepts:
1. Event Points: These are the key positions in the plane where important changes happen. These might include the start or end of a line, or an intersection between two objects.
2. Active Set: As the sweep line moves, it maintains an active set of objects (e.g., lines, segments) that intersect the current position of the sweep line.

---

### Code Implementation (Python):

```python
import heapq

class Event:
    def __init__(self, x, start, segment):
        self.x = x
        self.start = start
        self.segment = segment
    
    def __lt__(self, other):
        return self.x < other.x or (self.x == other.x and self.start > other.start)

def sweep_line(segments):
    """Sweep line algorithm to find intersections in a set of line segments.

    Args:
        segments: A list of tuples representing line segments (x1, y1, x2, y2).

    Returns:
        A list of intersection points.
    """
    events = []
    for seg in segments:
        x1, y1, x2, y2 = seg
        events.append(Event(x1, True, seg))
        events.append(Event(x2, False, seg))
    
    heapq.heapify(events)
    active_segments = []
    intersections = []
    
    while events:
        event = heapq.heappop(events)
        
        if event.start:
            active_segments.append(event.segment)
        else:
            active_segments.remove(event.segment)
        
        # Check for intersections among active segments
        for i in range(len(active_segments)):
            for j in range(i + 1, len(active_segments)):
                inter = find_intersection(active_segments[i], active_segments[j])
                if inter:
                    intersections.append(inter)
    
    return intersections

def find_intersection(seg1, seg2):
    """Helper function to check if two line segments intersect.

    Args:
        seg1: First line segment.
        seg2: Second line segment.

    Returns:
        The intersection point if it exists, otherwise None.
    """
    # Implement the logic to check for intersection and calculate the intersection point
    pass

# Example Usage
segments = [(1, 1, 5, 5), (1, 5, 5, 1)]
intersections = sweep_line(segments)
print(f"Intersections: {intersections}")
```

---

### Code Implementation (C++):

```cpp
#include <iostream>
#include <set>
#include <vector>
#include <algorithm>

using namespace std;

struct Segment {
    int x1, y1, x2, y2;
};

struct Event {
    int x;
    bool start;
    Segment segment;

    bool operator<(const Event& other) const {
        return x < other.x || (x == other.x && start > other.start);
    }
};

vector<pair<int, int>> sweep_line(vector<Segment>& segments) {
    vector<Event> events;
    
    for (auto& seg : segments) {
        events.push_back({seg.x1, true, seg});
        events.push_back({seg.x2, false, seg});
    }
    
    sort(events.begin(), events.end());
    
    set<Segment> active_segments;
    vector<pair<int, int>> intersections;
    
    for (auto& event : events) {
        if (event.start) {
            active_segments.insert(event.segment);
        } else {
            active_segments.erase(event.segment);
        }

        // Check for intersections in active set
        for (auto it1 = active_segments.begin(); it1 != active_segments.end(); ++it1) {
            for (auto it2 = next(it1); it2 != active_segments.end(); ++it2) {
                if (auto inter = find_intersection(*it1, *it2)) {
                    intersections.push_back(*inter);
                }
            }
        }
    }
    
    return intersections;
}

pair<int, int>* find_intersection(const Segment& seg1, const Segment& seg2) {
    // Intersection logic here
    return nullptr;
}

int main() {
    vector<Segment> segments = {{1, 1, 5, 5}, {1, 5, 5, 1}};
    vector<pair<int, int>> intersections = sweep_line(segments);

    cout << "Intersections found:\n";
    for (auto& inter : intersections) {
        cout << inter.first << ", " << inter.second << endl;
    }
    
    return 0;
}
```

---

### Code Implementation (Java):

```java
import java.util.*;

class Segment {
    int x1, y1, x2, y2;

    public Segment(int x1, int y1, int x2, int y2) {
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;
    }
}

class Event implements Comparable<Event> {
    int x;
    boolean start;
    Segment segment;

    public Event(int x, boolean start, Segment segment) {
        this.x = x;
        this.start = start;
        this.segment = segment;
    }

    @Override
    public int compareTo(Event other) {
        if (this.x != other.x) return this.x - other.x;
        return Boolean.compare(other.start, this.start);
    }
}

public class SweepLineAlgorithm {
    public static List<int[]> sweepLine(Segment[] segments) {
        PriorityQueue<Event> events = new PriorityQueue<>();
        List<int[]> intersections = new ArrayList<>();

        for (Segment segment : segments) {
            events.add(new Event(segment.x1, true, segment));
            events.add(new Event(segment.x2, false, segment));
        }

        Set<Segment> activeSegments = new HashSet<>();

        while (!events.isEmpty()) {
            Event event = events.poll();

            if (event.start) {
                activeSegments.add(event.segment);
            } else {
                activeSegments.remove(event.segment);
            }

            for (Segment seg1 : activeSegments) {
                for (Segment seg2 : activeSegments) {
                    if (seg1 != seg2) {
                        int[] intersection = findIntersection(seg1, seg2);
                        if (intersection != null) {
                            intersections.add(intersection);
                        }
                    }
                }
            }
        }
        return intersections;
    }

    public static int[] findIntersection(Segment seg1, Segment seg2) {
        // Intersection logic here
        return null;
    }

    public static void main(String[] args) {
        Segment[] segments = { new Segment(1, 1, 5, 5), new Segment(1, 5, 5, 1) };
        List<int[]> intersections = sweepLine(segments);

        System.out.println("Intersections:");
        for (int[] inter : intersections) {
            System.out.println(inter[0] + ", " + inter[1]);
        }
    }
}
```

---

### Applications in Competitive Programming:

1. Finding Segment Intersections: Used to detect where line segments cross, which is important in geometry-based problems.
2. Computing the Union of Rectangles: Calculate the area covered by a union of several rectangles.
3. Closest Pair of Points: Efficiently find the closest pair of points in a 2D plane.

