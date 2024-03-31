import renderTodos from "./todoRendering.js";
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
export { addTodo, toggleTodoStatus, deleteTodo, clearAllCompleted };
