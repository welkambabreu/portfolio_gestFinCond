
const request = require('supertest');
const { expect } = require('chai');
require('dotenv').config();
const { obterToken } = require('../helpers/autenticacao')
const app = require('../src/app');

describe('Consulta de Despesas', () => {
    describe('GET/expenses', () => {
        let token;

        beforeEach(async () => {
            token = await obterToken(app, 'eu@karina.com.br', '123456');
        });

        it('Ao inserir o token válido deverá retornar a relação de despesas cadastradas', async () => {
            const respostaConsulta = await request(app)
                .get('/expenses/search')
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${token}`);

            expect(respostaConsulta.status).to.equal(200);
            expect(respostaConsulta.body).to.be.an('array');
            console.log('Despesas encontradas:', respostaConsulta.body);
        });
    });
});
		