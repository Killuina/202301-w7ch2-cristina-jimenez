import multer from "multer";

const storage = multer.diskStorage({
  destination(req, file, setPath) {
    setPath(null, "uploads/");
  },
  filename(req, file, setFilename) {
    setFilename(null, `${Date.now()}${file.originalname}$.jpg`);
  },
});

const upload = multer({ storage });

const multerMiddleware = upload.single("avatar");

export default multerMiddleware;
