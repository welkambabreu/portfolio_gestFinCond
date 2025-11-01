
const request = require('supertest');
const { expect } = require('chai');
require('dotenv').config();
const { obterToken } = require('../helpers/autenticacao')
const app = require('../src/app');

describe('Cadastro de Receitas', () => {
    describe('POST /revenues', () => {
        let token;

        beforeEach(async () => {
            token = await obterToken(app, 'eu@karina.com.br', '123456');
        });

        it('Ao inserir o token válido deverá cadastrar a receita com sucesso', async () => {
            const respostaCadReceita = await request(app)
                .post('/revenues/register')
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send({
                        'id': '1',
                         'apartamento': 101,
                         'cotaCondominial': 350,
                         'cotaExtra': 0,
                         'cotasVencidasAReceber': 0,
                         'data': '2025-10-28'
                });

            expect(respostaCadReceita.status).to.equal(201);
            expect(respostaCadReceita.body).to.be.an('object');
            expect(respostaCadReceita.body.apartamento).to.equal(101);
            expect(respostaCadReceita.body.cotaCondominial).to.equal(350);
            expect(respostaCadReceita.body.data).to.equal('2025-10-28');

            console.log('Receita cadastrada:', respostaCadReceita.body);
        });
    });
});
