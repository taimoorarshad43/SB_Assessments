### Conceptual Exercise

Answer the following questions below:

- What is the purpose of the React Router?
  - React Router allows you to load different React Components without reloading the page.

- What is a single page application?
  - A SPA is an app that has different "pages" but in fact it's all one HTML file that has different content that is shown or not shown.

- What are some differences between client side and server side routing?
  - Server-side routing involves the server responding to requests for different URLs by sending back different HTML pages, while client-side routing uses JavaScript to dynamically change the content of a single HTML page without reloading it.

- What are two ways of handling redirects with React Router? When would you use each?
  - You can either use the <Redirect> component or useHistory().

- What are two different ways to handle page-not-found user experiences using React Router? 
  - One way is to use a route at the end of your routes that doesn't match other routes and will give a not found message. Another way is to use a 404 component that is rendered when no other routes match.

- How do you grab URL parameters from within a component using React Router?
  - You can use the useParams hook to access URL parameters within a component.

- What is context in React? When would you use it?
  - Context is a way to have global data in your React component and can help you avoid constanstly passing the same data down in props.

- Describe some differences between class-based components and function
  components in React.
  - Class-based components use classes and have lifecycle methods, while function components are simpler and can use hooks for state and lifecycle management.

- What are some of the problems that hooks were designed to solve?
  - Hooks can share data between components as well as managing state and other side effects without needing to use class-based components