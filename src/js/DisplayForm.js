export default class DisplayForm {
  constructor() {
    this.divPined = document.getElementById('pined');
    this.divAllTasks = document.getElementById('all-tasks');
  }

  redrawTasks(arrTasks) {
    this.divPined.innerHTML = '';
    this.divAllTasks.innerHTML = '';

    const havePined = arrTasks.some((item) => item.pined);

    const haveTask = arrTasks.every((item) => item.pined);

    if (!havePined) {
      this.divPined.innerHTML = '<p>No pinned tasks</p>';
    }

    if (haveTask) {
      this.divAllTasks.innerHTML = '<p>No tasks found</p>';
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
        this.divPined.appendChild(itemTask);
      } else {
        this.divAllTasks.appendChild(itemTask);
      }
    }
  }
}
