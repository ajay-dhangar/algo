#!/bin/bash
# Multi-Language Playground Setup Checker
# This script verifies that all required tools are installed for the Algo Playground

echo "=========================================="
echo "Algo Playground - Language Setup Checker"
echo "=========================================="
echo ""

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

check_command() {
    if command -v $1 &> /dev/null; then
        version=$($1 ${2:---version} 2>&1 | head -n 1)
        echo -e "${GREEN}✓${NC} $1 is installed: $version"
        return 0
    else
        echo -e "${RED}✗${NC} $1 is NOT installed"
        return 1
    fi
}

echo "Checking JavaScript (Node.js):"
check_command "node" "--version"
check_command "npm" "--version"
echo ""

echo "Checking Python:"
if check_command "python3" "--version"; then
    :
elif check_command "python" "--version"; then
    :
else
    echo -e "${YELLOW}⚠${NC} Python 3 is recommended for the playground"
fi
echo ""

echo "Checking C++ Compiler:"
if check_command "g++" "--version"; then
    :
elif check_command "clang++" "--version"; then
    :
else
    echo -e "${YELLOW}⚠${NC} C++ compiler (g++ or clang++) is NOT installed"
fi
echo ""

echo "Checking Java:"
check_command "javac" "-version"
check_command "java" "-version"
echo ""

echo "=========================================="
echo "Setup Instructions"
echo "=========================================="
echo ""

echo "To install missing tools:"
echo ""

if [[ "$OSTYPE" == "linux-gnu"* ]]; then
    echo "Ubuntu/Debian:"
    echo "  sudo apt-get update"
    echo "  sudo apt-get install python3 g++ openjdk-11-jdk"
    echo ""
    echo "Fedora/RHEL:"
    echo "  sudo dnf install python3 gcc-c++ java-11-openjdk-devel"
    
elif [[ "$OSTYPE" == "darwin"* ]]; then
    echo "macOS (using Homebrew):"
    echo "  First, install Homebrew from https://brew.sh"
    echo "  Then run:"
    echo "  brew install python@3.11 gcc openjdk"
    
elif [[ "$OSTYPE" == "msys" || "$OSTYPE" == "cygwin" ]]; then
    echo "Windows:"
    echo "  1. Python: Download from https://www.python.org/downloads/"
    echo "  2. C++ Compiler: Install MinGW from https://www.mingw-w64.org/"
    echo "  3. Java: Download JDK from https://www.oracle.com/java/technologies/"
    echo ""
    echo "  Or use Chocolatey (if installed):"
    echo "  choco install python mingw-w64 openjdk"
fi

echo ""
echo "=========================================="
echo "Next Steps"
echo "=========================================="
echo ""
echo "1. Start the backend server:"
echo "   npm run server:dev"
echo ""
echo "2. In another terminal, start the playground:"
echo "   npm start"
echo ""
echo "3. Open http://localhost:3000/playground"
echo ""
