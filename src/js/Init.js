import Task from "./Task.js";

export class ArrData {
  constructor() {
    this.tasks = [];
  }

  addTask(name) {
    this.tasks.push(new Task(this.tasks.length, name));
  }
}

export function initNotepad(arrData) {
  arrData.addTask("Task 1");
  arrData.addTask("Task 2");
  arrData.addTask("Task 3");
  arrData.addTask("Task 4");

  const [...rest] = arrData.tasks;
  rest[3].pined = true;
}
