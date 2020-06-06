const mongoose = require('mongoose')
const validator = require('validator')
const Schema = mongoose.Schema

const customerSchema = new Schema({
    name: {
        type: String,
        required: [true, 'name is required']
    }, 
    email: {
        type: String,
        required: [true, 'email is required'],
        validate: {
            validator: function(value){
                return validator.isEmail(value)
            },
            message: function(){
                return 'invalid email format'
            }
        },
        // unique: true 
    },
    mobile: {
        type: String, 
        minlength: 10, 
        maxlength: 10,
        required: [true, 'mobile is required'], 
        validate: {
            validator: function(value){
                return validator.isNumeric(value)
            },
            message: function(){
                return 'must be a number'
            }
        },
        // unique: true 

    },
    createdAt: {
        type: Date, 
        default: Date.now()
    }, 
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true 
    }
})

// customerSchema.index({ 'mobile': 1, 'user': 1 }, { unique: true })
// customerSchema.index({ 'email': 1, 'user': 1 }, { unique: true })

const Customer = mongoose.model('Customer', customerSchema)

module.exports = Customer 