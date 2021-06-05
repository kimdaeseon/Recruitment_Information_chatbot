const puppeteer = require('puppeteer')
const cheerio = require('cheerio')
const sanitizeHtml =require('sanitize-html')

const splitData = (string)=>{
    const temp = /(<a([^>]+)>)/g.exec(string)
    const temp2 = temp[0].split('"');
    url = "https://recruit.navercorp.com" + temp2[1];
    result = string.replace(/(<([^>]+)>)*(\\t)?/gi, "").split("\t").filter((ele)=> ele != '')
    result.pop()
    result.push(url)
    return result;
}

const makeObject = (array)=>{
    const result = []
    let tempData = null
    for(let i of array){
        tempData = splitData(i)
        if(tempData.length == 5){
            result.push({
                title : tempData[0],
                tags : tempData[3].split('#').filter((ele)=>ele != ''),
                url : tempData[4],
                companyName : "naver"
            })
        }
        else if (tempData.length == 4){
            result.push({
                title : tempData[0],
                url : tempData[3],
                tags : [],
                companyName : "naver"
            })
        }
    }
    return result
}

const getData = async ()=>{
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    page.setDefaultNavigationTimeout(0)

    await page.goto('https://recruit.navercorp.com/naver/job/list/developer')
    let content = await page.content()
    let temp = null;
    while(true){
        if (temp == content) break;
        else{
            temp = await page.content()
            await page.click('#moreDiv > button').catch((error)=>{
                
            })
            await page.waitForTimeout(1500)
            content = await page.content()
        }
    }
    let $ = cheerio.load(content, {decodeEntities: true})

    const selector = '#jobListDiv > ul > li'

    let result = sanitizeHtml($(selector), {
        parser : {
            decodeEntities: true
        }
    })
    resArr = result.split('</li><li>')
    result = makeObject(resArr)
    console.log("naver : ", result.length)
    return result;
}

module.exports = {
    getData : getData
}