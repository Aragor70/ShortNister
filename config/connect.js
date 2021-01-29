const mongoose = require('mongoose');


const connect = async () => {
    try {
        
        // to run testing virtual DB, switch NODE_ENV on test

        if ( process.env.NODE_ENV === "test" ) {

            const Mockgoose = require('mockgoose').Mockgoose;
            const mockgoose = new Mockgoose(mongoose);

            await mockgoose.prepareStorage()
            
            await mongoose.connect(console.info("Finished, exiting process".green))
            
            console.log('TestDB connected...'.green)
            console.log(`Testing host: ${mongoose.connection.host}.`.green)

        } else {

            const connect = await mongoose.connect(process.env.dbURI, {
                useNewUrlParser: true,
                useCreateIndex: true,
                useFindAndModify: false,
                useUnifiedTopology: true
            })
            console.log('MongoDB connected...'.blue)
            console.log(connect.connection.host)

        }

        
    } catch (err) {
        console.error(err.message)
        process.exit(1)
    }
}

function close() {
    return mongoose.disconnect();
}

module.exports = { connect, close }