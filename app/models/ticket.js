const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ticketSchema = new Schema({
    customer: {
        type: Schema.Types.ObjectId,
        ref: 'Customer',
        required: [true, 'select a customer']
    },
    department: {
        type: Schema.Types.ObjectId,
        ref: 'Department',
        required: [true, 'select a customer']
    },
    priority: {
        type: String, 
        required: true
    },
    message: {
        type: String,
        required: true,
        minlength: 5
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true, 
    },
    code: {
        type: String,
        required: true 
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    employees: [
        {
            employee: {
                type: Schema.Types.ObjectId,
                ref: 'Employee'
            }
        }
    ],
    isResolved: {
        type: Boolean,
        default: false
    }
})

const Ticket = mongoose.model('Ticket', ticketSchema)

module.exports = Ticket 