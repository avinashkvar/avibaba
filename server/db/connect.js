const mongoose = require('mongoose')
require('dotenv').config();
const url = process.env.MONGODB_URI;

async function connect (){
     return new Promise((resolve,reject)=>{
         mongoose.connect(url).then(()=>resolve()).catch((err)=>reject(err))
     })
}

module.exports = connect