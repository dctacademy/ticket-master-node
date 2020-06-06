const Employee = require('../models/employee')

module.exports.list = (req, res) => {
    const departmentId = req.query.departmentId
    if(departmentId) {
        Employee.find({ department: departmentId })
            .then(employees => res.json(employees))
    } else {
        Employee.find({ user: req.user._id })
            .then(employees => res.json(employees))
    }
}

module.exports.create = (req, res) => {
    const body = req.body
    const employee = new Employee(body)
    employee.user = req.user._id
    employee.save()
        .then(employee => res.json(employee))
        .catch(err => res.json(err))
}

module.exports.show = (req, res) => {
    const id = req.params.id
    Employee.findOne({
        user: req.user._id,
        _id: id
    })
    .then(employee => {
        if (!employee) {
            res.json({})
        }
        res.json(employee)
    })
}

module.exports.update = (req, res) => {
    const id = req.params.id
    const body = req.body
    Employee.findOneAndUpdate({ user: req.user._id, _id: id }, { $set: body }, { new: true, runValidators: true })
        .then(employee => {
            if (!employee) {
                res.json({})
            }
            res.json(employee)
        })
}

module.exports.destroy = (req, res) => {
    const id = req.params.id
    Employee.findOneAndDelete({ user: req.user._id, _id: id })
        .then(employee => {
            if (!employee) {
                res.json({})
            }
            res.json(employee)
        })
}