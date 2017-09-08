class Task { //this class object is responsible for a SINGLE instance of a task; it does not need to know about other instances of Task. That responsibility is delegated to the taskList class defined in another file. We try to keep components as small as possible and give them the lease amount of responsibility
  constructor(newItemName, id) { //same functionality as createItem() from procedural approach
    this.id = id //`this` refers to a single isntance of this Task class object
    this.html = `<li data-id="${this.id}">${newItemName}<button class="delete">X</button></li>`
  }
}
