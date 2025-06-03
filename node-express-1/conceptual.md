### Conceptual Exercise

Answer the following questions below:

- What are some ways of managing asynchronous code in JavaScript?
  - You can use either Promises or async functions with the await keyword

- What is a Promise?
  - A promise is a function that returns either a resolution or rejection. You need to run a .then() to access the resolution.

- What are the differences between an async function and a regular function?
  - An async function will use the await keyword to make sure asynchronous tasks are done in sequence. A regular function kick off asynchronous tasks but will
  - not wait for their completion before moving onto the next line of code.

- What is the difference between Node.js and Express.js?
  - Node.js is a runtime for Javascript outside the browser, while Express.js is a webframework for Node.js to make and run web servers.

- What is the error-first callback pattern?
  - This is a style in Node.js in where the first argument in a callback is error information.

- What is middleware?
  - Middleware is code or functions that run between the request/response cycle, such as parsing JSONs.

- What does the `next` function do?
  - The next() function is used in middleware to advance to the next URL patterned function.

- What are some issues with the following code? (consider all aspects: performance, structure, naming, etc)
  - You don't need to do await for each GET call. You can do this asynchronously without the await keyword.
  - The order of the return values doesn't make sense.
  - The naming should be more descriptive, what are we getting back from these URLs? We should name them with better details.
  - There should be a try/catch block or the whole thing fails if one URL has an issue.
  - We could instead use a list of names and go through them instead of hardcoding the names.

```js
async function getUsers() {
  const elie = await $.getJSON('https://api.github.com/users/elie');
  const joel = await $.getJSON('https://api.github.com/users/joelburton');
  const matt = await $.getJSON('https://api.github.com/users/mmmaaatttttt');

  return [elie, matt, joel];
}
```
