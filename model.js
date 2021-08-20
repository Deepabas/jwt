const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        min:6,
        max:255
    },

    email:{
        type:String,
        required:true,
        max:255,
        min:6
    },

   /* role:{
        type:Number,
        required:true,
        default:3
    },*/
    role: {
        type: String,
        default: 'user',
        enum: ["user", "superadmin", "admin"]
       },
       accessToken: {
        type: String
       },

    password:{
        type:String,
        required:true,
        max:1025,
        min:6
    },
  active:{
        type:Boolean,
        required:false
    },
    date:{
        type:Date,
        default:Date.now
    }

});

module.exports = mongoose.model('demo',userSchema)




/* 1role - get
admin 2role
user 3role default
type:Number,
        required:true,
        default:3
*/