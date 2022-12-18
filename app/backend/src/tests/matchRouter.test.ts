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

import Matches from '../database/models/MatchModel'


import { allMatches, allMatches2 } from './mocks/matchsMock'

describe('Testando a rota de Matches', () => {
  beforeEach(() => {
    const findStubAll = sinon.stub(Matches, 'findAll');
    findStubAll.resolves(allMatches as any);

    // const findStubById = sinon.stub(Matches, 'findOne');
    // findStubById.resolves(oneTeam as Matches);

  });

  afterEach(() => {
    sinon.restore();
  });

  it('Se é possível dar get na lista de partidas', async () => {
    const response = await request(app).get('/matches');
    expect(response.status).to.be.equal(200);
    // console.log('AAAAAAAAAA', response.body)
    expect(response.body).to.be.deep.equal(allMatches)
  });

  // it('Se é possível retornar dados de um time específico por ID', async () => {
  //   const response = await request(app).get('/teams/13');
  //   expect(response.status).to.be.equal(200);
  //   console.log(response.body)
  //   expect(response.body.id).to.be.equal(13)
  // });

});
