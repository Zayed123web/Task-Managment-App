// import {taskList} from './taskData.js';
import AddNewTask from './addNewTask.js';

// const tasksList = new TaskData();

// const tasks = tasksList.taskListData();

// const tasks = taskList;

//Data from local storage
const tasks = JSON.parse(localStorage.getItem('taskItems'));
// console.log(tasks);

export default class TaskUI {
  
  init(){
    this.showTaskToDOm();

    // Task Create Event
    const createTaskBtn = document.getElementById('createTaskBtn');
    createTaskBtn.addEventListener('click', (e) => {
      this.createNewTask();
    })
    // Remove Item 
    const listUi = document.getElementById('taskListUi');
    listUi.addEventListener('click', e => {
      this.deleteTask(e);
    })

    // View Details
    this.viewDetails();

    // Edit Details
    this.editDetails();
  }

  showTaskToDOm(){
    const taskUi = document.querySelector('.taskUi');
    const taskListUi = document.getElementById('taskListUi');
    
    taskListUi.innerHTML = '';

    tasks.forEach((task) => {

      const li = document.createElement('li');
      li.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-start');
      li.id = `taskUi-${task.id}`;
      li.innerHTML = `
        <div class="ms-2 me-auto">
          <div class="fw-bold">${task.taskName}</div>
          ${task.note}
        </div>
        <span class="rounded-pill mx-4 pt-2 fs-6 text-secondary">
          (${task.startTime} - ${task.endTime})
        </span>
        <span class="rounded-pill">
          <a class="mx-1 fs-4 text-info" href="#" title="View Details"><i class="fas fa-eye" data-bs-toggle="modal" data-bs-target="#exampleModal2" data-bs-whatever="@getbootstrap"></i></a>
          <a class="mx-1 fs-4 text-success" href="#" title="Mark Complete"><i class="fas fa-check-circle"></i></a>
          <a class="mx-1 fs-4 text-secondary" href="#" title="Edit Task"><i class="fas fa-edit" data-bs-toggle="modal" data-bs-target="#exampleModal2" data-bs-whatever="@getbootstrap"></i></a>
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

    let id;

    if(tasks.length === 0){
      id = 0;
    }else{
      id = tasks[tasks.length - 1].id;
      id++;
    }

    let addNewTask = new AddNewTask(tastNameValue, taskDateValue, taskStartTimeValue, taskEndTimeValue, taskPriorityValue, taskNoteValue, id);

    // tasksList.taskListData.tasks = addNewTask;
    // this.tasks.taskList.push(addNewTask);

    tasks.push(addNewTask);

    localStorage.setItem('taskItems', JSON.stringify(tasks));

    this.showTaskToDOm();

  }

  deleteTask(e){
    e.preventDefault();
    if(e.target.classList.contains('fa-trash')){
      console.log('Item Will Be Deleted');
      const deleteItem = e.target.parentElement.parentElement.parentElement;
      const id = deleteItem.id;
      deleteItem.remove();
      this.deleteFromLocalStorage(id);
    }
  }

  deleteFromLocalStorage(id){
    const taskId = id.split('-');
    const taskIDGet = taskId[1];

    const tasksFromLocal = JSON.parse(localStorage.getItem('taskItems'));

    const filterOutTasks = tasksFromLocal.filter(task => {
      return task.id != taskIDGet;
    })

    localStorage.setItem('taskItems', JSON.stringify(filterOutTasks));

  }
}

TaskUI.prototype.viewDetails = function(){
  //Add Event Listners
  const listUi = document.getElementById('taskListUi');
  listUi.addEventListener('click', e => {
    if(e.target.classList.contains('fa-eye')){


      const viewItemId = e.target.parentElement.parentElement.parentElement;
      const id = viewItemId.id;
      const idSplit = id.split('-');
      const getId = idSplit[1];
      
      // Get The Item From The Local Storge
      const localTask = JSON.parse(localStorage.getItem('taskItems'));
      const viewItemGot = localTask.filter(task => {
        return task.id == getId;
      })
      // Add Modal
      this.addModalViewTask(viewItemGot);
    }
  })
}

TaskUI.prototype.addModalViewTask = function(data){
  const addModal = document.getElementById('exampleModal2');
  const viewTask = document.getElementById('viewTaskDetail');
  const viewData = data[0];
  viewTask.innerHTML = `

    <div class="modal-header">
      <h5 class="modal-title" id="exampleModalLabel"><i class="fas fa-calendar-day"></i> Task Details</h5>
      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
    </div>
    <div class="modal-body">
      <form>
        <div class="mb-3">
          <label for="taskViewName" class="col-form-label">Task Name:</label>
          <input value="${viewData.taskName}" type="text" class="form-control" id="taskViewName" disabled>
        </div>
        <div class="mb-3">
          <label for="taskViewTime" class="col-form-label">Task Time:</label>
          <input value="${viewData.startTime} to ${viewData.endTime}" type="text" class="form-control" id="taskViewTime" disabled>
        </div>
        <div class="mb-3">
          <label for="taskViewDate" class="col-form-label">Task Date:</label>
          <input value="${viewData.date}" type="text" class="form-control" id="taskViewDate" disabled>
        </div>
        <div class="mb-3">
          <label for="taskViewNote" class="col-form-label">Task Note:</label>
          <input value="${viewData.note}" type="text" class="form-control" id="taskViewNote" disabled>
        </div>
      </form>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
      <button type="button" class="btn btn-primary">Edit Task</button>
    </div>

  `;

}


TaskUI.prototype.editDetails = function(){
  //Add Event Listners
  const listUi = document.getElementById('taskListUi');
  listUi.addEventListener('click', e => {
    if(e.target.classList.contains('fa-edit')){


      const viewItemId = e.target.parentElement.parentElement.parentElement;
      const id = viewItemId.id;
      const idSplit = id.split('-');
      const getId = idSplit[1];

      console.log(getId);
      
      // Get The Item From The Local Storge
      const localTask = JSON.parse(localStorage.getItem('taskItems'));
      const viewItemGot = localTask.filter(task => {
        return task.id == getId;
      })
      // Add Modal
      this.addModalEditTask(viewItemGot);
    }
  })
}


TaskUI.prototype.addModalEditTask = function(data){
  const addModal = document.getElementById('exampleModal2');
  const viewTask = document.getElementById('viewTaskDetail');
  const viewData = data[0];
  console.log(viewData);
  viewTask.innerHTML = `

    <div class="modal-header">
      <h5 class="modal-title" id="exampleModalLabel"><i class="fas fa-edit"></i> Edit Task</h5>
      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
    </div>
    <div class="modal-body">
      <form>
        <div class="mb-3">
          <label for="taskViewName" class="col-form-label">Task Name:</label>
          <input value="${viewData.taskName}" type="text" class="form-control" id="taskViewName">
        </div>
        <div class="mb-3">
          <label for="taskViewTime" class="col-form-label">Task Time:</label>
          <input value="${viewData.startTime} to ${viewData.endTime}" type="text" class="form-control" id="taskViewTime">
        </div>
        <div class="mb-3">
          <label for="taskViewDate" class="col-form-label">Task Date:</label>
          <input value="${viewData.date}" type="text" class="form-control" id="taskViewDate">
        </div>
        <div class="mb-3">
          <label for="taskViewNote" class="col-form-label">Task Note:</label>
          <input value="${viewData.note}" type="text" class="form-control" id="taskViewNote">
        </div>
      </form>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
      <button type="button" class="btn btn-primary">Save Task</button>
    </div>

  `;

}