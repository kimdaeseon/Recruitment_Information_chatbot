const express = require('express')
const schedule = require('node-schedule')
const fs = require('fs')
const functions = require('./function')

const app = express();


const readData = async () =>{
    const data = []
    let title = ""
    let tags = []
    let url = ""
    const today = new Date()
    const string = fs.readFileSync(`./datas/${today.getFullYear()}.${today.getMonth()}.${today.getDate()}`, 'utf-8', 'r')
    const stringArray = string.split('\n')
    const size = stringArray.length
    for(let i = 0 ; i < size; i++){
        if( i % 3 == 0){
            title = stringArray[i].replace("title : ", "")
        }
        else if( i % 3 == 1){
            tags = stringArray[i].replace("tags : ", "").split(",")
        }
        else if ( i % 3 == 2){
            url = stringArray[i].replace("url : ", "")
            data.push({
                title : title,
                tags : tags,
                url : url
            })
        }
    }
    console.log(data)
}

const save = async()=> {
    try {
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
        const today = new Date()
        fs.writeFile(`./datas/${today.getFullYear()}.${today.getMonth()}.${today.getDate()}`, string, 'utf-8', (err)=>{
            if(err){
                save()
            }
            else console.log("저장완료!")
        })
    } catch (error) {
        console.log(error)
        save()
    }
}
// 0초 0분 0시 아무날 아무달 아무년
const saveData = schedule.scheduleJob('0 0 0 * * *', save)

const server = app.listen(3000,()=>{
    const host = server.address().address
    const port = server.address().port
    console.log("app listening at http://%s:%s", host, port)
})


app.get('/', async (req, res)=>{


    res.send(string)
})