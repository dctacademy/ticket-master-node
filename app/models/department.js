const mongoose = require('mongoose')
const Schema = mongoose.Schema

const departmentSchema = new Schema({
    name: {
        type: String, 
        required: [true, 'name is required'] 
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
})
const Department = mongoose.model('Department', departmentSchema)

module.exports = Department 