import * as http from 'http';
import * as supertest from 'supertest';
import * as test from 'tape';

import app from '../app';
const apptest = supertest(http.createServer(app.callback()));

test('GET /', (t) => {
    apptest.get('/')
    .expect(200, done)
});