/* eslint-disable class-methods-use-this */
import { ArrData, initNotepad } from "./Init.js";
import DisplayForm from "./DisplayForm.js";

const arrData = new ArrData();
const displayForm = new DisplayForm();

export default class WorkTasks {
  constructor() {
    this.pined = document.getElementById("pined");
    this.allTasks = document.getElementById("all-tasks");
    this.formInput = document.getElementById("input-form");
    this.elementInput = document.getElementById("input-task");
    this.elementError = document.querySelector(".error");
  }

  init() {
    initNotepad(arrData);

    displayForm.redrawTasks(arrData.tasks);

    this.eventsTasks();
  }

  eventsTasks() {
    this.formInput.addEventListener("submit", e => {
      e.preventDefault();
      const elementValue = this.elementInput.value;

      if (elementValue === "") {
        this.elementError.classList.remove("hidden");
        const top =
          this.elementInput.offsetTop - this.elementError.offsetHeight;
        this.elementError.style.top = `${top - 5}px`;
        return;
      }

      if (!this.elementError.classList.contains("hidden")) {
        this.elementError.classList.add("hidden");
      }

      arrData.addTask(this.elementInput.value);
      this.elementInput.value = "";
      this.filterTask(this.elementInput.value);
    });

    this.elementInput.addEventListener("input", () => {
      this.filterTask(this.elementInput.value);
    });

    this.pined.addEventListener("click", e => {
      if (e.target.className === "checked") {
        const lementId = event.target.closest(".item-task").dataset.id;
        this.moveTask(lementId, false);
      }
    });

    this.allTasks.addEventListener("click", e => {
      if (e.target.className === "checked") {
        const elmentId = e.target.closest(".item-task").dataset.id;
        this.moveTask(elmentId, true);
      }
    });

    this.elementError.addEventListener("click", e => {
      if (e.target.className === "close-error") {
        this.elementError.classList.add("hidden");
      }
    });
  }

  filterTask(value) {
    const filtrArr = arrData.tasks.filter(item => {
      const valueLowerCase = value.trim().toLowerCase();
      const trueName = item.name.toLowerCase().includes(valueLowerCase);
      return trueName || item.pined;
    });
    displayForm.redrawTasks(filtrArr);
  }

  moveTask(itemIdTask, pined) {
    const idTask = arrData.tasks.findIndex(
      item => item.id === Number(itemIdTask)
    );
    arrData.tasks[idTask].pined = pined;
    this.filterTask(this.elementInput.value);
  }
}
