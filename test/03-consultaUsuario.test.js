
const request = require('supertest');
const { expect } = require('chai');
require('dotenv').config();
const { obterToken } = require('../helpers/autenticacao')
const app = require('../src/app');

describe('Consulta de Usuários por nome', () => {
    describe('GET/users', () => {
        let token;

        beforeEach(async () => {
            token = await obterToken(app, 'eu@karina.com.br', '123456');
        });

        it('Ao inserir o token válido deverá retornar a relação de usuários cadastrados', async () => {
            const respostaConsulta = await request(app)
                .get('/users/search')
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${token}`);

            expect(respostaConsulta.status).to.equal(200);
            expect(respostaConsulta.body).to.be.an('array');
            console.log('Usuários encontrados:', respostaConsulta.body);
        });
    });
});
		