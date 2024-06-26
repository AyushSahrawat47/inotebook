const connectToMongo = require('./db');
const express = require('express')
const cors = require('cors')
connectToMongo();
const app = express()
const port = 5000

//middleware for the cors error
app.use(cors())
//middleware created for accessing the data from the body
app.use(express.json())


// Available Routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
    