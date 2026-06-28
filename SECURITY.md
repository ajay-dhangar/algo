# Security Policy

## Supported Versions

| Version | Supported |
| ------- | --------- |
| latest  | :white_check_mark: |
| 5.1.x   | :white_check_mark: |
| 5.0.x   | :x:                |
| 4.0.x   | :white_check_mark: |
| < 4.0   | :x:                |

## Reporting a Vulnerability

If you discover a security vulnerability, please report it responsibly:

1. **GitHub Security Advisories**: Use the "Report a vulnerability" button on the [Security tab](https://github.com/ajay-dhangar/algo/security/advisories)
2. **Do NOT** open public issues for security vulnerabilities

We aim to acknowledge reports within 48 hours and provide a fix timeline within 7 days.

## Scope

Vulnerabilities in the following are considered in-scope:
- The Docusaurus website configuration and deployment
- Documentation content and build scripts
- Any authentication or authorization mechanisms (excluding client-side sandbox/mock limitations)

Out-of-scope:
- Third-party dependencies (report to their respective maintainers)
- Client-side mock authentication limitations (e.g., local storage, client-side hashing)

## Disclosure Policy

We follow a coordinated disclosure process:
1. Reporter submits vulnerability via Security Advisory
2. Maintainer acknowledges receipt within 48 hours
3. Fix is developed and tested in private
4. Fix is released, and the advisory is published publicly
