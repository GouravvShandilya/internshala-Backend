require("dotenv").config({ path: "./.env" })
const express = require("express")
const app = express()




//mongoDb connection
require("./models/database").connectDatabase()



//logger
const logger = require("morgan")
app.use(logger("tiny"))

//body parser

app.use(express.json())
app.use(express.urlencoded({extended:false}))

// session and cookie
const session = require("express-session")
const cookieparser = require("cookie-parser")

app.use(session({
    resave:true,
    saveUninitialized:true,
    secret:process.env.EXPRESS_SESSION_SECRET
}))
app.use(cookieparser())


// Routes
app.use('/', require("./routes/index.Routes"))






// error handling
const ErrorHandler = require("./utils/errorHandler")
const { generatedErrors } = require("./middlewares/errors")


app.all("*", (req, res, next) => {
    next(new ErrorHandler(`PAGE NOT FOUND ${req.url}`, 404))
})
app.use(generatedErrors)




app.listen(process.env.Port, console.log(`server is running on ${process.env.Port}`))