const ajax = new XMLHttpRequest();
const NEWS_URL = "https://api.hnpwa.com/v0/news/1.json"; // 해커 뉴스 news 1페이지

ajax.open("GET", NEWS_URL, false); //true: 비동기적으로 가져온다 false: 동기적으로 수행한다
ajax.send();

const newsFeed = JSON.parse(ajax.response); // 객체 -> json으로 변환

console.log(newsFeed);

const ul = document.createElement("ul");

for (let i = 0; i < 10; i++) {
  const li = document.createElement("li");
  li.innerHTML = newsFeed[i].title;
  ul.appendChild(li);
}

document.getElementById("root").appendChild(ul);
