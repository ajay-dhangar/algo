//C++ example illustrating classes and objects using the concept of a Car. 
//The class encapsulates the attributes (make, model, year) and methods (start() and stop()), which define the behavior of the car.
#include <iostream>
#include <string>

// Class definition
class Car {
private:
    // Attributes (data members)
    std::string make;
    std::string model;
    int year;

public:
    // Constructor to initialize the attributes
    Car(std::string carMake, std::string carModel, int carYear) {
        make = carMake;
        model = carModel;
        year = carYear;
    }

    // Method to start the car
    void start() {
        std::cout << "The " << year << " " << make << " " << model << " is starting." << std::endl;
    }

    // Method to stop the car
    void stop() {
        std::cout << "The " << year << " " << make << " " << model << " is stopping." << std::endl;
    }

    // Method to display car details
    void displayInfo() {
        std::cout << "Car Info: " << make << " " << model << ", Year: " << year << std::endl;
    }
};

int main() {
    // Creating objects of the Car class
    Car car1("Toyota", "Corolla", 2020);
    Car car2("Ford", "Mustang", 2023);

    // Using the object's methods
    car1.displayInfo();
    car1.start();
    car1.stop();

    std::cout << std::endl; // Line break for clarity

    car2.displayInfo();
    car2.start();
    car2.stop();

    return 0;
}
