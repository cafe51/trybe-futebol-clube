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

import Teams from '../database/models/TeamModel'

import { allTeams, oneTeam } from './mocks/teamsMocks'

describe('Testando a rota de Teams', () => {
  beforeEach(() => {
    const findStubAll = sinon.stub(Teams, 'findAll');
    findStubAll.resolves(allTeams as Teams[]);

    const findStubById = sinon.stub(Teams, 'findOne');
    findStubById.resolves(oneTeam as Teams);

  });

  afterEach(() => {
    sinon.restore();
  });

  it('Se é possível dar get na lista de times', async () => {
    const response = await request(app).get('/teams');
    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.deep.equal(allTeams)
  });

  it('Se é possível retornar dados de um time específico por ID', async () => {
    const response = await request(app).get('/teams/13');
    expect(response.status).to.be.equal(200);
    expect(response.body.id).to.be.equal(13)
  });

});
