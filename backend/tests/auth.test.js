const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../server'); // We need to export app from server.js
const User = require('../models/User');

// Connect to a test database before running tests
beforeAll(async () => {
    // If the app checks for connection before listening, we might need to handle it.
    // For now assuming we can connect to a test DB.
    // Ideally we should use a separate test DB.
    await mongoose.connect('mongodb+srv://boobalanvdevstudies_db_user:MwFWaZVFiEQBtGOA@cluster0.ss2ozc1.mongodb.net/?appName=Cluster0');
});

afterAll(async () => {
    await mongoose.connection.close();
});

beforeEach(async () => {
    await User.deleteMany();
});

describe('Auth Endpoints', () => {
    it('should register a new user', async () => {
        const res = await request(app)
            .post('/register')
            .send({
                name: 'Test User',
                email: 'test@example.com',
                password: 'password123'
            });

        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('token');
    });

    it('should login an existing user', async () => {
        await User.create({
            name: 'Test User',
            email: 'test@example.com',
            password: 'password123'
        });

        const res = await request(app)
            .post('/login')
            .send({
                email: 'test@example.com',
                password: 'password123'
            });

        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('token');
    });

    it('should not login with invalid credentials', async () => {
        await User.create({
            name: 'Test User',
            email: 'test@example.com',
            password: 'password123'
        });

        const res = await request(app)
            .post('/login')
            .send({
                email: 'test@example.com',
                password: 'wrongpassword'
            });

        expect(res.statusCode).toEqual(401);
    });
});
