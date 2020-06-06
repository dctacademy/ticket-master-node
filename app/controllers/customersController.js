const Customer = require('../models/customer')

module.exports.list = (req, res) => {
    Customer.find({ user: req.user._id })
        .then(customers => res.json(customers))
}

module.exports.create = (req, res) => {
    const body = req.body 
    const customer = new Customer(body)
    customer.user = req.user._id 
    customer.save()
        .then(customer => res.json(customer))
        .catch(err => res.json(err))
}

module.exports.show = (req, res) => {
    const id = req.params.id 
    Customer.findOne({ 
        user: req.user._id, 
        _id: id 
    }).then(customer => {
        if(!customer) {
            res.json({})
        } 
        res.json(customer)
    })
}

module.exports.update = (req, res) => {
    const id = req.params.id 
    const body = req.body 
    Customer.findOneAndUpdate({ user: req.user._id, _id: id}, { $set: body}, { new: true, runValidators: true })
        .then(customer => {
            if(!customer) {
                res.json({})
            }
            res.json(customer) 
        })
}

module.exports.destroy = (req, res) => {
    const id = req.params.id 
    Customer.findOneAndDelete({ user: req.user._id, _id: id})
        .then(customer => {
            if(!customer) {
                res.json({})
            }
            res.json(customer) 
        })
}