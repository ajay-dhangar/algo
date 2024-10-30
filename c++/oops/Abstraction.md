#include <iostream>
using namespace std;
class Shape {

public:

// Pure virtual function for drawing the shape

   virtual void draw() = 0;  // This makes the class abstract

// Non-virtual method for demonstration (optional)

   void info() {
        cout << "This is a shape." << endl;
    }
};

// Derived class: Circle (inherits from Shape)

class Circle: public Shape {

private:
    int radius;

public:
    Circle(int r) : radius(r) {}

// Implementing the pure virtual function

   void draw() override {
        cout << "Drawing a circle with radius " << radius << endl;
    }
};

// Derived class: Square (inherits from Shape)

class Square: public Shape {
private:
    int side;

public:
    Square(int s) : side(s) {}

// Implementing the pure virtual function
    void draw() override {
        cout << "Drawing a square with side length " << side << endl;
    }
};

int main() {
    // We cannot create an object of the abstract class 'Shape'
    // Shape shape;  // This would cause a compilation error

// Instead, we can create objects of derived classes
    Shape* shape1 = new Circle(10);  // Circle with radius 10
    Shape* shape2 = new Square(5);   // Square with side length 5

// Call the draw method of each derived class (abstraction in action)
    shape1->draw();  // Output: Drawing a circle with radius 10
    shape2->draw();  // Output: Drawing a square with side length 5

// Optional: Using the non-abstract method in the base class
    shape1->info();  // Output: This is a shape.
    shape2->info();  // Output: This is a shape.

// Clean up
    delete shape1;
    delete shape2;
    return 0;
}
