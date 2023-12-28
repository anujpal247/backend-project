import dotenv from "dotenv"
// import mongoose from "mongoose";
// import {DB_NAME} from "./constants.js"
import connectDB from "./DB/index.js";
dotenv.config({
    path: "./env"
})

connectDB()
.then(() => {
    app.on((error) => {
        console.log("Error on app", error);
    })
    app.listen(process.env.PORT || 8000, () => {
        console.log(`Server is running at port ${process.env.PORT}`)
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