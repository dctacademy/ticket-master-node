const Ticket = require('../models/ticket')

module.exports.list = (req, res) => {
    Ticket.find({ user: req.user._id })
        .then(tickets => res.json(tickets))
}

module.exports.create = (req, res) => {
    const body = req.body
    const ticket = new Ticket(body)
    ticket.user = req.user._id
    ticket.save()
        .then(ticket => res.json(ticket))
        .catch(err => res.json(err))
}

module.exports.show = (req, res) => {
    const id = req.params.id
    Ticket.findOne({
        user: req.user._id,
        _id: id
    }).then(ticket => {
        if (!ticket) {
            res.json({})
        }
        res.json(ticket)
    })
}

module.exports.update = (req, res) => {
    const id = req.params.id
    const body = req.body
    Ticket.findOneAndUpdate({ user: req.user._id, _id: id }, { $set: body }, { new: true, runValidators: true })
        .then(ticket => {
            if (!ticket) {
                res.json({})
            }
            res.json(ticket)
        })
}

module.exports.destroy = (req, res) => {
    const id = req.params.id
    Ticket.findOneAndDelete({ user: req.user._id, _id: id })
        .then(ticket => {
            if (!ticket) {
                res.json({})
            }
            res.json(ticket)
        })
}