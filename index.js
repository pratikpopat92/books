const express=require('express');
const bodyParser=require('body-parser');
const mongoose=require('mongoose');
const bookRoute=require('./routes/book');

const app=express();
mongoose.connect('mongodb://localhost:27017/books', {useNewUrlParser: true,useUnifiedTopology: true },function(err){
  console.log('Connection to Mongodb successful!');  
});
app.use(bodyParser.json());
app.use('/books',bookRoute);


app.listen(3000,()=>console.log('server started...'));