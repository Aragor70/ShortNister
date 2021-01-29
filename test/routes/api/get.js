const expect = require('chai').expect;
const request = require('supertest');
const router = require('../../../server')

const conn = require('../../../config/connect');


describe('Test GET /api/urls', () => {

    before((done) => {
        conn.connect()

            const codes = ['ABCDEFG', 'ABCDEF', 'ABCDE', 'ABCD', 'ABCD']

            for (let i = 0; i < 5; i++) {
                request(router.urls).post('/api/urls')
                .send({ longUrl: "https://github.com/Aragor70/Shortster", customCode: codes[i] })
                .catch((err) => done(err));
            }
            done()
        
    })
    
    after((done) => {
        conn.close()
            .then(() => done())
            .catch((err) => done(err));
    })


    it ('For Fail, Get URLs Stats of wrong URLs Code', (done) => {


        request(router.urls).get('/api/urls/ABCDEF/stats')
        .then((response) => {
            
            expect(response.statusCode).to.equal(404)
            
            const body = response.body
            
            expect(body).to.contain.property('success')
            expect(body).to.contain.property('message')

            expect(body.success).to.equal(false)
            expect(body.message).to.equal("Address not found")

            done()
        }).catch((err) => done(err));
        
    });

    it ('For Success, Get redirect', (done) => {


        request(router.index).get('/ABCDEF')
        .then((response) => {
            
            expect(response.statusCode).to.equal(302)
            expect(response.text).to.equal('Found. Redirecting to https://github.com/Aragor70/Shortster')
            
            const header = response.header
            expect(header.location).to.equal('https://github.com/Aragor70/Shortster')
            
            
            done()
        }).catch((err) => done(err));
        
    });

    it ('For Success, Get list of Top 3 URLs from the list of 5 or more', (done) => {


        request(router.urls).get('/api/urls/')
        .then((response) => {
            
            const text = response.body
            expect(text.length).to.equal(3)

            done()
        }).catch((err) => done(err));
        
    });

});