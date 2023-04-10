const ul = document.querySelector("ul");
const select = document.querySelector("select");
let allNews = [];

const url = `https://api.spaceflightnewsapi.net/v3/articles?_limit=30`;

function displayData(datas = []) {
  ul.innerHTML = "";
  datas.forEach((data) => {
    let li = document.createElement("li");
    li.classList.add("flex");
    let img = document.createElement("img");
    img.src = data.imageUrl;
    img.alt = data.id;
    let div = document.createElement("div");
    div.classList.add("margin")
    let h4 = document.createElement("h4");
    h4.innerText = data.newsSite;
    let p = document.createElement("p");
    p.innerText = data.title;
    let button = document.createElement("button");
    let a = document.createElement("a");
    a.href = data.url;
    a.innerText = "Read More";
    button.append(a);
    div.append(h4, p, button);
    li.append(img, div);
    ul.append(li);
  });
}

function displayOptions(source) {
  source.forEach((s) => {
    let option = document.createElement("option");
    option.innerText = s;
    option.value = s;
    select.append(option);
  });
}

fetch(url)
  .then((res) => res.json())
  .then((news) => {
    allNews = news;
    displayData(news);
    let allSources = Array.from(new Set(news.map((n) => n.newsSite)));
    displayOptions(allSources);
  });

select.addEventListener("change", (event) => {
  let source = event.target.value.trim();
  let filterNews;
  if (source) {
    filterNews = allNews.filter((news) => news.newsSite === source);
  } else {
    filterNews = allNews;
  }

  displayData(filterNews);
});