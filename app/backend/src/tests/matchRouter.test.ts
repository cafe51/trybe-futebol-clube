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


import { allMatches } from './mocks/matchsMock'

describe('Testando a rota de Matches', () => {
  const stubList = (list: typeof allMatches) => {
    const findStubAll = sinon.stub(Matches, 'findAll');
    findStubAll.resolves(list as any);

  };

  afterEach(() => {
    sinon.restore();
  });

  it('Se é possível dar get na lista de partidas', async () => {
    stubList(allMatches);
    const response = await request(app).get('/matches');
    expect(response.status).to.be.equal(200);
    // console.log('AAAAAAAAAA', response.body)
    expect(response.body).to.be.deep.equal(allMatches)
  });

  it('Se é possível filtrar as partidas em andamento', async () => {
    const inProgressMatches = allMatches.filter((m) => m.inProgress === true)

    stubList(inProgressMatches);

    const response = await request(app).get('/matches').query({ inProgress: 'true' });
    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.deep.equal(inProgressMatches);
  });
  
  it('Se é possível filtrar as partidas finalizadas', async () => {
    const endedMatches = allMatches.filter((m) => m.inProgress === false)

    stubList(endedMatches);

    const response = await request(app).get('/matches').query({ inProgress: 'false' });
    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.deep.equal(endedMatches);
  });

});
