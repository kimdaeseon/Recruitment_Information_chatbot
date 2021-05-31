const express = require('express')
const schedule = require('node-schedule')

const data = require('./functions/dataFunctions')
const find = require('./functions/findFunction')
const app = express();



// 0초 0분 0시 아무날 아무달 아무년
const saveData = schedule.scheduleJob('55 45 20 * * *', data.save)

const server = app.listen(3000,()=>{
    const host = server.address().address
    const port = server.address().port
    console.log("app listening at http://%s:%s", host, port)
})


app.get('/', async (req, res)=>{

    console.log(find.byCompanyName('naver')[0], find.byTags('백엔드')[0], find.byTitle('백엔드')[0])
    res.send('helloworld')
})