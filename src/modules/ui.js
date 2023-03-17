const UI = (() => {

    const projectList = document.querySelector('.project-list');
    const todoList = document.querySelector('.todo-list');

    function createProjectElement(project) {
        const projectElement = document.createElement('li');
        projectElement.classList.add('project-item');

        const projectTitle = document.createElement('span');
        projectTitle.classList.add('project-title');
        projectTitle.textContent = project.title;

        projectElement.appendChild(projectTitle);
        
        projectElement.addEventListener('click', (event) => {
            renderTasks(project);
        });

        return projectElement;
    }

    function createTaskElement(task) {
        const taskElement = document.createElement('li');
        taskElement.classList.add('task-item');

        const taskTitle = document.createElement('span');
        taskTitle.classList.add('task-title');
        taskTitle.textContent = task.title;

        taskElement.appendChild(taskTitle);

        return taskElement;
    }

    function renderProjects(projects) {
        projectList.innerHTML = '';

        projects.forEach((project, index) => {
            const projectElement = createProjectElement(project);
            //projectElement.dataset.index = index;
            projectList.appendChild(projectElement);
        });
    }
    
    function renderTasks(project) {
        todoList.innerHTML = '';

        const projectTitleText = document.querySelector('#activeProjectTitle');
        projectTitleText.textContent = project.title;

        project.tasks.forEach((task) => {
            const taskElement = createTaskElement(task);
            todoList.appendChild(taskElement);
        });
    }

    return {
        renderProjects,
        renderTasks,
    };

})();

export default UI;