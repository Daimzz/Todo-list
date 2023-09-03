const input = document.querySelector("input");
const addButton = document.querySelector(".add-button");
const todosHtml = document.querySelector(".todos");
const emptyImage = document.querySelector(".empty-image");
let todosJson = JSON.parse(localStorage.getItem("todos")) || [];
const deleteAllButton = document.querySelector(".delete-all");
const filters = document.querySelectorAll(".filter");
let filter = "";

showTodos();

function createTodoElement(todo, index) {
  if (filter && filter !== todo.status) {
    return "";
  }
  let time = new Date().toLocaleDateString();
  let checked = todo.status === "completed" ? "checked" : "";
  return /* html */ `
     <li class="todo">
	  <div class="todo-data">
			<label for="${index}">
				<input id="${index}" onclick="updateStatus(this)" type="checkbox" ${checked}>
				<div class="todo-element">
					<span class="todo-name ${checked}">${todo.name}</span>
					
				</div>
			</label>
			<span class="todo-time">${time}</span>
  		</div>
       <button class="delete-btn" data-index="${index}" onclick="remove(this)"><i class="fa fa-times"></i></button>
     </li>
   `;
}

function showTodos() {
  if (todosJson.length === 0) {
    todosHtml.innerHTML = "";
  } else {
    todosHtml.innerHTML = todosJson.map(createTodoElement).join("");
    emptyImage.style.display = "none";
  }
}

function updateStatus(inputElement) {
  let todoName = document.querySelector(".todo-name");
  if (inputElement.checked) {
    todoName.classList.add("checked");
    todosJson[inputElement.id].status = "completed";
  } else {
    todoName.classList.remove("checked");
    todosJson[inputElement.id].status = "pending";
  }
  localStorage.setItem("todos", JSON.stringify(todosJson));
}

addButton.addEventListener("click", function () {
  let todo = input.value.trim();
  if (!todo) {
    return;
  }
  addTodo(todo);
});

function addTodo(todo) {
  input.value = "";

  todosJson.unshift({
    name: todo,
    status: "pending",
  });

  localStorage.setItem("todos", JSON.stringify(todosJson));
  showTodos();
}

function remove(deleteBtnElement) {
  let index = deleteBtnElement.dataset.index;
  todosJson.splice(index, 1);
  showTodos();
  localStorage.setItem("todos", JSON.stringify(todosJson));
}

filters.forEach(function (element) {
  element.addEventListener("click", function (e) {
    if (element.classList.contains("active")) {
      element.classList.remove("active");
      filter = "";
    } else {
      filters.forEach((tags) => {
        tags.classList.remove("active");
        element.classList.add("active");
        filter = element.dataset.filter;
      });
    }
    showTodos();
  });
});

deleteAllButton.addEventListener("click", function (e) {
  todosJson = [];
  localStorage.setItem("todos", JSON.stringify(todosJson));
  emptyImage.style.display = "block";
  showTodos();
});
