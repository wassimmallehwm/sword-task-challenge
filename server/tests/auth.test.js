const mongoose = require("mongoose");
const request = require("supertest");
const { DATABASE_URL } = require("../config");
const { app } = require("../app");

require("dotenv").config();
let req_cookies = null

beforeEach(async () => {
    await mongoose.connect(DATABASE_URL);
});

afterEach(async () => {
    await mongoose.connection.close();
});

const shapeFlags = flags =>
    flags.reduce((shapedFlags, flag) => {
        const [flagName, rawValue] = flag.split("=");
        const value = rawValue ? rawValue.replace(";", "") : true;
        return { ...shapedFlags, [flagName]: value };
    }, {});

const extractCookies = cookies => {
    return cookies.reduce((shapedCookies, cookieString) => {
        const [rawCookie, ...flags] = cookieString.split("; ");
        const [cookieName, value] = rawCookie.split("=");
        return { ...shapedCookies, [cookieName]: { value, flags: shapeFlags(flags) } };
    }, {});
};

const nullOrEmpty = (data) => {
    return !data || data.trim() == ""
}


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
        req_cookies = res.get('Set-Cookie')
        const cookies = extractCookies(req_cookies);
        expect(!nullOrEmpty(cookies.access_token.value));
        expect(!nullOrEmpty(cookies.refresh_token.value));
    });
});

describe("Refresh jwt token", () => {
    it("should refresh jwt token", async () => {
        const res = await request(app)
            .post('/api/auth/refresh-token')
            .set('Cookie', req_cookies)
            .send({});
        expect(res.statusCode).toBe(200);
        expect(res.body != null);
        const cookies = extractCookies(res.get('Set-Cookie'));
        expect(!nullOrEmpty(cookies.access_token.value));
        expect(!nullOrEmpty(cookies.refresh_token.value));
    });
});
