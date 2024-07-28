const {body} = require('express-validator')

const validationSchema = ()=>{
    return [
        body('user_id')
        .notEmpty()
        .withMessage('user-id name is required'),

        body('name')
        .notEmpty()
        .withMessage('name  is required'),

        body('price')
        .notEmpty()
        .withMessage('price  is required'),

        body('description')
        .notEmpty()
        .withMessage('description is required'),
        
        body('offer')
        .notEmpty()
        .withMessage('offer is required'),
      
    ]
}

module.exports = {
    validationSchema
}