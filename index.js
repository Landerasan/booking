const express = require('express')
const cfg = require('./config/app.config')
const cors = require('cors')
const bodyParser = require('body-parser')
const apiRoutes = require('./routes/api/app.routes')
const mongoose = require('./databases/mongodb/mongoose.db')


const connection = mongoose
const app = express()

app.use(cors({
  origin: "http://localhost:3000"
}))
app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);


app.get('/', (req, res) => {
  res.json('ok')
})

app.use('/api', apiRoutes)

app.listen(cfg.port, () => {
  console.log(`Example app listening on port ${cfg.port}`)
})