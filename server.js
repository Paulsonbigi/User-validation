const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const config = require("config")

// initialize express to a variable
const app = express()

// bodyparser middleware
app.use(express.json())

// Db config
const db = config.get("mongoURI")

// connect to mongoDB
mongoose
    .connect(db, {
        useCreateIndex: true,
        keepAlive: true,
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log("mongoDB connect"))
    .catch(err => console.log("mongoDB unable to connect"))

// Use route
app.use("/api/items", require("./routes/api/item"))
app.use("/api/users", require("./routes/api/User"))
app.use("/api/auth", require("./routes/api/auth"))

// variable for port
const port = process.env.PORT || 5040

app.listen(port, () => {
    console.log(`Serve started on port ${port}`)
})

