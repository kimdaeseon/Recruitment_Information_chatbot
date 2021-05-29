const kakaoFunction = require("./kakaoFunction");
const naverFunction = require("./naverFunction");
const programmersFunction = require("./programmersFunction")


module.exports = {
    getKakaoData : kakaoFunction.getData,
    getNaverFunction : naverFunction.getData,
    getProgrammersFunction : programmersFunction.getData
}
