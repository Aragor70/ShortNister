const expect = require('chai').expect;
const request = require('supertest');
const router = require('../../../server')

const conn = require('../../../config/connect');



describe('Test POST /api/urls', () => {

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


        request(router.urls).post('/api/urls')
            .send({ longUrl: "https://github.com/Aragor70/Shortster", customCode: "newadd" })
            .then((response) => {
                
                const body = response.body
                
                expect(body).to.contain.property('success')
                expect(body.success).to.equal(true)
                expect(body).to.contain.property('urlAddress')
                
                done()
            }).catch((err) => done(err));
        
    });

    it ('For Fail, Create new shortcut, return err msg when req body is emtpy', (done) => {

        // if empty req values
        request(router.urls).post('/api/urls')
            .send({ longUrl: "", customCode: "" })
            .then((response) => {
                
                expect(response.statusCode).to.equal(422)

                const body = response.body
                expect(body).to.contain.property('success')
                expect(body.success).to.equal(false)
                expect(body.message).to.equal('Please enter valid URL address.')
                
                done()
            }).catch((err) => done(err));
        
    });

    it ('For Fail, Create new shortcut, return err msg when custom Code already exists', (done) => {

        
        request(router.urls).post('/api/urls')
            .send({ longUrl: "https://github.com/Aragor70/Shortster", customCode: "newadd" })
            .then((response) => {
                
                expect(response.statusCode).to.equal(422)

                const body = response.body
                expect(body).to.contain.property('success')
                expect(body.success).to.equal(false)
                expect(body.message).to.equal('Your code already exists. Please enter the new one.')
                
                done()
            }).catch((err) => done(err));
        
    });

    it ('For Fail, Create new shortcut, return err msg when custom Code is too short (min 4 characters long)', (done) => {

        
        request(router.urls).post('/api/urls')
            .send({ longUrl: "https://github.com/Aragor70/Shortster", customCode: "new" })
            .then((response) => {
                
                expect(response.statusCode).to.equal(422)

                const body = response.body
                expect(body).to.contain.property('success')
                expect(body.success).to.equal(false)
                expect(body.message).to.equal('Please enter short URL at least 4 characters long.')
                
                done()
            }).catch((err) => done(err));
        
    });

    it ('For Fail, Create new shortcut, return err msg when custom Code includes not valid value', (done) => {

        
        request(router.urls).post('/api/urls')
            .send({ longUrl: "https://github.com/Aragor70/Shortster", customCode: "Co$de.,*" })
            .then((response) => {
                
                expect(response.statusCode).to.equal(422)

                const body = response.body
                expect(body).to.contain.property('success')
                expect(body.success).to.equal(false)
                expect(body.message).to.equal('Please enter alphanumeric value.')
                
                done()
            }).catch((err) => done(err));
        
    });
})