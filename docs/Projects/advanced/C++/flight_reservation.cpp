#include <iostream>
#include <string>
#include <vector>

using namespace std;

struct Flight {
    string airline;
    string departure;
    string arrival;
    double price;
    string category;
};

struct Passenger {
    string name;
    string contact;
    string gender;
    string email;
};

struct Ticket {
    string source;
    string destination;
    string journeyType;
    string dateOfJourney;
    Flight flight;
    Passenger passenger;
};

vector<Ticket> bookings;

void displayFlights(const vector<Flight>& flights) {
    cout << "\nAvailable Flights:\n";
    for (size_t i = 0; i < flights.size(); i++) {
        cout << i + 1 << ". " << flights[i].airline << " | Departure: " << flights[i].departure
             << " | Arrival: " << flights[i].arrival << " | Price: $" << flights[i].price
             << " | Category: " << flights[i].category << endl;
    }
}

void bookFlight() {
    string journeyType, source, destination, dateOfJourney;
    cout << "Select Journey Type (Domestic/International): ";
    cin >> journeyType;
    cout << "Enter Source City: ";
    cin >> source;
    cout << "Enter Destination City: ";
    cin >> destination;
    cout << "Enter Date of Journey (YYYY-MM-DD): ";
    cin >> dateOfJourney;

    vector<Flight> availableFlights = {
        {"Airline A", "10:00", "12:00", 200, "Economy"},
        {"Airline B", "15:00", "17:30", 350, "Business"},
        {"Airline C", "20:00", "23:00", 180, "Economy"}
    };

    if (availableFlights.empty()) {
        cout << "No flights available for the selected route.\n";
        return;
    }

    displayFlights(availableFlights);

    int choice;
    cout << "\nChoose a flight (1-" << availableFlights.size() << "): ";
    cin >> choice;

    if (choice < 1 || choice > availableFlights.size()) {
        cout << "Invalid flight selection.\n";
        return;
    }

    Flight selectedFlight = availableFlights[choice - 1];

    Passenger passenger;
    cout << "Enter Passenger Name: ";
    cin >> passenger.name;
    cout << "Enter Contact Number: ";
    cin >> passenger.contact;
    cout << "Enter Gender (M/F): ";
    cin >> passenger.gender;
    cout << "Enter Email ID: ";
    cin >> passenger.email;

    Ticket ticket = {source, destination, journeyType, dateOfJourney, selectedFlight, passenger};
    bookings.push_back(ticket);

    cout << "\nBooking Successful! Ticket Details:\n";
    cout << "Flight: " << selectedFlight.airline << " | Date: " << dateOfJourney
         << " | From: " << source << " | To: " << destination << endl;
    cout << "Passenger: " << passenger.name << " | Contact: " << passenger.contact << endl;
}

void viewTickets() {
    if (bookings.empty()) {
        cout << "No bookings found.\n";
        return;
    }

    cout << "\nCurrent Bookings:\n";
    for (size_t i = 0; i < bookings.size(); i++) {
        cout << i + 1 << ". Flight: " << bookings[i].flight.airline << " | Date: " << bookings[i].dateOfJourney
             << " | From: " << bookings[i].source << " | To: " << bookings[i].destination << endl;
        cout << "Passenger: " << bookings[i].passenger.name << " | Contact: " << bookings[i].passenger.contact << endl;
    }
}

void cancelBooking() {
    if (bookings.empty()) {
        cout << "No bookings found to cancel.\n";
        return;
    }

    int choice;
    cout << "\nEnter booking number to cancel (1-" << bookings.size() << "): ";
    cin >> choice;

    if (choice < 1 || choice > bookings.size()) {
        cout << "Invalid booking number.\n";
        return;
    }

    bookings.erase(bookings.begin() + choice - 1);
    cout << "Booking canceled successfully.\n";
}

void paymentOptions() {
    int choice;
    cout << "\nSelect Payment Method:\n";
    cout << "1. Debit Card\n2. Credit Card\n3. Net Banking\n";
    cout << "Enter your choice: ";
    cin >> choice;

    switch (choice) {
        case 1:
            cout << "Payment successful via Debit Card.\n";
            break;
        case 2:
            cout << "Payment successful via Credit Card.\n";
            break;
        case 3:
            cout << "Payment successful via Net Banking.\n";
            break;
        default:
            cout << "Invalid payment option.\n";
            break;
    }
}

int main() {
    int choice;

    do {
        cout << "\n--- Flight Reservation System ---\n";
        cout << "1. Book Flight\n2. View Tickets\n3. Cancel Booking\n4. Make Payment\n5. Exit\n";
        cout << "Enter your choice: ";
        cin >> choice;

        switch (choice) {
            case 1:
                bookFlight();
                break;
            case 2:
                viewTickets();
                break;
            case 3:
                cancelBooking();
                break;
            case 4:
                paymentOptions();
                break;
            case 5:
                cout << "Thank you for using the Flight Reservation System!\n";
                break;
            default:
                cout << "Invalid choice, please try again.\n";
        }
    } while (choice != 5);

    return 0;
}
