const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app/app');
const Task = require('../app/models/taskModel');

beforeAll(async () => {
  await mongoose.connect('mongodb://localhost:27017/taskdb_test', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterEach(async () => {
  await Task.deleteMany({});
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('Task Service', () => {
  it('should create a new task', async () => {
    const response = await request(app).post('/tasks').send({
      title: 'Test Task',
      description: 'This is a test task',
      userId: '60c72b2f5f1b2c001f32b5b8', // Use a valid user ID
    });
    expect(response.statusCode).toBe(201);
    expect(response.body.title).toBe('Test Task');
  });

  it('should get all tasks for a user', async () => {
    await request(app).post('/tasks').send({
      title: 'Test Task',
      description: 'This is a test task',
      userId: '60c72b2f5f1b2c001f32b5b8',
    });

    const response = await request(app).get('/tasks/60c72b2f5f1b2c001f32b5b8');
    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBe(1);
  });

  it('should update a task', async () => {
    const task = await request(app).post('/tasks').send({
      title: 'Test Task',
      description: 'This is a test task',
      userId: '60c72b2f5f1b2c001f32b5b8',
    });

    const response = await request(app).put(`/tasks/${task.body._id}`).send({
      title: 'Updated Task',
      completed: true,
    });
    expect(response.statusCode).toBe(200);
    expect(response.body.title).toBe('Updated Task');
  });

  it('should delete a task', async () => {
    const task = await request(app).post('/tasks').send({
      title: 'Test Task',
      description: 'This is a test task',
      userId: '60c72b2f5f1b2c001f32b5b8',
    });

    const response = await request(app).delete(`/tasks/${task.body._id}`);
    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe('Task deleted successfully');
  });
});
