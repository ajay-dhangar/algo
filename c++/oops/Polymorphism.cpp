//C++ example that demonstrates polymorphism using both method overriding (runtime polymorphism) and method overloading (compile-time polymorphism).
#include <iostream>
using namespace std;

// Base class: Vehicle
class Vehicle {
public:
    // Virtual method for polymorphism (runtime)
    virtual void display() {
        cout << "This is a generic vehicle." << endl;
    }

    // Method overloading (compile-time polymorphism)
    void speed(int maxSpeed) {
        cout << "Maximum speed: " << maxSpeed << " km/h" << endl;
    }

    void speed(int maxSpeed, int minSpeed) {
        cout << "Speed range: " << minSpeed << " km/h to " << maxSpeed << " km/h" << endl;
    }
};

// Derived class: Car (inherits from Vehicle)
class Car : public Vehicle {
public:
    // Overriding the display method for Car
    void display() override {
        cout << "This is a car." << endl;
    }
};

// Derived class: Truck (inherits from Vehicle)
class Truck : public Vehicle {
public:
    // Overriding the display method for Truck
    void display() override {
        cout << "This is a truck." << endl;
    }
};

int main() {
    // Polymorphism: Base class pointer pointing to derived class objects
    Vehicle* vehicle1 = new Car();  // Car object
    Vehicle* vehicle2 = new Truck();  // Truck object

    // Runtime polymorphism: display() method is called based on the actual object type
    vehicle1->display();  // Output: This is a car.
    vehicle2->display();  // Output: This is a truck.

    // Compile-time polymorphism: Method overloading for speed
    Vehicle vehicle;
    vehicle.speed(180);             // Output: Maximum speed: 180 km/h
    vehicle.speed(180, 60);         // Output: Speed range: 60 km/h to 180 km/h

    // Cleanup dynamically allocated memory
    delete vehicle1;
    delete vehicle2;

    return 0;
}
