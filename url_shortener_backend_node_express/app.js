const cluster = require('cluster');
const os = require('os');
const express = require('express');
const compression = require('compression');
const bodyParser = require('body-parser');
const cors = require('cors');
const urlRoutes = require('./routes/urlRoutes');

const app = express();
const numCPUs = os.cpus().length;

if (cluster.isMaster) {
  // Fork workers for each CPU core
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died`);
  });
} else {
  // Enable gzip compression for performance
  app.use(compression());

  // CORS configuration
  app.use(cors({
    origin: '*',  // Consider restricting this in production
    methods: ['GET', 'POST'],
    //allowedHeaders: ['Content-Type'],
  }));

  // Body parsers
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Register routes
  app.use('/', urlRoutes);

  // Global error handler
  app.use((err, req, res, next) => {
    console.error("Error:", err.stack || err);
    res.status(500).json({ error: "Internal Server Error", message: err.message });
  });

  // Start the server
  app.listen(8080, () => {
    console.log('✅ URL shortener running on http://localhost:8080');
  });
}
