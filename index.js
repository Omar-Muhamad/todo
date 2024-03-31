import dragAndDropListeners from "./js/dragger.js";
import {
  addTodoHandler,
  clearCompletedHandler,
  filteredTodosHandler,
} from "./js/todoHandlers.js";
import renderTodos from "./js/todoRendering.js";

const filterListItems = document.querySelectorAll(".filter-list li");
filterListItems.forEach((item) => {
  item.addEventListener("click", function (e) {
    const status = this.getAttribute("data-status");
    filteredTodosHandler(status, e);
  });
});
const todoInput = document.getElementById("todo-input");
todoInput.addEventListener("keydown", addTodoHandler);

const clearBtn = document.getElementById("clear-completed-btn");
clearBtn.addEventListener("click", clearCompletedHandler);

const main = () => {
  const todos =
    JSON.parse(localStorage.getItem("todos")) ||
    localStorage.setItem("todos", JSON.stringify([]));
  if (todos?.length > 0) renderTodos(todos);
  dragAndDropListeners();
};
window.onload = main();
