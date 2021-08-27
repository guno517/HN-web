const ajax = new XMLHttpRequest();
ajax.open("GET", "https://api.hnpwa.com/v0/news/1.json", false); //true: 비동기적으로 가져온다 false: 동기적으로 수행한다
ajax.send();

console.log(ajax.response);
