const express = require('express')
const schedule = require('node-schedule')

const dataFunctions = require('./functions/dataFunctions')

const app = express();



// 0초 0분 0시 아무날 아무달 아무년
const saveData = schedule.scheduleJob('55 30 16 * * *', dataFunctions.save)

const server = app.listen(3000,()=>{
    const host = server.address().address
    const port = server.address().port
    console.log("app listening at http://%s:%s", host, port)
})


app.get('/', async (req, res)=>{


    res.send("hello world")
})