/* eslint-disable class-methods-use-this */
import ArrData from './ArrData';
import DisplayForm from './DisplayForm';

const arrData = new ArrData();
const displayForm = new DisplayForm();

class WorkTasks {
  constructor() {
    this.divPined = document.getElementById('pined');
    this.divAllTasks = document.getElementById('all-tasks');
    this.formInput = document.getElementById('input-form');
    this.elementInput = document.getElementById('input-task');
    this.elementError = document.querySelector('.error');
  }

  init() {
    arrData.addTask('task 1');
    arrData.addTask('task 2');
    arrData.addTask('task 3');
    arrData.addTask('task 4');
    arrData.addTask('task 5');
    arrData.tasks[2].pined = true;
    arrData.tasks[4].pined = true;

    displayForm.redrawTasks(arrData.tasks);

    this.eventsTasks();
  }

  eventsTasks() {
    this.formInput.addEventListener('submit', (e) => {
      e.preventDefault();
      const elementValue = this.elementInput.value;

      if (elementValue === '') {
        this.elementError.classList.remove('hidden');
        const top = this.elementInput.offsetTop - this.elementError.offsetHeight;
        this.elementError.style.top = `${top - 5}px`;
        return;
      }

      if (!this.elementError.classList.contains('hidden')) {
        this.elementError.classList.add('hidden');
      }

      arrData.addTask(this.elementInput.value);
      this.elementInput.value = '';
      this.filterTask(this.elementInput.value);
    });

    this.elementInput.addEventListener('input', () => {
      this.filterTask(this.elementInput.value);
    });

    this.divPined.addEventListener('click', (e) => {
      if (e.target.className === 'checked') {
        const elementId = e.target.closest('.item-task').dataset.id;
        this.moveTask(elementId, false);
      }
    });

    this.divAllTasks.addEventListener('click', (e) => {
      if (e.target.className === 'checked') {
        const elmentId = e.target.closest('.item-task').dataset.id;
        this.moveTask(elmentId, true);
      }
    });

    this.elementError.addEventListener('click', (e) => {
      if (e.target.className === 'close-error') {
        this.elementError.classList.add('hidden');
      }
    });
  }

  filterTask(value) {
    const filtrArr = arrData.tasks.filter((item) => {
      const valueLowerCase = value.trim().toLowerCase();
      const trueName = item.name.toLowerCase().includes(valueLowerCase);
      return trueName || item.pined;
    });
    displayForm.redrawTasks(filtrArr);
  }

  moveTask(itemIdTask, pined) {
    const idTask = arrData.tasks.findIndex(
      (item) => item.id === Number(itemIdTask),
    );
    arrData.tasks[idTask].pined = pined;
    this.filterTask(this.elementInput.value);
  }
}

const workTasks = new WorkTasks();
workTasks.init();
