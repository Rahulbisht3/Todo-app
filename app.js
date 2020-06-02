//  SELECTORS
const INPUT = document.querySelector("#input");
const ADD_TO_DO = document.querySelector(".add-to-do");
const LIST = document.querySelector(".list");
const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle";
const FOOTER = document.querySelector(".footer");
const DOWN_OPTIONS = document.querySelector(".down-list");
const clear_Completed = document.querySelector(".Clear_completed");
const Down_arrow = document.querySelector(".fa-chevron-down");

// const
let count = 1;

// function ADD-TO-DO List
function add_to_do(todo) {
  // add todo to localstorage
  let k = 1;
  const Class = "incomplete";
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  if (todos.length > 0) {
    todos.forEach(function (todo) {
      // console.log(todo.id);
      if (todo.id > k) {
        k = todo.id;
      }
    });
  }
  console.log(k);
  let b = Date.now();
  console.log(b);
  const data = ` <li class="${Class}" id="${b}" name="${todo}">
    <i class="far fa-circle" id="${b}" job="complete"></i>
    <p><input type="text" class="todo_element" id="two" value="${todo}" readonly="true"  ondblclick="this.readOnly='';" onblur="this.readOnly='true';" /></p>
    <i class="fas fa-times" id="three" job="delete"></i>
  </li>`;
  const position = "beforeend";
  LIST.insertAdjacentHTML(position, data);
  saveLocalTodos(todo, Class, b);
  // count += 1;
  down();
  // changing display of footer to grid if todos has atlest one item
  FOOTER.style.display = "grid";
}

function change_del(e) {
  const item = e.target;
  if (item.classList[0] === "fas") {
    const todo = item.parentNode;
    removeLocalTodos(todo);
    item.parentNode.remove();
  }

  // Mark check
  const elementJob = item.attributes.job.value;
  if (elementJob == "complete") {
    item.classList.toggle(CHECK);
    item.classList.toggle(UNCHECK);
  }

  // change class name when clicked on circle
  const IdVal = item.attributes.id.value;
  // console.log(item.parentNode.attributes.name.value);
  const item_Name = item.parentNode.attributes.name.value;
  if (item.attributes.class.value === "far fa-check-circle") {
    let todos = JSON.parse(localStorage.todos);
    todos.forEach(function (todo) {
      if (todo.name === item_Name) {
        todo.Class_Name = "completed";
      }
    });

    localStorage.setItem("todos", JSON.stringify(todos));
  } else if (item.attributes.class.value === "far fa-circle") {
    let todos = JSON.parse(localStorage.todos);
    todos.forEach(function (todo) {
      if (todo.name === item_Name) {
        todo.Class_Name = "incomplete";
      }
    });

    localStorage.setItem("todos", JSON.stringify(todos));
  }

  if (item.classList[1] === "fa-check-circle") {
    //   text line through
    const s = item.parentNode;
    s.classList.remove("incomplete");
    s.classList.add("completed");
  }

  //   undo line through
  if (item.classList[1] === "fa-circle") {
    const s = item.parentNode;
    s.classList.remove("completed");
    s.classList.add("incomplete");
  }
  down();
}

function filtertodo(e) {
  //   const todos = LIST.childNodes;
  const set = e.target.classList.value;
  // console.log(set);
  if (set === "Completed") {
    var divsToHide = document.getElementsByClassName("incomplete");
    for (var i = 0; i < divsToHide.length; i++) {
      divsToHide[i].style.display = "none";
    }
    var divsToHide = document.getElementsByClassName("completed");
    for (var i = 0; i < divsToHide.length; i++) {
      divsToHide[i].style.display = "grid";
    }
  } else if (set === "Active") {
    var divsToHide = document.getElementsByClassName("completed");
    for (var i = 0; i < divsToHide.length; i++) {
      divsToHide[i].style.display = "none";
    }
    var divsToHide = document.getElementsByClassName("incomplete");
    for (var i = 0; i < divsToHide.length; i++) {
      divsToHide[i].style.display = "grid";
    }
  } else if (set === "All") {
    var divsToHide = document.getElementsByClassName("incomplete");
    for (var i = 0; i < divsToHide.length; i++) {
      divsToHide[i].style.display = "grid";
    }
    var divsToHide = document.getElementsByClassName("completed");
    for (var i = 0; i < divsToHide.length; i++) {
      divsToHide[i].style.display = "grid";
    }
  }
}

function down() {
  var nodesSameClass = document.getElementsByClassName("incomplete");
  const total = nodesSameClass.length;
  const p = document.querySelector(".left");
  p.innerText = `${total} items left`;
}

