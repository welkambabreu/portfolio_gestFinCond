
const request = require('supertest');
const { expect } = require('chai');
require('dotenv').config();
const { obterToken } = require('../helpers/autenticacao')
const app = require('../src/app');

describe('Alterar despesa', () => {
    describe('PUT/expenses/:id', () => {
        let token;

        beforeEach(async () => {
            token = await obterToken(app, 'eu@karina.com.br', '123456');
        });

        it('Ao inserir o token válido deverá alterar a despesa com sucesso', async () => {
            const respostaAlteracao = await request(app)
                .put('/expenses/1')
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    'despesa': 'Limpeza do prédio',
                    'valor': 150.00,
                    'data': '2025-10-10'
                });

            expect(respostaAlteracao.status).to.equal(200);
            expect(respostaAlteracao.body).to.be.an('object');
            expect(respostaAlteracao.body.despesa).to.equal('Limpeza do prédio');
            expect(respostaAlteracao.body.valor).to.equal(150.00);
            expect(respostaAlteracao.body.data).to.equal('2025-10-10');

            console.log('Despesa alterada:', respostaAlteracao.body);
        });
    });
});
