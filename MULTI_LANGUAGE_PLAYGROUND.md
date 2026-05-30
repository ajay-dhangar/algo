# Multi-Language Algo Playground Feature

## Overview

The Algo Playground has been enhanced to support multiple programming languages: **JavaScript**, **Python**, **C++**, and **Java**. Users can now select their preferred language from a dropdown menu and write/execute algorithms in their chosen language.

## Features

### 1. Language Selection Dropdown
- Users can select from: JavaScript, Python, C++, or Java
- Located in the playground header for easy access
- Changing the language automatically loads appropriate templates

### 2. Language-Specific Templates
Each language has 4 built-in templates:
- Binary Search Algorithm
- Bubble Sort Algorithm
- Reverse Linked List
- Fibonacci Series

Templates are pre-written with working implementations to help users understand language-specific syntax and conventions.

### 3. Dynamic Syntax Highlighting
- Monaco Editor automatically adjusts syntax highlighting based on selected language
- File extension in the editor tab reflects the current language (e.g., `script.js`, `script.py`, `script.cpp`, `script.java`)

### 4. Multi-Language Code Execution
- **JavaScript**: Runs in Web Workers (client-side) for security and performance
- **Python**, **C++**, **Java**: Execute on the backend server with proper compilation/interpretation

## Setup Instructions

### Frontend
The frontend changes are automatically included in `src/pages/playground/index.tsx`. No additional setup is needed beyond running the existing build.

### Backend Requirements

To use Python, C++, and Java execution, ensure the following tools are installed on your server:

#### Linux/macOS
```bash
# Python (usually pre-installed)
python3 --version

# C++ Compiler (GCC)
g++ --version

# Java
java -version
javac -version
```

Install if missing:
```bash
# Ubuntu/Debian
sudo apt-get install python3 g++ openjdk-11-jdk

# macOS with Homebrew
brew install python@3.11 gcc openjdk
```

#### Windows
1. **Python**: Download from https://www.python.org/downloads/
2. **C++ Compiler**: Install MinGW or use Visual C++ Build Tools
3. **Java**: Download JDK from https://www.oracle.com/java/technologies/javase-jdk11-downloads.html

### Running the Backend Server

Ensure the backend server is running to support non-JavaScript languages:

```bash
# Start the backend server
npm run server:dev

# Or manually
cd server
npm install
npm run dev
```

The server will listen on `http://localhost:5000` by default.

## API Endpoint

### Execute Code Endpoint
**POST** `/api/execute-code`

**Request Body:**
```json
{
  "language": "python|cpp|java",
  "code": "// Your source code here"
}
```

**Response (Success):**
```json
{
  "success": true,
  "output": "Program output here"
}
```

**Response (Error):**
```json
{
  "success": false,
  "error": "Error message describing what went wrong"
}
```

## User Guide

### Basic Workflow

1. **Select Language**: Choose your preferred language from the dropdown menu at the top of the playground
2. **Choose Template**: Select a template to load a working example
3. **Edit Code**: Modify the code in the editor as needed
4. **Run Code**: Click the "Run Code" button to execute
5. **View Output**: Check the console terminal for results

### Keyboard Shortcuts (Monaco Editor)

- `Ctrl/Cmd + S`: Format code (if supported)
- `Ctrl/Cmd + /`: Comment/uncomment lines
- `Ctrl/Cmd + Z`: Undo
- `Ctrl/Cmd + Y`: Redo
- `Ctrl/Cmd + F`: Find
- `Ctrl/Cmd + H`: Find and replace

### Console Output

