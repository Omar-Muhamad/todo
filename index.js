const todo = {
  index: 1,
  description: 'asdfghj',
  isCompleted: false
}

// const todos = JSON.parse(localStorage.getItem('todos'))

// const filteredTodos = () => {

// }

localStorage.setItem('todos', JSON.stringify([todo]))

const renderTodos = () => {
  const todos = JSON.parse(localStorage.getItem('todos'));
  const todoList = document.getElementsByClassName('todo-list')[0]
  todoList.innerHTML = '';
  if (!todos.length) return;
  todos.sort((a, b) => (a.index - b.index)).forEach((todo) => {
    const checked = todo.completed;
    const item = `
      <li class="item" data-index=${todo.index}>
        <input  ${checked === true ? 'checked' : ''} type="checkbox" class="checkBox" data-index=${todo.index}>
        <p type="text" class="toDoText">${todo.description}</p>
        <button class="deleteBtn" data-index=${todo.index}><i class="far fa-trash-alt" ></i></button>
      </li>
    `;
    todoList.innerHTML += item;
  });
};

renderTodos()

// addTodo function

// toggleTodoStatus function

// deleteTodo function 

//  clearAllCompleted