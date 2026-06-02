# Troubleshooting Guide

This guide provides solutions for common setup, development, build, and deployment issues encountered while contributing to the Algo project.

---

# Installation Issues

## `npm install` Fails

### Symptoms

Dependency installation fails with package resolution or compatibility errors.

### Verify Environment

Check your installed versions:

```bash
node -v
npm -v
```

Ensure you are using a supported Node.js version for this project.

### Clean Installation

Remove existing dependencies and reinstall them.

**Linux/macOS**

```bash
rm -rf node_modules package-lock.json
npm install
```

**Windows PowerShell**

```powershell
Remove-Item -Recurse -Force node_modules
Remove-Item package-lock.json
npm install
```

---

# Development Server Issues

## Application Does Not Start

### Command

```bash
npm start
```

### Common Causes

* Missing dependencies
* Unsupported Node.js version
* Port conflicts
* Incomplete installation

### Resolution Steps

1. Reinstall project dependencies:

```bash
npm install
```

2. Verify your Node.js version.
3. Ensure no other application is using the development port.
4. Restart the development server.

---

## Changes Are Not Reflected in the Browser

### Resolution Steps

1. Stop the development server.
2. Clear the browser cache.
3. Restart the application:

```bash
npm start
```

4. Perform a hard refresh in your browser.

---

# Build Issues

## Build Command Fails

### Command

```bash
npm run build
```

### Resolution Steps

1. Review the build output carefully.
2. Fix any reported syntax or compilation errors.
3. Verify all referenced files and imports exist.
4. Run the build command again after applying fixes.

---

## MDX Compilation Errors

### Common Causes

* Unclosed JSX tags
* Invalid Markdown syntax
* Missing component imports
* Incorrect MDX formatting

### Example

**Incorrect**

```jsx
<MyComponent>
```

**Correct**

```jsx
<MyComponent />
```

---

# Documentation Issues

## Broken Links

### Resolution Steps

1. Verify the target file exists.
2. Use relative paths whenever possible.
3. Test the documentation locally:

```bash
npm start
```

4. Confirm navigation works as expected.

---

## Images Not Displaying

### Verify

* The image exists in the expected directory.
* The file name and extension match exactly.
* The referenced path is correct.

### Example

```md
![Example](../../static/images/example.png)
```

---

# Deployment Issues

## GitHub Pages Deployment Fails

### Before Deploying

Ensure the project builds successfully:

```bash
npm run build
```

### Deployment Commands

**SSH Deployment**

```bash
USE_SSH=true npm run deploy
```

**HTTPS Deployment**

```bash
GIT_USER=<github-username> npm run deploy
```

---

# Backend Connectivity Issues

## Local API Is Not Reachable

### Environment Configuration

```env
DOCUSAURUS_API_BASE_URL=http://localhost:5000
```

### Verify

* Backend service is running
* Port `5000` is accessible
* Firewall or security software is not blocking requests
* Environment variables are configured correctly

---

# Frequently Asked Questions

## Where Should I Add Algorithm Documentation?

Navigate to the appropriate documentation directory and follow the contribution guidelines outlined in `CONTRIBUTING.md`.

---

## How Can I Preview My Changes?

Start the local development server:

```bash
npm start
```

---

## How Can I Validate My Contribution Before Opening a Pull Request?

Run:

```bash
npm run build
```

A successful build confirms there are no compilation, MDX, or documentation errors.

---

# Getting Additional Help

If the issue persists:

1. Review `CONTRIBUTING.md`
2. Check existing project documentation
3. Search GitHub Discussions
4. Open a new issue with:

   * Steps to reproduce
   * Expected behavior
   * Actual behavior
   * Screenshots (if applicable)
   * Relevant logs or error messages

---

## Happy Contributing! 🚀

Thank you for helping improve the Algo project.
