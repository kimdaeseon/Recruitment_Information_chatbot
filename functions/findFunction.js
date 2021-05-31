const data = require('./dataFunctions')


const byCompanyName = function(companyName){
    return data.read().filter(data => data.companyName.includes(companyName))
}

const byTags = function(tag){
    return data.read().filter(data => data.tags.join().includes(tag))
}

const byTitle = function(title){
    return data.read().filter(data => data.title.includes(title))
}

module.exports = {
    byCompanyName : byCompanyName,
    byTags : byTags,
    byTitle : byTitle
}