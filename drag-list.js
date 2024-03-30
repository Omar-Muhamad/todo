let todoList;
let items;
let fromIndex;
const dragstart = (e) => {
  const draggableItem = e.target.closest("li");
  setTimeout(() => draggableItem.classList.add("draggable"), 0);
  fromIndex = e.target.dataset.index;
};
const dropEnd = (e) => {
  const draggableItem = e.target.closest("li");
  setTimeout(() => draggableItem.classList.remove("draggable"), 0);
};
const dropOver = (e) => {
  e.preventDefault();
};
const drop = (e) => {
  e.preventDefault();
  const todos =
    JSON.parse(localStorage.getItem("todos")) ||
    localStorage.setItem("todos", JSON.stringify([]));
  const draggableItem = document.querySelector(".draggable");
  const getElementsAfter = getElementAfter(e.clientY);
  let toIndex = e.target.closest("li").dataset.index;
  // Append dragged before the targetElement and set the localStorage, if The targetElement is the last one we will append dragged to be the last one
  if (getElementsAfter !== null) {
    todoList.insertBefore(draggableItem, getElementsAfter);
  } else {
    todoList.appendChild(draggableItem);
  }
  // Get Todos Index that referee to the object.index property in todos
  const getFromIndexInTodos = getSpecificIndex(todos, +fromIndex);
  const getToIndexInTodos = getSpecificIndex(todos, +toIndex);
  swapElementsInTodosLocalStorage(
    todos,
    getFromIndexInTodos,
    getToIndexInTodos
  );
};
const getElementAfter = (clientY) => {
  const siblings = [...document.querySelectorAll(".item:not(.draggable)")];
  console.log(siblings);
  return siblings.reduce(
    (closest, child) => {
      const box = child.getBoundingClientRect();
      const offset = clientY - box.top - box.height / 2;
      if (offset < 0 && offset > closest.offset) {
        return { offset: offset, element: child };
      } else {
        return closest;
      }
    },
    { offset: Number.NEGATIVE_INFINITY }
  ).element;
};
const getSpecificIndex = (todos, index) => {
  return todos.findIndex((element) => element.index === index);
};
const swapElementsInTodosLocalStorage = (todos, fromIndex, toIndex) => {
  const movedTodo = todos.splice(fromIndex, 1)[0];
  todos.splice(toIndex, 0, movedTodo);
  localStorage.setItem("todos", JSON.stringify(todos));
};

const dragAndDropListeners = () => {
  items = document.querySelectorAll(".item");
  todoList = document.querySelector(".todo-list");
  fromIndex;
  todoList.addEventListener("dragstart", dragstart);
  todoList.addEventListener("dragend", dropEnd);
  todoList.addEventListener("dragover", dropOver);
  todoList.addEventListener("drop", drop);
};
dragAndDropListeners();
