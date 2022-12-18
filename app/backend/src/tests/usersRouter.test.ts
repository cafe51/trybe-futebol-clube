import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import App from '../app';
import Example from '../database/models/ExampleModel';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { app } = new App();

const { expect, request } = chai;

import Users from '../database/models/UserModel'

const mock = [
  {
    id: 1,
    username: 'AAA',
    role: 'admin',
    email: 'admin@admin.com',
    password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW'
  },
  {
    id: 2,
    username: 'UAAser',
    role: 'user',
    email: 'user@user.com',
    password: '$2a$08$Y8Abi8jXvsXyqm.rmp0B.uQBA5qUz7T6Ghlg/CvVr/gLxYj5UAZVO'
  }
];

const mock2 =
  {
    id: 1,
    username: 'Admin',
    role: 'admin',
    email: 'admin@admin.com',
    password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW'
  };

describe('Testando a rota de Users', () => {
  beforeEach(() => {
    const findStub = sinon.stub(Users, 'findAll');
    findStub.resolves(mock as Users[]);
  });

  afterEach(() => {
    sinon.restore();
  });

  it('Se é possível dar get na lista de users', async () => {
    const response = await request(app).get('/users');
    expect(response.status).to.be.equal(200);
    // console.log(response.body)
    expect(response.body).to.be.deep.equal(mock)
  });
});
