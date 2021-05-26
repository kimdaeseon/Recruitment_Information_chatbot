const express = require('express')
const functions = require('./function')

const app = express();

const server = app.listen(3000,()=>{
    const host = server.address().address
    const port = server.address().port
    console.log("app listening at http://%s:%s", host, port)
})


app.get('/', async (req, res)=>{
    let string = ""
    let data = await functions.getKakaoData()
    let temp = ""
    for(let i of data){
        temp = "title : " + i.title
        string = string + temp + "\n"
        temp = "tags : " + i.tags.toString()
        string = string + temp + "\n"
        temp = "url : " + i.url
        string = string + temp + "\n"
    }

    data = await functions.getNaverFunction()
    temp = ""
    for(let i of data){
        temp = "title : " + i.title
        string = string + temp + "\n"
        if(!!i.tags){
            temp = "tags : " + i.tags.toString()
            string = string + temp + "\n"
        }
        temp = "url : " + i.url
        string = string + temp + "\n"
    }

    data = await functions.getProgrammersFunction()
    temp = ""
    for(let i of data){
        temp = "title : " + i.title
        string = string + temp + "\n"
        temp = "tags : " + i.tags.toString()
        string = string + temp + "\n"
        temp = "url : " + i.url
        string = string + temp + "\n"
    }

    res.send(string)
})