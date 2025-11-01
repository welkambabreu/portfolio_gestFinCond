
const request = require('supertest');
const { expect } = require('chai');
require('dotenv').config();
const { obterToken } = require('../helpers/autenticacao')
const app = require('../src/app');

describe('Alterar receita', () => {
    describe('PUT/revenues/:id', () => {
        let token;

        beforeEach(async () => {
            token = await obterToken(app, 'eu@karina.com.br', '123456');
        });

        it('Ao inserir o token válido deverá alterar a receita com sucesso', async () => {
            const respostaAlteracao = await request(app)
                .put('/revenues/1')
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    'apartamento': 101,
                    'cotaCondominial': 350,
                    'cotaExtra': 100,
                    'cotasVencidasAReceber': 0,
                    'data': '2025-10-28'
                });

            expect(respostaAlteracao.status).to.equal(200);
            expect(respostaAlteracao.body).to.be.an('object');
            expect(respostaAlteracao.body.apartamento).to.equal(101);
            expect(respostaAlteracao.body.cotaCondominial).to.equal(350);
            expect(respostaAlteracao.body.cotaExtra).to.equal(100);
            expect(respostaAlteracao.body.cotasVencidasAReceber).to.equal(0);
            expect(respostaAlteracao.body.data).to.equal('2025-10-28');

            console.log('Receita alterada:', respostaAlteracao.body);
        });
    });
});
