# React v18 vs v19

This document outlines the key differences between React v18 and v19. Claude Code should reference this guide when working with React to determine if documentation lookup is needed.

## Quick Reference

## When to Check Documentation

Only check React documentation for the specific areas listed below. For all other React features, use existing knowledge.

## 1. Removed/Deprecated APIs

### ReactDOM.render → createRoot

```jsx
// v18
import { render } from 'react-dom';
render(<App />, document.getElementById('root'));

// v19
import { createRoot } from 'react-dom/client';
const root = createRoot(document.getElementById('root'));
root.render(<App />);
```

**Codemod available**: `npx codemod@latest react/19/replace-reactdom-render`

### ReactDOM.hydrate → hydrateRoot

```jsx
// v18
import { hydrate } from 'react-dom';
hydrate(<App />, document.getElementById('root'));

// v19
import { hydrateRoot } from 'react-dom/client';
hydrateRoot(document.getElementById('root'), <App />);
```

### unmountComponentAtNode → root.unmount()

```jsx
// v18
unmountComponentAtNode(document.getElementById('root'));

// v19
root.unmount();
```

### String Refs - REMOVED

```jsx
// v18 - String refs (REMOVED)
<input ref='input' />
this.refs.input.focus();

// v19 - Use ref callbacks or useRef
<input ref={input => this.input = input} />
this.input.focus();
```

**Codemod available**: `npx codemod@latest react/19/replace-string-ref`

### PropTypes and defaultProps - REMOVED (Function Components)

```jsx
// v18
function Heading({text}) {
  return <h1>{text}</h1>;
}
Heading.propTypes = {
  text: PropTypes.string,
};
Heading.defaultProps = {
  text: 'Hello, world!',
};

// v19 - Use TypeScript or default parameters
interface Props {
  text?: string;
}
function Heading({text = 'Hello, world!'}: Props) {
  return <h1>{text}</h1>;
}
```

**Codemod available**: `npx codemod@latest react/prop-types-typescript`

### Legacy Context API - REMOVED

```jsx
// v18 - Legacy context (REMOVED)
class Parent extends React.Component {
  static childContextTypes = {
    foo: PropTypes.string.isRequired,
  };
  getChildContext() {
    return { foo: 'bar' };
  }
}

// v19 - Use modern context
const FooContext = React.createContext();
class Parent extends React.Component {
  render() {
    return (
      <FooContext.Provider value='bar'>
        {this.props.children}
      </FooContext.Provider>
    );
  }
}
```

### ElementRef → ComponentRef (TypeScript Only)

```ts
// v18/v19 - ElementRef deprecated in TypeScript definitions
React.ElementRef<typeof MyComponent> // Deprecated

// v19 - Use ComponentRef instead
React.ComponentRef<typeof MyComponent> // Preferred
```

**Note**: This is a TypeScript-level deprecation in `@types/react`, not a React runtime change. ElementRef is now an alias to ComponentRef.

### Other Removed APIs

- `React.createFactory` - Use JSX instead
- Module pattern factories - Return JSX directly
- `ReactDOM.findDOMNode` - Use refs instead
- `react-test-renderer/shallow` - Import from `react-shallow-renderer`

## 2. New Features & APIs

### Actions for Async Operations

```jsx
// v19 - Actions with useTransition
function UpdateName() {
  const [isPending, startTransition] = useTransition();

  const handleSubmit = () => {
    startTransition(async () => {
      const error = await updateName(name);
      if (error) {
        setError(error);
        return;
      }
      redirect("/path");
    });
  };

  return (
    <button onClick={handleSubmit} disabled={isPending}>
      Update
    </button>
  );
}
```

### Form Actions

```jsx
// v19 - Form actions
<form action={async (formData) => {
  await submitForm(formData);
}}>
  <input name="username" />
  <button type="submit">Submit</button>
</form>
```

### use() API

