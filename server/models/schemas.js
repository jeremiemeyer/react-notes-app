const mongoose = require('mongoose')
const Schema = mongoose.Schema

const noteSchema = new Schema({
    folder:{type:String, required:true},
    title:{type:String, required:true},
    subtitle:{type:String, required:true},
    bodyText:{type:String},
    email:{type:String, required:true},
    // id:{type:String}
    // entryData:{type:Date, default:Date.now}
})

const userSchema = new Schema({
    firstname:{type:String, required:true},
    lastname:{type:String, required:true},
    email:{type:String, required:true, unique:true},
    password:{type:String, required:true},
})

const Note = mongoose.model('Note', noteSchema, 'notes')
const User = mongoose.model('User', userSchema, 'users')
const mySchemas = {'Note':Note, 'User':User}

module.exports = mySchemas