require('dotenv').config();
const mongoose = require('mongoose');
const connect = require('../../lib/utils/connect');
const seedData = require('./seed-data');
const app = require('../../lib/app');
const request = require('supertest');

beforeAll(() => connect());

beforeEach(() => mongoose.connection.dropDatabase());

// beforeEach(() => seedData());

// const agent = request.agent(app);
// beforeEach(() => {
//   return agent
//     .post('/api/v1/auth/signup')
//     .send({ 
//       name: 'Bonnie',
//       handle: 'mcnadams',
//       password: 'leland',
//     });
// });

afterAll(() => mongoose.connection.close());

// module.exports = {
//   getAgent: () => agent
// };
