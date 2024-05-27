const mongoose = require("mongoose");

var mongoURL = 'mongodb+srv://jeevaa21bsr:jeevaruby@cluster0.ywpl2fa.mongodb.net/pizzashop'

mongoose.connect(mongoURL , {useUnifiedTopology:true , useNewUrlParser:true})

var db = mongoose.connection

db.on('connected' , ()=>{
    console.log('Mongo DB Connection Successfull');
})

db.on('error' , ()=>{
    console.log(`Mongo DB Connection failed`);
})

module.exports =mongoose
