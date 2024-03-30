import renderTodos from "./todoRendering.js";
import { addTodo, clearAllCompleted } from "./todoUtils.js";

const addTodoHandler = (e) => {
  const todoInput = e.target;
  if (e.key === "Enter") {
    if (todoInput.value.trim() === "") return;
    const newTodo = {
      index: new Date().getTime(),
      description: todoInput.value,
      isCompleted: false,
    };
    addTodo(newTodo);
    todoInput.value = "";
  }
};
const clearCompletedHandler = () => {
  clearAllCompleted();
};
const filteredTodosHandler = (status = "", event) => {
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

export { addTodoHandler, clearCompletedHandler, filteredTodosHandler };
