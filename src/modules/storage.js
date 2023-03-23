import Project from './project';
import Task from './task';

const Storage = (() => {

    function save(projectList) {
        localStorage.setItem('projectList', JSON.stringify(projectList));
    }
    function load() {
        const projectListJSON = localStorage.getItem('projectList');

        if (projectListJSON) {
            const projectListData = JSON.parse(projectListJSON);
            const projectList = projectListData.map(Project.fromJSON);
            return projectList;
        } else {
            return [];
        }
    }

    return {
        save,
        load,
    };

})();

export default Storage;