import { updateActiveProject, deleteProject, updateTask, deleteTask} from '../index.js';
import { differenceInDays, parseISO } from 'date-fns';
import editSvg from '../assets/IconoirEditPencil.svg';
import deleteSvg from '../assets/IconoirTrash.svg';

const UI = (() => {

    //setup event listeners
    function setupEventListeners(){
        //event listerners for project input
        document.getElementById('addProjectBtn').addEventListener('click', function() {
            document.getElementById('addProjectBtn').style.display = 'none';
            document.getElementById('addProjectContainer').style.display = 'flex';
            document.getElementById('newProjectInput').focus();
        });

        document.getElementById('newProjectInput').addEventListener('keydown', function(event) {
            if (event.key === 'Enter') {
            event.preventDefault();
            document.getElementById('saveProjectBtn').click();
            }
        });
  
        document.getElementById('cancelProjectBtn').addEventListener('click', function() {
            document.getElementById('addProjectBtn').style.display = 'flex';
            document.getElementById('addProjectContainer').style.display = 'none';
            document.getElementById('newProjectInput').value = '';
        });

        document.getElementById('saveProjectBtn').addEventListener('click', function() {
            document.getElementById('addProjectBtn').style.display = 'flex';
            document.getElementById('addProjectContainer').style.display = 'none';

        });
    }

    function createProjectElement(project) {
        const projectElement = document.createElement('li');
        projectElement.classList.add('project-item');
      
        const projectTitle = document.createElement('span');
        projectTitle.classList.add('project-title');
        projectTitle.textContent = project.title;
        projectElement.appendChild(projectTitle);

        const deleteProjectIcon = document.createElement('img');
        deleteProjectIcon.classList.add('delete-project-icon');
        deleteProjectIcon.style.display = 'none';
        deleteProjectIcon.src = deleteSvg;
        projectElement.appendChild(deleteProjectIcon);
      
        document.getElementById('newProjectInput').value = '';
        
        projectElement.addEventListener('click', (event) => {
            const ActiveProject = updateActiveProject(project);
            const projectElements = document.querySelectorAll('.project-item');
            projectElements.forEach((projectElement) => {
                projectElement.classList.remove('active');
            });
            projectElement.classList.add('active');
        });

        projectElement.addEventListener('mouseover', (event) => {
            if (project.title !== 'Inbox') {
                deleteProjectIcon.style.display = 'block';
            }
        });

        projectElement.addEventListener('mouseout', (event) => {    
            deleteProjectIcon.style.display = 'none';
        });

        deleteProjectIcon.addEventListener('click', (event) => {
            event.stopPropagation();
            deleteProject(project);
            projectElement.remove();
        });
      
        return projectElement;
    }
      

    function createTaskElement(task) {

        const taskElement = document.createElement('li');
        taskElement.classList.add('task-item');

        const taskHeader = document.createElement('div');
        taskHeader.classList.add('task-header');
        taskElement.appendChild(taskHeader);

        const checkboxSection = document.createElement('div');
        checkboxSection.classList.add('checkbox-section');
        taskHeader.appendChild(checkboxSection);

        const checkbox = document.createElement('input');
        checkbox.setAttribute('type', 'checkbox');
        checkbox.classList.add('task-checkbox');
        checkboxSection.appendChild(checkbox);

        const infoSection = document.createElement('div');
        infoSection.classList.add('info-section');
        taskHeader.appendChild(infoSection);
    
        const taskTitle = document.createElement('span');
        taskTitle.classList.add('task-title');
        taskTitle.contentEditable = true;
        taskTitle.textContent = task.title;
        infoSection.appendChild(taskTitle);

        const taskDaysLeft = document.createElement('span');
        taskDaysLeft.classList.add('task-days-left');
        infoSection.appendChild(taskDaysLeft);

        const editSection = document.createElement('div');
        editSection.classList.add('edit-section');
        taskHeader.appendChild(editSection);

        const deleteTaskIcon = document.createElement('img');
        deleteTaskIcon.classList.add('delete-task-icon');
        deleteTaskIcon.setAttribute('src', deleteSvg);
        editSection.appendChild(deleteTaskIcon);
    
        const editTaskIcon = document.createElement('img');
        editTaskIcon.classList.add('edit-task-icon');
        editTaskIcon.setAttribute('src', editSvg);
        editSection.appendChild(editTaskIcon);
    
        document.getElementById('newTaskInput').value = '';

        //generate task details container
        const taskDetails = document.createElement('div');
        taskDetails.classList.add('task-details');
        taskDetails.style.display = 'none';
        taskElement.appendChild(taskDetails);

        //generate due date input
        const dueDateInput = document.createElement('input');
        dueDateInput.setAttribute('type', 'date');
        dueDateInput.classList.add('due-date-input');
        dueDateInput.value = task.dueDate;
        taskDetails.appendChild(dueDateInput);

        //generate priority picker
        const priortyPicker = document.createElement('select');
        priortyPicker.classList.add('priorty-picker');
        const priorities = [
            { value: 'none', label: 'None' },
            { value: 'low', label: 'Low' },
            { value: 'medium', label: 'Medium' },
            { value: 'high', label: 'High' },
        ];
        priortyPicker.value = task.priority;
        priorities.forEach((priority) => {
            const option = document.createElement('option');
            option.value = priority.value;
            option.textContent = priority.label;
            priortyPicker.appendChild(option);
        });
        taskDetails.appendChild(priortyPicker);

        //generate task edit button container
        const taskEditButtons = document.createElement('div');
        taskEditButtons.classList.add('task-edit-buttons');
        taskEditButtons.style.display = 'none';
        taskElement.appendChild(taskEditButtons);

        //generate cancel task button
        const cancelTaskBtn = document.createElement('button');
        cancelTaskBtn.classList.add('cancel-task-btn');
        cancelTaskBtn.textContent = 'Cancel';
        taskEditButtons.appendChild(cancelTaskBtn);

        //generate save task button
        const saveTaskBtn = document.createElement('button');
        saveTaskBtn.classList.add('save-task-btn');
        saveTaskBtn.textContent = 'Save'; 
        taskEditButtons.appendChild(saveTaskBtn);

        taskTitle.addEventListener('blur', () => {
            updateTask(task, taskTitle.textContent, task.completed, task.dueDate, task.priority);
        });

        // Prevent line breaks when the user presses the Enter key
        taskTitle.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
            event.preventDefault();
            taskTitle.blur();
            }
        });
    
        taskElement.childNodes[0].addEventListener('change', (event) => {
            if (event.target.checked) {
                taskElement.classList.add('completed');
                updateTask(task, task.title, true, task.dueDate, task.priority);
            } else {
                taskElement.classList.remove('completed');
                updateTask(task, task.title, false, task.dueDate, task.priority);
            }
        });

        deleteTaskIcon.addEventListener('click', (event) => {
            deleteTask(task);
            taskElement.remove();
        });

        editTaskIcon.addEventListener('click', (event) => {
            toggleTaskDetails();
        });

        cancelTaskBtn.addEventListener('click', (event) => {
            dueDateInput.value = task.dueDate;
            priortyPicker.value = task.priority;
            toggleTaskDetails();
        });

        saveTaskBtn.addEventListener('click', (event) => {
            updateTask(task, task.title, task.completed, dueDateInput.value, priortyPicker.value);
            addPriorityClass();
            addDateText();
            toggleTaskDetails();
        });
        

        function addPriorityClass() {
            if (task.priority === 'high') {
                checkbox.classList.remove('low-priority');
                checkbox.classList.remove('medium-priority');
                checkbox.classList.add('high-priority');
            } else if (task.priority === 'medium') {
                checkbox.classList.remove('low-priority');
                checkbox.classList.add('medium-priority');
                checkbox.classList.remove('high-priority');
            } else if (task.priority === 'low'){
                checkbox.classList.add('low-priority');
                checkbox.classList.remove('medium-priority');
                checkbox.classList.remove('high-priority');
            };
        }

        function removeTimeFromDate(date) {
            const year = date.getFullYear();
            const month = date.getMonth();
            const day = date.getDate();

            return new Date(year, month, day);
        }

        function addDateText() {
            if (task.dueDate != '' ){
                const daysLeft = differenceInDays(parseISO(task.dueDate), removeTimeFromDate(new Date()));
                if (daysLeft < 0) {
                    taskDaysLeft.classList.add('overdue');
                    taskDaysLeft.textContent = 'Overdue';
                } else if (daysLeft === 0) {
                    taskDaysLeft.classList.remove('overdue');
                    taskDaysLeft.textContent = 'Due Today';
                } else if (daysLeft === 1) {
                    taskDaysLeft.classList.remove('overdue');
                    taskDaysLeft.textContent = 'Due Tomorrow';
                } else {
                    taskDaysLeft.classList.remove('overdue');
                    taskDaysLeft.textContent = daysLeft + ' days left';
                }
            }
        }

        function toggleTaskDetails() {
            if (taskDetails.style.display === 'none') {
                taskDetails.style.display = 'flex';
                taskEditButtons.style.display = 'flex';
            } else {
                taskDetails.style.display = 'none';
                taskEditButtons.style.display = 'none';
            }
        }

        if (task.completed) {
            taskElement.classList.add('completed');
            checkbox.checked = true;
            taskDaysLeft.style.display = 'none';
        }

        dueDateInput.value = task.dueDate;
        priortyPicker.value = task.priority;
        addPriorityClass();
        addDateText();


        return taskElement;
    }
    
    

    function renderProjects(projects) {
        const projectList = document.querySelector('.project-list');
        projectList.innerHTML = '';

        projects.forEach((project) => {
            const projectElement = createProjectElement(project);
            console.log(updateActiveProject());
            if (project === updateActiveProject()) {
                projectElement.classList.add('active');
            }
            projectList.appendChild(projectElement);
        });

    }
    
    function renderTasks(project) {
        const activeProjectTasks = document.querySelector('#activeProjectTasks');

        activeProjectTasks.innerHTML = '';

        const projectTitleText = document.querySelector('#activeProjectTitle');
        projectTitleText.textContent = project.title;

        project.tasks.forEach((task) => {
            const taskElement = createTaskElement(task);
            activeProjectTasks.appendChild(taskElement);
            if (task.completed) {
                taskElement.classList.add('completed');
                taskElement.childNodes[0].checked = true;
            }
        });
    }

    setupEventListeners();

    return {
        renderProjects,
        renderTasks,
    };

})();

export default UI;