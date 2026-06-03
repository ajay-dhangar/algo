# Troubleshooting Guide

This guide provides solutions for common setup, development, build, and deployment issues encountered while contributing to the **Algo** project.

---

## Installation Issues

### `npm install` Fails

* **Symptoms:** Dependency installation terminates with package resolution, peer dependency conflicts, or environment compatibility errors.

#### 1. Verify Your Environment

Ensure you are using the supported Node.js and npm versions designated for this project:

```bash
node -v
npm -v
```

#### 2. Perform a Clean Installation

If conflicts persist, clear the existing dependencies and lockfiles, then try a fresh installation.

**Linux / macOS**

```bash
rm -rf node_modules package-lock.json
npm install
```

**Windows (PowerShell)**

```powershell
Remove-Item -Recurse -Force node_modules
Remove-Item package-lock.json
npm install
```

---

## Development Server Issues

### Application Fails to Start (`npm start`)

* **Common Causes:** Missing dependencies, unsupported Node.js versions, port conflicts, or incomplete initial setup.

### Resolution Steps

1. **Reinstall dependencies:** Run `npm install` to ensure no packages are missing or corrupted.
2. **Check port availability:** Ensure no other local process is occupying the default development port.
3. **Check Node version:** Verify your environment matches the project's `.nvmrc` or `package.json` engines field.
4. **Restart:** Re-run `npm start`.

### Changes Are Not Reflected in the Browser

If updates to your files aren't hot-reloading in your local environment:

1. Kill the active development server (`Ctrl + C`).
2. Clear your browser cache.
3. Perform a **Hard Refresh** (`Cmd + Shift + R` on Mac or `Ctrl + F5` on Windows) after restarting:

```bash
npm start
```

---

## Build & MDX Issues

### Build Command Fails (`npm run build`)

* ⚠ **Diagnostic Action:** Always review the terminal output directly above the failure flag. Most build errors point to the exact file and line number causing the breakdown.

* **Resolution Steps:**
1. Fix any reported linting, syntax, or TypeScript/compilation errors.
2. Verify that all referenced file paths and named imports exist and match case-sensitively.
3. Re-run `npm run build` to validate.


### MDX Compilation Errors

* **Common Causes:** Unclosed JSX/TSX tags, unescaped special characters (`{`, `<`, etc.), missing component imports, or malformed frontmatter metadata.

```jsx
// ❌ Incorrect
<MyComponent>

//  Correct
<MyComponent />
```

---

## Documentation Issues

### Broken Links

* **Resolution Steps:**
* 
1. Verify the target file actually exists in the workspace.
2. Use **relative paths** (e.g., `../category/file.md`) instead of absolute URLs.
3. Spin up the local server (`npm start`) and physically click the link to confirm navigation works as expected.


### Images Not Displaying

If a rendered page shows a broken image icon, double-check the following:

* **Path Verification:** Ensure the path points correctly to your asset folder.
* **Case Sensitivity:** Verify that file names and extensions match perfectly (e.g., `.png` vs `.PNG`).

```markdown
![Algorithm Diagram](../../static/images/example.png)

```

---

## Deployment Issues

### GitHub Pages Deployment Fails

Before attempting a deployment, always confirm that your project builds cleanly in your local environment:

```bash
npm run build
```

Once the build passes, execute the deployment command matching your GitHub configuration:

**Via SSH**

```bash
USE_SSH=true npm run deploy
```

**Via HTTPS**

```bash
GIT_USER=<your-github-username> npm run deploy
```

---

## Backend Connectivity Issues

### Local API Is Not Reachable

If your frontend documentation components cannot fetch data from the local backend service, verify your environment settings.

* **Default Environment Configuration (`.env`):**
* 
```env
DOCUSAURUS_API_BASE_URL=http://localhost:5000
```


* **Checklist:**
* [ ] Ensure your local backend service is actively running.
* [ ] Confirm the backend is listening on port `5000`.
* [ ] Verify your local firewall or security software isn't blocking local cross-origin requests (CORS).

---

## ❓ Frequently Asked Questions

#### Where should I add new algorithm documentation?

Navigate to the appropriate domain folder within the docs directory and strictly follow the structural rules outlined in our [Contribution Guide](./CONTRIBUTING.md).

#### How can I preview my changes dynamically?

Run `npm start` to spin up the hot-reloading development server, then navigate to `http://localhost:3000` (or the terminal-assigned port).

#### How do I validate everything before opening a Pull Request?

Run `npm run build`. A successful local production build confirms that your MDX syntax, internal links, and configurations are completely error-free.

---

## 🙋 Getting Additional Help

If your issue isn't covered here or persists after trying these solutions:

1. Review the comprehensive guidelines in [CONTRIBUTING.md](./CONTRIBUTING.md).
2. Search through existing [GitHub Discussions](https://github.com/ajay-dhangar/algo/discussions) and Issues to see if someone else solved it.
3. Open a new **Issue** providing:
* 📝 Clear steps to reproduce the bug.
* 🎯 Expected vs. actual behavior.
* 📸 Screenshots or terminal error logs.

---

### Happy Contributing!

Thank you for dedicating your time to making the **Algo** project better!
