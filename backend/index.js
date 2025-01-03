import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import itemRoutes from './routes/itemRoutes.js';
import notificationRoutes from './routes/notificationRoutes.js';
import foundReportsRoutes from './routes/detailsRoutes.js';
import foundReportsRoute from './routes/foundRoutes.js';
import claimSubmitRoute from './routes/claimSubmitRoutes.js'
import claimRoutes from './routes/claimRoutes.js'
import path from 'path';
import { fileURLToPath } from 'url';
import http from 'http'; // To create an HTTP server
import { Server } from 'socket.io'; // For WebSocket support

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Create HTTP server and attach WebSocket server to it
const server = http.createServer(app);

// Set up WebSocket server
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000', // Frontend origin
    credentials: true,
  },
});

// Middleware
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
app.use(cookieParser());
app.use(express.json());

// Serve static files from uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api', itemRoutes);
app.use("/api/found-reports", foundReportsRoute);
app.use('/userinbox', notificationRoutes);
app.use('/api/notification/found-reports', foundReportsRoutes);
app.use("/api/claim-reports", claimSubmitRoute);
app.use('/api/notification/claim-reports', claimRoutes);

// WebSocket event listeners
io.on('connection', (socket) => {
  console.log('A user connected: ', socket.id);

  // Listen for events from the client (e.g., new item uploaded, user message)
  socket.on('new-item-upload', (data) => {
    console.log('New item uploaded:', data);
    // Broadcast the new item to other clients
    io.emit('item-uploaded', data);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

// Start the server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
