---
id: react-cheatsheet
title: React Cheatsheet
sidebar_label: React Cheatsheet
sidebar_position: 2
description: Complete quick reference for modern React - Hooks, Components, Patterns, and Best Practices.
tags: [react, javascript, frontend, hooks, cheatsheet]
---

# React Cheatsheet

Modern React (Hooks + Functional Components) – Updated 2026

## Video Explanation

<LiteYouTubeEmbed
  id="SqcY0GlETPk"
  params="autoplay=1&autohide=1&showinfo=0&rel=0"
  title="React Tutorial for Beginners"
  lazyLoad={true}
  webp
/>

## 1. JSX Basics

```jsx
const name = "Alice";
const element = (
  <div className="container">
    <h1>Hello, {name}!</h1>
    <p>Current time: {new Date().toLocaleTimeString()}</p>
  </div>
);
```

## 2. Functional Component

```jsx
import React from 'react';

function Welcome({ name, age }) {
  return <h1>Hello, {name}! You are {age} years old.</h1>;
}

// Arrow function (recommended)
const WelcomeArrow = ({ name }) => <h1>Welcome, {name}!</h1>;
```

## 3. Props

```jsx
// Parent Component
<Welcome name="Sara" age={28} isStudent={true} />

// Child Component
function Welcome({ name, age, isStudent }) {
  return (
    <div>
      <h1>{name}</h1>
      {isStudent && <p>Student</p>}
    </div>
  );
}
```

## 4. State - `useState`

```jsx
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  const [user, setUser] = useState({ name: '', email: '' });

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(c => c + 1)}>+</button>
      <button onClick={() => setCount(c => c - 1)}>-</button>
    </div>
  );
}
```

## 5. Side Effects - `useEffect`

```jsx
import { useState, useEffect } from 'react';

function DataFetcher() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('/api/data')
      .then(res => res.json())
      .then(setData);

    return () => console.log('Cleanup'); // Optional cleanup
  }, []); // Empty array = run once on mount

  return <pre>{JSON.stringify(data, null, 2)}</pre>;
}
```

## 6. Common Hooks

| Hook              | Purpose                              | Example |
|-------------------|--------------------------------------|---------|
| `useState`        | Manage local state                   | `const [val, setVal] = useState(0);` |
| `useEffect`       | Side effects                         | `useEffect(() => {...}, [deps]);` |
| `useContext`      | Consume Context                      | `const theme = useContext(ThemeContext);` |
| `useReducer`      | Complex state logic                  | `const [state, dispatch] = useReducer(reducer, initial);` |
| `useRef`          | DOM access / persist value           | `const inputRef = useRef(null);` |
| `useMemo`         | Memoize expensive values             | `const memoVal = useMemo(() => compute(), [deps]);` |
| `useCallback`     | Memoize functions                    | `const handleClick = useCallback(() => {...}, [deps]);` |

## 7. Event Handling

```jsx
function Form() {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" onChange={(e) => console.log(e.target.value)} />
      <button type="submit">Submit</button>
    </form>
  );
}
```

## 8. Conditional Rendering

```jsx
function App({ isLoggedIn, user }) {
  return (
    <div>
      {isLoggedIn ? <Dashboard user={user} /> : <Login />}
      {isLoggedIn && <Notification />}
    </div>
  );
}
```

## 9. Rendering Lists

```jsx
function TodoList({ todos }) {
  return (
    <ul>
      {todos.map(todo => (
        <li key={todo.id}>
          {todo.text}
        </li>
      ))}
    </ul>
  );
}
```

## 10. Controlled Forms

```jsx
import { useState } from 'react';

function LoginForm() {
  const [form, setForm] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setForm(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <form>
      <input name="email" value={form.email} onChange={handleChange} />
      <input name="password" type="password" value={form.password} onChange={handleChange} />
    </form>
  );
}
```

## 11. Context API

```jsx
// ThemeContext.js
import { createContext, useContext, useState } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
```

## 12. React Router v6

```jsx
import { BrowserRouter as Router, Routes, Route, Link, useParams } from 'react-router-dom';

function App() {
  return (
    <Router>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/user/123">Profile</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user/:id" element={<UserProfile />} />
      </Routes>
    </Router>
  );
}
```

## 13. Custom Hook Example

```jsx
import { useState, useEffect } from 'react';

function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}
```

## 14. Best Practices

- Always add `key` prop when rendering lists
- Use functional state updates: `setState(prev => prev + 1)`
- Extract reusable logic into custom hooks
- Memoize when needed: `React.memo`, `useMemo`, `useCallback`
- Keep components small and focused (Single Responsibility Principle)
- Prefer Composition over Inheritance

