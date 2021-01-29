const expect = require('chai').expect;
const request = require('supertest');
const router = require('../../../server')

const conn = require('../../../config/connect');



describe('Test POST /api/url', () => {

    before((done) => {
        conn.connect()
            .then(() => done())
            .catch((err) => done(err));
    })
    
    after((done) => {
        conn.close()
            .then(() => done())
            .catch((err) => done(err));
    })


    it ('For Success, Create new shortcut', (done) => {


        request(router.url).post('/api/url')
        .send({ longUrl: "https://github.com/Aragor70/Shortster", customCode: "new_addr" })
        .then((response) => {
            
            const body = response.body

            expect(body).to.contain.property('success')
            expect(body).to.contain.property('urlAddress')
            
            console.log(body)
            done()
        }).catch((err) => done(err));
        
    });


})