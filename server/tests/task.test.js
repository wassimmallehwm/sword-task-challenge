const mongoose = require("mongoose");
const request = require("supertest");
const { DATABASE_URL } = require("../config");
const app = require("../index");

require("dotenv").config();
let cookie = ""

beforeEach(async () => {
    await mongoose.connect(DATABASE_URL);
    const authResponse = await request(app)
        .post('/api/auth/login')
        .send({
            username: "manager01",
            password: "manager01"
        }).expect(200);
    cookie = authResponse.get('Set-Cookie');
});

afterEach(async () => {
    await mongoose.connection.close();
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


describe("Create empty task", () => {
    it("should return bad request", async () => {
        const res = await request(app).post("/api/tasks")
            .set('Cookie', cookie)
            .send({})
        expect(res.statusCode).toBe(400);
    });
});


describe("Get all tasks", () => {
    it("should return all tasks", async () => {
        const res = await request(app).get("/api/tasks")
            .set('Cookie', cookie);
        expect(res.statusCode).toBe(200);
    });
});


describe("Get tasks list paginated", () => {
    it("should return tasks list paginated", async () => {
        const res = await request(app).get("/api/tasks/list?page=1&limit=10")
            .set('Cookie', cookie);
        expect(res.statusCode == 200);
        expect(res.body.docs.length > -1);
        expect(res.body.total == 0);
    });
});