//Selectors --------------------------------------------------

const todoInput = document.querySelector(".input")
const addItemButton = document.querySelector(".add-button")
const todoList = document.querySelector(".ul-list-of-items")
const filterTodo = document.querySelector(".filter-list")
const pageBody = document.querySelector("body")


//ColorSelectors----------------------------------------------

const themeArrowDiv = document.querySelector(".arrow-container")
const themeArrow = document.querySelector(".arrow")

const colorBar = document.querySelector(".color-bar")

const allThemes = document.querySelectorAll(".themes")
const firstTheme = document.getElementById("first-theme")
const secondTheme = document.getElementById("second-theme")
const thirdTheme = document.getElementById("third-theme")
const fourthTheme = document.getElementById("fourth-theme")
const fifthTheme = document.getElementById("fifth-theme")


//EventListeners
document.addEventListener('DOMContentLoaded', getTodos);

addItemButton.addEventListener('click', todoButtonClick)
todoList.addEventListener('click', checkOffDelete)
filterTodo.addEventListener('click', filterTodos)
todoInput.addEventListener('click', removePlaceholder)

//ColorEventListeners

firstTheme.addEventListener('click', changeTheme)
secondTheme.addEventListener('click', changeTheme)
thirdTheme.addEventListener('click', changeTheme)
fourthTheme.addEventListener('click', changeTheme)
fifthTheme.addEventListener('click', changeTheme)

//Color Arrow Event Selectors

themeArrowDiv.addEventListener('click', toggleMenu)



//Functions --------------------------------------------------

//Add Item on Click + Button
function todoButtonClick(e) {
    e.preventDefault();

    let inputValueArray = todoInput.value.split(" ")
    let checkID = inputValueArray.join("-")
    

    //todo Div
    const newDiv = document.createElement('div')
    newDiv.classList.add("item-div")
    
    //Create list item
    const newLi = document.createElement("li");
    newLi.innerText = todoInput.value;
    newLi.classList.add("todo-item");
    newDiv.appendChild(newLi);

    //Add todo to local storage
    saveLocalTodos(todoInput.value)

    //add Check Button
    // const checkButton = document.createElement('input')
    // checkButton.classList.add('check-button')
    // checkButton.setAttribute("type", "checkbox");
    // checkButton.setAttribute("id", checkID)
    // const checkLabel = document.createElement('label')
    // checkLabel.setAttribute("for", checkID)
    
    // newDiv.insertBefore(checkLabel,newDiv.firstChild);
    // newDiv.insertBefore(checkButton,newDiv.firstChild);

    //TESTING CUSTOM CHECHBOX-------------
    const checkButton = document.createElement('div')
    checkButton.classList.add('check-button')
    checkButton.style.borderColor = window.getComputedStyle(pageBody).color;
    newDiv.insertBefore(checkButton,newDiv.firstChild);



    //END TESTING CHECK BOX --------------
    

    //add Trash Button
    const trashButton = document.createElement('div')
    trashButton.classList.add('trash-button')
    trashButton.innerText = "delete";
    newDiv.append(trashButton)

    todoList.appendChild(newDiv)
    todoInput.value="";

    //Change placeholder 
    let placeholders = ["add another~", "more more more!", "la la la la", "you are on a roll"]
    let randIndex = Math.floor(Math.random() * placeholders.length)
    todoInput.setAttribute("placeholder", placeholders[randIndex])


}


//Check Completed or Delete Item
function checkOffDelete(e) {
    const item = e.target;

    if(item.classList[0] === 'check-button'){
        item.parentNode.classList.toggle('item-completed');
        if(item.parentNode.classList.contains("item-completed")){
            item.style.backgroundColor = window.getComputedStyle(pageBody).color;
        }else{
            item.style.backgroundColor = "transparent"
            item.style.transition = "none";
        }
        
        
        
    }
    if(item.classList[0] === 'trash-button'){
        removeLocalTodos(item);
        item.parentNode.remove();
    }
}

//style input focus
function removePlaceholder(e) {
    e.target.removeAttribute("placeholder")
}

function addPlaceholder(e) {
    e.target.setAttribute("placeholder", "add list item...")
}


//filter Todos
function filterTodos(e) {
    let todos = todoList.childNodes;
    todos.forEach(function(todo){
    switch (e.target.value) {
            case "all":
                todo.style.display = "flex";
                break;
            case "completed":
                if (todo.classList.contains("item-completed")){
                    todo.style.display ="flex";
                } else {
                    todo.style.display="none";
                }
                break;
            case "uncompleted":
                if (!todo.classList.contains("item-completed")){
                    todo.style.display ="flex";
                } else {
                    todo.style.display="none";
                }
                break;
        }
    })
}

//change Theme

function changeTheme(e) {
    const themeBackgroundColor = window.getComputedStyle(e.target).backgroundColor
    const themeColor = window.getComputedStyle(e.target).color

    pageBody.style.transition = "ease 1s";
    pageBody.style.backgroundColor = themeBackgroundColor;
    pageBody.style.color = themeColor;
    todoInput.style.color = themeColor;
    todoInput.style.transition = "ease 1s";
    filterTodo.style.color = themeColor;
    filterTodo.style.transition = "ease 1s";
    allThemes.forEach(function(theme) {
        theme.style.borderColor = themeColor; })

    let todos = todoList.childNodes;
    todos.forEach(function(todo){
        let box = todo.querySelector(".check-button")
        box.style.borderColor = themeColor;
        box.style.transition = "ease 1s";

        if(todo.classList.contains("item-completed")){
            box.style.backgroundColor = themeColor;
        }
    })
    
}

//toggle Menu
function toggleMenu(e) {

    if(themeArrow.classList.contains("down")){
        colorBar.style.display="none";

    } else {
        colorBar.style.display="flex"
        
    }

    themeArrow.classList.toggle("down")
    themeArrow.classList.toggle("up")
}


//SAVE TO LOCAL STORAGE

// function checkLocalStorage(todos){
//     if(localStorage.getItem('todos') === null){
//         todos = [];
//     }else{
//         todos = JSON.parse(localStorage.getItem('todos'));
//     }
// }

function saveLocalTodos(todo) {
    //Check --- Do I already have todos?
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}

function getTodos(){
    //Check --- Do I already have todos?
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    //-------------------------------------FOR EACH STORED TODO
    todos.forEach(function(todo){
        //todo Div
    const newDiv = document.createElement('div')
    newDiv.classList.add("item-div")
    
    //Create list item
    const newLi = document.createElement("li");
    newLi.innerText = todo;
    newLi.classList.add("todo-item");
    newDiv.appendChild(newLi);


    //TESTING CUSTOM CHECHBOX-------------
    const checkButton = document.createElement('div')
    checkButton.classList.add('check-button')
    checkButton.style.borderColor = window.getComputedStyle(pageBody).color;
    newDiv.insertBefore(checkButton,newDiv.firstChild);



    //END TESTING CHECK BOX --------------
    

    //add Trash Button
    const trashButton = document.createElement('div')
    trashButton.classList.add('trash-button')
    trashButton.innerText = "delete";
    newDiv.append(trashButton)

    todoList.appendChild(newDiv)

    });

}

function removeLocalTodos(todo){
     let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    const todoIndex = todo.parentNode.childNodes[1].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem("todos", JSON.stringify(todos));
}
