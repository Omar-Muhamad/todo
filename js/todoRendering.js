import { deleteTodo, toggleTodoStatus } from "./todoUtils.js";

const renderTodos = (todos) => {
  const todoList = document.getElementsByClassName("todo-list")[0];
  todoList.innerHTML = "";
  todos
    // .sort((a, b) => a.index - b.index)
    .forEach((todo) => {
      const checked = todo.isCompleted;
      const listItem = document.createElement("li");
      listItem.classList.add(
        "item",
        "w-full",
        "bg-listBgColor",
        "py-4",
        "text-sm",
        "rounded-t-md",
        "border-b",
        "border-lGrayBlue",
        "cursor-pointer"
      );
      listItem.setAttribute("draggable", true);
      listItem.setAttribute("data-index", todo.index);

      const listItemContent = `
          <div class='flex px-4'>
            <input ${
              checked ? "checked" : ""
            } type="checkbox" class="checkBox cursor-pointer" data-index=${
        todo.index
      }>
            <p type="text" class="toDoText ${
              checked ? "line-through" : ""
            } w-full ml-5">${todo.description}</p>
            <button class="deleteBtn" id=${
              todo.index
            }><i class="fa-solid fa-x text-lGrayBlue"></i></button>
          </div>
        `;
      listItem.innerHTML = listItemContent;

      // Add event listener to checkbox
      const checkbox = listItem.querySelector(".checkBox");
      checkbox.addEventListener("change", () => {
        toggleTodoStatus(todo.index);
      });

      // Add event listener to delete button
      const deleteBtn = listItem.querySelector(".deleteBtn");
      deleteBtn.addEventListener("click", () => {
        deleteTodo(todo.index);
      });

      todoList.appendChild(listItem);
    });
  const itemsLeft = document.getElementsByClassName("items-left")[0];
  itemsLeft.innerHTML = `${todos?.length} items left`;
};
export default renderTodos;
