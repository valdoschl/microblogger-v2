const express = require("express");
const mongoose = require("mongoose");

const postRoutes = require("./routes/posts");
const userRoutes = require("./routes/user");

const app = express();
const port = process.env.PORT || 5000;

mongoose.connect(
  `mongodb+srv://valtteri:${process.env.ATLAS_CONNECT_PW}@mblogger-xq8x7.mongodb.net/test?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  }
);

//Parse incoming requests with JSON payloads
app.use(express.json());

//Forward requests
app.use("/posts", postRoutes);
app.use("/user", userRoutes);

//If no route in /posts or /users were able to handle the request
app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});
//Handle all errors thrown form anywhere
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

app.listen(port, () => console.log(`Server is running on port: ${port}`));
