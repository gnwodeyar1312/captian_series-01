const express = require("express");
const app = express();

app.use(express.json());

const {
  createNewUser,
  searchImages,
  addPhoto,
} = require("./controllers/dataContoller.js");

app.post("/api/users", createNewUser);
app.get("/api/photos", searchImages);
app.post("/api/photos", addPhoto);

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is runnign on port: ${process.env.PORT || 3000}`);
});
