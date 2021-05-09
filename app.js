const express = require('express')
const puppeteer = require('puppeteer')

const naverRouter = require('./router/naver')



const app = express();
const server = app.listen(3000,()=>{
    const host = server.address().address
    const port = server.address().port
    console.log("app listening at http://%s:%s", host, port)
})

app.use('/naver', naverRouter)

app.get('/', (req, res)=>{
    res.send("this is home!")
})