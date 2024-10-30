//C++ example that demonstrates inheritance using a Car class as the base class and an ElectricCar class as the derived class. 
//The ElectricCar inherits the common attributes and methods from the Car class, while adding its own specific attributes like batteryCapacity.

#include <iostream>
using namespace std;

// Base class: Car
class Car {
protected:  // Protected so that derived classes can access it
    string make;
    string model;
    int year;

public:
    // Constructor for Car
    Car(string carMake, string carModel, int carYear) {
        make = carMake;
        model = carModel;
        year = carYear;
    }

    // Method to display car details
    void displayInfo() {
        cout << "Car: " << year << " " << make << " " << model << endl;
    }

    // Method to start the car
    void start() {
        cout << "Starting the car..." << endl;
    }

    // Method to stop the car
    void stop() {
        cout << "Stopping the car..." << endl;
    }
};

// Derived class: ElectricCar inherits from Car
class ElectricCar : public Car {
private:
    int batteryCapacity;  // Battery capacity in kWh

public:
    // Constructor for ElectricCar, using constructor from base class Car
    ElectricCar(string carMake, string carModel, int carYear, int batteryCap) 
        : Car(carMake, carModel, carYear) {  // Calling the base class constructor
        batteryCapacity = batteryCap;
    }

    // Method to display electric car details
    void displayElectricCarInfo() {
        displayInfo();  // Call the base class method to display basic car details
        cout << "Battery Capacity: " << batteryCapacity << " kWh" << endl;
    }

    // Additional method specific to electric cars
    void chargeBattery() {
        cout << "Charging the battery..." << endl;
    }
};

int main() {
    // Creating an object of the base class Car
    Car myCar("Toyota", "Corolla", 2020);
    myCar.displayInfo();
    myCar.start();
    myCar.stop();

    cout << endl;

    // Creating an object of the derived class ElectricCar
    ElectricCar myElectricCar("Tesla", "Model S", 2023, 100);
    myElectricCar.displayElectricCarInfo();  // Display electric car details
    myElectricCar.start();   // Inherited from base class
    myElectricCar.chargeBattery();  // Specific to ElectricCar
    myElectricCar.stop();    // Inherited from base class

    return 0;
}
