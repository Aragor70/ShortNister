const expect = require('chai').expect;
const request = require('supertest');
const router = require('../../../server')

const conn = require('../../../config/connect');


describe('Test GET /api/urls', () => {

    before((done) => {
        conn.connect()
            .then(() => done())
            .catch((err) => done(err));
    });
    
    before((done) => {
        const codes = ['ABCDEFG', 'ABCDE', 'ABCD', 'ABCD']

        for (let i = 0; i < 4; i++) {
            request(router.urls).post('/api/urls')
                .send({ longUrl: "https://github.com/Aragor70/Shortster", customCode: codes[i] })
                .catch((err) => done(err));
        }
        done();
        
    })
    
    after((done) => {
        conn.close()
            .then(() => done())
            .catch((err) => done(err));
    });


    it ('For Success, Get Stats of URLs Code', (done) => {

        request(router.urls).post('/api/urls')
            .send({ longUrl: "https://github.com/Aragor70/Shortster", customCode: 'ABCDEF' }).then(() => {

            request(router.urls).get('/api/urls/ABCDEF/')
                .then((response) => {
                
                    expect(response.statusCode).to.equal(200)
                    
                    const body = response.body
                    
                    expect(body).to.contain.property('_id');
                    expect(body).to.contain.property('urlCode');
                    expect(body).to.contain.property('longUrl');
                    expect(body).to.contain.property('shortUrl');
                    expect(body).to.contain.property('views');
                    expect(body).to.contain.property('date');
        
                    done();
                
                }).catch((err) => done(err));
            
        })
        .catch((err) => done(err));
    });
    

    it ('For Fail, Get Error msg for Stats of unknown URLs Code', (done) => {


        request(router.urls).get('/api/urls/Unknown_Code/')
            .then((response) => {
                
                expect(response.statusCode).to.equal(404);
                
                const body = response.body;
                
                expect(body).to.contain.property('success');
                expect(body).to.contain.property('message');

                expect(body.success).to.equal(false);
                expect(body.message).to.equal('Address not found');

                done();
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

    it ('For Fail, Get redirect, print error', (done) => {


        request(router.index).get('/Unknown_Code')
            .then((response) => {

                expect(response.statusCode).to.equal(404);
                const body = response.body
                
                expect(body).to.contain.property('success');
                expect(body).to.contain.property('message');

                expect(body.success).to.equal(false);
                expect(body.message).to.equal('Address not found');
                
                
                
                done()
            }).catch((err) => done(err));
        
    });


    it ('For Success, Get list of Top 3 URLs from the list of 5 or more', (done) => {


        request(router.urls).get('/api/urls/')
            .then((response) => {
                
                const text = response.body;
                expect(text.length).to.equal(3);

                done();
            }).catch((err) => done(err));
        
    });


});