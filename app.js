const express = require('express');
const mongoose = require('mongoose');
const socketIO = require('socket.io');
const db = require('./supports/dbCon');
const cors = require('cors');
const bodyParser = require('body-parser');
try{
  const app = express();
  const server = require('http').createServer(app);
  app.set('view engine', 'ejs');
    app.use(bodyParser.urlencoded({ extended: true }));
  const io = socketIO(server,{  cors: {
    origin: 'http://localhost:4200', // Allow requests from your Angular app's origin
    credentials: true // Allow cookies for authentication (if applicable)
  }
});
  app.use(express.json());
  const corsOptions = {
    origin: 'http://localhost:4200', // Allow requests from this origin
    optionsSuccessStatus: 200 // Some legacy browsers (IE11, various SmartTVs) choke on 204
};
  app.use(cors());
  io.on('connection', (socket) => {
    console.log('User connected:', socket.id);
  
    socket.on('login', (data) => {
      const { userId } = data; // Extract user ID from login data
      // Validate user ID (replace with your validation logic)
      if (isValidUserId(userId)) {
        socket.userId = userId; // Store user ID on the socket object
        console.log(`User ${userId} authenticated`);
        // Emit an event to notify successful login (optional)
        socket.emit('login-success');
      } else {
        console.log(`Invalid user ID: ${userId}`);
        // Handle invalid login (e.g., emit an error event)
      }
    });
    // Handle user messages
    socket.on('userMessage', (data) => {
      // Broadcast the message to all connected clients
      console.log('userMessage:- ',data);
      io.emit('userMessage', data);
    });
    // Handle group messages
    socket.on('groupMessage', (data) => {
      // Broadcast the message to all clients in the specified group
      console.log('groupMessage:- ',data);
      io.to(data.groupId).emit('groupMessage', data);
    });
    socket.on('callUser', (data) => {
      io.to(data.target).emit('callUser', { offer: data.offer, socket: socket.id });
    });
    socket.on('answerCall', (data) => {
      io.to(data.caller).emit('answerCall', data);
    });
  
    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);
    });
  });
//   app.use(cors({
//     origin: 'http://localhost:4200',
//     methods: ['GET', 'POST'],
//     allowedHeaders: ['Content-Type', 'Authorization'],
// }));
// } catch(err){
//   console.log("Error in Server : ",err)
// }
const dbConnection = db.dbCon();
// Replace 'your-mongo-db-connection-string' with your actual MongoDB connection string
// mongoose.connect('', { useNewUrlParser: true, useUnifiedTopology: true });

const userRoutes = require('./routes/users');
const groupRoutes = require('./routes/groups');
const postRoutes = require('./routes/posts');
const messageRoutes = require('./routes/messages');


// Routes
// console.log('===========>>>>',userRoutes,db.dbCon);
app.use(async (req, res, next) => {
  try {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type, token');
    res.setHeader('Access-Control-Expose-Headers', 'X-Requested-With, content-type, token');
    res.setHeader('Access-Control-Allow-Credentials', true);
    // res.header('token', token);
    next();
  } catch (error) {
      console.log('========>>>>>> Error in webserver support  ======>>>>>>', error);
  }
});
app.use('/users', userRoutes);
app.use('/groups', groupRoutes);
app.use('/posts', postRoutes);
app.use('/messages', messageRoutes);
app.get('/',function(req,res,next) {
 // In this example, we're sending dummy statistics data.
  // You'll replace these with real data fetched from your database.
  const userCount = 100; // Example user count
  const groupCount = 50; // Example group count
  const postCount = 200; // Example post count
  // Render the homepage view (index.ejs) with the statistics data
  res.render('index', { userCount, groupCount, postCount });
});
app.get('/login',function(req,res,next) {
  // In this example, we're sending dummy statistics data.

   // Render the homepage view (index.ejs) with the statistics data
   res.render('login', { });
 });
 app.get('/signup',function(req,res,next) {
  // In this example, we're sending dummy statistics data.

   // Render the homepage view (index.ejs) with the statistics data
   res.render('signup', { });
 });
app.get('/usercreate-form',function(req,res,next) {
  // In this example, we're sending dummy statistics data.
  res.render('users/create');

 });
 app.get('/groupcreate-form',function(req,res,next) {
  // In this example, we're sending dummy statistics data.
  res.render('groups/create');

 });
// Start the server
const PORT = process.env.PORT || 3002;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
} catch(err){
  console.log("Error in main", err)
}
