const todo = {
  index: 1,
  description: "asdfghj",
  isCompleted: false,
};

// const todos = JSON.parse(localStorage.getItem('todos'))

const filteredTodos = (status) => {
  const todos = JSON.parse(localStorage.getItem("todos"));
  let filteredTodo = todos.filter((element) => filterTodoBy(element, status));
  return filteredTodo;
};

const filterTodoBy = (element, status) => {
  switch (status) {
    case 'completed':
      return element.isCompleted;
      break;

    case 'active':
      return !element.isCompleted;
      break;

    default:
      return element.isCompleted || !element.isCompleted;
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

const addTodo = (todoElement) => {
  const todos = JSON.parse(localStorage.getItem("todos"));
  todos.push(todoElement);
  localStorage.setItem("todos", JSON.stringify(todos));
  renderTodos();
}

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
const deleteTodo = (todoElement) => {
  const todos = JSON.parse(localStorage.getItem("todos"));
  todos.filter(element => element.index === todoElement.index);
  localStorage.setItem("todos", JSON.stringify(todos));
  renderTodos();
}
//  clearAllCompleted
const clearAllCompleted = () => {
  const todos = JSON.parse(localStorage.getItem("todos"));
  todos.forEach((element) => {
    element.isCompleted = false;
  });
  localStorage.setItem("todos", JSON.stringify(todos));
  renderTodos();
};
