import request from 'supertest';
import { server } from '../src/server/server.js';

// const request = require("supertest");
// const app = require("../src/server/server");

describe("GET /", () => {
  it("responds with a successful status", async () => {
    const response = await request(server).get("/");
    expect(response.statusCode).toBe(200);
  });
});