const mongoose=require('mongoose');
const schema=mongoose.Schema;

let author=new schema({
    author:{
        type:String
    }
});
let bookSchema = new schema({
    title:{
        type:String
    },
    publication:{
        type:String
    },
    author:[author],
    category:{
        type:String
    },
    publishedAt:{
        type:Date
    },
    createdAt:{
        type:Date,
        default:Date.now()
    },
    updatedAt:{
        type:Date
    },
    cost:{
        type:Number
    },
    isBestSeller:{
        type:Boolean
    },

    
});
module.exports = mongoose.model('books',bookSchema);