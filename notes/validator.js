const validator = require('validator')

console.log(validator.isNumeric('abc123'))
console.log(validator.isNumeric('1234'))