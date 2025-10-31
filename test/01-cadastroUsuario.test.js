
const request = require('supertest');
const { expect } = require('chai');
const app = require('../src/app');

describe('Cadastro de Usuário', () => {
    describe('POST /users/register', () => {
        it('deve cadastrar usuário e retornar 201', async () => {
            const respostaComum = await request(app)
                .post('/users/register')
                .set('Content-Type', 'application/json')
                .send({
                    'id': '2',
                    'nome': 'karina',
                    'email': 'eu@karina.com.br',
                    'senha': '123456',
                    'isAdmin': true,
                    'isActive': true
                });
            expect(respostaComum.status).to.equal(201);
            expect(respostaComum.body.id).to.be.a('string');
            expect(respostaComum.body.nome).to.be.a('string');
            expect(respostaComum.body.email).to.be.a('string');
        });
    });
});