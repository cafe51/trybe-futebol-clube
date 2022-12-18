import * as sinon from 'sinon';
import * as chai from 'chai';
import { Request } from 'express';
// @ts-ignore
import chaiHttp = require('chai-http');

import {
  mock,
  signedUser,
  validLoginDataInput,
  invalidEmailInput,
  invalidPasswordInput,
  wrongPasswordInput,
  wrongEmailInput,
  unsignedUser,
} from './mocks/loginMocks'

import App from '../app';
import Example from '../database/models/ExampleModel';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { app } = new App();

const { expect, request } = chai;

import Users from '../database/models/UserModel'
import JWT from '../utils/jwt'


describe('Testa a rota de Login', () => {
  afterEach(() => {
    sinon.restore();
  });

  describe('Testa o login', () => {
  
    it('É possível fazer login', async () => {
      const findStub = sinon.stub(Users, 'findOne');
      findStub.resolves(signedUser as Users);
  
      const response = await request(app).post('/login').send(validLoginDataInput);
      // console.log(response.body)
      expect(response.status).to.be.equal(200);
      expect(response.body).to.have.keys('token');
    });
  
    it('Não é possível fazer login sem um password', async () => {
      const findStub = sinon.stub(Users, 'findOne');
      findStub.resolves(signedUser as Users);
      const response = await request(app).post('/login').send(invalidPasswordInput);
      // console.log(response.body)
      expect(response.status).to.be.equal(400);
      expect(response.body).to.be.deep.equal({ message: "All fields must be filled" });
    });
  
    it('Não é possível fazer login sem um email', async () => {
      const response = await request(app).post('/login').send(invalidEmailInput);
      // console.log(response.body)
      expect(response.status).to.be.equal(400);
      expect(response.body).to.be.deep.equal({ message: "All fields must be filled" });
    });
  
    it('Não é possível fazer login com um password errado', async () => {
      const findStub = sinon.stub(Users, 'findOne');
      findStub.resolves(signedUser as Users);
      const response = await request(app).post('/login').send(wrongPasswordInput);
      // console.log(response.body)
      expect(response.status).to.be.equal(401);
      expect(response.body).to.be.deep.equal({ message: "Incorrect email or password" });
    });
  
    it('Não é possível fazer login com um email errado', async () => {
      const findStub = sinon.stub(Users, 'findOne');
      findStub.resolves(undefined);
      const response = await request(app).post('/login').send(wrongEmailInput);
      // console.log(response.body)
      expect(response.status).to.be.equal(401);
      expect(response.body).to.be.deep.equal({ message: "Incorrect email or password" });
    });
  
  });

  it('testa o acesso à rota /validate', async () => {
    const jwt = new JWT();
    // Cria um stub do método req.header
    const findStub = sinon.stub(jwt, 'verifyToken');
    findStub.resolves(signedUser);
    const response = await request(app).get('/login/validate');
    expect(response.status).to.be.equal(401);
    expect(response.body).to.be.deep.equal({ message: "Token not found" });
  });
  
  // beforeEach(() => {
  //   const findStub = sinon.stub(Users, 'findOne');
  //   findStub.resolves(signedUser as Users);
  // });

  describe('Testa o cadastro', () => { 
    it('É possível fazer um cadastro', async () => {
      const findStub = sinon.stub(Users, 'findOne');
      findStub.resolves(undefined);
      const response = await request(app).post('/login/signUp').send(unsignedUser);

      expect(response.status).to.be.equal(201);
     })

     it('Não é possível cadastrar um usuário já existente', async () => {
      const findStub = sinon.stub(Users, 'findOne');
      findStub.resolves(unsignedUser as Users);
      const response = await request(app).post('/login/signUp').send(unsignedUser);

      expect(response.status).to.be.equal(404);
      expect(response.body).to.be.deep.equal({ message: "email already exist in db" });
     })

  });


});
