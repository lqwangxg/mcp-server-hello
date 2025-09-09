# TypeScript Development Guidelines

This document outlines best practices for developing with TypeScript in this project, aiming to improve code quality, maintainability, and collaboration.

## 1. Embrace Strict Type-Checking

*   **Enable Strict Mode:** Always start with `"strict": true` in your `tsconfig.json`. This enables a suite of type-checking options that enforce rigorous type safety and catch subtle bugs.
*   **Key Strict Options:**
    *   `noImplicitAny`: Prevents variables from implicitly having the `any` type.
    *   `strictNullChecks`: Ensures variables cannot be `null` or `undefined` unless explicitly allowed.
    *   `strictFunctionTypes`: Enforces correct function type inference.
    *   `strictPropertyInitialization`: Ensures class properties are initialized correctly.
    *   `noImplicitThis`: Flags `this` expressions with an implied `any` type.

## 2. Smart Type Usage

*   **Avoid `any` and Prefer `unknown`:** Overusing `any` defeats the purpose of TypeScript's static type checking. Prefer `unknown` when the type is truly uncertain, as it forces explicit type narrowing before use, leading to safer code.
*   **Explicit Return Types:** Always specify the return type for functions to make code more predictable and help TypeScript catch errors.
*   **Interfaces vs. Type Aliases:**
    *   **Interfaces:** Prefer interfaces for defining the shape of objects, especially when you expect objects to have a consistent shape that could benefit from inheritance or future extension.
    *   **Type Aliases:** Use type aliases for unions, intersections, primitives, or complex type manipulations.
*   **Utility Types:** Leverage built-in utility types like `Partial<T>`, `Readonly<T>`, `Pick<T>`, and `Omit<T>` to reduce repetitive code and simplify type transformations.
*   **`readonly` and Immutability:** Use `readonly` modifiers for properties and `ReadonlyArray` to prevent accidental modifications, promoting immutable data structures.
*   **`never` for Exhaustive Checks:** When working with union types, use `never` in `switch` statements to ensure all cases are handled, preventing unhandled states.
*   **Template Literal Types:** Utilize template literal types for creating dynamic string-based types, enforcing specific patterns for strings like API endpoints or event names.
*   **`satisfies` Operator:** Use `satisfies` for type assertions to enforce type constraints while maintaining flexibility and leveraging type inference.
*   **Union Types:** Prefer union types for variables that can hold multiple possible types.
*   **Type Guards:** Employ type guards (e.g., `typeof`, `instanceof`, custom type predicates) to narrow down data type possibilities at runtime, ensuring type safety.

## 3. Code Organization and Structure

*   **Modularization:** Break down your project into multiple files and modules, with each handling a single responsibility. This improves readability, simplifies maintenance, and minimizes merge conflicts.
*   **Consistent File Naming:** Adopt consistent naming conventions for files and directories for clarity and organization.
*   **Directory Structure:** Organize your project with clear directories, such as `src/` for source code, `dist/` for compiled output, `tests/` for tests, `config/` for configuration, `assets/` for static assets, `types/` for global type definitions, `hooks/` for custom hooks, and `services/` for API calls.
*   **Barrel Files (`index.ts`): Use barrel files to create single entry points for module exports, making import statements cleaner.

## 4. Coding Style and Readability

*   **Consistent Coding Style:** Maintain a consistent coding style across the project using tools like ESLint and Prettier to enforce rules for indentation, semicolons, quotes, and other formatting.
*   **Descriptive Naming:** Use clear and descriptive names for variables, functions, classes, and interfaces.
*   **Pure and Concise Functions:** Write pure functions (without side effects) that are concise and ideally 5-10 lines long, making them easier to test and understand.
*   **Avoid Long Functions and Excessive Parameters:** Long functions often indicate too many responsibilities. Limit function parameters (ideally one or two, maximum three) by consolidating related arguments into higher-level objects.
*   **`const` and `let`:** Always use `const` or `let` for variable declarations, preferring `const` by default. Never use `var`.
*   **Comments and Documentation:** Add comments sparingly, focusing on *why* something is done. Use JSDoc for documenting top-level exports, classes, functions, and modules to define parameters, types, and behavior.

## 5. Error Handling and Robustness

*   **Effective Error Handling:** Implement `try-catch` blocks for exceptions and define custom error types for clearer error messages.
*   **Prefer Immutability:** Favor immutable data structures to prevent bugs related to unexpected state changes.

## 6. Tooling and Automation

*   **Linting (ESLint) and Formatting (Prettier):** Integrate ESLint (with TypeScript support) and Prettier into your workflow to enforce consistent coding practices and formatting automatically.
*   **Documentation Tools:** Use tools like TypeDoc to generate documentation from your TypeScript comments.

## 7. Continuous Improvement

*   **Regular Upgrades:** Keep your TypeScript version up-to-date to leverage new features, improved type inference, and performance enhancements.
*   **Testing:** Write unit and integration tests in TypeScript using frameworks like Jest or Mocha to catch bugs and prevent regressions.
