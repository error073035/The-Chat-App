const dotenv = require('dotenv');
dotenv.config();
const express = require('express')
const app = express()
const cookieParser = require('cookie-parser');
const cors = require('cors');

app.use(express.json());

const port = process.env.PORT || 3000;
const connectToDB = require('./db/connection.js');
connectToDB();

app.use(
  cors({
    origin: [process.env.CLIENT_URL],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

const userRoute =  require("./routes/user.route.js");
app.use("/user", userRoute);
const messageRoute = require("./routes/message.route.js");
app.use("/message", messageRoute);

app.use('/', (req, res) => {
  res.send("HEllo World");
})

const errorMiddleware = require('./middlewares/error.middlware.js');
app.use(errorMiddleware);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});