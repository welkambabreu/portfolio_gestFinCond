
const request = require('supertest');
const { expect } = require('chai');
require('dotenv').config();
const { obterToken } = require('../helpers/autenticacao')
const app = require('../src/app');

describe('Alterar usuário', () => {
    describe('PUT/users/:id', () => {
        let token;

        beforeEach(async () => {
            token = await obterToken(app, 'eu@karina.com.br', '123456');
        });

        it('Ao inserir o token válido deverá alterar o usuário com sucesso', async () => {
            const respostaAlteracao = await request(app)
                .put('/users/2')
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    nome: 'Karina QA',
                });

            expect(respostaAlteracao.status).to.equal(200);
            expect(respostaAlteracao.body).to.be.an('object');
            expect(respostaAlteracao.body.nome).to.equal('Karina QA');
        });
    });
});
