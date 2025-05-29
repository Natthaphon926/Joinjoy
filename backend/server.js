const express = require('express')
const app = express()
const morgan = require('morgan')
const {readdirSync} = require('fs')
const cors = require('cors')

app.use(cors({
  origin: "http://localhost:5174", 
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true 
}));

app.use(morgan('dev'))
app.use(express.json({limit:'20mb'}))
readdirSync('./routes').map((c)=> app.use('/api',require('./routes/'+c)))





app.listen(3000,()=> console.log('Server is running on port 3000'))