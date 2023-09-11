const mongoose = require('mongoose')
const Schema = mongoose.Schema

const noteSchema = new Schema({
    folder:{type:String},
    title:{type:String, required:true},
    subtitle:{type:String, required:true},
    bodyText:{type:String},
    // id:{type:String}
    // entryData:{type:Date, default:Date.now}
})

const Note = mongoose.model('Note', noteSchema, 'notes')
const mySchemas = {'Note':Note}

module.exports = mySchemas