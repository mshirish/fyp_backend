require('dotenv').config();

const express = require('express');
const app = express();

const connectDB = require("./database/connect.js");
const authenticateUser = require("./middleware/authentication")
const isAdmin = require("./middleware/isAdmin")
app.use(express.json());




//routes
const authRouter = require("./routes/Auth")
const adminRouter = require("./routes/Admin")
const noticeRouter = require('./routes/Notice')
const ballotRouter = require('./routes/ballot')
const candidateRouter = require('./routes/Candidate')
// const noticeRouter = require("./routes/Notices")

app.use('/api/auth', authRouter)
app.use('/api/admin',authenticateUser, isAdmin ,adminRouter)
app.use('/api/notices',authenticateUser,noticeRouter)
app.use('/api/ballot',authenticateUser,ballotRouter)
app.use('/api/candidates',authenticateUser, candidateRouter)
// app.use('/api/notices', authenticateUser, noticeRouter)


const port = process.env.PORT || 5000;

//creating a function to start the connection
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`Server started. Listening on port ${port} ...`);
    });
  } catch (error) {
    console.log(error);
  }
};
start();