
const request = require('supertest');
const { expect } = require('chai');
require('dotenv').config();
const { obterToken } = require('../helpers/autenticacao')
const app = require('../src/app');

describe('Resumo Conta Principal', () => {
    describe('GET /summary', () => {
        let token;

        beforeEach(async () => {
            token = await obterToken(app, 'eu@karina.com.br', '123456');
            await request(app)
                .post('/summary/create')
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send({ month: '2025-10', previousBalance: 1000 });
        });

        it('Ao inserir o token válido deverá retornar o resumo da conta principal', async () => {
            const respostaConsulta = await request(app)
                .get('/summary?month=2025-10')
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${token}`)

            expect(respostaConsulta.status).to.equal(200);
            expect(respostaConsulta.body).to.be.an('object');
            expect(respostaConsulta.body.month).to.equal('2025-10');
            expect(respostaConsulta.body.previousBalance).to.equal(1000);
            console.log('Resumo encontrado:', respostaConsulta.body);
        });
    });
});
