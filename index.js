const express = require("express");
const app = express();

app.use(express.json())

const { createNewUser, searchImages } = require("./controllers/dataContoller.js")

app.post("/api/users", createNewUser)
app.get("/api/photos", searchImages)

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is runnign on port: ${process.env.PORT || 3000}`);
});
