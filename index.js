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

const toggleDarkMode = (darkModeToggleButton) => {
  const isDarkMode = document.documentElement.classList.contains("dark");
  const toggleDark = document.querySelector(".toggle-dark");
  const toggleLight = document.querySelector(".toggle-light");
  if (isDarkMode) {
    document.documentElement.classList.remove("dark");
    toggleDark.classList.add("hidden");
    toggleLight.classList.remove("hidden");
    localStorage.setItem("darkMode", "false");
  } else {
    document.documentElement.classList.add("dark");
    toggleLight.classList.add("hidden");
    toggleDark.classList.remove("hidden");
    localStorage.setItem("darkMode", "true");
  }
};

const darkModeToggleButton = document.querySelector(".dark-mode-toggle");
darkModeToggleButton.addEventListener("click", () =>
  toggleDarkMode(darkModeToggleButton)
);

// Check if dark mode is enabled from previous session
if (localStorage.getItem("darkMode") === "true") {
  toggleDarkMode();
}

const main = () => {
  const todos =
    JSON.parse(localStorage.getItem("todos")) ||
    localStorage.setItem("todos", JSON.stringify([]));
  localStorage.setItem("darkMode", "true");

  if (todos?.length > 0) renderTodos(todos);
  dragAndDropListeners();
};
window.onload = main();
