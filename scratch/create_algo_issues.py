import subprocess
import json
import time

def run_cmd(cmd):
    result = subprocess.run(cmd, stdout=subprocess.PIPE, stderr=subprocess.STDOUT, text=True, shell=True, encoding='utf-8', errors='ignore')
    return result.stdout.strip(), result.returncode

def create_issue(title, body):
    # Write body to temp file to avoid shell quoting issues
    with open("scratch/algo_issue_body.md", "w", encoding="utf-8") as f:
        f.write(body)
    
    cmd = f'gh issue create --repo ajay-dhangar/algo --title "{title}" --body-file scratch/algo_issue_body.md'
    out, code = run_cmd(cmd)
    if code == 0:
        print(f"Created: {title}")
        print(f"  URL: {out}")
        return out
    else:
        print(f"FAILED: {title}")
        print(f"  Error: {out}")
        return None

def main():
    assignment_request = "\n\n---\n**Note:** I would love to take the lead on implementing this architecture! Please assign this issue to me."

    issues = [
        {
            "title": "[Feature/DevOps]: Automated Markdown Code Verification Pipeline (CI/CD)",
            "body": """## Description
Currently, algorithms in this repository are written as static code blocks inside `.mdx` files. As the repository grows and multiple languages are supported, there is a high risk of "code rot"—where documented code contains syntax errors, fails to compile, or doesn't actually produce the expected output.

## Proposed Solution
Create a GitHub Action CI/CD pipeline that automatically verifies the correctness of all documented algorithms:
1. Parse all markdown files changed in a PR.
2. Extract the `cpp`, `python`, `java`, and `go` code blocks.
3. Execute them against a suite of predefined inputs/outputs in isolated Docker containers.
4. Fail the CI check if the code doesn't compile or run correctly.

This ensures every single documented algorithm in the repo is mathematically correct and compiles successfully.""" + assignment_request
        },
        {
            "title": "[Feature/Architecture]: WebAssembly (WASM) In-Browser Code Execution Playground",
            "body": """## Description
Currently, running algorithmic code in a browser playground usually requires a backend server infrastructure, which introduces latency, security risks, and server hosting costs.

## Proposed Solution
Integrate WebAssembly (WASM) runtimes directly into the Docusaurus React frontend. 
- Use **Pyodide** for Python execution.
- Use **WASI** or similar for C/C++ execution.

This will allow users to execute the algorithm implementations entirely in their browser locally. It provides a zero-latency, highly scalable playground that requires zero backend infrastructure.""" + assignment_request
        },
        {
            "title": "[Feature/Frontend]: Real-Time Algorithmic Benchmarking Visualizer Component",
            "body": """## Description
Static Big-O notation can be abstract and hard for beginners to intuitively grasp. A visual, real-time benchmark would drastically improve the educational value of the repository.

## Proposed Solution
Build a complex React component using `recharts` and **Web Workers**:
1. Allow users to select two different algorithms (e.g., QuickSort vs BubbleSort).
2. Allow them to input an array size (N).
3. Dynamically run both algorithms in background threads (Web Workers to prevent UI freezing).
4. Plot their real-world execution time on an interactive line chart to visually demonstrate `O(N log N)` vs `O(N^2)` scaling in real-time.""" + assignment_request
        },
        {
            "title": "[Feature/AI]: Automated PR Complexity Analyzer (AST Parsing)",
            "body": """## Description
When contributors submit new algorithms, reviewers currently have to manually verify if the algorithm actually meets its claimed time and space complexity. This is time-consuming and prone to human error.

## Proposed Solution
Create an AST (Abstract Syntax Tree) parsing bot (using Babel/Esprima for JS, or Python's `ast` module) that statically analyzes pull requests.
- It should automatically estimate the Big-O time and space complexity by analyzing nested loops, variable allocations, and recursive calls.
- It should leave an automated comment on the PR confirming or denying the author's claimed complexity.
- This will massively speed up the PR review process and ensure high educational standards.""" + assignment_request
        }
    ]

    for issue in issues:
        print(f"\nCreating: {issue['title']}")
        create_issue(issue["title"], issue["body"])
        time.sleep(2) # Prevent rate limiting

    print("\n\nAll issues created successfully!")

if __name__ == "__main__":
    main()
