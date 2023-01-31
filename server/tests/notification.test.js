const mongoose = require("mongoose");
const request = require("supertest");
const { DATABASE_URL } = require("../config");
const { app } = require("../app");

let unreadNotif = null

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

describe("Unauthorized notifications list", () => {
    it("should return unauthorized", async () => {
        const res = await request(app).get("/api/notifications");
        expect(res.statusCode).toBe(401);
    });
});

describe("Fetch notifications list", () => {
    it("should return notifications list", async () => {
        const res = await request(app).get("/api/notifications")
        .set('Cookie', cookies);
        expect(res.statusCode).toBe(200);
        expect(res.body.docs.length > 0);
        expect(res.body.total > 0);
    });
});

describe("Fetch 5 notifications ", () => {
    it("should return 5 notifications", async () => {
        const res = await request(app).get("/api/notifications?limit=5")
        .set('Cookie', cookies);
        expect(res.statusCode).toBe(200);
        expect(res.body.docs.length == 5);
    });
});

describe("Fetch 50 notifications ", () => {
    it("should return 50 notifications", async () => {
        const res = await request(app).get("/api/notifications?limit=50")
        .set('Cookie', cookies);
        expect(res.statusCode).toBe(200);
        expect(res.body.docs.length == 5);
        unreadNotif = res.body.docs.find(elem => !elem.read)._id
    });
});

describe("Count unread notifications ", () => {
    it("should return 5 notifications", async () => {
        const res = await request(app).get("/api/notifications/count")
        .set('Cookie', cookies);
        expect(res.statusCode).toBe(200);
        expect(res.body > 0);
    });
});

describe("Read notifications ", () => {
    it("should read notification", async () => {
        const res = await request(app).get(`/api/notifications/read/${unreadNotif}`)
        .set('Cookie', cookies);
        expect(res.statusCode).toBe(200);
        expect(res.body.read == false);
    });
});