```jsx
// v19 - Reading promises with use()
import { use } from 'react';

function Comments({ commentsPromise }) {
  const comments = use(commentsPromise);
  return comments.map(comment => <p key={comment.id}>{comment}</p>);
}
```

### Context as Provider

```jsx
// v18
<ThemeContext.Provider value="dark">

// v19 - Can use Context directly
<ThemeContext value="dark">
```

### ref as Prop (No forwardRef)

```jsx
// v18 - Required forwardRef
const MyInput = forwardRef((props, ref) => {
  return <input ref={ref} {...props} />;
});

// v19 - ref as regular prop
function MyInput({ placeholder, ref }) {
  return <input placeholder={placeholder} ref={ref} />;
}
```

### Document Metadata

```jsx
// v19 - Metadata hoisted to <head>
function BlogPost({ post }) {
  return (
    <article>
      <h1>{post.title}</h1>
      <title>{post.title}</title>
      <meta name="author" content="Josh" />
      <link rel="author" href="https://twitter.com/joshcstory/" />
      <p>Content...</p>
    </article>
  );
}
```

### Stylesheet Management

```jsx
// v19 - Stylesheets with precedence
function Component() {
  return (
    <>
      <link rel="stylesheet" href="foo.css" precedence="high" />
      <link rel="stylesheet" href="bar.css" precedence="default" />
      <div className="foo-class bar-class">...</div>
    </>
  );
}
```

### Async Scripts

```jsx
// v19 - Async scripts deduplicated
function MyComponent() {
  return (
    <div>
      <script async={true} src="analytics.js" />
      Hello World
    </div>
  );
}
```

## 3. TypeScript Changes

### TypeScript Codemods

```bash
# Run all TypeScript migration codemods
npx types-react-codemod@latest preset-19 ./path-to-app

# For extensive element.props access issues
npx types-react-codemod@latest react-element-default-any-props ./path-to-app
```

### ReactElement Props Default to unknown

```ts
// v18 - Props defaulted to 'any'
type Example = ReactElement["props"]; // any

// v19 - Props default to 'unknown'
type Example = ReactElement["props"]; // unknown
```

### useRef and createContext Require Arguments

```ts
// v18 - Could be called without arguments
useRef();
createContext();

// v19 - Arguments required
useRef(undefined);  // Must pass undefined explicitly
createContext(undefined);
```

### Ref Callbacks Can't Have Implicit Returns

```tsx
// v18 - Implicit return
<div ref={current => (instance = current)} />

// v19 - Must use explicit block
<div ref={current => { instance = current }} />
```

### All Refs Are Mutable

```ts
// v18 - Distinction between RefObject and MutableRefObject
const ref = useRef<number>(null); // RefObject (read-only current)

// v19 - All refs are mutable
const ref = useRef<number>(null); // current is always mutable
```

### JSX Namespace Changes

```ts
// v18 - Global augmentation
declare global {
  namespace JSX {
    interface IntrinsicElements {
      "my-element": { myProp: string };
    }
  }
}

// v19 - Module augmentation
declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "my-element": { myProp: string };
    }
  }
}
```

### useReducer Type Inference

```ts
// v18 - Explicit type arguments often needed
useReducer<React.Reducer<State, Action>>(reducer)

// v19 - Better type inference
useReducer(reducer) // Types inferred automatically
```

## 4. Behavioral Changes

### compiledContent() Now Async

```jsx
// v18
const content = myPost.compiledContent();

// v19
const content = await myPost.compiledContent();
```

### Error Reporting Improvements

```jsx
// v19 - New error handling options
const root = createRoot(container, {
  onUncaughtError: (error, errorInfo) => {
    // Log errors not caught by Error Boundaries
  },
  onCaughtError: (error, errorInfo) => {
    // Log errors caught by Error Boundaries
  }
});
```

### Improved Hydration Errors

- Single detailed error message with diff
- Shows exact mismatch between server and client
- Helpful suggestions for common c
