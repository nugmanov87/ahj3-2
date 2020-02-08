/* eslint-disable class-methods-use-this */
import { ArrData, initNotepad } from "./Init.js";
import FieldsForm from "./FieldsForm.js";

const arrData = new ArrData();
const fieldsForm = new FieldsForm();

export default class Notepad {
  constructor() {
    this.pined = document.getElementById("pined");
    this.allTasks = document.getElementById("all-tasks");
    this.formInput = document.getElementById("input-form");
    this.elemInput = document.getElementById("input-task");
    this.elemError = document.querySelector(".error");
  }

  init() {
    initNotepad(arrData);
    fieldsForm.updateTasks(arrData.tasks);
    this.eventsTasks();
  }

  filterTask(value) {
    const filtrArr = arrData.tasks.filter(item => {
      const valueLowerCase = value.trim().toLowerCase();
      const trueName = item.name.toLowerCase().includes(valueLowerCase);
      return trueName || item.pined;
    });
    fieldsForm.updateTasks(filtrArr);
  }

  moveTask(itemIdTask, pined) {
    const idTask = arrData.tasks.findIndex(
      item => item.id === Number(itemIdTask)
    );
    arrData.tasks[idTask].pined = pined;
    this.filterTask(this.elemInput.value);
  }

  eventsTasks() {
    this.formInput.addEventListener("submit", e => {
      e.preventDefault();
      const elemValue = this.elemInput.value;

      if (elemValue === "") {
        this.elemError.classList.remove("hidden");
        const top = this.elemInput.offsetTop - this.elemError.offsetHeight;
        this.elemError.style.top = `${top + 30}px`;
        const left = this.elemInput.offsetLeft + this.elemError.offsetWidth;
        this.elemError.style.left = `${left + 100}px`;
        return;
      }

      if (!this.elemError.classList.contains("hidden")) {
        this.elemError.classList.add("hidden");
      }

      arrData.addTask(this.elemInput.value);
      this.elemInput.value = "";
      this.filterTask(this.elemInput.value);
    });

    this.elemInput.addEventListener("input", () => {
      this.filterTask(this.elemInput.value);
    });

    this.pined.addEventListener("click", e => {
      if (e.target.className === "checked") {
        const elemId = e.target.closest(".item-task").dataset.id;
        this.moveTask(elemId, false);
      }
    });

    this.allTasks.addEventListener("click", e => {
      if (e.target.className === "checked") {
        const elemId = e.target.closest(".item-task").dataset.id;
        this.moveTask(elemId, true);
      }
    });

    this.elemError.addEventListener("click", e => {
      if (e.target.className === "close-error") {
        this.elemError.classList.add("hidden");
      }
    });
  }
}
