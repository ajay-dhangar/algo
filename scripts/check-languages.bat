@echo off
REM Multi-Language Playground Setup Checker (Windows)
REM This script verifies that all required tools are installed for the Algo Playground

echo ==========================================
echo Algo Playground - Language Setup Checker
echo ==========================================
echo.

setlocal enabledelayedexpansion

REM Check Node.js
echo Checking JavaScript (Node.js):
where node >nul 2>nul
if %ERRORLEVEL% EQU 0 (
    for /f "tokens=*" %%A in ('node --version') do set NODE_VERSION=%%A
    echo [OK] node is installed: !NODE_VERSION!
) else (
    echo [FAIL] node is NOT installed
)

where npm >nul 2>nul
if %ERRORLEVEL% EQU 0 (
    for /f "tokens=*" %%A in ('npm --version') do set NPM_VERSION=%%A
    echo [OK] npm is installed: !NPM_VERSION!
) else (
    echo [FAIL] npm is NOT installed
)
echo.

REM Check Python
echo Checking Python:
where python3 >nul 2>nul
if %ERRORLEVEL% EQU 0 (
    for /f "tokens=*" %%A in ('python3 --version') do set PYTHON_VERSION=%%A
    echo [OK] python3 is installed: !PYTHON_VERSION!
) else (
    where python >nul 2>nul
    if %ERRORLEVEL% EQU 0 (
        for /f "tokens=*" %%A in ('python --version') do set PYTHON_VERSION=%%A
        echo [OK] python is installed: !PYTHON_VERSION!
    ) else (
        echo [WARNING] Python is NOT installed
    )
)
echo.

REM Check C++ Compiler
echo Checking C++ Compiler:
where g++ >nul 2>nul
if %ERRORLEVEL% EQU 0 (
    for /f "tokens=*" %%A in ('g++ --version ^| findstr /C:"g++"') do (
        echo [OK] g++ is installed: %%A
        goto cpp_done
    )
    :cpp_done
) else (
    where clang++ >nul 2>nul
    if %ERRORLEVEL% EQU 0 (
        echo [OK] clang++ is installed
    ) else (
        echo [WARNING] C++ compiler ^(g++ or clang++^) is NOT installed
    )
)
echo.

REM Check Java
echo Checking Java:
where javac >nul 2>nul
if %ERRORLEVEL% EQU 0 (
    for /f "tokens=*" %%A in ('javac -version 2^>^&1') do (
        echo [OK] javac is installed: %%A
        goto java_check_done
    )
) else (
    echo [WARNING] javac is NOT installed
)
:java_check_done

where java >nul 2>nul
if %ERRORLEVEL% EQU 0 (
    for /f "tokens=*" %%A in ('java -version 2^>^&1 ^| findstr /C:"version"') do (
        echo [OK] java is installed: %%A
        goto java_done
    )
) else (
    echo [WARNING] java is NOT installed
)
:java_done
echo.

echo ==========================================
echo Setup Instructions
echo ==========================================
echo.

echo To install missing tools on Windows:
echo.
echo 1. Python:
echo    Download from https://www.python.org/downloads/
echo    Make sure to check "Add Python to PATH" during installation
echo.

echo 2. C++ Compiler (choose one):
echo    Option A: MinGW
echo      Download from https://www.mingw-w64.org/
echo      Add bin folder to PATH after installation
echo    Option B: Visual C++ Build Tools
echo      Download from Microsoft Visual Studio
echo      Or use: choco install visualstudio2022buildtools
echo.

echo 3. Java:
echo    Download JDK from https://www.oracle.com/java/technologies/
echo    Or use: choco install openjdk
echo    Make sure to set JAVA_HOME environment variable
echo.

echo Alternative (using Chocolatey, if installed):
echo    choco install python mingw-w64 openjdk
echo.

echo ==========================================
echo Next Steps
echo ==========================================
echo.

echo 1. Start the backend server:
echo    npm run server:dev
echo.

echo 2. In another terminal, start the playground:
echo    npm start
echo.

echo 3. Open http://localhost:3000/playground
echo.

pause
