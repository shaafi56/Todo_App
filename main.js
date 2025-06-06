const todoValue = document.getElementById("todoText"),
    listItems = document.getElementById("list-items"),
    AddUpdateClick = document.getElementById("addUpdateClick");
let updateText;
let todoData = JSON.parse(localStorage.getItem("todoData")); // we get the todoData from local storage, if it exists

todoValue.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        AddUpdateClick.click();
    }
});


//we create function to add todo item
function createTodoData(){ // this function is called when the user clicks on the add button
    
    if (todoValue.value === "") { 
        alert("Please enter a todo item.");
        todoValue.focus();
    }

    let li = document.createElement("li"); // create a new list item element
    // we create the inner HTML for the list item
    const TodoItems = `<div onclick="complateTodoItem(this)">${todoValue.value}</div><div> <img src="images/edit.svg" class="edit todo-controls" onclick="updateTodoItem(this)"> <img src="images/delete.svg" class="delete todo-controls" onclick="deleteTodoItem(this)"></div>`;
    li.innerHTML = TodoItems;
    listItems.appendChild(li);
    todoValue.value = "";

    // Save the todo item to local storage
    if (!todoData) {
        todoData = []; // if todoData is null, we initialize it as an empty array
    }
    let dataItem = { item: todoValue.value, status: false }; // we create an object to store the todo item and its status
    console.log(dataItem);
    todoData.push(dataItem);
    localStorage.setItem("todoData", JSON.stringify(todoData)); // we save the todoData to local storage

}

ReadTodoItems()
//we create function to read todo items
function ReadTodoItems() {
    console.log(todoData);
    //
    todoData.forEach((element) => { // we loop through the todoData array
        let li = document.createElement("li"); // create a new list item
        let style= "";
        if (element.status) {
            style = "style='text-decoration: line-through;'"; // if the item is completed, we add a line-through style
        }
        const TodoItems = `<div ${style} onclick="complateTodoItem(this)">${element.item}</div><div> <img src="images/edit.svg" class="edit todo-controls" onclick="updateTodoItem(this)"> <img src="images/delete.svg" class="delete todo-controls" onclick="deleteTodoItem(this)"></div>`; // we create the inner HTML for the list item
        li.innerHTML = TodoItems; // set the inner HTML of the list item
        listItems.appendChild(li); // append the list item to the list
    });
}

//we create function to delete todo item and edit todo item
function complateTodoItem(e) {
    if( e.parentElement.querySelector("div").style.textDecoration === "") {
        e.parentElement.querySelector("div").style.textDecoration = "line-through";
    }
    // if the todo item is already completed, we remove the line-through style
    todoData.forEach((element) => { // we loop through the todoData array
        if (e.parentElement.querySelector("div").innerText.trim() == element.item) { // check if the todo item matches the element in the todoData array
            element.status = true; // mark the item as completed
        }
    });
}

//update on selection todo item
function UpdateOnSelectTodoItem() {
    updateText.innerText = todoValue.value;
    AddUpdateClick.setAttribute("onclick", "complateTodoItem()");
    AddUpdateClick.setAttribute("src","images/add.svg");
    todoValue.value = "";
}

//we create function to update todo item 
function updateTodoItem(e) {
    if ( e.parentElement.parentElement.querySelector("div").style.textDecoration === ""){
        todoValue.value = e.parentElement.parentElement.querySelector("div").innerText;
        AddUpdateClick.setAttribute("onclick", "UpdateOnSelectTodoItem()");
        AddUpdateClick.setAttribute("src","images/refresh.svg");
        updateText = e.parentElement.parentElement.querySelector("div");
    }
}

//we create function to delete todo item
function deleteTodoItem(e) {
    let deleteValue = e.parentElement.parentElement.querySelector("div").innerText;
    if (confirm(`Are you sure you want to delete this ${deleteValue}!`)) {
        e.parentElement.parentElement.remove();
    }
}