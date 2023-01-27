const mongoose = require("mongoose");
const request = require("supertest");
const { DATABASE_URL } = require("../config");
const { app } = require("../app");

require("dotenv").config();
let cookies = null

beforeEach(async () => {
    await mongoose.connect(DATABASE_URL);
});

afterEach(async () => {
    await mongoose.connection.close();
});

describe("Authenticate user", () => {
    it("should authenticate user", async () => {
        const res = await request(app)
            .post('/api/auth/login')
            .send({
                username: "manager01",
                password: "manager01"
            });
        expect(res.statusCode).toBe(200);
        expect(res.body != null);
        cookies = res.get('Set-Cookie')
    });
});

describe("Unauthorized user create task", () => {
    it("should return bad request", async () => {
        const res = await request(app).post("/api/tasks")
            .send({
                title: 'Task one',
                summary: "My first task's summary"
            })
        expect(res.statusCode).toBe(401);
    });
});

describe("Update task with invalid id param", () => {
    it("should return task not found", async () => {
        const res = await request(app).put("/api/tasks/")
            .set('Cookie', cookies)
            .send({
                title: 'Task one',
                summary: "My first task's summary"
            })
        expect(res.statusCode).toBe(404);
    });
});

describe("Create empty task", () => {
    it("should return bad request", async () => {
        const res = await request(app).post("/api/tasks")
            .set('Cookie', cookies)
            .send({})
        expect(res.statusCode).toBe(400);
    });
});

describe("Get all tasks", () => {
    it("should return all tasks", async () => {
        const res = await request(app).get("/api/tasks")
            .set('Cookie', cookies);
        expect(res.statusCode).toBe(200);
    });
});

describe("Get tasks list paginated", () => {
    it("should return tasks list paginated", async () => {
        const res = await request(app).get("/api/tasks/list?page=1&limit=10")
            .set('Cookie', cookies);
        expect(res.statusCode == 200);
        expect(res.body.docs.length > -1);
        expect(res.body.total == 0);
    });
});

describe("Delete task with invalid id param", () => {
    it("should return task not found", async () => {
        const res = await request(app).delete("/api/tasks/")
            .set('Cookie', cookies);
        expect(res.statusCode).toBe(404);
    });
});