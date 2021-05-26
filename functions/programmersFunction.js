const puppeteer = require('puppeteer')
const cheerio = require('cheerio')
const sanitizeHtml =require('sanitize-html')

const splitData = (string)=>{
    const temp = /(<a([^>]+)>)/g.exec(string)
    const temp2 = temp[0].split('"');
    url = "https://programmers.co.kr/job" + temp2[1];
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
            url : tempData[tempData.length - 1]
        })
        for(let j = 6; j < tempData.length - 1; j++){
            result[result.length -1].tags.push(tempData[j])
        }
    }
    return result
}

const moveNextPage = async (page)=>{

    await page.click('#paginate > nav > ul > li.next.next_page.page-item > a').catch((error)=>{
    })
    await page.waitForTimeout(300)
    return await page.content()
}

const getData = async ()=>{
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    let result = []
    let temp = ""

    await page.goto('https://programmers.co.kr/job')
    let content = await page.content()
    while(true){
        if(temp == content){
            console.log("finish", result.length)
            break;
        }
        let $ = cheerio.load(content, {decodeEntities: true})
    
        let item = ""
        let resArr =[]
        for(let i = 1; i <= 20; i++){
            selector = `#list-positions-wrapper > ul > li:nth-child(${i})`
            item = sanitizeHtml($(selector), {
                parser : {
                    decodeEntities: true
                }
            })
            if(item =='') break;
            item = item.split("</div>`")
            resArr.push(item[0])
            
        }
        result = result.concat(await makeObject(resArr))
        resArr = []
        temp = content
        content = await moveNextPage(page)
    }
    console.log(result)
    return result
}


module.exports = {
    getData : getData
}