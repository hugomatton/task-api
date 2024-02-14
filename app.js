const express = require('express')
const tasks = require('./routes/tasks.js')
const connectDB = require('./db/connect.js')
require('dotenv').config()
const notFound = require('./middleware/not-found.js')
const errorHandlerMiddleware = require('./middleware/error-handler.js')

const app = express()

// middleware
app.use(express.json())

// routes
app.use('/api/v1/tasks', tasks)
app.use(errorHandlerMiddleware)
app.use(notFound)

// start
const port = process.env.PORT || 3000
const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, console.log(`Server is listening on port ${port}`))
    } catch (error) {
        console.log(error)
    }
}

start()

