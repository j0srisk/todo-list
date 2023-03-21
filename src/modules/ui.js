import { updateActiveProject } from '../index.js';

const UI = (() => {

    const projectList = document.querySelector('.project-list');
    const todoList = document.querySelector('.todo-list');

    document.getElementById('addProjectBtn').addEventListener('click', function() {
        document.getElementById('addProjectBtn').style.display = 'none';
        document.getElementById('addProjectContainer').style.display = 'block';
        document.getElementById('newProjectInput').focus();
    });

    document.getElementById('newProjectInput').addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
          event.preventDefault();
          document.getElementById('saveProjectBtn').click();
        }
      });
  
    document.getElementById('cancelProjectBtn').addEventListener('click', function() {
        document.getElementById('addProjectBtn').style.display = 'block';
        document.getElementById('addProjectContainer').style.display = 'none';
        document.getElementById('newProjectInput').value = '';
    });

    document.getElementById('saveProjectBtn').addEventListener('click', function() {
        document.getElementById('addProjectBtn').style.display = 'block';
        document.getElementById('addProjectContainer').style.display = 'none';

    });

    function createProjectElement(project) {
        const projectElement = document.createElement('li');
        projectElement.classList.add('project-item');
      
        const projectTitle = document.createElement('span');
        projectTitle.classList.add('project-title');
        projectTitle.textContent = project.title;
      
        projectElement.appendChild(projectTitle);
      
        document.getElementById('newProjectInput').value = '';
        
        projectElement.addEventListener('click', (event) => {
            const ActiveProject = updateActiveProject(project);
            const projectElements = document.querySelectorAll('.project-item');
            projectElements.forEach((projectElement) => {
                console.log(projectElement);
                projectElement.classList.remove('active');
            });
            projectElement.classList.add('active');
        });

        //repeated code
        const projectElements = document.querySelectorAll('.project-item');
            projectElements.forEach((projectElement) => {
                console.log(projectElement);
                projectElement.classList.remove('active');
        });
        projectElement.classList.add('active');
      
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

        projects.forEach((project) => {
            const projectElement = createProjectElement(project);
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