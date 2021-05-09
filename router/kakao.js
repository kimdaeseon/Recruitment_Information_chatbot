const express = require('express')
const router = express.Router()

const kakaoFunction = require('./kakaoFunction')

router.get('/', (req, res, error)=>{
    res.send('hello this is kakao')
})

router.get('/recruitment', async (req, res, error)=>{
    res.send(await kakaoFunction.getData())
})

module.exports = router