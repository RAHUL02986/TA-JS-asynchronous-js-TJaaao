const searchElm = document.querySelector("input");
const root = document.querySelector(".image");
const url = `https://api.unsplash.com/photos/?client_id=AIfs8yky5d-47AfK6MrfZzbIbtJ-P7YpTl2UosseuBE`;
const getSearchUrl = (query) => `https://api.unsplash.com/search/photos?query=${query}&client_id=AIfs8yky5d-47AfK6MrfZzbIbtJ-P7YpTl2UosseuBE`


function fetch(url, successHandler) {
  let xhr = new XMLHttpRequest();

  xhr.open("GET", url);

  xhr.onload = () => successHandler(JSON.parse(xhr.response));

  xhr.onerror = function () {
    console.error("Something went wrong");
  };

  xhr.send();
}

function display(images) {
  root.innerHTML = "";
  images.forEach((image) => {
    let li = document.createElement("li");
    let img = document.createElement("img");
    img.src = image.urls.thumb;
    li.append(img);
    root.append(li);
  });
}

fetch(url,display)

// fetch(url, function(images){
//   root.innerHTML = "";
//   images.forEach((image) =>{
//     let li = document.createElement("li");
//     let img = document.createElement("img");
//     img.src = image.urls.thumb;
//     li.append(img);
//     root.append(li);
//   })
// });

function handleSearch(event) {
  if (event.keyCode == 13 && searchElm.value) {
    fetch(getSearchUrl(searchElm.value), (searchResult)=>{
      display(searchResult.results)
    });
    input.value = "";
  }
}

searchElm.addEventListener("keydown", handleSearch);
