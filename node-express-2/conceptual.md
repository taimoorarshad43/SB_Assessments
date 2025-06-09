### Conceptual Exercise

Answer the following questions below:

- What is a JWT?
  - JWTs are JSON Web Tokens

- What is the signature portion of the JWT?  What does it do?
  - The signature portion is unique to the server that sent it and is made with a combination of a server "secret" and a signing algorithm.
  - It lets the recepient know who sent the JWT.

- If a JWT is intercepted, can the attacker see what's inside the payload?
  - Yes, the payload is signed not encrypted.

- How can you implement authentication with a JWT?  Describe how it works at a high level.
  - When a client to a backend authenticates, the server will send JWTs to that client but only if authentication was done.
  - You'll still need something else to authenticate but you can use the JWTs for authorization afterwards.

- Compare and contrast unit, integration and end-to-end tests.
  - Unit tests test individual components, integration tests test different components put together, and end-to-end tests will
  - test everything from beginning to end mimicking an end user experience.

- What is a mock? What are some things you would mock?
  - Mock are things that mimick real world/production aspects. These are external parts such as data or services that exist outside your application that can be mimicked
  - without impacting your base code.

- What is continuous integration?
  - Continuous integration is the practice of continuously adding code bits through automated pipelines. It means that small code bits are integrated
  - and pass testing through an automated pipeline.

- What is an environment variable and what are they used for?
  - An environment variable is stored in the local environment and helps keep some secure values secret such as API keys or other sensitive information.
  - Each local environment should have their own environmental values.

- What is TDD? What are some benefits and drawbacks?
  - Test Driven Development is writing the tests of your application/software before you develop. The idea is that all software should conform to tests so that everything
  - is as stable as possible.

- What is the value of using JSONSchema for validation?
  - JSONSchema allows you to have standardized validation for your JSON payloads to your API and allows for validation, and standardization.

- What are some ways to decide which code to test?
  - If code is generating things, we should test for that. Any code that changes data should be tested.
  - Code that handles sensitive information or it's failure has large impacts for end users (such as security breaches) should be tested.

- What does `RETURNING` do in SQL? When would you use it?
  - The returning keyword is used to retrieve the rows affected by DML statements such as INSERT, UPDATE, or DELETE.

- What are some differences between Web Sockets and HTTP?
  - Web Sockets are duplex and stateful while HTTP is stateless. Web Sockets are also more lightweight.

- Did you prefer using Flask over Express? Why or why not (there is no right
  answer here --- we want to see how you think about technology)?
  - I prefer Flask because it seems more declaritive and easier to use.
