const {body} = require('express-validator')

const validationSchema = ()=>{
    return [
        body('userName')
        .notEmpty()
        .withMessage('user name is required'),

        body('email')
        .notEmpty()
        .withMessage('email is required')
        .isEmail()
        .withMessage('email at least is 2 digits'),

        body('password')
        .notEmpty()
        .withMessage('password is required')
        .isLength({min:2})
        .withMessage('password at least is 2 digits'),
    ]
}

module.exports = {
    validationSchema
}