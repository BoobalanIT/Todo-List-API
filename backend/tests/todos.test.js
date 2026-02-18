const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../server');
const User = require('../models/User');
const Todo = require('../models/Todo');

let token;

beforeAll(async () => {
    await mongoose.connect('mongodb+srv://boobalanvdevstudies_db_user:MwFWaZVFiEQBtGOA@cluster0.ss2ozc1.mongodb.net/?appName=Cluster0'); // Use test DB
});

afterAll(async () => {
    await mongoose.connection.close();
});

beforeEach(async () => {
    await User.deleteMany();
    await Todo.deleteMany();

    // Create user and get token
    const user = await User.create({
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123'
    });
    token = user.getSignedJwtToken();
});

describe('Todo Endpoints', () => {
    it('should create a new todo', async () => {
        const res = await request(app)
            .post('/todos')
            .set('Authorization', `Bearer ${token}`)
            .send({
                title: 'Test Todo',
                description: 'Description'
            });

        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('title', 'Test Todo');
    });

    it('should get all todos', async () => {
        await Todo.create({
            title: 'Test Todo 1',
            user: (await User.findOne({ email: 'test@example.com' }))._id
        });

        const res = await request(app)
            .get('/todos')
            .set('Authorization', `Bearer ${token}`);

        expect(res.statusCode).toEqual(200);
        expect(res.body.data.length).toEqual(1);
    });

    it('should update a todo', async () => {
        const user = await User.findOne({ email: 'test@example.com' });
        const todo = await Todo.create({
            title: 'Original Title',
            user: user._id
        });

        const res = await request(app)
            .put(`/todos/${todo._id}`)
            .set('Authorization', `Bearer ${token}`)
            .send({
                title: 'Updated Title'
            });

        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('title', 'Updated Title');
    });

    it('should delete a todo', async () => {
        const user = await User.findOne({ email: 'test@example.com' });
        const todo = await Todo.create({
            title: 'To Be Deleted',
            user: user._id
        });

        const res = await request(app)
            .delete(`/todos/${todo._id}`)
            .set('Authorization', `Bearer ${token}`);

        expect(res.statusCode).toEqual(204);
    });
});
