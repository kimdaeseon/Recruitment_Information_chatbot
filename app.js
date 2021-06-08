var express = require('express');
const request = require('request');
const TARGET_URL = 'https://api.line.me/v2/bot/message/reply'
const TOKEN = require('./config').TOKEN
const fs = require('fs');
const path = require('path');
const HTTPS = require('https');
const domain = require('./config').domain
const sslport = 23023;
const bodyParser = require('body-parser');

const schedule = require('node-schedule')

const data = require('./functions/dataFunctions')
const find = require('./functions/findFunction')

// 0초 0분 0시 아무날 아무달 아무년
const saveData = schedule.scheduleJob('00 0 00 * * *', data.save)

var app = express();
app.use(bodyParser.json());
app.post('/hook', function (req, res) {
    var eventObj = req.body.events[0];
       
    var source = eventObj.source;
    var message = eventObj.message;
    // request log
    console.log('======================', new Date() ,'======================');
    console.log('[queryString]', req.query)
    console.log('[request]', req.body);
    console.log('[request source] ', eventObj.source);
    console.log('[request message]', eventObj.message);
    console.log('[request postback]', eventObj.postback);

    let messageData
    const messageResult = []
    let string
    let start
    let finish
    let data
    let flag = true
    let button 
    if(eventObj.type == "message"){
        start = 0;
        finish = start + 4

        button = {
            "type" : "flex",
            "altText" : "test FLEX",
            "contents" : {
                    "type": "bubble",
                    "body": {
                        "type": "box",
                        "layout" : "vertical",
                        "contents" : [
                            {
                                "type": "button",
                                "action": {
                                    "type":"postback",
                                    "label":"회사명으로 검색하기",
                                    "data": eventObj.message.text + "|||0|||" + "companyName"
                                },
                                "style": "primary",
                                "color": "#ff9a9e"
                            },
                            {
                                "type": "button",
                                "action": {
                                    "type":"postback",
                                    "label":"태그로 검색하기",
                                    "data": eventObj.message.text + "|||0|||" + "tag"
                                },
                                "style": "primary",
                                "color": "#fbc2eb"
                            },
                            {
                                "type": "button",
                                "action": {
                                    "type":"postback",
                                    "label":"제목으로 검색하기",
                                    "data": eventObj.message.text + "|||0|||" + "title"
                                },
                                "style": "primary",
                                "color": "#8fd3f4"
                            }
                        ]
                    }
            }
        }
        result = {
            url: TARGET_URL,
            headers: {
                'Authorization': `Bearer ${TOKEN}`
            },
            json: {
                "replyToken":eventObj.replyToken,
                "messages": [button]
            }
        }
        request.post(result ,(error, response, body) => {
            console.log(body)
        });
    
        res.sendStatus(200);
    }
    else if(eventObj.type = "postback"){
        postbackData = eventObj.postback.data.split("|||")
        if(postbackData[2] == "companyName")  messageData = find.byCompanyName(postbackData[0])
        else if(postbackData[2] == "tag") messageData = find.byTags(postbackData[0])
        else if(postbackData[2] == "title") messageData = find.byTitle(postbackData[0])
        if(messageData.length == 0){
            result = {
                url: TARGET_URL,
                headers: {
                    'Authorization': `Bearer ${TOKEN}`
                },
                json: {
                    "replyToken":eventObj.replyToken,
                    "messages": [{
                        "type" : "text",
                        "text" : "검색결과가 없습니다!"
                    }]
                }
            }
            request.post(result ,(error, response, body) => {
                    console.log(body)
            });
            
            res.sendStatus(200);
        }
        else{
            start = parseInt(eventObj.postback.data.split("|||")[1])
            finish = start + 4
            if (finish >= messageData.length){
                finish = messageData.length
                flag = false
            }
            
            button = {
                "type" : "flex",
                "altText" : "test FLEX",
                "contents" : {
                        "type": "bubble",
                        "body": {
                            "type": "box",
                            "layout" : "vertical",
                            "contents" : [
                                {
                                    "type": "button",
                                    "action": {
                                        "type":"postback",
                                        "label":"다음 보기",
                                        "data": postbackData[0] + " " + finish + " " + postbackData[2]
                                    },
                                    "style": "primary",
                                    "color": "#fbc2eb"
                                }
                            ]
                        }
                }
            }
            for(start ; start < finish; start++){
                string = "제목 : " + messageData[start].title +"\n" + "회사명 : " + messageData[start].companyName + "\n" + "tags : " + messageData[start].tags.toString() +"\n" + "링크 : " + messageData[start].url + "\n"
                messageResult.push({
                    "type" : "text",
                    "text" : string
                })
            }
            if(flag){
                messageResult.push(button)
                result = {
                    url: TARGET_URL,
                    headers: {
                        'Authorization': `Bearer ${TOKEN}`
                    },
                    json: {
                        "replyToken":eventObj.replyToken,
                        "messages": messageResult
                    }
                }
            }
            else{
                result = {
                    url: TARGET_URL,
                    headers: {
                        'Authorization': `Bearer ${TOKEN}`
                    },
                    json: {
                        "replyToken":eventObj.replyToken,
                        "messages": messageResult
                    }
                }
            }
            request.post(result ,(error, response, body) => {
                console.log(body)
            });
            
            res.sendStatus(200);
        }
    }
});
try {
    const option = {
        ca: fs.readFileSync('/etc/letsencrypt/live/' + domain +'/fullchain.pem'),
        key: fs.readFileSync(path.resolve(process.cwd(), '/etc/letsencrypt/live/' + domain +'/privkey.pem'), 'utf8').toString(),
        cert: fs.readFileSync(path.resolve(process.cwd(), '/etc/letsencrypt/live/' + domain +'/cert.pem'), 'utf8').toString(),
    };

    HTTPS.createServer(option, app).listen(sslport, () => {
        console.log(`[HTTPS] Server is started on port ${sslport}`);
    });
} catch (error) {
    console.log('[HTTPS] HTTPS 오류가 발생하였습니다. HTTPS 서버는 실행되지 않습니다.');
    console.log(error);
}
