** Document your bugs here **

- BUG #1: In routes/auth.js in the POST /login route, the User.authenticate() doesn't use the "await" keyword.
- BUG #2: In middleware/auth.js it should be jwt.verify(token, SECRET_KEY)
- BUG #3: In routes/users.js in the DELETE /:username route, there should be an await keyword with User.delete() line.
- BUG #4: In helpers/partialUpdate.js we have a bug with the for loop in where key is being used here and then again outside the function.
- BUG #5: In models/user.js a new ExpressError is created but never thrown with the throw keyword.
- BUG #6: In models/user.js the getAll() function accepts parameters that it never uses.
