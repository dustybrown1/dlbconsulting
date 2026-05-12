import express from 'express';
import multer from 'multer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use('/images', express.static(path.join(__dirname, 'public/images')));

// Ensure directories exist
const contentDir = path.join(__dirname, 'content/transmissions');
const imagesDir = path.join(__dirname, 'public/images/transmissions');
[contentDir, imagesDir].forEach(dir => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});

// Configure multer for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, imagesDir);
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|webp/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    if (extname && mimetype) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'));
    }
  }
});

// Image upload endpoint
app.post('/api/upload', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }
  const imageUrl = `/images/transmissions/${req.file.filename}`;
  res.json({ success: true, url: imageUrl });
});

// Get all articles
app.get('/api/articles', (req, res) => {
  const files = fs.readdirSync(contentDir).filter(f => f.endsWith('.json'));
  const articles = files.map(file => {
    const data = JSON.parse(fs.readFileSync(path.join(contentDir, file), 'utf8'));
    return data;
  }).sort((a, b) => new Date(b.date) - new Date(a.date));
  res.json(articles);
});

// Get single article
app.get('/api/articles/:id', (req, res) => {
  const filePath = path.join(contentDir, `${req.params.id}.json`);
  if (fs.existsSync(filePath)) {
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    res.json(data);
  } else {
    res.status(404).json({ error: 'Article not found' });
  }
});

// Save article
app.post('/api/articles', (req, res) => {
  const article = req.body;
  const id = article.id || Date.now();
  article.id = id;
  fs.writeFileSync(
    path.join(contentDir, `${id}.json`),
    JSON.stringify(article, null, 2)
  );
  res.json({ success: true, id });
});

// Delete article
app.delete('/api/articles/:id', (req, res) => {
  const filePath = path.join(contentDir, `${req.params.id}.json`);
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
    res.json({ success: true });
  } else {
    res.status(404).json({ error: 'Article not found' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
