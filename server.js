const express = require('express')
const mongoose = require('mongoose')
const Article = require('./models/article')
const articleRouter = require('./routes/articles')
const methodOveride = require('method-override')
const app = express()

mongoose.connect('mongodb://localhost/Blog',{

useNewUrlParser: true,useUnifiedTopology: true,useCreateIndex:true

})

app.set('view engine','ejs')


app.use(express.urlencoded({ extended: false }))
app.use(methodOveride('_method'))
app.get('/',async (req,res)=>{
     const articles = await Article.find().sort({
         createdAt: 'desc'
     })
    res.render('articles/index',{ articles: articles })
})
app.use('/articles',articleRouter)

app.listen(5000)