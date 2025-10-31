
const request = require('supertest');
const { expect } = require('chai');
require('dotenv').config();
const { obterToken } = require('../helpers/autenticacao')
const app = require('../src/app');

describe('Cadastro de Despesas', () => {
    describe('POST /despesas', () => {
        let token;

        beforeEach(async () => {
            token = await obterToken(app, 'eu@karina.com.br', '123456');
        });

        it('Ao inserir o token válido deverá cadastrar a despesa com sucesso', async () => {
            const respostaCadDespesa = await request(app)
                .post('/expenses/register')
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    'id': '1',
                    'despesa': 'Limpeza',
                    'valor': 100,
                    'data': '2025-10-10'
                });

            expect(respostaCadDespesa.status).to.equal(201);
            expect(respostaCadDespesa.body).to.be.an('object');
            expect(respostaCadDespesa.body.despesa).to.equal('Limpeza');

            console.log('Despesa cadastrada:', respostaCadDespesa.body);
        });
    });
});
