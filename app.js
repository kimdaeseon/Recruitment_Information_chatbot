const express = require('express')

const naverRouter = require('./router/naver.js')


const app = express();

const server = app.listen(3000,()=>{
    const host = server.address().address
    const port = server.address().port
    console.log("app listening at http://%s:%s", host, port)
})

app.use('/naver', naverRouter)

app.get('/naver', (req, res)=>{
    res.send("error")
})

app.get('/', (req, res)=>{
    res.send("this is home!")
})