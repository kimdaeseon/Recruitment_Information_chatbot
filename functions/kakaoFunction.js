const puppeteer = require('puppeteer')
const cheerio = require('cheerio')
const sanitizeHtml =require('sanitize-html')

const splitData = (string)=>{
    const temp = /(<a([^>]+)>)/g.exec(string)
    const temp2 = temp[0].split('"');
    url = "https://careers.kakao.com" + temp2[1];
    result = string.replace(/(<([^>]+)>)*(\\t)?/gi, "").replace(/ /g, "").split("\n").filter((ele)=> ele != '')
    result.pop()
    result.push(url)
    return result;
}

const makeObject = (array)=>{
    const result = []
    let tempData = null
    for(let i of array){
        tempData = splitData(i)
        result.push({
            title : tempData[0],
            tags : [],
            url : tempData[tempData.length - 1],
            companyName : "kakao"
        })
        for(let j of tempData){
            if(j[0] == '#'){
                result[result.length - 1].tags.push(j)
            }
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
    let count = 1
    await page.goto('https://careers.kakao.com/jobs')
    let content = ""
    while(true){
        await page.goto(`https://careers.kakao.com/jobs?page=${count}`)
        content = await page.content()
        if(temp == content){
            break;
        }
        let $ = cheerio.load(content, {decodeEntities: true})
    
        const selector = '#mArticle > div > ul.list_jobs'
    
        let resultString = sanitizeHtml($(selector), {
            parser : {
                decodeEntities: true
            }
        })
        resArr = resultString.split('</li>')
        resArr.pop()
        result = result.concat(await makeObject(resArr))
        temp = content
        count = count + 1
    }
    console.log("kakao : ", result.length)
    return result
}

module.exports = {
    getData : getData
}
