const mongoose = require("mongoose");
const request = require("supertest");
const { DATABASE_URL } = require("../config");
const { app } = require("../app");
const RedisCaching = require('../config/RedisCaching')

require("dotenv").config();
let cookies = null
let techCookies = null
let secondTechCookies = null
let taskItem = null
let techOneTaskId = null
const date = new Date()

beforeEach(async () => {
    await mongoose.connect(DATABASE_URL);
    await RedisCaching.invalidateCache({originalUrl: '/api/tasks'})
});

afterEach(async () => {
    await mongoose.connection.close();
});

describe("Authenticate Manager", () => {
    it("should authenticate Manager", async () => {
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

describe("Authenticate Technician", () => {
    it("should authenticate Technician", async () => {
        const res = await request(app)
            .post('/api/auth/login')
            .send({
                username: "technician01",
                password: "technician01"
            });
        expect(res.statusCode).toBe(200);
        expect(res.body != null);
        techCookies = res.get('Set-Cookie')
    });
});

describe("Authenticate Technician 2", () => {
    it("should authenticate Technician 2", async () => {
        const res = await request(app)
            .post('/api/auth/login')
            .send({
                username: "technician02",
                password: "technician02"
            });
        expect(res.statusCode).toBe(200);
        expect(res.body != null);
        secondTechCookies = res.get('Set-Cookie')
    });
});

describe("Create task", () => {
    it("should create task", async () => {
        const res = await request(app).post("/api/tasks")
            .set('Cookie', techCookies)
            .send({
                title: `Task_${date.getTime()}`,
                summary: `Task summary ${date.getTime()}`
            })
            expect(res.statusCode).toBe(201);
            expect(res.body != null);
            techOneTaskId = res.body._id
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

describe("Fetch tasks list paginated", () => {
    it("should return tasks list paginated", async () => {
        const res = await request(app).post("/api/tasks/list")
            .set('Cookie', cookies)
        taskItem = res.body.docs[0]._id
        expect(res.statusCode == 200);
        expect(res.body.docs.length > 0);
        expect(res.body.total > 0);
    });
});

describe("Fetch unperformed tasks ", () => {
    it("should return unperformed tasks list", async () => {
        const res = await request(app).post("/api/tasks/list")
            .set('Cookie', cookies)
            .send({filterModel: [
                {operatorValue: 'is', columnField: 'isPerformed', value: false}
            ]})
        expect(res.statusCode == 200);
        expect(res.body.docs.find(elem => elem.isPerformed) == undefined);
        expect(res.body.docs.filter(elem => !elem.isPerformed).length > 0);
    });
});

describe("Fetch 5 tasks ", () => {
    it("should return 5 tasks list", async () => {
        const res = await request(app).post("/api/tasks/list")
            .set('Cookie', cookies)
            .send({page: 1, limit: 5})
        expect(res.statusCode == 200);
        expect(res.body.docs.length == 5);
    });
});


describe("Update task with invalid id param", () => {
    it("should return task not found", async () => {
        const res = await request(app).put("/api/tasks/63d43385acd6d0a2adebe3c4")
            .set('Cookie', cookies)
            .send({
                title: 'Task one',
                summary: "My first task's summary"
            })
        expect(res.statusCode).toBe(404);
    });
});


describe("Update task of another technichian", () => {
    it("should return permission denied", async () => {
        const res = await request(app).put(`/api/tasks/${techOneTaskId}`)
            .set('Cookie', secondTechCookies)
            .send({
                title: 'Task updated',
                summary: "My task's summary updated"
            })
        expect(res.statusCode).toBe(403);
    });
});



describe("Update task with invalid permissions", () => {
    it("should return permission denied", async () => {
        const res = await request(app).put(`/api/tasks/${taskItem}`)
            .set('Cookie', cookies)
            .send({
                title: 'Task updated',
                summary: "Task's summary updated"
            })
        expect(res.statusCode).toBe(403);
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


describe("Delete task invalid permissions", () => {
    it("should return task not found", async () => {
        const res = await request(app).delete("/api/tasks/63d43385acd6d0a2adebe3c4")
            .set('Cookie', techCookies);
        expect(res.statusCode).toBe(403);
    });
});

describe("Delete task with invalid id param", () => {
    it("should return task not found", async () => {
        const res = await request(app).delete("/api/tasks/63d43385acd6d0a2adebe3c4")
            .set('Cookie', cookies);
        expect(res.statusCode).toBe(404);
    });
});
