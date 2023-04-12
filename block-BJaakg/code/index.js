const ul = document.querySelector("ul");
let modalWindow = document.querySelector(".form");
let modalClose = document.querySelector(".close");
let list = document.querySelector(".list");
const url = `https://www.anapioficeandfire.com/api/books`;
let isLoading = false;

function handleSpinner(root, status = false) {
  if (status) {
    root.innerHTML = `<div class="spinner"><div class="donut"></div></div>`;
  }
}

function displayChar(char) {
  handleSpinner(list, true);
  Promise.all(char.map((c) => fetch(c).then((res) => res.json()))).then(
    (cData) => {
      list.innerHTML = "";
      cData.forEach((ch) => {
        let li = document.createElement("li");
        li.classList.add("charList");
        li.innerText = `${ch.name} : (${ch.aliases.join("")})`;
        list.append(li);
      });
    }
  );
}

function displayData(datas = []) {
  ul.innerHTML = "";
  datas.forEach((data) => {
    let li = document.createElement("li");
    li.classList.add("mainChar");
    li.classList.add("flex");
    let h2 = document.createElement("h2");
    h2.innerText = data.name;
    let p = document.createElement("p");
    p.innerText = data.authors.join(" ");
    let h4 = document.createElement("h4");
    h4.innerText = `Number of Pages: ${data.numberOfPages}`;
    let h5 = document.createElement("h5");
    h5.innerText = `Publisher: ${data.publisher}`;
    let h6 = document.createElement("h6");
    h6.innerText = `Country: ${data.country}, Released: ${data.released}`;
    let button = document.createElement("button");
    let a = document.createElement("a");
    a.innerText = `Show Characters (${data.characters.length})`;
    button.append(a);
    button.addEventListener("click", () => {
      modalWindow.style.display = "block";
      displayChar(data.characters);
      modalWindow.querySelector(".close").addEventListener("click", () => {
        modalWindow.style.display = "none";
      });
    });
    li.append(h2, p, h4, h5, h6, button);
    ul.append(li);
  });
}

function init() {
  handleSpinner(ul, true);
  fetch(url)
    .then((res) => res.json())
    .then((char) => {
      displayData(char);
    })
    .finally(() => handleSpinner(ul));
}

init();
