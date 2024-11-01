#include <iostream>
#include <string>
#include <vector>
#include <algorithm>

// Task structure
struct Task {
    int id;
    std::string title;
    std::string dueDate;
    int priority;
    bool isComplete;
    Task* next;

    Task(int i, const std::string& t, const std::string& d, int p)
        : id(i), title(t), dueDate(d), priority(p), isComplete(false), next(nullptr) {}
};

// Linked list to manage tasks
class ToDoList {
private:
    Task* head;
    int taskCounter;

    // Helper function to find a task by ID
    Task* findTask(int id) {
        Task* current = head;
        while (current != nullptr) {
            if (current->id == id) return current;
            current = current->next;
        }
        return nullptr;
    }

public:
    ToDoList() : head(nullptr), taskCounter(0) {}

    // Add a task
    void addTask(const std::string& title, const std::string& dueDate, int priority) {
        Task* newTask = new Task(++taskCounter, title, dueDate, priority);
        newTask->next = head;
        head = newTask;
        std::cout << "Task added: " << title << std::endl;
    }

    // Mark task as complete
    void completeTask(int id) {
        Task* task = findTask(id);
        if (task) {
            task->isComplete = true;
            std::cout << "Task marked as complete: " << task->title << std::endl;
        } else {
            std::cout << "Task not found.\n";
        }
    }

    // Delete a task
    void deleteTask(int id) {
        Task* current = head;
        Task* previous = nullptr;
        while (current != nullptr && current->id != id) {
            previous = current;
            current = current->next;
        }
        if (current == nullptr) {
            std::cout << "Task not found.\n";
            return;
        }
        if (previous == nullptr) {
            head = current->next;
        } else {
            previous->next = current->next;
        }
        delete current;
        std::cout << "Task deleted.\n";
    }

    // Display all tasks
    void displayTasks() const {
        Task* current = head;
        if (!current) {
            std::cout << "No tasks available.\n";
            return;
        }
        while (current != nullptr) {
            std::cout << "ID: " << current->id << " | Title: " << current->title
                      << " | Due Date: " << current->dueDate << " | Priority: " << current->priority
                      << " | Complete: " << (current->isComplete ? "Yes" : "No") << std::endl;
            current = current->next;
        }
    }

    // Sort tasks by priority using selection sort
    void sortTasksByPriority() {
        if (!head || !head->next) return;

        Task* sorted = nullptr;
        while (head) {
            Task** maxPtr = &head;
            for (Task** ptr = &head; (*ptr)->next; ptr = &(*ptr)->next) {
                if ((*ptr)->next->priority > (*maxPtr)->priority) {
                    maxPtr = &(*ptr)->next;
                }
            }
            Task* maxNode = *maxPtr;
            *maxPtr = maxNode->next;
            maxNode->next = sorted;
            sorted = maxNode;
        }
        head = sorted;
        std::cout << "Tasks sorted by priority.\n";
    }

    // Search task by title (linear search)
    void searchTaskByTitle(const std::string& title) const {
        Task* current = head;
        while (current != nullptr) {
            if (current->title == title) {
                std::cout << "Task found - ID: " << current->id << " | Title: " << current->title
                          << " | Due Date: " << current->dueDate << " | Priority: " << current->priority
                          << " | Complete: " << (current->isComplete ? "Yes" : "No") << std::endl;
                return;
            }
            current = current->next;
        }
        std::cout << "Task not found.\n";
    }

    // Destructor to free memory
    ~ToDoList() {
        while (head) {
            Task* temp = head;
            head = head->next;
            delete temp;
        }
    }
};

int main() {
    ToDoList todoList;
    int choice, id, priority;
    std::string title, dueDate;

    while (true) {
        std::cout << "\n--- To-Do List Menu ---\n";
        std::cout << "1. Add Task\n2. Complete Task\n3. Delete Task\n4. Display Tasks\n";
        std::cout << "5. Sort Tasks by Priority\n6. Search Task by Title\n7. Exit\n";
        std::cout << "Enter your choice: ";
        std::cin >> choice;

        switch (choice) {
            case 1:
                std::cout << "Enter task title: ";
                std::cin.ignore();
                std::getline(std::cin, title);
                std::cout << "Enter due date: ";
                std::getline(std::cin, dueDate);
                std::cout << "Enter priority (1-10): ";
                std::cin >> priority;
                todoList.addTask(title, dueDate, priority);
                break;
            case 2:
                std::cout << "Enter task ID to mark as complete: ";
                std::cin >> id;
                todoList.completeTask(id);
                break;
            case 3:
                std::cout << "Enter task ID to delete: ";
                std::cin >> id;
                todoList.deleteTask(id);
                break;
            case 4:
                todoList.displayTasks();
                break;
            case 5:
                todoList.sortTasksByPriority();
                break;
            case 6:
                std::cout << "Enter task title to search: ";
                std::cin.ignore();
                std::getline(std::cin, title);
                todoList.searchTaskByTitle(title);
                break;
            case 7:
                std::cout << "Exiting...\n";
                return 0;
            default:
                std::cout << "Invalid choice. Try again.\n";
                break;
        }
    }
}
