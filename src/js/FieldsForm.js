export default class FieldsForm {
  constructor() {
    this.pined = document.getElementById('pined');
    this.allTasks = document.getElementById('all-tasks');
  }

  updateTasks(arrTasks) {
    this.pined.innerHTML = '';
    this.allTasks.innerHTML = '';

    const havePined = arrTasks.some((item) => item.pined);
    const haveTask = arrTasks.every((item) => item.pined);

    if (!havePined) {
      this.pined.innerHTML = '<p>No pinned tasks</p>';
    }

    if (haveTask) {
      this.allTasks.innerHTML = '<p>No tasks found</p>';
    }

    for (const item of arrTasks) {
      const itemTask = document.createElement('div');
      itemTask.className = 'item-task';
      itemTask.dataset.id = item.id;
      itemTask.innerHTML = `
      <p>${item.name}</p>
      <div class="checked">${item.pined ? 'V' : ''}</div>
      `;

      if (item.pined) {
        this.pined.appendChild(itemTask);
      } else {
        this.allTasks.appendChild(itemTask);
      }
    }
  }
}
