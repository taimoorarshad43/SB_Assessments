### Conceptual Exercise

Answer the following questions below:

- What is React? When and why would you use it?
  - React is a frontend library for developing a dedicated frontend that interfaces with a backend. You use it when you want to separate your frontend into
  - siloed components.

- What is Babel?
  - Babel is a transpiler that takes your React code and makes into syntax correct JS.

- What is JSX?
  - JSX is the code you write your React in and is not entirely syntactically JS frienldy and needs a transpiler to make into something useable.

- How is a Component created in React?
  - A component is created by returning JSX and having the React tool chain ready. You can either have them included in script tags or use something like CRA or Vite.

- What are some difference between state and props?
  - State is information that is can be mutable and needs to persist between rerenders. Props are immutable and are passed down by parent components.

- What does "downward data flow" refer to in React?
  - You generally pass data downwards from parent components to child components through prop values.

- What is a controlled component?
  - A controlled component is a React component in where React controls the state and is the single source of truth.

- What is an uncontrolled component?
  - A uncontrolled component is one where the DOM controls the component and you use useRef() to manage these.

- What is the purpose of the `key` prop when rendering a list of components?

- Why is using an array index a poor choice for a `key` prop when rendering a list of components?

- Describe useEffect.  What use cases is it used for in React components?
  - The useEffect() is similar to useState() except it can be set to only render once or rerender only when a certain value of state is changed.

- What does useRef do?  Does a change to a ref value cause a rerender of a component?
  - The useRef() function is similar to useState() except changing values doesn't cause a rerender. You use it to access and manipulate the DOM.

- When would you use a ref? When wouldn't you use one?
  - You'd want to use a ref to manipulate or access uncontrolled components but you should have React control the state and data flow of your components.

- What is a custom hook in React? When would you want to write one?
  - A custom hook is javascript function that uses built in hooks. You'd write them when you need to refactor your code for better readibility.
  - Or you want to package repeating business logic to use in multiple components.
