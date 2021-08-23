 const user = require('express').Router();
const demo = require("./model")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const {registerValidation, loginValidation} = require("./validate");
const verify = require('./verifyToken')
const roles  = require('./role.js')


user.post('/register', async (req,  res) => {

    //lets validate the data before we a user

   /*const validation = Joi.validate(req.body, schema);
   res.send(validation);
   // find error
   const {error} = Joi.validate(req.body, schema);
   res.send(error.details[0].message);*/

   const {error} = registerValidation(req.body);
if(error) return res.status(400).send(error.details[0].message);

   //checking if the user is already in the database
   const emailExist = await demo.findOne({email: req.body.email});
   if(emailExist) return res.status(400).send('email already exists');

   //Hash passwords
   const salt = await bcrypt.genSalt(10);
   const hashedPassword = await bcrypt.hash(req.body.password, salt);

//create a new user
    const user = new demo({
        name: req.body.name,
        email: req.body.email,
        password:hashedPassword,
        role: req.body.role
        //password: req.body.password
    })
    try {
        const savedUser = await user.save();
        //res.send(savedUser);
        //res.send({ user: user._id});
        res.send({ name: savedUser.name,
            email: savedUser.email,
            role: savedUser.role
        });
   } catch (err) {
        res.status(400).send(err);
    }
});

//login
user.post('/login', async (req,  res) => {
//lets validate the data before we a user
const {error} = loginValidation(req.body);
if(error) return res.status(400).send(error.details[0].message);

//checking if the email exists
   const user = await demo.findOne({email: req.body.email});
   if(!user) return res.status(400).send('email is not found');

//password is correct
const validPassword = await bcrypt.compare(req.body.password, user.password);
if(!validPassword) return res.status(400).send('password is not valid');

//create and assign a  token
//const token = jwt.sign({_id: user._id}, 'secretkey');
const token = jwt.sign({user}, 'secretkey');

res.header('auth-token', token).send(token);

res.send('Logged in!');
});

user.get('/token',verify,(req,res)=>{
    /* res.json({
         posts:{
             title:'my first post',
             description:'random data you should not access'
         }
     })*/
     res.send(req.user)
 })



exports.grantAccess = function(action, resource) {
    return async (req, res, next) => {
     try {
      const permission = roles.can(req.user.role)[action](resource);
      if (!permission.granted) {
       return res.status(401).json({
        error: "You don't have enough permission to perform this action"
       });
      }
      next()
     } catch (error) {
      next(error)
     }
    }
   }



module.exports = user;
