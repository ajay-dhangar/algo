Title: `POST /api/execute-code` fails for Java sources with package declarations

Description
-----------
The server's `/api/execute-code` endpoint cannot run Java code that declares a package (e.g. `package com.example;`). The endpoint compiles the source but then attempts to run the class by its simple name which fails when the compiled `.class` files are placed in package subdirectories.

Affected file
-------------
- `server/server.js` (Java execution handling and cleanup)

Reproduction
------------
1. Start the backend: `npm run server:dev`
2. Send the following request to the endpoint (example using `curl`):

```bash
curl -X POST http://localhost:5000/api/execute-code \
  -H 'Content-Type: application/json' \
  -d '{"language":"java","code":"package demo;\npublic class Hello { public static void main(String[] args){System.out.println(\"hi\");} }" }'
```

Expected behavior
-----------------
The request should compile the code and return success with stdout containing `hi`.

Actual behavior
---------------
The server returns a runtime error (ClassNotFoundException) because it runs `java Hello` instead of `java -cp <tempDir> demo.Hello`, or fails to locate the class when package directories are created.

Root cause
----------
- The code previously used `javac "<abs-path>" && java "<ClassName>"` which only works for classes in the default package.
- It did not run `javac -d <outdir>` to place compiled classes into the proper package directories nor used the fully-qualified class name when running `java`.

Suggested fix
-------------
- Compile into the temporary directory using `javac -d <tempDir> <source-file>`.
- Extract the package name (if any) from the source and run `java -cp <tempDir> <package>.<ClassName>` (or just `<ClassName>` when there is no package).
- Update cleanup to remove compiled `.class` files from package subdirectories.

Patch
-----
A minimal patch has been applied in the workspace that:
- Compiles with `javac -d "${tempDir}" "${filename}"`
- Runs with `java -cp "${tempDir}" "${fqcn}"` where `fqcn` includes package prefix if present
- Attempts to remove compiled class file and empty package directories after execution

Notes
-----
- This issue is distinct from previously fixed scoring bug; it affects multi-language playground functionality when users submit Java source files with `package` declarations.

Would you like me to open a GitHub issue with this content and create a PR including the change I already applied? If so I can push a branch and open the issue/PR for you.