const request = require('supertest');
const obterToken = async(app,email, senha) => {

      const respostaComum = await request(app)
                    .post('/auth/login')
                    .set('Content-Type', 'application/json')
                    .send({
                            'email': email,
                            'senha': senha
                    });

        return respostaComum.body.token;
};

module.exports = { obterToken };