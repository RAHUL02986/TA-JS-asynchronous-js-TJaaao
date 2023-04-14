let inputText = document.querySelector("#text");

let root = document.querySelector("ul");

const url = `https://basic-todo-api.vercel.app/api/`;

function handleToggle(id, status) {
  let data = {
    todo: {
      isCompleted: !status,
    },
  };
  fetch(url + `todo/${id}`, {
    method: "PUT", // *GET, POST, PUT, DELETE, etc.
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then(() => {
    displayTodos();
  });
}

function handleDelete(id) {
  fetch(url + `todo/${id}`, {
    method: "DELETE", // *GET, POST, PUT, DELETE, etc.
    headers: {
      "Content-Type": "application/json",
    },
  }).then(() => {
    displayTodos();
  });
}

function handleEdit(event, id) {
  let input = document.createElement("input");
  input.value = event.target.innerText;
  let p = event.target;
  let parent = event.target.parentElement;
  parent.replaceChild(input, p);
  input.addEventListener("keyup", () => {
    if (event.keyCode === 13 && event.target.value) {
      let data = {
        todo: {
          title: event.target.value,
        },
      };
      fetch(url + `todo/${id}`, {
        method: "PUT", // *GET, POST, PUT, DELETE, etc.
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }).then(() => {
        displayTodos();
      });
    }
  });
}

function createUI(data) {
  root.innerHTML = "";
  data.forEach((todo) => {
    let li = document.createElement("li");
    li.classList.add("flex");
    let div = document.createElement("div");
    div.classList.add("flex");
    div.classList.add("justify");
    let input = document.createElement("input");
    input.type = "checkbox";
    input.setAttribute("data-id", todo._id);
    input.checked = todo.isCompleted;
    input.addEventListener("click", handleToggle(todo._id, todo.isCompleted));
    let p = document.createElement("p");
    p.innerText = todo.title;
    p.addEventListener("dblclick", (event) => handleEdit(event, todo._id));
    let span = document.createElement("span");
    span.innerText = "X";
    span.setAttribute("data-id", todo._id);
    span.addEventListener("click", () => handleDelete(todo._id));
    div.append(input, p);
    li.append(div, span);
    root.append(li);
  });
}

function displayTodos() {
  fetch(url + "todo")
    .then((res) => res.json())
    .then((allTodos) => {
      createUI(allTodos.todos);
    });
}

function handleInput(event) {
  if (event.keyCode === 13 && event.target.value.trim()) {
    let data = {
      todo: {
        title: event.target.value,
        isCompleted: false,
      },
    };
    fetch(url + `todo`, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data), // body data type must match "Content-Type" header
    }).then(() => {
      event.target.value = "";
      displayTodos();
    });
  }
}

inputText.addEventListener("keyup", handleInput);
displayTodos();
