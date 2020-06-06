const express = require('express')
const router = express.Router()

const {authenticateUser} = require('../app/middlewares/authenticate')

const usersController = require('../app/controllers/usersController')
const customersController = require('../app/controllers/customersController')
const departmentsController = require('../app/controllers/departmentsController')
const employeesController = require('../app/controllers/employeesController')
const ticketsController = require('../app/controllers/ticketsController')

router.post('/api/users/register', usersController.register)
router.post('/api/users/login', usersController.login)
router.get('/api/users/account', authenticateUser, usersController.account)
router.delete('/api/users/logout', authenticateUser, usersController.logout)
router.get('/api/users/showusers', usersController.showApi)

router.get('/api/customers', authenticateUser, customersController.list)
router.post('/api/customers', authenticateUser, customersController.create)
router.get('/api/customers/:id', authenticateUser, customersController.show)
router.put('/api/customers/:id', authenticateUser, customersController.update)
router.delete('/api/customers/:id', authenticateUser, customersController.destroy)

router.get('/api/departments', authenticateUser, departmentsController.list)
router.post('/api/departments', authenticateUser, departmentsController.create)
router.get('/api/departments/:id', authenticateUser, departmentsController.show)
router.put('/api/departments/:id', authenticateUser, departmentsController.update)
router.delete('/api/departments/:id', authenticateUser, departmentsController.destroy)

router.get('/api/employees', authenticateUser, employeesController.list)
router.post('/api/employees', authenticateUser, employeesController.create)
router.get('/api/employees/:id', authenticateUser, employeesController.show)
router.put('/api/employees/:id', authenticateUser, employeesController.update)
router.delete('/api/employees/:id', authenticateUser, employeesController.destroy)

router.get('/api/tickets', authenticateUser, ticketsController.list)
router.post('/api/tickets', authenticateUser, ticketsController.create)
router.get('/api/tickets/:id', authenticateUser, ticketsController.show)
router.put('/api/tickets/:id', authenticateUser, ticketsController.update)
router.delete('/api/tickets/:id', authenticateUser, ticketsController.destroy)

module.exports = router