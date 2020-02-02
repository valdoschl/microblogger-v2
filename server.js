const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

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

//Serve react build when on production
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });
}

app.listen(port, () => console.log(`Server is running on port: ${port}`));
