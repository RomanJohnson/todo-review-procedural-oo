
// USING AN Immediately-Invoked Function Expression (IIFE)
const TaskList = (function() {
  currentItemId = 0
  return class TaskList { //this component is the manager or parent of all individual task instances; the TaskList has many Tasks
    constructor() { //constructor is run when we call new TaskList() in ooApp.js
      this.tasks = [] //initialize our TaskList with an empty array. this array will hold all Task object instances
      // this.currentItemId = 0// this is also valid
    }

    handleNewItem(newItemName, domLocation) { //we need to pass the <div> to append listItems to as an argument
      const newTask = new Task(newItemName, ++currentItemId) //create a new instance of our Task object
      this.tasks.push(newTask) //add this newly instantiated Task to our this.tasks array; TaskList has many Tasks and therefore needs some way of tracking all Task objects
      this.appendItemsToDom(domLocation) //this function will update what the user sees on the page
    }

    appendItemsToDom(domLocation) {
      const allTasksHtml = this.tasks.map(task => task.html).join('') //returns a large string of HTML, the logic for this is the same as the appendItemsToDom function from the procedural approach
      domLocation.innerHTML = allTasksHtml //update what's on the page
    }

    deleteItem(targetItem, domLocation) {
      const targetItemId = parseInt(targetItem.dataset.id) //grab the id of the target comment via the dataset property we set––same thing as the procedural approach
      this.tasks = this.tasks.filter(task => task.id !== targetItemId) //mutate this.tasks array by removing the target comment
      this.appendItemsToDom(domLocation) //update the content of the page
    }
  }
})() //we wrap TaskList class in a function in order to close over it and create a private currentItemId variable. Below I will show you several different ways to accomplish the same task


////////////////////////////////////////////////////////////////////////////////
// Using the pre-ES6 function; remember: the `class` keyword is syntactic sugar over this:
function TaskList() {//effectively our constructor function
  this.tasks = [] //array of all tasks
  this.currentItemId = 0 //this is another way to setup our id private variable without using a function to close over it
}

TaskList.prototype.handleNewItem = function(newItemName, domLocation) {
  const newTask = new Task(newItemName, ++this.currentItemId)
  this.tasks.push(newTask)
  this.appendItemsToDom(domLocation)
}

TaskList.prototype.appendItemsToDom = function(domLocation) {
  const allTasksHtml = this.tasks.map(task => task.html).join('')
  domLocation.innerHTML = allTasksHtml
}

TaskList.prototype.deleteItem = function(targetItem, domLocation) {
  const targetItemId = parseInt(targetItem.dataset.id)
  this.tasks = this.tasks.filter(task => task.id !== targetItemId)
  this.appendItemsToDom(domLocation)
}
