const path = require("path")
const multer = require("multer")

// ensure the filetype
const fileFilter =(req,file,cb)=>{
    const filetypes = /jpeg|jpg|png/;
    if(file.mimetype==='image/png'|| file.mimetype==='image/jpg'||file.mimetype==='image/jpeg'||file.mimetype==='video/mp4'){
        cb(null,true);
    }else {
        const error = new Error("Only supports the following filetypes - " + filetypes);
        error.statusCode = 400; // Bad Request
        cb(error, false);
    }
}


const limits = {
    fileSize: 10 * 1024 * 1024 // 10 Mb
}


//multer configuration

const storage = multer.diskStorage({

    destination: (req, file, cb) => {
        if(file.fieldname==='video'){
            cb(null, "public/videos");
        }else {
            cb(null, "public");
        }
    },
    filename: (req, file, cb) => {
        const uniquePrefix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        const ext = path.extname(file.originalname);
        const filename = `${uniquePrefix}${ext}`
        cb(null, filename);


    },
});


const userUploads = multer({storage:storage,fileFilter:fileFilter,limits:limits});

module.exports= {userUploads}
