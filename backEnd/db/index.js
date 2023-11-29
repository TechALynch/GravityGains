const mongoose = require('mongoose')

mongoose
    .connect('mongodb+srv://Admin:123LookAtMeGA@cluster0.7psynza.mongodb.net/')
    .then(() => {
        console.log('Successfully connected to MongoDB.')
    })
    .catch(e => {
        console.error('Connection error', e.message)
    })

const db = mongoose.connection

module.exports = db

