const todo = {
  index: 1,
  description: "asdfghj",
  isCompleted: false,
};

// const todos = JSON.parse(localStorage.getItem('todos'))

const filteredTodos = (index) => {
  const todos = JSON.parse(localStorage.getItem("todos"));
  let filteredTodo = todos.filter((element) => filterTodoBy(element, index));
  return filteredTodo;
};
const filterTodoBy = (element, index) => {
  switch (index) {
    case 0:
      return element.isCompleted;
      break;

    case 1:
      return !element.isCompleted;
      break;

    default:
      return element.isCompleted || ~element.isCompleted;
      break;
  }
};

localStorage.setItem("todos", JSON.stringify([todo]));

const renderTodos = () => {
  const todos = JSON.parse(localStorage.getItem("todos"));
  const todoList = document.getElementsByClassName("todo-list")[0];
  todoList.innerHTML = "";
  if (!todos.length) return;
  todos
    .sort((a, b) => a.index - b.index)
    .forEach((todo) => {
      const checked = todo.isCompleted;
      const item = `
      <li class="item" data-index=${todo.index}>
        <input  ${
          checked === true ? "checked" : ""
        } type="checkbox" class="checkBox" data-index=${todo.index}>
        <p type="text" class="toDoText">${todo.description}</p>
        <button class="deleteBtn" data-index=${
          todo.index
        }><i class="far fa-trash-alt" ></i></button>
      </li>
    `;
      todoList.innerHTML += item;
    });
};

renderTodos();

// addTodo function

// toggleTodoStatus function
const toggleTodoStatus = (todoElement) => {
  const todos = JSON.parse(localStorage.getItem("todos"));
  todos.forEach((element) => {
    if (element.index === todoElement.index) {
      element.isCompleted = !element.isCompleted;
    }
  });
  localStorage.setItem("todos", JSON.stringify(todos));
  renderTodos();
};

// deleteTodo function

//  clearAllCompleted
const clearAllCompleted = () => {
  const todos = JSON.parse(localStorage.getItem("todos"));
  todos.forEach((element) => {
    element.isCompleted = false;
  });
  localStorage.setItem("todos", JSON.stringify(todos));
  renderTodos();
};
