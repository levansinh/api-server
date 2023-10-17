const mongoose = require("mongoose");


const PORT = process.env.PORT | 5000;

const app = require('./app');


async function connectDB() {
    try {
      await mongoose.connect("mongodb://127.0.0.1:27017/api-server-store").then(() => {
        console.log("Connected!");
        app.listen(PORT, () => {
          console.log(`Server started on port ${PORT}`);
        });
      });
    } catch (error) {
      console.log("connection failed");
    }
  }
connectDB();
