import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'Images/GuideImages');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const fileFilter = (req, file, cb) => {
    cb(null, true);
};

export const uploadGuide = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: Infinity }, 
}).single('image_url');

export const uploadGuideImage = (req, res) => {
    uploadGuide(req, res, (err) => {
        if (err) {
            console.error('File upload error:', err);
            return res.status(400).json({ error: err.message });
        }
        res.status(200).json({ message: 'File uploaded successfully' });
    });
};
