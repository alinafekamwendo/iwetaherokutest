const express = require("express");
const app = express();
const cors = require("cors");
const swaggerUI=require("swagger-ui-express");
const YAML=require('yamljs');
const swaggerJSDocs=YAML.load("./swagger.yaml");
const dotenv=require("dotenv").config();

app.use(express.json());
app.use(cors());

app.use('/api/swagger-docs',swaggerUI.serve,swaggerUI.setup(swaggerJSDocs));

const db = require("./src/models");

// Routers
const postRouter = require("./src/routes/Posts");
app.use("/posts", postRouter);
const commentsRouter = require("./src/routes/Comments");
app.use("/comments", commentsRouter);
const usersRouter = require("./src/routes/Users");
app.use("/", usersRouter);
const likesRouter = require("./src/routes/Likes");
app.use("/likes", likesRouter);
const breedsRouter=require("./src/routes/Breeds");
app.use("/api/breeds",breedsRouter);
const livestockRouter=require("./src/routes/Livestock");
const userLivestock=require("./src/routes/UserLivestockRoute");
app.use("/",userLivestock);
app.use("/api/livestock",livestockRouter);
const kholaRoute=require("./src/routes/Khola");
app.use("/",kholaRoute);


const   PORT=process.env.PORT||5000;
db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}`);
  });
});