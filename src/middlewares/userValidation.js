const path = require ('path');
const {body} = require ('express-validator');
const validations = [
    body('user_name').notEmpty().withMessage('Ingresá tu nombre'),
    body('last_name').notEmpty().withMessage('Ingresá tu apellido'),
    body('mail').isEmail().withMessage('Ingresá tu mail'),
    body('dni').notEmpty().isLength({min:5}).withMessage('Ingresá un documento de identificación'),
    body('tel').notEmpty().isLength({min:5}).withMessage('Ingresá un teléfono'),
    body('adress').notEmpty().withMessage('Ingresá tu dirección'),
    body('password').isLength({min:8}).withMessage("La contraseña debe tener al menos 8 caracteres"),
    //body('passwordX2').equals('password').withMessage("Las contraseñas deben coincidir"),
    body('user_image').custom((value , {req}) => {
        if(req.file){
        let file = req.file;
        let acceptedExtensions = '.jpg';
        let fileExtension = path.extname(file.originalname);
        if (acceptedExtensions != fileExtension){
            throw new Error ('La imagen debe ser .jpg'); 
        }
        return true
    } else {
        return true
    }
    })
]

module.exports = validations