const router = require('express').Router();
const books = require('../models/book');

router.post('/new', (req, res) => {
    let { title, publication, category, publishedAt, updatedAt, cost, isBestSeller } = req.body;
    let author = [...req.body.author];
    let b = new books({
        title: title,
        publication: publication,
        author: author,
        category: category,
        publishedAt: publishedAt,
        updatedAt: updatedAt,
        cost: cost,
        isBestSeller: isBestSeller
    });
    b.save((err, doc) => {
        if (err) {
            res.send(err.message);
        }
        else {
            res.send(doc);
        }
    });
});
router.get('/average', (req, res) => {
    let sum = 0;
    books.find((err, result) => {
        result.forEach(function (value) {
            sum += value.cost;
        });
        let average = sum / result.length;
        res.send(`Average of all books: ${average}`);

    });
});
router.get('/cost', (req, res) => {
    let newArray=[];
    books.find((err, result) => {
       newArray= result.map(function (value) {
            if(value.cost>500&&value.cost<1000){
                return value;
            }
        });
        res.send(`Books between 500 and 100 are ${newArray}`);

    });
});
router.get('/year', (req, res) => {
    let newDate,newArray;
    books.find((err, result) => {
        newArray=result.map((value)=>{
            newDate=new Date(value.publishedAt);
            if(newDate.getFullYear()==2018){
                return value;
            }
        });
        
        res.send(newArray);
    });
});

router.put('/increaseCost', (req, res) => {
    
    books.find({"category":/Fict/},(err, result) => {
        result.forEach((value)=>{
        books.update({"cost":value.cost+100});
        console.log(value);    
        });
    });
});

router.get('/authors', (req, res) => {
    let newArray=[];
    books.find((err,result)=>{
        result.forEach((value)=>{
            if(value.author.length>1){
                newArray.push(value);
            }
        });
        res.send(newArray);
    });
});

router.get('/multipleAuthors', (req, res) => {
    let newArray=[];
    books.find({"author":{$in:['J.K Rowling','Stephen King']}},(err,result)=>{
        console.log(result);
        // result.forEach((value)=>{
        //     newArray.push(value);
        // });
        // res.send(newArray);
    });
});
router.get('/delete', (req, res) => {
    books.findOneAndDelete({ "title": /Lord/ }, (err, result) => {
        res.send(result);
    });
});

module.exports = router;