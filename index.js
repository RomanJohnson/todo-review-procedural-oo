document.addEventListener("DOMContentLoaded", () => { //wait for HTML content to load
  console.log("loaded") //confirm that our HTML and JS files know about each other

  //grab DOM elements
  const newItemForm = document.getElementById("new-item-form") //<form>
  const newItemInput = document.getElementById("new-item-name") //<input> field; where user text will go
  const todoLists = document.getElementById("todo-lists") // <div> where we want to append comments

  // attach our event listeners
  newItemForm.addEventListener("submit", handleNewItem) //listen for and handle form submit
  todoLists.addEventListener("click", deleteItem) //listen for clicks on the <div> that contains all items

  // define and scaffold our functions
  let allListItems = []
  let itemIds = 0 //ids make it easier to keep track of list items for the delete function later

  // define event handlers
  function handleNewItem() { //our event handler that is called whenever user submits form; it calls other 'helper functions'
    event.preventDefault() //stop form from making POST request
    const newTodoItem = newItemInput.value //grab whatever text the user typed
    allListItems.push(createItem(newTodoItem)) //return an object, and push that to allListItems arr
    appendItemsToDom() // generate a large string of HTML of all list items and append this content to the DOM
    this.reset() //this refers to the form element that the listener is attached to: <form></form>. Therefore, this.reset() will reset the form to it's original state, clearing the input field
  }

  function createItem(newItemName) { //returns an object with an id and string of HTML
    return {
      id: ++itemIds,
      html: `<li data-id="${itemIds}">${newItemName}<button class="delete">X</button></li>`
    }
    //increment itemIds so we can uniquely identify each item
    //add class delete so we can verify a delete button was clicked
    //store data in an object so we can easily access id
  }

  function appendItemsToDom() { //domLocation is the <div> that contains all list items
    const allItemsHtml = allListItems.map(item => item.html).join('') //allListItems is [{id: 1, html: ''}] so we iterate over the array of objects and just grab the html and .join('') it into a large string
    todoLists.innerHTML = `<ul>${allItemsHtml}</ul>`
  }

  function deleteItem() {
    if (event.target.className === "delete") { //we are listening for ALL clicks; verify the user clicked the delete button
      const itemIdToDelete = parseInt(event.target.parentElement.dataset.id)
      /* event is the HTML element that received the click action. Since we are only dealing with clicks on the delete button, event is that button within the if statement. The parentElement is the <li> that wraps it: `<li data-id="${itemIds}">${newItemName}<button class="delete">X</button></li>` the button is NESTED within the <li>, therefore parentElement is that parent <li>. We cast (convert) the id to an integer so we can check it against the id stored on each item object */

      allListItems = allListItems.filter(item => item.id !== itemIdToDelete) //mutate allListItems so everything EXCEPT the deleted element is in the array
      appendItemsToDom() //re render the list
    }
  }
})
