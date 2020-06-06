const Department = require('../models/department')

module.exports.list = (req, res) => {
    Department.find({ user: req.user._id })
        .then(departments => res.json(departments))
}

module.exports.create = (req, res) => {
    const body = req.body
    const department = new Department(body)
    department.user = req.user._id
    department.save()
        .then(department => res.json(department))
        .catch(err => res.json(err))
}

module.exports.show = (req, res) => {
    const id = req.params.id
    Department.findOne({
        user: req.user._id,
        _id: id
    }).then(department => {
        if (!department) {
            res.json({})
        }
        res.json(department)
    })
}

module.exports.update = (req, res) => {
    const id = req.params.id
    const body = req.body
    Department.findOneAndUpdate({ user: req.user._id, _id: id }, { $set: body }, { new: true, runValidators: true })
        .then(department => {
            if (!department) {
                res.json({})
            }
            res.json(department)
        })
}

module.exports.destroy = (req, res) => {
    const id = req.params.id
    Department.findOneAndDelete({ user: req.user._id, _id: id })
        .then(department => {
            if (!department) {
                res.json({})
            }
            res.json(department)
        })
}