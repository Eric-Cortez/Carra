# Project Style Guide

## Code Style

## Frontend Code Style

### General Formatting

- **Indentation**: Use 2 spaces for indentation.
- **Line Length**: Limit lines to 80 characters where possible.
- **Quotes**: Use single quotes (`'`) for strings, except when using template literals or escaping is required.
- **Semicolons**: Always use semicolons.
- **Trailing Commas**: Use trailing commas in multiline objects and arrays.
- **File Encoding**: Ensure all files are UTF-8 encoded.

### Naming

- Use **PascalCase** for components (e.g., `MyComponent.jsx`).
- Use **camelCase** for variables and functions.

### Imports

Group imports logically:

1. External libraries first.
2. Internal modules and components next.
3. Styles or assets last.

### Variables

- Use `const` for variables that won’t be reassigned, and `let` otherwise.

### Functions

- Prefer arrow functions over traditional syntax for callbacks.

### Destructuring

- Use destructuring for props, objects, and arrays when applicable.

### Conditionals

- Use short-circuiting or ternary operators for inline conditional rendering:

  ```tsx
  // Inline conditional
  {
    isLoggedIn && <WelcomeMessage />;
  }

  // Ternary for conditional content
  {
    isAdmin ? <AdminPanel /> : <UserDashboard />;
  }
  ```

### Styling

- Use utility-first CSS (e.g., TailwindCSS) or CSS modules instead of inline styles.

### Comments

- Use // for inline comments.
- Use /\*\* \*/ for function or component descriptions:

```ts
// This is an inline comment

/**
 * UserProfile component
 * Displays user details with profile picture
 */
const UserProfile = ({ user }) => {
  return <div>{user.name}</div>;
};
```

### General Formatting

- **Indentation**: Use 2 spaces for indentation.
- **Line Length**: Limit lines to 80 characters where possible.
- **Quotes**: Use single quotes (`'`) for strings, except when using template literals or escaping is required.
- **Semicolons**: Always use semicolons.
- **Trailing Commas**: Use trailing commas in multiline objects and arrays.
- **File Encoding**: Ensure all files are UTF-8 encoded.

### Naming

- Use **PascalCase** for components (e.g., `MyComponent.jsx`).
- Use **camelCase** for variables and functions.

### Imports

Group imports logically:

1. External libraries first.
2. Internal modules and components next.
3. Styles or assets last.

### Variables

- Use `const` for variables that won’t be reassigned, and `let` otherwise.

### Functions

- Prefer arrow functions over traditional syntax for callbacks.

### Destructuring

- Use destructuring for props, objects, and arrays when applicable.

### Conditionals

- Use short-circuiting or ternary operators for inline conditional rendering:

  ```jsx
  // Inline conditional
  {isLoggedIn && <WelcomeMessage />}

  // Ternary for conditional content
  {isAdmin ? <AdminPanel /> : <UserDashboard />}
  Styling
  Use utility-first CSS (e.g., TailwindCSS) or CSS modules instead of inline styles.
  Comments
  Use // for inline comments.
  Use /** */ for function or component descriptions:
  jsx
  // This is an inline comment
  ```

### Best Practices

- Keep components small and focused on a single responsibility.
- Break down large components into smaller, reusable ones.
- Write clear and descriptive prop names.
- Avoid hardcoding styles; use utility classes or theme variables.
- Ensure components are accessible and adhere to ARIA standards.
- Use PropTypes or TypeScript for type checking where applicable.
- Write tests for critical components and functionality.

<!-- ## Backend Code Style TODO -->

# Git Commit Style Guide

### General Guidelines

- **Keep commit messages clear, concise, and descriptive**.
- **Use present tense** for commit messages (e.g., "Add new feature" not "Added new feature").
- **Limit the subject line** to 50 characters or less.
- **Separate the subject and body** with a blank line.
- **Use a single blank line** between paragraphs in the body.
- **Capitalize the first letter** of the subject.
- **Do not end the subject line with a period**.
- **Wrap the body text** at 72 characters.

### Commit Message Structure

Each commit message should follow this structure:

```
<type>: <area working on>: <title>

<optional body with additional details>
```

### Types

feat: A new feature.
fix: A bug fix.
docs: Documentation only changes.
style: Code style changes (formatting, missing semicolons, etc.).
refactor: Code changes that neither fix a bug nor add a feature.
test: Adding or correcting tests.
chore: Miscellaneous changes (e.g., build system, tooling).

Example:

```
feat: frontend: Add search functionality

Added a search bar to the homepage for better user experience. Integrated it with the backend API for dynamic search results.

fix: backend: Resolve API crash on missing parameters

Handled missing parameter error case in the API endpoint, preventing crashes and providing a clear error message.

```

Commit Message Body
Provide additional details in the body if the change is complex.
Explain the why behind the change, not just the what.
Prefix Commit with Area
For commits related to specific areas of the project, prefix the commit message with the area being worked on. Common prefixes include:

- frontend - For changes to the frontend (React, Tailwind etc.)
  backend - For changes to the backend (Go, Node, etc.)
  api - For changes to the API layer.
  database - For database migrations or changes to schema.
  Example

```
  feat: frontend: Implement login form
```

- Added form validation for login
- Integrated with backend authentication API
- Redirects to user dashboard upon successful login
