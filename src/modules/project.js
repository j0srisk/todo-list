import Task from './task';

class Project {
    constructor(title) {
        this.title = title;
        this.tasks = [];
    }

    addTask(task) {
        this.tasks.push(task);
    }

    // Method to convert the project to a JSON-compatible object
    toJSON() {
        return {
            title: this.title,
            tasks: this.tasks.map((task) => task.toJSON()),
        };
    }

    // Method to create a Project instance from a JSON-compatible object
    static fromJSON(jsonObj) {
        const project = new Project(jsonObj.title);
        project.tasks = jsonObj.tasks.map(Task.fromJSON);
        return project;
    }
}

export default Project;