- **Green text** (>): Program output
- **Red text** (❌): Error messages
- **Gray text** (//): Status messages
- **Execution time**: Displayed in the top-right corner

## Examples

### Python Example
```python
def binary_search(arr, target):
    left, right = 0, len(arr) - 1
    while left <= right:
        mid = (left + right) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    return -1

arr = [1, 3, 5, 7, 9]
print("Result:", binary_search(arr, 7))
```

### C++ Example
```cpp
#include <iostream>
#include <vector>
using namespace std;

int binarySearch(vector<int>& arr, int target) {
    int left = 0, right = arr.size() - 1;
    while (left <= right) {
        int mid = left + (right - left) / 2;
        if (arr[mid] == target) return mid;
        else if (arr[mid] < target) left = mid + 1;
        else right = mid - 1;
    }
    return -1;
}

int main() {
    vector<int> arr = {1, 3, 5, 7, 9};
    cout << "Result: " << binarySearch(arr, 7) << endl;
    return 0;
}
```

### Java Example
```java
public class BinarySearch {
    public static int binarySearch(int[] arr, int target) {
        int left = 0, right = arr.length - 1;
        while (left <= right) {
            int mid = left + (right - left) / 2;
            if (arr[mid] == target) return mid;
            else if (arr[mid] < target) left = mid + 1;
            else right = mid - 1;
        }
        return -1;
    }
    
    public static void main(String[] args) {
        int[] arr = {1, 3, 5, 7, 9};
        System.out.println("Result: " + binarySearch(arr, 7));
    }
}
```

## Troubleshooting

### "Backend server is not running" Error
**Solution**: Start the backend server with `npm run server:dev` and ensure it's listening on `localhost:5000`

### Compilation Error for C++
**Issue**: `g++` command not found
**Solution**: Install GCC compiler (see Setup Instructions above)

### Java ClassNotFound Error
**Issue**: The class name in the code doesn't match the file name
**Solution**: The playground automatically detects the public class name, but ensure your code has a public class definition

### Timeout Error
**Issue**: Code execution timed out after 10 seconds
**Solution**: Your code may have an infinite loop or be taking too long. Check your logic and optimize if needed.

### Python Module Not Found
**Issue**: ImportError for standard library modules
**Solution**: Only standard library modules are available in the sandbox. Third-party packages (pip) are not supported.

## Performance Considerations

- **JavaScript**: Runs in Web Workers (recommended for I/O operations and quick scripts)
- **Python**: Interpreted language, suitable for algorithm learning
- **C++**: Compiled language, fastest execution for compute-intensive tasks
- **Java**: JVM startup adds overhead, but offers strong type safety

## Security & Execution Sandboxing

The playground employs layered sandboxing techniques depending on the execution runtime to ensure high security and isolate user scripts.

### 1. JavaScript Sandboxing (Web Workers)
* **Execution Environment**: JavaScript code executes entirely inside client-side **Web Workers**.
* **Global Scope Isolation**: Web Workers do not have access to the browser's main thread global scope, the `window` object, the `document` (DOM), or cookies.
* **Timeout Protection**: A watchdog timer automatically terminates execution if a script exceeds the 10-second execution limit, preventing infinite loop tab freezes.

### 2. Backend Sandboxing & Isolation (Python, C++, Java)
* **Execution Environment**: Python, C++, and Java code execution is handled by the backend server.
* **Timeout Protection**: The backend limits execution time using a child process execution timeout of 10 seconds to prevent resource exhaustion and hanging processes.
* **Temporary File Isolation**: Execution scripts are written to unique, temporary files with random names inside isolated temporary directories, which are automatically deleted immediately after execution completes.

## Future Enhancements

Potential improvements:
- Add more languages (Rust, Go, C#, etc.)
- Support for multiple files/modules
- Code sharing and snippets
- Collaborative editing
- Performance benchmarking
- Debugging capabilities

## Contributing

To contribute improvements to the multi-language playground:

1. Test your changes with all supported languages
2. Ensure backend handles errors gracefully
3. Update documentation if adding new languages or features
4. Test with the existing test suite: `npm run server:test`

## Architecture

### Frontend (React Component)
- `src/pages/playground/index.tsx`: Main playground component
- Language configuration with templates
- Monaco Editor integration
- Web Worker for JavaScript execution
- Backend API calls for other languages

### Backend (Node.js/Express)
- `server/server.js`: Express server with `/api/execute-code` endpoint
- Uses `child_process.exec()` to run code
- Temporary file handling for source code
- Error capture and response formatting

## License

This feature is part of the Algo project and follows the same license as the main repository.
