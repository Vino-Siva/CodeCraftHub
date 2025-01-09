const request = require("supertest");
const app = require("../config/server"); // Import the app

describe("User Controller", () => {
  it("should register a new user", async () => {
    const res = await request(app).post("/api/users/register").send({
      username: "testuser",
      email: "test@example.com",
      password: "password123",
    });
    expect(res.statusCode).toEqual(201);
    expect(res.body.message).toBe("User registered successfully");
  });

  it("should login an existing user", async () => {
    await request(app).post("/api/users/register").send({
      username: "testuser",
      email: "test@example.com",
      password: "password123",
    });

    const res = await request(app).post("/api/users/login").send({
      email: "test@example.com",
      password: "password123",
    });
    expect(res.statusCode).toEqual(200);
    expect(res.body.token).toBeDefined();
  });

  it("should return error for invalid credentials", async () => {
    const res = await request(app).post("/api/users/login").send({
      email: "invalid@example.com",
      password: "wrongpassword",
    });
    expect(res.statusCode).toEqual(401);
    expect(res.body.error).toBe("Invalid credentials");
  });
});
