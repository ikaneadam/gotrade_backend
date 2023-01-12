import multer from "multer";
import DiskStorage from "../diskStorage";

const diskStorage = new DiskStorage()

const uploadFile = multer({
    storage: diskStorage.getDiskStorage(),
    limits: {
        fileSize: diskStorage.maxFileSize
    },
    fileFilter: (req, file, cb) => {
        if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
            cb(null, true);
        } else {
            cb(null, false);
        }
    }
})

export default uploadFile