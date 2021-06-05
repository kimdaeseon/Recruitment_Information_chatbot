var express = require('express');
const request = require('request');
const TARGET_URL = 'https://api.line.me/v2/bot/message/reply'
const TOKEN = require('config').TOKEN
const fs = require('fs');
const path = require('path');
const HTTPS = require('https');
const domain = require('config').domain
const sslport = 23023;
const bodyParser = require('body-parser');

const schedule = require('node-schedule')

const data = require('./functions/dataFunctions')
const find = require('./functions/findFunction')

// 0초 0분 0시 아무날 아무달 아무년
const saveData = schedule.scheduleJob('55 45 20 * * *', data.save)

var app = express();
app.use(bodyParser.json());
app.post('/hook', function (req, res) {
    var eventObj = req.body.events[0];
    var source = eventObj.source;
    var message = eventObj.message;
    // request log
    console.log('======================', new Date() ,'======================');
    console.log('[request]', req.body);
    console.log('[request source] ', eventObj.source);
    console.log('[request message]', eventObj.message);
    request.post(
        {
            url: TARGET_URL,
            headers: {
                'Authorization': `Bearer ${TOKEN}`
            },
            json: {
                "replyToken":eventObj.replyToken,
                "messages":[
                    {
                        "type":"text",
                        "text":"Hello, user"
                    },
                    {
                        "type":"text",
                        "text":"May I help you?"
                    }
                ]
            }
        },(error, response, body) => {
            console.log(body)
        });
    
    res.sendStatus(200);
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
