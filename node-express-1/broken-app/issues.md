# Broken App Issues
The axios.get() function is returning a promise and we're not actually accessing that.

There is no error argument in the catch block, that was implemented.

Adding middleware so we can have json parsing.

Changed variable "out" to "results" so it's less confusing.

Added a message for when the server starts.

Adding comments.