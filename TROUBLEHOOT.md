# Troubleshooting Guide

This guide helps contributors resolve common issues while setting up, developing, and building the Algo project.

---

## Installation Issues

### npm install fails

#### Error

```bash
npm install
```

fails with dependency-related errors.

#### Solutions

1. Verify your Node.js version:

```bash
node -v
npm -v
```

2. Delete existing dependencies and reinstall:

```bash
rm -rf node_modules package-lock.json
npm install
```

Windows:

```powershell
Remove-Item -Recurse -Force node_modules
Remove-Item package-lock.json
npm install
```

---

## Development Server Issues

### Website does not start

#### Command

```bash
npm start
```

#### Possible Causes

* Missing dependencies
* Incorrect Node.js version
* Port already in use

#### Solutions

Reinstall dependencies:

```bash
npm install
```

Check whether another application is using the default port.

---

### Changes are not reflected in browser

#### Solution

1. Stop the development server.
2. Clear browser cache.
3. Restart:

```bash
npm start
```

---

## Build Issues

### Build command fails

#### Command

```bash
npm run build
```

#### Solutions

Check for syntax errors:

```bash
npm run build
```

Review the error message carefully and fix any invalid Markdown, MDX, or React component imports.

---

### MDX compilation errors

#### Common Causes

* Unclosed JSX tags
* Invalid Markdown syntax
* Missing component imports

#### Example

Incorrect:

```mdx
<MyComponent>
```

Correct:

```mdx
<MyComponent />
```

---

## Documentation Issues

### Broken Links

If links appear broken:

1. Verify the target file exists.
2. Use relative paths whenever possible.
3. Test locally:

```bash
npm start
```

---

### Images Not Displaying

Verify:

```text
static/images/
```

contains the referenced image.

Example:

```md
![Example](../../static/images/example.png)
```

---

## Deployment Issues

### GitHub Pages Deployment Fails

Verify:

```bash
npm run build
```

completes successfully before deployment.

For SSH deployments:

```bash
USE_SSH=true npm run deploy
```

For HTTPS deployments:

```bash
GIT_USER=<github-username> npm run deploy
```

---

## Backend Connection Issues

### Local API Not Reachable

When running the backend locally:

```bash
DOCUSAURUS_API_BASE_URL=http://localhost:5000
```

Verify:

* Backend service is running.
* Port 5000 is accessible.
* Firewall is not blocking requests.

---

## Common Contributor Questions

### Which file should I edit for algorithm content?

Navigate to the relevant documentation folder and follow the contribution guidelines in `CONTRIBUTING.md`.

### How do I preview my changes?

```bash
npm start
```

### How do I verify my contribution before creating a PR?

Run:

```bash
npm run build
```

A successful build helps ensure there are no documentation or compilation errors.

---

## Still Need Help?

* Read `CONTRIBUTING.md`
* Review project documentation
* Open a GitHub Discussion
* Create an issue with detailed reproduction steps and screenshots if applicable

Happy Contributing 🚀
