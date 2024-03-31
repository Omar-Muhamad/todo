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
        "py-[14px]",
        "md:py-[22.5px]",
        "text-sm",
        "rounded-t-md",
        "border-b",
        "border-lGrayBlue",
        "cursor-pointer"
      );
      listItem.setAttribute("draggable", true);
      listItem.setAttribute("data-index", todo.index);

      const listItemContent = `
          <div class='flex items-center px-4'>
            <label class="w-full break-all flex items-center cursor-pointer ${
              checked ? "line-through text-lGrayBlue" : ""
            }  ">
            <input ${checked ? "checked" : ""} type="checkbox" id="${
        todo.index
      }" class="checkBox relative peer appearance-none  w-[24px] h-[20px] border border-lGrayBlue rounded-full bg-inherit checked:bg-gradient-to-r from-checkBoxFromColor to-checkBoxToColor hover:border-checkBoxFromColor checked:border-0 cursor-pointer" data-index=${
        todo.index
      }>
        <svg xmlns="http://www.w3.org/2000/svg" 
        class="absolute text-textLightInDark font-bold hidden peer-checked:block icon icon-tabler
         icon-tabler-check fill-" width="15" height="15" viewBox="0 0 15 24" 
        stroke-width="2.5" stroke="#fff" fill="none" stroke-linecap="round" stroke-linejoin="round">
          <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
          <path d="M5 12l5 5l10 -10" />
        </svg>
    
          
              <span class="w-full mx-3">${todo.description}</span>
            </label>
           
            <button class="deleteBtn md:hidden " id=${
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
{
  /* <i class="fa-solid fa-check fa-sm  ${
  checked ? "block" : "hidden"
} absolute  w-[24px] h-[24px] rounded-full  pointer-events-none font-bold text-center pt-2.5 "></i> */
}
