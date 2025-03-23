const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connection = require('./config/db');
const router = require('./routes/index');
const  cookieParser = require('cookie-parser')

const app = express();
const PORT = 5001;

app.use(cors({
  origin:process.env.FRONTEND_URL_VITE,
  credentials:true
}));
app.set('view engine','ejs')
app.use(express.json({ limit: '100mb' })); 
app.use(cookieParser())
app.use('/api', router);

connection()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Database connection failed:', error);
    process.exit(1); 
  });
