import multer from 'multer'
// This imports the Multer library to handle file uploads.

const storage = multer.diskStorage({
    filename: function(req,file,callback){
        callback(null,file.originalname)
    }

})

//multer.diskStorage: This is a storage engine that specifies where and how the uploaded files should be stored.
//filename: This is a function used to determine the name of the uploaded file on the disk.
// req: The HTTP request object.
//file: The uploaded file's metadata (e.g., originalname, mimetype).
//callback: A function to set the file name. In this case, the uploaded file will retain its original name.

//middleware
const upload = multer({storage})
//This initializes Multer with the diskStorage configuration, allowing the middleware to handle file uploads and store them on the disk.

export default upload



//explaination 
//Multer is a Node.js middleware for handling multipart/form-data, which is primarily used for uploading files. 
//It processes incoming file uploads and stores them on the server or buffers them in memory.

