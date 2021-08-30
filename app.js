const container = document.getElementById("root");
const ajax = new XMLHttpRequest();
const content = document.createElement("div");
const NEWS_URL = "https://api.hnpwa.com/v0/news/1.json"; // 해커 뉴스 news 1페이지
const CONTENT_URL = "https://api.hnpwa.com/v0/item/@id.json"; // @id를 통해 뉴스 기사 고유의 id를 파악해 해당 뉴스 기사의 json을 가져온다

function getData(url) {
  // 데이터를 가져오는 함수 생성
  ajax.open("GET", url, false);
  ajax.send();

  return JSON.parse(ajax.response);
}

const newsFeed = getData(NEWS_URL);
const ul = document.createElement("ul");

window.addEventListener("hashchange", function () {
  // 제목을 클릭 할 때마다 해시 값이 바껴 haschange 함수가 호출된다.
  const id = location.hash.substr(1); //주소와 관련된 정보 제공, substr: () 안의 값 이후부터 끝가지 문자열 출력

  const newsContent = getData(CONTENT_URL);
  const title = document.createElement("h1");

  title.innerHTML = newsContent.title;

  content.appendChild(title);
});

for (let i = 0; i < 10; i++) {
  const div = document.createElement("div");
  const li = document.createElement("li");
  const a = document.createElement("a");

  div.innerHTML = `<li><a href = "#${newsFeed[i].id}">
        ${newsFeed[i].title}  [${newsFeed[i].comments_count}]  
      </a>
    </li>`;

  a.addEventListener("click", function () {});

  //ul.appendChild(div.children[0]);
  ul.appendChild(div.firstElementChild);
}

container.appendChild(ul);
container.appendChild(content);
