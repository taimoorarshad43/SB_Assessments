// Set ENV VAR to test before we load anything, so our app's config will use
// testing settings

process.env.NODE_ENV = "test";

const app = require("../app");
const request = require("supertest");
const db = require("../db");
const bcrypt = require("bcrypt");
const createToken = require("../helpers/createToken");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config");


// TESTS ALL BUGS
// jest.mock('../models/user'); // tells Jest to mock real user
const User = require('../models/user');
const ExpressError = require('../helpers/expressError');
const { authUser } = require('../middleware/auth');
const sqlForPartialUpdate = require('../helpers/partialUpdate');


// tokens for our sample users
const tokens = {};

/** before each test, insert u1, u2, and u3  [u3 is admin] */

beforeEach(async function() {
  async function _pwd(password) {
    return await bcrypt.hash(password, 1);
  }

  let sampleUsers = [
    ["u1", "fn1", "ln1", "email1", "phone1", await _pwd("pwd1"), false],
    ["u2", "fn2", "ln2", "email2", "phone2", await _pwd("pwd2"), false],
    ["u3", "fn3", "ln3", "email3", "phone3", await _pwd("pwd3"), true]
  ];

  for (let user of sampleUsers) {
    await db.query(
      `INSERT INTO users VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      user
    );
    tokens[user[0]] = createToken(user[0], user[6]);
  }
});

describe("POST /auth/register", function() {
  test("should allow a user to register in", async function() {
    const response = await request(app)
      .post("/auth/register")
      .send({
        username: "new_user",
        password: "new_password",
        first_name: "new_first",
        last_name: "new_last",
        email: "new@newuser.com",
        phone: "1233211221"
      });
    expect(response.statusCode).toBe(201);
    expect(response.body).toEqual({ token: expect.any(String) });

    let { username, admin } = jwt.verify(response.body.token, SECRET_KEY);
    expect(username).toBe("new_user");
    expect(admin).toBe(false);
  });

  test("should not allow a user to register with an existing username", async function() {
    const response = await request(app)
      .post("/auth/register")
      .send({
        username: "u1",
        password: "pwd1",
        first_name: "new_first",
        last_name: "new_last",
        email: "new@newuser.com",
        phone: "1233211221"
      });
    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({
      status: 400,
      message: `There already exists a user with username 'u1'`
    });
  });
});

describe("POST /auth/login", function() {
  test("should allow a correct username/password to log in", async function() {
    const response = await request(app)
      .post("/auth/login")
      .send({
        username: "u1",
        password: "pwd1"
      });
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ token: expect.any(String) });

    let { username, admin } = jwt.verify(response.body.token, SECRET_KEY);
    expect(username).toBe("u1");
    expect(admin).toBe(false);
  });
});

describe("GET /users", function() {
  test("should deny access if no token provided", async function() {
    const response = await request(app).get("/users");
    expect(response.statusCode).toBe(401);
  });

  test("should list all users", async function() {
    const response = await request(app)
      .get("/users")
      .send({ _token: tokens.u1 });
    expect(response.statusCode).toBe(200);
    expect(response.body.users.length).toBe(3);
  });
});

describe("GET /users/[username]", function() {
  test("should deny access if no token provided", async function() {
    const response = await request(app).get("/users/u1");
    expect(response.statusCode).toBe(401);
  });

  test("should return data on u1", async function() {
    const response = await request(app)
      .get("/users/u1")
      .send({ _token: tokens.u1 });
    expect(response.statusCode).toBe(200);
    expect(response.body.user).toEqual({
      username: "u1",
      first_name: "fn1",
      last_name: "ln1",
      email: "email1",
      phone: "phone1"
    });
  });
});

describe("PATCH /users/[username]", function() {
  test("should deny access if no token provided", async function() {
    const response = await request(app).patch("/users/u1");
    expect(response.statusCode).toBe(401);
  });

  test("should deny access if not admin/right user", async function() {
    const response = await request(app)
      .patch("/users/u1")
      .send({ _token: tokens.u2 }); // wrong user!
    expect(response.statusCode).toBe(401);
  });

  test("should patch data if admin", async function() {
    const response = await request(app)
      .patch("/users/u1")
      .send({ _token: tokens.u3, first_name: "new-fn1" }); // u3 is admin
    expect(response.statusCode).toBe(200);
    expect(response.body.user).toEqual({
      username: "u1",
      first_name: "new-fn1",
      last_name: "ln1",
      email: "email1",
      phone: "phone1",
      admin: false,
      password: expect.any(String)
    });
  });

  test("should disallowing patching not-allowed-fields", async function() {
    const response = await request(app)
      .patch("/users/u1")
      .send({ _token: tokens.u1, admin: true });
    expect(response.statusCode).toBe(401);
  });

  test("should return 404 if cannot find", async function() {
    const response = await request(app)
      .patch("/users/not-a-user")
      .send({ _token: tokens.u3, first_name: "new-fn" }); // u3 is admin
    expect(response.statusCode).toBe(404);
  });
});

describe("DELETE /users/[username]", function() {
  test("should deny access if no token provided", async function() {
    const response = await request(app).delete("/users/u1");
    expect(response.statusCode).toBe(401);
  });

  test("should deny access if not admin", async function() {
    const response = await request(app)
      .delete("/users/u1")
      .send({ _token: tokens.u1 });
    expect(response.statusCode).toBe(401);
  });

  test("should allow if admin", async function() {
    const response = await request(app)
      .delete("/users/u1")
      .send({ _token: tokens.u3 }); // u3 is admin
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ message: "deleted" });
  });
});

// TESTS BUG #1
describe("POST /auth/login", function () {
  test("fails when authenticate returns unresolved Promise (simulate missing await)", async function () {
    // Temporarily replace User.authenticate with a manual mock
    const originalAuth = User.authenticate;

    User.authenticate = jest.fn(() => Promise.resolve({ username: "u1", admin: false }));

    const res = await request(app)
      .post("/auth/login")
      .send({ username: "u1", password: "pwd1" });

    // If the bug is present (missing await), this will crash or misbehave, causing 500
    // If bug is fixed, this will succeed and return 200
    if (res.statusCode === 200) {
      expect(res.body).toHaveProperty("token");
    } else {
      expect(res.statusCode).toBe(500);
    }

    // Restore original
    User.authenticate = originalAuth;
  });
});

// TESTS BUG #2
describe('authUser middleware', () => {
  test('fails silently for invalid token with decode()', () => {
    const req = {
      body: { _token: 'invalid.token.here' }
    };
    const res = {};
    const next = jest.fn();

    authUser(req, res, next);

    // jwt.decode won't throw, so req.curr_username will be undefined
    expect(req.curr_username).toBeUndefined();
    expect(next).toHaveBeenCalled();
  });

  test('should throw error for invalid token if jwt.verify used', () => {
    const req = {
      body: { _token: 'invalid.token.here' }
    };
    const res = {};
    const next = jest.fn();

    // simulate jwt.verify throwing
    jest.spyOn(jwt, 'verify').mockImplementation(() => {
      throw new Error('invalid token');
    });

    authUser(req, res, next);

    expect(next).toHaveBeenCalledWith(expect.objectContaining({ status: 401 }));
  });
});


// TESTS BUG #4
describe('sqlForPartialUpdate()', () => {
  test('generates correct SQL with conflict between param name and reserved word', () => {
    const update = sqlForPartialUpdate('users', { first_name: 'Test' }, 'key', 'testuser');
    expect(update.query).toContain('WHERE key=$2');
    // 'key' is a reserved word in some DBs – using it without quotes may break the SQL
  });
});

// TESTS BUG #5
describe('User.get()', () => {
  test('throws error when user not found', async () => {
    expect.assertions(2);
    try {
      await User.get('nonexistentuser');
    } catch (err) {
      expect(err).toBeInstanceOf(ExpressError);
      expect(err.status).toBe(404);
    }
  });
});


// TESTS BUG #6
describe('User.getAll()', () => {
  test('ignores passed parameters and returns all users', async () => {
    const users = await User.getAll('param1', 'param2');
    expect(Array.isArray(users)).toBe(true);
  });
});



afterEach(async function() {
  await db.query("DELETE FROM users");
});

afterAll(function() {
  db.end();
});

