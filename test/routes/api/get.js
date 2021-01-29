const expect = require('chai').expect;
const request = require('supertest');
const router = require('../../../server')

const conn = require('../../../config/connect');


describe('Test GET /api/urls', () => {

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


    it ('For Fail, Get URLs Stats of empty URLs Code', (done) => {


        request(router.urls).get('/api/urls/:code/stats')
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

    it ('For Fail, Get list of Top 3 URLs', (done) => {


        request(router.urls).get('/api/urls/')
        .then((response) => {
            
            
            const text = response.text
            expect(text).to.equal('[]')

            done()
        }).catch((err) => done(err));
        
    });

});