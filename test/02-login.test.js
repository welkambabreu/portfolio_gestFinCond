
const request = require('supertest');
const { expect } = require('chai');
const app = require('../src/app');

describe('Login de Usuário', () => {
    describe('POST/auth/login', () => {
        it('deve logar usuário e retornar token', async () => {
            const respostaComum = await request(app)
                .post('/auth/login')
                .set('Content-Type', 'application/json')
                .send({
                    'email': 'eu@karina.com.br',
                    'senha': '123456'
                });

            expect(respostaComum.status).to.equal(200);
            expect(respostaComum.body.token).to.be.a('string');
            console.log('Token recebido:', respostaComum.body.token);
        });
    });
});