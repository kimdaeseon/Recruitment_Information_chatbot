const puppeteer = require('puppeteer')
const cheerio = require('cheerio')
const sanitizeHtml =require('sanitize-html')

const splitData = (string)=>{
    const temp = /(<a([^>]+)>)/g.exec(string)
    try {
        const temp2 = temp[0].split('"');
        url = "https://programmers.co.kr/job" + temp2[1];
        result = string.replace(/(<([^>]+)>)*(\\t)?/gi, "").replace(/ /g, "").split("\n").filter((ele)=> ele != '')
        result.pop()
        result.push(url)
        return result;
    } catch (error) {
        console.log(temp)
        console.log(string)
    }

}

const makeObject = (array)=>{
    const result = []
    let tempData = null
    for(let i of array){
        tempData = splitData(i)
        if(!tempData){
            console.log("error")
            continue
        }
        result.push({
            title : tempData[0],
            tags : [],
            url : tempData[tempData.length - 1],
            companyName : tempData[1]
        })
        for(let j = 6; j < tempData.length - 1; j++){
            result[result.length -1].tags.push(tempData[j])
        }
    }
    return result
}

const getData = async ()=>{
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    page.setDefaultNavigationTimeout(0)
    
    let result = []
    let temp = ""
    let count = 1;
    await page.goto('https://programmers.co.kr/job')
    let selector = '#paginate > nav > ul > li:nth-child(8) > a'
    let content = await page.content()
    let $ = cheerio.load(content, {decodeEntities: true})
    const final = sanitizeHtml($(selector), {
        parser : {
            decodeEntities : true
        }
    }).replace(/(<([^>]+)>)*(\\t)?/gi, "")
    console.log(final)
    while(true){
        await page.goto(`https://programmers.co.kr/job?page=${count}`)
        content = await page.content()
        console.log( final, count)
        if(final < count){
            console.log("finish", result.length)
            break;
        }
        $ = cheerio.load(content, {decodeEntities: true})
    
        let item = ""
        let resArr =[]
        for(let i = 1; i <= 20; i++){
            selector = `#list-positions-wrapper > ul > li:nth-child(${i})`
            item = sanitizeHtml($(selector), {
                parser : {
                    decodeEntities: true
                }
            })
            if(item ==''){
                console.log("break!!!!")
                break;
            } 
            item = item.split("</div>`")
            resArr.push(item[0])
            
        }
        result = result.concat(await makeObject(resArr))
        count = count + 1
    }
    console.log(result)
    return result
}

module.exports = {
    getData : getData
}
