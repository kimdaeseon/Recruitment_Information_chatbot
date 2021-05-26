const kakaoFunction = require("./functions/kakaoFunction");
const naverFunction = require("./functions/naverFunction");
const programmersFunction = require("./functions/programmersFunction")


module.exports = {
    getKakaoData : kakaoFunction.getData,
    getNaverFunction : naverFunction.getData,
    getProgrammersFunction : programmersFunction.getData
}
