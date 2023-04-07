const input = document.querySelector('input');
const div = document.querySelector('div');
const url = `https://api.unsplash.com/photos/?client_id=AIfs8yky5d-47AfK6MrfZzbIbtJ-P7YpTl2UosseuBE`;
const getSearchUrl = (query) =>
  `https://api.unsplash.com/search/photos?query=${query}&client_id=AIfs8yky5d-47AfK6MrfZzbIbtJ-P7YpTl2UosseuBE`;

function fetch(url) {
  return new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.onload = () => resolve(JSON.parse(xhr.response));
    xhr.onerror = () => reject('somthing went wrong!');
    xhr.send();
  });
}
let data = fetch(`https://api.github.com/users/getify`);

function display(images) {
  console.log(images);
  div.innerHTML = '';
  images.forEach((image) => {
    let img = document.createElement('img');
    img.src = image.urls.thumb;
    div.append(img);
  });
}

fetch(url).then(display);

function handleSearch(event) {
  if (event.keyCode == 13 && input.value) {
    fetch(getSearchUrl(input.value))
      .then((search) => {
        display(search.results);
      })
      .catch((error) => console.error(error));

    input.value = '';
  }
}

input.addEventListener('keyup', handleSearch);
