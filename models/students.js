const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const StudentSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    rollno: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    college: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now()
    },
    fileuploadpath:{
        
        type: String,

    },
    fileuploadname:{
        
        type: String,

    }
})
let StudentDATA = mongoose.model('studentlist', StudentSchema)

module.exports = StudentDATA