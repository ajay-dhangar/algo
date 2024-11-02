---
id: Bentley-Ottmann-Algorithm
sidebar_position: 17
title: "Bentley-Ottmann Algorithm"
sidebar_label: Bentley-Ottmann Algorithm
---
### Definition

The **Bentley-Ottmann Algorithm** is a sweep line algorithm designed to detect all intersections within a set of line segments in 2D space. By maintaining a global event-driven structure, it optimally processes line segments to efficiently find intersections in \( O((n + k) \log n) \) time, where \( n \) is the number of line segments and \( k \) is the number of intersections.


### Characteristics

- **Algorithm Type**: Sweep line
- **Event-driven**: Uses events for segment endpoints and intersection points.
- **Data Structures**: Priority queue (for event management) and a balanced binary search tree (for active segment management).
- **Output**: Reports all intersection points in the input set of line segments.

### Time Complexity

- **Average Case**: \( O((n + k) \log n) \), where \( n \) is the number of line segments and \( k \) is the number of intersections found.
- **Worst Case**: \( O(n^2 \log n) \) if \( k \) approaches \( n^2 \) (as in the case of nearly all segments intersecting each other).


### Space Complexity

- **Space Complexity**: \( O(n + k) \), due to storage for the event queue and the active segments.


### Approach

1. **Initialize Events**: Create an event queue with two types of events—**start** and **end** events for each segment, and **intersection** events when they are detected.

2. **Process Events in Order**:
   - **Start Event**: When a segment’s starting point is reached, add the segment to the active segments list (a balanced binary search tree).
   - **End Event**: When a segment’s end point is reached, remove the segment from the active list.
   - **Intersection Event**: When two segments intersect, create an intersection event, add it to the event queue if not already present, and report the intersection.

3. **Update Active Segments**: For each new intersection, update the order of active segments to ensure subsequent intersections are detected.

4. **Output Intersections**: Report intersections when they occur, along with the coordinates.

---

### C++ Implementation

```cpp
#include <iostream>
#include <set>
#include <queue>
#include <vector>

struct Point {
    double x, y;
    bool operator<(const Point &p) const {
        return x < p.x || (x == p.x && y < p.y);
    }
};

struct Segment {
    Point start, end;
    bool operator<(const Segment &s) const {
        return start < s.start || (start == s.start && end < s.end);
    }
};

// Comparator for events
struct Event {
    Point point;
    Segment* segment;
    enum Type { START, END, INTERSECTION } type;

    bool operator<(const Event &e) const {
        return point < e.point;
    }
};

std::vector<Point> findIntersections(std::vector<Segment> &segments) {
    std::priority_queue<Event> eventQueue;
    std::set<Segment> activeSegments;
    std::vector<Point> intersections;

    // Add start and end events for all segments
    for (Segment &segment : segments) {
        eventQueue.push({segment.start, &segment, Event::START});
        eventQueue.push({segment.end, &segment, Event::END});
    }

    while (!eventQueue.empty()) {
        Event event = eventQueue.top();
        eventQueue.pop();

        if (event.type == Event::START) {
            activeSegments.insert(*event.segment);
            // Check for intersections with neighboring segments
        } else if (event.type == Event::END) {
            activeSegments.erase(*event.segment);
        }
    }

    return intersections;
}
```


---

### Java Implementation

```java
import java.util.*;

class Point implements Comparable<Point> {
    double x, y;
    Point(double x, double y) {
        this.x = x;
        this.y = y;
    }
    public int compareTo(Point other) {
        if (this.x != other.x) return Double.compare(this.x, other.x);
        return Double.compare(this.y, other.y);
    }
}

class Segment implements Comparable<Segment> {
    Point start, end;
    Segment(Point start, Point end) {
        this.start = start;
        this.end = end;
    }
    public int compareTo(Segment other) {
        return this.start.compareTo(other.start);
    }
}

class Event implements Comparable<Event> {
    Point point;
    Segment segment;
    enum Type { START, END, INTERSECTION }
    Type type;

    Event(Point point, Segment segment, Type type) {
        this.point = point;
        this.segment = segment;
        this.type = type;
    }

    public int compareTo(Event other) {
        return this.point.compareTo(other.point);
    }
}

public class BentleyOttmann {
    public static List<Point> findIntersections(List<Segment> segments) {
        PriorityQueue<Event> eventQueue = new PriorityQueue<>();
        TreeSet<Segment> activeSegments = new TreeSet<>();
        List<Point> intersections = new ArrayList<>();

        for (Segment segment : segments) {
            eventQueue.add(new Event(segment.start, segment, Event.Type.START));
            eventQueue.add(new Event(segment.end, segment, Event.Type.END));
        }

        while (!eventQueue.isEmpty()) {
            Event event = eventQueue.poll();
            if (event.type == Event.Type.START) {
                activeSegments.add(event.segment);
                // Check for intersections with neighboring segments
            } else if (event.type == Event.Type.END) {
                activeSegments.remove(event.segment);
            }
        }

        return intersections;
    }

    public static void main(String[] args) {
        List<Segment> segments = Arrays.asList(
            new Segment(new Point(1, 1), new Point(4, 4)),
            new Segment(new Point(1, 4), new Point(4, 1))
        );
        List<Point> intersections = findIntersections(segments);
        intersections.forEach(p -> System.out.println("(" + p.x + ", " + p.y + ")"));
    }
}
```
