const express = require('express')
const puppeteer = require('puppeteer')

const app = express();
const server = app.listen(3000,()=>{
    const host = server.address().address
    const port = server.address().port
    console.log("app listening at http://%s:%s", host, port)
})

app.get('/', (req, res)=>{
    res.send("this is home!")
})