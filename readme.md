![MIT License][license-shield]



# <center>개발자 채용 정보 챗봇</center>


<!-- TABLE OF CONTENTS -->
### 목차
1. 프로젝트에 대하여
  - 사용한 프레임워크
2. 시작하기 전에
  - 설치 전에
  - 설치
  - 리눅스 VM에서 오류 발생시
3. 사용법
  - 챗봇 친구 추가
  - 사용방법
4. 프로젝트 기여하는 방법
5. 라이센스
6. 연락처





<!-- ABOUT THE PROJECT -->
## <center>프로젝트에 대하여</center>      

-------------

이 프로젝트는 개발자 채용정보를 알려주는 챗봇입니다. 현재 채용정보는 [네이버 채용](https://recruit.navercorp.com/naver/job/list/developer), [카카오 채용](https://careers.kakao.com/jobs), [프로그래머스 개발자 채용](https://programmers.co.kr/job) 등 다양한 홈페이지에 분산되어 있습니다. 분산되어 있는 정보를 하나로 묶어서 확인하는 것이 프로젝트의 목표입니다. 채용정보는 [네이버 채용](https://recruit.navercorp.com/naver/job/list/developer), [카카오 채용](https://careers.kakao.com/jobs),  [프로그래머스 개발자 채용](https://programmers.co.kr/job) 에서 데이터를 가져와서 저장하고, 챗봇의 형태로 회사, 직군태그, 모집명을 통해 조회할 수 있습니다.

- 데이터 소스
  - [네이버 채용](https://recruit.navercorp.com/naver/job/list/developer)
  - [카카오 채용](https://careers.kakao.com/jobs)
  - [프로그래머스 개발자 채용](https://programmers.co.kr/job) 
- 채팅 앱
  - [라인](https://line.me/ko/)

### 사용한 프레임워크       

* [express](https://getbootstrap.com)



<!-- GETTING STARTED -->

## <center>시작하기 전에</center>    

--------------------

### 설치 전에     

* npm
  ```
  npm install npm@latest -g
  ```

### 설치      

1. [Line Developers](https://developers.line.biz/en/)에서 TOKEN키를 받아옵니다.     
2. 레포지토리를 클론합니다.        
   ```
   git clone http://khuhub.khu.ac.kr/2017103961/Recruitment_Information_chatbot
   ```
3. NPM package들을 설치합니다.         
   ```
   npm install
   ```
4. config.js 파일을 프로젝트 디렉토리에 생성하고 아래 코드를 입력합니다. domain 과 TOKEN에는 본인의 도메인과 토큰을 입력합니다.        
   ```javascript
   const domain = "ENTER YOUR DOMAIN"
   const TOKEN = "ENTER YOUR TOKEN"
   module.exports={domain : domain,TOKEN : TOKEN}
   ```
5. datas 디렉토리를 프로젝트 디렉토리에 생성합니다.    

### 리눅스 VM에서 오류 발생시     

이 프로젝트에서 사용하고 있는 puppeteer은 실제 GUI 환경의 브라우저(Chromium)를 구동해서 웹페이이제 접속하고 클릭을 수행하는 패키지이다. 

따라서 AWS를 통해 프로젝트를 실행하려고 하면 오류가 발생할수 있다.

puppeteer에서 오류가 발생하면 다음과 같이 하면된다.      
#### 해결책 1     

1. puppeteer, puppeteer-core 설치
   ```
   sudo npm install puppeteer
   sudo npm install puppeteer-core
   ```      
#### 해결책 2   

해결책 1로 해결이 안된 경우는 puppeteer 구동에 필요한 것들이 충분히 설치되지 않아서 일 수 도 있습니다.

1. 필요 라이브러리 설치, OS에 맞는 라이브러리를 설치 (아래 예시 코드는 Ubuntu 18.04.5 LTS 기반)
   ```
   sudo apt-get install gconf-service libasound2 libatk1.0-0 libc6 libcairo2 libcups2 libdbus-1-3 libexpat1 libfontconfig1 libgcc1 libgconf-2-4 libgdk-pixbuf2.0-0 libglib2.0-0 libgtk-3-0 libnspr4 libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 libxcb1 libxcomposite1 libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 libxtst6 ca-certificates fonts-liberation libappindicator1 libnss3 lsb-release xdg-utils wget libgbm1
   ```        
#### [출처 및 더 자세한 정보](https://curryyou.tistory.com/222)     



<!-- USAGE EXAMPLES -->



## <center>사용법</center>     
--------------

### 챗봇 친구추가      

1. line 친구 찾기로 이동합니다.
2. 아이디 @810mftdd 입력합니다.
3. 개발자 채용정보 챗봇을 친구 추가합니다.



### 사용방법    

1. 키워드 입력

3. 챗봇이 보내는 회사명으로 검색하기, 태그로 검색하기, 제목으로 검색하기 중 원하는 기능을 선택합니다. 

   1. 회사명으로 검색하기를 선택한 경우 키워드를 포함한 회사명을 갖고 있는 채용정보를 출력합니다.
   2. 태그로 검색하기를 선택한 경우 채용정보의 태그로 키워드를 포함하고있는 채용정보를 출력합니다.
   3. 제목으로 검색하기를 선택한 경우 키워드를 포함한 제목을 가지고 있는 채용정보를 출력합니다.
   
3. 채용정보 출력 (최대 4개)

4. 채용정보가 더 존재한다면 다음보기 버튼이 노출되며, 다음보기 버튼을 누르면 이어서 채용정보를 출력합니다.

5. 다른 키워드로 검색을 하고 싶다면, 새로운 키워드를 입력하고 사용 방법 2번 부터 다시 진행합니다.

   

<!-- CONTRIBUTING -->

## <center>프로젝트에 기여하는 방법</center>       

-------------------

1. 프로젝트를 Fork 합니다. 
2. 사용할 Feature Bracnh를 생성합니다.(`git checkout -b feature/AmazingFeature`)
3. 변경사항을 Commit 합니다. (`git commit -m 'Add some AmazingFeature'`)
4. Branch로 Push 합니다. (`git push origin feature/AmazingFeature`)
5. Pull Request를 보냅니다.      
   


<!-- LICENSE -->

## <center>라이센스</center>        
---------------------
MIT License.      



<!-- CONTACT -->

## <center>연락처</center>     

------------------------

kimdaeseon@khu.ac.kr    

Project Link: [http://khuhub.khu.ac.kr/2017103961/Recruitment_Information_chatbot](http://khuhub.khu.ac.kr/2017103961/Recruitment_Information_chatbot)   









<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[license-shield]: https://img.shields.io/github/license/othneildrew/Best-README-Template.svg?style=for-the-badge
