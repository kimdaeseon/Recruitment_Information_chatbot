const express = require('express')
const router = express.Router()

const puppeteer = require('puppeteer')
const cheerio = require('cheerio')
const sanitizeHtml =require('sanitize-html')

const splitData = (string)=>{
    return string.replace(/(<([^>]+)>)*(\\t)?/gi, "").split("\t").filter((ele)=> ele != '')
}

const makeObject = (array)=>{
    const result = [];
    for(let i of array){
        result.push(splitData(i))
    }

    return result
}

router.get('/', (req, res, error)=>{
    res.send("naver home")
})

router.get('/recruitment', async (req, res, error)=>{
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto('https://recruit.navercorp.com/naver/job/list/developer')
    let content = await page.content()
    let temp = null;
    while(true){
        if (temp == content) break;
        else{
            temp = await page.content()
            await page.click('#moreDiv > button').catch((error)=>{
                
            })
            await page.waitForTimeout(300)
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
    console.log(result)
    res.send(result)
})


module.exports = router