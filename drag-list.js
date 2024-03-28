const items = document.querySelectorAll(".item");
const todoList = document.querySelector(".todo-list");
const todos =
  JSON.parse(localStorage.getItem("todos")) ||
  localStorage.setItem("todos", JSON.stringify([]));
// Add Draggable Class if the item is start dragging and remove it when end of drag
items.forEach((item) => {
  item.addEventListener("dragstart", () => {
    item.classList.add("draggable");
  });

  item.addEventListener("dragend", () => {
    item.classList.remove("draggable");
  });
});
// Put the dragged item in the specific place
todoList.addEventListener("dragover", (e) => {
  e.preventDefault();
  const draggableItem = document.querySelector(".draggable");
  const getElementsAfter = getElementAfter(e.clientY);
  const draggableIndex = todos.findIndex(
    (element) => element.index === +draggableItem.dataset.index
  );
  // Append dragged before the targetElement and set the localStorage, if The targetElement is the last one we will append dragged to be the last one
  if (getElementsAfter != null) {
    const getElementsAfterIndex = todos.findIndex(
      (element) => element.index === +getElementsAfter.dataset.index
    );

    todoList.insertBefore(draggableItem, getElementsAfter);
    if (draggableIndex !== -1 && getElementsAfterIndex !== -1) {
      //   [todos[getElementsAfterIndex], todos[draggableIndex]] = [
      //     todos[draggableIndex],
      //     todos[getElementsAfterIndex],
      //   ];

      const movedTodo = todos.splice(draggableIndex, 1)[0];
      todos.splice(getElementsAfterIndex, 0, movedTodo);
    }
  } else {
    todoList.appendChild(draggableItem);
    if (draggableIndex !== -1) {
      const movedTodo = todos.splice(draggableIndex, 1)[0];
      todos.push(movedTodo);
    }
  }
  localStorage.setItem("todos", JSON.stringify(todos));
});

const getElementAfter = (clientY) => {
  const siblings = [...document.querySelectorAll(".item:not(.draggable)")];
  return siblings.find((element) => {
    return clientY <= element.offsetTop + element.offsetHeight / 2;
  });
};
