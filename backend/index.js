// import express from "express";
// import dotenv from "dotenv";
// import cookieParser from "cookie-parser";
// import cors from "cors";
// import db from "./config/Database.js";
// import router from "./routes/Route.js";


// dotenv.config();
// const app = express();

// try {
//   await db.authenticate();
//   console.log("Database Connected");
// } catch (error) {
//   console.log(error);
// }

// app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
// app.use(cookieParser());
// app.use(express.json());
// app.use("/api", router);
// app.use('/Images', express.static('./Images'))
// app.listen(5000, () => console.log("Server up and running"));

import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import db from "./config/Database.js";
import router from "./routes/Route.js";
import bodyParser from "body-parser";


dotenv.config();
const app = express();

try {
  await db.authenticate();
  console.log("Database Connected");
} catch (error) {
  console.log(error);
}

app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(cookieParser());
app.use(bodyParser.json());

// Parse URL-encoded bodies for POST requests
app.use(bodyParser.urlencoded({ extended: true }));

// Use your routes
app.use('/api', router); // Assuming your routes are under the /api path

app.use(express.json());

app.use("/api", router);
app.use('/Images', express.static('./Images'))
app.listen(5000, () => console.log("Server up and running"));
