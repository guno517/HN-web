const container = document.getElementById("root");
const ajax = new XMLHttpRequest();
const content = document.createElement("div");
const NEWS_URL = "https://api.hnpwa.com/v0/news/1.json"; // 해커 뉴스 news 1페이지
const CONTENT_URL = "https://api.hnpwa.com/v0/item/@id.json"; // @id를 통해 뉴스 기사 고유의 id를 파악해 해당 뉴스 기사의 json을 가져온다
const store = {
  currentPage: 1,
};

function getData(url) {
  // 데이터를 가져오는 함수 생성
  ajax.open("GET", url, false);
  ajax.send();

  return JSON.parse(ajax.response);
}

function newsFeed() {
  const newsFeed = getData(NEWS_URL);
  const newsList = [];
  let template = `
    <div class="container mx-auto p-4">
        <h1>Hacker News</h1>
        <ul>
            {{__news_feed__}}
        </ul>
        <div>
            <a href="#/page/{{__prev_page__}}">이전 페이지</a>
            <a href="#/page/{{__next_page__}}">다음 페이지</a>
        </div>
    </div>
  `;

  for (let i = (store.currentPage - 1) * 10; i < store.currentPage * 10; i++) {
    newsList.push(`<li><a href = "#/show/${newsFeed[i].id}">
        ${newsFeed[i].title}  [${newsFeed[i].comments_count}]  
      </a>
    </li>
    `);
  }

  template = template.replace("{{__news_feed__}}", newsList.join(""));
  template = template.replace(
    "{{__prev_page__}}",
    store.currentPage > 1 ? store.currentPage - 1 : 1
  );
  template = template.replace("{{__next_page__}}", store.currentPage + 1);

  container.innerHTML = template;
}

const ul = document.createElement("ul");

function newsDetail() {
  // 제목을 클릭 할 때마다 해시 값이 바껴 haschange 함수가 호출된다. -> 내용 화면으로 진입하는 시점(hashchange)
  const id = location.hash.substr(7); //주소와 관련된 정보 제공, substr: () 안의 값 이후부터 끝가지 문자열 출력
  const newsContent = getData(CONTENT_URL.replace("@id", id));

  container.innerHTML = `
      <h1>${newsContent.title}</h1>
  
      <div>
          <A href="#/page/${store.currentPage}">목록으로</a>
      </div>
    `;
}

function router() {
  //location.hash를 통해 지금 보고있는 화면의 위치 해시값을 받아 목록을 보여줄지 내용을 보여줄지 정한다.
  const routePath = location.hash;

  if (routePath === "") {
    newsFeed(); //routePath 값에 #만 있는 경우 빈 문자열을 출력한다.
  } else if (routePath.indexOf("#/page/") >= 0) {
    store.currentPage = Number(routePath.substr(7));
    newsFeed();
  } else {
    newsDetail();
  }
}

window.addEventListener("hashchange", router); //hash값을 받아 알맞는 라우터를 찾고 보여줄 화면을 지정한다

router();
