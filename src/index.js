import dotenv from "dotenv"
// import mongoose from "mongoose";
// import {DB_NAME} from "./constants.js"
import connectDB from "./DB/index.js";
import { app } from "./app.js";
dotenv.config({
    path: "./env"
})

connectDB()
.then(() => {
    app.on("message", (message) => {
        console.log("Error on app", message);
    })
    const port = process.env.PORT
    app.listen(port, () => {
        console.log(`Server is running at port ${port}`)
    })
})
.catch((error) => {
    console.log("DataBase connection Failed!!", error)
})




/*
import express from "express"
const app = express()
(async() => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        app.on("error", (error) => {
            console.log("Error: ", error)
        })

        app.listen(process.env.PORT, () => {
            console.log(`App is listening on port ${process.env.PORT}.`)
        })
    } catch (error) {
        console.error("Error: ", error)
        throw error
    }
})()

*/