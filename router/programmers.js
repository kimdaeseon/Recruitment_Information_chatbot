const express = require('express')
const router = express.Router()

const programmersFunction = require('./programmersFunction')

router.get('/', (req, res, error)=>{
    res.send("programmers home")
})

router.get('/recruitment', async (req, res, error)=>{
    res.send("this is programmers recruitment")
})


module.exports = router