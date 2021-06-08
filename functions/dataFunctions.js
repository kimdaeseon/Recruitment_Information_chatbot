const fs = require('fs')
const functions = require('./function')

let status = false

const save = async()=> {
    if(status){
        return
    }
    else if(!status){
        status = true
    }
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
<<<<<<< HEAD
        
=======
>>>>>>> 694647de3d94a82e2485ce202270c0702aaed6f7
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
            status = false
            if(err){
                console.log("파일저장시에 오류")
            }
            else console.log("저장완료!")
        })
    } catch (error) {
        status = false
        console.log("파일저장시에 오류")
    }
}

const read = () =>{
    const data = []
    let title = ""
    let tags = []
    let url = ""
    let companyName = ""
    // const today = new Date()
    const today = new Date()
    let string
    try {
        string = fs.readFileSync(`./datas/${today.getFullYear()}.${today.getMonth()}.${today.getDate()}`, 'utf-8', 'r')
    } catch (error) {
        save()
        if(today.getDate()-1 == 0){
            if([1, 3, 5, 7, 8, 10, 12].includes(today.getMonth() - 1)){
                string = fs.readFileSync(`./datas/${today.getFullYear()}.${today.getMonth() - 1}.${31}`, 'utf-8', 'r')
            }
            else if([4, 6, 9, 11].includes(today.getMonth() - 1)){
                string = fs.readFileSync(`./datas/${today.getFullYear()}.${today.getMonth()}.${30}`, 'utf-8', 'r')
            }
            else if (2 == today.getMonth() - 1){
                string = fs.readFileSync(`./datas/${today.getFullYear()}.${today.getMonth()}.${28}`, 'utf-8', 'r')
            }
            else if (0 == today.getMonth() - 1){
                string = fs.readFileSync(`./datas/${today.getFullYear() - 1}.${12}.${31}`, 'utf-8', 'r')
            }
        }
        else{
            string = fs.readFileSync(`./datas/${today.getFullYear()}.${today.getMonth()}.${today.getDate()-1}`, 'utf-8', 'r')
        }
    }
    return string
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

module.exports = {
    save : save,
    read : read
}
