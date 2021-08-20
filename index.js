const express = require("express");
const app = express();
const mongoose = require("mongoose")


//import routes
const authRoute = require('./auth')
//const postRoute = require('./posts')

//middlewares
app.use(express.json());

//route middlewares
app.use('/',authRoute)
//app.use('/',postRoute)



app.listen(3000,() => {
    console.log("server listening in port 3000")
})

mongoose.connect('mongodb+srv://user:MbvyVlIqk0xlPnZs@cluster0.uxdtw.mongodb.net/test', {
        useNewUrlParser: true , useFindAndModify: false, useUnifiedTopology: true, useCreateIndex: true, })
        .then(() => console.log("mongodb connected"))
        .catch(err => console.log(err));
