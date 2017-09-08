document.addEventListener('DOMContentLoaded', () => {
  console.log('LOADED') //verify HTML and JS files are communicating properly

  //initialize app
  const taskList = new TaskList() //initialize app by creating a new instance of TaskList; this is the parent component for the individual Task item

//ooApp.js is like our runfile; it has the same code that we found at the top of index.js in procedural
  //grab DOM elements
  const newItemForm = document.getElementById("new-item-form") //<form>
  const newItemInput = document.getElementById("new-item-name") //<input> field; where user text will go
  const todoLists = document.getElementById("todo-lists") // <div> where we want to append comments

  // attach our event listeners
  newItemForm.addEventListener("submit", () => {
    event.preventDefault() //stop that POST request
    taskList.handleNewItem(newItemInput.value, todoLists) //call the handleNewItem defined on taskClass and pass in the necessary arguments
    event.target.reset() //like before, we are resetting the form
  }) //listen for and handle form submit

  todoLists.addEventListener("click", () => {
    if (event.target.className === "delete") {
      taskList.deleteItem(event.target.parentElement, todoLists) //we pass in the parent <li> that wraps the delete button like the procedural delete function AND the dom location as we will need to re-render the page after deletion
    }
  }) //listen for clicks on the <div> that contains all items

})
