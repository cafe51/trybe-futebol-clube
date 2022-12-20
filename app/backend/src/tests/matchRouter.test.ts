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


import { allMatches, newMatch, newMatchSameTeam, newMatchMissingTeam } from './mocks/matchsMock'

interface responseMatch {
  id?: number,
  homeTeam: number,
  awayTeam: number,
  homeTeamGoals: number,
  awayTeamGoals: number,
  inProgress?: boolean,
}

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

  it('Se é possível filtrar TODAS as partidas em andamento', async () => {
    const inProgressMatches = allMatches.filter((m) => m.inProgress === true)

    stubList(inProgressMatches);

    const response = await request(app).get('/matches?inProgress=true')
    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.deep.equal(inProgressMatches);
  });
  
  it('Se é possível filtrar as partidas finalizadas', async () => {
    const endedMatches = allMatches.filter((m) => m.inProgress === false)

    stubList(endedMatches);

    const response = await request(app).get('/matches?inProgress=false')
    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.deep.equal(endedMatches);
  });

  it('Se é retornado erro ao inserir um parâmetro errado', async () => {

    const response = await request(app).get('/matches?inProgress=xxxxx')
    expect(response.status).to.be.equal(404);
    expect(response.body).to.be.deep.equal('not found');
  });



  describe('Testa o cadastro de uma nova partida', () => { 
    it('É possível fazer um cadastro de uma partida em andamento', async () => {
      const responseMatch: responseMatch = newMatch;

      responseMatch.id = 2;
      responseMatch.inProgress = true;

      const findStub = sinon.stub(Matches, 'create');
      findStub.resolves(responseMatch as any);

      const response = await request(app).post('/matches').send(newMatch);

      expect(response.status).to.be.equal(201);
      expect(response.body).to.be.deep.equal(responseMatch);
     })

     it('Não é possível fazer um cadastro de uma partida com os dois times iguais', async () => {

      const response = await request(app).post('/matches').send(newMatchSameTeam);

      expect(response.status).to.be.equal(422);
      expect(response.body).to.be.deep.equal({ message: "It is not possible to create a match with two equal teams" });
     })

     it('Não é possível fazer um cadastro de uma partida com times que não existam', async () => {

      const response = await request(app).post('/matches').send(newMatchMissingTeam);

      expect(response.status).to.be.equal(404);
      expect(response.body).to.be.deep.equal({ message: "There is no team with such id!" });
     })

  });



});
