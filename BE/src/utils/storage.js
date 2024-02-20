import multer from "multer";

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype.includes("excel") ||
    file.mimetype.includes("spreadsheetml")
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-file-" + file.originalname;
    cb(null, uniqueSuffix);
  },
});

const upload = multer({ storage: storage, fileFilter });

export default upload;
