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
            term : tempData[2],
            tags : [],
            url : tempData[tempData.length - 1]
        })
        for(let j of tempData){
            if(j[0] == '#'){
                result[result.length - 1].tags.push(j)
            }
        }
    }
    return result
}

const moveNextPage = async (page)=>{

    await page.click('#mArticle > div > div.paging_list > span > a:nth-child(11) > span > span').catch((error)=>{
    })
    await page.waitForTimeout(300)
    return await page.content()
}

const getData = async ()=>{
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    let result = []
    let temp = ""

    await page.goto('https://careers.kakao.com/jobs')
    let content = await page.content()
    while(true){
        if(temp == content){
            console.log("finish", result.length)
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
        content = await moveNextPage(page)
    }
    console.log(result)
    return result
}

module.exports = {
    getData : getData
}

