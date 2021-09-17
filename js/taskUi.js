// import TaskData from './taskData.js';
import {taskList} from './taskData.js';
import AddNewTask from './addNewTask.js';

// const tasksList = new TaskData();

// const tasks = tasksList.taskListData();

const tasks = taskList;

export default class TaskUI {
  
  init(){
    this.showTaskToDOm();

    // Task Create Event
    const createTaskBtn = document.getElementById('createTaskBtn');
    createTaskBtn.addEventListener('click', (e) => {
      this.createNewTask();
    })
  }

  showTaskToDOm(){
    const taskUi = document.querySelector('.taskUi');
    const taskListUi = document.getElementById('taskListUi');
    
    taskListUi.innerHTML = '';
    


    // console.log(tasks.length);
    // console.log(id);

    let id;

    if(tasks.length === 0){
      id = 0;
    }
    // else{
    //   id = tasks[tasks.length - 1].id;
    //   id++;
    // }

    tasks.forEach((task) => {

      const li = document.createElement('li');
      li.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-start');
      li.id = `taskUi-${id}`;
      li.innerHTML = `
        <div class="ms-2 me-auto">
          <div class="fw-bold">${task.taskName}</div>
          ${task.note}
        </div>
        <span class="rounded-pill mx-4 pt-2 fs-6 text-secondary">
          (${task.startTime} - ${task.endTime})
        </span>
        <span class="rounded-pill">
          <a class="mx-1 fs-4 text-info" href="#" title="View Details"><i class="fas fa-eye"></i></a>
          <a class="mx-1 fs-4 text-success" href="#" title="Mark Complete"><i class="fas fa-check-circle"></i></a>
          <a class="mx-1 fs-4 text-secondary" href="#" title="Edit Task"><i class="fas fa-edit"></i></a>
          <a class="mx-1 fs-4 text-danger" href="#" title="Delete Task"><i class="fas fa-trash"></i></a>
        </span>
      `
      taskListUi.appendChild(li);
    })
  }

  createNewTask(){
    const taskName = document.getElementById('taskName');
    const taskDate = document.getElementById('taskDate');
    const taskStartTime = document.getElementById('taskStartTime');
    const taskEndTime = document.getElementById('taskEndTime');
    const taskPriority = document.getElementById('taskPriority');
    const taskNote = document.getElementById('TaskNote');

    const tastNameValue = taskName.value;
    const taskDateValue = taskDate.value;
    const taskStartTimeValue = taskStartTime.value;
    const taskEndTimeValue = taskEndTime.value;
    const taskPriorityValue = taskPriority.value;
    const taskNoteValue = taskNote.value;

    let addNewTask = new AddNewTask(tastNameValue, taskDateValue, taskStartTimeValue, taskEndTimeValue, taskPriorityValue, taskNoteValue);

    // tasksList.taskListData.tasks = addNewTask;
    // this.tasks.taskList.push(addNewTask);

    tasks.push(addNewTask);

    this.showTaskToDOm();

  }
}