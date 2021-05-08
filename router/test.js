const splitData = (string)=>{
    const temp = /(<a([^>]+)>)/g.exec(string)
    console.log(temp)
    const temp2 = temp[0].split('"');
    console.log(temp2)
    url = "https://recruit.navercorp.com" + temp2[1];
    console.log(url)
    result = string.replace(/(<([^>]+)>)*(\\t)?/gi, "").split("\t").filter((ele)=> ele != '')
    result.pop()
    result.push(url)
    return result;
}

const string = `\t<a href="/naver/job/detail/developer?annoId=20002849&amp;classId=&amp;jobId=&amp;entTypeCd=&amp;searchTxt=&amp;searchSysComCd=">\t\t<span>\t\t\t<strong>[Platform Engineering] Server Engineer</strong>\t\t\t<span>NEW</span>\t\t\t<em>2021.04.26~2021.05.10</em>\t\t\t<span></span>\t\t</span>\t</a>\t<span><a href="/naver/job/list/developer?entTypeCd=&amp;searchSysComCd=&amp;searchTxt=Platform%20Engineering">#Platform Engineering</a><a href="/naver/job/list/developer?entTypeCd=&amp;searchSysComCd=&amp;searchTxt=Software%20Development">#Software Development</a><a href="/naver/job/list/developer?entTypeCd=&amp;searchSysComCd=&amp;searchTxt=Server">#Server</a><a href="/naver/job/list/developer?entTypeCd=&amp;searchSysComCd=&amp;searchTxt=%EA%B2%BD%EB%A0%A5">#경력</a><a href="/naver/job/list/developer?entTypeCd=&amp;searchSysComCd=&amp;searchTxt=Backend">#Backend</a>\t </span>`

console.log(splitData(string))