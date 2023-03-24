class Task {
  constructor(title) {
    this.title = title;
    this.completed = false;
    this.dueDate = null;
    this.priority = "none";
  }

  // Method to convert the task to a JSON-compatible object
  toJSON() {
    return {
      title: this.title,
      completed: this.completed,
      dueDate: this.dueDate,
      priority: this.priority,
    };
  }

  // Method to create a Task instance from a JSON-compatible object
  static fromJSON(jsonObj) {
    const task = new Task(jsonObj.title);
    task.completed = jsonObj.completed;
    task.dueDate = jsonObj.dueDate;
    task.priority = jsonObj.priority;
    return task;
  }
}

export default Task;
