require('dotenv').config();
const app = require("./app")
const { db } = require('./database/config');
const initModel = require("./models/initModel")

db.authenticate()
.then(() => console.log("Autenticate"))
.catch(err => console.log(err))

initModel()

db.sync()
.then(() => console.log("Sync"))
.catch(err => console.log(err))

const port = +process.env.PORT || 4600;

app.listen(port, () => {
    console.log(`App Running on port ${port}`);
})



