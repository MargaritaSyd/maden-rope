const path = require('path');
const multer = require ('multer');

let multerDiskStorage = multer.diskStorage(
    {
        destination: (req, file, callback) =>
        {let folder = path.join(__dirname, '../../public/img/productImages');
        callback (null, folder)
        },
        filename: (req, file, callback) => {
            let imageName= Date.now() + path.extname(
                file.originalname
            );
           // callback(null,file.fieldname + '-' + imageName)
           callback(null, imageName)
        }

    })

let fileUpload = multer ({
    storage: multerDiskStorage
})
//.array("image_product",10)

module.exports = fileUpload;