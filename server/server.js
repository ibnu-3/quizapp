import express from 'express'
import colors from 'colors'
import cors from 'cors'
import  'dotenv/config'
import connectDB from './config/db.js'

const app = express()
const port = process.env.PORT || 3000
app.use(cors({
    origin:'',
    methods:['POST','GET','OPTIONS','PUT','DELETE'],
    allowedHeaders:['Content-Type','Authorization','Cookie'],
    credentials:true,
}))
connectDB()
app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Server is listening on port ${port}!`.yellow ))