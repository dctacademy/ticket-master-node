const mongoose = require('mongoose')
const validator = require('validator')
const Schema = mongoose.Schema 
const employeeSchema = new Schema({
    name: {
        type: String, 
        required: true
    },
    email: {
        type: String,
        required: true,
        validate: {
            validator: function(value){
                return validator.isEmail(value)
            }, 
            message: function(){
                return 'invalid email format'
            }
        }
    },
    mobile: {
        type: String,
        required: true,
        validate: {
            validator: function(value){
                return validator.isNumeric(value)
            },
            message: function(){
                return 'must be a number'
            }
        }
    },
    department: {
        type: Schema.Types.ObjectId,
        ref: 'Department', 
        required: true 
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
})

// employeeSchema.index({ 'mobile': 1, 'user': 1 }, { unique: true })
// employeeSchema.index({ 'email': 1, 'user': 1 }, { unique: true })

const Employee = mongoose.model('Employee', employeeSchema)

module.exports = Employee