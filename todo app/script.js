const todosWrapper = document.querySelector(".todos__wrapper");
const todoForm = document.querySelector(".todo__add__form form");
const todoInput = document.querySelector(".todo__add__form form .todo__input");
const editModal = document.querySelector(".edit__modal");
const todoEditForm = document.querySelector(".edit__modal form");
const todoEditInput = document.querySelector(
  ".edit__modal form .edit__todo__input"
);

const state = [];
todoForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const todoText = keepOnlyPlainTodoText(todoInput.value.trim());
  todoInput.value = "";
  event.preventDefault();
  if (!todoText) {
    alert("Biron bir qiymat kiriting!!!");
    return;
  }

  addTodoToState(todoText);
});

todoEditForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const todoText = keepOnlyPlainTodoText(todoEditInput.value.trim());
  const todoId = +todoEditInput.dataset.todoId;
  todoInput.value = "";
  event.preventDefault();
  if (!todoText) {
    alert("Tog'ri qiymat kiriting!!!");
    return;
  }

  updateEditedTodo(todoText, todoId);
});
const addTodoToState = (todoText) => {
  const newTodo = {
    text: todoText,
    completed: false,
    id: makeID(state),
  };

  state.push(newTodo);
  drawUIByState();
};
const updateEditedTodo = (todoText, todoId) => {
  const todoIndex = state.findIndex((elem) => elem.id === todoId);
  state[todoIndex].text = todoText;
  drawUIByState();
  hideEditModal();
};

const deleteTodo = (id) => {
  const idx = state.findIndex((todo) => todo.id === id);
  state.splice(idx, 1);
  drawUIByState();
};

const editTodo = (id) => {
  const todo = state.find((elem) => elem.id === id);
  showEditModal(todo.text, id);
};

const drawUIByState = () => {
  let todosHTML = "";
  state.forEach((todo, index) => {
    let oneTodoHTML = makeOneTodoHtmlContent(todo, index + 1);
    todosHTML += oneTodoHTML;
  });

  todosWrapper.innerHTML = todosHTML;
};

const showEditModal = (todoText, todoId) => {
  editModal.style.display = "flex";
  todoEditInput.value = todoText;
  todoEditInput.dataset.todoId = todoId;
};

const hideEditModal = () => {
  editModal.style.display = "none";
  todoEditInput.value = "";
  delete todoEditInput.dataset.todoId;
};
const makeID = (state) => {
  if (!state.length) return 1;

  return state[state.length - 1].id + 1;
};

const keepOnlyPlainTodoText = (inputTodoText) => {
  const safeInputTodoText = filterXSS(inputTodoText, {
    whiteList: [],
    stripIgnoreTag: true,
    stripIgnoreTagBody: ["script"], 
  });

  return safeInputTodoText;
};


document.querySelector(".iconv").onclick  =  function myFunction()  {
  document.querySelector(".edit__modal").style.display="none";
  return ;
};

const makeOneTodoHtmlContent = (todo, todoNumber) => {
  const safeTodoText = keepOnlyPlainTodoText(todo.text);
  const todoContent = `<div class="one__todo__wrapper ">
    <div class="one__todo__content">
      <h3 id="h3">${todoNumber}. ${safeTodoText}</h3>
    </div>
    <div class="one__todo__actions">
      <button class="button__edit" onclick="editTodo(${todo.id})"><i class="fa-solid fa-pen-to-square"></i></button>
      <button class="button__delete" onclick="deleteTodo(${todo.id})"> <i class="fa fa-trash-o delete"></i></button>
    </div>
  </div>`;
  
  return todoContent;
};
