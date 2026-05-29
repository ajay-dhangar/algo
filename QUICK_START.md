# Multi-Language Playground - Quick Start Guide

## 🚀 Quick Setup (5 minutes)

### Prerequisites Check
```bash
# Run this to verify all tools are installed:
# On Linux/macOS:
bash scripts/check-languages.sh

# On Windows:
scripts\check-languages.bat
```

### 1️⃣ Install Missing Tools (if needed)

**Linux/macOS:**
```bash
# Ubuntu/Debian
sudo apt-get install python3 g++ openjdk-11-jdk

# macOS with Homebrew
brew install python@3.11 gcc openjdk
```

**Windows:**
- Download Python from https://www.python.org/downloads/
- Download MinGW from https://www.mingw-w64.org/
- Download Java JDK from https://www.oracle.com/java/

### 2️⃣ Install Project Dependencies
```bash
npm install
npm run server:install
```

### 3️⃣ Start the Application

**Option A: Start Both (Recommended)**
```bash
npm run start:all
```

**Option B: Start Separately**
```bash
# Terminal 1 - Backend
npm run server:dev

# Terminal 2 - Frontend
npm start
```

### 4️⃣ Open in Browser
```
http://localhost:3000/playground
```

## 📝 Using the Playground

### Step 1: Select Language
Click the "Language:" dropdown and choose from:
- JavaScript
- Python
- C++
- Java

### Step 2: Choose Template
Select a template:
- Binary Search
- Bubble Sort
- Reverse Linked List
- Fibonacci Series

### Step 3: Edit Code
Modify the code in the editor. Syntax highlighting updates automatically!

### Step 4: Run
Click "Run Code" and see output in the console.

## 🔧 What You Can Do

### JavaScript
✅ Client-side execution (Web Worker)
✅ All ES6+ features
⚠️ No fetch/network access
⚠️ No DOM access
⚠️ 10-second timeout

**Example:**
```javascript
function quickSort(arr) {
  if (arr.length <= 1) return arr;
  const pivot = arr[0];
  const left = arr.slice(1).filter(x => x <= pivot);
  const right = arr.slice(1).filter(x => x > pivot);
  return [...quickSort(left), pivot, ...quickSort(right)];
}
console.log(quickSort([3, 1, 4, 1, 5, 9, 2, 6]));
```

### Python
✅ Standard library modules
✅ List comprehensions
✅ Lambda functions
⚠️ No pip packages
⚠️ 10-second timeout

**Example:**
```python
def quick_sort(arr):
    if len(arr) <= 1:
        return arr
    pivot = arr[0]
    left = [x for x in arr[1:] if x <= pivot]
    right = [x for x in arr[1:] if x > pivot]
    return quick_sort(left) + [pivot] + quick_sort(right)

print(quick_sort([3, 1, 4, 1, 5, 9, 2, 6]))
```

### C++
✅ Standard library (iostream, vector, algorithm, etc.)
✅ Templates
✅ Highest performance
⚠️ Manual memory management
⚠️ 10-second timeout

**Example:**
```cpp
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    vector<int> arr = {3, 1, 4, 1, 5, 9, 2, 6};
    sort(arr.begin(), arr.end());
    for(int x : arr) cout << x << " ";
    return 0;
}
```

### Java
✅ Collections Framework
✅ String operations
✅ Type safety
⚠️ Verbose syntax
⚠️ JVM startup overhead
⚠️ 10-second timeout

**Example:**
```java
import java.util.*;

public class QuickSort {
    public static void main(String[] args) {
        Integer[] arr = {3, 1, 4, 1, 5, 9, 2, 6};
        Arrays.sort(arr);
        System.out.println(Arrays.toString(arr));
    }
}
```

## ⚠️ Common Issues & Solutions

### Issue: Backend server not running
**Error:** "Backend server is not running"
**Fix:** 
```bash
npm run server:dev
```

### Issue: Python not found
**Error:** Command 'python' not found
**Fix:**
```bash
python3 --version  # Try python3 instead
# Or install from https://www.python.org/downloads/
```

### Issue: g++ not found
**Error:** `g++` command not found
**Fix:**
```bash
# Linux
sudo apt-get install g++

# macOS
brew install gcc

# Windows - Download MinGW from https://www.mingw-w64.org/
```

### Issue: Code times out
**Error:** Execution timed out after 10 seconds
**Fix:** Check for infinite loops or very slow algorithms

### Issue: Java class not found
**Error:** java.lang.ClassNotFoundException
**Fix:** Ensure the public class name matches the logic in the playground

## 📚 Documentation Files

- **MULTI_LANGUAGE_PLAYGROUND.md** - Full feature documentation
- **IMPLEMENTATION_SUMMARY.md** - Technical implementation details
- **README.md** - Project overview (update pending)

## 🎯 Learning Path

### Beginner
1. Select JavaScript
2. Load "Binary Search" template
3. Modify the test cases
4. Run and observe output
5. Try Python with same template

### Intermediate
1. Switch to C++
2. Load "Bubble Sort"
3. Add custom input
4. Compare performance with JavaScript
5. Switch to Java and repeat

### Advanced
1. Implement custom algorithm
2. Compare execution time across languages
3. Optimize for performance
4. Test edge cases

## 🐛 Debugging Tips

**JavaScript:**
- Use `console.log()` to print variables
- Check browser console (F12) for errors
- Web Worker errors appear in the output console

**Python:**
- Use `print()` for debugging
- Check indentation errors carefully
- Read the full error message in console

**C++:**
- Enable compiler warnings: `-Wall -Wextra`
- Check for memory leaks
- Test with edge cases (empty arrays, single element)

**Java:**
- Check class name matches filename
- Verify imports are from java.lang or java.util
- Use System.out.println() for debugging

## 💡 Pro Tips

1. **Dark Mode**: Switch theme in the bottom-right corner
2. **Keyboard Shortcuts**: Use Ctrl+/ to comment code
3. **Multi-line Code**: Use \`\`\` in templates for readability
4. **Reset Anytime**: Click "Reset" to restore original template
5. **Copy Output**: Console text is selectable and copyable

## 🚢 Deployment Checklist

Before deploying to production:
- [ ] All language runtimes installed on server
- [ ] Backend server configured correctly
- [ ] Frontend can reach backend API
- [ ] Firewall allows traffic on port 5000
- [ ] Temp directory has write permissions
- [ ] Monitor server resource usage
- [ ] Set up logging and error tracking
- [ ] Test all languages before going live

## 📞 Support

For issues, check:
1. Troubleshooting section in MULTI_LANGUAGE_PLAYGROUND.md
2. Run language checker script
3. Check browser console (F12)
4. Check backend server logs
5. File an issue on GitHub

## 🎉 You're Ready!

Start using the multi-language playground:
```bash
npm run start:all
```

Then open http://localhost:3000/playground and start coding!

Happy coding! 🚀
