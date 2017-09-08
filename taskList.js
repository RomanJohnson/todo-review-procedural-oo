const TaskList = (function() {
  currentItemId = 0
  return class TaskList { //this component is the manager or parent of all individual task instances; the TaskList has many Tasks
    constructor() { //constructor is run when we call new TaskList() in ooApp.js
      this.tasks = [] //initialize our TaskList with an empty array. this array will hold all Task object instances
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

    deleteItem(itemToDelete, domLocation) {
      const itemToDeleteId = parseInt(itemToDelete.dataset.id)
      this.tasks = this.tasks.filter(task => task.id !== itemToDeleteId)
      this.appendItemsToDom(domLocation)
    }
  }
})() //we wrap TaskList class in a function in order to close over it and create a private currentItemId variable. Below I will show you several different ways to accomplish the same task
