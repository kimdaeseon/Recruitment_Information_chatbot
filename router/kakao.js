const express = require('express')
const router = express.Router()

const puppeteer = require('puppeteer')
const cheerio = require('cheerio')
const sanitizeHtml =require('sanitize-html')

router.get('/', (req, res, error)=>{
    res.send('hello this is kakao')
})

router.get('/recruitment', async (req, res, error)=>{
    res.send('kakao recruitment')
})