function saveLocalTodos(todo, Class, count) {
  let todos;
  // check array
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.push({ name: todo, Class_Name: Class, id: count });
  localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos() {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  // changing circle icon acc to its class when dom reloads the webpage
  todos.forEach(function (todo) {
    if (todo.Class_Name === "incomplete") {
      const data = ` <li class="${todo.Class_Name}" id="${todo.id}" name="${todo.name}">
    <i class="far fa-circle" id="${todo.id}" job="complete"></i>
   <p><input type="text" class="todo_element" id="two" value="${todo.name}" readonly="true"  ondblclick="this.readOnly='';" onblur="this.readOnly='true';"/></p>
    <i class="fas fa-times" id="three" job="delete"></i>
  </li>`;
      const position = "beforeend";
      LIST.insertAdjacentHTML(position, data);
    } else if (todo.Class_Name === "completed") {
      const data = ` <li class="${todo.Class_Name}" id="${todo.id}"  name="${todo.name}">
      <i class="far fa-check-circle" id="${todo.id}" job="complete"></i>
      <p><input type="text" class="todo_element" id="two" value="${todo.name}" readonly="true"  ondblclick="this.readOnly='';" onblur="this.readOnly='true';"/></p>
      <i class="fas fa-times" id="three" job="delete"></i>
    </li>`;
      const position = "beforeend";
      LIST.insertAdjacentHTML(position, data);
    }
  });
  down();
  // changing display of footer to none if todos is empty, or display to grid if there are atleast one item
  if (todos.length > 0) {
    FOOTER.style.display = "grid";
  } else if (todos.length < 1) {
    FOOTER.style.display = "none";
  }
  set_CompleteClear_Btn();
}

function removeLocalTodos(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  todos.forEach(function (data) {
    if (data.name === todo.attributes.name.value) {
      // console.log("true", data.name);
      todos.splice(todos.indexOf(data), 1);
    }
  });

  localStorage.setItem("todos", JSON.stringify(todos));
  // changing display of footer to none if todos is empty
  if (todos.length < 1) {
    FOOTER.style.display = "none";
  }
}

// clear all completed todo data
function clear_all_completed(e) {
  let Total_list_item = LIST.childElementCount;
  let k = 0;
  for (let i = 0; i < Total_list_item; i += 1) {
    if (LIST.children[i - k].classList.value === "completed") {
      LIST.children[i - k].remove();
      k += 1;
    }
  }

  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  let arr = [];
  k = 0;

  for (let i = 0; i < Total_list_item; i++) {
    if (todos[i - k].Class_Name === "completed") {
      todos.splice(todos.indexOf(todos[i - k]), 1);
      k += 1;
    }
  }

  localStorage.setItem("todos", JSON.stringify(todos));
  // changing display of footer to none if todos is empty
  if (todos.length < 1) {
    FOOTER.style.display = "none";
  }
  down();
}

function DOWN_ARROW() {
  // console.log(Down_arrow.id);
  if (Down_arrow.id === "not-select") {
    let todos;
    if (localStorage.getItem("todos") === null) {
      todos = [];
    } else {
      todos = JSON.parse(localStorage.getItem("todos"));
    }
    // consol
    let Total_list_item = todos.length;
    for (let i = 0; i < Total_list_item; i++) {
      LIST.children[i].classList = "completed";
      const a = LIST.children[i];
      a.children[0].classList.value = "far fa-check-circle";
    }

    for (let i = 0; i < Total_list_item; i++) {
      todos[i].Class_Name = "completed";
    }
    localStorage.setItem("todos", JSON.stringify(todos));
    Down_arrow.id = "select";
    down();
  } else if (Down_arrow.id === "select") {
    let todos;
    if (localStorage.getItem("todos") === null) {
      todos = [];
    } else {
      todos = JSON.parse(localStorage.getItem("todos"));
    }
    let Total_list_item = todos.length;
    for (let i = 0; i < Total_list_item; i++) {
      LIST.children[i].classList = "incomplete";
      const a = LIST.children[i];
      a.children[0].classList.value = "far fa-circle";
    }

    for (let i = 0; i < Total_list_item; i++) {
      todos[i].Class_Name = "incomplete";
    }
    localStorage.setItem("todos", JSON.stringify(todos));
    Down_arrow.id = "not-select";
    down();
  }
}

// function to set clear conpleted btn visible or hidden
function set_CompleteClear_Btn() {
  let count = 0;
  let total = 0;
  let Total_item = LIST.childElementCount;
  for (let i = 0; i < Total_item; i++) {
    if (LIST.children[i].classList.value === "incomplete") {
      count += 1;
    }
  }
  for (let i = 0; i < Total_item; i++) {
    if (LIST.children[i].classList.value === "completed") {
      total += 1;
      clear_Completed.style.visibility = "visible";
    }
  }
  if (count === Total_item) {
    clear_Completed.style.visibility = "hidden";
  }
  if (total > 0) {
    clear_Completed.style.visibility = "visible";
  }
}
// event listener
INPUT.addEventListener("keyup", function (event) {
  if (event.keyCode === 13) {
    const todo = INPUT.value;
    if (todo) {
      add_to_do(todo);
    }
    INPUT.value = "";
  }
});

LIST.addEventListener("click", change_del);
DOWN_OPTIONS.addEventListener("click", filtertodo);
document.addEventListener("DOMContentLoaded", getTodos);
clear_Completed.addEventListener("click", clear_all_completed);
Down_arrow.addEventListener("click", DOWN_ARROW);
document.addEventListener("keyup", function (e) {
  const item = e.target;
  if (event.keyCode === 13) {
    if (item.id === "two") {
      item.readOnly = true;
    }
  }
});

document.addEventListener("click", set_CompleteClear_Btn);
