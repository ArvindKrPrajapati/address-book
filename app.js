const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config()
const addressbook = require("./routes/contacts.route")
const authlogin = require("./middleware/auth.middleware")
const jwt = require('jsonwebtoken');

const PORT = process.env.PORT || 3000
app.use(express.json())
app.use(cors())
app.use("/address-book", authlogin, addressbook)



app.get("/", (req, res) => {
    res.status(200).json({ msg: "welcome" })
})
// to create token for user_id =arvind defined in .env file
app.get("/token", (req, res) => {
    const id = process.env.USER_ID
    const token = jwt.sign({ id }, process.env.JWT_SECRET);
    return res.status(200).json({ token })
})

const init = async () => {
    try {
        await mongoose.connect(process.env.URL)
        app.listen(PORT, () => console.log('server is listening at PORT ' + PORT))
    } catch (error) {
        console.log(error)
    }
}
init()