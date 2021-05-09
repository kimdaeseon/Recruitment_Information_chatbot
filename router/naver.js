const express = require('express')
const router = express.Router()

const naverFunction = require('./naverFunctions')

router.get('/', (req, res, error)=>{
    res.send("naver home")
})

router.get('/recruitment', async (req, res, error)=>{
    res.send(await naverFunction.getData())
})


module.exports = router