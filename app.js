const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();

app.get('/',(req,res)=>{
    res.json({
        message:'Hey there welcome to this service'
    });
});

app.post('/posts', verifyToken,(req,res) => {
     jwt.verify(req.query.token, "key", (err, authData) => {
         if(err) {
             res.sendStatus(403); //forbidden
         } else {
             res.json({
                message:'posts  created....',
                authData: authData
             });
         }
     });
});

function verifyToken(req, res, next) {
    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== 'undefined'){
        const bearerToken = bearerHeader.split("  ")[1];
        req.token = bearerToken;
        next();
    } else {
        res.sendStatus(403); //forbidden
    }
}

app.post('/login',(req,res) => {
    const user = {
        id:1,
        username:"Bas",
        email:"bas@gmail.com"
    }
    jwt.sign({ user: user }, "key",(err, token)=>{
        res.json({
            token
        });
    });
});



app.listen(4200, (req,res)=>{
    console.log('server started on port 4200')
});