const fs = require('fs')
const functions = require('./function')

const read = async () =>{
    const data = []
    let title = ""
    let tags = []
    let url = ""
    let companyName = ""
    const today = new Date()
    const string = fs.readFileSync(`./datas/${today.getFullYear()}.${today.getMonth()}.${today.getDate()}`, 'utf-8', 'r')
    const stringArray = string.split('\n')
    const size = stringArray.length
    for(let i = 0 ; i < size; i++){
        if( i % 4 == 0){
            title = stringArray[i].replace("title : ", "")
        }
        else if( i % 4 == 1){
            tags = stringArray[i].replace("tags : ", "").split(",")
        }
        else if( i % 4 == 2){
            url = stringArray[i].replace("url : ", "")
        }
        else if ( i % 4 == 3){
            companyName = stringArray[i].replace("companyName : ", "")
            data.push({
                title : title,
                tags : tags,
                url : url,
                companyName : companyName
            })
        }
    }
    return data
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
            temp = "companyName : " + i.companyName
            string = string + temp + "\n"
        }

        data = await functions.getNaverFunction()
        temp = ""
        for(let i of data){
            temp = "title : " + i.title
            string = string + temp + "\n"
            temp = "tags : " + i.tags.toString()
            string = string + temp + "\n"
            temp = "url : " + i.url
            string = string + temp + "\n"
            temp = "companyName : " + i.companyName
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
            temp = "companyName : " + i.companyName
            string = string + temp + "\n"
        }
        const today = new Date()
        fs.writeFile(`./datas/${today.getFullYear()}.${today.getMonth()}.${today.getDate()}`, string, 'utf-8', (err)=>{
            if(err){
                console.log(err)
                save()
            }
            else console.log("저장완료!")
        })
    } catch (error) {
        console.log(error)
        save()
    }
}

module.exports = {
    save : save,
    read : read
}