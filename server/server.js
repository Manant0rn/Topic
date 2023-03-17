const express = require("express")
const morgan = require("morgan")
const cors = require("cors")
const mongoose = require("mongoose")
require("dotenv").config()
const blogRoute = require("./routes/blog")
const authRoute = require("./routes/auth")

const app = express()

//connect database
mongoose.connect(process.env.DATABASE,{
    useNewUrlParser:true,
    useUnifiedTopology:false
}).then(()=> console.log("เชื่อมต่อเรียบร้อย"))
.catch((err)=> console.log(err))

//middleware
app.use(express.json())
app.use(cors())
app.use(morgan("dev"))

//route

// app.get("*",(req,res) =>{
//     res.json({
//         data:"message from server"
//     })
// })

app.use('/api',blogRoute)
app.use('/api',authRoute)


const port = process.env.PORT || 8080
//รัน server
app.listen(port,()=> console.log(`Start server in port ${port}`))