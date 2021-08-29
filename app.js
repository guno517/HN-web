const container = document.getElementById("root");
const ajax = new XMLHttpRequest();
const content = document.createElement("div");
const NEWS_URL = "https://api.hnpwa.com/v0/news/1.json"; // 해커 뉴스 news 1페이지
const CONTENT_URL = "https://api.hnpwa.com/v0/item/@id.json"; // @id를 통해 뉴스 기사 고유의 id를 파악해 해당 뉴스 기사의 json을 가져온다

ajax.open("GET", NEWS_URL, false); //true: 비동기적으로 가져온다 false: 동기적으로 수행한다
ajax.send();

const newsFeed = JSON.parse(ajax.response); // 객체 -> json으로 변환

console.log(newsFeed);

const ul = document.createElement("ul");

window.addEventListener("hashchange", function () {
  // 제목을 클릭 할 때마다 해시 값이 바껴 haschange 함수가 호출된다.
  const id = location.hash.substr(1); //주소와 관련된 정보 제공, substr: () 안의 값 이후부터 끝가지 문자열 출력
  ajax.open("GET", CONTENT_URL.replace("@id", id), false); // CONTENT_URL에 있는 @id -> id로 변환
  ajax.send();

  const newsContent = JSON.parse(ajax.response);
  const title = document.createElement("h1");

  title.innerHTML = newsContent.title;
  content.appendChild(title);
  console.log(newsContent);
});

for (let i = 0; i < 10; i++) {
  const li = document.createElement("li");
  const a = document.createElement("a");

  a.href = `#${newsFeed[i].id}`;
  // a.innerHTML = newsFeed[i].title + " [" + newsFeed[i].comments_count + "]";
  a.innerHTML = `${newsFeed[i].title}  [${newsFeed[i].comments_count}]`;
  //   newsFeed[i].comments_count;

  a.addEventListener("click", function () {});
  li.appendChild(a);
  ul.appendChild(li);
}

container.appendChild(ul);
container.appendChild(content);
