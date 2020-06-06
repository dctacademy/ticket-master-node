const User  = require('../models/user')
const _ = require('lodash')

module.exports.register =  (req, res) => {
    const body = req.body
    const user = new User(body)
    user.save()
        .then(user => res.json(_.pick(user,['_id', 'username', 'email', 'createdAt'])))
        .catch(err => res.json(err))
}

// localhost:3000/users/login 
module.exports.login = function (req, res) {
    const body = req.body
    User.findByCredentials(body.email, body.password)
        .then(function (user) {
            return user.generateToken()
        })
        .then(function (token) {
            res.send({ token })
        })
        .catch(function (err) {
            res.send(err)
        })
}

// localhost:3000/users/account 
module.exports.account = function (req, res) {
    // const { _id, username, email } = req.user 
    // res.send({ _id, username, email })
    const user = _.pick(req.user, ['_id', 'username', 'email'])
    res.json(user)
}

// localhost:3000/users/logout
module.exports.logout = function (req, res) {
    const { user, token } = req
    User.findByIdAndUpdate(user._id, { $pull: { tokens: { token: token } } })
        .then(function () {
            res.send({ notice: 'successfully logged out' })
        })
        .catch(function (err) {
            res.send(err)
        })
}

module.exports.showApi = function(req, res){
    User.find()
        .then(users => {
            res.json(users)
        })
}