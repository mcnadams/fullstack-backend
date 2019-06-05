require('dotenv').config();
const mongoose = require('mongoose');
const connect = require('../../lib/utils/connect');
const seedData = require('./seed-data');

beforeAll(() => connect());

beforeEach(() => mongoose.connection.dropDatabase());

beforeEach(() => seedData());

afterAll(() => mongoose.connection.close());
