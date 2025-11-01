
const request = require('supertest');
const { expect } = require('chai');
require('dotenv').config();
const { obterToken } = require('../helpers/autenticacao')
const app = require('../src/app');

describe('Resumo Conta Principal', () => {
    describe('POST /summary/create', () => {
        let token;

        beforeEach(async () => {
            token = await obterToken(app, 'eu@karina.com.br', '123456');
        });

        it('Ao inserir o token válido deverá cadastrar o saldo atual do mês com sucesso', async () => {
            const respostaCadResumo = await request(app)
                .post('/summary/create')
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    'month': '2025-10',
                    'previousBalance': 1000
                });

            expect(respostaCadResumo.status).to.equal(201);
            expect(respostaCadResumo.body).to.be.an('object');
            expect(respostaCadResumo.body.month).to.equal('2025-10');
            expect(respostaCadResumo.body.previousBalance).to.equal(1000);

            console.log('Resumo cadastrado:', respostaCadResumo.body);
        });
    });
});
