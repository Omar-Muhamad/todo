const filteredTodos = (status = "", event) => {
  const filterList = document.querySelectorAll(".filter-list li");
  filterList.forEach((li) => {
    li.classList.remove("active");
  });
  const getActiveListItem = event.target;
  getActiveListItem.classList.add("active");

  const todos = JSON.parse(localStorage.getItem("todos"));
  let filteredTodo = todos.filter((element) => filterTodoBy(element, status));
  renderTodos(filteredTodo);
};

const filterTodoBy = (element, status) => {
  switch (status) {
    case "completed":
      return element.isCompleted;
      break;

    case "active":
      return !element.isCompleted;
      break;

    default:
      return element.isCompleted || !element.isCompleted;
      break;
  }
};

const renderTodos = (todos) => {
  const todoList = document.getElementsByClassName("todo-list")[0];
  todoList.innerHTML = "";
  if (!todos.length) return;
  todos
    // .sort((a, b) => a.index - b.index)
    .forEach((todo) => {
      const checked = todo.isCompleted;
      const item = `
      <li class="item flex justify-between w-full p-5  border-b-2 border-b-gray-900 cursor-pointer" draggable="true" data-index=${
        todo.index
      }>
        <input  ${
          checked === true ? "checked" : ""
        } type="checkbox" class="checkBox rounded-lg cursor-pointer" onchange="toggleTodoStatus(${
        todo.index
      })" data-index=${todo.index}>
        <p type="text" class="toDoText ${
          checked === true ? "line-through" : ""
        }  w-full ml-5">${todo.description}</p>
        <button class="deleteBtn" onclick="deleteTodo(${todo.index})" id=${
        todo.index
      }><i class="far fa-trash-alt" ></i></button>
      </li>
    `;
      todoList.innerHTML += item;
    });
  const itemsLeft = document.getElementsByClassName("items-left")[0];
  itemsLeft.innerHTML = `${todos.length} items left`;
};

// addTodo function

const addTodo = (todoElement) => {
  const todos = JSON.parse(localStorage.getItem("todos"));
  todos.push(todoElement);
  localStorage.setItem("todos", JSON.stringify(todos));
  renderTodos(todos);
};

// toggleTodoStatus function
const toggleTodoStatus = (todoIndex) => {
  const todos = JSON.parse(localStorage.getItem("todos"));
  todos.forEach((element) => {
    if (element.index === todoIndex) {
      element.isCompleted = !element.isCompleted;
    }
  });
  localStorage.setItem("todos", JSON.stringify(todos));
  renderTodos(todos);
};

// deleteTodo function
const deleteTodo = (todoIndex) => {
  const todos = JSON.parse(localStorage.getItem("todos"));
  const filteredTodos = todos.filter((element) => element.index !== todoIndex);
  localStorage.setItem("todos", JSON.stringify(filteredTodos));
  renderTodos(filteredTodos);
};

//  clearAllCompleted
const clearAllCompleted = () => {
  const todos = JSON.parse(localStorage.getItem("todos"));
  const filteredTodos = todos.filter((element) => !element.isCompleted);
  localStorage.setItem("todos", JSON.stringify(filteredTodos));
  renderTodos(filteredTodos);
};

const addTodoHandler = () => {
  const todoInput = document.getElementById("todo-input");
  if (todoInput.value.trim() === "") return;
  const newTodo = {
    index: new Date().getTime(),
    description: todoInput.value,
    isCompleted: false,
  };
  addTodo(newTodo);
  todoInput.value = "";
};
const clearCompletedHandler = () => {
  clearAllCompleted();
};

const main = () => {
  const todos =
    JSON.parse(localStorage.getItem("todos")) ||
    localStorage.setItem("todos", JSON.stringify([]));
  if (todos.length > 0) renderTodos(todos);
};
window.onload = main();
